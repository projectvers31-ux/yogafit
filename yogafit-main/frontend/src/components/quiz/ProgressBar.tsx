import { memo } from 'react';
import { motion } from 'motion/react';

export default memo(function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-brand-sage/10 z-50">
      <motion.div
        className="h-full bg-linear-to-r from-brand-sand via-brand-sage to-brand-sage"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
});
