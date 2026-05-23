import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BadgeInfo, ExternalLink, HeartHandshake, ShieldCheck } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import SEOHelmet from '@/components/seo/SEOHelmet';

const principles = [
  'We may earn a commission when you buy through certain links on this site.',
  'There is no extra cost to you when you use one of our affiliate links.',
  'We only feature products and programs that fit FitFeky’s health, movement, and wellness focus.',
  'Our editorial opinions are our own and are not purchased by partners.',
];

export default function AffiliateDisclosure() {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent('affiliate_disclosure_view', { page: 'affiliate_disclosure' }, true);
  }, []);

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone pt-32 pb-20 px-6">
      <SEOHelmet
        title="Affiliate Disclosure | FitFeky"
        description="Learn how affiliate links are used on FitFeky and how we choose the products we recommend."
        canonicalPath="/affiliate-disclosure"
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-sage/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sage">
            <BadgeInfo size={14} />
            Transparency First
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-serif text-brand-ink">Affiliate Disclosure</h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            FitFeky participates in affiliate programs. Some links across our site may be affiliate
            links, which means we may receive a commission if you choose to make a purchase.
          </p>
        </motion.div>

        <div className="space-y-8">
          <section className="rounded-4xl border border-brand-border bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink text-brand-accent">
                <HeartHandshake size={24} />
              </div>
              <h2 className="text-2xl font-serif text-brand-ink">How This Works</h2>
            </div>
            <p className="text-brand-muted leading-relaxed">
              When you click an affiliate link and purchase a featured product, the seller may pay
              us a referral commission. That compensation helps us maintain the site, create
              educational content, and keep our quiz and recommendations available.
            </p>
          </section>

          <section className="rounded-4xl border border-brand-border bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-lavender/40 text-brand-sage">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-serif text-brand-ink">Our Standards</h2>
            </div>
            <ul className="space-y-4 text-brand-muted leading-relaxed">
              {principles.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-sage" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-4xl border border-brand-border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-serif text-brand-ink">Important Reminder</h2>
            <p className="mt-4 text-brand-muted leading-relaxed">
              Affiliate relationships do not change the price you pay. They also do not replace
              professional medical, nutritional, or fitness advice. Always choose products based on
              your own needs and, when appropriate, guidance from a qualified professional.
            </p>
          </section>

          <section className="rounded-4xl border border-brand-border bg-brand-sage/5 p-8 shadow-sm">
            <h2 className="flex items-center gap-2 text-2xl font-serif text-brand-ink">
              Contact Us
              <ExternalLink size={18} className="text-brand-sage" />
            </h2>
            <p className="mt-4 text-brand-muted leading-relaxed">
              If you have questions about a recommendation or a partner relationship, contact us at
              support@fitfeky.com and we will be happy to clarify.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
