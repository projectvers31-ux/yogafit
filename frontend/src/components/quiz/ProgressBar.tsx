import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

const PROGRESS_VALUES = [0, 15, 28, 40, 50, 62, 72, 82, 90, 100];

export default memo(function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = PROGRESS_VALUES[Math.min(currentStep - 1, PROGRESS_VALUES.length - 1)] ?? 0;
  const [showHalfway, setShowHalfway] = useState(false);

  useEffect(() => {
    if (progress >= 50 && progress < 55) {
      setShowHalfway(true);
      const timer = setTimeout(() => setShowHalfway(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-brand-sage/10 z-50">
        <motion.div
          className="h-full bg-linear-to-r from-brand-sand via-brand-sage to-brand-sage"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-muted/50">
        Question {currentStep} of {totalSteps}
      </div>

      <AnimatePresence>
        {showHalfway && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-brand-sage/10 border border-brand-sage/15 rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles size={10} className="text-brand-sage" />
            <span className="text-[10px] font-medium text-brand-sage whitespace-nowrap">
              You&rsquo;re halfway to your personalized plan!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
