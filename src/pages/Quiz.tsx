import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type Question = {
    id: number;
    text: string;
    inverse?: boolean;
};

type Block = {
    title: string;
    description: string;
    questions: Question[];
};

const quizBlocks: Block[] = [
    {
        title: 'Bloco 1: O Framework PATE',
        description: 'Interação e estruturação do pensamento com a Inteligência Artificial.',
        questions: [
            { id: 1, text: 'Antes de usar o ChatGPT (ou similar), eu/minha equipe estruturamos claramente o problema, e não aceitamos a primeira resposta gerada sem questionar criticamente sua validade.' },
            { id: 2, text: 'Utilizamos a IA ativamente como uma ferramenta de aprendizado contínuo para adquirir novas habilidades, e não apenas como um atalho para terceirizar tarefas repetitivas.' },
            { id: 3, text: 'A inteligência artificial é usada em nossos processos como uma parceira de brainstorming para expandir nossa criatividade e gerar soluções fora da caixa.' },
            { id: 4, text: 'Temos facilidade em traduzir pensamentos complexos em textos, processos ou prompts estruturados que geram resultados de alto nível.' },
            { id: 5, text: 'Sinto que, sem o auxílio da Inteligência Artificial hoje, a qualidade e velocidade do meu trabalho (ou da minha equipe) cairiam drasticamente.', inverse: true },
        ],
    },
    {
        title: 'Bloco 2: O Framework P3A',
        description: 'Gerenciamento, Plano, Ação, Acompanhamento e Ajuste.',
        questions: [
            { id: 6, text: 'Antes de iniciar um projeto ou adotar uma nova tecnologia, realizamos um diagnóstico claro da situação atual e definimos com precisão a situação desejada.' },
            { id: 7, text: 'Nossa equipe não fica paralisada no excesso de planejamento; conseguimos colocar os projetos técnicos e operacionais em prática rapidamente.' },
            { id: 8, text: 'Temos métricas claras e ritos estabelecidos para monitorar o progresso das ações de forma consistente.' },
            { id: 9, text: 'Quando lidamos com imprevistos ou falhas em um projeto, temos agilidade e resiliência para recalcular a rota sem focar em procurar culpados.' },
            { id: 10, text: 'Os membros da equipe têm clareza do que precisa ser feito e conseguem tomar decisões táticas no dia a dia sem depender constantemente de aprovação superior.' },
        ],
    },
    {
        title: 'Bloco 3: Inteligência Emocional',
        description: 'Mindfulness, Flexibilidade e a Base Humana da equipe.',
        questions: [
            { id: 11, text: 'Durante as reuniões, conversas e execução de tarefas cruciais, eu e minha equipe conseguimos manter foco e atenção plena ao momento presente, evitando distrações digitais.' },
            { id: 12, text: 'Diante de crises, pressão por resultados ou mudanças abruptas de tecnologia, conseguimos gerenciar o estresse e manter a clareza mental para tomar boas decisões.' },
            { id: 13, text: 'Há uma abertura psicológica genuína na equipe para desaprender métodos antigos e adotar novas formas de trabalhar e pensar.' },
            { id: 14, text: 'Nossas decisões de negócios e adoção de inovações estão sempre alinhadas aos nossos princípios e valores fundamentais, garantindo que o fator humano não se perca.' },
            { id: 15, text: 'O ambiente da equipe encoraja o compartilhamento de erros, dúvidas sobre novas tecnologias e vulnerabilidades sem medo de represálias.' },
        ],
    },
];

const likertOptions = [
    { value: 1, label: 'Discordo Totalmente / Nunca' },
    { value: 2, label: 'Discordo em Parte' },
    { value: 3, label: 'Neutro' },
    { value: 4, label: 'Concordo em Parte' },
    { value: 5, label: 'Concordo Totalmente / Sempre' },
];

