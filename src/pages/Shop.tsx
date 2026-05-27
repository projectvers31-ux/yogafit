import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, Heart, Sparkles, Search, Star } from 'lucide-react';
import { trackMetaProductClick } from '@/lib/analytics';
import SEOHelmet from '@/components/seo/SEOHelmet';

interface ShopProduct {
  title: string;
  benefit: string;
  url: string;
  category: string;
  price?: string;
}

const products: ShopProduct[] = [
  { title: 'The Best Keto Cookbook', benefit: '100+ gourmet keto recipes with full macro breakdowns for easy weight loss.', url: 'https://joeduff.gumroad.com/l/BestKetoCookbook?a=383200147', category: 'Nutrition' },
  { title: 'Savory Keto Cookbook', benefit: 'Satisfying meals that crush cravings and keep you on track effortlessly.', url: 'https://joeduff.gumroad.com/l/SavoryKetoCookbook?a=383200147', category: 'Nutrition' },
  { title: 'The P:E Diet', benefit: 'Science-backed approach to body recomposition and sustainable fat loss.', url: 'https://tednaiman.gumroad.com/l/thepediet?a=383200147', category: 'Nutrition' },
  { title: 'Satiety Per Calorie', benefit: 'Learn how to eat until you are full and still drop the pounds consistently.', url: 'https://tednaiman.gumroad.com/l/satietypercalorie?a=383200147', category: 'Nutrition' },
  { title: 'The Fairy Princess Diet', benefit: 'Aesthetic approach to wellness, flexibility, and feminine fitness.', url: 'https://fairyprincessdiet.gumroad.com/l/fpd?a=383200147', category: 'Nutrition' },
  { title: 'Yoga Membership', benefit: 'Full access to premium yoga library and live community sessions.', url: 'https://pouyayoga.gumroad.com/l/YogaMembership?a=383200147', category: 'Yoga' },
  { title: 'The Mindful Goddess', benefit: 'Reduce stress and tone your body with feminine energy and movement.', url: 'https://rogueevans.gumroad.com/l/themindfulgoddess?a=383200147', category: 'Yoga' },
  { title: 'Yoga with Pam', benefit: 'Fix your posture and gain agility with expert-led sessions for all levels.', url: 'https://onlineyogawithpam.gumroad.com/l/bivzn?a=383200147', category: 'Yoga' },
  { title: 'Niitty Yoga', benefit: 'Low-impact movements for high-impact results in your daily practice.', url: 'https://somiyoga.gumroad.com/l/niitty?a=383200147', category: 'Yoga' },
  { title: 'Babaji Sky Yoga', benefit: 'Traditional yoga techniques for modern life and deep spiritual growth.', url: 'https://babajiskyp.gumroad.com/l/CNlac?a=383200147', category: 'Yoga' },
  { title: 'Steele Pilates Yoga', benefit: 'Complete training program blending pilates precision with yoga flow.', url: 'https://steelepilatesllc.gumroad.com/l/Tvnwl?a=383200147', category: 'Yoga' },
  { title: 'Kayla Kurin Yoga', benefit: 'Personalized yoga sequences for strength, flexibility, and mindfulness.', url: 'https://kaylakurin.gumroad.com/l/kdwcD?a=383200147', category: 'Yoga' },
  { title: 'Mysore Body Practice', benefit: 'Traditional Mysore technique for authentic yogic transformation.', url: 'https://adarshwilliams.gumroad.com/l/mysorebody?a=383200147', category: 'Yoga' },
  { title: 'Yogic Healing eBook', benefit: 'Ancient healing practices and wisdom for modern life transformation.', url: 'https://worldbornwithin.gumroad.com/l/Yogic-Healing-eBook?a=383200147', category: 'Yoga' },
  { title: 'Seven Surya Mastery', benefit: 'Master the sacred sun salutation practice with proper alignment.', url: 'https://anjanyoga.gumroad.com/l/sevensurya?a=383200147', category: 'Yoga' },
  { title: 'Yoga for Moms', benefit: 'Postpartum recovery, core strength, and confidence rebuilding.', url: 'https://crisdimayoga.gumroad.com/l/yogaformoms?a=383200147', category: 'Yoga' },
  { title: 'Yogra Complete System', benefit: 'Comprehensive system combining strength, flexibility, and breath.', url: 'https://yograyoga.gumroad.com/l/pNvsT?a=383200147', category: 'Yoga' },
  { title: 'Taoist Yoga Healing', benefit: 'Ancient Eastern philosophy for energy balance and healing.', url: 'https://aquariusacademy.gumroad.com/l/taoist-yoga?a=383200147', category: 'Yoga' },
  { title: 'Accelerated Fat Loss', benefit: 'Fastest way to drop body fat safely and effectively.', url: 'https://alexanderjacortes.gumroad.com/l/AcceleratedFatloss?a=383200147', category: 'Fitness' },
  { title: 'AJAC Diet', benefit: 'Sustainable approach to eating for long-term health and performance.', url: 'https://alexanderjacortes.gumroad.com/l/AJACDiet?a=383200147', category: 'Fitness' },
  { title: 'The Big Bean', benefit: 'Unlock explosive energy levels and mental focus.', url: 'https://soberfitness.gumroad.com/l/thebigbean?a=383200147', category: 'Fitness' },
  { title: 'Fit Patriot', benefit: 'Develop functional strength and unstoppable stamina.', url: 'https://fitpatriot.gumroad.com/l/goovg?a=383200147', category: 'Fitness' },
  { title: 'Glow Up Guide', benefit: 'Holistic guide to looking and feeling your absolute best.', url: 'https://bloombody.gumroad.com/l/GlowUp?a=383200147', category: 'Wellness' },
  { title: 'Lyna Glow', benefit: 'Master the art of aesthetic wellness and beauty routines.', url: 'https://glowupwithlyna.gumroad.com/l/luovl?a=383200147', category: 'Wellness' },
  { title: 'Diet Planner', benefit: 'Simple tool for planning your meals and tracking results.', url: 'https://harrisonwallace1999.gumroad.com/l/dietplanner?a=383200147', category: 'Wellness' },
  { title: 'Pro Coach', benefit: '1-on-1 support to reach your fitness and lifestyle goals.', url: 'https://harrisonwallace1999.gumroad.com/l/procoach?a=383200147', category: 'Wellness' },
];

