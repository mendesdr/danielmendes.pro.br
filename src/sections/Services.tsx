import { useEffect, useRef } from 'react';
import { Mic, Users, Brain, Sparkles, Target, Zap, MessageSquare, Calendar } from 'lucide-react';

const services = [
  {
    icon: Mic,
    title: 'Palestras',
    subtitle: 'Inspire sua audiência',
    description: 'Palestras sob medida para eventos corporativos, congressos e workshops com conteúdo prático e embasamento científico.',
    topics: [
      'IA Generativa nos Negócios',
      'Liderança Humanizada',
      'IA + Humanidade',
      'Felicidade no Trabalho',
    ],
    color: 'gold',
    cta: 'Solicite uma Proposta',
    link: '#contact',
  },
  {
    icon: Users,
    title: 'Workshops e Mentorias em Grupo',
    subtitle: 'Aprendizado prático',
    description: 'Workshops interativos que combinam teoria e prática para transformar conhecimento em ação imediata.',
    topics: [
      'Design Instrucional com IA',
      'Metodologias Ativas',
      'Ferramentas Tech (Gamma, Suno, NotebookLM)',
      'Criação de Treinamentos',
    ],
    color: 'blue',
    cta: 'Solicite uma Proposta',
    link: '#contact',
  },
  {
    icon: Brain,
    title: 'Mentoria Individual',
    subtitle: 'Desenvolvimento personalizado',
    description: 'Programa personalizado que combina ciência da psicologia positiva, inteligência emocional e ferramentas de IA.',
    topics: [
      'Psicologia Positiva Aplicada',
      'Inteligência Emocional',
      'Produtividade com IA',
      'Clareza de Propósito',
    ],
    color: 'gold',
    cta: 'Agende uma Conversa',
    link: 'https://calendar.app.google/HBSKGgwkTEA2kzZf7',
  },
];

const features = [
  { icon: Sparkles, title: 'Prontidão para o Futuro', description: 'Equipes que compreendem e operam a IA ao invés de temê-la' },
  { icon: Target, title: 'Mais Produtividade', description: 'Processos aprimorados que geram eficiência real no dia a dia' },
  { icon: Zap, title: 'Liderança Conectada', description: 'Gestores capazes de inspirar engajamento humano em suas equipes' },
  { icon: MessageSquare, title: 'Bem-estar Corporativo', description: 'Resiliência emocional construída na Ciência da Psicologia Positiva' },
];

export function Services() {
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
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-light">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal opacity-0 inline-block px-4 py-1.5 rounded-full bg-blue-brand/10 border border-blue-brand/20 text-blue-light text-sm font-medium mb-4">
            Serviços
          </span>
          <h2 className="reveal opacity-0 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ animationDelay: '0.1s' }}>
            Como Posso <span className="text-gradient-blue">Ajudar</span>
          </h2>
          <p className="reveal opacity-0 text-lg text-white/60 max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Ofereço soluções personalizadas para profissionais de T&D, líderes e empresas
            que buscam transformação através da IA e liderança humanizada
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="reveal opacity-0 group relative"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className={`relative p-8 rounded-2xl bg-gradient-card border border-white/5 hover:border-${service.color}/30 transition-all duration-500 hover-lift h-full flex flex-col`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-${service.color}/10 flex items-center justify-center mb-6 group-hover:bg-${service.color}/20 transition-colors`}>
                  <service.icon className={`w-8 h-8 text-${service.color === 'gold' ? 'gold' : 'blue-light'}`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className={`text-sm font-medium mb-4 ${service.color === 'gold' ? 'text-gold' : 'text-blue-light'}`}>
                  {service.subtitle}
                </p>
                <p className="text-white/60 mb-6 flex-grow">{service.description}</p>

                {/* Topics */}
                <div className="space-y-2 mb-8">
                  {service.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${service.color === 'gold' ? 'bg-gold' : 'bg-blue-light'}`} />
                      <span className="text-white/70 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={service.link}
                  target={service.link.startsWith('http') ? '_blank' : undefined}
                  rel={service.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={!service.link.startsWith('http') ? (e) => {
                    e.preventDefault();
                    document.querySelector(service.link)?.scrollIntoView({ behavior: 'smooth' });
                  } : undefined}
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${service.color === 'gold'
                    ? 'bg-gold text-dark hover:bg-gold-light hover:shadow-glow'
                    : 'bg-blue-brand text-white hover:bg-blue-light hover:shadow-glow-blue'
                    }`}
                >
                  <Calendar size={18} />
                  {service.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="reveal opacity-0 p-8 rounded-3xl bg-gradient-card border border-white/5" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Resultados da <span className="text-gradient-gold">Transformação</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-5 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Call - Prática Imediata */}
        <div className="reveal opacity-0 mt-16 text-center" style={{ animationDelay: '0.8s' }}>
          <p className="text-xl sm:text-2xl font-medium text-white mb-8">
            Qual dessas transformações sua equipe precisa para amanhã?
          </p>
          <a
            href="https://wa.me/5511930301065?text=Olá%20Daniel,%20gostaria%20de%20conversar%20sobre%20como%20transformar%20minha%20equipe."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-glow"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
