import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, ChevronDown, Tag, Copy, Check, ExternalLink, Sparkles, Share2, ChevronRight } from 'lucide-react';
import { articles, getArticleBySlug, getRelatedArticles } from '@/content/blogArticles';
import type { BlogArticle, Section, ProductRef } from '@/content/blogArticles';
import { productList } from '@/lib/products';
import type { Product } from '@/lib/products';
import { breadcrumbSchema } from '@/lib/seo';
import SEOHelmet from '@/components/seo/SEOHelmet';
import SafeImage from '@/components/ui/SafeImage';

function resolveProduct(ref: ProductRef): Product | undefined {
  return productList.find(p => p.id === ref.id);
}

function H2SectionRenderer({ section: s }: { section: Section }) {
  if (s.type !== 'h2') return null;
  return <h2 id={s.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} className="text-xl md:text-2xl font-serif text-brand-ink mt-10 mb-4 leading-tight scroll-mt-24">{s.text}</h2>;
}

function SectionRenderer({ section, index }: { section: Section; index: number }) {
  switch (section.type) {
    case 'h2':
      return <H2SectionRenderer section={section} />;
    case 'h3':
      return <h3 className="text-lg md:text-xl font-serif text-brand-ink mt-8 mb-3 leading-snug">{section.text}</h3>;
    case 'p':
      return <p className="text-base text-brand-muted leading-relaxed mb-4">{section.text}</p>;
    case 'bullets':
      return (
        <ul className="space-y-2 mb-6">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-brand-muted leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-sage/40 mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'tip':
      return (
        <div className="bg-brand-sage/5 border-l-4 border-brand-sage rounded-r-xl p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-sage mb-1.5">Pro Tip</p>
          <p className="text-sm md:text-base text-brand-ink leading-relaxed italic">{section.text}</p>
        </div>
      );
    case 'cta':
      return (
        <div className="bg-linear-to-r from-brand-sage/10 to-brand-blush/30 rounded-2xl p-6 md:p-8 mb-8 text-center border border-brand-sage/10">
          <Sparkles size={24} className="text-brand-sage mx-auto mb-3" />
          <p className="text-sm md:text-base text-brand-ink leading-relaxed font-medium max-w-xl mx-auto">{section.text}</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all shadow-md shadow-brand-sage/20"
          >
            Take the Quiz <ChevronRight size={14} />
          </Link>
        </div>
      );
    case 'product':
      const product = resolveProduct({ id: section.productId, reason: section.text });
      if (!product) return null;
      return (
        <div className="bg-white border border-brand-border rounded-2xl p-5 md:p-6 mb-6 flex flex-col md:flex-row gap-5 items-start hover:shadow-sm transition-shadow">
          <SafeImage src={product.image} alt={product.title} className="w-full md:w-28 h-28 rounded-xl object-cover shrink-0" width={112} height={112} />
          <div className="grow min-w-0">
            {section.title && <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-1">{section.title}</p>}
            <h4 className="text-base font-serif text-brand-ink mb-1">{product.title}</h4>
            <p className="text-sm text-brand-muted leading-relaxed mb-3">{section.text}</p>
            <div className="flex items-center gap-3">
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1.5 bg-brand-sage text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all"
              >
                Check Price <ExternalLink size={11} />
              </a>
              {product.oldPrice > 0 && (
                <span className="text-xs text-brand-muted">
                  <span className="line-through">${product.oldPrice}</span>
                  <span className="text-brand-sage font-semibold ml-1">${product.price}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function TOC({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const headings = sections.filter((s): s is Section & { type: 'h2' } => s.type === 'h2');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(h => {
      const id = h.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="bg-white border border-brand-border rounded-2xl p-5 sticky top-24" aria-label="Table of contents">
      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-3">On This Page</p>
      <ul className="space-y-2">
        {headings.map(h => {
          const id = h.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-xs leading-relaxed transition-colors ${
                  activeId === id ? 'text-brand-sage font-semibold' : 'text-brand-muted hover:text-brand-ink'
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60 mr-1"><Share2 size={14} className="inline -mt-0.5 mr-1" />Share</span>
      <a href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-brand-blush/40 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white transition-all" aria-label="Share on Pinterest">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-brand-blush/40 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white transition-all" aria-label="Share on Facebook">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-brand-blush/40 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white transition-all" aria-label="Share on X">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <button onClick={copyLink} className="w-8 h-8 bg-brand-blush/40 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white transition-all" aria-label="Copy link">
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function FAQAccordion({ faq }: { faq: BlogArticle['faq'] }) {
  return (
    <div className="mt-8 space-y-3">
      <h2 className="text-xl md:text-2xl font-serif text-brand-ink mb-4">Frequently Asked Questions</h2>
      {faq.map((item, i) => (
        <details key={i} className="group bg-white rounded-xl border border-brand-border/30 hover:border-brand-sand/30 transition-all overflow-hidden">
          <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
            <h3 className="text-sm md:text-base font-medium text-brand-ink group-open:text-brand-sage transition-colors pr-4 text-left leading-snug">{item.q}</h3>
            <ChevronDown size={16} className="text-brand-muted shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-4">
            <div className="h-px bg-brand-border/20 -mx-5 mb-3" />
            <p className="text-sm text-brand-muted leading-relaxed">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

function RelatedPosts({ current }: { current: BlogArticle }) {
  const related = getRelatedArticles(current, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-brand-border/40">
      <h2 className="text-xl md:text-2xl font-serif text-brand-ink mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map(article => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            className="group bg-white rounded-xl border border-brand-border overflow-hidden hover:shadow-sm transition-all flex flex-col"
          >
            <SafeImage src={article.ogImage} alt={article.title} className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-700" width={400} height={225} />
            <div className="p-4 flex flex-col grow">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-2">
                <Calendar size={9} /> {article.date}
              </div>
              <h3 className="text-sm font-serif text-brand-ink leading-snug group-hover:text-brand-sage transition-colors">{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArticleHero({ article }: { article: BlogArticle }) {
  const randomPinterest = article.pinterestTitles[Math.floor(Math.random() * article.pinterestTitles.length)];

  return (
    <section className="relative bg-brand-warm">
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-6 md:pb-8">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-sage transition-colors mb-6">
          <ArrowLeft size={12} /> Back to Blog
        </Link>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-4">
          <span className="px-3 py-1 bg-brand-sage/10 rounded-full">{article.category}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
          <span className="flex items-center gap-1"><Calendar size={11} /> {article.date}</span>
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-brand-ink leading-tight mb-4">{article.title}</h1>
        <p className="text-base md:text-lg text-brand-muted leading-relaxed max-w-2xl">{article.excerpt}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 bg-white px-2.5 py-1 rounded-full border border-brand-border/30">
              <Tag size={9} /> {tag}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <ShareButtons title={article.title} url={typeof window !== 'undefined' ? window.location.href : `https://fitfeky.com/blog/${article.slug}`} />
        </div>
        <p className="text-[9px] text-brand-muted/40 mt-3 italic max-w-lg">📌 Pinterest: "{randomPinterest}"</p>
      </div>
    </section>
  );
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = getArticleBySlug(slug || '');
    if (found) {
      setArticle(found);
    } else {
      setNotFound(true);
    }
  }, [slug]);

  if (notFound) {
    return (
      <main id="main-content" className="min-h-screen bg-brand-bone font-sans flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-brand-ink mb-3">Article Not Found</h1>
          <p className="text-brand-muted mb-6">The article you are looking for does not exist or has been moved.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all">
            Back to Blog <ArrowLeft size={14} />
          </Link>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main id="main-content" className="min-h-screen bg-brand-bone font-sans flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-sage/30 border-t-brand-sage rounded-full animate-spin" />
      </main>
    );
  }

  const canonicalUrl = `https://fitfeky.com/blog/${article.slug}`;
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://fitfeky.com/' },
    { name: 'Blog', url: 'https://fitfeky.com/blog' },
    { name: article.title, url: canonicalUrl }
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    image: article.ogImage,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'FitFeky' },
    publisher: { '@type': 'Organization', name: 'FitFeky' }
  };

  const h2Sections = article.sections.filter(s => s.type === 'h2');
  const h2Ids = h2Sections.map(s => ({
    text: (s as any).text as string,
    id: (s as any).text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }));

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      <SEOHelmet
        title={article.metaTitle}
        description={article.metaDescription}
        canonicalPath={`/blog/${article.slug}`}
        ldJson={[breadcrumb, articleSchema]}
      />

      <ArticleHero article={article} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="flex gap-10">
          <article className="flex-1 min-w-0 max-w-3xl">
            <div className="prose-custom">
              {article.sections.map((section, i) => (
                <SectionRenderer key={i} section={section} index={i} />
              ))}
            </div>

            {article.faq.length > 0 && <FAQAccordion faq={article.faq} />}

            <div className="mt-8 pt-6 border-t border-brand-border/40">
              <ShareButtons title={article.title} url={typeof window !== 'undefined' ? window.location.href : canonicalUrl} />
            </div>

            <RelatedPosts current={article} />
          </article>

          <aside className="hidden lg:block w-64 shrink-0">
            <div className="space-y-6">
              <TOC sections={article.sections} />
              {article.productRefs.length > 0 && (
                <div className="bg-white border border-brand-border rounded-2xl p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-3">Recommended</p>
                  <div className="space-y-4">
                    {article.productRefs.map((ref, i) => {
                      const product = resolveProduct(ref);
                      if (!product) return null;
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <SafeImage src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover shrink-0" width={48} height={48} />
                          <div className="min-w-0">
                            <h4 className="text-xs font-medium text-brand-ink leading-tight">{product.title}</h4>
                            <p className="text-[10px] text-brand-muted leading-tight mt-0.5">{ref.reason}</p>
                            <a href={product.link} target="_blank" rel="noopener noreferrer sponsored" className="text-[10px] font-bold text-brand-sage hover:underline mt-1 inline-block">
                              Shop Now →
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
