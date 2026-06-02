import { memo } from 'react';
import { FileText, Target, Heart } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: FileText,
    title: 'Answer 10 Quick Questions',
    desc: 'Tell us about your body, goals, and lifestyle. No fluff — just what we need to create your perfect plan.'
  },
  {
    step: '02',
    icon: Target,
    title: 'Get Your Custom Blueprint',
    desc: 'Receive a science-backed yoga and nutrition plan designed specifically for your body type and schedule.'
  },
  {
    step: '03',
    icon: Heart,
    title: 'Follow, Feel, and Transform',
    desc: 'Start seeing real results in as little as 2 weeks. Simple daily sessions that fit your life.'
  },
];

export default memo(function HowItWorks() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white border-t border-brand-border/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
            How It Works
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-ink leading-tight px-2">
            Three Minutes to Your{" "}
            <span className="text-brand-sage italic">Personalized Plan</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <item.icon size={24} className="text-brand-sage" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-sage/60 mb-3 block">{item.step}</span>
              <h3 className="text-lg md:text-xl font-serif text-brand-ink mb-3">{item.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
