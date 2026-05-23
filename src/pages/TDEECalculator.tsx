import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator, ArrowRight, Check, ChevronRight, Copy,
  Dumbbell, Home, Sparkles, Target, Zap, Scale, Ruler,
  Heart, Clock, Activity, Brain, BookOpen, ShoppingBag
} from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';
import { breadcrumbSchema } from '@/lib/seo';
import SafeImage from '@/components/ui/SafeImage';
import { productList } from '@/lib/products';
import type { Product } from '@/lib/products';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'maintain' | 'lose' | 'fast_loss';
type WorkoutPreference = 'gym' | 'home' | 'mixed';
type Pace = 'fast' | 'sustainable';
type Focus = 'diet' | 'workout';

interface CalculatorInputs {
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: Goal;
}

interface TDEEResults {
  bmr: number;
  tdee: number;
  maintainCalories: number;
  fatLossCalories: number;
  aggressiveLossCalories: number;
  proteinGrams: number;
  bmi: number;
  bmiCategory: string;
}

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (office job, no exercise)',
  light: 'Light (1-3 days/week)',
  moderate: 'Moderate (3-5 days/week)',
  active: 'Active (6-7 days/week)',
  very_active: 'Very Active (athlete/physical job)',
};

const activityFactors: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

function calculateTDEE(inputs: CalculatorInputs): TDEEResults {
  const { age, gender, weight, height, activityLevel, goal } = inputs;
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const tdee = Math.round(bmr * activityFactors[activityLevel]);
  const maintainCalories = tdee;
  const fatLossCalories = Math.round(tdee - 500);
  const aggressiveLossCalories = Math.round(tdee - 1000);
  const proteinGrams = Math.round(weight * 2.0);
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  let bmiCategory = '';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 25) bmiCategory = 'Normal';
  else if (bmi < 30) bmiCategory = 'Overweight';
  else if (bmi < 35) bmiCategory = 'Obese Class I';
  else bmiCategory = 'Obese Class II';

  return {
    bmr: Math.round(bmr),
    tdee,
    maintainCalories,
    fatLossCalories,
    aggressiveLossCalories,
    proteinGrams,
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
  };
}

function generateInsights(inputs: CalculatorInputs, results: TDEEResults) {
  const deficit = results.tdee - results.fatLossCalories;
  const weeklyLoss = (deficit * 7) / 7700;
  const aggressiveWeeklyLoss = ((results.tdee - results.aggressiveLossCalories) * 7) / 7700;

  let strategy: string;
  if (inputs.goal === 'fast_loss') {
    strategy = 'High Protein / Low Carb';
  } else if (inputs.goal === 'lose') {
    strategy = 'Balanced Macros (40% protein, 30% carbs, 30% fat)';
  } else {
    strategy = 'Balanced Maintenance';
  }

  let trainingRec: string;
  if (inputs.goal === 'fast_loss' || inputs.goal === 'lose') {
    trainingRec = 'Mixed (3 strength + 2 cardio sessions weekly)';
  } else {
    trainingRec = 'Moderate (3-4 full body sessions weekly)';
  }

  let bodyProfile = '';
  if (results.bmi < 18.5) {
    bodyProfile = 'Your BMI suggests you may be underweight. Focus on nutrient-dense calories and strength training to build lean mass.';
  } else if (results.bmi < 25) {
    bodyProfile = 'You are in a healthy weight range. Focus on body recomposition — build muscle while shedding fat through smart nutrition and consistent training.';
  } else if (results.bmi < 30) {
    bodyProfile = 'Your BMI indicates overweight. A moderate calorie deficit combined with strength training will produce steady, sustainable fat loss.';
  } else {
    bodyProfile = 'Your BMI indicates obesity. Start with a moderate deficit and focus on consistency over intensity. Small daily habits create massive transformation.';
  }

  return {
    bodyProfile,
    deficit,
    weeklyLoss: Math.round(weeklyLoss * 100) / 100,
    aggressiveWeeklyLoss: Math.round(aggressiveWeeklyLoss * 100) / 100,
    strategy,
    trainingRec,
  };
}

