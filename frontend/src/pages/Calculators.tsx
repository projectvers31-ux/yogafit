import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Calculator, Droplets, Flame, Heart, Scale, Target, Utensils, Zap } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';

const primaryCalculators = [
  {
    icon: Target,
    title: 'Calorie Calculator',
    desc: 'Find the daily calorie target you need for safe, sustainable weight loss.',
    path: '/calorie-calculator',
    color: 'text-brand-rose',
    bg: 'bg-brand-rose/10',
  },
  {
    icon: Scale,
    title: 'BMI Calculator',
    desc: 'Check your body mass index and see what the number actually means.',
    path: '/bmi-calculator',
    color: 'text-brand-sage',
    bg: 'bg-brand-sage/10',
  },
  {
    icon: Utensils,
    title: 'Nutrition Calculator',
    desc: 'Get personalized protein, carb, and fat targets for your goals.',
    path: '/nutrition-calculator',
    color: 'text-brand-gold',
    bg: 'bg-brand-gold/10',
  },
  {
    icon: Scale,
    title: 'Ideal Weight Calculator',
    desc: 'See your healthy weight range using science-backed formulas.',
    path: '/ideal-weight-calculator',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    icon: Activity,
    title: 'Body Fat Calculator',
    desc: 'Estimate your body fat percentage and compare healthy categories.',
    path: '/body-fat-calculator',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Flame,
    title: 'Protein Calculator',
    desc: 'Calculate the protein grams you need to preserve muscle and stay full.',
    path: '/protein-calculator',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
];

const additionalCalculators = [
  {
    icon: Calculator,
    title: 'TDEE Calculator',
    desc: 'Find your total daily energy expenditure and maintenance calories.',
    path: '/calculators/tdee-calculator',
  },
  {
    icon: Heart,
    title: 'BMR Calculator',
    desc: 'Calculate the calories your body burns at complete rest.',
    path: '/calculators/bmr-calculator',
  },
  {
    icon: Droplets,
    title: 'Water Intake Calculator',
    desc: 'Find your daily hydration target based on your body and activity.',
    path: '/calculators/water-intake-calculator',
  },
];

export default function Calculators() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans pt-24 md:pt-28">
      <SEOHelmet
        title="Fitness Calculators for Women — BMI, Calorie, Nutrition & More | FitFeky"
        description="Use our free calculator hub to find your calorie target, BMI, nutrition macros, ideal weight, body fat, protein needs, and more. No signup required."
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
              Start with the six calculators below to build a better nutrition and fitness plan. Each page is built for search and designed to answer one question well.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {primaryCalculators.map((calc, i) => (
              <div
                key={calc.title}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.05}s` }}
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
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl md:text-2xl font-serif text-brand-ink">More calculators</h2>
                <p className="text-sm text-brand-muted mt-1">Useful supporting tools that pair well with the main SEO pages.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {additionalCalculators.map((calc) => (
                <Link
                  key={calc.title}
                  to={calc.path}
                  className="group bg-white border border-brand-border/30 rounded-2xl p-5 hover:border-brand-sage/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-brand-bone flex items-center justify-center shrink-0 group-hover:bg-brand-sage/10 transition-colors">
                      <calc.icon size={20} className="text-brand-sage" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-brand-ink group-hover:text-brand-sage transition-colors mb-1">
                        {calc.title}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed">{calc.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-brand-muted/60 max-w-md mx-auto leading-relaxed">
              These calculators provide estimates based on population averages. Always consult a healthcare professional before making significant changes to your diet or exercise routine.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 mt-6 text-brand-sage border border-brand-sage/30 bg-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-brand-sage/5 transition-all">
              Take the Quiz <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
