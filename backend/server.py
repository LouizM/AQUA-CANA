from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Lead Model
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    codigoPais: str = "+1"
    telefono: str
    email: EmailStr
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadCreate(BaseModel):
    nombre: str
    codigoPais: str = "+1"
    telefono: str
    email: EmailStr

class LeadResponse(BaseModel):
    success: bool
    message: str
    lead_id: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/leads", response_model=LeadResponse)
async def create_lead(lead_input: LeadCreate):
    """
    Endpoint para capturar leads del formulario y enviarlos al webhook del CRM
    """
    try:
        # Crear objeto Lead con timestamp
        lead = Lead(**lead_input.model_dump())
        
        # Guardar en MongoDB
        lead_doc = lead.model_dump()
        lead_doc['created_at'] = lead_doc['created_at'].isoformat()
        
        await db.leads.insert_one(lead_doc)
        logger.info(f"Lead guardado en DB: {lead.email}")
        
        # Preparar datos para el webhook
        webhook_url = os.environ.get('WEBHOOK_URL')
        
        webhook_payload = {
            "nombre": lead.nombre,
            "telefono": f"{lead.codigoPais}{lead.telefono}",
            "email": lead.email,
            "fecha": lead.created_at.isoformat()
        }
        
        # Enviar al webhook
        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                response = await client.post(webhook_url, json=webhook_payload)
                response.raise_for_status()
                logger.info(f"Webhook enviado exitosamente para: {lead.email}")
            except httpx.HTTPError as webhook_error:
                logger.error(f"Error al enviar webhook: {str(webhook_error)}")
                # No fallamos la request aunque el webhook falle
                # El lead ya está guardado en la DB
        
        return LeadResponse(
            success=True,
            message="Lead registrado exitosamente",
            lead_id=lead.id
        )
        
    except Exception as e:
        logger.error(f"Error al crear lead: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error al procesar el lead: {str(e)}")

@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    """
    Endpoint para obtener todos los leads guardados
    """
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    
    return leads

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()