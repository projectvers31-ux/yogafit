import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-pink/30 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            Our Mission
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-brand-ink mb-6">Empowering Women Through <span className="text-brand-sage italic">Yoga</span></h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
            At FitFeky, we believe that fitness should be a celebration of what your body can do, not a punishment for what you ate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Heart,
              title: "Simple Plans",
              text: "We strip away the complexity of traditional fitness, giving you 15-minute routines that fit into any schedule."
            },
            {
              icon: Sparkles,
              title: "Women First",
              text: "Our methods are designed specifically for female physiology, hormones, and lifestyle needs."
            },
            {
              icon: Target,
              title: "Real Results",
              text: "No fluff, no fads. Just science-backed yoga and movement that helps you feel confident and strong."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-brand-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-brand-pink rounded-2xl flex items-center justify-center text-brand-accent mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-ink mb-3">{item.title}</h3>
              <p className="text-brand-muted leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-brand-lavender/50 rounded-[3rem] p-12 md:p-20 text-center border border-brand-border"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-brand-ink mb-8">Ready to start your journey?</h2>
          <p className="text-lg text-brand-muted mb-10 max-w-xl mx-auto">
            Join 50,000+ women who have already discovered their perfect plan. It only takes 60 seconds.
          </p>
          <a 
            href="/"
            className="inline-flex items-center justify-center bg-brand-sage text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-sage/90 hover:-translate-y-1 transition-all shadow-xl shadow-brand-sage/20"
          >
            Take the Quiz
          </a>
        </motion.div>
      </div>
    </div>
  );
}
