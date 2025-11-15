# AQUA CANA Landing Page - Contracts & Integration Protocol

## Estado Actual: Frontend Completo con Mock Data

### 1. DATOS MOCKEADOS EN FRONTEND

**Archivo:** `/app/frontend/src/data/mock.js`

#### Datos de Villas (villasData)
- 5 villas con información completa extraída del brochure PDF
- Cada villa incluye: name, subtitle, price, bedrooms, bathrooms, lotSize, constructionSize, features
- Imágenes placeholder de Unsplash

#### Datos de Amenidades (amenitiesData)
- 8 amenidades exclusivas del proyecto
- Cada una con: title, description, icon

#### Características de Construcción (constructionFeatures)
- 5 características premium de construcción

### 2. FUNCIONALIDAD ACTUAL DEL FORMULARIO

**Componente:** `/app/frontend/src/pages/LandingPage.jsx`

**Estado del formulario:**
```javascript
const [formData, setFormData] = useState({
  nombre: '',
  telefono: '',
  email: ''
});
```

**Flujo actual (MOCK):**
1. Usuario llena los 3 campos: nombre, teléfono, email
2. Al hacer submit, se validan los campos
3. Se simula un delay de 1 segundo
4. Se muestra el overlay de confirmación
5. Se resetea el formulario

**Ubicación del código mock:**
- Líneas 36-61 en `LandingPage.jsx`
- Comentarios indican dónde va la integración real

### 3. INTEGRACIÓN BACKEND REQUERIDA

#### A. Endpoint a Crear: `/api/submit-lead`

**Backend File:** `/app/backend/server.py`

**Request:**
```python
POST /api/submit-lead
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "telefono": "+1 (809) 555-1234",
  "email": "juan@example.com"
}
```

**Response:**
```python
{
  "success": true,
  "message": "Lead enviado exitosamente",
  "lead_id": "uuid-generated"
}
```

#### B. Modelo de Datos MongoDB

**Collection:** `leads`

```python
class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    telefono: str
    email: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    webhook_sent: bool = False
    webhook_response: Optional[dict] = None
```

#### C. Webhook Integration

**Webhook URL:** 
```
https://services.leadconnectorhq.com/hooks/sayt9Q7cq7WxYjLC9dBK/webhook-trigger/7b5dc2f1-4e86-4fe9-a883-20a01aa9c47a
```

**Payload a Enviar:**
```json
{
  "nombre": "string",
  "telefono": "string", 
  "email": "string",
  "timestamp": "ISO 8601 datetime",
  "source": "AQUA_CANA_LANDING"
}
```

**Método:** POST  
**Headers:** Content-Type: application/json

### 4. CAMBIOS NECESARIOS EN FRONTEND

**Archivo:** `/app/frontend/src/pages/LandingPage.jsx`

**Reemplazar (líneas 36-61):**
```javascript
// Código mock actual
console.log('Enviando datos al webhook:', formData);
setTimeout(() => {
  setShowOverlay(true);
  setFormData({ nombre: '', telefono: '', email: '' });
}, 1000);
```

**Por:**
```javascript
// Integración real con backend
const response = await axios.post(
  `${process.env.REACT_APP_BACKEND_URL}/api/submit-lead`,
  formData
);

if (response.data.success) {
  setShowOverlay(true);
  setFormData({ nombre: '', telefono: '', email: '' });
} else {
  alert('Error al enviar. Por favor intenta de nuevo.');
}
```

### 5. FLUJO COMPLETO DE INTEGRACIÓN

```
1. Usuario llena formulario en frontend
   ↓
2. Submit → POST a /api/submit-lead (Backend FastAPI)
   ↓
3. Backend valida datos
   ↓
4. Backend guarda en MongoDB collection "leads"
   ↓
5. Backend envía webhook a CRM (LeadConnector)
   ↓
6. Backend actualiza documento con webhook_sent=True
   ↓
7. Backend responde success al frontend
   ↓
8. Frontend muestra overlay de confirmación
```

### 6. MANEJO DE ERRORES

**Backend debe manejar:**
- Validación de campos requeridos
- Validación de formato de email
- Error de conexión a MongoDB
- Error de webhook (timeout, 4xx, 5xx)
- Logging de errores

**Frontend debe manejar:**
- Errores de red
- Respuestas 4xx/5xx del backend
- Timeout de request
- Mostrar mensajes de error apropiados al usuario

### 7. CONSIDERACIONES DE SEGURIDAD

- Implementar rate limiting en el endpoint (max 5 requests por IP por minuto)
- Sanitizar inputs para prevenir inyección
- Validar formato de email con regex
- Validar formato de teléfono
- CORS ya está configurado en backend

### 8. TESTING POST-INTEGRACIÓN

**Backend Testing:**
1. Test unitario del endpoint `/api/submit-lead`
2. Test de conexión a MongoDB
3. Test de envío a webhook
4. Test de manejo de errores

**Integration Testing:**
1. Llenar formulario en frontend
2. Verificar guardado en MongoDB
3. Verificar envío a webhook CRM
4. Verificar overlay de confirmación
5. Verificar reset del formulario

### 9. ARCHIVOS A MODIFICAR

**Backend:**
- `/app/backend/server.py` - Agregar endpoint y modelo
- `/app/backend/requirements.txt` - Ya tiene todas las dependencias necesarias

**Frontend:**
- `/app/frontend/src/pages/LandingPage.jsx` - Reemplazar lógica mock
- No se requieren cambios en `/app/frontend/src/data/mock.js` (datos estáticos permanecen)

### 10. VARIABLES DE ENTORNO

**Backend (.env):**
```
MONGO_URL=mongodb://localhost:27017/
DB_NAME=aqua_cana_db
WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/sayt9Q7cq7WxYjLC9dBK/webhook-trigger/7b5dc2f1-4e86-4fe9-a883-20a01aa9c47a
```

**Frontend (.env):**
```
REACT_APP_BACKEND_URL=<already configured>
```

### 11. ASSETS PENDIENTES

**Logo AQUA CANA:**
- Actualmente se usa placeholder con borde blanco
- Ubicaciones a reemplazar:
  - Hero section: `.hero-logo .logo-placeholder`
  - Overlay: `.overlay-logo .logo-placeholder`
  - Footer: `.footer-logo .logo-placeholder`

**Audio:**
- ASMR del mar (simulado con console.log)
- Música de fondo (simulado con console.log)
- Ubicación: `LandingPage.jsx` useEffect línea 28-31

### 12. NOTAS IMPORTANTES

- Video ya está integrado desde los assets del usuario
- Todas las imágenes de villas son placeholders de alta calidad de Unsplash
- El diseño es 100% responsive (Mobile-First)
- Colores sólidos sin gradientes según especificaciones
- Todos los títulos en MAYÚSCULAS según requerimientos
- Alternancia de fondos turquesa/blanco funciona correctamente
- Overlay de confirmación funciona perfectamente
- Footer con información legal completa

---

**Última actualización:** 15 de Enero, 2025  
**Estado:** Frontend completo y funcional - Pendiente aprobación de diseño para proceder con backend
