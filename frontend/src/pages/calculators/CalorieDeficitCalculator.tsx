import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import { Target, AlertTriangle } from 'lucide-react';

export default function CalorieDeficitCalculator() {
  const [tdee, setTdee] = useState(2100);
  const [deficit, setDeficit] = useState(500);

  const results = useMemo(() => {
    const daily = tdee - deficit;
    const weeklyLoss = deficit * 7 / 7700;
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
        <h2 className="text-xl font-serif text-brand-ink">Your Calorie Deficit</h2>
        <p className="text-xs text-brand-muted mt-1">Not sure of your TDEE? Use our <Link to="/calculators/tdee-calculator" className="text-brand-sage underline hover:no-underline">TDEE calculator</Link> first.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Your TDEE (total daily calories)</label>
          <input type="number" min={1200} max={4000} value={tdee}
            onChange={e => setTdee(Math.max(1200, Math.min(4000, Number(e.target.value) || 1200)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Deficit per day</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[250, 500, 1000].map(d => (
              <button key={d} onClick={() => setDeficit(d)}
                className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${deficit === d ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30'}`}>
                {d} cal
              </button>
            ))}
          </div>
          <p className="text-[10px] text-brand-muted/50 mt-1.5">
            {deficit === 250 && 'Mild — slow, sustainable loss'}
            {deficit === 500 && 'Moderate — ~0.5 kg per week'}
            {deficit === 1000 && 'Aggressive — ~1 kg per week, not for everyone'}
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
            <p>This deficit brings you below 1200 calories, which can slow metabolism and cause muscle loss. Consider a smaller deficit.</p>
          </div>
        )}
        <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
          <p>A 500-calorie deficit is considered safe and sustainable for most women. Pair your deficit with the right macros using our <Link to="/calculators/macro-calculator" className="text-brand-sage underline hover:no-underline">macro calculator</Link>.</p>
        </div>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>A calorie deficit is simply eating fewer calories than your body burns. When this happens, your body turns to stored fat for energy, leading to weight loss. It is the fundamental mechanism behind every successful weight management plan — regardless of which diet or fitness approach you follow.</p>
      <p>For women, the right deficit size matters more than for men because of hormonal sensitivity. A deficit that is too large can disrupt thyroid function, increase cortisol, and signal the body to preserve fat rather than burn it. This is why crash diets often backfire — they create metabolic adaptation that makes long-term weight loss harder. A moderate deficit of 300 to 500 calories preserves muscle mass and keeps your metabolism running smoothly.</p>
      <p>The safest approach is to calculate your TDEE first, then subtract a moderate deficit. Your results here show you exactly what that looks like for your body. For more on how to structure meals during a deficit, see our <Link to="/calculators/macro-calculator" className="text-brand-sage underline hover:no-underline">macro calculator</Link> for daily protein, carb, and fat targets.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Calorie Deficit Calculator for Women | FitFeky',
        description: 'Calculate your calorie deficit for weight loss. Free calculator for women — find the right daily intake to lose fat without slowing your metabolism.',
        canonicalPath: '/calculators/calorie-deficit-calculator',
        h1: 'Calorie Deficit Calculator for Women – Lose Weight Safely',
        intro: 'A calorie deficit is the most reliable path to weight loss. This calculator tells you exactly how many calories to eat each day to create a safe, effective deficit based on your total daily energy expenditure.\n\nChoose your deficit size — mild, moderate, or aggressive — and see your daily calorie target, estimated weekly weight loss, and whether your deficit stays above the safe minimum of 1,200 calories.\n\nFor best results, pair your deficit with a balanced macro split from our macro calculator.',
      }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Is a Calorie Deficit and How Does It Work for Women?"
      ctaTopic="Calorie Deficit"
      faqs={[
        { q: 'How much of a calorie deficit do I need to lose weight?', a: 'A deficit of 300 to 500 calories per day is considered safe and sustainable for most women. This leads to about 0.5 kg of fat loss per week. A 1,000-calorie deficit is more aggressive and should only be attempted short-term with proper nutrition.' },
        { q: 'What is the minimum calorie intake for a woman?', a: 'Most health guidelines recommend that women do not go below 1,200 calories per day without medical supervision. Eating below this can slow your metabolism, disrupt hormone balance, and lead to muscle loss. Your calculator result will warn you if your deficit goes below this threshold.' },
        { q: 'Can I lose weight without counting calories?', a: 'Yes, but tracking gives you accuracy. Many women find that counting calories for 2 to 4 weeks helps them understand portion sizes and food density. After that, intuitive eating becomes easier because you have built awareness. The deficit principle still applies either way.' },
        { q: 'How is calorie deficit different from TDEE?', a: 'TDEE is your total daily energy expenditure — everything your body burns in a day. A calorie deficit is eating below that number. So your TDEE tells you where you are, and the deficit tells you where to go. Use our TDEE calculator to find your baseline.' },
        { q: 'Does exercise increase my calorie deficit?', a: 'Yes. Exercise increases your TDEE, which means you can eat more while still maintaining a deficit. This is why combining nutrition with movement like yoga or strength training is more effective than diet alone. The deficit stays the same, but your food allowance grows.' },
      ]}
    />
  );
}
