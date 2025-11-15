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

  useEffect(() => {
    // Simular reproducción de audio ASMR + música
    // En producción, aquí irían los archivos de audio reales
    console.log('Audio ASMR del mar y música de fondo iniciados (simulado)');
  }, []);

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
        <video 
          ref={videoRef}
          className="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_luxury-residence-1/artifacts/l7qf86xu_Aqua%20Cana%20Video%20%28sin%20logo%29.mp4" 
            type="video/mp4" 
          />
        </video>
        
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-logo">
            <div className="logo-placeholder">AQUA CANA</div>
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

      {/* BLOQUE 2: SOLARES EN PREVENTA */}
      <section className="section section-base">
        <div className="container">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">OPORTUNIDAD ÚNICA</h2>
          <p className="section-subtitle">SOLARES EN PREVENTA</p>
          
          <div className="content-block">
            <p className="text-large">
              Invierte en tu futuro con solares desde <strong>250 m²</strong> en el desarrollo 
              más exclusivo de Punta Cana. Diseñados para transmitir libertad, espacio y privacidad.
            </p>
            
            <div className="features-grid">
              <div className="feature-card">
                <Maximize className="feature-icon" size={40} />
                <h3>Desde 250 m²</h3>
                <p>Amplios terrenos para tu proyecto ideal</p>
              </div>
              
              <div className="feature-card">
                <Home className="feature-icon" size={40} />
                <h3>Diseño Exclusivo</h3>
                <p>Lotes conceptualizados para máxima privacidad</p>
              </div>
              
              <div className="feature-card">
                <Shield className="feature-icon" size={40} />
                <h3>Plusvalía Garantizada</h3>
                <p>Ubicación estratégica con alta valorización</p>
              </div>
            </div>
            
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="cta-button"
            >
              CONSULTAR DISPONIBILIDAD
            </Button>
          </div>
        </div>
      </section>

      {/* BLOQUE 3: VILLAS DISPONIBLES INTRO */}
      <section className="section section-white">
        <div className="container">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">VILLAS DISPONIBLES</h2>
          <p className="section-subtitle">DISEÑO Y ELEGANCIA</p>
          
          <div className="content-block">
            <p className="text-large">
              Cada villa está construida con <strong>materiales de primera calidad</strong> y 
              acabados de lujo que reflejan elegancia y confort en cada detalle.
            </p>
            
            <div className="construction-features">
              <h3 className="features-title">Construcción y Acabados Premium</h3>
              <ul className="features-list">
                {constructionFeatures.map((feature, index) => (
                  <li key={index}>
                    <Check className="check-icon" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUES 4-8: VILLAS INDIVIDUALES */}
      {villasData.map((villa, index) => (
        <section 
          key={villa.id}
          className={`section ${index % 2 === 0 ? 'section-base' : 'section-white'}`}
        >
          <div className="container">
            <div className="brand-subtle">AQUA CANA Country and Residence</div>
            <h2 className="section-title">{villa.name}</h2>
            <p className="section-subtitle">{villa.subtitle}</p>
            
            <div className="villa-content">
              <div className="villa-image">
                <img 
                  src={villa.imagePlaceholder} 
                  alt={villa.name}
                  loading="lazy"
                />
              </div>
              
              <div className="villa-details">
                <div className="villa-price">{villa.price}</div>
                
                <div className="villa-specs">
                  <div className="spec">
                    <Bed size={24} />
                    <span>{villa.bedrooms} Habitaciones</span>
                  </div>
                  <div className="spec">
                    <Bath size={24} />
                    <span>{villa.bathrooms} Baños</span>
                  </div>
                  {villa.lotSize && (
                    <div className="spec">
                      <Maximize size={24} />
                      <span>Terreno: {villa.lotSize}</span>
                    </div>
                  )}
                  <div className="spec">
                    <Home size={24} />
                    <span>Construcción: {villa.constructionSize}</span>
                  </div>
                </div>
                
                <div className="villa-features">
                  <h3>Características Destacadas</h3>
                  <ul>
                    {villa.features.map((feature, idx) => (
                      <li key={idx}>
                        <Check size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="cta-button"
                >
                  QUIERO ESTA VILLA
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* BLOQUE 9: AMENIDADES */}
      <section className="section section-white">
        <div className="container">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">AMENIDADES EXCLUSIVAS</h2>
          <p className="section-subtitle">DE CLASE MUNDIAL</p>
          
          <div className="amenities-grid">
            {amenitiesData.map((amenity, index) => {
              const IconComponent = iconMap[amenity.icon];
              return (
                <div key={index} className="amenity-card">
                  <div className="amenity-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3>{amenity.title}</h3>
                  <p>{amenity.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="amenities-highlight">
            <p className="text-large">
              Disfruta de un estilo de vida único con acceso a amenidades diseñadas 
              para el <strong>bienestar, entretenimiento y convivencia familiar</strong> en 
              un entorno seguro y exclusivo.
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE 10: FORM + CTA */}
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
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">
            <div className="logo-placeholder">AQUA CANA</div>
            <p>Country & Residence</p>
          </div>
          
          <div className="footer-content">
            <p className="footer-location">
              Punta Cana, República Dominicana
            </p>
            
            <p className="footer-legal">
              Proyecto registrado por <strong>Tropical Inmo Dr.</strong>
            </p>
            
            <p className="footer-disclaimer">
              Los diseños y medidas están sujetos a cambios y variaciones, no son contractuales. 
              Proyecto respaldado por garantía escrow.
            </p>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 AQUA CANA Country and Residence. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;