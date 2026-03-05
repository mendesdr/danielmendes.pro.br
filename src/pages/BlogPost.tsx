import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogPost } from '../lib/blog';
import { getPostBySlug } from '../lib/blog';
import { ArrowLeft, Calendar } from 'lucide-react';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    if (slug) {
      getPostBySlug(slug).then(data => {
        setPost(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-dark flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-dark flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
        <Link to="/blog" className="text-gold hover:underline">
          Voltar para o Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={20} />
          Voltar para o Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="flex items-center gap-4 mb-6 text-sm font-semibold text-white/70">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString('pt-BR')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
               <img src="/daniel-hero.jpg" alt="Daniel Mendes" className="w-full h-full object-cover" loading="lazy" width="48" height="48" />
             </div>
             <div>
               <p className="text-white font-semibold">Daniel Mendes</p>
               <p className="text-white/70 text-sm">Professor ESPM & Especialista em IA</p>
             </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="w-full aspect-video rounded-3xl overflow-hidden bg-dark mb-16">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
              fetchpriority="high"
              loading="eager"
            />
          </div>
        )}

        {/* Article Content - Markdown Rendering */}
        <article className="prose prose-invert prose-lg max-w-none 
          prose-headings:text-white prose-headings:font-bold 
          prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12
          prose-h3:text-2xl prose-h3:text-gold 
          prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-blue-light hover:prose-a:text-gold prose-a:transition-colors
          prose-strong:text-white prose-strong:font-bold
          prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-white/90 prose-blockquote:italic
          prose-li:text-white/80 prose-ul:mb-8
          prose-img:rounded-2xl"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-card border border-white/5 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Pronto para transformar sua equipe?
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Agende um diagnóstico gratuito e descubra como podemos aplicar a Inteligência Artificial e a Liderança Humanizada no seu negócio.
          </p>
          <Link 
            to="/#contact" 
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-dark font-bold rounded-xl hover:bg-gold-light transition-all duration-300 hover:-translate-y-1 shadow-glow"
          >
            Agendar Diagnóstico Gratuito
          </Link>
        </div>

      </div>
    </div>
  );
}
