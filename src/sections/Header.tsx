import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#about' },
  { label: 'Clientes', href: '#clients' },
  { label: 'Serviços', href: '#services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If location has a hash and we just navigated to root, scroll to it
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('/')) {
      // It's a route link
      navigate(href);
      return;
    }

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        // Go to home page with hash
        navigate(`/${href}`);
      } else {
        // Smooth scroll if already on home page
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'glass-effect border-b border-white/5 py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('#hero');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-shadow duration-300">
              <span className="text-dark font-bold text-lg">DM</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              Daniel<span className="text-gold">Mendes</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.href);
                }}
                className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="/diagnostico"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/diagnostico');
              }}
              className="px-5 py-2.5 bg-gold text-dark font-semibold text-sm rounded-xl hover:bg-gold-light hover:shadow-glow transition-all duration-300"
            >
              Agende seu Diagnóstico
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
            className="md:hidden p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/5 pt-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  className="px-4 py-3 text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/diagnostico"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/diagnostico');
                }}
                className="mt-2 px-4 py-3 bg-gold text-dark font-semibold text-center rounded-xl hover:bg-gold-light transition-colors"
              >
                Agende seu Diagnóstico
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
