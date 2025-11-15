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
  const [selectedGalleryImage, setSelectedGalleryImage] = useState({});

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
    setSelectedGalleryImage({});
  };

  const prevVilla = () => {
    setSelectedVilla((prev) => (prev - 1 + villasData.length) % villasData.length);
    setSelectedGalleryImage({});
  };
  
  const selectGalleryImage = (villaId, imageUrl) => {
    setSelectedGalleryImage({ [villaId]: imageUrl });
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
          
          <div className="hero-badge-inicial">
            <span className="badge-inicial-text">0% DE INICIAL</span>
          </div>
          
          <Button 
            onClick={scrollToForm}
            className="hero-cta"
            size="lg"
          >
            SOLICITA INFORMACIÓN
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
              <p className="solares-subtitle">SOLARES RESIDENCIALES EN PREVENTA</p>
              
              <p className="solares-description-immobiliaria">
                Invierte en lotes residenciales premium en el desarrollo más exclusivo de Punta Cana. 
                Ubicación estratégica con acceso a todas las amenidades del proyecto y alta valorización garantizada.
              </p>
              
              <div className="solares-financiamiento-destacado">
                <div className="financiamiento-icon">
                  <Check size={32} />
                </div>
                <div className="financiamiento-content">
                  <h3>FINANCIAMIENTO PROPIO DISPONIBLE</h3>
                  <p>Facilidades de pago directamente con el desarrollador. Sin intermediarios bancarios.</p>
                </div>
              </div>
              
              <div className="solares-features-immobiliaria">
                <div className="solar-feature-card">
                  <div className="feature-icon-wrapper">
                    <Maximize size={28} />
                  </div>
                  <h4>Desde 250 m²</h4>
                  <p>Lotes amplios con diseño flexible para construir tu villa ideal</p>
                </div>
                
                <div className="solar-feature-card">
                  <div className="feature-icon-wrapper">
                    <Home size={28} />
                  </div>
                  <h4>Preventa Exclusiva</h4>
                  <p>Precios preferenciales antes del lanzamiento oficial al mercado</p>
                </div>
                
                <div className="solar-feature-card">
                  <div className="feature-icon-wrapper">
                    <Check size={28} />
                  </div>
                  <h4>Plusvalía Asegurada</h4>
                  <p>Ubicación estratégica en zona de alto crecimiento turístico</p>
                </div>
              </div>
              
              <div className="solares-cta-section">
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="solares-cta-button-immobiliaria"
                >
                  AGENDA UNA CITA
                </Button>
                <p className="solares-cta-subtitle">Consulta con nuestros asesores especializados</p>
              </div>
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

      {/* BLOQUE 3: VILLAS CON GALERÍA INMOBILIARIA */}
      <section className="section section-white villas-gallery-section">
        <div className="carousel-header">
          <div className="brand-subtle">AQUA CANA Country and Residence</div>
          <h2 className="section-title">VILLAS DISPONIBLES</h2>
          <p className="section-subtitle">EXPLORA CADA DETALLE</p>
        </div>
        
        <div className="villas-gallery-container">
          <button onClick={prevVilla} className="carousel-arrow left" aria-label="Villa anterior">
            <ChevronDown style={{ transform: 'rotate(90deg)' }} size={48} />
          </button>
          
          <div className="villa-content-wrapper">
            <div className="villa-gallery-grid">
              {/* Columna Izquierda: Galería de Imágenes */}
              <div className="villa-gallery-column">
                <div className="villa-main-image-container">
                  <img 
                    src={
                      selectedGalleryImage[villasData[selectedVilla].id] || 
                      villasData[selectedVilla].imagePlaceholder
                    }
                    alt={villasData[selectedVilla].name}
                    className="villa-main-image"
                  />
                  <div className="villa-image-counter">
                    {villasData[selectedVilla].gallery.length > 0 ? (
                      <span>
                        {villasData[selectedVilla].gallery.findIndex(
                          img => img === selectedGalleryImage[villasData[selectedVilla].id]
                        ) + 2} / {villasData[selectedVilla].gallery.length + 1}
                      </span>
                    ) : (
                      <span>1 / 1</span>
                    )}
                  </div>
                </div>
                
                {/* Galería de Miniaturas */}
                <div className="villa-thumbnails-wrapper">
                  <div className="villa-thumbnails-scroll">
                    {/* Thumbnail principal */}
                    <div 
                      className={`villa-thumbnail ${
                        !selectedGalleryImage[villasData[selectedVilla].id] ? 'active' : ''
                      }`}
                      onClick={() => setSelectedGalleryImage(prev => ({
                        ...prev,
                        [villasData[selectedVilla].id]: null
                      }))}
                    >
                      <img 
                        src={villasData[selectedVilla].imagePlaceholder}
                        alt="Vista principal"
                      />
                      <div className="thumbnail-label">Principal</div>
                    </div>
                    
                    {/* Thumbnails de galería */}
                    {villasData[selectedVilla].gallery.map((image, idx) => (
                      <div 
                        key={idx}
                        className={`villa-thumbnail ${
                          selectedGalleryImage[villasData[selectedVilla].id] === image ? 'active' : ''
                        }`}
                        onClick={() => selectGalleryImage(villasData[selectedVilla].id, image)}
                      >
                        <img src={image} alt={`Vista ${idx + 2}`} />
                        <div className="thumbnail-label">{idx + 2}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Columna Derecha: Información de la Villa */}
              <div className="villa-info-column">
                <div className="villa-info-content">
                  <div className="villa-header">
                    <h3 className="villa-name">{villasData[selectedVilla].name}</h3>
                    <p className="villa-tagline">{villasData[selectedVilla].subtitle}</p>
                  </div>
                  
                  <div className="villa-price-tag">{villasData[selectedVilla].price}</div>
                  
                  <div className="villa-specs-grid">
                    <div className="villa-spec-item">
                      <Bed size={28} />
                      <div>
                        <span className="spec-number">{villasData[selectedVilla].bedrooms}</span>
                        <span className="spec-label">Habitaciones</span>
                      </div>
                    </div>
                    <div className="villa-spec-item">
                      <Bath size={28} />
                      <div>
                        <span className="spec-number">{villasData[selectedVilla].bathrooms}</span>
                        <span className="spec-label">Baños</span>
                      </div>
                    </div>
                    {villasData[selectedVilla].lotSize && (
                      <div className="villa-spec-item">
                        <Maximize size={28} />
                        <div>
                          <span className="spec-number">{villasData[selectedVilla].lotSize}</span>
                          <span className="spec-label">Terreno</span>
                        </div>
                      </div>
                    )}
                    <div className="villa-spec-item">
                      <Home size={28} />
                      <div>
                        <span className="spec-number">{villasData[selectedVilla].constructionSize}</span>
                        <span className="spec-label">Construcción</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="villa-features-list">
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
                    className="villa-cta-button"
                  >
                    QUIERO ESTA VILLA
                  </Button>
                </div>
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

      {/* BLOQUE 5: FORM + CTA - Diseño Minimalista Inmobiliario */}
      <section id="form-section" className="section section-form-immobiliaria">
        <div className="container">
          <div className="form-header-immobiliaria">
            <div className="form-brand-mark">AQUA CANA</div>
            <h2 className="form-title-immobiliaria">
              DA EL PRIMER PASO HACIA<br/>TU INVERSIÓN EN EL PARAÍSO
            </h2>
            <p className="form-subtitle-immobiliaria">
              Completa el formulario y un asesor exclusivo te contactará en menos de 24 horas
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="lead-form-immobiliaria">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="nombre">Nombre Completo</label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="input-immobiliaria"
                  required
                />
              </div>
            </div>
            
            <div className="form-row form-row-dual">
              <div className="form-field">
                <label htmlFor="telefono">Teléfono</label>
                <div className="phone-input-immobiliaria">
                  <select
                    name="codigoPais"
                    value={formData.codigoPais}
                    onChange={handleInputChange}
                    className="country-select-immobiliaria"
                  >
                    <option value="+1">+1</option>
                    <option value="+7">+7</option>
                    <option value="+20">+20</option>
                    <option value="+27">+27</option>
                    <option value="+30">+30</option>
                    <option value="+31">+31</option>
                    <option value="+32">+32</option>
                    <option value="+33">+33</option>
                    <option value="+34">+34</option>
                    <option value="+36">+36</option>
                    <option value="+39">+39</option>
                    <option value="+40">+40</option>
                    <option value="+41">+41</option>
                    <option value="+43">+43</option>
                    <option value="+44">+44</option>
                    <option value="+45">+45</option>
                    <option value="+46">+46</option>
                    <option value="+47">+47</option>
                    <option value="+48">+48</option>
                    <option value="+49">+49</option>
                    <option value="+51">+51</option>
                    <option value="+52">+52</option>
                    <option value="+53">+53</option>
                    <option value="+54">+54</option>
                    <option value="+55">+55</option>
                    <option value="+56">+56</option>
                    <option value="+57">+57</option>
                    <option value="+58">+58</option>
                    <option value="+60">+60</option>
                    <option value="+61">+61</option>
                    <option value="+62">+62</option>
                    <option value="+63">+63</option>
                    <option value="+64">+64</option>
                    <option value="+65">+65</option>
                    <option value="+66">+66</option>
                    <option value="+81">+81</option>
                    <option value="+82">+82</option>
                    <option value="+84">+84</option>
                    <option value="+86">+86</option>
                    <option value="+90">+90</option>
                    <option value="+91">+91</option>
                    <option value="+92">+92</option>
                    <option value="+93">+93</option>
                    <option value="+94">+94</option>
                    <option value="+95">+95</option>
                    <option value="+98">+98</option>
                    <option value="+212">+212</option>
                    <option value="+213">+213</option>
                    <option value="+216">+216</option>
                    <option value="+218">+218</option>
                    <option value="+220">+220</option>
                    <option value="+221">+221</option>
                    <option value="+222">+222</option>
                    <option value="+223">+223</option>
                    <option value="+224">+224</option>
                    <option value="+225">+225</option>
                    <option value="+226">+226</option>
                    <option value="+227">+227</option>
                    <option value="+228">+228</option>
                    <option value="+229">+229</option>
                    <option value="+230">+230</option>
                    <option value="+231">+231</option>
                    <option value="+232">+232</option>
                    <option value="+233">+233</option>
                    <option value="+234">+234</option>
                    <option value="+235">+235</option>
                    <option value="+236">+236</option>
                    <option value="+237">+237</option>
                    <option value="+238">+238</option>
                    <option value="+239">+239</option>
                    <option value="+240">+240</option>
                    <option value="+241">+241</option>
                    <option value="+242">+242</option>
                    <option value="+243">+243</option>
                    <option value="+244">+244</option>
                    <option value="+245">+245</option>
                    <option value="+246">+246</option>
                    <option value="+248">+248</option>
                    <option value="+249">+249</option>
                    <option value="+250">+250</option>
                    <option value="+251">+251</option>
                    <option value="+252">+252</option>
                    <option value="+253">+253</option>
                    <option value="+254">+254</option>
                    <option value="+255">+255</option>
                    <option value="+256">+256</option>
                    <option value="+257">+257</option>
                    <option value="+258">+258</option>
                    <option value="+260">+260</option>
                    <option value="+261">+261</option>
                    <option value="+262">+262</option>
                    <option value="+263">+263</option>
                    <option value="+264">+264</option>
                    <option value="+265">+265</option>
                    <option value="+266">+266</option>
                    <option value="+267">+267</option>
                    <option value="+268">+268</option>
                    <option value="+269">+269</option>
                    <option value="+290">+290</option>
                    <option value="+291">+291</option>
                    <option value="+297">+297</option>
                    <option value="+298">+298</option>
                    <option value="+299">+299</option>
                    <option value="+350">+350</option>
                    <option value="+351">+351</option>
                    <option value="+352">+352</option>
                    <option value="+353">+353</option>
                    <option value="+354">+354</option>
                    <option value="+355">+355</option>
                    <option value="+356">+356</option>
                    <option value="+357">+357</option>
                    <option value="+358">+358</option>
                    <option value="+359">+359</option>
                    <option value="+370">+370</option>
                    <option value="+371">+371</option>
                    <option value="+372">+372</option>
                    <option value="+373">+373</option>
                    <option value="+374">+374</option>
                    <option value="+375">+375</option>
                    <option value="+376">+376</option>
                    <option value="+377">+377</option>
                    <option value="+378">+378</option>
                    <option value="+380">+380</option>
                    <option value="+381">+381</option>
                    <option value="+382">+382</option>
                    <option value="+383">+383</option>
                    <option value="+385">+385</option>
                    <option value="+386">+386</option>
                    <option value="+387">+387</option>
                    <option value="+389">+389</option>
                    <option value="+420">+420</option>
                    <option value="+421">+421</option>
                    <option value="+423">+423</option>
                    <option value="+500">+500</option>
                    <option value="+501">+501</option>
                    <option value="+502">+502</option>
                    <option value="+503">+503</option>
                    <option value="+504">+504</option>
                    <option value="+505">+505</option>
                    <option value="+506">+506</option>
                    <option value="+507">+507</option>
                    <option value="+508">+508</option>
                    <option value="+509">+509</option>
                    <option value="+590">+590</option>
                    <option value="+591">+591</option>
                    <option value="+592">+592</option>
                    <option value="+593">+593</option>
                    <option value="+594">+594</option>
                    <option value="+595">+595</option>
                    <option value="+596">+596</option>
                    <option value="+597">+597</option>
                    <option value="+598">+598</option>
                    <option value="+599">+599</option>
                    <option value="+670">+670</option>
                    <option value="+672">+672</option>
                    <option value="+673">+673</option>
                    <option value="+674">+674</option>
                    <option value="+675">+675</option>
                    <option value="+676">+676</option>
                    <option value="+677">+677</option>
                    <option value="+678">+678</option>
                    <option value="+679">+679</option>
                    <option value="+680">+680</option>
                    <option value="+681">+681</option>
                    <option value="+682">+682</option>
                    <option value="+683">+683</option>
                    <option value="+685">+685</option>
                    <option value="+686">+686</option>
                    <option value="+687">+687</option>
                    <option value="+688">+688</option>
                    <option value="+689">+689</option>
                    <option value="+690">+690</option>
                    <option value="+691">+691</option>
                    <option value="+692">+692</option>
                    <option value="+850">+850</option>
                    <option value="+852">+852</option>
                    <option value="+853">+853</option>
                    <option value="+855">+855</option>
                    <option value="+856">+856</option>
                    <option value="+870">+870</option>
                    <option value="+880">+880</option>
                    <option value="+886">+886</option>
                    <option value="+960">+960</option>
                    <option value="+961">+961</option>
                    <option value="+962">+962</option>
                    <option value="+963">+963</option>
                    <option value="+964">+964</option>
                    <option value="+965">+965</option>
                    <option value="+966">+966</option>
                    <option value="+967">+967</option>
                    <option value="+968">+968</option>
                    <option value="+970">+970</option>
                    <option value="+971">+971</option>
                    <option value="+972">+972</option>
                    <option value="+973">+973</option>
                    <option value="+974">+974</option>
                    <option value="+975">+975</option>
                    <option value="+976">+976</option>
                    <option value="+977">+977</option>
                    <option value="+992">+992</option>
                    <option value="+993">+993</option>
                    <option value="+994">+994</option>
                    <option value="+995">+995</option>
                    <option value="+996">+996</option>
                    <option value="+998">+998</option>
                  </select>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="Número de teléfono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="input-immobiliaria phone-number-immobiliaria"
                    required
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="email">Correo Electrónico</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-immobiliaria"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit"
              size="lg"
              className="submit-button-immobiliaria"
            >
              RECIBIR ASESORÍA EXCLUSIVA
            </Button>
            
            <p className="form-privacy-immobiliaria">
              Tu información está protegida. Al enviar este formulario aceptas que un asesor especializado te contacte.
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