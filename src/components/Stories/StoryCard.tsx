import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StoryCardProps {
  id: string;
  name: string;
  ageRange: string;
  categoryLabel: string;
  problem: string;
  result: string;
  duration: string;
  image?: string;
  index: number;
}

export default function StoryCard({ id, name, ageRange, categoryLabel, problem, result, duration, image, index }: StoryCardProps) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-md transition-all flex flex-col cursor-pointer"
      onClick={() => navigate(`/stories/${id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/stories/${id}`); }}
    >
      {image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt=""
            width={600}
            height={450}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      <div className="p-5 flex flex-col grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 bg-brand-sage/10 text-brand-sage text-[8px] font-bold uppercase tracking-widest rounded-full border border-brand-sage/20">
            {categoryLabel}
          </span>
          <span className="flex items-center gap-1 text-[9px] text-brand-muted/60">
            <Clock size={10} /> {duration}
          </span>
        </div>

        <h3 className="text-base md:text-lg font-serif text-brand-ink mb-2 leading-snug group-hover:text-brand-sage transition-colors">
          {name}, {ageRange}
        </h3>

        <p className="text-xs text-brand-muted leading-relaxed mb-3 line-clamp-3">
          {problem}
        </p>

        <div className="mt-auto border-t border-brand-border/20 pt-3">
          <div className="flex items-center gap-1.5 text-brand-sage/70 text-[9px] font-bold uppercase tracking-widest mb-1.5">
            Result
          </div>
          <p className="text-sm font-semibold text-brand-ink leading-snug">
            {result}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-brand-sage text-[10px] font-bold uppercase tracking-widest mt-4 group-hover:gap-2.5 transition-all">
          Read Full Story <ArrowRight size={12} />
        </div>
      </div>
    </motion.article>
  );
}
