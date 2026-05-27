import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Calculator, Target, Utensils, Droplets, Flame } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';

const calculators = [
  {
    icon: Calculator,
    title: 'TDEE Calculator',
    desc: 'Find your total daily energy expenditure — the exact calories your body burns with your activity level included.',
    path: '/calculators/tdee-calculator',
    color: 'text-brand-sage',
    bg: 'bg-brand-sage/10',
  },
  {
    icon: Heart,
    title: 'BMR Calculator',
    desc: 'Calculate your basal metabolic rate — the calories your body burns at complete rest, the foundation of every nutrition plan.',
    path: '/calculators/bmr-calculator',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: Target,
    title: 'Calorie Deficit Calculator',
    desc: 'Set a safe calorie deficit for weight loss. Choose mild, moderate, or aggressive and see your daily target and weekly loss.',
    path: '/calculators/calorie-deficit-calculator',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Utensils,
    title: 'Macro Calculator',
    desc: 'Get your personalized protein, carb, and fat targets for weight loss, maintenance, or muscle tone.',
    path: '/calculators/macro-calculator',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Target,
    title: 'Ideal Weight Calculator',
    desc: 'See your healthy weight range using Devine, Robinson, Miller, and Hamwi formulas plus BMI range.',
    path: '/calculators/ideal-weight-calculator',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    icon: Target,
    title: 'Body Fat Calculator',
    desc: 'Estimate your body fat percentage with categories from essential to overweight. A better health marker than weight alone.',
    path: '/calculators/body-fat-calculator',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Droplets,
    title: 'Water Intake Calculator',
    desc: 'Find your daily water target based on weight, activity, climate, and breastfeeding.',
    path: '/calculators/water-intake-calculator',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Flame,
    title: 'Protein Calculator',
    desc: 'Calculate your optimal daily protein grams based on weight and activity level. Preserve muscle and stay full.',
    path: '/calculators/protein-calculator',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
];

export default function Calculators() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans pt-24 md:pt-28">
      <SEOHelmet
        title="Free Fitness Calculators for Women | FitFeky"
        description="Free fitness and nutrition calculators for women — TDEE, BMR, calorie deficit, macros, ideal weight, body fat, water intake, and protein. All free, no signup."
        canonicalPath="/calculators"
      />
      <section className="px-4 md:px-12 pb-12 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
              Free Tools
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-brand-ink leading-tight mb-4">
              Fitness Calculators for Women
            </h1>
            <p className="text-sm md:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Science-backed calculators designed for women. No signup, no fluff — just accurate numbers to guide your nutrition and fitness.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calculators.map((calc, i) => (
              <motion.div
                key={calc.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  to={calc.path}
                  className="group flex items-start gap-4 bg-white border border-brand-border/30 rounded-2xl p-5 hover:border-brand-sage/30 hover:shadow-md hover:shadow-brand-sage/5 transition-all"
                >
                  <div className={`w-12 h-12 shrink-0 ${calc.bg} ${calc.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <calc.icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-brand-ink group-hover:text-brand-sage transition-colors mb-1">
                      {calc.title}
                    </h2>
                    <p className="text-xs text-brand-muted leading-relaxed">{calc.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-xs text-brand-muted/60 max-w-md mx-auto leading-relaxed">
              These calculators provide estimates based on population averages. Always consult a healthcare professional before making significant changes to your diet or exercise routine.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
