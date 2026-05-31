import { memo } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What is the best yoga program for beginner women?",
    a: "The best yoga program for beginner women is one that respects where you are today while gently guiding you toward where you want to be. Our programs are built on a progressive overload framework adapted for yoga..."
  },
  {
    q: "How can women lose belly fat at home without equipment?",
    a: "Losing belly fat at home without equipment requires a combination of core-focused high-intensity interval training (HIIT), whole-body metabolic conditioning, and a hormone-balanced nutrition plan."
  },
  {
    q: "Is 15 minutes of yoga daily enough to see results?",
    a: "Yes, absolutely! Consistency is far more important than duration..."
  },
  {
    q: "What fitness program works best for busy moms?",
    a: "The fitness program that works best for busy moms is one that offers maximum flexibility..."
  },
  {
    q: "How does the FitFeky quiz work?",
    a: "The FitFeky quiz is a precision diagnostic tool disguised as a 60-second questionnaire..."
  }
];

export default memo(function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 px-6 md:px-12 bg-brand-warm border-t border-brand-border/20 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
          FAQ
        </div>
        <h2 className="text-3xl md:text-5xl font-serif mb-10 md:mb-14 text-brand-ink text-center px-4 leading-tight">Your Questions, Answered</h2>
        <div className="space-y-4 w-full">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-brand-border/30 hover:border-brand-sand/30 transition-all duration-300 overflow-hidden" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                <h3 className="text-sm md:text-base font-medium text-brand-ink group-open:text-brand-sage transition-colors pr-4 text-left leading-snug">
                  {faq.q}
                </h3>
                <ChevronDown size={16} className="text-brand-muted shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5">
                <div className="h-px bg-brand-border/20 -mx-6 mb-4" />
                <p className="text-sm text-brand-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
});
