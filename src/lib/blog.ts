export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  content: string;
  category: string;
}

// Extract frontmatter logic from Raw Markdown
function parseMarkdown(rawContent: string, slug: string): BlogPost {
  const frontmatterRegex = /---\n([\s\S]*?)\n---/;
  const match = frontmatterRegex.exec(rawContent);
  
  let frontmatter: Record<string, string> = {};
  let content = rawContent;

  if (match) {
    const rawFrontmatter = match[1];
    content = rawContent.replace(match[0], '').trim();
    
    // Parse key-value pairs (e.g., title: "My Title")
    rawFrontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        let value = valueParts.join(':').trim();
        // Remove surrounding quotes if they exist
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        frontmatter[key.trim()] = value;
      }
    });
  }

  return {
    slug,
    title: frontmatter.title || 'Sem título',
    date: frontmatter.date || new Date().toISOString().split('T')[0],
    excerpt: frontmatter.excerpt || '',
    coverImage: frontmatter.coverImage || '/daniel-hero.jpg',
    category: frontmatter.category || 'Geral',
    content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Vite feature to import multiple files automatically
  const rawPosts = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });
  
  const posts: BlogPost[] = [];
  
  for (const path in rawPosts) {
    // Extract filename without extension for the slug
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const rawContent = await rawPosts[path]();
    
    if (typeof rawContent === 'string') {
      posts.push(parseMarkdown(rawContent, slug));
    }
  }
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
