import { Heart, Sparkles, Target, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/seo/SEOHelmet';

export default function About() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-warm">
      <SEOHelmet
        title="About FitFeky — Empowering Women Through Personalized Wellness"
        description="FitFeky creates personalized yoga and fitness programs for women. Our 60-second quiz matches you with the perfect plan for your body and lifestyle."
        canonicalPath="/about"
        ldJson={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About FitFeky',
          description: 'FitFeky creates personalized yoga and fitness programs for women.',
          url: 'https://fitfeky.com/about',
        }}
      />

      <section className="relative pt-36 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-blush/10 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <div className="animate-fadeIn text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
              <Heart size={12} /> Our Mission
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-brand-ink mb-6 leading-tight">
              Empowering Women Through{' '}
              <span className="text-brand-sage italic">Wellness</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
              At FitFeky, we believe fitness should be a celebration of what your body can do — not a punishment for what you ate.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Heart,
                title: 'Simple Plans',
                text: 'We strip away the complexity of traditional fitness, giving you 15-minute routines that fit into any schedule.',
              },
              {
                icon: Sparkles,
                title: 'Women First',
                text: 'Our methods are designed specifically for female physiology, hormones, and lifestyle needs.',
              },
              {
                icon: Target,
                title: 'Real Results',
                text: 'No fluff, no fads. Just science-backed yoga and movement that helps you feel confident and strong.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="animate-fadeIn group relative bg-white p-8 md:p-10 rounded-2xl border border-brand-border/30 hover:border-brand-sand/40 hover:shadow-xl transition-all duration-500"
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-linear-to-br from-brand-sage/10 to-brand-sage/5 rounded-2xl flex items-center justify-center text-brand-sage mb-6 group-hover:scale-105 transition-transform duration-500">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-ink mb-3">{item.title}</h3>
                <p className="text-brand-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fadeIn relative bg-linear-to-br from-brand-sage/5 to-brand-blush/10 rounded-3xl p-10 md:p-16 text-center border border-brand-border/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blush/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="relative">
              <div className="flex justify-center gap-1 text-brand-gold mb-6">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-ink mb-4">Ready to start your journey?</h2>
              <p className="text-lg text-brand-muted mb-8 max-w-xl mx-auto">
                Join 50,000+ women who have already discovered their perfect plan. It only takes 60 seconds.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-brand-sage text-white px-8 py-4 rounded-full font-bold text-base hover:bg-brand-sage/90 hover:-translate-y-0.5 transition-all shadow-xl shadow-brand-sage/20"
              >
                Take the Free Quiz <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
