import { Routes, Route } from 'react-router-dom';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { WelcomeVideo } from './sections/WelcomeVideo';
import { About } from './sections/About';
import { Clients } from './sections/Clients';
import { Services } from './sections/Services';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Toaster } from '@/components/ui/sonner';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { Quiz } from './pages/Quiz';

// O conteúdo original da página única de destino
function LandingPage() {
  return (
    <>
      <Hero />
      <WelcomeVideo />
      <About />
      <Clients />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/diagnostico" element={<Quiz />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
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
