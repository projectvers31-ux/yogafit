import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogArticles, categories, featuredArticles } from '@/content/blog';
import { trackPageView } from '@/lib/analytics';
import SEOHelmet from '@/components/seo/SEOHelmet';
import { breadcrumbSchema } from '@/lib/seo';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('/blog', 'Blog');
  }, []);

  const filtered = activeCategory === 'All'
    ? blogArticles
    : blogArticles.filter(a => a.category === activeCategory);

  const breadcrumb = breadcrumbSchema([{ name: 'Home', url: 'https://fitfeky.com/' }, { name: 'Blog', url: 'https://fitfeky.com/blog' }]);

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      <SEOHelmet
        title="Blog — Science-Backed Wellness for Women"
        description="Research-driven articles on yoga, energy, and home wellness for women. Written for busy moms who want real results."
        canonicalPath="/blog"
      />
      {/* Header */}
      <section className="py-16 md:py-24 px-4 md:px-12 bg-white border-b border-brand-border">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
              FitFeky Blog
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-brand-ink mb-4 leading-tight">
              Science-Backed Wellness for <span className="text-brand-sage italic">Real Women</span>
            </h1>
            <p className="text-brand-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Research-driven articles on yoga, energy, and home wellness — written for busy
              women who want real results without the noise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {activeCategory === 'All' && featuredArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-12 py-12 md:py-16">
          <h2 className="text-lg font-bold uppercase tracking-widest text-brand-muted/60 mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-brand-border bg-white hover:shadow-lg transition-all"
              >
                <div className="aspect-2/1 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5 md:p-8">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-3">
                    <span>{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-brand-sage/30" />
                    <span className="text-brand-muted">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif text-brand-ink mb-2 leading-snug group-hover:text-brand-sage transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border ${
                activeCategory === cat
                  ? 'bg-brand-sage text-white border-brand-sage'
                  : 'bg-white text-brand-muted border-brand-border hover:border-brand-sage/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5 flex flex-col grow">
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-3">
                  <Calendar size={10} /> {article.date}
                  <Clock size={10} className="ml-1" /> {article.readTime}
                </div>
                <h3 className="text-base md:text-lg font-serif text-brand-ink mb-2 leading-snug group-hover:text-brand-sage transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-4 grow">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-brand-sage text-[10px] font-bold uppercase tracking-widest">
                  Read More <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-brand-muted italic">
            No articles in this category yet. Check back soon!
          </div>
        )}
      </section>
    </main>
  );
}
