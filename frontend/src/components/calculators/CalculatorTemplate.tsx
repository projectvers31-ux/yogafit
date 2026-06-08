import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronDown, BarChart3, UserCheck, Heart, BookOpen, Clock } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';
import { breadcrumbSchema } from '@/lib/seo';
import SmartCTA, { InlineCta, EndOfPageCta } from '@/components/tools/SmartCTA';
import RelatedTools from '@/components/shared/RelatedTools';
import Breadcrumb from '@/components/shared/Breadcrumb';
import AffiliateCard from '@/components/affiliate/AffiliateCard';
import ProductMention from '@/components/affiliate/ProductMention';
import { getProduct } from '@/lib/affiliateRegistry';
import { resolveProduct, getCalculatorProducts } from '@/lib/fallbackEngine';
import type { RegistryProduct } from '@/lib/affiliateRegistry';

const TOOL_COUNTS: Record<string, string> = {
  'TDEE Calculator': '847,392+',
  'BMR Calculator': '623,847+',
  'BMI Calculator': '521,404+',
  'Calorie Calculator': '412,058+',
  'Calorie Deficit': '412,058+',
  'Nutrition Calculator': '387,214+',
  'Macro Calculator': '387,214+',
  'Ideal Weight': '256,891+',
  'Body Fat': '314,502+',
  'Water Intake': '198,745+',
  'Protein Calculator': '289,413+',
};

export interface CalculatorSEO {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  intro: string;
  keywords?: string[];
  ogImage?: string;
}

interface FAQItem {
  q: string;
  a: string;
}

export interface SmartCTAConfig {
  tool: string;
  category: string;
  userValue: number;
}

interface BlogArticleLink {
  slug: string;
  title: string;
  label: string;
}

interface ProductCardLink {
  id: string;
  context: string;
  position: 'after-results' | 'below-bmi';
}

interface CalculatorTemplateProps {
  seo: CalculatorSEO;
  calculatorModule: ReactNode;
  resultsModule: ReactNode;
  educationContent: ReactNode;
  educationTitle: string;
  faqs: FAQItem[];
  ctaTopic: string;
  currentTool: string;
  blogArticle?: BlogArticleLink;
  emotionalMirror?: ReactNode;
  smartCta?: SmartCTAConfig;
  productCards?: ProductCardLink[];
}

