import { ExternalLink, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProduct, getReplacementProduct, getRelatedProducts } from '@/lib/affiliateRegistry';
import { isValidAmazonUrl } from '@/lib/urlValidation';

interface ProductMentionProps {
  id: string;
  context: string;
}

export default function ProductMention({ id, context }: ProductMentionProps) {
  const product = getProduct(id);
  const resolvedProduct = (product && product.isValid) ? product : getReplacementProduct(id);
  const isFallback = !product || !product.isValid;

  if (!resolvedProduct) {
    return (
      <Link
        to="/picks"
        className="flex items-center gap-3 bg-brand-warm border border-brand-border/20 rounded-xl p-3.5 hover:border-brand-sage/20 hover:bg-brand-sage/5 transition-all group my-4 not-prose"
      >
        <div className="w-10 h-10 rounded-lg bg-brand-sage/10 flex items-center justify-center shrink-0">
          <span className="text-brand-sage text-sm font-bold">!</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-brand-ink leading-tight">Product temporarily unavailable</p>
          <p className="text-[9px] text-brand-muted/50 italic">Browse similar products on FitFeky Picks</p>
        </div>
        <ExternalLink size={12} className="text-brand-muted/30 shrink-0 group-hover:text-brand-sage transition-colors" />
      </Link>
    );
  }

  const url = resolvedProduct.url;
  const validUrl = isValidAmazonUrl(url);

  if (!validUrl) {
    const related = getRelatedProducts(resolvedProduct.id, 2);
    return (
      <div className="my-4 space-y-2">
        <Link
          to="/picks"
          className="flex items-center gap-3 bg-brand-warm border border-brand-border/20 rounded-xl p-3.5 hover:border-brand-sage/20 hover:bg-brand-sage/5 transition-all group not-prose"
        >
          <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 shadow-xs">
            <img
              src={resolvedProduct.image}
              alt={resolvedProduct.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-brand-ink leading-tight truncate mb-0.5">{resolvedProduct.name}</p>
            <p className="text-[9px] text-brand-muted/50 italic leading-snug">View on FitFeky Picks</p>
          </div>
          <ExternalLink size={12} className="text-brand-muted/30 shrink-0 group-hover:text-brand-sage transition-colors" />
        </Link>
        {related.length > 0 && (
          <p className="text-[9px] text-brand-muted/40 text-center">
            Also see: {related.map(r => r.name).join(', ')}
          </p>
        )}
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-brand-warm border border-brand-border/20 rounded-xl p-3.5 hover:border-brand-sage/20 hover:bg-brand-sage/5 transition-all group my-4 not-prose"
    >
      <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0 shadow-xs">
        <img
          src={resolvedProduct.image}
          alt={resolvedProduct.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="min-w-0 flex-1">
        {isFallback && (
          <span className="text-[8px] font-bold uppercase tracking-widest text-amber-500 mb-0.5 block">Similar Pick</span>
        )}
        <div className="flex items-center gap-1.5 mb-0.5">
          {resolvedProduct.rating > 0 && (
            <span className="inline-flex items-center gap-1 text-[9px] text-amber-500 font-bold">
              <Star size={9} className="fill-amber-500" /> {resolvedProduct.rating.toFixed(1)}
            </span>
          )}
          <span className="text-[8px] text-brand-muted/40">|</span>
          <span className="text-[9px] text-brand-muted/60">{resolvedProduct.price}</span>
        </div>
        <p className="text-[10px] font-bold text-brand-ink leading-tight truncate mb-0.5">{resolvedProduct.name}</p>
        <p className="text-[9px] text-brand-muted/50 italic leading-snug">&ldquo;{context}&rdquo;</p>
      </div>
      <ExternalLink size={12} className="text-brand-muted/30 shrink-0 group-hover:text-brand-sage transition-colors" />
    </a>
  );
}
