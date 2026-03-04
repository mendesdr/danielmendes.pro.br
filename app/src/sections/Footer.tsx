import { Linkedin, Youtube, Instagram, Heart, ExternalLink } from 'lucide-react';

// TikTok icon component
function TikTokIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

const footerLinks = {
  navigation: [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre', href: '#about' },
    { label: 'Serviços', href: '#services' },
    { label: 'Depoimentos', href: '#testimonials' },
    { label: 'Contato', href: '#contact' },
  ],
  services: [
    { label: 'Palestras', href: '#services' },
    { label: 'Workshops', href: '#services' },
    { label: 'Mentoria', href: '#services' },
    { label: 'Consultoria', href: '#contact' },
  ],
  resources: [
    { label: 'Podcast Psicopositiva', href: 'https://youtube.com/@psicopositiva', external: true },
    { label: 'Teste VIA', href: 'https://dm.pro.viasurvey.org', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-mendes', external: true },
    { label: 'TikTok', href: 'https://tiktok.com/@danielmendes.me', external: true },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/daniel-mendes', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@psicopositiva', label: 'YouTube' },
  { icon: Instagram, href: 'https://instagram.com/danielrmendes', label: 'Instagram' },
  { icon: TikTokIcon, href: 'https://tiktok.com/@danielmendes.me', label: 'TikTok', isCustom: true },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-dark border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-glow">
                <span className="text-dark font-bold text-xl">DM</span>
              </div>
              <span className="text-white font-semibold text-xl">
                Daniel<span className="text-gold">Mendes</span>
              </span>
            </a>
            <p className="text-white/60 mb-6 max-w-sm">
              Transformando expectativa em realidade através da interseção entre 
              <span className="text-gold"> Tecnologia (IA)</span> e{' '}
              <span className="text-blue-light">Humanidade (Psicologia)</span>.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.isCustom ? (
                    <social.icon className="w-5 h-5" />
                  ) : (
                    <social.icon className="w-5 h-5" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-white/60 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-white/60 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={!link.external ? (e) => { e.preventDefault(); scrollToSection(link.href); } : undefined}
                    className="text-white/60 hover:text-gold transition-colors duration-300 inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Daniel Mendes. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-red-500 fill-red-500" /> em São Paulo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
