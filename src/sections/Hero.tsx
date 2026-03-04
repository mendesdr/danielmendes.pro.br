import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Linkedin, Youtube, Instagram } from 'lucide-react';

// TikTok icon component
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-brand/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm text-white/80">Palestras | Treinamentos | Mentorias</span>
            </div>

            {/* Title */}
            <h1 className="reveal opacity-0 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ animationDelay: '0.1s' }}>
              Transformando{' '}
              <span className="text-gradient-gold">Expectativa</span>
              <br />
              em <span className="text-gradient-blue">Realidade</span>
            </h1>

            {/* Subtitle */}
            <p className="reveal opacity-0 text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-xl" style={{ animationDelay: '0.2s' }}>
              Atuo na intersecção entre <span className="text-gold font-medium">Tecnologia</span> e{' '}
              <span className="text-blue-light font-medium">Humanidade</span>.
              Ajudo profissionais e empresas a alcançarem resultados
              através da liderança humanizada e inteligência artificial.
            </p>

            {/* Stats */}
            <div className="reveal opacity-0 flex flex-wrap gap-6 mb-10" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold font-bold text-lg">30+</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Anos</p>
                  <p className="text-white/50 text-sm">Experiência</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-brand/10 border border-blue-brand/20 flex items-center justify-center">
                  <span className="text-blue-light font-bold text-lg">3.5K</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Profissionais</p>
                  <p className="text-white/50 text-sm">Impactados</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold font-bold text-lg">92,4</span>
                </div>
                <div>
                  <p className="text-white font-semibold">NPS</p>
                  <p className="text-white/50 text-sm">Médio</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="reveal opacity-0 flex flex-wrap gap-4 mb-10" style={{ animationDelay: '0.4s' }}>
              <a
                href="https://calendar.app.google/HBSKGgwkTEA2kzZf7"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-dark font-semibold rounded-xl hover:bg-gold-light hover:shadow-glow transition-all duration-300"
              >
                <Calendar size={20} />
                Agende seu diagnóstico de maturidade gratuito
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Links */}
            <div className="reveal opacity-0 flex items-center gap-4" style={{ animationDelay: '0.5s' }}>
              <span className="text-white/50 text-sm">Siga-me:</span>
              <a
                href="https://www.linkedin.com/in/daniel-mendes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://youtube.com/@psicopositiva"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://instagram.com/danielrmendes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/10 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://tiktok.com/@danielmendes.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="reveal opacity-0 relative" style={{ animationDelay: '0.3s' }}>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-blue-brand/30 rounded-3xl blur-3xl scale-110" />

              {/* Image Container */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/20 to-blue-brand/20 p-[2px]">
                  <div className="w-full h-full rounded-3xl overflow-hidden bg-dark">
                    <img
                      src="/daniel-hero.jpg"
                      alt="Daniel Mendes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl glass-effect border border-white/10 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                      <span className="text-dark font-bold">ESPM</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Professor</p>
                      <p className="text-white/50 text-xs">MBA Data Analytics</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -top-16 -left-4 md:-top-4 md:-right-4 md:left-auto px-4 py-3 rounded-xl glass-effect border border-white/10 shadow-xl z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-brand flex items-center justify-center">
                      <span className="text-white font-bold">IA</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Especialista</p>
                      <p className="text-white/50 text-xs">IA e Psicologia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
}
