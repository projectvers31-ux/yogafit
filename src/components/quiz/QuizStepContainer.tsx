import { type ReactNode, memo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default memo(function QuizStepContainer({
  title, children, onBack, currentStep, totalSteps
}: {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-xl mx-auto px-5 md:px-8 min-h-[60vh] md:min-h-[75vh] flex flex-col justify-center py-8 md:py-16 relative"
    >
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-6 md:left-8 flex items-center gap-1.5 text-brand-muted/60 hover:text-brand-sage transition-colors text-[10px] font-bold uppercase tracking-widest"
        >
          <ChevronRight size={12} className="rotate-180" /> Back
        </button>
      )}

      {currentStep && totalSteps && (
        <div className="absolute top-4 right-4 md:top-6 md:right-8 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-sand/60">
          {currentStep} of {totalSteps}
        </div>
      )}

      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-xl md:text-3xl font-serif text-brand-ink mb-2 md:mb-3 px-2 leading-tight">{title}</h2>
        <p className="text-sm text-brand-muted px-4">Choose the option that fits you best.</p>
      </div>
      <div className="space-y-2.5 md:space-y-3">
        {children}
      </div>
    </motion.div>
  );
});
