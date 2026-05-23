import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import { Utensils } from 'lucide-react';

type Goal = 'lose' | 'maintain' | 'gain';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active';

const activityFactors: Record<Activity, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
const macroRatios: Record<Goal, { protein: number; carbs: number; fat: number }> = {
  lose: { protein: 0.35, carbs: 0.30, fat: 0.35 },
  maintain: { protein: 0.30, carbs: 0.40, fat: 0.30 },
  gain: { protein: 0.30, carbs: 0.45, fat: 0.25 },
};

export default function MacroCalculator() {
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(165);
  const [activity, setActivity] = useState<Activity>('moderate');
  const [goal, setGoal] = useState<Goal>('lose');

  const macros = useMemo(() => {
    const bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = Math.round(bmr * activityFactors[activity]);
    const calorieTarget = goal === 'lose' ? tdee - 500 : goal === 'gain' ? tdee + 250 : tdee;
    const ratios = macroRatios[goal];
    return {
      calories: calorieTarget,
      protein: Math.round((calorieTarget * ratios.protein) / 4),
      carbs: Math.round((calorieTarget * ratios.carbs) / 4),
      fat: Math.round((calorieTarget * ratios.fat) / 9),
    };
  }, [age, weight, height, activity, goal]);

  const calculatorModule = (
    <>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Utensils size={22} className="text-brand-sage" />
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Your Daily Macros</h2>
        <p className="text-xs text-brand-muted mt-1">Personalized for your body and goal</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-1.5">
          {(['lose', 'maintain', 'gain'] as Goal[]).map(g => (
            <button key={g} onClick={() => setGoal(g)}
              className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${goal === g ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30'}`}>
              {g === 'lose' ? 'Lose' : g === 'maintain' ? 'Maintain' : 'Tone'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Age</label>
            <input type="number" min={10} max={100} value={age} onChange={e => setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Activity</label>
            <select value={activity} onChange={e => setActivity(e.target.value as Activity)}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all">
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Weight (kg)</label>
            <input type="number" min={20} max={350} step={0.1} value={weight} onChange={e => setWeight(Math.max(20, Math.min(350, Number(e.target.value) || 20)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Height (cm)</label>
            <input type="number" min={50} max={300} value={height} onChange={e => setHeight(Math.max(50, Math.min(300, Number(e.target.value) || 50)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
          </div>
        </div>
        <p className="text-[10px] text-brand-muted/50 text-center pt-2">Results update automatically.</p>
      </div>
    </>
  );

  const resultsModule = (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
      <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Daily Calories</p>
        <p className="text-3xl font-serif text-brand-sage font-bold">{macros.calories.toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Protein', value: macros.protein, color: 'text-brand-sage' },
          { label: 'Carbs', value: macros.carbs, color: 'text-brand-gold' },
          { label: 'Fat', value: macros.fat, color: 'text-brand-sand' },
        ].map(m => (
          <div key={m.label} className="bg-brand-warm rounded-xl p-4 text-center">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">{m.label}</p>
            <p className={`text-xl font-serif font-bold ${m.color}`}>{m.value}<span className="text-xs text-brand-muted/50">g</span></p>
          </div>
        ))}
      </div>
      <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
        <p>Protein is the most important macro during weight loss — it preserves muscle and keeps you full. For a deeper look at protein targets, use our <Link to="/calculators/protein-calculator" className="text-brand-sage underline hover:no-underline">protein calculator</Link>.</p>
      </div>
    </motion.div>
  );

  const educationContent = (
    <>
      <p>Macronutrients — protein, carbohydrates, and fat — are the three nutrients your body needs in large amounts. Each plays a distinct role. Protein builds and repairs muscle. Carbohydrates fuel your brain and workouts. Fat supports hormone production and vitamin absorption. Getting the right balance of these three is what turns a calorie target into a sustainable eating plan.</p>
      <p>For women, macro ratios matter because hormonal fluctuations affect how your body processes different nutrients. During the luteal phase of your cycle, for example, your body may benefit from slightly more complex carbohydrates and healthy fats. A one-size-fits-all macro split ignores these nuances. That is why this calculator adjusts your ratios based on your specific goal — weight loss, maintenance, or muscle tone.</p>
      <p>If your goal is weight loss, the protein ratio is intentionally higher. Protein has a higher thermic effect than carbs or fat, meaning your body burns more calories digesting it. It also keeps you full longer and helps preserve lean muscle during a deficit. For a precise protein target based on your activity level, try our <Link to="/calculators/protein-calculator" className="text-brand-sage underline hover:no-underline">protein calculator</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Macro Calculator for Women – Weight Loss | FitFeky',
        description: 'Free macro calculator for women. Get your daily protein, carbs, and fat targets for weight loss, energy, and muscle tone — personalized for your body.',
        canonicalPath: '/calculators/macro-calculator',
        h1: 'Macro Calculator for Women – Daily Protein, Carbs & Fat',
        intro: 'Macros matter more than calories alone. This macro calculator for women gives you a personalized daily split of protein, carbohydrates, and fat based on your body measurements, activity level, and goal.\n\nWhether you want to lose weight, maintain your current shape, or build lean muscle, the right macro balance keeps your energy steady, preserves muscle, and makes your calorie target sustainable.\n\nYour results update instantly as you adjust your inputs — no button clicking required.',
      }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Are Macros and Why Do They Matter for Women?"
      ctaTopic="Macros"
      faqs={[
        { q: 'What are the best macros for women to lose weight?', a: 'For weight loss, a balanced starting point is 35 percent protein, 30 percent carbohydrates, and 35 percent fat. Protein is prioritized because it preserves muscle during a calorie deficit and keeps you full. Your exact split depends on your activity level and how your body responds.' },
        { q: 'How many grams of protein do I need per day?', a: 'Most active women need between 1.6 and 2.0 grams of protein per kilogram of body weight. If you weigh 70 kg, that is 112 to 140 grams daily. Use our protein calculator for a precise number based on your activity level.' },
        { q: 'Do I need to count macros forever?', a: 'No. Most women track macros for 2 to 4 weeks to learn portion sizes and understand which foods fit their targets. After that, many switch to a more intuitive approach because they have built awareness. The tracking period is a learning tool, not a lifelong requirement.' },
        { q: 'How do macros change for women over 40?', a: 'As women approach perimenopause, insulin sensitivity often decreases and muscle loss accelerates. This means a slightly higher protein ratio (up to 40 percent) and lower carbohydrate ratio may be more effective. Strength training becomes especially important during this stage.' },
        { q: 'What is the difference between macros and calories?', a: 'Calories are the total energy in your food. Macros are the breakdown of where those calories come from — protein, carbs, and fat. Two people can eat the same number of calories but have completely different body compositions based on their macro split.' },
      ]}
    />
  );
}
