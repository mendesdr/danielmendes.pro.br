import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Calendar, MessageCircle, Linkedin, Youtube, Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// TikTok icon component
function TikTokIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'daniel@danielmendes.pro.br',
    link: 'mailto:daniel@danielmendes.pro.br',
    color: 'gold',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Fale diretamente comigo',
    link: 'https://wa.me/5511930301065?text=Olá%20Daniel,%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços.',
    color: 'blue',
  },
  {
    icon: Calendar,
    title: 'Agenda',
    value: 'Agende uma conversa',
    link: 'https://calendar.app.google/HBSKGgwkTEA2kzZf7',
    color: 'gold',
  },
];

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-mendes', color: 'hover:text-blue-500' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@psicopositiva', color: 'hover:text-red-500' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/danielrmendes', color: 'hover:text-pink-500' },
  { icon: TikTokIcon, label: 'TikTok', href: 'https://tiktok.com/@danielmendes.me', color: 'hover:text-white', isCustom: true },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    demand: '',
    subject: '',
    message: '',
    acceptsNewsletter: false,
  });
  const [acceptsPrivacy, setAcceptsPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use API Route para Envio via Resend
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Mensagem enviada!', {
          description: 'Obrigado pelo contato. Responderei em breve.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          demand: '',
          subject: '',
          message: '',
          acceptsNewsletter: false,
        });
        setAcceptsPrivacy(false);
      } else {
        throw new Error('Erro ao enviar');
      }
    } catch (error) {
      // Fallback: abrir email client
      const mailtoLink = `mailto:daniel@danielmendes.pro.br?subject=${encodeURIComponent(
        `Contato do site: ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\nCelular: ${formData.phone}\nEmpresa: ${formData.company}\nDemanda: ${formData.demand}\n\nMensagem:\n${formData.message}`
      )}`;
      window.open(mailtoLink, '_blank');

      toast.success('Abrindo seu email!', {
        description: 'Clique em enviar no seu aplicativo de email.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        demand: '',
        subject: '',
        message: '',
        acceptsNewsletter: false,
      });
      setAcceptsPrivacy(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;

    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, ''); // Remove non-numeric
      if (value.length > 11) value = value.slice(0, 11); // Max 11 digits

      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-light">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-brand/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="reveal opacity-0 inline-block px-4 py-1.5 rounded-full bg-blue-brand/10 border border-blue-brand/20 text-blue-light text-sm font-medium mb-4">
            Contato
          </span>
          <h2 className="reveal opacity-0 text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ animationDelay: '0.1s' }}>
            Agende seu <span className="text-gradient-blue">Diagnóstico</span>
          </h2>
          <p className="reveal opacity-0 text-lg text-white/60 max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Vamos bater um papo para entender o nível de maturidade da sua equipe em IA e Liderança,
            e traçar um plano de ação para os próximos passos.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Methods */}
            <div className="reveal opacity-0 space-y-4" style={{ animationDelay: '0.3s' }}>
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-${method.color}/10 flex items-center justify-center group-hover:bg-${method.color}/20 transition-colors`}>
                    <method.icon className={`w-6 h-6 ${method.color === 'gold' ? 'text-gold' : 'text-blue-light'}`} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-white font-semibold">{method.title}</p>
                    <p className="text-white/60 text-sm">{method.value}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="reveal opacity-0 p-6 rounded-2xl bg-gradient-card border border-white/5" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-white font-semibold mb-4">Siga-me nas redes</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 ${social.color} hover:border-current hover:bg-current/10 transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="reveal opacity-0 flex items-center gap-3 p-5 rounded-xl bg-white/5 border border-white/5" style={{ animationDelay: '0.5s' }}>
              <MapPin className="w-5 h-5 text-gold" />
              <div>
                <p className="text-white font-medium">São Paulo, Brasil</p>
                <p className="text-white/70 text-sm">Atendimento presencial e online</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="reveal opacity-0 p-8 rounded-2xl bg-gradient-card border border-white/5"
              style={{ animationDelay: '0.4s' }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Agende seu diagnóstico gratuito</h3>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">
                    Nome <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80">
                    Celular
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white/80">
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="demand" className="text-white/80">
                    Demanda <span className="text-gold">*</span>
                  </Label>
                  <Select
                    value={formData.demand}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, demand: value }))}
                    required
                  >
                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white focus:border-gold focus:ring-gold/20 h-10" aria-label="Selecionar demanda">
                      <SelectValue placeholder="Selecione o que procura" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark border-white/10 text-white">
                      <SelectItem value="Palestra" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer focus:text-gold">Palestra</SelectItem>
                      <SelectItem value="Mentoria Individual" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer focus:text-gold">Mentoria Individual</SelectItem>
                      <SelectItem value="Treinamento" className="hover:bg-white/10 focus:bg-white/10 cursor-pointer focus:text-gold">Treinamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white/80">
                    Assunto <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Sobre o que se trata?"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="message" className="text-white/80">
                  Mensagem <span className="text-gold">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-me mais sobre seu projeto ou dúvida..."
                  required
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20 resize-none"
                />
              </div>

              <div className="space-y-4 mb-8 select-none">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      type="checkbox"
                      required
                      checked={acceptsPrivacy}
                      onChange={(e) => setAcceptsPrivacy(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold/20 focus:ring-offset-dark cursor-pointer mt-1"
                    />
                  </div>
                  <Label htmlFor="privacy" className="text-sm text-white/70 leading-snug cursor-pointer">
                    Li e concordo com a <a href="#" className="text-gold hover:underline">Política de Privacidade</a> e autorizo o uso dos meus dados para o agendamento. <span className="text-gold">*</span>
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      type="checkbox"
                      checked={formData.acceptsNewsletter}
                      onChange={(e) => setFormData(prev => ({ ...prev, acceptsNewsletter: e.target.checked }))}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold/20 focus:ring-offset-dark cursor-pointer mt-1"
                    />
                  </div>
                  <Label htmlFor="newsletter" className="text-sm text-white/70 leading-snug cursor-pointer">
                    Aceito receber Insights semanais sobre IA e Inteligência Humana (Opcional).
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-dark font-semibold hover:bg-gold-light hover:shadow-glow transition-all duration-300 h-12"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={18} />
                    Agendar Diagnóstico Gratuito
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
