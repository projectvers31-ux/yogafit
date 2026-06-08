import { useState, useEffect, useRef, createContext, useContext, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Star, Sparkles } from 'lucide-react';

interface SmartCTAProps {
  tool: string;
  category: string;
  userValue: number;
}

const SmartCTACtx = createContext<SmartCTAProps | null>(null);

function getInlineContent(tool: string, category: string) {
  const map: Record<string, Record<string, { heading: string; text: string }>> = {
    'body-fat': {
      'Overweight Range': {
        heading: 'Your BMI needs attention',
        text: 'Your BMI suggests a structured plan could help. See your personalized recommendations \u2192',
      },
      'Obese Class I': {
        heading: 'Let\u2019s build your plan',
        text: 'Let\u2019s turn this number into a real action plan. Get your complete weight loss blueprint \u2192',
      },
      'Obese Class II': {
        heading: 'Let\u2019s build your plan',
        text: 'Let\u2019s turn this number into a real action plan. Get your complete weight loss blueprint \u2192',
      },
    },
    'calorie-deficit': {
      'weight-loss': {
        heading: 'You have your number',
        text: 'Now you know your target. Find out WHY you haven\u2019t been hitting it \u2192',
      },
    },
  };

  return map[tool]?.[category] ?? {
    heading: 'What\u2019s next?',
    text: 'Your results are just the start. Get a complete plan built around your body \u2192',
  };
}

export function InlineCta() {
  const ctx = useContext(SmartCTACtx);
  if (!ctx) return null;
  const content = getInlineContent(ctx.tool, ctx.category);

  return (
    <Link
      to="/"
      className="block mt-5 p-4 bg-brand-sage/5 border border-brand-sage/15 rounded-xl hover:bg-brand-sage/10 transition-colors group"
    >
      <p className="text-xs font-bold text-brand-sage mb-0.5">{content.heading}</p>
      <p className="text-xs text-brand-muted/80 group-hover:text-brand-ink transition-colors">
        {content.text}
      </p>
    </Link>
  );
}

const AVATARS = [
  { initial: 'S', bg: 'bg-rose-300' },
  { initial: 'M', bg: 'bg-sky-300' },
  { initial: 'K', bg: 'bg-amber-300' },
];

export function EndOfPageCta() {
  const ctx = useContext(SmartCTACtx);

  return (
    <section className="max-w-3xl mx-auto px-4 md:px-12 py-16 md:py-20 border-t border-brand-border/20">
      <div className="bg-linear-to-br from-brand-sage/5 to-brand-blush/20 border border-brand-sage/15 rounded-3xl p-8 md:p-12 text-center">
        <Sparkles size={32} className="text-brand-sage mx-auto mb-4" />

        {/* Social proof: avatars + rating */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex -space-x-2">
            {AVATARS.map((a, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}
              >
                {a.initial}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className="fill-brand-gold text-brand-gold" />
            ))}
            <span className="text-[10px] text-brand-muted/70 ml-1">4.9/5</span>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-serif text-brand-ink mb-3 leading-tight">
          Join 50,000+ people who discovered<br />
          <span className="text-brand-sage italic">their ideal plan</span>
        </h2>
        <p className="text-sm text-brand-muted max-w-md mx-auto mb-6 leading-relaxed">
          Takes 2 minutes. No signup required.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-sage text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20"
        >
          Take the Free Assessment <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

export default function SmartCTA({ tool, category, userValue, children }: SmartCTAProps & { children: ReactNode }) {
  const [showSticky, setShowSticky] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const exitShownRef = useRef(false);

  useEffect(() => {
    if (stickyDismissed) return;
    const timer = setTimeout(() => setShowSticky(true), 30000);
    return () => clearTimeout(timer);
  }, [stickyDismissed]);

  useEffect(() => {
    if (exitShownRef.current) return;
    const flag = sessionStorage.getItem('sf_cta_exit_shown');
    if (flag === '1') {
      exitShownRef.current = true;
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      if (window.innerWidth < 768) return;
      exitShownRef.current = true;
      sessionStorage.setItem('sf_cta_exit_shown', '1');
      setShowExitIntent(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const dismissSticky = () => {
    setShowSticky(false);
    setStickyDismissed(true);
  };

  const dismissExitIntent = () => setShowExitIntent(false);

  return (
    <SmartCTACtx.Provider value={{ tool, category, userValue }}>
      {children}

      <AnimatePresence>
        {showSticky && (
          createPortal(
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-brand-border/20 shadow-2xl px-4 py-3"
            >
              <div className="flex items-center justify-between max-w-lg mx-auto">
                <Link
                  to="/"
                  className="flex-1 bg-brand-sage text-white text-center py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20"
                  onClick={() => setShowSticky(false)}
                >
                  Get Your Free Plan
                </Link>
                <button
                  onClick={dismissSticky}
                  className="ml-3 p-2 text-brand-muted/50 hover:text-brand-muted transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>,
            document.body
          )
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExitIntent && (
          createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-2xl"
              >
                <Sparkles size={36} className="text-brand-sage mx-auto mb-4" />
                <h2 className="text-xl font-serif text-brand-ink mb-3 leading-tight">
                  Before you go — get your<br />
                  <span className="text-brand-sage italic">personalized plan</span>
                </h2>
                <p className="text-sm text-brand-muted mb-6 leading-relaxed">
                  Your results are a snapshot. A complete plan considers your body, preferences, and lifestyle.
                </p>
                <Link
                  to="/"
                  onClick={dismissExitIntent}
                  className="block w-full bg-brand-sage text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 mb-3"
                >
                  Show Me My Plan <ArrowRight size={14} className="inline ml-1" />
                </Link>
                <button
                  onClick={dismissExitIntent}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/50 hover:text-brand-muted transition-colors"
                >
                  No thanks, I have my number
                </button>
              </motion.div>
            </motion.div>,
            document.body
          )
        )}
      </AnimatePresence>
    </SmartCTACtx.Provider>
  );
}
