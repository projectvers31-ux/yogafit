import { memo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default memo(function QuizOption({
  label, icon: Icon, onClick, active
}: {
  label: string;
  icon: any;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 md:gap-4 px-4 py-3.5 md:px-5 md:py-4 rounded-2xl border transition-all duration-300 text-left ${
        active
        ? 'border-brand-sage bg-brand-sage/5 shadow-sm'
        : 'border-brand-border/30 bg-white hover:border-brand-sand/30 hover:bg-brand-warm'
      }`}
    >
      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-brand-sage text-white' : 'bg-brand-blush/40 text-brand-muted'}`}>
        <Icon size={18} />
      </div>
      <span className={`text-sm md:text-base font-medium transition-colors leading-snug grow ${active ? 'text-brand-ink' : 'text-brand-muted'}`}>{label}</span>
      <div className={`shrink-0 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${active ? 'border-brand-sage bg-brand-sage' : 'border-brand-border/50'}`}>
        {active && <CheckCircle2 size={10} className="text-white" />}
      </div>
    </motion.button>
  );
});
