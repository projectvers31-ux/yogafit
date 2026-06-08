import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import { Heart } from 'lucide-react';

export default function BMRCalculator() {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(165);

  const bmr = useMemo(() => {
    const base = gender === 'female'
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5;
    return Math.round(base);
  }, [age, gender, weight, height]);

  const calculatorModule = (
    <>
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Heart size={22} className="text-brand-sage" />
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Enter Your Details</h2>
        <p className="text-xs text-brand-muted mt-1">Calculated using the Mifflin-St Jeor equation</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Age</label>
            <input type="number" min={10} max={100} value={age}
              onChange={e => setAge(Math.max(10, Math.min(100, Number(e.target.value) || 10)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Gender</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['female', 'male'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${gender === g ? 'bg-brand-sage text-white border-brand-sage' : 'bg-white text-brand-muted border-brand-border/30'}`}>
                  {g === 'female' ? '♀' : '♂'} {g}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Weight (kg)</label>
            <input type="number" min={20} max={350} step={0.1} value={weight}
              onChange={e => setWeight(Math.max(20, Math.min(350, Number(e.target.value) || 20)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Height (cm)</label>
            <input type="number" min={50} max={300} value={height}
              onChange={e => setHeight(Math.max(50, Math.min(300, Number(e.target.value) || 50)))}
              className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
          </div>
        </div>
        <p className="text-[10px] text-brand-muted/50 text-center pt-2">
          Numbers update automatically as you type.
        </p>
      </div>
    </>
  );

  const resultsModule = (
    <div className="animate-fadeIn bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
      <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Your Basal Metabolic Rate</p>
        <p className="text-4xl font-serif text-brand-sage font-bold">{bmr.toLocaleString()}</p>
        <p className="text-[10px] text-brand-muted/50 mt-1">calories per day at complete rest</p>
      </div>
      <div className="text-xs text-brand-muted leading-relaxed space-y-2 p-4 bg-brand-warm rounded-xl">
        <p>This is what your body burns just to stay alive — breathing, heartbeat, cell repair, and brain function. It does not include any walking, exercise, or daily movement.</p>
        <p>To find your <strong>total daily calories</strong> including all activity, use our <Link to="/calculators/tdee-calculator" className="text-brand-sage underline hover:no-underline">TDEE calculator</Link>.</p>
      <p className="mt-2">Once you know your BMR, create a <Link to="/calculators/calorie-deficit-calculator" className="text-brand-sage underline hover:no-underline">calorie deficit</Link> for weight loss or use our <Link to="/calculators/macro-calculator" className="text-brand-sage underline hover:no-underline">macro calculator</Link> to set your daily protein, carbs, and fat targets.</p>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>
        Your basal metabolic rate (BMR) is the number of calories your body needs to perform its most basic life-sustaining functions. Think of it as the energy your body burns if you stayed in bed all day — no walking, no eating, no thinking hard. It accounts for roughly 60 to 75 percent of your total daily calorie burn, making it the single largest component of your energy expenditure.
      </p>
      <p>
        For women, BMR is influenced by several factors that change throughout life. Muscle tissue burns more calories at rest than fat tissue, which is why two women at the same weight can have different BMRs. Age also plays a role — BMR naturally declines by about 1 to 2 percent per decade after age 20, largely due to gradual muscle loss. Hormonal fluctuations during the menstrual cycle can cause small shifts in resting energy expenditure as well.
      </p>
      <p>
        Knowing your BMR gives you a powerful baseline. Once you understand what your body needs at complete rest, you can build your calorie strategy from there — adding the calories you burn through movement, digestion, and daily activity to reach your total energy needs. This is why BMR is the foundation of every accurate nutrition plan.
      </p>
      <p>From here, explore related calculators to build your complete picture: <Link to="/calculators/tdee-calculator" className="text-brand-sage underline hover:no-underline">TDEE</Link>, <Link to="/calculators/calorie-deficit-calculator" className="text-brand-sage underline hover:no-underline">calorie deficit</Link>, <Link to="/calculators/macro-calculator" className="text-brand-sage underline hover:no-underline">macros</Link>, <Link to="/calculators/body-fat-calculator" className="text-brand-sage underline hover:no-underline">body fat</Link>, <Link to="/calculators/ideal-weight-calculator" className="text-brand-sage underline hover:no-underline">ideal weight</Link>, <Link to="/calculators/protein-calculator" className="text-brand-sage underline hover:no-underline">protein</Link>, and <Link to="/calculators/water-intake-calculator" className="text-brand-sage underline hover:no-underline">water intake</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'BMR Calculator for Women – Basal Metabolic Rate | FitFeky',
        description: 'Free BMR calculator for women to calculate your basal metabolic rate. Find out how many calories your body burns at rest for weight management.',
        canonicalPath: '/calculators/bmr-calculator',
        h1: 'BMR Calculator for Women – Basal Metabolic Rate',
        intro: 'Your BMR (basal metabolic rate) is the number of calories your body burns at complete rest — just breathing, keeping your heart beating, and staying alive. It is the foundation of every calorie calculation.\n\nThis BMR calculator uses the Mifflin-St Jeor equation, the most clinically validated formula for estimating resting metabolism. Enter your age, gender, weight, and height to learn your BMR instantly.\n\nOnce you know your BMR, you can add your activity calories to find your true daily needs.',
      }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Is BMR and Why Does It Matter for Women?"
      ctaTopic="BMR"
      faqs={[
        {
          q: 'What is the average BMR for a woman?',
          a: 'The average BMR for adult women falls between 1,200 and 1,600 calories per day. This varies based on age, muscle mass, height, and hormonal factors. A younger, taller, or more muscular woman will typically have a higher BMR.',
        },
        {
          q: 'How is BMR different from TDEE?',
          a: 'BMR is your calorie burn at complete rest. TDEE (total daily energy expenditure) includes BMR plus all movement — walking, exercise, digestion, and daily activities. TDEE is always higher than BMR and is the number you use for weight management.',
        },
        {
          q: 'Can I increase my BMR?',
          a: 'Yes. Building lean muscle through strength training and yoga is the most effective way to raise your BMR over time. Muscle tissue burns more calories at rest than fat tissue. Eating enough protein and getting quality sleep also support a healthy metabolism.',
        },
        {
          q: 'How accurate is this BMR calculator?',
          a: 'The Mifflin-St Jeor equation used here is about 70-80 percent accurate for most women. It is the most widely recommended formula by dietitians and clinical researchers. Use your result as a starting point and adjust based on your real-world progress.',
        },
        {
          q: 'Does BMR change during my menstrual cycle?',
          a: 'Yes. Some research suggests BMR can increase slightly during the luteal phase (the week before your period) due to hormonal shifts. The change is usually small — around 5 to 10 percent — but it can affect hunger and energy levels.',
        },
      ]}
    />
  );
}
