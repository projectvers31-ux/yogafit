import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import EmotionalMirror from '@/components/tools/EmotionalMirror';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

const multipliers: Record<ActivityLevel, { min: number; max: number }> = {
  sedentary: { min: 0.8, max: 1.0 },
  light: { min: 1.0, max: 1.2 },
  moderate: { min: 1.3, max: 1.5 },
  active: { min: 1.6, max: 1.8 },
  'very-active': { min: 1.8, max: 2.2 },
};

export default function ProteinCalculatorPage() {
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState<ActivityLevel>('moderate');

  const protein = useMemo(() => {
    const m = multipliers[activity];
    return {
      min: Math.round(weight * m.min),
      max: Math.round(weight * m.max),
    };
  }, [weight, activity]);

  const calculatorModule = (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Flame size={22} className="text-brand-sage" />
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Your Protein Target</h2>
        <p className="text-xs text-brand-muted mt-1">Based on weight and activity</p>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Weight (kg)</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={30}
            max={200}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="flex-1 accent-brand-sage h-1.5"
          />
          <span className="text-sm font-bold text-brand-ink w-12 text-right">{weight}</span>
        </div>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Activity Level</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['sedentary', 'light', 'moderate', 'active', 'very-active'] as ActivityLevel[]).map((a) => (
            <button
              key={a}
              onClick={() => setActivity(a)}
              className={`py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all border ${activity === a ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30'}`}
            >
              {a.replace('-', '\n')}
            </button>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-brand-muted/50 text-center pt-2">Results update automatically.</p>
    </div>
  );

  const resultsModule = (
    <div className="animate-fadeIn bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
      <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Daily Protein Target</p>
        <p className="text-4xl font-serif text-brand-sage font-bold">{protein.min} - {protein.max} g</p>
      </div>
      <div className="bg-brand-warm rounded-xl p-4 mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 text-center mb-2">Protein Per Meal (3 meals)</p>
        <div className="grid grid-cols-2 gap-2 text-center">
          {[
            { label: 'Min per meal', value: Math.round(protein.min / 3) },
            { label: 'Max per meal', value: Math.round(protein.max / 3) },
          ].map((m) => (
            <div key={m.label} className="bg-white rounded-lg p-2">
              <p className="text-[10px] text-brand-muted">{m.label}</p>
              <p className="text-sm font-bold text-brand-ink">{m.value}g</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
        <p>Protein is the most important macro during weight loss or muscle building. For a complete breakdown of all macros, use our <Link to="/nutrition-calculator" className="text-brand-sage underline hover:no-underline">nutrition calculator</Link>.</p>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>Protein supports muscle repair, hormone production, immune function, and appetite control. For women, getting enough protein is especially helpful during fat loss because it helps preserve lean mass while you are in a calorie deficit.</p>
      <p>A lot of women eat less protein than they think. This calculator gives you a daily range instead of a single number so you can adjust based on appetite, meal timing, and your activity level.</p>
      <p>To build the rest of your plan, compare this result with the <Link to="/nutrition-calculator" className="text-brand-sage underline hover:no-underline">nutrition calculator</Link> and <Link to="/calorie-calculator" className="text-brand-sage underline hover:no-underline">calorie calculator</Link>. If you want to see how protein fits into your full body-composition picture, try the <Link to="/body-fat-calculator" className="text-brand-sage underline hover:no-underline">body fat calculator</Link>.</p>
      <p>Recommended reading: <Link to="/blog/intermittent-fasting-beginners" className="text-brand-sage underline hover:no-underline">Intermittent Fasting for Beginners</Link> and <Link to="/blog/not-losing-weight-diet-exercise" className="text-brand-sage underline hover:no-underline">Why You’re Not Losing Weight Even Though You Diet and Exercise</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Protein Calculator — Optimal Daily Protein for Women | FitFeky',
        description: 'Calculate your daily protein grams based on weight and activity level. Preserve muscle and stay full with a free protein calculator.',
        canonicalPath: '/protein-calculator',
        h1: 'Protein Calculator for Women — Know Your Exact Daily Target',
        intro: 'Get a personalized protein range that fits your body, your activity level, and your goal.',
        keywords: ['protein calculator', 'daily protein intake calculator', 'how much protein should i eat', 'protein calculator women'],
        ogImage: '/og/calculators/protein-calculator.png',
      }}
      emotionalMirror={
        <EmotionalMirror
          items={[
            "You're not sure if you're eating enough protein",
            "You've heard conflicting numbers about how much you need",
            'You want a target that is simple and realistic to hit',
          ]}
        />
      }
      currentTool="Protein Calculator"
      blogArticle={{ slug: 'intermittent-fasting-beginners', title: 'Intermittent Fasting for Beginners: A Complete Guide for Women', label: 'Understanding your protein needs' }}
      productCards={[
        { id: 'optimum-nutrition-gold-standard-100-whey-protein', context: 'Premium whey protein to help you hit your daily target', position: 'after-results' },
        { id: 'garden-of-life-sport-organic-plant-based-protein-v', context: 'Plant-based protein powder for women who prefer vegan options', position: 'below-bmi' },
      ]}
      smartCta={{ tool: 'protein', category: activity, userValue: protein.min }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="How Much Protein Do Women Actually Need?"
      ctaTopic="Protein"
      faqs={[
        { q: 'How much protein does a woman need per day?', a: 'For a sedentary woman, 0.8 to 1.0 grams per kilogram may be enough. For active women or anyone trying to lose weight, 1.6 to 2.0 grams per kilogram is a stronger target.' },
        { q: 'Can protein help with weight loss?', a: 'Yes. Protein keeps you fuller for longer and helps preserve muscle during a calorie deficit.' },
        { q: 'Do women need more protein as they age?', a: 'Yes. After age 30, muscle loss gradually increases, so higher protein intake becomes more important.' },
        { q: 'Can I get enough protein on a plant-based diet?', a: 'Yes, but you need to be intentional and may need the higher end of your protein range.' },
        { q: 'Is there such a thing as too much protein?', a: 'For healthy women, very high intakes are generally safe, but it is best to stay within a realistic range rather than pushing protein far beyond what your body needs.' },
      ]}
    />
  );
}
