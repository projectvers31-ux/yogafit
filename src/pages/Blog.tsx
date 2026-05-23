import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Search, ChevronLeft, ChevronRight, Calculator } from 'lucide-react';
import { articles, categories, featuredArticles, paginateArticles } from '@/content/blogArticles';
import type { BlogArticle } from '@/content/blogArticles';
import { trackPageView } from '@/lib/analytics';
import SEOHelmet from '@/components/seo/SEOHelmet';
import { breadcrumbSchema } from '@/lib/seo';
import SafeImage from '@/components/ui/SafeImage';

const PER_PAGE = 9;

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('/blog', 'Blog');
  }, []);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);

  const filtered = useMemo(() => {
    let list = activeCategory === 'All' ? articles : articles.filter(a => a.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const { items: pageItems, totalPages } = useMemo(
    () => paginateArticles(filtered, page, PER_PAGE),
    [filtered, page]
  );

  const showFeatured = activeCategory === 'All' && !searchQuery.trim();

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://fitfeky.com/' },
    { name: 'Blog', url: 'https://fitfeky.com/blog' }
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      <SEOHelmet
        title="Blog — Science-Backed Wellness for Women"
        description="Research-driven articles on yoga, energy, and home wellness for women. Written for busy moms who want real results."
        canonicalPath="/blog"
        ldJson={breadcrumb}
      />

      {/* Header */}
      <section className="py-12 md:py-20 px-4 md:px-12 bg-white border-b border-brand-border">
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
      {showFeatured && featuredArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-12 py-10 md:py-14">
          <h2 className="text-lg font-bold uppercase tracking-widest text-brand-muted/60 mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-brand-border bg-white hover:shadow-lg transition-all"
              >
                <div className="aspect-2/1 overflow-hidden">
                  <SafeImage
                    src={article.ogImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    width={800}
                    height={400}
                  />
                </div>
                <div className="p-5 md:p-7">
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

      {/* Search + Filter Bar */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 pb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
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
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted/40" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-brand-border/40 rounded-xl text-sm text-brand-ink placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
              aria-label="Search articles"
            />
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pageItems.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <SafeImage
                  src={article.ogImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  width={400}
                  height={225}
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

        {pageItems.length === 0 && (
          <div className="text-center py-20 text-brand-muted italic">
            {searchQuery ? `No articles match "${searchQuery}". Try a different search term.` : 'No articles in this category yet. Check back soon!'}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-full border border-brand-border/40 flex items-center justify-center text-brand-muted hover:border-brand-sage/40 hover:text-brand-sage transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${
                  p === page
                    ? 'bg-brand-sage text-white'
                    : 'border border-brand-border/40 text-brand-muted hover:border-brand-sage/40 hover:text-brand-sage'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-full border border-brand-border/40 flex items-center justify-center text-brand-muted hover:border-brand-sage/40 hover:text-brand-sage transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Internal link to TDEE Calculator */}
        <section className="max-w-6xl mx-auto px-4 md:px-12 pb-10">
          <div className="bg-gradient-to-r from-brand-sage/5 to-brand-blush/30 border border-brand-border/30 rounded-2xl p-6 md:p-8 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-2">Free Fitness Tool</p>
            <h2 className="text-lg md:text-xl font-serif text-brand-ink mb-2">Calculate Your Exact Daily Calories</h2>
            <p className="text-sm text-brand-muted mb-4 max-w-xl mx-auto">
              Use our free TDEE calculator to find your maintenance calories, fat loss deficit, and personalized nutrition strategy.
            </p>
            <Link to="/calculators/tdee-calculator"
              className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all shadow-md shadow-brand-sage/20">
              <Calculator size={14} /> TDEE Calculator
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
