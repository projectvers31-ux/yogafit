import { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import { Target, Sparkles, Heart, Star } from 'lucide-react';

const messages = [
  "Calculating your metabolic profile...",
  "Analyzing stress & recovery markers...",
  "Matching your profile to 200+ proven programs...",
  "Optimizing for your schedule...",
  "Finalizing your 30-day transformation plan..."
];

export default memo(function AnalyzingStep({ name, onComplete }: { name: string, onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analyzing your responses...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        const increment = Math.random() * 12;
        const next = Math.min(prev + increment, 100);
        const msgIndex = Math.floor((next / 100) * messages.length);
        if (messages[msgIndex]) setStatus(messages[msgIndex]);
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-6 md:px-8 min-h-[75vh] md:min-h-[80vh] flex flex-col justify-center items-center py-12 md:py-20 text-center"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-sage/10 rounded-full flex items-center justify-center mb-8 md:mb-10 relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-transparent border-t-brand-sand rounded-full"
        />
        <Target size={32} className="text-brand-sage animate-pulse md:w-10 md:h-10" />
      </div>

      <h2 className="text-2xl md:text-5xl font-serif text-brand-ink mb-4 md:mb-6 px-4 leading-tight">Creating Your Personal Blueprint</h2>
      <p className="text-brand-muted italic mb-10 md:mb-12 text-sm md:text-lg px-6">We are tailoring a unique plan for {name || 'you'}...</p>

      <div className="w-full max-w-xs sm:max-w-sm space-y-4 px-4">
        <div className="h-1.5 md:h-2 bg-brand-sage/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-brand-sand to-brand-sage rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-sage">{status}</p>
          <p className="text-[10px] font-mono font-bold text-brand-muted">{Math.round(progress)}%</p>
        </div>
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-lg px-4">
        {[
          { icon: Sparkles, label: "Metabolic", color: "text-brand-sand" },
          { icon: Heart, label: "Recovery", color: "text-brand-sage" },
          { icon: Star, label: "Efficiency", color: "text-brand-sand" },
          { icon: Target, label: "Strength", color: "text-brand-sage" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.2 }}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/60 border border-brand-border/30"
          >
            <item.icon size={16} className={item.color} />
            <span className="text-[8px] font-bold uppercase tracking-widest text-brand-muted">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});
