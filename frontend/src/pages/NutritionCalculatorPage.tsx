import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import EmotionalMirror from '@/components/tools/EmotionalMirror';

type Goal = 'lose' | 'maintain' | 'gain';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active';

const activityFactors: Record<Activity, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
const macroRatios: Record<Goal, { protein: number; carbs: number; fat: number }> = {
  lose: { protein: 0.35, carbs: 0.3, fat: 0.35 },
  maintain: { protein: 0.3, carbs: 0.4, fat: 0.3 },
  gain: { protein: 0.3, carbs: 0.45, fat: 0.25 },
};

export default function NutritionCalculatorPage() {
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
          {(['lose', 'maintain', 'gain'] as Goal[]).map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${goal === g ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30'}`}
            >
              {g === 'lose' ? 'Lose' : g === 'maintain' ? 'Maintain' : 'Tone'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Age</label>
            <input
              type="number"
              min={10}
              max={100}
              value={age}
              onChange={(e) => setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Activity</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as Activity)}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
            >
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
            <input
              type="number"
              min={20}
              max={350}
              step={0.1}
              value={weight}
              onChange={(e) => setWeight(Math.max(20, Math.min(350, Number(e.target.value) || 20)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Height (cm)</label>
            <input
              type="number"
              min={50}
              max={300}
              value={height}
              onChange={(e) => setHeight(Math.max(50, Math.min(300, Number(e.target.value) || 50)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
            />
          </div>
        </div>
        <p className="text-[10px] text-brand-muted/50 text-center pt-2">Results update automatically.</p>
      </div>
    </>
  );

  const resultsModule = (
    <div className="animate-fadeIn bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
      <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Daily Calories</p>
        <p className="text-3xl font-serif text-brand-sage font-bold">{macros.calories.toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Protein', value: macros.protein, color: 'text-brand-sage' },
          { label: 'Carbs', value: macros.carbs, color: 'text-brand-gold' },
          { label: 'Fat', value: macros.fat, color: 'text-brand-sand' },
        ].map((m) => (
          <div key={m.label} className="bg-brand-warm rounded-xl p-4 text-center">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">{m.label}</p>
            <p className={`text-xl font-serif font-bold ${m.color}`}>{m.value}<span className="text-xs text-brand-muted/50">g</span></p>
          </div>
        ))}
      </div>
      <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
        <p>Protein is the most important macro during weight loss. For a deeper look at protein targets, use our <Link to="/protein-calculator" className="text-brand-sage underline hover:no-underline">protein calculator</Link>.</p>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>Macronutrients are the three nutrients you need in larger amounts: protein, carbohydrates, and fat. A good nutrition plan balances all three so you can lose fat, keep muscle, and still feel energetic.</p>
      <p>If your goal is weight loss, protein gets a bigger share because it helps preserve lean mass and keeps you full. If your goal is maintenance or muscle tone, you can shift the balance slightly to match your training and energy needs.</p>
      <p>After you get your macro split, compare it with the <Link to="/calorie-calculator" className="text-brand-sage underline hover:no-underline">calorie calculator</Link> and <Link to="/protein-calculator" className="text-brand-sage underline hover:no-underline">protein calculator</Link>. You can also pair this with the <Link to="/body-fat-calculator" className="text-brand-sage underline hover:no-underline">body fat calculator</Link> for a more complete picture.</p>
      <p>Recommended reading: <Link to="/blog/intermittent-fasting-beginners" className="text-brand-sage underline hover:no-underline">Intermittent Fasting for Beginners</Link> and <Link to="/blog/best-diet-plan-weight-loss-women" className="text-brand-sage underline hover:no-underline">Best Diet Plan for Weight Loss for Women</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Nutrition Calculator — Protein, Carbs & Fat Targets | FitFeky',
        description: 'Get personalized protein, carb, and fat targets for weight loss, maintenance, or muscle tone. Free nutrition calculator for women.',
        canonicalPath: '/nutrition-calculator',
        h1: 'Nutrition Calculator for Women — Build Your Custom Macro Plan',
        intro: 'Stop guessing your ratios. Use your body stats and goal to build a simple nutrition plan you can follow.',
        keywords: ['nutrition calculator', 'macro calculator women', 'protein carbs fat calculator', 'iifym calculator women'],
        ogImage: '/og/calculators/macro-calculator.png',
      }}
      emotionalMirror={
        <EmotionalMirror
          items={[
            "You've tried generic meal plans that didn't fit your body",
            "You're confused about how much protein, carbs, and fat you actually need",
            'You want a breakdown that is easy to follow every day',
          ]}
        />
      }
      currentTool="Nutrition Calculator"
      blogArticle={{ slug: 'intermittent-fasting-beginners', title: 'Intermittent Fasting for Beginners: A Complete Guide for Women', label: 'Understanding your macros' }}
      smartCta={{ tool: 'macro', category: goal, userValue: macros.calories }}
      productCards={[
        { id: 'etekcity-food-kitchen-scale-digital-grams-and-ounc', context: 'Weigh your portions for accurate macro tracking', position: 'after-results' },
      ]}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Are Macros and Why Do They Matter for Women?"
      ctaTopic="Nutrition"
      faqs={[
        { q: 'What are the best macros for women to lose weight?', a: 'A strong starting point for weight loss is higher protein, moderate carbs, and healthy fats. Your exact split depends on your activity level and how your body responds.' },
        { q: 'How many grams of protein do I need per day?', a: 'Most active women need between 1.6 and 2.0 grams of protein per kilogram of body weight. Use the protein calculator for a more precise number.' },
        { q: 'Do I need to count macros forever?', a: 'No. Many women track for 2 to 4 weeks to learn portion sizes and then switch to a more intuitive approach.' },
        { q: 'How do macros change for women over 40?', a: 'Women over 40 often do better with a bit more protein and strength training to preserve lean mass and support metabolism.' },
        { q: 'What is the difference between macros and calories?', a: 'Calories are the total energy in your food. Macros are the breakdown of where those calories come from: protein, carbs, and fat.' },
      ]}
    />
  );
}
