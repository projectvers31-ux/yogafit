import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import EmotionalMirror from '@/components/tools/EmotionalMirror';

function bmiBasedBF(bmi: number, age: number, isFemale: boolean): number {
  const sex = isFemale ? 0 : 1;
  return Math.round((1.2 * bmi + 0.23 * age - 16.2 - 10.8 * sex) * 10) / 10;
}

const bodyFatCategories = [
  { min: 10, max: 14, label: 'Essential Fat', color: 'text-rose-500' },
  { min: 14, max: 20, label: 'Athlete', color: 'text-brand-sage' },
  { min: 20, max: 24, label: 'Fit', color: 'text-brand-gold' },
  { min: 24, max: 31, label: 'Acceptable', color: 'text-brand-sand' },
  { min: 31, max: 60, label: 'Overweight Range', color: 'text-rose-400' },
];

export default function BodyFatCalculatorPage() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(165);
  const [age, setAge] = useState(30);

  const result = useMemo(() => {
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);
    const bf = bmiBasedBF(bmi, age, true);
    const category = bodyFatCategories.find((c) => bf >= c.min && bf < c.max) || bodyFatCategories[bodyFatCategories.length - 1];
    return { bmi: Math.round(bmi * 10) / 10, bf, category };
  }, [weight, height, age]);

  const calculatorModule = (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a9c8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Your Body Fat</h2>
        <p className="text-xs text-brand-muted mt-1">Estimate based on BMI and age</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Weight</label>
          <input
            type="number"
            min={20}
            max={350}
            step={0.1}
            value={weight}
            onChange={(e) => setWeight(Math.max(20, Math.min(350, Number(e.target.value) || 20)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-3 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Height</label>
          <input
            type="number"
            min={50}
            max={300}
            value={height}
            onChange={(e) => setHeight(Math.max(50, Math.min(300, Number(e.target.value) || 50)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-3 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Age</label>
          <input
            type="number"
            min={10}
            max={100}
            value={age}
            onChange={(e) => setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-3 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
          />
        </div>
      </div>
      <p className="text-[10px] text-brand-muted/50 text-center pt-2">Results update automatically.</p>
    </div>
  );

  const resultsModule = (
    <div className="animate-fadeIn bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
      <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Estimated Body Fat</p>
        <p className="text-4xl font-serif text-brand-sage font-bold">{result.bf}%</p>
        <p className={`text-[11px] font-bold mt-1 ${result.category.color}`}>{result.category.label}</p>
      </div>
      <div className="text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Your BMI</p>
        <p className="text-xl font-serif text-brand-ink">{result.bmi}</p>
      </div>
      <div className="space-y-1.5 mb-4">
        {bodyFatCategories.map((c) => (
          <div key={c.label} className={`flex justify-between items-center px-3 py-2 rounded-lg text-xs ${result.category.label === c.label ? 'bg-brand-sage/10 border border-brand-sage/20' : ''}`}>
            <span className={`${c.color} font-medium`}>{c.label}</span>
            <span className="text-brand-muted">{c.min}% - {c.max === 60 ? '60%+' : `${c.max}%`}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
        <p>Body fat percentage is a better health marker than weight alone. For a more complete picture, compare this with the <Link to="/ideal-weight-calculator" className="text-brand-sage underline hover:no-underline">ideal weight calculator</Link> and <Link to="/bmi-calculator" className="text-brand-sage underline hover:no-underline">BMI calculator</Link>.</p>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>Body fat percentage is the proportion of your total weight that comes from fat rather than muscle, bone, and water. It is more useful than the scale alone because two women can weigh the same and have very different body compositions.</p>
      <p>Women need more essential body fat than men for hormone health and reproductive function. The athletic, fit, and acceptable ranges are all normal, but the best range depends on your goals, energy, and how you feel day to day.</p>
      <p>For the full picture, compare this result with the <Link to="/ideal-weight-calculator" className="text-brand-sage underline hover:no-underline">ideal weight calculator</Link> and <Link to="/nutrition-calculator" className="text-brand-sage underline hover:no-underline">nutrition calculator</Link>. The <Link to="/bmi-calculator" className="text-brand-sage underline hover:no-underline">BMI calculator</Link> is another quick screening tool to use alongside this one.</p>
      <p>Recommended reading: <Link to="/blog/lose-belly-fat-yoga" className="text-brand-sage underline hover:no-underline">How to Lose Belly Fat in 2 Weeks with Yoga</Link> and <Link to="/blog/yoga-weight-loss-women-40" className="text-brand-sage underline hover:no-underline">Yoga for Weight Loss: Complete Guide for Women Over 40</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Body Fat Calculator — Estimate Your Body Fat Percentage Free | FitFeky',
        description: 'Calculate your body fat percentage with a free calculator for women. See categories from essential to overweight and get practical next steps.',
        canonicalPath: '/body-fat-calculator',
        h1: 'Body Fat Calculator — Estimate Your Body Fat Percentage',
        intro: 'Use your weight, height, and age to estimate body fat percentage and see how your result compares with healthy categories.',
        keywords: ['body fat calculator', 'body fat percentage calculator', 'body fat women', 'how to calculate body fat'],
        ogImage: '/og/calculators/body-fat-calculator.png',
      }}
      emotionalMirror={
        <EmotionalMirror
          items={[
            "You've been avoiding the scale or obsessing over it",
            "You're unsure whether your weight is actually a problem",
            'You want a clear answer without guessing',
          ]}
        />
      }
      currentTool="Body Fat"
      blogArticle={{ slug: 'lose-belly-fat-yoga', title: 'How to Lose Belly Fat in 2 Weeks with Yoga: A Realistic Plan for Women', label: 'Understanding your body composition' }}
      smartCta={{ tool: 'body-fat', category: result.category.label, userValue: result.bmi }}
      productCards={[
        { id: 'renpho-smart-scale-for-body-weight-bluetooth-13-me', context: 'Get a more complete body composition reading at home', position: 'below-bmi' },
      ]}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Is Body Fat Percentage and Why Does It Matter?"
      ctaTopic="Body Fat"
      faqs={[
        { q: 'What is a healthy body fat percentage for a woman?', a: 'A healthy body fat percentage for women usually ranges from about 20 to 31 percent. The best range depends on your age, goals, and activity level.' },
        { q: 'How accurate is the BMI-based body fat calculation?', a: 'This method is an estimate, not a scan. It is useful for screening, but DEXA scans and body composition scales are more precise.' },
        { q: 'Why do women have higher body fat than men?', a: 'Women require more essential body fat for hormones, fertility, and general health.' },
        { q: 'Can I lower my body fat without losing weight?', a: 'Yes. Body recomposition happens when you lose fat and gain muscle at the same time, so the scale may not move much even though your shape changes.' },
        { q: 'Does age affect body fat percentage?', a: 'Yes. Body fat tends to increase with age as muscle mass naturally declines, which is why strength training and protein intake matter more over time.' },
      ]}
    />
  );
}
