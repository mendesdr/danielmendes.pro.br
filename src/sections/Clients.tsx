import { useEffect, useRef } from 'react';
import { Building2 } from 'lucide-react';

const clientsESPM = [
  'Ajinomoto',
  'Leroy Merlin',
  'ITL',
];

const clientsDirect = [
  'UNIPAR',
  'Softys',
  'Leega',
  'Grupo Qualitat',
  'Kapazi',
  'Rede',
  'SteelCorp',
];

export function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="clients" ref={sectionRef} className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Clientes Atendidos
          </span>
          <h2 className="reveal opacity-0 text-3xl sm:text-4xl font-bold text-white mb-4" style={{ animationDelay: '0.1s' }}>
            Algumas das Empresas de diversos setores que <span className="text-gradient-gold">Confiam</span> no Meu Trabalho
          </h2>
          <p className="reveal opacity-0 text-lg text-white/60 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Palestras, workshops e treinamentos
          </p>
        </div>

        {/* Clients Grid */}
        <div className="reveal opacity-0" style={{ animationDelay: '0.3s' }}>
          {/* ESPM Clients */}
          <div className="mb-8">
            <p className="text-white/70 text-sm mb-4 text-center">Através da ESPM</p>
            <div className="flex flex-wrap justify-center gap-4">
              {clientsESPM.map((client, index) => (
                <div
                  key={index}
                  className="group px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
                >
                  <span className="text-white font-semibold group-hover:text-gold transition-colors">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-sm">Clientes Diretos</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Direct Clients */}
          <div className="flex flex-wrap justify-center gap-4">
            {clientsDirect.map((client, index) => (
              <div
                key={index}
                className="group px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-brand/30 hover:bg-blue-brand/5 transition-all duration-300"
              >
                <span className="text-white font-semibold group-hover:text-blue-light transition-colors">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="reveal opacity-0 grid grid-cols-3 gap-6 mt-12" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '20+', label: 'Empresas Atendidas' },
            { value: '200+', label: 'Cursos, Treinamentos e Palestras' },
            { value: '3.5K+', label: 'Profissionais Impactados' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/5"
            >
              <p className="text-2xl sm:text-3xl font-bold text-gradient-gold mb-1">{stat.value}</p>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
