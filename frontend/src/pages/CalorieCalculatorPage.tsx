import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Target } from 'lucide-react';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import EmotionalMirror from '@/components/tools/EmotionalMirror';

export default function CalorieCalculatorPage() {
  const [tdee, setTdee] = useState(2100);
  const [deficit, setDeficit] = useState(500);

  const results = useMemo(() => {
    const daily = tdee - deficit;
    const weeklyLoss = (deficit * 7) / 7700;
    return {
      dailyIntake: Math.max(daily, 1200),
      weeklyLossKg: Math.round(weeklyLoss * 100) / 100,
      isBelowSafe: daily < 1200,
    };
  }, [tdee, deficit]);

  const calculatorModule = (
    <>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Target size={22} className="text-brand-sage" />
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Your Calorie Target</h2>
        <p className="text-xs text-brand-muted mt-1">Not sure of your TDEE? Use our <Link to="/calculators/tdee-calculator" className="text-brand-sage underline hover:no-underline">TDEE calculator</Link> first.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Your TDEE (total daily calories)</label>
          <input
            type="number"
            min={1200}
            max={4000}
            value={tdee}
            onChange={(e) => setTdee(Math.max(1200, Math.min(4000, Number(e.target.value) || 1200)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Deficit per day</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[250, 500, 1000].map((d) => (
              <button
                key={d}
                onClick={() => setDeficit(d)}
                className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${deficit === d ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30'}`}
              >
                {d} cal
              </button>
            ))}
          </div>
          <p className="text-[10px] text-brand-muted/50 mt-1.5">
            {deficit === 250 && 'Mild - slow, sustainable loss'}
            {deficit === 500 && 'Moderate - about 0.5 kg per week'}
            {deficit === 1000 && 'Aggressive - about 1 kg per week, not for everyone'}
          </p>
        </div>
        <p className="text-[10px] text-brand-muted/50 text-center pt-2">Results update automatically.</p>
      </div>
    </>
  );

  const resultsModule = (
    <div className="animate-fadeIn space-y-3">
      <div className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
        <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Daily Calories for Weight Loss</p>
          <p className="text-4xl font-serif text-brand-sage font-bold">{results.dailyIntake.toLocaleString()}</p>
          <p className="text-[10px] text-brand-muted/50 mt-1">calories per day</p>
        </div>
        <div className="bg-brand-warm rounded-xl p-4 text-center mb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Estimated Weekly Loss</p>
          <p className="text-xl font-serif text-brand-ink font-bold">{results.weeklyLossKg.toFixed(2)} kg</p>
        </div>
        {results.isBelowSafe && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
            <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-500" />
            <p>This deficit brings you below 1200 calories. Consider a smaller deficit to protect energy, hormones, and muscle mass.</p>
          </div>
        )}
        <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
          <p>A 500-calorie deficit is considered safe and sustainable for most women. Pair your deficit with the right macros using our <Link to="/nutrition-calculator" className="text-brand-sage underline hover:no-underline">nutrition calculator</Link> and <Link to="/protein-calculator" className="text-brand-sage underline hover:no-underline">protein calculator</Link>.</p>
        </div>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>A calorie calculator helps you turn guesswork into a simple number you can actually follow. Once you know your daily energy needs, you can choose the size of your deficit and understand how much weight loss is realistic each week.</p>
      <p>For women, the sweet spot is usually a moderate deficit. Eat too little and your energy, hormones, and training performance can suffer. Eat too much and progress slows. The goal is sustainable fat loss, not a crash diet.</p>
      <p>To build a complete plan, compare this result with the <Link to="/nutrition-calculator" className="text-brand-sage underline hover:no-underline">nutrition calculator</Link> and <Link to="/protein-calculator" className="text-brand-sage underline hover:no-underline">protein calculator</Link>. For a broader health check, try the <Link to="/body-fat-calculator" className="text-brand-sage underline hover:no-underline">body fat calculator</Link>.</p>
      <p>Recommended reading: <Link to="/blog/weight-loss-busy-moms" className="text-brand-sage underline hover:no-underline">Weight Loss Tips for Busy Moms Who Have No Time</Link> and <Link to="/blog/best-diet-plan-weight-loss-women" className="text-brand-sage underline hover:no-underline">Best Diet Plan for Weight Loss for Women</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Calorie Calculator — Safe Daily Deficit for Weight Loss | FitFeky',
        description: 'Set a safe calorie deficit and see your daily calorie target for weight loss. Free calculator for women with instant results.',
        canonicalPath: '/calorie-calculator',
        h1: 'Calorie Calculator for Women — Find Your Weight Loss Target',
        intro: 'Use your TDEE and choose a deficit to see the daily calorie target that fits your weight loss goal.',
        keywords: ['calorie calculator', 'calorie deficit calculator', 'how many calories should i eat', 'weight loss calorie calculator'],
        ogImage: '/og/calculators/calorie-deficit-calculator.png',
      }}
      emotionalMirror={
        <EmotionalMirror
          items={[
            "You've tried diets before but the numbers never felt clear",
            "You're tired of conflicting calorie advice online",
            'You want one target that matches your body and your goal',
          ]}
        />
      }
      currentTool="Calorie Calculator"
      blogArticle={{ slug: 'weight-loss-busy-moms', title: 'Weight Loss Tips for Busy Moms Who Have No Time', label: 'Understanding your calorie target' }}
      smartCta={{ tool: 'calorie-deficit', category: 'weight-loss', userValue: results.dailyIntake }}
      productCards={[
        { id: 'etekcity-food-kitchen-scale-digital-grams-and-ounc', context: 'Accurate portion tracking makes hitting your target easier', position: 'after-results' },
      ]}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Is a Calorie Deficit and How Does It Work for Women?"
      ctaTopic="Calorie"
      faqs={[
        { q: 'How much of a calorie deficit do I need to lose weight?', a: 'A deficit of 300 to 500 calories per day is considered safe and sustainable for most women. That usually leads to about 0.25 to 0.5 kg of fat loss per week.' },
        { q: 'What is the minimum calorie intake for a woman?', a: 'Most health guidelines recommend that women do not go below 1,200 calories per day without medical supervision. Eating below this can slow metabolism and affect hormones.' },
        { q: 'Can I lose weight without counting calories?', a: 'Yes, but tracking gives you accuracy. Many women track calories for a few weeks to learn portions and food density, then switch to a more intuitive approach.' },
        { q: 'How is calorie deficit different from TDEE?', a: 'TDEE is how many calories your body burns in a day. A calorie deficit is eating below that number. Use the TDEE calculator first, then subtract a deficit.' },
        { q: 'Does exercise increase my calorie deficit?', a: 'Yes. Exercise increases your calorie burn, which means you can eat a bit more and still stay in a deficit. That is why nutrition plus movement works so well.' },
      ]}
    />
  );
}
