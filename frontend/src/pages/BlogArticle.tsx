import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Copy, Check, Sparkles, Share2 } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '@/content/blogArticles';
import type { BlogArticle, Section } from '@/content/blogArticles';
import { breadcrumbSchema, articleSchema as articleSchemaFn } from '@/lib/seo';
import SEOHelmet from '@/components/seo/SEOHelmet';
import SafeImage from '@/components/ui/SafeImage';

// This page reads the article slug from the URL, e.g. /blog/yoga-for-beginners.
// It then loads the matching article from local mock data.

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
      <a href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-brand-blush/40 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white transition-all">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937.552-2.542.552-3.682 0-1.9-1.284-3.5-3.183-3.5-1.897 0-3.427 1.537-3.427 3.429 0 1.066.335 2.116 1.009 2.979.061.097.145.186.241.262.218.162.376.2.605.053.531-.380.972-.905 1.32-1.541.349-.635.596-1.282.833-2.242l.027-.137-.032.002c-.304.921-.637 1.785-.637 2.716 0 .886.231 1.75.647 2.431.38.624.879 1.156 1.487 1.54.738.467 1.649.675 2.582.675 4.15 0 7.548-3.406 7.548-7.589 0-3.1-1.916-5.79-4.665-6.952-.21-.1-.422-.19-.637-.266z"/></svg>
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-brand-blush/40 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white transition-all">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-brand-blush/40 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white transition-all">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zM17.002 18.807h1.815L5.99 4.131H4.08l12.922 14.676z"/></svg>
      </a>
      <button onClick={copyLink} className="w-8 h-8 bg-brand-blush/40 rounded-full flex items-center justify-center text-brand-muted hover:bg-brand-sage hover:text-white transition-all" aria-label="Copy link">
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
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
            <span key={tag} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 bg-white px-2.5 py-1 rounded-full border border-brand-border">
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
    // Scroll back to the top when a new article loads.
    window.scrollTo(0, 0);

    // Find the article with a matching slug from our mock data.
    const found = getArticleBySlug(slug || '');
    if (found) {
      setArticle(found);
      setNotFound(false);
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

  // Structured data for Google and SEO crawlers.
  const articleJsonLd = articleSchemaFn({
    headline: article.title,
    description: article.metaDescription,
    image: article.ogImage,
    datePublished: article.date,
    slug: article.slug,
  });

  const h2Sections = article.sections.filter(s => s.type === 'h2');
  const h2Ids = h2Sections.map(s => ({
    text: (s as any).text as string,
    id: (s as any).text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }));

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      {/*
        SEO helmet adds page title, description, canonical URL, and JSON-LD data.
        This helps search engines index each article page separately.
      */}
      <SEOHelmet
        title={article.metaTitle}
        description={article.metaDescription}
        canonicalPath={`/blog/${article.slug}`}
        ldJson={[breadcrumb, articleJsonLd]}
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

            <div className="mt-8 pt-6 border-t border-brand-border/40">
              <ShareButtons title={article.title} url={typeof window !== 'undefined' ? window.location.href : canonicalUrl} />
            </div>

            <RelatedPosts current={article} />
          </article>

          <aside className="hidden lg:block w-64 shrink-0">
            <div className="space-y-6">
              <TOC sections={article.sections} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
