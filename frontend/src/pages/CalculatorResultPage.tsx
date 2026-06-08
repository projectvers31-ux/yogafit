import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, Calculator, BarChart3, UserCheck, Heart, BookOpen, ShoppingBag } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';
import { breadcrumbSchema } from '@/lib/seo';
import { getResultPageData, VALID_CATEGORY_LABELS, CATEGORY_ARTICLE_MAP } from '@/data/resultPages';
import { articles, getArticleBySlug } from '@/content/blogArticles';
import { getCalculatorProducts } from '@/lib/fallbackEngine';
import AffiliateCard from '@/components/affiliate/AffiliateCard';
import SafeImage from '@/components/ui/SafeImage';

const RELATED_CALCULATORS: Record<string, Array<{ label: string; path: string; desc: string }>> = {
  'tdee-calculator': [
    { label: 'BMR Calculator', path: '/calculators/bmr-calculator', desc: 'Find your resting metabolism' },
    { label: 'Calorie Deficit Calculator', path: '/calculators/calorie-deficit-calculator', desc: 'Plan your fat loss deficit' },
    { label: 'Macro Calculator', path: '/calculators/macro-calculator', desc: 'Get your protein, carb & fat targets' },
  ],
  'bmr-calculator': [
    { label: 'TDEE Calculator', path: '/calculators/tdee-calculator', desc: 'See your total daily burn' },
    { label: 'Calorie Deficit Calculator', path: '/calculators/calorie-deficit-calculator', desc: 'Plan your fat loss deficit' },
    { label: 'Ideal Weight Calculator', path: '/calculators/ideal-weight-calculator', desc: 'Find your healthy weight range' },
  ],
  'calorie-deficit-calculator': [
    { label: 'Macro Calculator', path: '/calculators/macro-calculator', desc: 'Get your protein, carb & fat targets' },
    { label: 'BMR Calculator', path: '/calculators/bmr-calculator', desc: 'Know your resting metabolism' },
    { label: 'Protein Calculator', path: '/calculators/protein-calculator', desc: 'Set your daily protein target' },
  ],
  'macro-calculator': [
    { label: 'Calorie Deficit Calculator', path: '/calculators/calorie-deficit-calculator', desc: 'Plan your fat loss deficit' },
    { label: 'Protein Calculator', path: '/calculators/protein-calculator', desc: 'Set your daily protein target' },
    { label: 'TDEE Calculator', path: '/calculators/tdee-calculator', desc: 'See your total daily burn' },
  ],
  'ideal-weight-calculator': [
    { label: 'Body Fat Calculator', path: '/calculators/body-fat-calculator', desc: 'Measure your body composition' },
    { label: 'BMR Calculator', path: '/calculators/bmr-calculator', desc: 'Know your resting metabolism' },
    { label: 'TDEE Calculator', path: '/calculators/tdee-calculator', desc: 'See your total daily burn' },
  ],
  'body-fat-calculator': [
    { label: 'Ideal Weight Calculator', path: '/calculators/ideal-weight-calculator', desc: 'Find your healthy weight range' },
    { label: 'Calorie Deficit Calculator', path: '/calculators/calorie-deficit-calculator', desc: 'Plan your fat loss deficit' },
    { label: 'Protein Calculator', path: '/calculators/protein-calculator', desc: 'Set your daily protein target' },
  ],
  'water-intake-calculator': [
    { label: 'Macro Calculator', path: '/calculators/macro-calculator', desc: 'Get your protein, carb & fat targets' },
    { label: 'Calorie Deficit Calculator', path: '/calculators/calorie-deficit-calculator', desc: 'Plan your fat loss deficit' },
    { label: 'Protein Calculator', path: '/calculators/protein-calculator', desc: 'Set your daily protein target' },
  ],
  'protein-calculator': [
    { label: 'Macro Calculator', path: '/calculators/macro-calculator', desc: 'Get your full macro breakdown' },
    { label: 'Calorie Deficit Calculator', path: '/calculators/calorie-deficit-calculator', desc: 'Plan your fat loss deficit' },
    { label: 'TDEE Calculator', path: '/calculators/tdee-calculator', desc: 'See your total daily burn' },
  ],
};

