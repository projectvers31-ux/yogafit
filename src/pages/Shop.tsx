/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Zap, Heart, Leaf } from 'lucide-react';

interface Product {
  title: string;
  benefit: string;
  category: string;
  url: string;
  price: null;
  currency: string;
}

import { trackMetaProductClick } from '@/src/lib/analytics';

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Single source of truth - Cleaned & Deduplicated Gumroad products
  const products = [
    // Keto & Diet
    {
      title: 'The Best Keto Cookbook',
      benefit: '100+ gourmet keto recipes with full macro breakdowns for easy weight loss.',
      url: 'https://joeduff.gumroad.com/l/BestKetoCookbook?a=383200147',
      category: 'Keto & Diet',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Savory Keto Cookbook',
      benefit: 'Satisfying meals that crush cravings and keep you in ketosis effortlessly.',
      url: 'https://joeduff.gumroad.com/l/SavoryKetoCookbook?a=383200147',
      category: 'Keto & Diet',
      price: null,
      currency: 'USD'
    },
    {
      title: 'The P:E Diet',
      benefit: 'Science-backed approach to body recomposition and sustainable fat loss.',
      url: 'https://tednaiman.gumroad.com/l/thepediet?a=383200147',
      category: 'Keto & Diet',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Satiety Per Calorie',
      benefit: 'Learn how to eat until you are full and still drop the pounds consistently.',
      url: 'https://tednaiman.gumroad.com/l/satietypercalorie?a=383200147',
      category: 'Keto & Diet',
      price: null,
      currency: 'USD'
    },
    {
      title: 'The Fairy Princess Diet',
      benefit: 'Aesthetic approach to wellness, flexibility, and feminine fitness mastery.',
      url: 'https://fairyprincessdiet.gumroad.com/l/fpd?a=383200147',
      category: 'Keto & Diet',
      price: null,
      currency: 'USD'
    },

    // Yoga & Flexibility
    {
      title: 'Yoga Membership',
      benefit: 'Full access to premium yoga library and live community transformation sessions.',
      url: 'https://pouyayoga.gumroad.com/l/YogaMembership?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'The Mindful Goddess',
      benefit: 'Reduce stress and tone your body with focused feminine energy and movement.',
      url: 'https://rogueevans.gumroad.com/l/themindfulgoddess?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Yoga with Pam',
      benefit: 'Fix your posture and gain agility with expert-led sessions for all levels.',
      url: 'https://onlineyogawithpam.gumroad.com/l/bivzn?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Niitty Yoga',
      benefit: 'Low-impact movements for high-impact results in your daily practice.',
      url: 'https://somiyoga.gumroad.com/l/niitty?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Babaji Sky Yoga',
      benefit: 'Traditional yoga techniques for modern life and deep spiritual growth.',
      url: 'https://babajiskyp.gumroad.com/l/CNlac?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Steele Pilates Yoga Program',
      benefit: 'Complete training program blending pilates precision with yoga flow.',
      url: 'https://steelepilatesllc.gumroad.com/l/Tvnwl?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Kayla Kurin Yoga Sequences',
      benefit: 'Personalized yoga sequences for strength, flexibility, and mindfulness.',
      url: 'https://kaylakurin.gumroad.com/l/kdwcD?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Mysore Body Practice',
      benefit: 'Traditional Mysore technique for authentic yogic transformation.',
      url: 'https://adarshwilliams.gumroad.com/l/mysorebody?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Yogic Healing eBook',
      benefit: 'Ancient healing practices and wisdom for modern life transformation.',
      url: 'https://worldbornwithin.gumroad.com/l/Yogic-Healing-eBook?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Seven Surya Sun Salutation Mastery',
      benefit: 'Master the sacred sun salutation practice with proper alignment.',
      url: 'https://anjanyoga.gumroad.com/l/sevensurya?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Yoga for Moms Program',
      benefit: 'Postpartum recovery, core strength, and confidence rebuilding.',
      url: 'https://crisdimayoga.gumroad.com/l/yogaformoms?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Yogra Complete Practice System',
      benefit: 'Comprehensive system combining strength, flexibility, and breath.',
      url: 'https://yograyoga.gumroad.com/l/pNvsT?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Taoist Yoga Healing Traditions',
      benefit: 'Ancient Eastern philosophy for energy balance and healing.',
      url: 'https://aquariusacademy.gumroad.com/l/taoist-yoga?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Pilates for Flexibility',
      benefit: 'Improve mobility and range of motion with flowing pilates sequences.',
      url: 'https://steelepilatesllc.gumroad.com/l/KqqNd?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Pilates for Perfect Posture',
      benefit: 'Correct alignment and eliminate back pain through pilates.',
      url: 'https://steelepilatesllc.gumroad.com/l/WOoRR?a=383200147',
      category: 'Yoga & Flexibility',
      price: null,
      currency: 'USD'
    },

    // Fat Loss & Fitness
    {
      title: 'Accelerated Fat Loss',
      benefit: 'Fastest way to drop body fat safely and effectively.',
      url: 'https://alexanderjacortes.gumroad.com/l/AcceleratedFatloss?a=383200147',
      category: 'Fat Loss & Fitness',
      price: null,
      currency: 'USD'
    },
    {
      title: 'AJAC Diet',
      benefit: 'Sustainable approach to eating for long-term health and performance.',
      url: 'https://alexanderjacortes.gumroad.com/l/AJACDiet?a=383200147',
      category: 'Fat Loss & Fitness',
      price: null,
      currency: 'USD'
    },
    {
      title: 'The Big Bean',
      benefit: 'Unlock explosive energy levels and mental focus.',
      url: 'https://soberfitness.gumroad.com/l/thebigbean?a=383200147',
      category: 'Fat Loss & Fitness',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Fit Patriot',
      benefit: 'Develop functional strength and unstoppable stamina.',
      url: 'https://fitpatriot.gumroad.com/l/goovg?a=383200147',
      category: 'Fat Loss & Fitness',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Pilates Cardio Fusion',
      benefit: 'High-energy fat-burning pilates for maximum calorie burn.',
      url: 'https://steelepilatesllc.gumroad.com/l/lUYhB?a=383200147',
      category: 'Fat Loss & Fitness',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Advanced Pilates Mastery',
      benefit: 'Build lean muscle definition and advanced body control.',
      url: 'https://steelepilatesllc.gumroad.com/l/NwUUQ?a=383200147',
      category: 'Fat Loss & Fitness',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Core Strength Pilates',
      benefit: 'Build a strong, defined core with targeted pilates exercises.',
      url: 'https://steelepilatesllc.gumroad.com/l/AzdFp?a=383200147',
      category: 'Fat Loss & Fitness',
      price: null,
      currency: 'USD'
    },

    // Glow & Lifestyle
    {
      title: 'Glow Up Guide',
      benefit: 'Holistic guide to looking and feeling your absolute best.',
      url: 'https://bloombody.gumroad.com/l/GlowUp?a=383200147',
      category: 'Glow & Lifestyle',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Lyna Glow',
      benefit: 'Master the art of aesthetic wellness and beauty routines.',
      url: 'https://glowupwithlyna.gumroad.com/l/luovl?a=383200147',
      category: 'Glow & Lifestyle',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Diet Planner',
      benefit: 'Simple tool for planning your meals and tracking results.',
      url: 'https://harrisonwallace1999.gumroad.com/l/dietplanner?a=383200147',
      category: 'Glow & Lifestyle',
      price: null,
      currency: 'USD'
    },
    {
      title: 'Pro Coach',
      benefit: '1-on-1 support to reach your fitness and lifestyle goals.',
      url: 'https://harrisonwallace1999.gumroad.com/l/procoach?a=383200147',
      category: 'Glow & Lifestyle',
      price: null,
      currency: 'USD'
    }
  ];


  const categories = [
    {
      name: 'Keto & Diet',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Nutrition to fuel your transformation'
    },
    {
      name: 'Yoga & Flexibility',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      description: 'Online courses from world-class instructors'
    },
    {
      name: 'Fat Loss & Fitness',
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'Equipment and programs to maximize results'
    },
    {
      name: 'Glow & Lifestyle',
      icon: Heart,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      description: 'Wellness essentials for whole-body beauty'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#333333]">
      {/* Hero Section */}
      <section className="py-16 md:py-28 px-4 md:px-12 bg-linear-to-br from-brand-sage/10 via-white to-brand-tan/30 relative overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-72 h-72 bg-brand-sage/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-20 w-96 h-96 bg-brand-tan/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-brand-sage/10 border border-brand-sage/20">
              <ShoppingBag size={16} className="text-brand-sage" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-sage">FitFeky Shop</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-black text-[#4A4A4A] mb-6 leading-tight">
              Transform Your Body,<br />One Program at a Time
            </h1>

            <p className="text-brand-muted text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Curated courses, diet plans, and wellness protocols designed to support your unique fitness journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                to="/#welcome"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 md:py-5 bg-brand-sage text-white font-bold rounded-xl md:rounded-2xl hover:bg-brand-sage/90 transition-all hover:shadow-lg hover:scale-105 text-sm md:text-base"
              >
                Take the Quiz <ArrowRight size={18} />
              </Link>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 md:py-5 bg-white border-2 border-brand-sage text-brand-sage font-bold rounded-xl md:rounded-2xl hover:bg-brand-sage/5 transition-all text-sm md:text-base"
              >
                Explore Products
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-28 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {categories.map((category, catIndex) => {
            const categoryProducts = products.filter(p => p.category === category.name);
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-20 md:mb-28 last:mb-0"
              >
                {/* Category Header */}
                <div className="mb-10 md:mb-14 flex items-center gap-4">
                  <div className={`p-3 md:p-4 rounded-2xl ${category.bgColor} border ${category.borderColor}`}>
                    <IconComponent size={24} className={category.color} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#4A4A4A]">
                      {category.name}
                    </h2>
                    <p className="text-brand-muted text-sm md:text-base mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {categoryProducts.map((product, prodIndex) => (
                    <motion.div
                      key={product.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: prodIndex * 0.05 }}
                      viewport={{ once: true }}
                      className={`group p-6 md:p-7 rounded-2xl md:rounded-3xl border border-brand-border ${category.bgColor} hover:shadow-lg transition-all duration-300 flex flex-col`}
                    >
                      {/* Price Badge */}
                      <div className={`inline-flex items-center justify-center px-4 py-2 rounded-full ${category.bgColor} border ${category.borderColor} mb-4 self-start`}>
                        <span className={`text-xs font-bold ${category.color}`}>
                          {product.price ? `${product.currency} ${product.price}` : 'Check price'}
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-lg md:text-xl font-bold text-[#4A4A4A] mb-3 leading-snug group-hover:text-brand-sage transition-colors">
                        {product.title}
                      </h3>

                      {/* Benefit Text */}
                      <p className="text-sm md:text-base text-brand-muted mb-6 grow leading-relaxed">
                        {product.benefit}
                      </p>

                      {/* CTA Button */}
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackMetaProductClick(product.title, product.category);
                        }}
                        className={`w-full py-3 md:py-3.5 px-4 md:px-6 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                          category.name === 'Keto & Diet'
                            ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:scale-105'
                            : category.name === 'Yoga & Flexibility'
                            ? 'bg-pink-600 hover:bg-pink-700 text-white hover:shadow-lg hover:scale-105'
                            : category.name === 'Fat Loss & Fitness'
                            ? 'bg-amber-600 hover:bg-amber-700 text-white hover:shadow-lg hover:scale-105'
                            : 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow-lg hover:scale-105'
                        }`}
                      >
                        Start Now <ArrowRight size={16} />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 px-4 md:px-12 bg-brand-sage/5 border-t border-brand-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#4A4A4A] mb-6">
              Not Sure Where to Start?
            </h2>

            <p className="text-brand-muted text-lg md:text-xl mb-10 leading-relaxed">
              Take our personalized quiz to discover which program and products are perfect for your unique goals and lifestyle.
            </p>

            <Link
              to="/#welcome"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 md:py-5 bg-brand-sage text-white font-bold rounded-xl md:rounded-2xl hover:bg-brand-sage/90 transition-all hover:shadow-lg hover:scale-105 text-base md:text-lg"
            >
              Take the Quiz <ArrowRight size={20} />
            </Link>

            <p className="text-xs md:text-sm text-brand-muted mt-8 font-medium">
              Our quiz takes just 60 seconds and gives you a personalized roadmap to transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 px-4 md:px-12 bg-white border-t border-brand-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-lg md:text-xl font-bold text-[#4A4A4A] mb-3">Expert Curated</h3>
            <p className="text-sm md:text-base text-brand-muted">
              Every program is carefully selected from world-class instructors and experts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-lg md:text-xl font-bold text-[#4A4A4A] mb-3">Instant Access</h3>
            <p className="text-sm md:text-base text-brand-muted">
              Get immediate access to your courses and plans right after purchase.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-lg md:text-xl font-bold text-[#4A4A4A] mb-3">Lifetime Support</h3>
            <p className="text-sm md:text-base text-brand-muted">
              Join a community of like-minded women on the same transformation journey.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
