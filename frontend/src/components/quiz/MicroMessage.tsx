import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

const MESSAGES: Record<number, string> = {
  3: 'Great\u2014your plan is taking shape. Only a few more questions.',
  5: 'Your plan is 60% complete. Just 2 minutes left!',
  8: "We're calculating your results now\u2026",
};

export default function MicroMessage({ currentStep }: { currentStep: number }) {
  const text = MESSAGES[currentStep];
  if (!text) return null;

  const key = `msg-${currentStep}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex items-center justify-center gap-1.5 pt-2 pb-1 text-[10px] text-brand-sage font-medium"
      >
        <Sparkles size={10} className="shrink-0" />
        <span>{text}</span>
      </motion.div>
    </AnimatePresence>
  );
}
