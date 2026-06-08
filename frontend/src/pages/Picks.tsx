import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ExternalLink } from 'lucide-react';
import { trackPageView } from '@/lib/analytics';
import { products } from '@/data/products';
import SEOHelmet from '@/components/seo/SEOHelmet';
import SafeImage from '@/components/ui/SafeImage';
import { breadcrumbSchema } from '@/lib/seo';

const siteUrl = 'https://fitfeky.com';

export default function Picks() {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('/picks', 'FitFeky Picks');
  }, []);

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'FitFeky Picks', url: `${siteUrl}/picks` },
  ]);

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      <SEOHelmet
        title="FitFeky Picks — Curated Wellness Products for Real Results"
        description="Our hand-picked wellness products for digestive health, gentle detox, and weight loss support. Each product is chosen to complement your yoga and fitness journey."
        canonicalPath="/picks"
        ldJson={breadcrumb}
      />

      <section className="py-12 md:py-20 px-4 md:px-12 bg-white border-b border-brand-border">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fadeIn">
            <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
              FitFeky Picks
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-brand-ink mb-4 leading-tight">
              Curated Wellness for <span className="text-brand-sage italic">Real Results</span>
            </h1>
            <p className="text-brand-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Every product on this page is hand-picked to support your digestive health,
              gentle detox, and weight loss journey. We only recommend what we trust.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-brand-bone">
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  width={400}
                  height={400}
                />
              </div>
              <div className="p-5 md:p-6 flex flex-col grow">
                <h2 className="text-lg md:text-xl font-serif text-brand-ink mb-2 leading-snug">
                  {product.name}
                </h2>
                {product.benefits.length > 0 && (
                  <ul className="text-xs text-brand-muted/70 space-y-1.5 mb-4">
                    {product.benefits.slice(0, 3).map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brand-sage shrink-0 mt-0.5">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.goals.map((goal) => (
                    <span
                      key={goal}
                      className="text-[9px] font-bold uppercase tracking-widest text-brand-sage bg-brand-sage/5 px-2.5 py-1 rounded-full border border-brand-sage/10"
                    >
                      {goal.replace(/-/g, ' ')}
                    </span>
                  ))}
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/50 bg-brand-muted/5 px-2.5 py-1 rounded-full border border-brand-border/10">
                    {product.category.replace(/-/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-auto">
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-sage text-white px-5 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all shadow-md shadow-brand-sage/20"
                  >
                    <ShoppingCart size={14} /> Shop on Amazon <ExternalLink size={12} />
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(product.affiliateLink)}&description=${encodeURIComponent(product.name + ' — ' + (product.benefits[0] || product.category))}&media=${encodeURIComponent(product.image)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-brand-border/40 flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white hover:border-brand-sage transition-all"
                    aria-label={`Pin ${product.name} on Pinterest`}
                  >
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.99 3.99-.281 1.192.597 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.86-2.063-4.852-5.008-4.852-3.41 0-5.409 2.562-5.409 5.2 0 1.03.394 2.143.889 2.741.099.12.112.224.085.345l-.352 1.467c-.035.147-.11.177-.268.107-1.003-.502-1.63-2.078-1.63-3.341 0-3.768 2.74-7.229 7.896-7.229 4.15 0 7.548 2.954 7.548 6.923 0 4.27-2.686 7.704-6.411 7.704-1.252 0-2.429-.325-3.439-.855l-.937.503c-.356.19-.679.627-.955 1.29-.131.349-.684 2.811-.854 3.54-.063.333-.291.335-.608.148l-4.561-3.368c-.338-.251-.337-.651-.01-.886l1.378-1.036c.338-.252.337-.652.01-.886L5.768 15.112c-.338-.251-.337-.651-.01-.886l4.561 3.368z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-12 pb-16">
        <div className="bg-linear-to-r from-brand-sage/5 to-brand-blush/30 border border-brand-border/30 rounded-2xl p-6 md:p-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-2">Disclaimer</p>
          <p className="text-sm text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Some of the links on this page are affiliate links. If you make a purchase through these links,
            we may earn a small commission at no extra cost to you. We only recommend products we believe
            in and that align with our mission to support women&apos;s wellness journeys.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-12 pb-20">
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-white text-brand-sage border border-brand-sage/30 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-sage hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </section>
    </main>
  );
}
