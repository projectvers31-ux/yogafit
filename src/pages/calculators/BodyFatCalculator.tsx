import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';

function bmiBasedBF(bmi: number, age: number, isFemale: boolean): number {
  const sex = isFemale ? 0 : 1;
  return Math.round((1.20 * bmi + 0.23 * age - 16.2 - 10.8 * sex) * 10) / 10;
}

const bodyFatCategories = [
  { min: 10, max: 14, label: 'Essential Fat', color: 'text-rose-500' },
  { min: 14, max: 20, label: 'Athlete', color: 'text-brand-sage' },
  { min: 20, max: 24, label: 'Fit', color: 'text-brand-gold' },
  { min: 24, max: 31, label: 'Acceptable', color: 'text-brand-sand' },
  { min: 31, max: 60, label: 'Overweight Range', color: 'text-rose-400' },
];

export default function BodyFatCalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(165);
  const [age, setAge] = useState(30);

  const result = useMemo(() => {
    const h = height / 100;
    const bmi = weight / (h * h);
    const bf = bmiBasedBF(bmi, age, true);
    const cat = bodyFatCategories.find(c => bf >= c.min && bf < c.max) || bodyFatCategories[bodyFatCategories.length - 1];
    return { bmi: Math.round(bmi * 10) / 10, bf, category: cat };
  }, [weight, height, age]);

  const calculatorModule = (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a9c8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Your Body Fat</h2>
        <p className="text-xs text-brand-muted mt-1">Estimate based on BMI and age</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Weight</label>
          <input type="number" min={20} max={350} step={0.1} value={weight} onChange={e => setWeight(Math.max(20, Math.min(350, Number(e.target.value) || 20)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-3 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Height</label>
          <input type="number" min={50} max={300} value={height} onChange={e => setHeight(Math.max(50, Math.min(300, Number(e.target.value) || 50)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-3 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Age</label>
          <input type="number" min={10} max={100} value={age} onChange={e => setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-3 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
        </div>
      </div>
      <p className="text-[10px] text-brand-muted/50 text-center pt-2">Results update automatically.</p>
    </div>
  );

  const resultsModule = (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
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
        {bodyFatCategories.map(c => (
          <div key={c.label} className={`flex justify-between items-center px-3 py-2 rounded-lg text-xs ${result.category.label === c.label ? 'bg-brand-sage/10 border border-brand-sage/20' : ''}`}>
            <span className={`${c.color} font-medium`}>{c.label}</span>
            <span className="text-brand-muted">{c.min}% – {c.max === 60 ? '60%+' : c.max + '%'}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
        <p>Body fat percentage is a better health marker than weight alone. For more about how body composition affects your weight goals, see our <Link to="/calculators/ideal-weight-calculator" className="text-brand-sage underline hover:no-underline">ideal weight calculator</Link>.</p>
      </div>
    </motion.div>
  );

  const educationContent = (
    <>
      <p>Body fat percentage is the proportion of your total weight that comes from fat, as opposed to lean mass (muscle, bone, organs, and water). It is a more accurate health indicator than BMI because it distinguishes between muscle and fat. Two women at the same weight can have very different body fat levels and very different health profiles.</p>
      <p>For women, essential body fat is higher than for men — roughly 10 to 14 percent — because fat plays a key role in hormone regulation and reproductive health. The athletic range of 14 to 20 percent is common among active women. The fit range of 20 to 24 percent is where many women feel and perform their best. Above 31 percent is considered overweight.</p>
      <p>This calculator uses the BMI-based method validated by Deurenberg and colleagues, which correlates well with more precise methods like DEXA scans for women between 20 and 60 years old. For a more complete picture of your healthy body composition, combine this with our <Link to="/calculators/ideal-weight-calculator" className="text-brand-sage underline hover:no-underline">ideal weight calculator</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Body Fat Calculator for Women | FitFeky',
        description: 'Estimate your body fat percentage as a woman. Free BMI-based body fat calculator with category ranges — essential, athlete, fit, acceptable, and overweight.',
        canonicalPath: '/calculators/body-fat-calculator',
        h1: 'Body Fat Calculator for Women – Estimate Your Body Fat Percentage',
        intro: 'Body fat percentage tells you more than the scale ever will. This calculator estimates your body fat using the validated BMI-based method designed for women.\n\nYour result is categorized into one of five ranges — essential, athlete, fit, acceptable, or overweight — so you know exactly where you stand.\n\nCombine your body fat reading with our ideal weight calculator for a complete picture of your healthy body composition.',
      }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Is Body Fat Percentage and Why Does It Matter?"
      ctaTopic="Body Fat"
      faqs={[
        { q: 'What is a healthy body fat percentage for a woman?', a: 'A healthy body fat percentage for women ranges from 20 to 31 percent. Below 20 percent is considered fit or athletic, while above 31 percent falls into the overweight category. Essential fat for women starts at 10 to 14 percent.' },
        { q: 'How accurate is the BMI-based body fat calculation?', a: 'The Deurenberg formula used here has a correlation of about 0.85 with DEXA scans for women. It is a reliable estimate but not as precise as methods like DEXA, hydrostatic weighing, or a body composition scale. Use it as a reference point, not a diagnosis.' },
        { q: 'Why do women have higher body fat than men?', a: 'Women require higher essential body fat for reproductive health, hormone production, and fertility. Estrogen promotes fat storage, particularly in the hips, thighs, and breasts, which is biologically necessary for childbirth and breastfeeding.' },
        { q: 'Can I lower my body fat without losing weight?', a: 'Yes. This is called body recomposition. If you gain muscle while losing fat, your weight may stay the same or even increase, but your body fat percentage will drop. This is why measurements matter more than the scale.' },
        { q: 'Does age affect body fat percentage?', a: 'Yes. Body fat tends to increase with age as muscle mass naturally declines. This is why strength training and adequate protein intake become more important after age 40. Maintaining muscle helps keep body fat in check.' },
      ]}
    />
  );
}
