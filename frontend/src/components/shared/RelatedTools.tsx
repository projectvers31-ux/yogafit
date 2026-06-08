import { Link } from 'react-router-dom';
import {
  Calculator, Heart, Target, Utensils, Droplets, Flame, Scale, Activity
} from 'lucide-react';

const allTools = [
  { icon: Calculator, title: 'TDEE Calculator', path: '/calculators/tdee-calculator', desc: 'Find your total daily energy expenditure' },
  { icon: Heart, title: 'BMR Calculator', path: '/calculators/bmr-calculator', desc: 'Calculate your basal metabolic rate' },
  { icon: Target, title: 'Calorie Deficit', path: '/calculators/calorie-deficit-calculator', desc: 'Set a safe calorie deficit for weight loss' },
  { icon: Utensils, title: 'Macro Calculator', path: '/calculators/macro-calculator', desc: 'Get your protein, carb, and fat targets' },
  { icon: Scale, title: 'Ideal Weight', path: '/calculators/ideal-weight-calculator', desc: 'See your healthy weight range' },
  { icon: Activity, title: 'Body Fat', path: '/calculators/body-fat-calculator', desc: 'Estimate your body fat percentage' },
  { icon: Droplets, title: 'Water Intake', path: '/calculators/water-intake-calculator', desc: 'Find your daily water target' },
  { icon: Flame, title: 'Protein Calculator', path: '/calculators/protein-calculator', desc: 'Calculate your daily protein needs' },
];

const anchorTexts: Record<string, string[]> = {
  'TDEE Calculator': [
    'find out how many calories you need daily',
    'calculate your total daily energy expenditure',
    'get your personalized calorie number',
  ],
  'BMR Calculator': [
    'calculate your basal metabolic rate',
    'find out how many calories you burn at rest',
    'get your resting calorie number',
  ],
  'Calorie Deficit': [
    'set your safe calorie deficit',
    'find out how many calories to eat for weight loss',
    'calculate your weight loss calorie target',
  ],
  'Macro Calculator': [
    'get your personalized macro split',
    'find your protein, carb and fat targets',
    'calculate your perfect macro balance',
  ],
  'Ideal Weight': [
    'see your healthy weight range',
    'find your ideal body weight',
    'calculate your optimal weight target',
  ],
  'Body Fat': [
    'estimate your body fat percentage',
    'find out your body composition',
    'calculate your body fat level',
  ],
  'Water Intake': [
    'find your daily water target',
    'calculate how much water you need',
    'get your personalized hydration goal',
  ],
  'Protein Calculator': [
    'calculate your daily protein needs',
    'find out how much protein you need',
    'get your personalized protein target',
  ],
};

function getAnchorText(toolTitle: string, seed: number): string {
  const texts = anchorTexts[toolTitle];
  if (!texts || texts.length === 0) return `try the ${toolTitle}`;
  return texts[seed % texts.length];
}

export default function RelatedTools({
  currentTool,
  max = 3,
}: {
  currentTool: string;
  max?: number;
}) {
  const others = allTools.filter(t => t.title !== currentTool);
  const selected = others.slice(0, max);

  if (selected.length === 0) return null;

  return (
    <div className="mt-6 pt-5 border-t border-brand-border/10">
      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/60 mb-3">
        Also calculate:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {selected.map((tool, i) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="flex items-center gap-2.5 bg-brand-bone/40 hover:bg-brand-sage/5 rounded-xl p-3 transition-colors group border border-transparent hover:border-brand-sage/10"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs">
              <tool.icon size={14} className="text-brand-sage" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-brand-ink block leading-tight truncate">
                {tool.title}
              </span>
              <span className="text-[8px] text-brand-sage group-hover:underline block truncate">
                {getAnchorText(tool.title, i)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
