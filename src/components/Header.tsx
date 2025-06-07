
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from '@/components/ui/button';
import { useMagneticEffect } from '../hooks/useScrollAnimation';

const Header = () => {
  const { config, getCartItemsCount } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const cartItemsCount = getCartItemsCount();
  const logoRef = useMagneticEffect();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?buscar=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  if (!config) return null;

  console.log('Header - config.links_redes_sociales:', config.links_redes_sociales);

  return (
    <header className={`bg-elegant-white border-b border-elegant-border sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'elegant-shadow backdrop-blur-md bg-elegant-white/95' : 'elegant-shadow'
    }`}>
      {/* Premium top bar */}
      <div className="bg-elegant-black text-elegant-white py-2 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm relative z-10 text-elegant">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-elegant-red transition-all duration-300 cursor-pointer">
              <Phone className="w-3 h-3" />
              <span className="font-light tracking-wide">{config.telefono_contacto_visible}</span>
            </span>
            <span className="hidden md:block hover:text-elegant-red transition-all duration-300 cursor-pointer font-light tracking-wide">
              {config.email_contacto_principal}
            </span>
          </div>
          <div className="flex items-center gap-6">
            {config.links_redes_sociales?.instagram && (
              <a href={config.links_redes_sociales.instagram} target="_blank" rel="noopener noreferrer" 
                 className="hover:text-elegant-red transition-all duration-300 hover:scale-105 font-light tracking-wider text-xs">
                Instagram
              </a>
            )}
            {config.links_redes_sociales?.facebook && (
              <a href={config.links_redes_sociales.facebook} target="_blank" rel="noopener noreferrer" 
                 className="hover:text-elegant-red transition-all duration-300 hover:scale-105 font-light tracking-wider text-xs">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main header with improved spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-8">
          {/* Logo section - responsive sizing */}
          <div className="flex-shrink-0 min-w-[160px] lg:min-w-[200px]">
            <Link to="/" className="flex items-center">
              <h1 
                ref={logoRef as React.RefObject<HTMLHeadingElement>}
                className="text-lg sm:text-xl lg:text-2xl font-medium text-elegant-black gradient-text hover:scale-105 transition-all duration-300 tracking-tight"
              >
                {config.nombre_tienda}
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation - centered with better spacing */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {(config.menu_navegacion_principal || []).map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  to={item.url}
                  className="text-elegant-black hover:text-elegant-red transition-all duration-300 font-light text-elegant elegant-underline tracking-wide text-sm"
                >
                  {item.texto}
                </Link>
                {item.subcategorias && Array.isArray(item.subcategorias) && (
                  <div className="absolute top-full left-0 mt-2 w-52 glass-morphism elegant-shadow border border-elegant-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-lg">
                    {item.subcategorias.map((subitem, subindex) => (
                      <Link
                        key={subindex}
                        to={subitem.url}
                        className="block px-4 py-3 text-elegant-black hover:bg-elegant-red/5 hover:text-elegant-red transition-all duration-300 first:rounded-t-lg last:rounded-b-lg font-light text-elegant text-sm"
                      >
                        {subitem.texto}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search bar - improved design */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-elegant-border rounded-lg focus:outline-none focus:ring-1 focus:ring-elegant-red focus:border-elegant-red transition-all duration-300 bg-elegant-white font-light text-elegant text-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-elegant-gray hover:text-elegant-red transition-all duration-300 hover:scale-110"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right side icons - improved styling */}
          <div className="flex items-center space-x-2 flex-shrink-0 min-w-[80px] lg:min-w-[100px] justify-end">
            <Button variant="ghost" size="sm" className="hidden md:flex magnetic-button hover-lift p-2 rounded-lg hover:bg-elegant-red/5">
              <User className="w-4 h-4 text-elegant-black hover:text-elegant-red transition-colors duration-300" />
            </Button>
            
            <Link to="/carrito" className="relative">
              <Button variant="ghost" size="sm" className="magnetic-button hover-lift p-2 rounded-lg hover:bg-elegant-red/5">
                <ShoppingBag className="w-4 h-4 text-elegant-black hover:text-elegant-red transition-colors duration-300" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-elegant-red text-elegant-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-md">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden magnetic-button p-2 rounded-lg hover:bg-elegant-red/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4 text-elegant-black" /> : <Menu className="w-4 h-4 text-elegant-black" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-elegant-border rounded-lg focus:outline-none focus:ring-1 focus:ring-elegant-red focus:border-elegant-red transition-all duration-300 bg-elegant-white font-light text-elegant text-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-elegant-gray hover:text-elegant-red transition-all duration-300 hover:scale-110"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-elegant-white border-t border-elegant-border glass-morphism">
          <div className="px-4 py-6 space-y-3">
            {(config.menu_navegacion_principal || []).map((item, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Link
                  to={item.url}
                  className="block py-3 text-elegant-black hover:text-elegant-red font-light text-elegant elegant-underline transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.texto}
                </Link>
                {item.subcategorias && Array.isArray(item.subcategorias) && (
                  <div className="pl-6 space-y-2 mt-2">
                    {item.subcategorias.map((subitem, subindex) => (
                      <Link
                        key={subindex}
                        to={subitem.url}
                        className="block py-2 text-elegant-gray hover:text-elegant-red text-sm font-light transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subitem.texto}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
