import { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Roger Vesco',
    role: 'Communications Specialist',
    company: 'ESPM MBA',
    content: 'Tive o privilégio de ser aluno do Daniel na disciplina de Inteligência Artificial no MBA da ESPM e, honestamente, a experiência superou todas as minhas expectativas. O Daniel não é apenas um mestre em IA. Ele tem uma habilidade incrível de descomplicar temos complexos, tornando-os não só compreensíveis, mas extremamente interessantes.',
    rating: 5,
  },
  {
    name: 'Lucio Pereira',
    role: 'Diretor de Desenvolvimento de Negócios',
    company: 'Multinacional',
    content: 'Daniel é um profissional exemplar e foi um ponto de referência inestimável durante meu período sabático. Ele compartilhou seus conhecimentos baseados em psicologia positiva comigo em sessões semanais e essa experiência alavancou meu auto-conhecimento, ajudou na recongrafia de minha confiança e fortaleceu minha esperança em plena pandemia.',
    rating: 5,
  },
  {
    name: 'Carolina Ruiz de Figueiredo',
    role: 'HR Business Partner',
    company: 'Consultora de Carreira',
    content: 'Conheci o Daniel em uma Formação de Desenvolvimento Humano e logo nos conectamos. Daniel me apoiou com sessões de mentoria trazendo uma ferramenta diferenciada que me ajudou a olhar para minhas forças e virtudes contribuindo com meu desenvolvimento. É um profissional que se conecta genuinamente com as pessoas.',
    rating: 5,
  },
  {
    name: 'João Carlos Apolônio',
    role: 'Gerente Comercial',
    company: 'VLI',
    content: 'Tive o privilégio de ser aluno do Professor Daniel durante meu MBA na ESPM e posso afirmar que foi uma das experiências de aprendizado mais transformadoras da minha carreira. O que mais me impressiona no Daniel é sua capacidade única de conectar temas técnicos complexos com um olhar genuinamente humano.',
    rating: 5,
  },
  {
    name: 'Julio Nogueira',
    role: 'Senior Project Manager',
    company: 'Executivo',
    content: 'Tive três interações com o Daniel e posso afirmar que todas foram intensas e profundas. Saí de cada uma delas mais enriquecido do que entrei. Uma simples conversa se transformou em uma sessão de aprendizados profundos e transformadores. Na sessão de devolutiva, Daniel revelou um conteúdo rico em potencialidades.',
    rating: 5,
  },
  {
    name: 'Matheus Alves Berzotti',
    role: 'Gerente Comercial',
    company: 'ESPM MBA',
    content: 'Professor Daniel tem uma didática fantástica com seus alunos. Tive o prazer de ter aula com o Daniel em nosso MBA na ESPM, ministrou curso voltado a matéria de Inteligência Artificial, Tecnologia e Growth Marketing. Sua facilidade em explicar sobre Inteligência Artificial abriu horizonte para toda a turma.',
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-brand/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal opacity-0 inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="reveal opacity-0 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ animationDelay: '0.1s' }}>
            O Que Dizem <span className="text-gradient-gold">Sobre Mim</span>
          </h2>
          <p className="reveal opacity-0 text-lg text-white/60 max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Histórias reais de profissionais que transformaram suas carreiras através do meu trabalho
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="reveal opacity-0 relative max-w-4xl mx-auto" style={{ animationDelay: '0.3s' }}>
          {/* Main Card */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-card border border-white/5">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gold flex items-center justify-center">
              <Quote className="w-6 h-6 text-dark" />
            </div>

            {/* Content */}
            <div className="pt-4">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 min-h-[120px]">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/30 to-blue-brand/30 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-gold text-sm">{testimonials[currentIndex].role}</p>
                    <p className="text-white/50 text-sm">{testimonials[currentIndex].company}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={goToPrev}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-gold/30 hover:bg-gold/10 transition-all duration-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gold'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
