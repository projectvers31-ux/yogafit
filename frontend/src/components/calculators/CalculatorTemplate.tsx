import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';
import { breadcrumbSchema } from '@/lib/seo';

export interface CalculatorSEO {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  intro: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface CalculatorTemplateProps {
  seo: CalculatorSEO;
  calculatorModule: ReactNode;
  resultsModule: ReactNode;
  educationContent: ReactNode;
  educationTitle: string;
  faqs: FAQItem[];
  ctaTopic: string;
}

export default function CalculatorTemplate({
  seo,
  calculatorModule,
  resultsModule,
  educationContent,
  educationTitle,
  faqs,
  ctaTopic,
}: CalculatorTemplateProps) {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://fitfeky.com/' },
    { name: seo.h1, url: `https://fitfeky.com${seo.canonicalPath}` },
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        ldJson={[
          breadcrumb,
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: seo.h1,
            url: `https://fitfeky.com${seo.canonicalPath}`,
            description: seo.description,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
        ]}
      />

      {/* ===== BREADCRUMB ===== */}
      <div className="max-w-5xl mx-auto px-4 md:px-12 pt-6">
        <Link to="/calculators" className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-brand-muted/60 hover:text-brand-sage transition-colors">
          <ArrowRight size={11} className="rotate-180" /> All Calculators
        </Link>
      </div>

      {/* ===== 1. SEO HERO ===== */}
      <section className="py-14 md:py-20 px-4 md:px-12 bg-linear-to-b from-brand-sage/5 via-white to-brand-bone border-b border-brand-border">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            <Sparkles size={12} /> Free Tool
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-brand-ink leading-tight mb-4">{seo.h1}</h1>
          <p className="text-sm md:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed whitespace-pre-line">{seo.intro}</p>
          <div className="flex flex-wrap items-center justify-center gap-5 mt-5 text-[11px] text-brand-muted/60">
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-brand-sage" /> Science-backed formula</span>
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-brand-sage" /> Instant results</span>
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-brand-sage" /> Free, no signup</span>
          </div>
        </div>
      </section>

      {/* ===== 2. CALCULATOR MODULE ===== */}
      <div className="max-w-lg mx-auto px-4 md:px-0 py-8 md:py-12">
        <div className="animate-fadeIn bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
          {calculatorModule}
        </div>
      </div>

      {/* ===== 3. RESULTS SECTION ===== */}
      {resultsModule && (
        <div className="max-w-lg mx-auto px-4 md:px-0 pb-8 md:pb-12">
          <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {resultsModule}
          </div>
        </div>
      )}

      {/* ===== 4. MINI EDUCATION SECTION ===== */}
      <section className="py-16 md:py-20 px-4 md:px-12 bg-white border-t border-brand-border/20">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            Learn
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-ink leading-tight mb-6">{educationTitle}</h2>
          <div className="text-sm md:text-base text-brand-muted leading-relaxed space-y-4">
            {educationContent}
          </div>
        </div>
      </section>

      {/* ===== 5. FAQ SECTION ===== */}
      <section className="py-16 md:py-20 px-4 md:px-12 bg-brand-warm border-t border-brand-border/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-serif text-brand-ink">{seo.h1} — FAQ</h2>
          </div>
          <div className="space-y-2.5">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-brand-border/20 hover:border-brand-sage/15 transition-all overflow-hidden" {...(i === 0 ? { open: true } : {})}>
                <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none">
                  <h3 className="text-sm font-medium text-brand-ink group-open:text-brand-sage transition-colors pr-4 text-left leading-snug">{faq.q}</h3>
                  <ChevronDown size={14} className="text-brand-muted shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-3.5">
                  <div className="h-px bg-brand-border/20 -mx-5 mb-3" />
                  <p className="text-xs text-brand-muted leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. CTA SECTION ===== */}
      <section className="max-w-lg mx-auto px-4 md:px-0 pb-24 md:pb-16">
        <div className="bg-linear-to-br from-brand-sage/10 to-brand-blush/30 border border-brand-sage/15 rounded-3xl p-8 md:p-10 text-center">
          <Sparkles size={36} className="text-brand-sage mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-brand-ink mb-3 leading-tight">
            Your {ctaTopic} Is Just the Start<br />
            <span className="text-brand-sage italic">Get Your Full Plan</span>
          </h2>
          <p className="text-sm text-brand-muted max-w-md mx-auto mb-6 leading-relaxed">
            Take the 60-second fitness quiz for a personalized yoga and nutrition plan built around your body and goals.
          </p>
          <Link to="/quiz"
            className="inline-flex items-center gap-2 bg-brand-sage text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20">
            Take the Fitness Quiz <ArrowRight size={14} />
          </Link>
          <p className="text-[10px] text-brand-muted/50 mt-3">No credit card required · Takes 60 seconds</p>
        </div>
      </section>
    </main>
  );
}
