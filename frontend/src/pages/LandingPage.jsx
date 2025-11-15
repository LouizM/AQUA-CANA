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
    codigoPais: '+1',
    telefono: '',
    email: ''
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState(0);
  const [selectedAmenity, setSelectedAmenity] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    let scrollTimer;
    let hasScrolled = false;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        hasScrolled = true;
        setShowScrollHint(false);
      }
    };

    // Mostrar hint después de 3 segundos si no ha scrolleado
    scrollTimer = setTimeout(() => {
      if (!hasScrolled && window.scrollY < 100) {
        setShowScrollHint(true);
      }
    }, 3000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const nextVilla = () => {
    setSelectedVilla((prev) => (prev + 1) % villasData.length);
  };

  const prevVilla = () => {
    setSelectedVilla((prev) => (prev - 1 + villasData.length) % villasData.length);
  };

  const nextAmenity = () => {
    setSelectedAmenity((prev) => (prev + 1) % amenitiesData.length);
  };

  const prevAmenity = () => {
    setSelectedAmenity((prev) => (prev - 1 + amenitiesData.length) % amenitiesData.length);
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
      {/* Scroll Hint Indicators */}
      {showScrollHint && (
        <div className="scroll-hints">
          <div className="scroll-hint scroll-hint-left">
            <ChevronDown size={32} />
            <span>Desliza hacia abajo</span>
          </div>
          <div className="scroll-hint scroll-hint-right">
            <ChevronDown size={32} />
            <span>Desliza hacia abajo</span>
          </div>
        </div>
      )}

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
              <div className="overlay-logo-box">
                <div className="overlay-logo-text">
                  <span className="overlay-logo-main">AQUA CANA</span>
                  <span className="overlay-logo-subtitle">COUNTRY AND RESIDENCE</span>
                </div>
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
              src="https://customer-assets.emergentagent.com/job_luxury-residence-1/artifacts/nwtwpl95_Icono%20rosado.png" 
              alt="AQUA CANA Icon" 
              className="hero-icon"
            />
            <div className="logo-box">
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
        </div>
      </section>

      {/* BLOQUE 2: SOLARES EN PREVENTA */}
      <section className="section solares-preventa-section">
        <div className="solares-video-background">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="solares-background-video"
          >
            <source src="https://customer-assets.emergentagent.com/job_73f3a380-cb7b-4677-98c7-1ebcd841c964/artifacts/csufgkvs_solares%20video.mp4" type="video/mp4" />
          </video>
          <div className="solares-video-overlay"></div>
        </div>
        
        <div className="container solares-content-wrapper">
          <div className="solares-content-grid">
            <div className="solares-text-content">
              <div className="brand-subtle-white">AQUA CANA Country and Residence</div>
              <h2 className="solares-title">OPORTUNIDAD ÚNICA</h2>
              <p className="solares-subtitle">SOLARES EN PREVENTA</p>
              
              <p className="solares-description">
                Asegura tu inversión en el desarrollo más exclusivo de Punta Cana. 
                Solares residenciales con ubicación estratégica y alta valorización garantizada.
              </p>
              
              <div className="solares-features">
                <div className="solar-feature-item">
                  <Check size={24} className="feature-check" />
                  <div>
                    <h4>Desde 250 m²</h4>
                    <p>Lotes amplios y flexibles</p>
                  </div>
                </div>
                <div className="solar-feature-item">
                  <Check size={24} className="feature-check" />
                  <div>
                    <h4>Precios Variables</h4>
                    <p>Según metraje seleccionado</p>
                  </div>
                </div>
                <div className="solar-feature-item">
                  <Check size={24} className="feature-check" />
                  <div>
                    <h4>Plusvalía Garantizada</h4>
                    <p>Ubicación premium en crecimiento</p>
                  </div>
                </div>
                <div className="solar-feature-item">
                  <Check size={24} className="feature-check" />
                  <div>
                    <h4>Preventa Exclusiva</h4>
                    <p>Mejores precios del mercado</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={scrollToForm}
                size="lg"
                className="solares-cta-button"
              >
                SOLICITA INFORMACIÓN
              </Button>
            </div>
            
            <div className="solares-image-content">
              <img 
                src="https://customer-assets.emergentagent.com/job_73f3a380-cb7b-4677-98c7-1ebcd841c964/artifacts/9aoaobhm_solares%20en%20preventa.jpeg"
                alt="Solares en preventa - Vista aérea"
                className="solares-preview-image"
              />
              <div className="solares-image-badge">
                <span className="badge-text">PREVENTA</span>
                <span className="badge-subtext">Precios especiales</span>
              </div>
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

      {/* BLOQUE 4: AMENIDADES CAROUSEL */}
      <section className="section section-white amenities-carousel-section">
        <div className="carousel-header">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">AMENIDADES EXCLUSIVAS</h2>
          <p className="section-subtitle">ESTILO DE VIDA DE CLASE MUNDIAL</p>
        </div>
        
        <div className="carousel-container">
          <button onClick={prevAmenity} className="carousel-arrow left" aria-label="Amenidad anterior">
            <ChevronDown style={{ transform: 'rotate(90deg)' }} size={48} />
          </button>
          
          <div className="carousel-content">
            <div className="amenity-carousel-slide">
              <div className="amenity-image-wrapper">
                <img 
                  src={amenitiesData[selectedAmenity].imagePlaceholder} 
                  alt={amenitiesData[selectedAmenity].title}
                  className="amenity-carousel-image"
                />
              </div>
              
              <div className="amenity-carousel-info">
                <h3 className="amenity-carousel-title">{amenitiesData[selectedAmenity].title}</h3>
                <p className="amenity-carousel-description">{amenitiesData[selectedAmenity].description}</p>
              </div>
            </div>
          </div>
          
          <button onClick={nextAmenity} className="carousel-arrow right" aria-label="Siguiente amenidad">
            <ChevronDown style={{ transform: 'rotate(-90deg)' }} size={48} />
          </button>
        </div>
        
        <div className="carousel-navigation-dots">
          <div className="dots-container">
            {amenitiesData.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === selectedAmenity ? 'active' : ''}`}
                onClick={() => setSelectedAmenity(index)}
                aria-label={`Amenidad ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 5: FORM + CTA */}
      <section id="form-section" className="section section-form-dark">
        <div className="container">
          <h2 className="form-section-title">ASEGURA HOY TU INVERSIÓN A CERO COSTO INICIAL</h2>
          
          <form onSubmit={handleSubmit} className="lead-form-centered">
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
              <div className="phone-input-group">
                <select
                  name="codigoPais"
                  value={formData.codigoPais}
                  onChange={handleInputChange}
                  className="country-code-select"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+1">🇩🇴 +1</option>
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+54">🇦🇷 +54</option>
                  <option value="+55">🇧🇷 +55</option>
                  <option value="+56">🇨🇱 +56</option>
                  <option value="+57">🇨🇴 +57</option>
                  <option value="+58">🇻🇪 +58</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+49">🇩🇪 +49</option>
                </select>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="(809) 000-0000"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="phone-number-input"
                  required
                />
              </div>
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
              className="submit-button-centered"
            >
              APLICA AHORA
            </Button>
            
            <p className="form-privacy-centered">
              Al enviar este formulario aceptas que un asesor se ponga en contacto contigo.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-compact">
        <div className="container">
          <div className="footer-row">
            <div className="footer-brand">
              <div className="footer-logo-container">
                <div className="footer-logo-text">
                  <span className="footer-logo-main">AQUA CANA</span>
                  <span className="footer-logo-subtitle">COUNTRY AND RESIDENCE</span>
                </div>
              </div>
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