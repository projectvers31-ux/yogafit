import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator, ArrowRight, Check, ChevronRight,
  Dumbbell, Sparkles, Target, Zap,
  Heart, Activity, Brain, ShoppingBag, Home
} from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';
import { breadcrumbSchema } from '@/lib/seo';
import SafeImage from '@/components/ui/SafeImage';
import { productList } from '@/lib/products';
import type { Product } from '@/lib/products';

type Step = 'calculator' | 'results' | 'explain' | 'cta' | 'quiz' | 'ai_plan' | 'products';
type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'maintain' | 'lose' | 'fast_loss';
type WorkoutPref = 'gym' | 'home' | 'mixed';

interface TDEEResults {
  tdee: number; maintainCalories: number; fatLossCalories: number;
  aggressiveLossCalories: number; proteinGrams: number; bmr: number; bmi: number; bmiCategory: string;
}

const activityFactors: Record<ActivityLevel, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };

const activityOptions: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: '🪑 Sedentary' },
  { value: 'light', label: '🚶 Light' },
  { value: 'moderate', label: '🏃 Moderate' },
  { value: 'active', label: '💪 Active' },
  { value: 'very_active', label: '🏆 Very Active' },
];

const dayOptions = [3, 4, 5, 6];

const goalOptions: { value: Goal; label: string; desc: string }[] = [
  { value: 'maintain', label: 'Maintain', desc: 'keep your current weight' },
  { value: 'lose', label: 'Weight Loss', desc: 'lose 0.5 kg per week' },
  { value: 'fast_loss', label: 'Fast Loss', desc: 'lose 1 kg per week' },
];

function FieldTooltip({ label }: { label: string }) {
  return (
    <span className="group relative inline-flex items-center ml-1.5">
      <span className="w-3.5 h-3.5 rounded-full bg-brand-muted/20 text-brand-muted/50 text-[8px] font-bold flex items-center justify-center cursor-help hover:bg-brand-sage/20 hover:text-brand-sage transition-colors">?</span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-brand-ink text-white text-[10px] leading-tight rounded-lg shadow-lg whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </span>
  );
}

function calculateTDEE(age: number, gender: Gender, weightKg: number, heightCm: number, activity: ActivityLevel): TDEEResults {
  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const tdee = Math.round(bmr * activityFactors[activity]);
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let bmiCategory = 'Normal';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi >= 25 && bmi < 30) bmiCategory = 'Overweight';
  else if (bmi >= 30 && bmi < 35) bmiCategory = 'Obese Class I';
  else if (bmi >= 35) bmiCategory = 'Obese Class II';
  return {
    bmr: Math.round(bmr), tdee,
    maintainCalories: tdee,
    fatLossCalories: Math.round(tdee - 500),
    aggressiveLossCalories: Math.round(tdee - 1000),
    proteinGrams: Math.round(weightKg * 2.0),
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
  };
}

function estimatedGoalFromQuiz(days: number, speed: string): Goal {
  if (speed === 'fast') return 'fast_loss';
  if (speed === 'sustainable' && days >= 4) return 'lose';
  return 'lose';
}

function getProductsFor(goal: Goal, pref: WorkoutPref): Product[] {
  const filtered = productList.filter(p => {
    if (goal === 'maintain') return p.category === 'YOGA' || p.category === 'GLOW';
    if (pref === 'gym') return p.category === 'FITNESS' || p.category === 'KETO';
    if (pref === 'home') return p.category === 'YOGA' || p.category === 'GLOW';
    return p.category === 'KETO' || p.category === 'FITNESS' || p.category === 'YOGA';
  });
  return filtered.slice(0, 3);
}

