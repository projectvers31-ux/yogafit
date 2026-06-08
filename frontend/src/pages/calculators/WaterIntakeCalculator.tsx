import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import { Droplets } from 'lucide-react';

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(70);
  const [activityMinutes, setActivityMinutes] = useState(30);
  const [isHotClimate, setIsHotClimate] = useState(false);
  const [isBreastfeeding, setIsBreastfeeding] = useState(false);

  const water = useMemo(() => {
    let base = weight * 0.033;
    base += activityMinutes > 0 ? (activityMinutes / 30) * 0.35 : 0;
    if (isHotClimate) base += 0.3;
    if (isBreastfeeding) base += 0.7;
    return Math.round(base * 10) / 10;
  }, [weight, activityMinutes, isHotClimate, isBreastfeeding]);

  const calculatorModule = (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Droplets size={22} className="text-brand-sage" />
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Your Daily Water</h2>
        <p className="text-xs text-brand-muted mt-1">Based on your body and lifestyle</p>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Weight (kg)</label>
        <input type="number" min={20} max={350} step={0.1} value={weight} onChange={e => setWeight(Math.max(20, Math.min(350, Number(e.target.value) || 20)))}
          className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/80 mb-1.5 block">Daily Activity (minutes)</label>
        <input type="number" min={0} max={300} value={activityMinutes} onChange={e => setActivityMinutes(Math.max(0, Math.min(300, Number(e.target.value) || 0)))}
          className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all" />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isHotClimate} onChange={e => setIsHotClimate(e.target.checked)}
            className="accent-brand-sage w-4 h-4 rounded" />
          <span className="text-xs text-brand-ink">Hot or humid climate</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isBreastfeeding} onChange={e => setIsBreastfeeding(e.target.checked)}
            className="accent-brand-sage w-4 h-4 rounded" />
          <span className="text-xs text-brand-ink">Breastfeeding</span>
        </label>
      </div>
      <p className="text-[10px] text-brand-muted/50 text-center pt-2">Results update automatically.</p>
    </div>
  );

  const resultsModule = (
    <div className="animate-fadeIn bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
      <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Daily Water Target</p>
        <p className="text-4xl font-serif text-brand-sage font-bold">{water}L</p>
        <p className="text-xs text-brand-muted">≈ {Math.round(water / 0.25)} cups (250 ml)</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-brand-warm rounded-xl p-3 text-center">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Base (weight)</p>
          <p className="text-sm font-bold text-brand-ink">{(weight * 0.033).toFixed(1)}L</p>
        </div>
        <div className="bg-brand-warm rounded-xl p-3 text-center">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Extra factors</p>
          <p className="text-sm font-bold text-brand-ink">{isBreastfeeding || isHotClimate || activityMinutes > 0 ? 'Yes' : 'None'}</p>
        </div>
      </div>
      <div className="text-xs text-brand-muted leading-relaxed p-4 bg-brand-warm rounded-xl">
        <p>Proper hydration supports metabolism, energy, and skin health. Pair your water target with the right nutrition using our <Link to="/calculators/macro-calculator" className="text-brand-sage underline hover:no-underline">macro calculator</Link>.</p>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>Water is involved in almost every bodily function — digestion, temperature regulation, joint lubrication, nutrient transport, and even cognitive performance. For women, hydration needs fluctuate throughout the menstrual cycle, pregnancy, breastfeeding, and menopause. Estrogen and progesterone both affect fluid balance, which means your water needs are not static.</p>
      <p>During the luteal phase of your cycle, higher progesterone levels can lead to increased water retention. This does not mean you need less water. In fact, staying well-hydrated can help reduce bloating and support your body's natural detoxification processes. During menstruation, blood loss increases iron and fluid needs, making hydration even more critical.</p>
      <p>A common recommendation is 30 to 35 ml per kilogram of body weight, but this is a baseline. Activity, climate, and life stage all increase your requirements. This calculator accounts for these factors to give you a personalized daily water target. For overall nutritional balance alongside your hydration plan, check our <Link to="/calculators/macro-calculator" className="text-brand-sage underline hover:no-underline">macro calculator</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'Water Intake Calculator — Your Daily Hydration Target | FitFeky',
        description: 'Find your exact daily water intake based on weight, activity level, climate, and breastfeeding. Free & accurate.',
        canonicalPath: '/calculators/water-intake-calculator',
        h1: 'Water Intake Calculator for Women – How Much Water to Drink',
        intro: 'Staying hydrated is one of the simplest and most effective things you can do for your energy, metabolism, and skin. This water intake calculator gives you a personalized daily target based on your weight, activity level, climate, and whether you are breastfeeding.\n\nThe general recommendation of eight glasses a day is a starting point, but your actual needs depend on your body and lifestyle. This calculator factors all of that in so you get a number that is actually yours.\n\nCombine your hydration plan with balanced nutrition using our macro calculator.',
        keywords: ['water intake calculator', 'daily water intake calculator', 'how much water should i drink', 'hydration calculator women'],
        ogImage: '/og/calculators/water-intake-calculator.png',
      }}
      currentTool="Water Intake"
      productCards={[
        { id: 'hydro-flask-water-bottle-standard-mouth-21oz-insul', context: 'Stay hydrated throughout your day with this insulated bottle', position: 'after-results' },
        { id: 'nutribullet-pro-900-series-blender-single-serve', context: 'Blend hydrating smoothies packed with fruits and vegetables', position: 'below-bmi' },
      ]}
      blogArticle={{ slug: 'restorative-yoga-sleep', title: 'Restorative Yoga Poses for Deep Relaxation & Better Sleep', label: 'Understanding your hydration' }}
      smartCta={{ tool: 'water-intake', category: 'general', userValue: water }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="How Much Water Do Women Actually Need?"
      ctaTopic="Hydration"
      faqs={[
        { q: 'How much water should a woman drink daily?', a: 'The general guideline is 30 to 35 ml per kilogram of body weight. For a 70 kg woman, that is 2.1 to 2.45 liters per day. Activity, climate, and breastfeeding all increase this baseline.' },
        { q: 'Does hydration affect weight loss?', a: 'Yes. Water supports metabolism, helps control appetite, and improves exercise performance. Drinking water before meals has been shown to reduce calorie intake. Dehydration can also be mistaken for hunger.' },
        { q: 'Does water intake need to change during my menstrual cycle?', a: 'Yes. During the luteal phase, progesterone increases water retention, but hydration needs remain the same or increase slightly. During menstruation, fluid loss increases. Staying consistently hydrated throughout your cycle reduces bloating and fatigue.' },
        { q: 'Can I drink too much water?', a: 'Water intoxication (hyponatremia) is rare but possible if you drink extreme amounts in a short time, usually above 3 to 4 liters in a few hours. Stick to your target and spread it throughout the day.' },
        { q: 'How can I tell if I am drinking enough water?', a: 'The simplest test is urine color. Pale yellow or clear indicates good hydration, while dark yellow or amber means you need more water. Thirst is a late sign — do not wait until you feel thirsty to drink.' },
      ]}
    />
  );
}