function getRecommendedProductsByGoal(goal: Goal, preference: WorkoutPreference): Product[] {
  const filtered = productList.filter(p => {
    const isFatLoss = p.category === 'KETO' || p.category === 'FITNESS';
    const isYoga = p.category === 'YOGA';
    const isGlow = p.category === 'GLOW';
    if (goal === 'maintain') return isYoga || isGlow;
    if (preference === 'gym') return p.category === 'FITNESS' || p.category === 'KETO';
    if (preference === 'home') return isYoga || isGlow;
    return isFatLoss || isYoga;
  });
  return filtered.slice(0, 3);
}

const inputClasses = "w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all appearance-none";
const labelClasses = "text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block";
const selectClasses = "w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all appearance-none cursor-pointer";

const activityEmojis: Record<ActivityLevel, string> = {
  sedentary: '🪑',
  light: '🚶',
  moderate: '🏃',
  active: '💪',
  very_active: '🏆',
};

export default function TDEECalculator() {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<Gender>('female');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(165);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('lose');
  const [calculated, setCalculated] = useState(false);

  const [workoutPref, setWorkoutPref] = useState<WorkoutPreference | null>(null);
  const [daysPerWeek, setDaysPerWeek] = useState<number | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);
  const [focus, setFocus] = useState<Focus | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  const [copied, setCopied] = useState(false);

  const displayWeight = weightUnit === 'kg' ? weight : Math.round(weight * 2.20462);
  const displayHeight = heightUnit === 'cm' ? height : Math.round(height / 30.48 * 10) / 10;

  const kgWeight = weightUnit === 'kg' ? weight : Math.round(displayWeight / 2.20462);
  const cmHeight = heightUnit === 'cm' ? height : Math.round(displayHeight * 30.48);

  const displayActivityLabels: Record<ActivityLevel, string> = {
    sedentary: `${activityEmojis.sedentary} Sedentary`,
    light: `${activityEmojis.light} Light`,
    moderate: `${activityEmojis.moderate} Moderate`,
    active: `${activityEmojis.active} Active`,
    very_active: `${activityEmojis.very_active} Very Active`,
  };

  const inputs: CalculatorInputs = useMemo(() => ({
    age, gender, weight: kgWeight, height: cmHeight, activityLevel, goal,
  }), [age, gender, kgWeight, cmHeight, activityLevel, goal]);

  const results = useMemo(() => calculateTDEE(inputs), [inputs]);
  const insights = useMemo(() => generateInsights(inputs, results), [inputs, results]);

  const recommendedProducts = useMemo(() => {
    const pref = workoutPref || 'mixed';
    return getRecommendedProductsByGoal(goal, pref);
  }, [goal, workoutPref]);

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://fitfeky.com/' },
    { name: 'Fitness Tools', url: 'https://fitfeky.com/fitness-tools' },
    { name: 'TDEE Calculator', url: 'https://fitfeky.com/calculators/tdee-calculator' },
  ]);

  const howManyDays = [3, 4, 5, 6];
  const allQuestionsAnswered = workoutPref && daysPerWeek && pace && focus;

  const handleCalculate = () => setCalculated(true);

  const handleReset = () => {
    setCalculated(false);
    setQuizDone(false);
    setWorkoutPref(null);
    setDaysPerWeek(null);
    setPace(null);
    setFocus(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCalories = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  return (
    <main id="main-content" className="min-h-screen bg-brand-bone font-sans">
      <SEOHelmet
        title="TDEE Calculator – Calculate Your Daily Calories for Weight Loss | FitFeky"
        description="Use our free TDEE calculator to find your daily calorie needs for weight loss, fat loss, or maintenance. Get AI-powered insights and personalized recommendations."
        canonicalPath="/calculators/tdee-calculator"
        ldJson={[
          breadcrumb,
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'TDEE Calculator',
            url: 'https://fitfeky.com/calculators/tdee-calculator',
            description: 'Calculate your Total Daily Energy Expenditure and get personalized fat loss recommendations.',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'All',
          },
        ]}
      />

      {/* ===== HERO ===== */}
      <section className="py-16 md:py-24 px-4 md:px-12 bg-gradient-to-b from-brand-sage/5 via-white to-brand-bone border-b border-brand-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-5">
              <Calculator size={12} /> Free Fitness Tool
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-brand-ink mb-5 leading-tight">
              TDEE Calculator – Calculate Your{' '}
              <span className="text-brand-sage italic">Daily Calories</span> for Weight Loss
            </h1>
            <p className="text-base md:text-lg text-brand-muted max-w-3xl mx-auto leading-relaxed">
              Your Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns each day —
              including resting metabolism, digestion, and physical activity. Knowing your TDEE is the first step
              to effective weight loss. This calorie calculator uses the Mifflin-St Jeor formula to estimate your
              daily calorie needs, then shows you the exact deficit required for fat loss. Whether you are looking
              for a fat loss calculator or just want to understand your maintenance calories, this tool gives you
              data-driven answers in seconds. Stop guessing — start tracking with precision.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-brand-muted/60">
              <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-sage" /> Science-based formula</span>
              <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-sage" /> AI personalized insights</span>
              <span className="flex items-center gap-1.5"><Check size={12} className="text-brand-sage" /> Free — no signup needed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CALCULATOR SECTION ===== */}
      <section id="calculator" className="max-w-6xl mx-auto px-4 md:px-12 -mt-8 relative z-10">
        <div className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 overflow-hidden">
          <div className="p-6 md:p-10">
            {!calculated ? (
              /* ---- FORM ---- */
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center">
                    <Calculator size={18} className="text-brand-sage" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif text-brand-ink">Enter Your Details</h2>
                    <p className="text-xs text-brand-muted">We use the Mifflin-St Jeor equation for accuracy</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Age */}
                  <div>
                    <label className={labelClasses}>Age</label>
                    <div className="relative">
                      <input type="number" min={10} max={100} value={age} onChange={e => setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10)))}
                        className={`${inputClasses} pr-12`} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/60 font-bold uppercase tracking-widest">years</span>
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className={labelClasses}>Gender</label>
                    <div className="flex gap-2">
                      {(['female', 'male'] as Gender[]).map(g => (
                        <button key={g} onClick={() => setGender(g)}
                          className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                            gender === g
                              ? 'bg-brand-sage text-white border-brand-sage shadow-md shadow-brand-sage/20'
                              : 'bg-white text-brand-muted border-brand-border/40 hover:border-brand-sage/40'
                          }`}>
                          {g === 'female' ? '♀ Female' : '♂ Male'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <label className={labelClasses}>Weight</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input type="number" min={20} max={350} step={0.1}
                          value={displayWeight} onChange={e => {
                            const val = Math.max(20, Math.min(350, Number(e.target.value) || 20));
                            if (weightUnit === 'kg') setWeight(val);
                            else setWeight(Math.round(val / 2.20462));
                          }}
                          className={`${inputClasses} pr-14`} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/60 font-bold uppercase tracking-widest">{weightUnit}</span>
                      </div>
                      <button onClick={() => setWeightUnit(prev => prev === 'kg' ? 'lbs' : 'kg')}
                        className="px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-brand-muted border border-brand-border/40 hover:border-brand-sage/40 transition-all bg-white">
                        Switch
                      </button>
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <label className={labelClasses}>Height</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input type="number" min={50} max={300}
                          value={displayHeight} onChange={e => {
                            const val = Math.max(50, Math.min(300, Number(e.target.value) || 50));
                            if (heightUnit === 'cm') setHeight(val);
                            else setHeight(Math.round(val * 30.48));
                          }}
                          className={`${inputClasses} pr-12`} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-brand-muted/60 font-bold uppercase tracking-widest">{heightUnit}</span>
                      </div>
                      <button onClick={() => setHeightUnit(prev => prev === 'cm' ? 'ft' : 'cm')}
                        className="px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-brand-muted border border-brand-border/40 hover:border-brand-sage/40 transition-all bg-white">
                        Switch
                      </button>
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div>
                    <label className={labelClasses}>Activity Level</label>
                    <select value={activityLevel} onChange={e => setActivityLevel(e.target.value as ActivityLevel)}
                      className={selectClasses}>
                      {(['sedentary', 'light', 'moderate', 'active', 'very_active'] as ActivityLevel[]).map(a => (
                        <option key={a} value={a}>{displayActivityLabels[a]}</option>
                      ))}
                    </select>
                  </div>

                  {/* Goal */}
                  <div>
                    <label className={labelClasses}>Your Goal</label>
                    <div className="flex gap-2">
                      {([{ v: 'maintain', l: 'Maintain' }, { v: 'lose', l: 'Lose Weight' }, { v: 'fast_loss', l: 'Fast Fat Loss' }] as const).map(g => (
                        <button key={g.v} onClick={() => setGoal(g.v as Goal)}
                          className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                            goal === g.v
                              ? 'bg-brand-sage text-white border-brand-sage shadow-md shadow-brand-sage/20'
                              : 'bg-white text-brand-muted border-brand-border/40 hover:border-brand-sage/40'
                          }`}>
                          {g.l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleCalculate}
                    className="w-full sm:w-auto bg-brand-sage text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center justify-center gap-2">
                    <Calculator size={16} /> Calculate Your TDEE
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* ---- RESULTS ---- */
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center">
                      <Zap size={18} className="text-brand-sage" />
                    </div>
                    <div>
                      <h2 className="text-lg font-serif text-brand-ink">Your Results</h2>
                      <p className="text-xs text-brand-muted">Personalized for your body metrics</p>
                    </div>
                  </div>
                  <button onClick={handleReset}
                    className="text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-sage transition-colors border border-brand-border/40 px-4 py-2 rounded-full">
                    Recalculate
                  </button>
                </div>

                {/* Calorie Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white border border-brand-border/40 rounded-2xl p-5 text-center hover:shadow-sm transition-shadow">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Maintenance</p>
                    <p className="text-3xl md:text-4xl font-serif text-brand-ink font-bold">{results.maintainCalories.toLocaleString()}</p>
                    <p className="text-[10px] text-brand-muted/60 mt-1">calories/day</p>
                    <button onClick={() => handleCopyCalories(`${results.maintainCalories} calories`)}
                      className="mt-2 text-[9px] font-bold uppercase tracking-widest text-brand-sage hover:text-[#243D31] transition-colors inline-flex items-center gap-1">
                      {copied ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                    </button>
                  </div>
                  <div className="bg-brand-sage/5 border border-brand-sage/20 rounded-2xl p-5 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-sage/80 mb-1">Fat Loss</p>
                    <p className="text-3xl md:text-4xl font-serif text-brand-ink font-bold">{results.fatLossCalories.toLocaleString()}</p>
                    <p className="text-[10px] text-brand-muted/60 mt-1">calories/day (≈0.5 kg/week)</p>
                  </div>
                  <div className="bg-white border border-brand-border/40 rounded-2xl p-5 text-center hover:shadow-sm transition-shadow">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Aggressive Fat Loss</p>
                    <p className="text-3xl md:text-4xl font-serif text-brand-ink font-bold">{results.aggressiveLossCalories.toLocaleString()}</p>
                    <p className="text-[10px] text-brand-muted/60 mt-1">calories/day (≈1 kg/week)</p>
                  </div>
                </div>

                {/* Secondary metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-brand-warm rounded-xl px-4 py-3 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">BMR</p>
                    <p className="text-lg font-serif text-brand-ink font-bold">{results.bmr.toLocaleString()}</p>
                  </div>
                  <div className="bg-brand-warm rounded-xl px-4 py-3 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">BMI</p>
                    <p className="text-lg font-serif text-brand-ink font-bold">{results.bmi}</p>
                  </div>
                  <div className="bg-brand-warm rounded-xl px-4 py-3 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">Category</p>
                    <p className="text-sm font-serif text-brand-ink font-bold">{results.bmiCategory}</p>
                  </div>
                  <div className="bg-brand-warm rounded-xl px-4 py-3 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">Protein</p>
                    <p className="text-lg font-serif text-brand-ink font-bold">{results.proteinGrams}g</p>
                    <p className="text-[9px] text-brand-muted/60">per day</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===== AI INSIGHTS ===== */}
      {calculated && (
        <section className="max-w-6xl mx-auto px-4 md:px-12 mt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-gradient-to-br from-brand-sage/5 to-brand-blush/30 border border-brand-border rounded-3xl p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center">
                  <Brain size={18} className="text-brand-sage" />
                </div>
                <div>
                  <h2 className="text-lg font-serif text-brand-ink">AI-Powered Analysis</h2>
                  <p className="text-xs text-brand-muted">Personalized insights based on your body data</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-brand-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale size={14} className="text-brand-sage" />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-sage">Body Profile</h3>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed">{insights.bodyProfile}</p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-brand-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={14} className="text-brand-sage" />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-sage">Calorie Deficit</h3>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {goal === 'maintain'
                      ? 'You are in maintenance mode. Your current intake matches your expenditure. To build muscle, add 200-300 calories above maintenance.'
                      : `A daily deficit of ${insights.deficit} calories will help you lose approximately ${insights.weeklyLoss} kg per week. ${
                          goal === 'fast_loss'
                            ? `With aggressive targets, you could lose up to ${insights.aggressiveWeeklyLoss} kg weekly — but we recommend sustainable pacing for long-term success.`
                            : 'Sustainable fat loss is 0.5-1 kg per week. Stay consistent and adjust as you go.'
                        }`
                    }
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-brand-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={14} className="text-brand-sage" />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-sage">Strategy</h3>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    <span className="font-semibold text-brand-ink">Recommended: </span>{insights.strategy}.
                    Aim for {results.proteinGrams}g of protein daily to preserve muscle mass during your deficit.
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-brand-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell size={14} className="text-brand-sage" />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-sage">Training</h3>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    <span className="font-semibold text-brand-ink">Recommendation: </span>{insights.trainingRec}.
                    Combine resistance training to preserve muscle with cardio to increase your daily deficit.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== QUIZ INTEGRATION ===== */}
      {calculated && !quizDone && (
        <section className="max-w-6xl mx-auto px-4 md:px-12 mt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center">
                <Sparkles size={18} className="text-brand-sage" />
              </div>
              <div>
                <h2 className="text-lg font-serif text-brand-ink">Answer 4 Quick Questions</h2>
                <p className="text-xs text-brand-muted">Refine your personalized plan with AI-driven insights</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Q1: Workout Preference */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink mb-3">Do you prefer gym or home workouts?</p>
                <div className="flex gap-2">
                  {([{ v: 'gym', label: '🏋️ Gym', desc: 'Full equipment' }, { v: 'home', label: '🏠 Home', desc: 'No equipment' }, { v: 'mixed', label: '🔄 Mixed', desc: 'Both' }] as const).map(o => (
                    <button key={o.v} onClick={() => setWorkoutPref(o.v as WorkoutPreference)}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border text-center ${
                        workoutPref === o.v
                          ? 'bg-brand-sage text-white border-brand-sage shadow-md shadow-brand-sage/20'
                          : 'bg-white text-brand-muted border-brand-border/40 hover:border-brand-sage/40'
                      }`}>
                      <div className="text-sm">{o.label}</div>
                      <div className="text-[8px] opacity-60 mt-0.5">{o.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q2: Days per week */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink mb-3">How many days can you train?</p>
                <div className="flex gap-2">
                  {howManyDays.map(d => (
                    <button key={d} onClick={() => setDaysPerWeek(d)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${
                        daysPerWeek === d
                          ? 'bg-brand-sage text-white border-brand-sage shadow-md shadow-brand-sage/20'
                          : 'bg-white text-brand-muted border-brand-border/40 hover:border-brand-sage/40'
                      }`}>
                      {d}
                      <span className="block text-[8px] font-normal opacity-60">{d === 3 ? 'days' : 'days'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3: Pace */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink mb-3">Fast or sustainable fat loss?</p>
                <div className="flex gap-2">
                  {([{ v: 'fast', label: '⚡ Fast', desc: 'Quick results' }, { v: 'sustainable', label: '🌱 Sustainable', desc: 'Slow & steady' }] as const).map(o => (
                    <button key={o.v} onClick={() => setPace(o.v as Pace)}
                      className={`flex-1 py-4 rounded-xl text-xs font-bold transition-all border text-center ${
                        pace === o.v
                          ? 'bg-brand-sage text-white border-brand-sage shadow-md shadow-brand-sage/20'
                          : 'bg-white text-brand-muted border-brand-border/40 hover:border-brand-sage/40'
                      }`}>
                      <div className="text-sm">{o.label}</div>
                      <div className="text-[8px] opacity-60 mt-0.5">{o.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q4: Focus */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink mb-3">Diet plan or workout plan?</p>
                <div className="flex gap-2">
                  {([{ v: 'diet', label: '🥗 Diet', desc: 'Nutrition focus' }, { v: 'workout', label: '💪 Workout', desc: 'Exercise focus' }] as const).map(o => (
                    <button key={o.v} onClick={() => setFocus(o.v as Focus)}
                      className={`flex-1 py-4 rounded-xl text-xs font-bold transition-all border text-center ${
                        focus === o.v
                          ? 'bg-brand-sage text-white border-brand-sage shadow-md shadow-brand-sage/20'
                          : 'bg-white text-brand-muted border-brand-border/40 hover:border-brand-sage/40'
                      }`}>
                      <div className="text-sm">{o.label}</div>
                      <div className="text-[8px] opacity-60 mt-0.5">{o.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {allQuestionsAnswered && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 flex flex-col items-center gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setQuizDone(true)}
                    className="bg-brand-sage text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center gap-2">
                    <Sparkles size={16} /> Generate Your AI Plan
                  </motion.button>
                  <p className="text-[10px] text-brand-muted/60">We use your answers to personalize recommendations</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      {/* ===== RECOMMENDED PRODUCTS ===== */}
      {quizDone && (
        <section className="max-w-6xl mx-auto px-4 md:px-12 mt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={18} className="text-brand-sage" />
                </div>
                <div>
                  <h2 className="text-lg font-serif text-brand-ink">AI-Curated Recommendations</h2>
                  <p className="text-xs text-brand-muted">Based on your body data, goals, and preferences</p>
                </div>
              </div>
              <p className="text-sm text-brand-muted/80 mb-6 ml-[52px]">
                These products match your {goal === 'fast_loss' ? 'aggressive fat loss' : goal === 'lose' ? 'weight loss' : 'maintenance'} goal
                {workoutPref === 'gym' ? ' and gym preference' : workoutPref === 'home' ? ' and home workout preference' : ' and mixed training style'}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {recommendedProducts.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                    className="bg-brand-warm border border-brand-border/30 rounded-2xl p-5 hover:shadow-sm transition-all flex flex-col">
                    <SafeImage src={product.image} alt={product.title} className="w-full h-40 rounded-xl object-cover mb-4" width={400} height={160} />
                    <div className="flex-1">
                      <span className="inline-block px-2.5 py-1 bg-brand-sage/10 text-brand-sage text-[8px] font-bold uppercase tracking-widest rounded-full mb-2">
                        {product.category}
                      </span>
                      <h3 className="text-sm font-serif text-brand-ink mb-1 leading-snug">{product.title}</h3>
                      <p className="text-xs text-brand-muted leading-relaxed mb-3">{product.benefit}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-border/20">
                      <div>
                        {product.oldPrice > 0 && <span className="text-[10px] text-brand-muted/60 line-through block">${product.oldPrice}</span>}
                        <span className="text-sm font-bold text-brand-sage">${product.price}</span>
                      </div>
                      <a href={product.link} target="_blank" rel="noopener noreferrer sponsored"
                        className="bg-brand-sage text-white px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#243D31] transition-all inline-flex items-center gap-1">
                        Shop <ArrowRight size={10} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== QUIZ CTA (full quiz) ===== */}
      {quizDone && (
        <section className="max-w-6xl mx-auto px-4 md:px-12 mt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-brand-sage/10 to-brand-blush/30 border border-brand-sage/10 rounded-3xl p-8 md:p-12 text-center">
            <Sparkles size={32} className="text-brand-sage mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif text-brand-ink mb-3 leading-tight">
              Get Your Complete AI Fat Loss Plan
            </h2>
            <p className="text-sm md:text-base text-brand-muted max-w-2xl mx-auto mb-6 leading-relaxed">
              Your TDEE is just the beginning. Take our full 60-second quiz to unlock a complete
              personalized blueprint — including meal plans, workout routines, supplement stacks,
              and daily habit tracking tailored to YOUR unique body and lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/"
                className="bg-brand-sage text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all shadow-lg shadow-brand-sage/20 inline-flex items-center gap-2">
                Get Your AI Fat Loss Plan <ArrowRight size={14} />
              </Link>
              <Link to="/"
                className="bg-white text-brand-ink px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-sage hover:text-white transition-all border border-brand-border/40 inline-flex items-center gap-2">
                Unlock Personalized Fitness Blueprint
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* ===== INTERNAL LINKS ===== */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 mt-10 mb-10">
        <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-sage/10 rounded-xl flex items-center justify-center">
              <Activity size={18} className="text-brand-sage" />
            </div>
            <h2 className="text-lg font-serif text-brand-ink">Explore More Fitness Resources</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { to: '/workout-plans', label: 'Workout Plans', icon: <Dumbbell size={14} /> },
              { to: '/diet-plans', label: 'Diet Plans', icon: <BookOpen size={14} /> },
              { to: '/gym-guide', label: 'Gym Guide', icon: <Target size={14} /> },
              { to: '/yoga-guide', label: 'Yoga Guide', icon: <Heart size={14} /> },
              { to: '/fitness-tools', label: 'Fitness Tools', icon: <Activity size={14} /> },
              { to: '/blog', label: 'Wellness Blog', icon: <BookOpen size={14} /> },
              { to: '/shop', label: 'Shop Products', icon: <ShoppingBag size={14} /> },
              { to: '/about', label: 'About Us', icon: <Heart size={14} /> },
              { to: '/contact', label: 'Contact', icon: <Clock size={14} /> },
            ].map(link => (
              <Link key={link.to} to={link.to}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-muted bg-brand-warm border border-brand-border/20 hover:bg-brand-sage hover:text-white hover:border-brand-sage transition-all">
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="max-w-4xl mx-auto px-4 md:px-12 pb-20">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3">FAQ</span>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-ink">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              q: 'What is TDEE?',
              a: 'TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a day. It includes your basal metabolic rate (BMR), the thermic effect of food (digestion), and physical activity. Knowing your TDEE is the foundation of any effective weight loss or muscle-building plan.'
            },
            {
              q: 'How accurate is this calorie calculator?',
              a: 'This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate formula for estimating BMR in the general population. It is about 70-80% accurate for most people. For absolute precision, a clinical metabolic test is required. We recommend using this as a starting point and adjusting based on your real-world results.'
            },
            {
              q: 'Can I lose weight without going to the gym?',
              a: 'Absolutely. Weight loss is primarily driven by calorie deficit, not exercise. You can lose weight through nutrition alone. However, combining a calorie deficit with resistance training (even at home with bodyweight exercises) helps preserve muscle mass and improves body composition. Our home workout guides can help you get started with zero equipment.'
            },
            {
              q: 'What is a calorie deficit?',
              a: 'A calorie deficit occurs when you consume fewer calories than your body burns. For example, if your TDEE is 2,000 calories and you eat 1,500 calories, you have a 500-calorie deficit. This forces your body to use stored fat for energy, leading to weight loss. A deficit of 300-500 calories per day is considered sustainable for most women.'
            },
            {
              q: 'How much protein do I need daily?',
              a: 'For most active women, we recommend 1.6-2.2 grams of protein per kilogram of body weight. Our calculator estimates this based on your weight and goal. Protein is crucial for preserving muscle mass during a calorie deficit, supporting metabolism, and keeping you full between meals.'
            },
            {
              q: 'What is BMR and how is it different from TDEE?',
              a: 'BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest — just keeping your heart beating, lungs breathing, and organs functioning. TDEE includes BMR plus all your daily activity, exercise, and digestion. Think of BMR as the baseline and TDEE as your total daily burn.'
            },
            {
              q: 'Should I follow low carb or balanced macros?',
              a: 'It depends on your body and preferences. Low carb diets can be effective for rapid initial weight loss and blood sugar control, while balanced macros are more sustainable long-term. Our AI analysis recommends a strategy based on your goals and activity level. The best diet is the one you can stick with consistently.'
            },
          ].map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-brand-border/30 hover:border-brand-sage/20 transition-all overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                <h3 className="text-sm md:text-base font-medium text-brand-ink group-open:text-brand-sage transition-colors pr-4 text-left leading-snug">{faq.q}</h3>
                <ChevronRight size={16} className="text-brand-muted shrink-0 transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <div className="px-5 pb-4">
                <div className="h-px bg-brand-border/20 -mx-5 mb-3" />
                <p className="text-sm text-brand-muted leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
