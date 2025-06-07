
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import AnimatedContainer from '../components/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { useParallax } from '../hooks/useScrollAnimation';

const Home = () => {
  const { config, products, isLoading } = useStore();
  const scrollY = useParallax();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-600 border-t-transparent mx-auto mb-6"></div>
          <p className="text-black font-light tracking-wide">Cargando colección premium...</p>
        </div>
      </div>
    );
  }

  if (!config) return null;

  // Filter products based on sections configuration
  const getProductsForSection = (seccion: any) => {
    let filteredProducts = [...products];

    switch (seccion.criterio_productos) {
      case 'ordenar_por_fecha_desc':
        filteredProducts.sort((a, b) => new Date(b.fecha_agregado).getTime() - new Date(a.fecha_agregado).getTime());
        break;
      case 'filtrar_por_etiqueta_popular':
        filteredProducts = filteredProducts.filter(p => p.etiquetas.includes('popular'));
        break;
    }

    return filteredProducts.slice(0, seccion.limite);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Premium Hero Banner */}
      {config.banner_principal_home?.activo && (
        <section className="relative h-[75vh] overflow-hidden">
          <div 
            className="absolute inset-0 parallax-slow"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={config.banner_principal_home.imagen_url_mobile}
              />
              <img
                src={config.banner_principal_home.imagen_url_desktop}
                alt={config.banner_principal_home.alt_text}
                className="w-full h-full object-cover scale-105"
              />
            </picture>
          </div>
          
          {/* Enhanced overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          
          {/* Content with improved text styling */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="text-white max-w-4xl px-6">
              <AnimatedContainer animation="fade-up" delay={200}>
                <h1 className="text-4xl md:text-7xl font-light mb-6 tracking-tight leading-tight text-white drop-shadow-2xl" 
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                  {config.banner_principal_home.titulo_superpuesto}
                </h1>
              </AnimatedContainer>
              
              <AnimatedContainer animation="fade-up" delay={400}>
                <p className="text-lg md:text-2xl mb-10 font-light tracking-wide leading-relaxed max-w-2xl mx-auto text-white/95 drop-shadow-lg" 
                   style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                  {config.banner_principal_home.subtitulo_superpuesto}
                </p>
              </AnimatedContainer>
              
              <AnimatedContainer animation="scale-in" delay={600}>
                <Link to={config.banner_principal_home.link_boton}>
                  <Button 
                    size="lg" 
                    className="bg-red-600 text-white hover:bg-red-700 font-medium px-10 py-4 magnetic-button hover-lift text-lg tracking-wide rounded-lg border-0 shadow-2xl transition-all duration-300"
                  >
                    {config.banner_principal_home.texto_boton}
                  </Button>
                </Link>
              </AnimatedContainer>
            </div>
          </div>

          {/* Minimal floating elements with elegant gray instead of yellow */}
          <div className="absolute top-1/4 left-1/12 w-2 h-2 bg-elegant-gray/60 rounded-full float-gentle"></div>
          <div className="absolute top-1/3 right-1/12 w-1 h-1 bg-white/70 rounded-full float-elegant"></div>
          <div className="absolute bottom-1/4 left-1/6 w-3 h-3 bg-elegant-gray/50 rounded-full float-gentle animation-delay-300"></div>
        </section>
      )}

      {/* Premium Featured Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {config.secciones_home_destacadas?.map((seccion, sectionIndex) => {
          const sectionProducts = getProductsForSection(seccion);
          
          if (sectionProducts.length === 0) return null;

          return (
            <section key={sectionIndex} className="mb-16">
              <AnimatedContainer animation="fade-up" delay={150}>
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-light text-black tracking-tight">{seccion.titulo_seccion}</h2>
                  <Link to="/productos" className="text-black hover:text-red-600 font-light magnetic-button hover:scale-105 transition-all duration-300 elegant-underline tracking-wide text-sm">
                    Ver todo
                  </Link>
                </div>
              </AnimatedContainer>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sectionProducts.map((product, productIndex) => (
                  <AnimatedContainer 
                    key={product.sku} 
                    animation="fade-up" 
                    delay={productIndex * 100}
                    className="hover-lift elegant-shadow-hover"
                  >
                    <ProductCard product={product} />
                  </AnimatedContainer>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Premium Categories Section */}
      <section className="bg-gray-50 py-20 relative overflow-hidden">
        {/* Subtle background elements using elegant gray instead of yellow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-elegant-gray/5 rounded-full mix-blend-multiply filter blur-3xl float-gentle"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/5 rounded-full mix-blend-multiply filter blur-3xl float-elegant"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedContainer animation="fade-up" delay={150}>
            <h2 className="text-3xl font-light text-black text-center mb-12 tracking-tight">Explorar Colecciones</h2>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedContainer animation="fade-left" delay={250}>
              <Link to="/productos?genero=mujer" className="group">
                <div className="relative h-72 overflow-hidden rounded-lg hover-lift glass-morphism elegant-shadow-hover">
                  <img
                    src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop"
                    alt="Mujer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-2xl font-light group-hover:scale-110 transition-transform duration-300 tracking-tight">Mujer</h3>
                    <p className="text-white/80 font-light tracking-wide mt-1 text-sm">Elegancia atemporal</p>
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
            
            <AnimatedContainer animation="scale-in" delay={350}>
              <Link to="/productos?genero=hombre" className="group">
                <div className="relative h-72 overflow-hidden rounded-lg hover-lift glass-morphism elegant-shadow-hover">
                  <img
                    src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=600&fit=crop"
                    alt="Hombre"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-2xl font-light group-hover:scale-110 transition-transform duration-300 tracking-tight">Hombre</h3>
                    <p className="text-white/80 font-light tracking-wide mt-1 text-sm">Estilo moderno</p>
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-right" delay={450}>
              <Link to="/productos?etiquetas=oferta" className="group">
                <div className="relative h-72 overflow-hidden rounded-lg hover-lift glass-morphism elegant-shadow-hover">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                    alt="Ofertas"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/70 via-transparent to-transparent group-hover:from-red-600/50 transition-all duration-300"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-2xl font-light group-hover:scale-110 transition-transform duration-300 tracking-tight">Ofertas</h3>
                    <p className="text-white font-light tracking-wide mt-1 text-sm">Descuentos exclusivos</p>
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