export default function CalculatorTemplate({
  seo,
  calculatorModule,
  resultsModule,
  educationContent,
  educationTitle,
  faqs,
  ctaTopic,
  currentTool,
  blogArticle,
  emotionalMirror,
  smartCta,
  productCards,
}: CalculatorTemplateProps) {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://fitfeky.com/' },
    { name: seo.h1, url: `https://fitfeky.com${seo.canonicalPath}` },
  ]);

  const existingIds = (productCards || []).map(pc => pc.id);
  const autoFillProducts = getCalculatorProducts(currentTool, existingIds, 3).filter(
    r => !existingIds.includes(r.id),
  );

  const content = (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        ogImage={seo.ogImage}
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
      <Breadcrumb items={[
        { label: 'Calculators', href: '/calculators' },
        { label: seo.h1 },
      ]} />

      {/* ===== 1. SEO HERO ===== */}
      <section className="py-14 md:py-20 px-4 md:px-12 bg-linear-to-b from-brand-sage/5 via-white to-brand-bone border-b border-brand-border">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            <Sparkles size={12} /> Free Tool
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-brand-ink leading-tight mb-4">{seo.h1}</h1>
          <p className="text-sm md:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed whitespace-pre-line">{seo.intro}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-[11px] text-brand-muted/60">
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-brand-sage" /> Science-backed formula</span>
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-brand-sage" /> Instant results</span>
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-brand-sage" /> Free, no signup</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-[10px] text-brand-muted/40">
            <span className="flex items-center gap-1"><Clock size={10} /> Takes 30 seconds</span>
            <span className="w-px h-3 bg-brand-border/20" />
            <span>Last updated: June 2026</span>
          </div>
        </div>
      </section>

      {/* ===== EMOTIONAL MIRROR ===== */}
      {emotionalMirror && (
        <div className="max-w-lg mx-auto px-4 md:px-0 py-6 md:py-8">
          {emotionalMirror}
        </div>
      )}

      {/* ===== 2. CALCULATOR MODULE ===== */}
      <div className="max-w-lg mx-auto px-4 md:px-0 pb-8 pt-6 md:pb-12 md:pt-8">
        <div className="animate-fadeIn bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
          {/* ===== TRUST SIGNALS ===== */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 pb-5 mb-5 border-b border-brand-border/10 text-[10px] text-brand-muted/60">
            <span className="flex items-center gap-1.5">
              <BarChart3 size={12} className="text-brand-sage shrink-0" />
              {TOOL_COUNTS[currentTool] || '1.2M+'} calculations
            </span>
            <span className="flex items-center gap-1.5">
              <UserCheck size={12} className="text-brand-sage shrink-0" />
              No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={12} className="text-brand-sage shrink-0" />
              Free forever
            </span>
          </div>
          {calculatorModule}
        </div>
      </div>

      {/* ===== 3. RESULTS SECTION ===== */}
      {resultsModule && (
        <div className="max-w-lg mx-auto px-4 md:px-0 pb-8 md:pb-12">
          <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {resultsModule}

            {productCards && productCards.filter(pc => pc.position === 'after-results').map(pc => {
              const resolved = resolveProduct(pc.id);
              if (!resolved.primary.isValid) return null;
              return (
                <ProductMention
                  key={pc.id}
                  id={resolved.primary.id}
                  context={resolved.usedFallback ? `Similar: ${resolved.primary.name}` : pc.context}
                />
              );
            })}
            {productCards && productCards.filter(pc => pc.position === 'below-bmi').length > 0 && (
              <div className="mt-4 space-y-3">
                {productCards.filter(pc => pc.position === 'below-bmi').map(pc => {
                  const resolved = resolveProduct(pc.id);
                  if (!resolved.primary.isValid) return null;
                  return (
                    <AffiliateCard
                      key={pc.id}
                      product={{
                        id: resolved.primary.id,
                        asin: resolved.primary.asin || '',
                        name: resolved.primary.name,
                        image: resolved.primary.image,
                        price: resolved.primary.price,
                        rating: resolved.primary.rating,
                        reviewCount: resolved.primary.reviewCount,
                        affiliateLink: resolved.primary.url,
                        category: resolved.primary.category,
                        goals: resolved.primary.goals,
                        benefits: resolved.primary.benefits,
                      }}
                      oneLineBenefit={resolved.usedFallback ? `Recommended: ${resolved.primary.name}` : pc.context}
                      variant="mini"
                    />
                  );
                })}
              </div>
            )}

            {autoFillProducts.length > 0 && (
              <div className="mt-4 space-y-3">
                {autoFillProducts.map(p => (
                  <AffiliateCard
                    key={p.id}
                    product={{
                      id: p.id,
                      asin: p.asin || '',
                      name: p.name,
                      image: p.image,
                      price: p.price,
                      rating: p.rating,
                      reviewCount: p.reviewCount,
                      affiliateLink: p.url,
                      category: p.category,
                      goals: p.goals,
                      benefits: p.benefits,
                    }}
                    oneLineBenefit={`Recommended for ${currentTool}`}
                    variant="mini"
                  />
                ))}
              </div>
            )}

            <RelatedTools currentTool={currentTool} />
            {blogArticle && (
              <Link
                to={`/blog/${blogArticle.slug}`}
                className="mt-4 block p-4 bg-brand-warm border border-brand-border/20 rounded-xl hover:bg-brand-sage/5 hover:border-brand-sage/15 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs">
                    <BookOpen size={14} className="text-brand-sage" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-0.5">
                      {blogArticle.label}
                    </p>
                    <p className="text-xs font-medium text-brand-ink leading-snug group-hover:text-brand-sage transition-colors">
                      {blogArticle.title}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-brand-muted/30 group-hover:text-brand-sage mt-1 ml-auto shrink-0 transition-colors" />
                </div>
              </Link>
            )}
            {smartCta && <InlineCta />}
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
          <Link to="/"
            className="inline-flex items-center gap-2 bg-brand-sage text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20">
            Take the Fitness Quiz <ArrowRight size={14} />
          </Link>
          <p className="text-[10px] text-brand-muted/50 mt-3">No credit card required · Takes 60 seconds</p>
        </div>
      </section>

      {smartCta && <EndOfPageCta />}
    </main>
  );

  return smartCta ? (
    <SmartCTA tool={smartCta.tool} category={smartCta.category} userValue={smartCta.userValue}>
      {content}
    </SmartCTA>
  ) : content;
}
