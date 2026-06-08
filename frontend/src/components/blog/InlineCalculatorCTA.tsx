import { Link } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';

export default function InlineCalculatorCTA({
  tool,
  text,
  href,
}: {
  tool: string;
  text: string;
  href: string;
}) {
  if (!href || !tool) return null;
  return (
    <Link
      to={href}
      className="block my-6 p-4 md:p-5 bg-linear-to-r from-brand-sage/10 to-brand-tan/20 border border-brand-sage/20 rounded-2xl hover:from-brand-sage/15 hover:to-brand-tan/30 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0">
          <Calculator size={18} className="text-brand-sage" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-0.5">
            {tool}
          </p>
          <p className="text-sm font-medium text-brand-ink leading-snug">
            {text}
          </p>
        </div>
        <ArrowRight size={16} className="text-brand-sage/40 group-hover:text-brand-sage group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </Link>
  );
}
