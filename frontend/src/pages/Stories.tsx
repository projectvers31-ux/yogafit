import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';
import StoryCard from '@/components/Stories/StoryCard';
import storiesData from '@/data/stories.json';
import { trackPageView } from '@/lib/analytics';
import { Link } from 'react-router-dom';

const categories = ['All', 'Weight Loss', 'Yoga', 'Fitness'] as const;
type Category = typeof categories[number];

const categoryMap: Record<string, string> = {
  'weight_loss': 'Weight Loss',
  'yoga': 'Yoga',
  'fitness': 'Fitness',
};

export default function Stories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const activeCategoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState<Category>(
    categories.includes(activeCategoryParam as Category) ? (activeCategoryParam as Category) : 'All'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('/stories', 'Stories');
  }, []);

  const filtered = useMemo(() => {
    let result = storiesData;

    if (activeCategory !== 'All') {
      const catKey = activeCategory.toLowerCase().replace(' ', '_');
      result = result.filter(s => s.category === catKey);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.problem.toLowerCase().includes(q) ||
        s.journey.toLowerCase().includes(q) ||
        s.result.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat !== 'All') {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    setSearchParams(params, { replace: true });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <main id="main-content" className="min-h-screen bg-brand-warm">
      <SEOHelmet
        title="Real Transformation Stories — FitFeky Women's Fitness"
        description="Read real stories from women who transformed their health and fitness with sustainable yoga, weight loss, and wellness programs. No gimmicks, just real results."
        canonicalPath="/stories"
        ldJson={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Real Transformation Stories',
          description: 'Real stories from women who transformed their health with FitFeky',
        }}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-blush/10 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <div className="animate-fadeIn text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
              <Sparkles size={12} /> Real Stories
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-brand-ink mb-6 leading-tight">
              Women Like You Are{' '}
              <span className="text-brand-sage italic">Transforming</span>
            </h1>
            <p className="text-base md:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
              No transformations happen overnight. These are real women — just like you — who made small, consistent changes and let the results speak for themselves.
            </p>
          </div>
        </div>
      </section>

      {/* Filter + Search */}
      <section className="px-6 md:px-12 pb-6 md:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
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
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-brand-border/40 rounded-xl text-sm text-brand-ink placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
                aria-label="Search stories"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-6xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((story, i) => (
                <StoryCard
                  key={story.id}
                  {...story}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={24} className="text-brand-sage/60" />
              </div>
              <h3 className="text-xl font-serif text-brand-ink mb-2">No stories found</h3>
              <p className="text-sm text-brand-muted mb-6 max-w-md mx-auto">
                Try a different category or search term to find the story you are looking for.
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); setSearchParams({}, { replace: true }); }}
                className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-sage/90 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-br from-brand-sage/5 to-brand-blush/10 rounded-3xl p-10 md:p-16 text-center border border-brand-border/30 overflow-hidden">
            <h2 className="text-2xl md:text-4xl font-serif text-brand-ink mb-4 leading-tight">
              Start Your Own Story
            </h2>
            <p className="text-sm md:text-base text-brand-muted mb-8 max-w-lg mx-auto leading-relaxed">
              Every woman's journey starts with a single step. Take our free 60-second quiz and get a personalized plan designed for your body and your life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-brand-sage text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-sage/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-sage/20"
              >
                Take the Quiz <ArrowRight size={16} />
              </Link>
              <Link
                to="/calculators"
                className="inline-flex items-center gap-2 bg-white text-brand-ink px-8 py-4 rounded-full font-bold text-sm border border-brand-border/40 hover:border-brand-sage/30 hover:-translate-y-0.5 transition-all"
              >
                Explore Tools <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
