import { memo } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'I have tried three different programs this year and quit every one by week two. This is the first plan that actually matched my schedule. Fifteen minutes a day, no guilt, and I have lost 4 kg in six weeks without feeling deprived.',
    name: 'Aisha M.',
    role: 'Busy Mom of Two, Dubai',
    result: 'Lost 4 kg in 6 weeks',
  },
  {
    quote: 'I was skeptical that a quiz could understand my body better than I do. But the plan pinpointed exactly why my lower back was tight and gave me three specific stretches that fixed it in days. The weight loss is a bonus — I finally feel strong in my own skin.',
    name: 'Priya K.',
    role: 'Office Worker, London',
    result: 'Back pain relief + 3 kg loss',
  },
  {
    quote: 'What made the difference for me was the nutrition integration. Every other yoga app just gives you flows, but FitFeky connected my eating patterns to my energy levels and showed me how to eat for my cycle. I have been consistent for 10 weeks — that is a record for me.',
    name: 'Elena R.',
    role: 'Marketing Manager, Toronto',
    result: 'Consistent for 10 weeks straight',
  },
];

export default memo(function Testimonials() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white border-t border-brand-border/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
            Real Results
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-ink leading-tight px-2">
            Women Like You Are{" "}
            <span className="text-brand-sage italic">Transforming</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-brand-warm rounded-3xl p-6 md:p-7 border border-brand-border/20 flex flex-col">
              <Quote size={18} className="text-brand-sage/30 mb-4 shrink-0" />
              <p className="text-sm text-brand-muted leading-relaxed mb-5 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-brand-border/20 pt-4 mt-auto">
                <div className="flex items-center gap-2 mb-1.5">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={11} fill="currentColor" className="text-brand-gold" />)}
                </div>
                <p className="text-sm font-semibold text-brand-ink">{t.name}</p>
                <p className="text-[10px] text-brand-muted/60">{t.role}</p>
                <div className="mt-2 inline-block px-2.5 py-0.5 bg-brand-sage/10 text-brand-sage text-[8px] font-bold uppercase tracking-widest rounded-full">{t.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
