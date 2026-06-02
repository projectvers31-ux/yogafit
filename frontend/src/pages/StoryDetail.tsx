import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles, ArrowRight } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';
import storiesData from '@/data/stories.json';
import { trackPageView } from '@/lib/analytics';

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const story = storiesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(`/stories/${id}`, 'Story Detail');
  }, [id]);

  if (!story) {
    return (
      <main id="main-content" className="min-h-screen bg-brand-warm flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl font-bold text-brand-sage">?</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif text-brand-ink mb-4">Story Not Found</h1>
        <p className="text-brand-muted mb-8 max-w-md">The story you are looking for does not exist or has been removed.</p>
        <Link to="/stories" className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-sage/90 transition-all">
          <ArrowLeft size={16} /> Back to Stories
        </Link>
      </main>
    );
  }

  const categoryLabel = story.categoryLabel || story.category.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <main id="main-content" className="min-h-screen bg-brand-warm">
      <SEOHelmet
        title={`${story.name}'s Transformation Story — FitFeky`}
        description={`Read how ${story.name}, ${story.ageRange}, transformed their health: ${story.result}`}
        canonicalPath={`/stories/${story.id}`}
        ldJson={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${story.name}'s Transformation Story`,
          description: story.result,
          author: { '@type': 'Person', name: story.name },
          image: story.image,
        }}
      />

      {/* Back link */}
      <div className="pt-28 pb-4 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/stories"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-muted/60 hover:text-brand-sage transition-colors"
          >
            <ArrowLeft size={12} /> Back to Stories
          </Link>
        </div>
      </div>

      <article className="px-6 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 bg-brand-sage/10 text-brand-sage text-[8px] font-bold uppercase tracking-widest rounded-full border border-brand-sage/20">
                {categoryLabel}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-brand-muted/60">
                <Clock size={10} /> {story.duration}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif text-brand-ink mb-4 leading-tight">
              {story.name}, {story.ageRange}
            </h1>

            <p className="text-base md:text-lg text-brand-muted leading-relaxed">
              {story.result}
            </p>
          </header>

          {/* Image */}
          {story.image && (
            <div className="rounded-2xl overflow-hidden mb-10">
              <img
                src={story.image}
                alt={`${story.name}'s transformation journey`}
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* The Problem */}
          <section className="mb-10">
            <h2 className="text-lg md:text-xl font-serif text-brand-ink mb-3 leading-tight">The Challenge</h2>
            <div className="w-12 h-0.5 bg-brand-sage/40 mb-4" />
            <p className="text-base text-brand-muted leading-relaxed">
              {story.problem}
            </p>
          </section>

          {/* The Journey */}
          <section className="mb-10">
            <h2 className="text-lg md:text-xl font-serif text-brand-ink mb-3 leading-tight">The Journey</h2>
            <div className="w-12 h-0.5 bg-brand-sage/40 mb-4" />
            <p className="text-base text-brand-muted leading-relaxed">
              {story.journey}
            </p>
          </section>

          {/* The Result */}
          <section className="mb-12">
            <h2 className="text-lg md:text-xl font-serif text-brand-ink mb-3 leading-tight">The Result</h2>
            <div className="w-12 h-0.5 bg-brand-sage/40 mb-4" />
            <div className="bg-brand-sage/5 rounded-2xl p-6 md:p-8 border border-brand-sage/10">
              <p className="text-base md:text-lg text-brand-ink leading-relaxed font-medium">
                {story.result}
              </p>
            </div>
          </section>

          {/* Related stories */}
          <section className="border-t border-brand-border/20 pt-8 mb-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-muted/60 mb-4">More Stories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {storiesData
                .filter(s => s.id !== story.id && s.category === story.category)
                .slice(0, 2)
                .map(s => (
                  <Link
                    key={s.id}
                    to={`/stories/${s.id}`}
                    className="bg-white rounded-xl p-4 border border-brand-border/30 hover:border-brand-sage/30 hover:shadow-sm transition-all flex flex-col"
                  >
                    <span className="px-2 py-0.5 bg-brand-sage/10 text-brand-sage text-[7px] font-bold uppercase tracking-widest rounded-full border border-brand-sage/20 w-max mb-2">
                      {s.categoryLabel || s.category.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                    <p className="text-sm font-serif text-brand-ink leading-snug mb-1">{s.name}</p>
                    <p className="text-[11px] text-brand-muted leading-relaxed line-clamp-2">{s.result}</p>
                  </Link>
                ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-linear-to-br from-brand-sage/5 to-brand-blush/10 rounded-3xl p-10 md:p-12 text-center border border-brand-border/30">
            <Sparkles size={28} className="text-brand-sage mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-serif text-brand-ink mb-3 leading-tight">
              Ready for Your Own Transformation?
            </h3>
            <p className="text-sm text-brand-muted mb-6 max-w-md mx-auto leading-relaxed">
              Every journey starts with a single step. Take our free 60-second quiz and discover the plan designed for your body.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-brand-sage/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-sage/20"
              >
                Take the Quiz <ArrowRight size={16} />
              </Link>
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 bg-white text-brand-ink px-6 py-3 rounded-full font-bold text-sm border border-brand-border/40 hover:border-brand-sage/30 hover:-translate-y-0.5 transition-all"
              >
                More Stories
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
