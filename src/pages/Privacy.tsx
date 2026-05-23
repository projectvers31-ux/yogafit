import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, EyeOff, Lock, Mail } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';

export default function Privacy() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-warm">
      <SEOHelmet
        title="Privacy Policy — FitFeky"
        description="FitFeky respects your privacy. Learn how we collect, use, and protect your personal information when you use our fitness quiz and wellness programs."
        canonicalPath="/privacy"
      />

      <section className="relative pt-36 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-blush/10 to-transparent" />
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
              <ShieldCheck size={12} /> Privacy Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-ink mb-3 leading-tight">Privacy Policy</h1>
            <p className="text-brand-muted">Last updated: May 2026</p>
          </motion.div>

          <div className="mt-12 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white p-8 md:p-10 rounded-2xl border border-brand-border/30"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="text-xl font-serif text-brand-ink">Our Commitment</h2>
              </div>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                <p>
                  Your privacy is extremely important to us. We collect your email address solely to provide you with your personalized fitness analysis and occasional updates that help you on your journey.
                </p>
                <p className="font-semibold text-brand-ink">
                  We do not sell, rent, or share your personal data with third parties. Your trust is our greatest asset.
                </p>
              </div>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  icon: EyeOff,
                  title: '1. Information We Collect',
                  text: 'When you take our quiz, we collect information regarding your fitness goals, activity level, and your email address. This data is used exclusively to generate your custom plan and improve our services.',
                },
                {
                  icon: Lock,
                  title: '2. Data Protection',
                  text: 'We implement industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure. All data is stored on secure servers with encrypted connections.',
                },
                {
                  icon: Mail,
                  title: '3. Your Rights',
                  text: 'You have the right to access, correct, or delete your personal information at any time. Every email we send contains a simple one-click unsubscribe link if you wish to stop receiving communications from us.',
                },
              ].map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white p-6 md:p-8 rounded-2xl border border-brand-border/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage shrink-0">
                      <section.icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-ink">{section.title}</h3>
                  </div>
                  <p className="text-brand-muted leading-relaxed">{section.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-brand-border/30 text-center">
              <p className="text-brand-muted italic">
                Questions about our privacy practices?{' '}
                <a href="mailto:support@fitfeky.com" className="text-brand-sage hover:underline">
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
