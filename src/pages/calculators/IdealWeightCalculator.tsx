import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState(165);
  const [age, setAge] = useState(30);

  const weights = useMemo(() => {
    const h = height / 100;
    const n = 1.53 * h * h;
    return {
      devine: Math.round(45.5 + 2.3 * ((height * 0.3937) - 60)),
      robinson: Math.round(49 + 1.7 * ((height * 0.3937) - 60)),
      miller: Math.round(53.1 + 1.36 * ((height * 0.3937) - 60)),
      bmiLower: Math.round(18.5 * h * h),
      bmiUpper: Math.round(24.9 * h * h),
      hamwi: Math.round(45.5 + 2.2 * ((height * 0.3937) - 60)),
    };
  }, [height]);

  const calculatorModule = (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a9c8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3"/><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
          </svg>
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Your Ideal Weight</h2>
        <p className="text-xs text-brand-muted mt-1">Enter your details below</p>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Height (cm)</label>
        <div className="flex items-center gap-3">
          <input type="range" min={140} max={220} value={height} onChange={e => setHeight(Number(e.target.value))}
            className="flex-1 accent-brand-sage h-1.5" />
          <span className="text-sm font-bold text-brand-ink w-12 text-right">{height}</span>
        </div>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Age</label>
        <input type="number" min={10} max={100} value={age} onChange={e => setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10)))}
          className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
      </div>
      <p className="text-[10px] text-brand-muted/50 text-center pt-2">Results update automatically.</p>
    </div>
  );

  const resultsModule = (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
      <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Healthy BMI Range</p>
        <p className="text-3xl font-serif text-brand-sage font-bold">{weights.bmiLower} – {weights.bmiUpper} kg</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Devine', value: weights.devine },
          { label: 'Robinson', value: weights.robinson },
          { label: 'Miller', value: weights.miller },
          { label: 'Hamwi', value: weights.hamwi },
        ].map(m => (
          <div key={m.label} className="bg-brand-warm rounded-xl p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">{m.label}</p>
            <p className="text-lg font-serif text-brand-ink font-bold">{m.value} kg</p>
          </div>
        ))}
      </div>
      <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
        <p>Your ideal weight range depends on your frame, muscle mass, and body composition. For a more precise assessment, use our <Link to="/calculators/body-fat-calculator" className="text-brand-sage underline hover:no-underline">body fat calculator</Link>.</p>
      </div>
    </motion.div>
  );

  const educationContent = (
    <>
      <p>Ideal weight is a useful reference point, but it is not a strict target. Most formulas were developed for general populations and do not account for muscle mass, bone density, or body composition. For women, ideal weight can vary significantly based on frame size, age, and fitness level.</p>
      <p>The healthy BMI range of 18.5 to 24.9 gives you a broad window. The four formulas shown — Devine, Robinson, Miller, and Hamwi — offer slightly different estimates based on different population studies. If they disagree, that is normal. Focus on the BMI range as your primary guide and use the formula results as secondary context.</p>
      <p>A better measure than the scale is body fat percentage. Two women can weigh the same but have completely different health profiles depending on their ratio of muscle to fat. Use our <Link to="/calculators/body-fat-calculator" className="text-brand-sage underline hover:no-underline">body fat calculator</Link> for a more complete picture.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Ideal Weight Calculator for Women | FitFeky',
        description: 'Find your ideal weight range as a woman. Free calculator using Devine, Robinson, Miller and Hamwi formulas plus healthy BMI range.',
        canonicalPath: '/calculators/ideal-weight-calculator',
        h1: 'Ideal Weight Calculator for Women – Find Your Healthy Range',
        intro: 'Your ideal weight is more than a number on a scale. This calculator estimates your healthy weight range using four established medical formulas, plus the standard BMI range of 18.5 to 24.9.\n\nThe four methods — Devine, Robinson, Miller, and Hamwi — are based on height and give slightly different results. The healthy BMI range is broader and generally more useful as a practical target.\n\nUse this alongside our body fat calculator for a complete picture of what healthy means for your body.',
      }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Is Your Ideal Weight and How Is It Determined?"
      ctaTopic="Ideal Weight"
      faqs={[
        { q: 'What is the ideal weight for a woman in kg?', a: 'There is no single number. For a woman 165 cm tall, a healthy weight ranges from about 50 kg to 64 kg depending on frame size and muscle mass. Your ideal weight also depends on your age, bone density, and body composition.' },
        { q: 'How is ideal weight calculated for women?', a: 'The most common method is the BMI range of 18.5 to 24.9. Medical formulas like Devine and Robinson use height alone. None of these account for muscle mass, which is why they are estimates, not targets.' },
        { q: 'Is BMI an accurate measure for women?', a: 'BMI is a useful screening tool but it does not measure body fat. A muscular woman can have a high BMI with very low body fat. Use body fat percentage for a more accurate health assessment.' },
        { q: 'Can I be at a healthy weight but still have high body fat?', a: 'Yes. This is called normal-weight obesity. Your weight may fall in the healthy range, but your body fat percentage could be elevated. This is why body composition matters more than the scale alone.' },
        { q: 'Does age affect ideal weight?', a: 'Yes. As women age, muscle mass naturally decreases and body fat percentage tends to increase. The same weight at 45 may look and feel different than at 25. Strength training and protein intake help preserve lean mass at any age.' },
      ]}
    />
  );
}