export default function TDEECalculator() {
  const [step, setStep] = useState<Step>('calculator');

  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<Gender>('female');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(165);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');

  const [quizPref, setQuizPref] = useState<WorkoutPref | null>(null);
  const [quizDays, setQuizDays] = useState<number | null>(null);
  const [quizSpeed, setQuizSpeed] = useState<string | null>(null);
  const [formGoal, setFormGoal] = useState<Goal>('lose');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const displayW = weightUnit === 'kg' ? weight : Math.round(weight * 2.20462);
  const displayH = heightUnit === 'cm' ? height : Math.round(height / 30.48 * 10) / 10;
  const kgW = weightUnit === 'kg' ? weight : Math.round(displayW / 2.20462);
  const cmH = heightUnit === 'cm' ? height : Math.round(displayH * 30.48);

  const results = useMemo(() => calculateTDEE(age, gender, kgW, cmH, activity), [age, gender, kgW, cmH, activity]);
  const goal = useMemo(() => quizSpeed ? estimatedGoalFromQuiz(quizDays || 3, quizSpeed) : 'lose', [quizSpeed, quizDays]);
  const products = useMemo(() => getProductsFor(goal, quizPref || 'mixed'), [goal, quizPref]);
  const allQuizDone = quizPref && quizDays && quizSpeed;

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://fitfeky.com/' },
    { name: 'TDEE Calculator', url: 'https://fitfeky.com/calculators/tdee-calculator' },
  ]);

  const progressSteps = ['Calculate', 'Results', 'Your Numbers', 'Your Plan', 'Quick Quiz', 'AI Plan', 'Products'];
  const stepIndex = progressSteps.indexOf(
    step === 'calculator' ? 'Calculate' :
    step === 'results' ? 'Results' :
    step === 'explain' ? 'Your Numbers' :
    step === 'cta' ? 'Your Plan' :
    step === 'quiz' ? 'Quick Quiz' :
    step === 'ai_plan' ? 'AI Plan' : 'Products'
  );

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (age < 10 || age > 100) newErrors.age = 'Please enter an age between 10 and 100.';
    if (kgW < 20 || kgW > 350) newErrors.weight = 'Enter a weight between 20 kg and 350 kg.';
    if (cmH < 50 || cmH > 300) newErrors.height = 'Enter a height between 50 cm and 300 cm.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const goTo = (s: Step) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAll = () => {
    setStep('calculator');
    setQuizPref(null); setQuizDays(null); setQuizSpeed(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-12 pt-6">
        <Link to="/calculators" className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-brand-muted/60 hover:text-brand-sage transition-colors">
          <ArrowRight size={11} className="rotate-180" /> All Calculators
        </Link>
      </div>
      <SEOHelmet
        title="TDEE Calculator for Women – Weight Loss Calories | FitFeky"
        description="Free TDEE calculator for women. Calculate daily calories for weight loss, understand BMR vs TDEE, and get a personalized plan today."
        canonicalPath="/calculators/tdee-calculator"
        ldJson={[
          breadcrumb,
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'TDEE Calculator for Women',
            url: 'https://fitfeky.com/calculators/tdee-calculator',
            description: 'Free TDEE calculator for women to calculate daily calorie needs for weight loss, fat loss, or maintenance.',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a good TDEE for a woman?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most women have a TDEE between 1,800 and 2,400 calories per day, depending on age, body size, and activity level. A higher TDEE is not better. What matters is that your calorie intake matches your personal goal — maintenance, weight loss, or building muscle.',
                },
              },
              {
                '@type': 'Question',
                name: 'How accurate is this TDEE calculator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'This calculator uses the Mifflin-St Jeor equation, the most widely validated formula for estimating calorie needs. It is about 70-80% accurate for most women. Use your result as a starting point, track your progress for two weeks, and adjust your intake based on real results.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I eat my TDEE calories every day?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'If your goal is weight maintenance, yes. For weight loss, eat below your TDEE. For muscle gain, eat slightly above. Your TDEE changes a little each day based on activity, but staying close to your target most days gives you consistent results.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens if I eat below my TDEE?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Eating below your TDEE creates a calorie deficit, which leads to weight loss. A moderate deficit of 300-500 calories is sustainable for most women. A very large deficit can slow your metabolism, drain your energy, and cause muscle loss over time.',
                },
              },
              {
                '@type': 'Question',
                name: 'How often should I recalculate my TDEE?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Recalculate every 4 to 6 weeks, or after any meaningful change — losing 5 kg or more, shifting your activity level, or starting a new workout routine. Your calorie needs shift as your body changes, so updating keeps your targets accurate.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can yoga help with weight loss?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Yoga supports weight loss by building lean muscle, reducing cortisol levels, and improving body awareness so you make better food choices. It burns fewer calories than cardio, but it creates the habits and mindset that make long-term weight loss sustainable.',
                },
              },
            ],
          },
        ]}
      />
      <MetaTags />

      {/* ===== HERO ===== */}
      {step === 'calculator' && (
        <section className="py-14 md:py-20 px-4 md:px-12 bg-gradient-to-b from-brand-sage/5 via-white to-brand-bone border-b border-brand-border">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
                <Calculator size={12} /> Free Tool
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-brand-ink mb-4 leading-tight">
                TDEE Calculator for Women –{' '}
                <span className="text-brand-sage italic">Your Weight Loss</span> Calories
              </h1>
              <p className="text-sm md:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
                Our free TDEE calculator for women reveals how many calories your body burns each day. For
                women managing weight loss, this number is your starting point. Get accurate calorie targets,
                then build a <Link to="/quiz" className="text-brand-sage underline hover:no-underline transition-all">personalized plan</Link> or explore{' '}
                <Link to="/blog" className="text-brand-sage underline hover:no-underline transition-all">yoga for weight loss</Link> — no signup needed.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5 mt-5 text-[11px] text-brand-muted/60">
                <span className="flex items-center gap-1.5"><Check size={11} className="text-brand-sage" /> Science-backed</span>
                <span className="flex items-center gap-1.5"><Check size={11} className="text-brand-sage" /> 30-second calculation</span>
                <span className="flex items-center gap-1.5"><Check size={11} className="text-brand-sage" /> Free, no signup</span>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== PROGRESS ===== */}
      {step !== 'calculator' && (
        <div className="bg-white border-b border-brand-border/20 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-brand-muted/50">
              {progressSteps.map((label, i) => (
                <div key={label} className={`flex items-center gap-1.5 ${i <= stepIndex ? 'text-brand-sage' : ''}`}>
                  <div className={`w-2 h-2 rounded-full ${i < stepIndex ? 'bg-brand-sage' : i === stepIndex ? 'bg-brand-sage ring-2 ring-brand-sage/30' : 'bg-brand-border'}`} />
                  {i < progressSteps.length - 1 && <div className={`w-4 h-px ${i < stepIndex ? 'bg-brand-sage' : 'bg-brand-border'}`} />}
                </div>
              ))}
            </div>
            <button onClick={resetAll} className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/50 hover:text-brand-sage transition-colors">Restart</button>
          </div>
        </div>
      )}

      {/* ===== WRAPPER ===== */}
      <div className="max-w-lg mx-auto px-4 md:px-0 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {step === 'calculator' && (
            <motion.div key="calc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8 -mt-8 md:-mt-12 relative z-10">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Calculator size={22} className="text-brand-sage" />
                </div>
                <h2 className="text-xl font-serif text-brand-ink">How to Use the Calculator</h2>
                <p className="text-xs text-brand-muted mt-1">Enter your details — takes about 30 seconds</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">
                      Age <FieldTooltip label="Your age in years, used to calculate metabolic rate." />
                    </label>
                    <div className="relative">
                      <input type="number" min={10} max={100} value={age} placeholder="e.g. 30"
                        onChange={e => { setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10))); if (errors.age) setErrors(p => { const { age: _, ...rest } = p; return rest; }); }}
                        className={`w-full bg-white border ${errors.age ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-brand-border/40 focus:ring-brand-sage/20 focus:border-brand-sage'} rounded-xl px-4 py-3 text-sm text-[16px] text-brand-ink focus:outline-none focus:ring-2 transition-all pr-14`} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/50 font-bold uppercase">years</span>
                    </div>
                    {errors.age && <p className="text-[10px] text-red-400 mt-1.5">{errors.age}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">
                      Gender <FieldTooltip label="TDEE formulas differ for women and men due to hormonal and body composition differences." />
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['female', 'male'] as Gender[]).map(g => (
                        <button key={g} onClick={() => setGender(g)}
                          className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${gender === g ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30 hover:border-brand-sage/40'}`}>
                          {g === 'female' ? '♀' : '♂'} {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">
                      Weight <FieldTooltip label="Your current body weight. Used to calculate BMR and protein needs." />
                    </label>
                    <div className="flex gap-1.5">
                      <div className="relative flex-1">
                        <input type="number" min={20} max={350} step={0.1} value={displayW} placeholder={weightUnit === 'kg' ? 'e.g. 70' : 'e.g. 154'}
                          onChange={e => { const v = Math.max(20, Math.min(350, Number(e.target.value) || 20)); weightUnit === 'kg' ? setWeight(v) : setWeight(Math.round(v / 2.20462)); if (errors.weight) setErrors(p => { const { weight: _, ...rest } = p; return rest; }); }}
                          className={`w-full bg-white border ${errors.weight ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-brand-border/40 focus:ring-brand-sage/20 focus:border-brand-sage'} rounded-xl px-4 py-3 text-sm text-[16px] text-brand-ink focus:outline-none focus:ring-2 transition-all pr-10`} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/50 font-bold">{weightUnit}</span>
                      </div>
                      <button onClick={() => setWeightUnit(p => p === 'kg' ? 'lbs' : 'kg')}
                        className="px-3 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-brand-muted border border-brand-border/30 hover:border-brand-sage/40 transition-all bg-white">Switch</button>
                    </div>
                    {errors.weight && <p className="text-[10px] text-red-400 mt-1.5">{errors.weight}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">
                      Height <FieldTooltip label="Your height helps calculate BMI and provides a more accurate BMR estimate." />
                    </label>
                    <div className="flex gap-1.5">
                      <div className="relative flex-1">
                        <input type="number" min={50} max={300} value={displayH} placeholder={heightUnit === 'cm' ? 'e.g. 165' : 'e.g. 5.4'}
                          onChange={e => { const v = Math.max(50, Math.min(300, Number(e.target.value) || 50)); heightUnit === 'cm' ? setHeight(v) : setHeight(Math.round(v * 30.48)); if (errors.height) setErrors(p => { const { height: _, ...rest } = p; return rest; }); }}
                          className={`w-full bg-white border ${errors.height ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-brand-border/40 focus:ring-brand-sage/20 focus:border-brand-sage'} rounded-xl px-4 py-3 text-sm text-[16px] text-brand-ink focus:outline-none focus:ring-2 transition-all pr-10`} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/50 font-bold">{heightUnit}</span>
                      </div>
                      <button onClick={() => setHeightUnit(p => p === 'cm' ? 'ft' : 'cm')}
                        className="px-3 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-brand-muted border border-brand-border/30 hover:border-brand-sage/40 transition-all bg-white">Switch</button>
                    </div>
                    {errors.height && <p className="text-[10px] text-red-400 mt-1.5">{errors.height}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">
                    Activity Level <FieldTooltip label="How active are you daily? Includes work, commuting, chores, and exercise." />
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {activityOptions.map(a => (
                      <button key={a.value} onClick={() => setActivity(a.value)}
                        className={`py-2.5 rounded-xl text-[9px] font-bold transition-all border leading-tight ${activity === a.value ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30 hover:border-brand-sage/40'}`}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">
                    Your Goal <FieldTooltip label="Select your primary goal. We will highlight the right calorie target for you." />
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {goalOptions.map(g => (
                      <button key={g.value} onClick={() => setFormGoal(g.value)}
                        className={`py-2.5 rounded-xl text-[9px] font-bold transition-all border leading-tight text-center ${formGoal === g.value ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30 hover:border-brand-sage/40'}`}>
                        {g.label}
                        <span className="block text-[8px] font-normal opacity-60 mt-0.5">{g.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleCalculate}
                  className="w-full bg-brand-sage text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center justify-center gap-2 mt-3">
                  <Calculator size={15} /> Calculate Your TDEE
                </motion.button>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-10 md:p-12 text-center -mt-8 md:-mt-12 relative z-10">
              <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap size={22} className="text-brand-sage" />
              </div>
              <p className="text-sm text-brand-muted mb-5">Calculating your personalized results...</p>
              <div className="max-w-xs mx-auto bg-brand-border/20 rounded-full h-2 overflow-hidden">
                <motion.div className="h-full bg-brand-sage rounded-full"
                  initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'easeInOut' }} />
              </div>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Zap size={22} className="text-brand-sage" />
                </div>
                <h2 className="text-xl font-serif text-brand-ink">Your TDEE and Weight Loss</h2>
                <p className="text-xs text-brand-muted mt-1">Personalized for your body and goals</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="rounded-2xl p-5 text-center border border-black/5 shadow-sm" style={{ backgroundColor: '#FAEDCD' }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#7A6C4B]/70 mb-1">Maintenance</p>
                  <p className="text-3xl font-serif text-[#3D3522] font-bold">{results.maintainCalories.toLocaleString()}</p>
                  <p className="text-[10px] text-[#5E5240]/60 mt-1 leading-snug">Eat this to keep your current weight steady</p>
                </div>

                <div className="rounded-2xl p-5 text-center border border-black/5 shadow-sm" style={{ backgroundColor: '#CCD5AE' }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#4A5B3A]/70 mb-1">Weight Loss</p>
                  <p className="text-3xl font-serif text-[#2C3D1F] font-bold">{results.fatLossCalories.toLocaleString()}</p>
                  <p className="text-[10px] text-[#3E4E2F]/60 mt-1 leading-snug">Lose about 0.5 kg per week at this level</p>
                </div>

                <div className="rounded-2xl p-5 text-center border border-black/5 shadow-sm" style={{ backgroundColor: '#D4A373' }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#5E3D1E]/70 mb-1">Fast Loss</p>
                  <p className="text-3xl font-serif text-[#3D260E] font-bold">{results.aggressiveLossCalories.toLocaleString()}</p>
                  <p className="text-[10px] text-[#4C3216]/60 mt-1 leading-snug">Lose about 1 kg per week (aggressive)</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 bg-brand-warm rounded-xl py-3 px-4 mb-4">
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">Protein</p>
                  <p className="text-lg font-serif text-brand-ink font-bold">{results.proteinGrams}g</p>
                  <p className="text-[9px] text-brand-muted/50">per day</p>
                </div>
                <div className="w-px h-8 bg-brand-border/30" />
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">BMI</p>
                  <p className="text-lg font-serif text-brand-ink font-bold">{results.bmi}</p>
                  <p className="text-[9px] text-brand-muted/50">{results.bmiCategory}</p>
                </div>
                <div className="w-px h-8 bg-brand-border/30" />
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">BMR</p>
                  <p className="text-lg font-serif text-brand-ink font-bold">{results.bmr.toLocaleString()}</p>
                  <p className="text-[9px] text-brand-muted/50">baseline</p>
                </div>
              </div>

              <div className="bg-brand-sage/5 border border-brand-sage/10 rounded-2xl p-5 text-center">
                <p className="text-sm text-brand-ink font-semibold mb-3">Want a complete plan based on these numbers?</p>
                <Link to="/quiz"
                  className="flex sm:inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 w-full sm:w-auto justify-center">
                  Get My Free Plan <ArrowRight size={14} />
                </Link>
              </div>

              <div className="flex gap-2 mt-4">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => goTo('explain')}
                  className="flex-1 bg-white border border-brand-border/40 text-brand-muted py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:border-brand-sage/40 hover:text-brand-sage transition-all">
                  How to Read These Numbers
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'explain' && (
            <motion.div key="explain" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Brain size={22} className="text-brand-sage" />
                </div>
                <h2 className="text-xl font-serif text-brand-ink">Understanding Your Results</h2>
              </div>

              <div className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-brand-sage/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><Target size={14} className="text-brand-sage" /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-ink mb-1">Your body burns {results.maintainCalories.toLocaleString()} calories daily</h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      This is your total daily energy expenditure (TDEE). It includes everything — your resting metabolism, digestion, walking, exercise, and even thinking.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-brand-sage/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><Zap size={14} className="text-brand-sage" /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-ink mb-1">To lose weight, eat below this number</h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      A deficit of 300-500 calories per day leads to steady fat loss of about 0.5 kg per week.
                      {results.fatLossCalories.toLocaleString()} calories is your sweet spot for sustainable results.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-brand-sage/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><Heart size={14} className="text-brand-sage" /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-ink mb-1">Protein keeps your muscle while you lose fat</h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Eat at least {results.proteinGrams}g of protein daily. This preserves lean muscle, keeps your metabolism running, and helps you feel full longer.
                    </p>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => goTo('cta')}
                  className="w-full bg-brand-sage text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center justify-center gap-2 mt-4">
                  Get Your Personalized Plan <ChevronRight size={15} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'cta' && (
            <motion.div key="cta" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-gradient-to-br from-brand-sage/10 to-brand-blush/30 border border-brand-sage/15 rounded-3xl p-8 md:p-10 text-center">
              <Sparkles size={36} className="text-brand-sage mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-brand-ink mb-3 leading-tight">Calories to Lose Weight –<br />Get Your <span className="text-brand-sage italic">Personalized Plan</span></h2>
              <p className="text-sm text-brand-muted max-w-md mx-auto mb-6 leading-relaxed">
                Your TDEE is just the start. Answer 3 quick questions and we will build a complete fat loss blueprint
                tailored to your body, schedule, and goals.
              </p>
              <ul className="text-xs text-brand-muted/70 space-y-2 mb-6 inline-block text-left">
                <li className="flex items-center gap-2"><Check size={12} className="text-brand-sage shrink-0" /> Personalized meal & workout strategy</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-brand-sage shrink-0" /> Based on your TDEE, preferences, and schedule</li>
                <li className="flex items-center gap-2"><Check size={12} className="text-brand-sage shrink-0" /> Free — generated in under 60 seconds</li>
              </ul>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => goTo('quiz')}
                className="w-full bg-brand-sage text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center justify-center gap-2">
                Start the Quiz — 3 Quick Questions <ArrowRight size={15} />
              </motion.button>
              <p className="text-[10px] text-brand-muted/50 mt-3">No email required. Takes 30 seconds.</p>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-sage/10 text-brand-sage text-[9px] font-bold uppercase tracking-widest rounded-full mb-3">
                  <Sparkles size={10} /> Step 3 of 3
                </span>
                <h2 className="text-xl font-serif text-brand-ink">Quick Questions About Your Body</h2>
                <p className="text-xs text-brand-muted mt-1">Help us personalize your plan</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink mb-2.5">Do you prefer gym or home workouts?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {([{ v: 'gym', l: '🏋️ Gym' }, { v: 'home', l: '🏠 Home' }, { v: 'mixed', l: '🔄 Mixed' }] as const).map(o => (
                      <button key={o.v} onClick={() => setQuizPref(o.v as WorkoutPref)}
                        className={`py-4 rounded-xl text-xs font-bold transition-all border text-center ${quizPref === o.v ? 'bg-brand-sage text-white border-brand-sage shadow-md' : 'bg-white text-brand-muted border-brand-border/30 hover:border-brand-sage/40'}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink mb-2.5">How many days can you train per week?</p>
                  <div className="grid grid-cols-4 gap-2">
                    {dayOptions.map(d => (
                      <button key={d} onClick={() => setQuizDays(d)}
                        className={`py-4 rounded-xl text-sm font-bold transition-all border ${quizDays === d ? 'bg-brand-sage text-white border-brand-sage shadow-md' : 'bg-white text-brand-muted border-brand-border/30 hover:border-brand-sage/40'}`}>
                        {d} <span className="block text-[8px] font-normal opacity-60 mt-0.5">days</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink mb-2.5">What pace do you prefer?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {([{ v: 'fast', l: '⚡ Fast', d: 'Quick results, strict' }, { v: 'sustainable', l: '🌱 Sustainable', d: 'Slow & steady' }] as const).map(o => (
                      <button key={o.v} onClick={() => setQuizSpeed(o.v)}
                        className={`py-4 rounded-xl text-xs font-bold transition-all border text-center ${quizSpeed === o.v ? 'bg-brand-sage text-white border-brand-sage shadow-md' : 'bg-white text-brand-muted border-brand-border/30 hover:border-brand-sage/40'}`}>
                        {o.l}
                        <span className="block text-[8px] font-normal opacity-60 mt-0.5">{o.d}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {allQuizDone && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => goTo('ai_plan')}
                        className="w-full bg-brand-sage text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center justify-center gap-2">
                        Generate Your AI Plan <Sparkles size={15} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {step === 'ai_plan' && (
            <motion.div key="aiplan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={22} className="text-brand-sage" />
                </div>
                <h2 className="text-xl font-serif text-brand-ink">TDEE for Women: Your Personalized Plan</h2>
                <p className="text-xs text-brand-muted mt-1">Built from your body data and preferences</p>
              </div>

              <div className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8 space-y-4">
                <div className="bg-gradient-to-br from-brand-sage/5 to-brand-blush/20 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-brand-ink mb-2">Your Strategy</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {goal === 'fast_loss'
                      ? 'High Protein / Low Carb — designed for rapid fat loss while preserving muscle.'
                      : 'Balanced Macros (40% protein, 30% carbs, 30% fat) — sustainable approach for steady, long-term results.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-brand-warm rounded-xl p-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Daily Calories</p>
                    <p className="text-xl font-serif text-brand-ink font-bold">{goal === 'fast_loss' ? results.aggressiveLossCalories.toLocaleString() : results.fatLossCalories.toLocaleString()}</p>
                    <p className="text-[9px] text-brand-muted/50 mt-0.5">{goal === 'fast_loss' ? 'aggressive cut' : 'fat loss zone'}</p>
                  </div>
                  <div className="bg-brand-warm rounded-xl p-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Daily Protein</p>
                    <p className="text-xl font-serif text-brand-ink font-bold">{results.proteinGrams}g</p>
                    <p className="text-[9px] text-brand-muted/50 mt-0.5">preserve muscle</p>
                  </div>
                </div>

                <div className="bg-brand-warm rounded-xl p-4 flex items-center gap-3">
                  <Dumbbell size={18} className="text-brand-sage shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-0.5">Training</p>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {quizPref === 'gym' ? 'Gym focus' : quizPref === 'home' ? 'Home workouts' : 'Mixed training'} —
                      {quizDays && ` ${quizDays} days/week.`}
                      {' '}{goal === 'fast_loss' ? 'Combine strength + HIIT for maximum fat burn.' : 'Focus on consistent strength training with moderate cardio.'}
                    </p>
                  </div>
                </div>

                <div className="bg-brand-warm rounded-xl p-4 flex items-center gap-3">
                  <Heart size={18} className="text-brand-sage shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-0.5">Estimated Results</p>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {goal === 'fast_loss'
                        ? `At ${results.aggressiveLossCalories.toLocaleString()} calories/day, you could lose approximately 0.8-1 kg per week.`
                        : `At ${results.fatLossCalories.toLocaleString()} calories/day, you could lose approximately 0.4-0.6 kg per week.`}
                      {' '}Stay consistent and adjust based on your progress.
                    </p>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => goTo('products')}
                  className="w-full bg-brand-sage text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center justify-center gap-2 mt-2">
                  View Recommended Products <ShoppingBag size={15} />
                </motion.button>

                <Link to="/"
                  className="block w-full text-center py-3 text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-sage transition-colors">
                  Take Full Quiz for Complete Blueprint →
                </Link>
              </div>
            </motion.div>
          )}

          {step === 'products' && (
            <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag size={22} className="text-brand-sage" />
                </div>
                <h2 className="text-xl font-serif text-brand-ink">Top Picks for Your Weight Loss Goals</h2>
                <p className="text-xs text-brand-muted mt-1">AI-curated based on your goal and preferences</p>
              </div>

              <div className="space-y-4">
                {products.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-white border border-brand-border/30 rounded-2xl p-4 flex gap-4 hover:shadow-sm transition-all">
                    <SafeImage src={product.image} alt={product.title} className="w-20 h-20 rounded-xl object-cover shrink-0" width={80} height={80} />
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 bg-brand-sage/10 text-brand-sage text-[8px] font-bold uppercase tracking-widest rounded-full mb-1.5">{product.category}</span>
                      <h3 className="text-sm font-serif text-brand-ink leading-snug mb-0.5">{product.title}</h3>
                      <p className="text-[11px] text-brand-muted leading-relaxed mb-1.5">{product.benefit}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.oldPrice > 0 && <span className="text-[9px] text-brand-muted/50 line-through block">${product.oldPrice}</span>}
                          <span className="text-sm font-bold text-brand-sage">${product.price}</span>
                        </div>
                        <a href={product.link} target="_blank" rel="noopener noreferrer sponsored"
                          className="bg-brand-sage text-white px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all inline-flex items-center gap-1">
                          Shop <ArrowRight size={10} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <Link to="/"
                  className="block w-full bg-gradient-to-r from-brand-sage/10 to-brand-blush/30 border border-brand-sage/10 text-center py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] text-brand-ink hover:bg-brand-sage hover:text-white transition-all mt-2">
                  Get Your Complete AI Fat Loss Plan →
                </Link>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={resetAll}
                  className="w-full text-center py-3 text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-sage transition-colors">
                  ← Recalculate TDEE
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== BLOG CONTENT ===== */}
      <section className="max-w-3xl mx-auto px-4 md:px-12 py-16 md:py-20 border-t border-brand-border/20">
        <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-serif prose-headings:text-brand-ink prose-headings:mt-10 prose-headings:mb-4 prose-p:text-brand-muted prose-p:leading-relaxed prose-p:mb-4 prose-p:text-sm md:prose-p:text-base prose-a:text-brand-sage prose-a:underline hover:prose-a:no-underline prose-table:text-sm prose-th:bg-brand-sage/10 prose-th:text-brand-ink prose-th:font-semibold prose-th:p-3 prose-td:p-3 prose-td:text-brand-muted prose-td:border-brand-border/10 prose-strong:text-brand-ink">
          <h2>What Is TDEE and Why Does It Matter?</h2>
          <p>
            If you have been wondering "how many calories should I eat" to reach your goals, the answer starts with your
            TDEE. TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day.
            Everything counts: your sleep, your walk to the car, your yoga practice, even digesting your food. A TDEE
            calculator for women gives you a personalized number based on your age, height, weight, and activity level.
            This number reveals your maintenance calories — what you need to eat to stay exactly where you are. From
            there, you can create a calorie deficit for weight loss or eat at maintenance to keep your results. This is
            why knowing your TDEE changes everything. Instead of following generic diet advice, you get a number that
            belongs to your body. That is the difference between guessing and knowing.
          </p>

          <h2>BMR vs TDEE — What's the Difference?</h2>
          <p>
            Many women confuse BMR with TDEE, but they are not the same. Your BMR (basal metabolic rate) is the
            calories your body needs at complete rest — just breathing, keeping your heart beating, and staying alive.
            Your TDEE includes everything you do on top of that — walking, standing, exercising, even fidgeting. This
            is why BMR vs TDEE is not a competition; they work together. BMR gives you a baseline, and TDEE gives you
            real life.
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-center">BMR</th>
                  <th className="text-center">TDEE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-brand-ink">Definition</td>
                  <td className="text-center">Calories at complete rest</td>
                  <td className="text-center">Total daily calories burned</td>
                </tr>
                <tr>
                  <td className="font-medium text-brand-ink">Includes activity</td>
                  <td className="text-center"><span className="text-red-400 text-lg">✕</span></td>
                  <td className="text-center"><span className="text-green-500 text-lg">✓</span></td>
                </tr>
                <tr>
                  <td className="font-medium text-brand-ink">Use for</td>
                  <td className="text-center">Baseline</td>
                  <td className="text-center">Real life</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Think of BMR as your body's minimum operating cost. TDEE is your actual daily spending. When you use a
            daily calorie calculator, both numbers appear so you can see the full picture.
          </p>

          <h2>How to Use This Calorie Calculator (Step by Step)</h2>
          <p>Getting your calorie calculator results takes less than 30 seconds.</p>
          <ol>
            <li>Enter your age — metabolic rate changes as you get older.</li>
            <li>Select your gender — formulas differ for women and men.</li>
            <li>Add your weight and height — body size determines your calorie needs.</li>
            <li>Choose your activity level — be honest about how much you move each day.</li>
            <li>Pick your goal — maintain, lose weight, or faster weight loss.</li>
          </ol>
          <p>That is it. Your personalized calorie targets appear instantly.</p>

          <h2>How Many Calories Should Women Eat to Lose Weight?</h2>
          <p>
            Weight loss comes down to a calorie deficit — eating fewer calories than your body burns. For most women,
            this is the clearest path to results. A 500-calorie deficit each day leads to about 0.5 kg of fat loss per
            week. A 1000-calorie deficit leads to about 1 kg per week. Your daily calorie calculator numbers show both
            options so you can choose what feels right for you.
          </p>
          <p>
            A quick warning: never go below 1200 calories per day without medical supervision. Eating too little can
            slow your metabolism, disrupt your hormones, and lead to muscle loss. The goal is a calorie deficit for
            women that feels sustainable — enough food to fuel your body while still losing weight. Your TDEE helps you
            find that sweet spot where weight loss happens without deprivation.
          </p>

          <h2>TDEE and Weight Loss — Why It's Different for Women</h2>
          <p>
            Women's bodies are not smaller versions of men's bodies, and your TDEE reflects that. Women naturally have
            less muscle mass and higher body fat percentages, which means a lower resting metabolism. Hormonal changes
            during your menstrual cycle can also affect energy expenditure and appetite. This is why a TDEE calculator
            for women uses a different formula than the one for men. These differences are normal and expected — they do
            not make weight loss harder, just different. The key is to work with your body, not against it. Your calorie
            targets already account for these factors, giving you numbers that make sense for a woman's metabolism.
          </p>

          <h2>TDEE, Yoga, and Weight Loss — The Perfect Combination</h2>
          <p>
            Your TDEE is most useful when paired with movement you enjoy, and yoga is a fantastic choice for women at
            every fitness level. While yoga may not burn as many calories as running, it supports TDEE and weight loss
            in other powerful ways. Yoga builds lean muscle, which raises your resting metabolism over time. It reduces
            cortisol, the stress hormone linked to belly fat storage. And it improves body awareness, helping you make
            better food choices naturally. When you know your maintenance calories and practice yoga consistently, you
            create a calorie deficit for women that feels natural rather than forced. Your body responds to consistency,
            not perfection. Start with yoga designed for your goals. Take our{' '}
            <Link to="/quiz" className="text-brand-sage underline hover:no-underline">quick quiz for a personalized yoga plan</Link>{' '}
            built around your TDEE and preferences. For more tips, explore our{' '}
            <Link to="/blog" className="text-brand-sage underline hover:no-underline">fitness blog</Link>.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>What is a good TDEE for a woman?</h3>
          <p>
            Most women have a TDEE between 1,800 and 2,400 calories per day, depending on age, body size, and activity
            level. A higher TDEE is not better. What matters is that your calorie intake matches your personal goal —
            maintenance, weight loss, or building muscle.
          </p>

          <h3>How accurate is this TDEE calculator?</h3>
          <p>
            This calculator uses the Mifflin-St Jeor equation, the most widely validated formula for estimating calorie
            needs. It is about 70-80% accurate for most women. Use your result as a starting point, track your progress
            for two weeks, and adjust your intake based on real results.
          </p>

          <h3>Should I eat my TDEE calories every day?</h3>
          <p>
            If your goal is weight maintenance, yes. For weight loss, eat below your TDEE. For muscle gain, eat slightly
            above. Your TDEE changes a little each day based on activity, but staying close to your target most days
            gives you consistent results.
          </p>

          <h3>What happens if I eat below my TDEE?</h3>
          <p>
            Eating below your TDEE creates a calorie deficit, which leads to weight loss. A moderate deficit of 300-500
            calories is sustainable for most women. A very large deficit can slow your metabolism, drain your energy, and
            cause muscle loss over time.
          </p>

          <h3>How often should I recalculate my TDEE?</h3>
          <p>
            Recalculate every 4 to 6 weeks, or after any meaningful change — losing 5 kg or more, shifting your
            activity level, or starting a new workout routine. Your calorie needs shift as your body changes, so
            updating keeps your targets accurate.
          </p>

          <h3>Can yoga help with weight loss?</h3>
          <p>
            Yes. Yoga supports weight loss by building lean muscle, reducing cortisol levels, and improving body
            awareness so you make better food choices. It burns fewer calories than cardio, but it creates the habits
            and mindset that make long-term weight loss sustainable.
          </p>
        </div>
      </section>

      {/* ===== FAQ (always visible) ===== */}
      <section className="max-w-lg mx-auto px-4 md:px-0 pb-24 md:pb-16">
        <div className="text-center mb-8 mt-4">
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3">FAQ</span>
          <h2 className="text-2xl font-serif text-brand-ink">FAQ About TDEE for Women</h2>
        </div>
        <div className="space-y-2.5">
          {[
            { q: 'What is TDEE?', a: 'TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day. It includes your basal metabolic rate (BMR), digestion, and all physical activity. Knowing your TDEE helps you set accurate calorie targets for weight loss, maintenance, or muscle gain.' },
            { q: 'How accurate is this calorie calculator?', a: 'This calculator uses the Mifflin-St Jeor equation, the most widely validated formula for estimating calorie needs. It is about 70-80% accurate for most people. We recommend using it as a starting point and adjusting based on your real-world results after 2 weeks.' },
            { q: 'Can I lose weight without going to the gym?', a: 'Yes. Weight loss comes from a calorie deficit, not exercise. You can absolutely lose weight with nutrition alone. Adding movement — even walking or home workouts — helps preserve muscle and improves results, but the gym is not required.' },
            { q: 'What is a calorie deficit?', a: 'A calorie deficit means eating fewer calories than your body burns. For example, if your TDEE is 2,000 and you eat 1,500, you are in a 500-calorie deficit. Your body then uses stored fat for energy, leading to weight loss. A deficit of 300-500 calories is sustainable for most women.' },
            { q: 'How much protein do I need daily?', a: 'For most active women, we recommend 1.6-2.2 grams per kilogram of body weight. Protein preserves muscle during fat loss, keeps you full between meals, and supports your metabolism. Our calculator estimates this based on your body weight.' },
            { q: 'What is the difference between BMR and TDEE?', a: 'BMR is your basal metabolic rate — calories burned at complete rest. TDEE is your total daily energy expenditure, which includes BMR plus digestion, walking, exercise, and daily movement. BMR is the baseline; TDEE is your real-world burn.' },
          ].map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-brand-border/20 hover:border-brand-sage/15 transition-all overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none">
                <h3 className="text-sm font-medium text-brand-ink group-open:text-brand-sage transition-colors pr-4 text-left leading-snug">{faq.q}</h3>
                <ChevronRight size={14} className="text-brand-muted shrink-0 transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <div className="px-5 pb-3.5">
                <div className="h-px bg-brand-border/20 -mx-5 mb-3" />
                <p className="text-xs text-brand-muted leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ===== STICKY MOBILE BANNER ===== */}
      {step !== 'calculator' && !isLoading && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ backgroundColor: '#D4A373' }}>
          <Link to="/quiz" className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold tracking-wide" style={{ color: '#FEFAE0' }}>
            Ready for your full plan? → Take the Quiz
          </Link>
        </div>
      )}
    </main>
  );
}

const upsertMeta = (attr: 'name' | 'property', value: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, value); document.head.appendChild(tag); }
  tag.setAttribute('content', content);
};

const tagExists = (name: string): boolean =>
  !!document.head.querySelector(`meta[name="${name}"], meta[property="${name}"]`);

function MetaTags() {
  useEffect(() => {
    const url = 'https://fitfeky.com/calculators/tdee-calculator';

    if (!tagExists('keywords')) {
      const kw = document.createElement('meta');
      kw.setAttribute('name', 'keywords');
      kw.setAttribute('content', 'TDEE calculator for women, calorie calculator, weight loss calories, fat loss calculator, daily calorie needs, BMR calculator, macros for women, women weight loss, fitness calculator, yoga weight loss');
      document.head.appendChild(kw);
    }

    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'FitFeky');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', "TDEE Calculator for Women – Weight Loss Calories | FitFeky");
    upsertMeta('name', 'twitter:description', 'Free TDEE calculator for women. Calculate daily calories for weight loss, understand BMR vs TDEE, and get a personalized plan today.');
    upsertMeta('name', 'twitter:url', url);
  }, []);

  return null;
}
