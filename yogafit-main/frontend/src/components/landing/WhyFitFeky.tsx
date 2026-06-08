import { memo } from 'react';
import { Target, Sparkles, Heart, Brain, Feather } from 'lucide-react';

const features = [
  { icon: Target, title: 'Hyper-Personalized', desc: 'No two plans are alike. Your blueprint adapts to your body, your schedule, your psychology, and your goals.' },
  { icon: Brain, title: 'Behavioral Science', desc: 'Programs designed around habit formation, not willpower' },
  { icon: Heart, title: 'Holistic Wellness', desc: 'Mindset, nutrition, movement, and recovery — all integrated into one seamless system' },
  { icon: Sparkles, title: 'AI-Powered Precision', desc: '50,000+ data points analyzed to optimize your unique metabolic and psychological profile' },
  { icon: Feather, title: 'Adaptive Progression', desc: 'Your plan evolves as your strength and confidence grow' },
];

export default memo(function WhyFitFeky() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-brand-warm border-t border-brand-border/20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
            Why FitFeky
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-ink leading-tight px-2">
            Science Meets{" "}
            <span className="text-brand-sage italic">Mindfulness</span>
          </h2>
          <p className="text-brand-muted mt-4 max-w-xl mx-auto text-sm md:text-base">
            Most programs treat every woman the same. We treat you like the unique individual you are — because that is the only way real, lasting transformation happens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 md:p-7 border border-brand-border/20 hover:border-brand-sage/20 transition-all group hover:shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-sage/5 flex items-center justify-center mb-4 group-hover:bg-brand-sage/10 transition-colors">
                <item.icon size={22} className="text-brand-sage" />
              </div>
              <h3 className="text-base md:text-lg font-serif text-brand-ink mb-2">{item.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
