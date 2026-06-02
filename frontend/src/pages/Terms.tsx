import { AlertCircle, FileText, Info } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';

export default function Terms() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-warm">
      <SEOHelmet
        title="Terms of Service — FitFeky"
        description="Review the terms of service for FitFeky. Including fitness disclaimer, user responsibility, and intellectual property policies."
        canonicalPath="/terms"
      />

      <section className="relative pt-36 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-blush/10 to-transparent" />
        <div className="max-w-3xl mx-auto relative">
          <div className="animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
              <FileText size={12} /> Terms of Service
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-ink mb-3 leading-tight">Terms of Service</h1>
            <p className="text-brand-muted">Effective Date: May 2026</p>
          </div>

          <div className="mt-12 space-y-8">
            <div className="animate-fadeIn bg-white p-8 md:p-10 rounded-2xl border border-brand-border/30">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-brand-ink mb-3">Fitness Disclaimer</h2>
                  <p className="text-brand-muted leading-relaxed">
                    The content provided on FitFeky is for informational purposes only and is not intended as medical advice. You should always consult with a physician or other healthcare professional before starting any new exercise program, especially if you have any pre-existing medical conditions or are pregnant.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Info,
                  title: '1. User Responsibility',
                  text: 'By using this site and our programs, you agree that you are performing these activities at your own risk. FitFeky and its creators are not responsible for any injuries or health problems you may experience as a result of following our recommendations.',
                },
                {
                  icon: FileText,
                  title: '2. Intellectual Property',
                  text: 'All content, logos, and designs on this website are the property of FitFeky. You may not reproduce, distribute, or use our content for commercial purposes without explicit written permission.',
                },
              ].map((section, i) => (
                <div
                  key={i}
                  className="animate-fadeIn bg-white p-6 md:p-8 rounded-2xl border border-brand-border/30"
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage shrink-0">
                      <section.icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-ink">{section.title}</h3>
                  </div>
                  <p className="text-brand-muted leading-relaxed">{section.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-brand-border/30 text-center">
              <p className="text-brand-muted">
                By using FitFeky, you agree to these terms in full.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
