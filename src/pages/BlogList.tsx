import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../lib/blog';
import { getAllPosts } from '../lib/blog';
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react';

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Scroll to top when entering page
    window.scrollTo(0, 0);
    
    // Load posts
    getAllPosts().then(data => {
      setPosts(data);
    });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={20} />
          Voltar para Home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-4">
            Blog & Artigos
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Meus <span className="text-gradient-gold">Artigos</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Reflexões sobre Tecnologia, Liderança Humanizada, Inteligência Artificial e a intersecção entre produtividade e pessoas.
          </p>
        </div>

        {/* Grid of Posts */}
        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`}
              className="group rounded-3xl overflow-hidden bg-gradient-card border border-white/5 hover:border-gold/30 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
            >
              {/* Cover Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-xs font-semibold text-white/50">
                  <span className="px-3 py-1 rounded-full bg-gold/10 text-gold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-white/60 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-sm font-bold text-gold group-hover:text-white transition-colors">
                  Ler artigo
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
          
          {posts.length === 0 && (
            <div className="col-span-full py-16 text-center text-white/40">
              <p>Nenhum artigo encontrado. Em breve novos conteúdos!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
