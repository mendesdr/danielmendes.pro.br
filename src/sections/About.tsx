import { useEffect, useRef } from 'react';
import { Award, BookOpen, Brain, Lightbulb, Users, GraduationCap, ExternalLink } from 'lucide-react';

const credentials = [
  {
    icon: GraduationCap,
    title: 'Mestrado em Psicologia',
    subtitle: 'Universidade Metodista',
    description: 'Psicologia da Saúde e Organizacional - Bolsa CAPES',
  },
  {
    icon: BookOpen,
    title: 'MBA Marketing & Vendas',
    subtitle: 'Universidade de Franca',
    description: 'Especialização em Negócios',
  },
  {
    icon: Brain,
    title: 'Ciência da Computação',
    subtitle: 'UNESP',
    description: 'Bacharelado com bolsa CNPq',
  },
  {
    icon: Award,
    title: 'Coautor de Livro',
    subtitle: 'Editora Leader',
    description: '"A Felicidade Mora e Trabalha Aqui"',
    link: 'https://amzn.to/4r27amR',
  },
];

const expertise = [
  { icon: Lightbulb, title: 'Inteligência Artificial', description: 'IA Generativa aplicada aos negócios' },
  { icon: Users, title: 'Liderança Humanizada', description: 'Gestão focada em pessoas' },
  { icon: Brain, title: 'Psicologia Positiva', description: 'Ciência do bem-estar no trabalho' },
];

export function About() {
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
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-brand/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal opacity-0 inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-4">
            Sobre Mim
          </span>
          <h2 className="reveal opacity-0 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ animationDelay: '0.1s' }}>
            Uma Jornada de <span className="text-gradient-gold">30+ Anos</span>
          </h2>
          <p className="reveal opacity-0 text-lg text-white/60 max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Da tecnologia à psicologia, construí uma carreira única na intersecção entre 
            <span className="text-gold"> TI</span> e <span className="text-blue-light">Humanidade</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left Column - Story */}
          <div className="reveal opacity-0 space-y-6" style={{ animationDelay: '0.3s' }}>
            <div className="p-6 rounded-2xl bg-gradient-card border border-white/5">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-gold" />
                </span>
                Minha Missão
              </h3>
              <p className="text-white/70 leading-relaxed">
                Ajudo profissionais a transformarem expectativa em realidade, usando a 
                <span className="text-gold font-medium"> Inteligência Artificial</span> para potencializar 
                o <span className="text-blue-light font-medium">ser humano</span>. Acredito que a verdadeira 
                inovação nasce da interseção entre tecnologia e humanidade.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-card border border-white/5">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-brand/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-light" />
                </span>
                Atuação
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 bg-gold/30 rounded-full" />
                  <div>
                    <p className="text-white font-medium mb-1">Para Profissionais de T&D</p>
                    <p className="text-white/60 text-sm">
                      Ensino a dominar a IA para criar treinamentos engajadores em tempo recorde. 
                      Design Instrucional com IA, Metodologias Ativas e Ferramentas Tech.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-brand/30 rounded-full" />
                  <div>
                    <p className="text-white font-medium mb-1">Para Líderes e Executivos</p>
                    <p className="text-white/60 text-sm">
                      Desenvolvimento de liderança humanizada, focada em resultados sustentáveis 
                      e bem-estar. Psicologia Organizacional Aplicada, Inteligência Emocional e Produtividade com IA.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Credentials */}
          <div className="reveal opacity-0 space-y-4" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-semibold text-white mb-6">Formação & Conquistas</h3>
            {credentials.map((item, index) => (
              <div
                key={index}
                className="group p-5 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-gold-light transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-gold text-sm mb-1">{item.subtitle}</p>
                    <p className="text-white/50 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {expertise.map((item, index) => (
            <div
              key={index}
              className="reveal opacity-0 group p-6 rounded-2xl bg-gradient-card border border-white/5 hover:border-gold/30 hover:shadow-glow transition-all duration-300 hover-lift"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-white/60 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
