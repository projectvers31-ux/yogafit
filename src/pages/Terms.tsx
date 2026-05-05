import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, FileText, Info } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-brand-pink/20 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brand-ink mb-6">Terms of Service</h1>
          <p className="text-brand-muted text-lg">Effective Date: May 2026</p>
        </motion.div>

        <div className="space-y-10">
          <section className="bg-[#FFF8F8] p-8 rounded-[2rem] border border-[#FADBD8] shadow-sm">
            <div className="flex items-center gap-4 mb-6 text-[#C0392B]">
              <AlertCircle size={24} />
              <h2 className="text-xl font-bold uppercase tracking-wider">Fitness Disclaimer</h2>
            </div>
            <p className="text-brand-muted leading-relaxed">
              The content provided on FitFeky is for informational purposes only and is not intended as medical advice. You should always consult with a physician or other healthcare professional before starting any new exercise program, especially if you have any pre-existing medical conditions or are pregnant.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-bold text-brand-ink">1. User Responsibility</h3>
            <p className="text-brand-muted leading-relaxed">
              By using this site and our programs, you agree that you are performing these activities at your own risk. FitFeky and its creators are not responsible for any injuries or health problems you may experience as a result of following our recommendations.
            </p>

            <h3 className="text-xl font-bold text-brand-ink">2. Affiliate Disclosure</h3>
            <p className="text-brand-muted leading-relaxed">
              Some of the recommendations provided may include affiliate links. This means we may earn a commission if you choose to purchase a program or product through our link, at no additional cost to you. We only recommend products we truly believe will benefit our community.
            </p>

            <h3 className="text-xl font-bold text-brand-ink">3. Intellectual Property</h3>
            <p className="text-brand-muted leading-relaxed">
              All content, logos, and designs on this website are the property of FitFeky. You may not reproduce, distribute, or use our content for commercial purposes without explicit written permission.
            </p>
          </section>

          <div className="pt-10 border-t border-brand-border text-center">
            <p className="text-brand-muted">
              By using FitFeky, you agree to these terms in full.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
