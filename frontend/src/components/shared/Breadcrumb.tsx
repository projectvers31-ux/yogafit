import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-4 md:px-12 pt-6">
      <ol className="flex items-center gap-1.5 text-[11px] text-brand-muted/60">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ArrowRight size={10} className="text-brand-muted/30 shrink-0 rotate-180" />}
            {item.href ? (
              <Link to={item.href} className="hover:text-brand-sage transition-colors truncate max-w-[120px]">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-muted/40 truncate max-w-[120px]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
