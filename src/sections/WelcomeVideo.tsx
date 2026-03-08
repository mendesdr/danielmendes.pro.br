import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

export function WelcomeVideo() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // =======================================================================
    // EDITE AQUI: COLE O LINK DO SEU VÍDEO DO YOUTUBE ENTRE AS ASPAS ABAIXO.
    // Exemplo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    // Se deixar vazio (""), a seção do vídeo inteira ficará ESCONDIDA no site.
    // =======================================================================
    const YOUTUBE_URL = "";

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
    }, [YOUTUBE_URL]);

    // Se não tiver URL, a seção não renderiza nada na tela (fica invisível)
    if (!YOUTUBE_URL) return null;

    // Extrair o ID do vídeo do YouTube para criar o link de Embed
    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getVideoId(YOUTUBE_URL);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : '';

    return (
        <section ref={sectionRef} className="relative py-20 bg-dark-light overflow-hidden">
            {/* Elementos de Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="reveal opacity-0 inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-4">
                        Boas-vindas
                    </span>
                    <h2 className="reveal opacity-0 text-3xl sm:text-4xl font-bold text-white mb-4" style={{ animationDelay: '0.1s' }}>
                        Transformando Expectativa em <span className="text-gradient-gold">Realidade</span>
                    </h2>
                    <p className="reveal opacity-0 text-white/60 text-lg max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
                        Aperte o play para entender como podemos gerar resultados reais através da IA e da Liderança Humanizada.
                    </p>
                </div>

                <div className="reveal opacity-0 relative aspect-video rounded-3xl overflow-hidden bg-dark border border-white/10 shadow-2xl group" style={{ animationDelay: '0.3s' }}>
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title="Apresentação Daniel Mendes"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 bg-black/40 backdrop-blur-sm">
                            <Play className="w-16 h-16 mb-4 opacity-50" />
                            <p>Link do vídeo inválido</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
