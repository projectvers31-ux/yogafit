import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, AlertTriangle } from 'lucide-react';
import CalculatorTemplate from '@/components/calculators/CalculatorTemplate';
import EmotionalMirror from '@/components/tools/EmotionalMirror';

const BMI_BLOGS = [
  { slug: 'lose-belly-fat-yoga', label: 'Read next', title: 'How to Lose Belly Fat in 2 Weeks with Yoga' },
  { slug: 'yoga-weight-loss-women-40', label: 'Related guide', title: 'Yoga for Weight Loss: Complete Guide for Women Over 40' },
];

function bmiCategory(bmi: number) {
  if (bmi < 18.5) {
    return {
      label: 'Underweight',
      color: 'text-sky-500',
      summary: 'Your BMI is below the healthy range. Focus on nourishment, strength, and energy.',
    };
  }
  if (bmi < 25) {
    return {
      label: 'Healthy Range',
      color: 'text-brand-sage',
      summary: 'Your BMI falls in the healthy range. The next step is maintaining your results and improving body composition.',
    };
  }
  if (bmi < 30) {
    return {
      label: 'Overweight',
      color: 'text-amber-600',
      summary: 'Your BMI is above the healthy range. Small, consistent changes can make a meaningful difference over time.',
    };
  }
  return {
    label: 'Obesity Range',
    color: 'text-rose-500',
    summary: 'Your BMI is in a higher range. A patient, sustainable approach is the best path forward.',
  };
}

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(165);

  const result = useMemo(() => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const category = bmiCategory(bmi);
    return { bmi: Math.round(bmi * 10) / 10, category };
  }, [weight, height]);

  const calculatorModule = (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Scale size={22} className="text-brand-sage" />
        </div>
        <h2 className="text-xl font-serif text-brand-ink">Check Your BMI</h2>
        <p className="text-xs text-brand-muted mt-1">Enter your height and weight to see where you fall</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            max={250}
            value={height}
            onChange={(e) => setHeight(Math.max(50, Math.min(250, Number(e.target.value) || 50)))}
            className="w-full bg-white border border-brand-border/40 rounded-xl px-4 py-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
          />
        </div>
      </div>

      <p className="text-[10px] text-brand-muted/50 text-center pt-2">Your BMI updates automatically as you type.</p>
    </div>
  );

  const resultsModule = (
    <div className="animate-fadeIn bg-white border border-brand-border rounded-3xl shadow-lg shadow-brand-sage/5 p-6 md:p-8">
      <div className="p-5 bg-brand-sage/5 rounded-2xl border border-brand-sage/10 text-center mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/60 mb-1">Your BMI</p>
        <p className="text-4xl font-serif text-brand-sage font-bold">{result.bmi}</p>
        <p className={`text-[11px] font-bold mt-1 ${result.category.color}`}>{result.category.label}</p>
      </div>
      <div className="bg-brand-warm rounded-xl p-4 text-sm text-brand-muted leading-relaxed mb-4">
        <p>{result.category.summary}</p>
      </div>
      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
        <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-500" />
        <p>BMI is a screening tool, not a diagnosis. It does not measure muscle mass, body fat, or fat distribution.</p>
      </div>
    </div>
  );

  const educationContent = (
    <>
      <p>BMI, or body mass index, is a quick screening formula that compares your weight to your height. It is useful because it gives a fast signal about whether your weight may be outside a healthy range. But BMI does not tell the full story. It does not measure muscle, bone density, or where your body stores fat.</p>
      <p>That is why BMI works best as a starting point. If your BMI is outside the healthy range, use it as a prompt to look deeper at your body composition, nutrition habits, and movement routine. If your BMI is healthy, your next goal may be improving energy, strength, or body composition rather than changing the scale.</p>
      <p>For a more complete picture, compare this result with your <Link to="/body-fat-calculator" className="text-brand-sage underline hover:no-underline">body fat calculator</Link> and <Link to="/ideal-weight-calculator" className="text-brand-sage underline hover:no-underline">ideal weight calculator</Link>. You can also explore the <Link to="/nutrition-calculator" className="text-brand-sage underline hover:no-underline">nutrition calculator</Link> to match your food intake to your goal.</p>
      <p>Recommended reading: <Link to={`/blog/${BMI_BLOGS[0].slug}`} className="text-brand-sage underline hover:no-underline">{BMI_BLOGS[0].title}</Link> and <Link to={`/blog/${BMI_BLOGS[1].slug}`} className="text-brand-sage underline hover:no-underline">{BMI_BLOGS[1].title}</Link>.</p>
    </>
  );

  return (
    <CalculatorTemplate
      seo={{
        title: 'BMI Calculator — Check Your Body Mass Index in Seconds | FitFeky',
        description: 'Check your body mass index and see what the number means. Free BMI calculator for women with instant results and practical next steps.',
        canonicalPath: '/bmi-calculator',
        h1: 'BMI Calculator for Women — Check Your Body Mass Index',
        intro: 'Use your height and weight to get a quick BMI reading, understand the category you fall into, and decide what to do next.',
        keywords: ['bmi calculator', 'body mass index calculator', 'bmi for women', 'calculate bmi'],
        ogImage: '/og/calculators/body-fat-calculator.png',
      }}
      emotionalMirror={
        <EmotionalMirror
          items={[
            "You want a quick answer without a complicated formula",
            'You are not sure whether your weight is actually outside a healthy range',
            'You want to know what the number means, not just the number itself',
          ]}
        />
      }
      currentTool="BMI Calculator"
      blogArticle={{ slug: BMI_BLOGS[0].slug, title: BMI_BLOGS[0].title, label: BMI_BLOGS[0].label }}
      calculatorModule={calculatorModule}
      resultsModule={resultsModule}
      educationContent={educationContent}
      educationTitle="What Does BMI Mean for Women?"
      faqs={[
        {
          q: 'What is BMI?',
          a: 'BMI stands for body mass index. It is a screening formula that compares weight and height to estimate whether you fall into an underweight, healthy, overweight, or obesity range.',
        },
        {
          q: 'Is BMI accurate for women?',
          a: 'BMI is useful as a quick screening tool, but it is not fully accurate because it does not account for muscle mass, body fat distribution, or bone density. Athletic women can have a higher BMI without having excess body fat.',
        },
        {
          q: 'What is a healthy BMI range?',
          a: 'For most adults, a BMI between 18.5 and 24.9 is considered the healthy range. A BMI under 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above is in the obesity range.',
        },
        {
          q: 'Should I use BMI alone to judge my health?',
          a: 'No. BMI is best used alongside body fat percentage, waist measurements, energy levels, and how you feel day to day. The body fat calculator and ideal weight calculator provide a more complete picture.',
        },
        {
          q: 'What should I do if my BMI is high?',
          a: 'Start with small, sustainable changes like walking more, eating more protein, and reducing ultra-processed foods. Then use the calorie calculator and nutrition calculator to build a plan that fits your life.',
        },
      ]}
      ctaTopic="BMI"
      productCards={[
        {
          id: 'renpho-smart-scale-for-body-weight-bluetooth-13-me',
          context: 'Track more than BMI with a smart scale that also estimates body composition',
          position: 'after-results',
        },
      ]}
    />
  );
}
