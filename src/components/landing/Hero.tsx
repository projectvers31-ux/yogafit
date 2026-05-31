import { memo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Award, Dumbbell, Clock } from 'lucide-react';

export default memo(function Hero({
  onStartQuiz
}: {
  onStartQuiz: () => void;
}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-warm">
      <div className="absolute inset-0">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=640&q=75"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1024&q=75"
          />
          <source
            media="(min-width: 1025px)"
            srcSet="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80"
          />
          <img
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80"
            alt=""
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-linear-to-r from-brand-warm/95 via-brand-warm/60 to-brand-warm/20" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-brand-warm to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full border border-white/40">
              <Sparkles size={12} /> Free 60-Second Quiz
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.15] mb-5 text-brand-ink tracking-tight">
              Women's Fitness Quiz —{" "}
              Yoga for Weight Loss{" "}
              <span className="text-brand-sage italic">That Fits Your Life</span>
            </h1>

            <p className="text-base md:text-lg text-brand-muted max-w-lg mb-8 leading-relaxed">
              Answer 10 quick questions and get a yoga and nutrition plan designed for your body, your schedule, and your goals.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {[
                { icon: Heart, text: 'Personalized for You', color: 'text-brand-sage' },
                { icon: Dumbbell, text: 'No Equipment Needed', color: 'text-brand-sage' },
                { icon: Clock, text: 'Start in 60 Seconds', color: 'text-brand-sage' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-muted/80">
                  <item.icon size={12} className={item.color} />
                  {item.text}
                </div>
              ))}
            </div>

            <button
              onClick={onStartQuiz}
              className="group inline-flex items-center gap-3 bg-brand-sage text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-brand-sage/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-sage/30"
            >
              GET MY YOGA PLAN
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mt-3 text-[10px] text-brand-muted/60">
              No credit card required · Takes 60 seconds
            </p>

            <div className="mt-5 flex flex-wrap gap-y-1.5 gap-x-4">
              {[
                { icon: ShieldCheck, text: 'Science-backed yoga sequences' },
                { icon: Award, text: 'Built by certified instructors' },
                { icon: Dumbbell, text: 'No gym, no equipment needed' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-brand-muted/50">
                  <item.icon size={10} className="text-brand-sage/70" />
                  {item.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-5">
              <Heart size={10} className="text-brand-sage/60" />
              <p className="text-[10px] text-brand-muted/50">
                Trusted by women building healthier daily routines
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
