import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import { Flame } from 'lucide-react';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

const multipliers: Record<ActivityLevel, { min: number; max: number }> = {
  sedentary: { min: 0.8, max: 1.0 },
  light: { min: 1.0, max: 1.2 },
  moderate: { min: 1.3, max: 1.5 },
  active: { min: 1.6, max: 1.8 },
  'very-active': { min: 1.8, max: 2.2 },
};

export default function ProteinCalculator() {
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
          <input type="range" min={30} max={200} value={weight} onChange={e => setWeight(Number(e.target.value))}
            className="flex-1 accent-brand-sage h-1.5" />
          <span className="text-sm font-bold text-brand-ink w-12 text-right">{weight}</span>
        </div>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Activity Level</label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['sedentary', 'light', 'moderate', 'active', 'very-active'] as ActivityLevel[]).map(a => (
            <button key={a} onClick={() => setActivity(a)}
              className={`py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all border ${activity === a ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30'}`}>
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
        <p className="text-4xl font-serif text-brand-sage font-bold">{protein.min} – {protein.max} g</p>
      </div>
      <div className="bg-brand-warm rounded-xl p-4 mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 text-center mb-2">Protein Per Meal (3 meals)</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: 'Min per meal', value: Math.round(protein.min / 3) },
            { label: 'Max per meal', value: Math.round(protein.max / 3) },
          ].map(m => (
            <div key={m.label} className="bg-white rounded-lg p-2">
              <p className="text-[10px] text-brand-muted">{m.label}</p>
              <p className="text-sm font-bold text-brand-ink">{m.value}g</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
        <p>Protein is the most important macro during weight loss or muscle building. For a complete breakdown of all macros including carbs and fat, use our <Link to="/calculators/macro-calculator" className="text-brand-sage underline hover:no-underline">macro calculator</Link>.</p>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>Protein is the building block of every cell in your body. It is essential for muscle repair, enzyme production, hormone balance, immune function, and even healthy hair and skin. For women, adequate protein intake becomes increasingly important with age, as muscle mass naturally declines after 30 and accelerates after menopause.</p>
      <p>Most women do not eat enough protein. The standard recommendation of 0.8 grams per kilogram is the minimum to prevent deficiency, not an optimal intake for health or body composition. For active women, women over 40, and women in a calorie deficit, protein needs are significantly higher — between 1.6 and 2.0 grams per kilogram. This calculator adjusts your target based on your activity level so you get an optimal, not a minimum, recommendation.</p>
      <p>Distributing protein evenly across meals — at least 25 to 35 grams per meal — maximizes muscle protein synthesis. This is more effective than eating most of your protein at dinner. For a full macro breakdown including carbs and fat to complement your protein target, use our <Link to="/calculators/macro-calculator" className="text-brand-sage underline hover:no-underline">macro calculator</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Protein Calculator for Women | FitFeky',
        description: 'Calculate your daily protein needs as a woman. Free protein intake calculator based on weight and activity level — optimal targets for health, weight loss, and muscle.',
        canonicalPath: '/calculators/protein-calculator',
        h1: 'Protein Calculator for Women – Daily Protein Needs',
        intro: 'Protein is the single most important nutrient for weight loss, muscle preservation, and long-term health. This protein calculator tells you exactly how many grams of protein you need each day based on your body weight and activity level.\n\nThe standard recommendation of 0.8 g per kg is the minimum to prevent deficiency. This calculator gives you an optimal range based on your lifestyle — from sedentary all the way to very active.\n\nFor a complete macro picture including carbs and fat, pair this with our macro calculator.',
      }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="How Much Protein Do Women Actually Need?"
      ctaTopic="Protein"
      faqs={[
        { q: 'How much protein does a woman need per day?', a: 'For a sedentary woman, 0.8 to 1.0 grams per kilogram of body weight is adequate. For an active woman or anyone trying to lose weight, 1.6 to 2.0 grams per kilogram is optimal. At 70 kg, that is 112 to 140 grams daily.' },
        { q: 'Can protein help with weight loss?', a: 'Yes. Protein is the most satiating macronutrient — it keeps you full longer than carbs or fat. It also has the highest thermic effect, meaning your body burns more calories digesting it. Most importantly, it preserves muscle during a calorie deficit.' },
        { q: 'Do women need more protein as they age?', a: 'Yes. After age 30, women lose 3 to 5 percent of muscle mass per decade. This accelerates after menopause. Higher protein intake, combined with strength training, is the most effective way to slow this loss and maintain metabolic rate.' },
        { q: 'Can I get enough protein on a plant-based diet?', a: 'Yes, but you need to be intentional. Plant proteins are less bioavailable than animal proteins, so aim for the higher end of your range. Combine complementary proteins like rice and beans, and consider a plant-based protein powder.' },
        { q: 'Is there such a thing as too much protein?', a: 'For healthy women, protein intakes up to 2.5 g per kg are generally safe. Excess protein is simply used for energy or stored as fat. Very high intakes (above 3 g per kg long-term) may stress the kidneys, so stay within your calculated range.' },
      ]}
    />
  );
}
