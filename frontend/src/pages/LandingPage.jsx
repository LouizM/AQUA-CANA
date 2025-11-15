import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { villasData, amenitiesData, constructionFeatures } from '../data/mock';
import { 
  Waves, Utensils, Shield, Dumbbell, TreePine, 
  ShoppingBag, Smile, Users, Phone, Mail, User,
  Bed, Bath, Maximize, Home, Check, X, ChevronDown
} from 'lucide-react';
import '../styles/landing.css';

const iconMap = {
  waves: Waves,
  utensils: Utensils,
  shield: Shield,
  dumbbell: Dumbbell,
  'tree-pine': TreePine,
  'shopping-bag': ShoppingBag,
  smile: Smile,
  users: Users
};

const LandingPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: ''
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState(0);

  const nextVilla = () => {
    setSelectedVilla((prev) => (prev + 1) % villasData.length);
  };

  const prevVilla = () => {
    setSelectedVilla((prev) => (prev - 1 + villasData.length) % villasData.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.telefono || !formData.email) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      // Simulación de envío (en backend se implementará el webhook real)
      console.log('Enviando datos al webhook:', formData);
      
      // Aquí iría la llamada al backend que enviará al webhook
      // const response = await fetch('/api/submit-lead', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simular éxito después de 1 segundo
      setTimeout(() => {
        setShowOverlay(true);
        setFormData({ nombre: '', telefono: '', email: '' });
      }, 1000);
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      alert('Hubo un error. Por favor intenta de nuevo.');
    }
  };

  const scrollToForm = () => {
    document.getElementById('form-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="landing-container">
      {/* Overlay de Confirmación */}
      {showOverlay && (
        <div className="overlay-confirmation">
          <div className="overlay-content">
            <button 
              className="overlay-close"
              onClick={() => setShowOverlay(false)}
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
            
            <div className="overlay-logo">
              <div className="logo-placeholder">
                AQUA CANA
              </div>
            </div>
            
            <h2 className="overlay-title">¡SOLICITUD RECIBIDA!</h2>
            <p className="overlay-message">
              En breve te estaremos llamando, permanece atento.
            </p>
          </div>
        </div>
      )}

      {/* BLOQUE 1: HERO */}
      <section className="hero-section">
        <div 
          className="hero-image"
          style={{
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_luxury-residence-1/artifacts/05qbiqdg_playa%20artificial.jpg)'
          }}
        ></div>
        
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_luxury-residence-1/artifacts/bdm3xyz6_blanco.png" 
              alt="Isotipo AQUA CANA" 
              className="logo-isotipo-top"
            />
            <div className="logo-box">
              <img 
                src="https://customer-assets.emergentagent.com/job_luxury-residence-1/artifacts/bdm3xyz6_blanco.png" 
                alt="Isotipo AQUA CANA" 
                className="logo-isotipo-inside"
              />
              <div className="logo-text">
                <span className="logo-main">AQUA CANA</span>
                <span className="logo-subtitle">COUNTRY AND RESIDENCE</span>
              </div>
            </div>
          </div>
          
          <h1 className="hero-title">LA VILLA DE TUS SUEÑOS</h1>
          <p className="hero-subtitle">EN EL CORAZÓN DEL CARIBE</p>
          
          <Button 
            onClick={scrollToForm}
            className="hero-cta"
            size="lg"
          >
            APLICA AHORA
          </Button>
          
          <button 
            onClick={scrollToForm}
            className="scroll-indicator"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* BLOQUE 2: SOLARES + OPORTUNIDAD */}
      <section className="section section-base">
        <div className="container">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">OPORTUNIDAD ÚNICA</h2>
          <p className="section-subtitle">INVERSIÓN EN EL PARAÍSO</p>
          
          <div className="two-col-layout">
            <div className="col-content">
              <h3 className="col-title">SOLARES EN PREVENTA</h3>
              <p className="col-text">
                Invierte en tu futuro con solares desde <strong>250 m²</strong> en el desarrollo 
                más exclusivo de Punta Cana. Ubicación estratégica con alta valorización garantizada.
              </p>
              <ul className="benefit-list">
                <li><Check size={20} /> Desde 250 m² de terreno</li>
                <li><Check size={20} /> Diseño para máxima privacidad</li>
                <li><Check size={20} /> Plusvalía garantizada</li>
                <li><Check size={20} /> Financiamiento disponible</li>
              </ul>
            </div>
            
            <div className="col-content">
              <h3 className="col-title">ACABADOS PREMIUM</h3>
              <p className="col-text">
                Cada villa está construida con <strong>materiales de primera calidad</strong> 
                que reflejan elegancia y confort en cada detalle.
              </p>
              <ul className="benefit-list">
                {constructionFeatures.map((feature, index) => (
                  <li key={index}>
                    <Check size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 3: VILLAS CAROUSEL */}
      <section className="section section-white villas-carousel-section">
        <div className="carousel-header">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">VILLAS DISPONIBLES</h2>
          <p className="section-subtitle">DISEÑO Y ELEGANCIA</p>
        </div>
        
        <div className="carousel-container">
          <button onClick={prevVilla} className="carousel-arrow left" aria-label="Villa anterior">
            <ChevronDown style={{ transform: 'rotate(90deg)' }} size={48} />
          </button>
          
          <div className="carousel-content">
            <div className="carousel-slide">
              <div className="carousel-image-wrapper">
                <img 
                  src={villasData[selectedVilla].imagePlaceholder} 
                  alt={villasData[selectedVilla].name}
                  className="carousel-image"
                />
              </div>
              
              <div className="carousel-info">
                <div className="carousel-villa-header">
                  <h3 className="carousel-villa-name">{villasData[selectedVilla].name}</h3>
                  <p className="carousel-villa-tagline">{villasData[selectedVilla].subtitle}</p>
                </div>
                
                <div className="carousel-villa-price">{villasData[selectedVilla].price}</div>
                
                <div className="carousel-specs">
                  <div className="carousel-spec">
                    <Bed size={32} />
                    <div>
                      <span className="spec-number">{villasData[selectedVilla].bedrooms}</span>
                      <span className="spec-label">Habitaciones</span>
                    </div>
                  </div>
                  <div className="carousel-spec">
                    <Bath size={32} />
                    <div>
                      <span className="spec-number">{villasData[selectedVilla].bathrooms}</span>
                      <span className="spec-label">Baños</span>
                    </div>
                  </div>
                  {villasData[selectedVilla].lotSize && (
                    <div className="carousel-spec">
                      <Maximize size={32} />
                      <div>
                        <span className="spec-number">{villasData[selectedVilla].lotSize}</span>
                        <span className="spec-label">Terreno</span>
                      </div>
                    </div>
                  )}
                  <div className="carousel-spec">
                    <Home size={32} />
                    <div>
                      <span className="spec-number">{villasData[selectedVilla].constructionSize}</span>
                      <span className="spec-label">Construcción</span>
                    </div>
                  </div>
                </div>
                
                <div className="carousel-features">
                  <h4>Características Destacadas</h4>
                  <ul>
                    {villasData[selectedVilla].features.map((feature, idx) => (
                      <li key={idx}>
                        <Check size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="carousel-cta"
                >
                  QUIERO ESTA VILLA
                </Button>
              </div>
            </div>
          </div>
          
          <button onClick={nextVilla} className="carousel-arrow right" aria-label="Siguiente villa">
            <ChevronDown style={{ transform: 'rotate(-90deg)' }} size={48} />
          </button>
        </div>
        
        <div className="carousel-navigation-dots">
          <div className="dots-container">
            {villasData.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === selectedVilla ? 'active' : ''}`}
                onClick={() => setSelectedVilla(index)}
                aria-label={`Villa ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 4: AMENIDADES */}
      <section className="section section-base">
        <div className="container">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">AMENIDADES EXCLUSIVAS</h2>
          <p className="section-subtitle">ESTILO DE VIDA DE CLASE MUNDIAL</p>
          
          <div className="amenities-grid-compact">
            {amenitiesData.map((amenity, index) => {
              const IconComponent = iconMap[amenity.icon];
              return (
                <div key={index} className="amenity-item">
                  <IconComponent size={28} className="amenity-icon-inline" />
                  <div>
                    <h4>{amenity.title}</h4>
                    <p>{amenity.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BLOQUE 5: FORM + CTA */}
      <section id="form-section" className="section section-base">
        <div className="container">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">PREFERENCIA CLARA</h2>
          <p className="section-subtitle">LLAMADO A LA ACCIÓN DEFINITIVO</p>
          
          <div className="form-container">
            <div className="form-intro">
              <h3>Asegura Tu Inversión Hoy</h3>
              <p>
                Completa el formulario y un asesor especializado te contactará 
                para brindarte toda la información y opciones de financiamiento disponibles.
              </p>
              
              <ul className="form-benefits">
                <li>
                  <Check size={20} />
                  <span>Garantía escrow</span>
                </li>
                <li>
                  <Check size={20} />
                  <span>Opciones de financiamiento</span>
                </li>
                <li>
                  <Check size={20} />
                  <span>Asesoría legal especializada</span>
                </li>
                <li>
                  <Check size={20} />
                  <span>Respuesta en menos de 24 horas</span>
                </li>
              </ul>
            </div>
            
            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-group">
                <label htmlFor="nombre">
                  <User size={20} />
                  Nombre Completo
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telefono">
                  <Phone size={20} />
                  Teléfono
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+1 (809) 000-0000"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={20} />
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Button 
                type="submit"
                size="lg"
                className="submit-button"
              >
                APLICA AHORA
              </Button>
              
              <p className="form-privacy">
                Al enviar este formulario aceptas que un asesor se ponga en contacto contigo.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-compact">
        <div className="container">
          <div className="footer-row">
            <div className="footer-brand">
              <div className="logo-small">AQUA CANA</div>
              <p>Country & Residence</p>
            </div>
            
            <div className="footer-info">
              <p>Punta Cana, República Dominicana</p>
              <p>Proyecto registrado por <strong>Tropical Inmo Dr.</strong></p>
            </div>
            
            <div className="footer-legal">
              <p>&copy; 2025 AQUA CANA. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;