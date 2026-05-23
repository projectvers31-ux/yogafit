import { useState, useMemo } from 'react';
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
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <SEOHelmet
        title="TDEE Calculator – Calculate Your Daily Calories for Weight Loss | FitFeky"
        description="Use our free TDEE calculator to find your daily calorie needs for weight loss, fat loss, or maintenance. Get AI-powered insights and personalized recommendations."
        canonicalPath="/calculators/tdee-calculator"
        ldJson={[
          breadcrumb,
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'TDEE Calculator', url: 'https://fitfeky.com/calculators/tdee-calculator', description: 'Calculate your Total Daily Energy Expenditure and get personalized fat loss recommendations.', applicationCategory: 'HealthApplication', operatingSystem: 'All' },
        ]}
      />

      {/* ===== HERO ===== */}
      {step === 'calculator' && (
        <section className="py-14 md:py-20 px-4 md:px-12 bg-gradient-to-b from-brand-sage/5 via-white to-brand-bone border-b border-brand-border">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
                <Calculator size={12} /> Free Tool
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-brand-ink mb-4 leading-tight">
                TDEE Calculator –{' '}
                <span className="text-brand-sage italic">Your Daily Calories</span> for Weight Loss
              </h1>
              <p className="text-sm md:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
                Your Total Daily Energy Expenditure (TDEE) is exactly how many calories your body burns each day.
                Knowing this number is the first step to losing weight, building muscle, or maintaining your results.
                This free TDEE calculator uses the science-backed Mifflin-St Jeor formula to give you accurate
                calorie targets — no guesswork, no signup.
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
                <h2 className="text-xl font-serif text-brand-ink">Enter Your Details</h2>
                <p className="text-xs text-brand-muted mt-1">Takes about 30 seconds</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Age</label>
                    <div className="relative">
                      <input type="number" min={10} max={100} value={age} onChange={e => setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10)))}
                        className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all pr-14" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/50 font-bold uppercase">years</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Gender</label>
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
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Weight</label>
                    <div className="flex gap-1.5">
                      <div className="relative flex-1">
                        <input type="number" min={20} max={350} step={0.1} value={displayW}
                          onChange={e => { const v = Math.max(20, Math.min(350, Number(e.target.value) || 20)); weightUnit === 'kg' ? setWeight(v) : setWeight(Math.round(v / 2.20462)); }}
                          className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all pr-10" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/50 font-bold">{weightUnit}</span>
                      </div>
                      <button onClick={() => setWeightUnit(p => p === 'kg' ? 'lbs' : 'kg')}
                        className="px-3 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-brand-muted border border-brand-border/30 hover:border-brand-sage/40 transition-all bg-white">Switch</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Height</label>
                    <div className="flex gap-1.5">
                      <div className="relative flex-1">
                        <input type="number" min={50} max={300} value={displayH}
                          onChange={e => { const v = Math.max(50, Math.min(300, Number(e.target.value) || 50)); heightUnit === 'cm' ? setHeight(v) : setHeight(Math.round(v * 30.48)); }}
                          className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all pr-10" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/50 font-bold">{heightUnit}</span>
                      </div>
                      <button onClick={() => setHeightUnit(p => p === 'cm' ? 'ft' : 'cm')}
                        className="px-3 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-brand-muted border border-brand-border/30 hover:border-brand-sage/40 transition-all bg-white">Switch</button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Activity Level</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {activityOptions.map(a => (
                      <button key={a.value} onClick={() => setActivity(a.value)}
                        className={`py-2.5 rounded-xl text-[9px] font-bold transition-all border leading-tight ${activity === a.value ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30 hover:border-brand-sage/40'}`}>
                        {a.label}
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

          {step === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Zap size={22} className="text-brand-sage" />
                </div>
                <h2 className="text-xl font-serif text-brand-ink">Your Daily Calories</h2>
                <p className="text-xs text-brand-muted mt-1">Personalized for your body</p>
              </div>

              <div className="space-y-3">
                <div className="bg-brand-sage/5 border border-brand-sage/15 rounded-2xl p-5 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand-sage/80 mb-1">Maintenance Calories</p>
                  <p className="text-4xl font-serif text-brand-ink font-bold">{results.maintainCalories.toLocaleString()}</p>
                  <p className="text-[11px] text-brand-muted/60 mt-1">calories per day to maintain your weight</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-brand-border/30 rounded-2xl p-4 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Fat Loss</p>
                    <p className="text-2xl font-serif text-brand-ink font-bold">{results.fatLossCalories.toLocaleString()}</p>
                    <p className="text-[10px] text-brand-muted/60 mt-0.5">cal/day · ~0.5 kg/week</p>
                  </div>
                  <div className="bg-white border border-brand-border/30 rounded-2xl p-4 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Fast Fat Loss</p>
                    <p className="text-2xl font-serif text-brand-ink font-bold">{results.aggressiveLossCalories.toLocaleString()}</p>
                    <p className="text-[10px] text-brand-muted/60 mt-0.5">cal/day · ~1 kg/week</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 bg-brand-warm rounded-xl py-3 px-4">
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

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => goTo('explain')}
                  className="w-full bg-brand-sage text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center justify-center gap-2 mt-2">
                  What Do These Numbers Mean? <ChevronRight size={15} />
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
                <h2 className="text-xl font-serif text-brand-ink">What This Means For You</h2>
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
              <h2 className="text-2xl font-serif text-brand-ink mb-3 leading-tight">You Know Your Numbers.<br />Now Get Your <span className="text-brand-sage italic">Personalized Plan</span></h2>
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
                <h2 className="text-xl font-serif text-brand-ink">Quick Questions</h2>
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
                <h2 className="text-xl font-serif text-brand-ink">Your AI Personalized Plan</h2>
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
                <h2 className="text-xl font-serif text-brand-ink">Recommended For You</h2>
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

      {/* ===== FAQ (always visible) ===== */}
      <section className="max-w-lg mx-auto px-4 md:px-0 pb-16">
        <div className="text-center mb-8 mt-4">
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3">FAQ</span>
          <h2 className="text-2xl font-serif text-brand-ink">Frequently Asked Questions</h2>
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
    </main>
  );
}
