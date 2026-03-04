import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Clients } from './sections/Clients';
import { Services } from './sections/Services';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Clients />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(220 15% 8%)',
            border: '1px solid hsl(220 15% 18%)',
            color: 'white',
          },
        }}
      />
    </div>
  );
}

export default App;
