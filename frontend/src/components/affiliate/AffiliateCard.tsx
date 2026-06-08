import { Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import { isValidAmazonUrl } from '@/lib/urlValidation';

interface AffiliateCardProps {
  product: Product;
  badge?: 'Most Popular' | 'Best Value' | "Editor's Pick";
  oneLineBenefit: string;
  showDisclosure?: boolean;
  contextNote?: string;
  variant?: 'full' | 'mini';
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  if (rating <= 0) return null;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={10}
            className={star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-brand-border fill-brand-border/20'}
          />
        ))}
      </div>
      <span className="text-[9px] text-brand-muted/60">
        {rating.toFixed(1)} ({count.toLocaleString()})
      </span>
    </div>
  );
}

export default function AffiliateCard({
  product,
  badge,
  oneLineBenefit,
  showDisclosure = false,
  contextNote,
  variant = 'full',
}: AffiliateCardProps) {
  const validUrl = isValidAmazonUrl(product.affiliateLink);

  if (variant === 'mini') {
    if (!validUrl) {
      return (
        <Link
          to="/picks"
          className="flex items-center gap-3 bg-white border border-brand-border/20 rounded-xl p-3 hover:border-brand-sage/20 hover:shadow-xs transition-all group"
        >
          <div className="w-14 h-14 rounded-lg bg-brand-bone overflow-hidden shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-brand-ink leading-tight truncate mb-0.5">{product.name}</p>
            {contextNote && (
              <p className="text-[9px] text-brand-muted/50 italic mb-0.5 truncate">{contextNote}</p>
            )}
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <ExternalLink size={12} className="text-brand-muted/30 group-hover:text-brand-sage shrink-0 transition-colors" />
        </Link>
      );
    }
    return (
      <a
        href={product.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-white border border-brand-border/20 rounded-xl p-3 hover:border-brand-sage/20 hover:shadow-xs transition-all group"
      >
        <div className="w-14 h-14 rounded-lg bg-brand-bone overflow-hidden shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-brand-ink leading-tight truncate mb-0.5">{product.name}</p>
          {contextNote && (
            <p className="text-[9px] text-brand-muted/50 italic mb-0.5 truncate">{contextNote}</p>
          )}
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>
        <ExternalLink size={12} className="text-brand-muted/30 group-hover:text-brand-sage shrink-0 transition-colors" />
      </a>
    );
  }

  return (
    <div className="bg-white border border-brand-border/20 rounded-2xl overflow-hidden hover:border-brand-sage/15 hover:shadow-sm transition-all">
      {badge && (
        <div className="bg-brand-sage/10 text-brand-sage text-[9px] font-bold uppercase tracking-widest text-center py-1.5 border-b border-brand-border/10">
          {badge}
        </div>
      )}
      <div className="p-4">
        <div className="aspect-square rounded-xl bg-brand-bone overflow-hidden mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <h3 className="text-xs font-bold text-brand-ink leading-snug mb-1.5 line-clamp-2">{product.name}</h3>

        <StarRating rating={product.rating} count={product.reviewCount} />

        <p className="text-[10px] text-brand-muted leading-relaxed mt-1.5">{oneLineBenefit}</p>

        {contextNote && (
          <p className="text-[9px] text-brand-muted/50 italic mt-1 leading-snug">&ldquo;{contextNote}&rdquo;</p>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-border/10">
          <span className="text-sm font-bold text-brand-ink">{product.price}</span>
          {validUrl ? (
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-brand-sage text-white px-3.5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all"
            >
              View on Amazon <ExternalLink size={10} />
            </a>
          ) : (
            <Link
              to="/picks"
              className="inline-flex items-center gap-1 bg-brand-sage text-white px-3.5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all"
            >
              Shop on FitFeky <ExternalLink size={10} />
            </Link>
          )}
        </div>

        {showDisclosure && (
          <p className="text-[8px] text-brand-muted/40 mt-2 leading-tight">
            We earn a commission if you purchase through this link, at no extra cost to you.
          </p>
        )}
      </div>
    </div>
  );
}
