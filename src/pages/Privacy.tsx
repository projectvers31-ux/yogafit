import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, EyeOff, Lock } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-brand-lavender/20 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brand-ink mb-6">Privacy Policy</h1>
          <p className="text-brand-muted text-lg">Last updated: May 2026</p>
        </motion.div>

        <div className="space-y-12">
          <section className="bg-white p-8 rounded-[2rem] border border-brand-border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-brand-accent">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-2xl font-serif text-brand-ink">Our Commitment</h2>
            </div>
            <p className="text-brand-muted leading-relaxed mb-4">
              Your privacy is extremely important to us. We collect your email address solely to provide you with your personalized fitness analysis and occasional updates that help you on your journey.
            </p>
            <p className="text-brand-muted leading-relaxed">
              <strong>We do not sell, rent, or share your personal data with third parties.</strong> Your trust is our greatest asset.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-bold text-brand-ink">1. Information We Collect</h3>
            <p className="text-brand-muted leading-relaxed">
              When you take our quiz, we collect information regarding your fitness goals, activity level, and your email address. This data is used exclusively to generate your custom plan and improve our services.
            </p>

            <h3 className="text-xl font-bold text-brand-ink">2. Data Protection</h3>
            <p className="text-brand-muted leading-relaxed">
              We implement industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure. All data is stored on secure servers with encrypted connections.
            </p>

            <h3 className="text-xl font-bold text-brand-ink">3. Your Rights</h3>
            <p className="text-brand-muted leading-relaxed">
              You have the right to access, correct, or delete your personal information at any time. Every email we send contains a simple one-click unsubscribe link if you wish to stop receiving communications from us.
            </p>
          </section>

          <div className="pt-10 border-t border-brand-border text-center">
            <p className="text-brand-muted italic">
              Questions about our privacy practices? Contact us at support@fitfeky.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