export function Quiz() {
    const [currentBlock, setCurrentBlock] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        acceptsNewsletter: true,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentBlock, showForm]);

    const handleAnswer = (questionId: number, value: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const isBlockComplete = () => {
        const block = quizBlocks[currentBlock];
        return block.questions.every((q) => answers[q.id] !== undefined);
    };

    const handleNext = () => {
        if (currentBlock < quizBlocks.length - 1) {
            setCurrentBlock((prev) => prev + 1);
        } else {
            setShowForm(true);
        }
    };

    const handlePrev = () => {
        if (showForm) {
            setShowForm(false);
        } else if (currentBlock > 0) {
            setCurrentBlock((prev) => prev - 1);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (e.target.name === 'phone') {
            value = value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: value,
        }));
    };

    const calculateScore = () => {
        let total = 0;
        Object.keys(answers).forEach((key) => {
            const qId = parseInt(key);
            let value = answers[qId];

            // Encontra se a pergunta é invertida
            let isInverse = false;
            quizBlocks.forEach(b => {
                b.questions.forEach(q => {
                    if (q.id === qId && q.inverse) isInverse = true;
                });
            });

            if (isInverse) {
                // Inverte a pontuação (5 vira 1, 1 vira 5)
                value = 6 - value;
            }
            total += value;
        });
        return total;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const score = calculateScore();

        try {
            const response = await fetch('/api/submit-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    score,
                    answers,
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                toast.success('Diagnóstico concluído!', {
                    description: 'Seu relatório foi enviado para o e-mail informado.',
                });
            } else {
                throw new Error('Erro ao enviar');
            }
        } catch (error) {
            toast.error('Ocorreu um erro', {
                description: 'Não foi possível gerar seu diagnóstico agora. Tente novamente.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // SUCCESS STATE
    if (isSuccess) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-dark">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px]" />
                </div>
                <div className="relative z-10 max-w-lg w-full bg-gradient-card border border-white/10 rounded-3xl p-8 sm:p-12 text-center animate-fade-in-up">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gold/20 flex items-center justify-center mb-8 border border-gold/30">
                        <CheckCircle2 className="w-10 h-10 text-gold" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Relatório Enviado!</h2>
                    <p className="text-white/70 text-lg mb-8">
                        Enviamos o resultado do seu <strong>Raio-X PATE e P3A</strong> com a sua classificação de maturidade diretamente para o e-mail <strong>{formData.email}</strong>.
                    </p>
                    <Button onClick={() => window.location.href = '/'} className="w-full bg-white/10 text-white hover:bg-white/20 h-12">
                        Voltar para o site
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-dark">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-brand/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-4">
                        Diagnóstico Gratuito
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Raio-X PATE: Maturidade na Liderança
                    </h1>
                    <p className="text-white/60">
                        Descubra o nível de maturidade da sua equipe na adoção de IA e gestão com Inteligência Emocional.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-gradient-card border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm text-white/50 mb-2">
                            <span>{showForm ? 'Resultado' : `Etapa ${currentBlock + 1} de ${quizBlocks.length}`}</span>
                            <span>{showForm ? '100%' : `${Math.round(((currentBlock) / (quizBlocks.length)) * 100)}%`}</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
                                style={{ width: showForm ? '100%' : `${((currentBlock) / (quizBlocks.length)) * 100}%` }}
                            />
                        </div>
                    </div>

                    {!showForm ? (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">{quizBlocks[currentBlock].title}</h2>
                                <p className="text-white/60">{quizBlocks[currentBlock].description}</p>
                            </div>

                            <div className="space-y-10">
                                {quizBlocks[currentBlock].questions.map((q) => (
                                    <div key={q.id} className="space-y-4">
                                        <p className="text-white/90 text-lg leading-relaxed">
                                            <span className="text-gold font-bold mr-2">{q.id}.</span>
                                            {q.text}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                                            {likertOptions.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleAnswer(q.id, opt.value)}
                                                    className={`p-3 rounded-xl border text-sm transition-all duration-200 flex flex-col items-center justify-center gap-2
                            ${answers[q.id] === opt.value
                                                            ? 'bg-gold/20 border-gold/50 text-gold shadow-[0_0_15px_rgba(255,215,0,0.1)]'
                                                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                                                        }`}
                                                >
                                                    <span className="font-bold text-lg">{opt.value}</span>
                                                    <span className="text-xs text-center hidden sm:block opacity-70">{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {/* Legenda visível apenas no mobile para contexto */}
                                        <div className="flex justify-between text-xs text-white/40 sm:hidden px-1">
                                            <span>Discordo</span>
                                            <span>Concordo</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/10">
                                <Button
                                    onClick={handlePrev}
                                    disabled={currentBlock === 0}
                                    variant="outline"
                                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 gap-2 px-6"
                                >
                                    <ChevronLeft size={18} /> Anterior
                                </Button>

                                <Button
                                    onClick={handleNext}
                                    disabled={!isBlockComplete()}
                                    className="bg-gold text-dark font-semibold hover:bg-gold-light hover:shadow-glow gap-2 px-8"
                                >
                                    Próximo <ArrowRight size={18} />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="animate-fade-in">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Quase lá!</h2>
                                <p className="text-white/60">
                                    Preencha os dados abaixo para visualizar seu Escore de Maturidade e receber o relatório completo por e-mail.
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white/80">Nome Completo *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        className="bg-white/5 border-white/10 text-white focus:border-gold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white/80">E-mail Corporativo *</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        className="bg-white/5 border-white/10 text-white focus:border-gold"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-white/80">WhatsApp *</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleFormChange}
                                            placeholder="(00) 00000-0000"
                                            className="bg-white/5 border-white/10 text-white focus:border-gold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company" className="text-white/80">Empresa *</Label>
                                        <Input
                                            id="company"
                                            name="company"
                                            required
                                            value={formData.company}
                                            onChange={handleFormChange}
                                            className="bg-white/5 border-white/10 text-white focus:border-gold"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 mt-6">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="newsletter"
                                            type="checkbox"
                                            checked={formData.acceptsNewsletter}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, acceptsNewsletter: e.target.checked }))}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold/20"
                                        />
                                    </div>
                                    <Label htmlFor="newsletter" className="text-sm text-white/70 leading-snug cursor-pointer font-normal">
                                        Quero receber insights semanais sobre Inteligência Artificial e Inteligência Humana.
                                    </Label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                <Button
                                    type="button"
                                    onClick={handlePrev}
                                    variant="outline"
                                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 gap-2 px-6"
                                >
                                    <ChevronLeft size={18} /> Voltar
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-gold text-dark font-semibold hover:bg-gold-light hover:shadow-glow gap-2 px-8"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                                            Processando...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Ver meu Resultado <Send size={16} />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
