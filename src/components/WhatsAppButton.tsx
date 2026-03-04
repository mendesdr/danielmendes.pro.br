import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/5511930301065?text=Olá%20Daniel,%20gostaria%20de%20tirar%20uma%20dúvida."
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
            aria-label="Fale comigo no WhatsApp"
        >
            <MessageCircle className="w-7 h-7" />
        </a>
    );
}