const categories = ['All', 'Nutrition', 'Yoga', 'Fitness', 'Wellness'];

const categoryStyles: Record<string, string> = {
  Nutrition: 'bg-amber-50 text-amber-700 border-amber-200',
  Yoga: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Fitness: 'bg-blue-50 text-blue-700 border-blue-200',
  Wellness: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.benefit.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main id="main-content" className="min-h-screen bg-brand-warm">
      <SEOHelmet
        title="Wellness Products & Programs — FitFeky Shop"
        description="Explore curated wellness programs, yoga guides, nutrition plans, and fitness tools recommended by FitFeky for your personalized journey."
        canonicalPath="/shop"
        ldJson={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Wellness Products & Programs',
          description: 'Curated wellness programs, yoga guides, nutrition plans, and fitness tools.',
          url: 'https://fitfeky.com/shop',
        }}
      />

      <section className="relative pt-36 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden border-b border-brand-border/20">
        <div className="absolute inset-0 bg-linear-to-b from-brand-blush/10 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-brand-sage/10 border border-brand-sage/20">
              <ShoppingBag size={14} className="text-brand-sage" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sage">Curated for You</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-brand-ink mb-4 leading-tight">
              Tools for Your{' '}
              <span className="italic text-brand-sand">Transformation</span>
            </h1>
            <p className="text-brand-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Curated programs, guides, and wellness protocols designed to support your unique journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 px-6 md:px-12 border-b border-brand-border/20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-brand-sage text-white shadow-sm'
                      : 'bg-white text-brand-muted border border-brand-border/30 hover:border-brand-sage/30 hover:text-brand-sage'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted/60" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-brand-border/30 bg-white text-sm text-brand-ink placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-brand-muted text-lg">No products found. Try a different search or category.</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i % 12) * 0.03 }}
                    className="group bg-white p-5 md:p-6 rounded-xl border border-brand-border/30 hover:border-brand-sand/40 hover:shadow-lg hover:shadow-brand-sand/5 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${categoryStyles[product.category] || ''}`}>
                        {product.category}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-semibold text-brand-ink mb-2 leading-snug group-hover:text-brand-sage transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-xs md:text-sm text-brand-muted mb-4 grow leading-relaxed">
                      {product.benefit}
                    </p>

                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMetaProductClick(product.title, product.category)}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-lg bg-brand-sage/10 text-brand-sage text-xs font-semibold hover:bg-brand-sage hover:text-white transition-all group/btn"
                    >
                      Learn More
                      <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 text-center text-xs text-brand-muted/60">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-12 bg-linear-to-b from-brand-blush/10 to-brand-warm border-t border-brand-border/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 text-brand-gold mb-6">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-brand-ink mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-brand-muted text-base md:text-lg mb-8 leading-relaxed">
              Take our personalized quiz to discover which program is perfect for your unique goals.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-sage text-white font-semibold rounded-full hover:bg-brand-sage/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-sage/20 transition-all"
            >
              Take the Free Quiz <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