export default function CalculatorResultPage() {
  const { tool, category } = useParams<{ tool: string; category: string }>();
  const data = tool && category ? getResultPageData(tool, category) : null;

  const fallbackArticles = articles.filter(a => a.category === 'Weight Loss' || a.category === 'Nutrition').slice(0, 3);

  // Get recommended articles for this tool
  const recommendedArticleSlugs = (tool && CATEGORY_ARTICLE_MAP[tool]) || [];
  const recommendedArticles = recommendedArticleSlugs
    .map(slug => getArticleBySlug(slug))
    .filter(Boolean)
    .slice(0, 3);
  const displayArticles = recommendedArticles.length >= 3 ? recommendedArticles : fallbackArticles;

  // Get recommended products for this tool's category
  const toolCategory = tool === 'tdee-calculator' || tool === 'bmr-calculator' || tool === 'calorie-deficit-calculator' ? 'health-wellness' :
    tool === 'macro-calculator' || tool === 'protein-calculator' ? 'nutrition' :
    tool === 'water-intake-calculator' ? 'health-wellness' : 'fitness-equipment';
  const relatedProducts = getCalculatorProducts(tool || 'calculator', [], 3);

  // Related calculators for this tool
  const relatedCalcs = (tool && RELATED_CALCULATORS[tool]) || [];

  if (!data) {
    return (
      <main className="min-h-screen bg-brand-bone font-sans flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-serif text-brand-ink mb-4">Result Page Not Found</h1>
          <p className="text-sm text-brand-muted mb-6">This result category does not exist. Try the calculator to see your personalized results.</p>
          <Link to="/calculators" className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all">
            All Calculators <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  const { toolConfig, categoryData } = data;
  const categoryLabel = VALID_CATEGORY_LABELS[tool || ''] || 'result';

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://fitfeky.com/' },
    { name: 'Calculators', url: 'https://fitfeky.com/calculators' },
    { name: toolConfig.tool, url: `https://fitfeky.com${toolConfig.toolPath}` },
    { name: `${categoryData.h1}`, url: `https://fitfeky.com${toolConfig.toolPath}/result/${category}` },
  ]);

  return (
    <main className="min-h-screen bg-brand-bone font-sans">
      <SEOHelmet
        title={categoryData.seoTitle}
        description={categoryData.seoDescription}
        keywords={[toolConfig.tool.toLowerCase(), `${category} ${toolConfig.tool.toLowerCase()}`, `what does ${category} ${toolConfig.tool.toLowerCase()} mean`]}
        canonicalPath={`${toolConfig.toolPath}/result/${category}`}
        ldJson={[breadcrumb]}
      />

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 md:px-12 pt-6">
        <div className="flex items-center gap-2 text-[11px] text-brand-muted/60">
          <Link to="/" className="hover:text-brand-sage transition-colors">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-brand-sage transition-colors">Calculators</Link>
          <span>/</span>
          <Link to={toolConfig.toolPath} className="hover:text-brand-sage transition-colors">{toolConfig.tool}</Link>
          <span>/</span>
          <span className="text-brand-muted/40">{category}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-14 md:py-20 px-4 md:px-12 bg-linear-to-b from-brand-sage/5 via-white to-brand-bone border-b border-brand-border">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            <Calculator size={12} /> {categoryLabel}
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-brand-ink leading-tight mb-4">{categoryData.h1}</h1>
          <p className="text-sm md:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
            {categoryData.seoDescription}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 mt-5 text-[11px] text-brand-muted/60">
            <span className="flex items-center gap-1.5"><BarChart3 size={11} className="text-brand-sage" /> Science-backed</span>
            <span className="flex items-center gap-1.5"><UserCheck size={11} className="text-brand-sage" /> Personalized</span>
            <span className="flex items-center gap-1.5"><Heart size={11} className="text-brand-sage" /> Free, no signup</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 md:px-0 py-10 md:py-14">
        {/* Summary */}
        <div className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8 mb-6">
          <p className="text-sm md:text-base text-brand-muted leading-relaxed mb-6">
            {categoryData.summary}
          </p>
          <div className="space-y-3">
            {categoryData.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-sage shrink-0 mt-0.5" />
                <p className="text-xs text-brand-muted leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to full calculator */}
        <Link
          to={toolConfig.toolPath}
          className="block bg-brand-sage text-white rounded-2xl p-6 text-center hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 mb-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2">Calculate Your Numbers</p>
          <p className="text-sm opacity-80">Use the full {toolConfig.tool} to get your personalized result</p>
          <div className="flex items-center justify-center gap-2 mt-3 text-[10px] font-bold uppercase tracking-[0.2em]">
            Open Calculator <ArrowRight size={12} />
          </div>
        </Link>

        {/* Related Articles */}
        {displayArticles.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-muted/60 mb-4 flex items-center gap-2">
              <BookOpen size={14} className="text-brand-sage" /> Recommended Articles
            </h3>
            <div className="space-y-3">
              {displayArticles.map(a => (
                <Link
                  key={a.id}
                  to={`/blog/${a.slug}`}
                  className="flex gap-3 bg-white border border-brand-border/30 rounded-xl p-3 hover:border-brand-sage/20 hover:shadow-sm transition-all group"
                >
                  <SafeImage src={a.ogImage} alt={a.title} className="w-16 h-16 rounded-lg object-cover shrink-0" width={80} height={80} />
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-sage mb-0.5">{a.category}</p>
                    <p className="text-xs font-medium text-brand-ink leading-snug group-hover:text-brand-sage transition-colors line-clamp-2">{a.title}</p>
                    <p className="text-[9px] text-brand-muted/50 mt-1">{a.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-muted/60 mb-4 flex items-center gap-2">
              <ShoppingBag size={14} className="text-brand-sage" /> Recommended Products
            </h3>
            <div className="space-y-3">
              {relatedProducts.slice(0, 3).map(p => (
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
                  oneLineBenefit={`Supports your ${toolConfig.tool} goals`}
                  variant="mini"
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Calculators */}
        {relatedCalcs.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-muted/60 mb-4 flex items-center gap-2">
              <Calculator size={14} className="text-brand-sage" /> Related Calculators
            </h3>
            <div className="space-y-2">
              {relatedCalcs.map(rc => (
                <Link
                  key={rc.path}
                  to={rc.path}
                  className="flex items-center justify-between bg-white border border-brand-border/30 rounded-xl p-3 hover:border-brand-sage/20 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="text-xs font-medium text-brand-ink group-hover:text-brand-sage transition-colors">{rc.label}</p>
                    <p className="text-[9px] text-brand-muted/60">{rc.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-brand-muted/30 group-hover:text-brand-sage transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quiz CTA */}
        <div className="bg-linear-to-br from-brand-sage/10 to-brand-blush/30 border border-brand-sage/15 rounded-3xl p-6 md:p-8 text-center">
          <Sparkles size={28} className="text-brand-sage mx-auto mb-3" />
          <h2 className="text-lg md:text-xl font-serif text-brand-ink mb-2 leading-tight">
            Your {category} {toolConfig.tool} Result Is Just the Start
          </h2>
          <p className="text-xs text-brand-muted max-w-md mx-auto mb-5 leading-relaxed">
            Take the 60-second fitness quiz for a personalized yoga and nutrition plan built around your body and goals.
          </p>
          <Link to="/"
            className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20">
            Take the Fitness Quiz <ArrowRight size={14} />
          </Link>
          <p className="text-[10px] text-brand-muted/50 mt-3">No credit card required · Takes 60 seconds</p>
        </div>
      </div>
    </main>
  );
}
