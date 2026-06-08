import { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

const TOOLTIPS: Record<string, string> = {
  identity: 'This helps us avoid advice you\u2019ve already tried',
  painPoint: 'Your emotional goal drives better long-term results',
  timeAvailable: 'We match your plan to the time you actually have',
  pastObstacle: 'Activity level is the biggest factor in your calorie target',
  commitment: 'Your readiness level helps us set the right challenge',
  urgency: 'Your timeline determines how we structure your plan',
  desiredResult: 'Your starting point determines your safe weekly goal',
  currentWeight: 'Accurate weight data ensures precise calorie targets',
  height: 'Height is essential for calculating your metabolic rate',
  targetWeight: 'A realistic target keeps you motivated and on track',
};

export default function WhyTooltip({ step }: { step: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const text = TOOLTIPS[step];
  if (!text) return null;

  return (
    <div ref={ref} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-brand-muted/40 hover:text-brand-sage hover:bg-brand-sage/5 transition-colors"
        aria-label="Why we ask this"
      >
        <HelpCircle size={15} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-56 bg-brand-ink text-white text-[10px] leading-relaxed rounded-lg px-3 py-2 shadow-lg z-50 text-center pointer-events-none">
          {text}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-ink rotate-45" />
        </div>
      )}
    </div>
  );
}
