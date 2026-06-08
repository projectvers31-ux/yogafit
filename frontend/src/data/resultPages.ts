export interface ResultCategory {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  summary: string;
  tips: string[];
}

export interface ToolResultConfig {
  tool: string;
  toolPath: string;
  categories: ResultCategory[];
}

export const resultPageConfigs: Record<string, ToolResultConfig> = {
  'tdee-calculator': {
    tool: 'TDEE Calculator',
    toolPath: '/calculators/tdee-calculator',
    categories: [
      {
        slug: 'sedentary',
        seoTitle: 'Sedentary TDEE Results — What It Means for You | FitFeky',
        seoDescription: 'See what your TDEE looks like with a sedentary activity level. Learn how to start burning more calories with no gym required.',
        h1: 'Your Sedentary TDEE — What It Means',
        summary: 'A sedentary TDEE means your daily calorie burn comes mostly from basic body functions, with very little movement. This is common for desk jobs and long sitting hours.',
        tips: [
          'Incorporate short walks every hour to increase daily burn',
          'Standing desk time can boost NEAT (non-exercise activity)',
          'Even 10 minutes of yoga increases your daily calorie spend',
        ],
      },
      {
        slug: 'lightly-active',
        seoTitle: 'Lightly Active TDEE Results — What It Means for You | FitFeky',
        seoDescription: 'Your TDEE with light activity. See how small daily movement like walking or yoga affects your calorie needs.',
        h1: 'Your Lightly Active TDEE — What It Means',
        summary: 'A lightly active TDEE includes 1-2 days of light exercise or walking. This is one of the most common categories for women with active lifestyles.',
        tips: [
          'Adding one more active day per week increases your TDEE significantly',
          'Walking 30 minutes per day adds roughly 150-200 calories to your burn',
          'Yoga and Pilates build muscle that raises your resting metabolism',
        ],
      },
      {
        slug: 'moderately-active',
        seoTitle: 'Moderately Active TDEE Results — What It Means for You | FitFeky',
        seoDescription: 'Your TDEE with moderate activity. Find out what your calorie target looks like with regular exercise 3-5 days per week.',
        h1: 'Your Moderately Active TDEE — What It Means',
        summary: 'A moderately active TDEE reflects 3-5 days of purposeful exercise per week. You have room to eat more while still making progress.',
        tips: [
          'Your higher TDEE gives you flexibility in your meal planning',
          'Focus on protein intake to support muscle repair after workouts',
          'This activity level is ideal for body recomposition',
        ],
      },
      {
        slug: 'very-active',
        seoTitle: 'Very Active TDEE Results — What It Means for You | FitFeky',
        seoDescription: 'Your TDEE with a very active lifestyle. See how intense daily exercise affects your calorie needs and nutrient requirements.',
        h1: 'Your Very Active TDEE — What It Means',
        summary: 'A very active TDEE means you exercise daily or do physically demanding work. Your body needs more fuel to perform and recover.',
        tips: [
          'Eat enough carbohydrates to fuel your workouts and recovery',
          'Your protein needs are higher — aim for the upper end of your range',
          'Rest days are essential for hormone balance and muscle repair',
        ],
      },
      {
        slug: 'extra-active',
        seoTitle: 'Extra Active TDEE Results — What It Means for You | FitFeky',
        seoDescription: 'Your TDEE with an extra active lifestyle. See how high-intensity daily training affects your calorie and nutrition goals.',
        h1: 'Your Extra Active TDEE — What It Means',
        summary: 'An extra active TDEE reflects elite-level training or physically intense work. Your body is burning significant calories and needs strategic nutrition.',
        tips: [
          'Post-workout nutrition timing matters more at this activity level',
          'Monitor energy levels and adjust intake if you feel depleted',
          'Consider working with a sports nutritionist for precise fueling',
        ],
      },
    ],
  },
  'bmr-calculator': {
    tool: 'BMR Calculator',
    toolPath: '/calculators/bmr-calculator',
    categories: [
      {
        slug: 'low',
        seoTitle: 'Low BMR Results — What It Means for You | FitFeky',
        seoDescription: 'A lower BMR means your body burns fewer calories at rest. Learn how to boost your metabolism naturally with strength training and nutrition.',
        h1: 'Your Low BMR — What It Means',
        summary: 'A BMR below 1,300 calories is considered low for most adult women. This typically relates to smaller body size, less muscle mass, or older age.',
        tips: [
          'Building muscle through resistance training is the most effective way to raise your BMR',
          'Eating enough protein supports muscle maintenance and metabolic health',
          'Sleep quality directly affects your resting metabolism',
        ],
      },
      {
        slug: 'average',
        seoTitle: 'Average BMR Results — What It Means for You | FitFeky',
        seoDescription: 'Your BMR falls in the average range. Find out how to use this number as your foundation for weight management.',
        h1: 'Your Average BMR — What It Means',
        summary: 'An average BMR for women falls between 1,300 and 1,600 calories. This is a healthy baseline that supports normal metabolic function.',
        tips: [
          'Use your BMR as the starting point for calculating your TDEE',
          'Maintain muscle mass to keep your BMR stable as you age',
          'Regular strength training helps preserve metabolic rate through menopause',
        ],
      },
      {
        slug: 'high',
        seoTitle: 'High BMR Results — What It Means for You | FitFeky',
        seoDescription: 'A higher BMR means your body burns more calories at rest. See how to leverage this for your fitness and nutrition goals.',
        h1: 'Your High BMR — What It Means',
        summary: 'A BMR above 1,600 calories is higher than average. This often correlates with more muscle mass, taller stature, or younger age.',
        tips: [
          'You have more calorie flexibility while still achieving your goals',
          'Prioritize protein to support your higher lean muscle mass',
          'Stay hydrated — higher metabolism requires more water',
        ],
      },
    ],
  },
  'calorie-deficit-calculator': {
    tool: 'Calorie Deficit Calculator',
    toolPath: '/calculators/calorie-deficit-calculator',
    categories: [
      {
        slug: 'mild',
        seoTitle: 'Mild Calorie Deficit Results — What It Means for You | FitFeky',
        seoDescription: 'A mild deficit of 250 calories per day. Learn how this gentle approach supports slow, sustainable weight loss without hunger.',
        h1: 'Your Mild Calorie Deficit — What It Means',
        summary: 'A mild deficit of 250 calories per day leads to about 0.25 kg of weight loss per week. This is the most sustainable approach for long-term results.',
        tips: [
          'This deficit is gentle enough to maintain energy levels and hormone balance',
          'Perfect for women who want slow, steady progress without feeling restricted',
          'Combine with light strength training to preserve muscle during fat loss',
        ],
      },
      {
        slug: 'moderate',
        seoTitle: 'Moderate Calorie Deficit Results — What It Means for You | FitFeky',
        seoDescription: 'A moderate deficit of 500 calories per day. See how this balanced approach delivers steady weight loss of about 0.5 kg per week.',
        h1: 'Your Moderate Calorie Deficit — What It Means',
        summary: 'A moderate deficit of 500 calories per day is the standard recommendation for healthy weight loss. You can expect to lose about 0.5 kg per week.',
        tips: [
          'This is the most researched and recommended deficit for women',
          'High protein intake is essential to prevent muscle loss',
          'Track your progress for 2 weeks and adjust based on results',
        ],
      },
      {
        slug: 'aggressive',
        seoTitle: 'Aggressive Calorie Deficit Results — What It Means for You | FitFeky',
        seoDescription: 'An aggressive deficit of 1,000 calories per day. Understand the risks and benefits of faster weight loss.',
        h1: 'Your Aggressive Calorie Deficit — What It Means',
        summary: 'An aggressive deficit of 1,000 calories is significant and should be approached with caution. It can lead to faster weight loss but may affect energy and hormone balance.',
        tips: [
          'Never go below 1,200 calories per day without medical supervision',
          'Monitor energy levels, mood, and menstrual cycle for any changes',
          'Consider this approach for short periods only — 2-4 weeks max',
        ],
      },
    ],
  },
  'macro-calculator': {
    tool: 'Macro Calculator',
    toolPath: '/calculators/macro-calculator',
    categories: [
      {
        slug: 'weight-loss',
        seoTitle: 'Weight Loss Macros Results — What It Means for You | FitFeky',
        seoDescription: 'Your personalized macros for weight loss. See your protein, carb, and fat targets to lose fat while preserving muscle.',
        h1: 'Your Weight Loss Macros — What It Means',
        summary: 'Your weight loss macros prioritize protein to preserve muscle during a calorie deficit while providing enough carbs for energy and fats for hormone health.',
        tips: [
          'Eat protein at every meal — 25-35g per meal is ideal',
          'Distribute carbs around your workouts for best energy use',
          'Don\'t cut fat too low; healthy fats support hormone production',
        ],
      },
      {
        slug: 'maintenance',
        seoTitle: 'Maintenance Macros Results — What It Means for You | FitFeky',
        seoDescription: 'Your personalized macros for weight maintenance. See how to balance protein, carbs, and fat to stay at your current weight.',
        h1: 'Your Maintenance Macros — What It Means',
        summary: 'Your maintenance macros provide balanced nutrition to sustain your current weight while supporting overall health and energy levels.',
        tips: [
          'Use this as an opportunity to build muscle through strength training',
          'Maintenance phases are ideal for improving your relationship with food',
          'Periodic check-ins every 4-6 weeks ensure your macros still fit',
        ],
      },
      {
        slug: 'muscle-tone',
        seoTitle: 'Muscle Tone Macros Results — What It Means for You | FitFeky',
        seoDescription: 'Your personalized macros for building muscle. See your increased protein and calorie targets for muscle growth and definition.',
        h1: 'Your Muscle Tone Macros — What It Means',
        summary: 'Your muscle tone macros provide extra calories and protein to support muscle growth while keeping fat gain minimal.',
        tips: [
          'The extra carbs fuel more intense workouts for better muscle stimulation',
          'Timing protein within 2 hours post-workout maximizes muscle synthesis',
          'Be patient — visible muscle definition takes 8-12 weeks of consistency',
        ],
      },
    ],
  },
  'ideal-weight-calculator': {
    tool: 'Ideal Weight Calculator',
    toolPath: '/calculators/ideal-weight-calculator',
    categories: [
      {
        slug: 'underweight',
        seoTitle: 'Underweight Results — What It Means for You | FitFeky',
        seoDescription: 'Your results indicate you may be underweight. Learn about healthy weight gain strategies and when to consult a healthcare provider.',
        h1: 'Your Ideal Weight Results — Underweight Range',
        summary: 'Your current weight falls below the healthy BMI range. This may be fine for some body types but could indicate a need for nutritional support.',
        tips: [
          'Focus on nutrient-dense foods rather than empty calories',
          'Strength training helps build muscle mass in a healthy way',
          'Consult a healthcare provider if you are unintentionally losing weight',
        ],
      },
      {
        slug: 'at-goal',
        seoTitle: 'At Goal Weight Results — What It Means for You | FitFeky',
        seoDescription: 'Your weight falls within the healthy range. See how to maintain your results with balanced nutrition and regular activity.',
        h1: 'Your Ideal Weight Results — You Are at Your Goal',
        summary: 'Your weight falls within the healthy BMI range of 18.5-24.9. Focus on maintaining while optimizing body composition and overall wellness.',
        tips: [
          'Shift focus from weight to body composition and how you feel',
          'Strength training at maintenance builds muscle and improves shape',
          'Enjoy the flexibility of eating at maintenance calories',
        ],
      },
      {
        slug: 'slightly-over',
        seoTitle: 'Slightly Overweight Results — What It Means for You | FitFeky',
        seoDescription: 'Your weight is slightly above the healthy range. Learn about small changes that can bring you closer to your goal weight.',
        h1: 'Your Ideal Weight Results — Slightly Over',
        summary: 'Your weight is slightly above the healthy BMI range. A modest adjustment of 5-10 percent of body weight can significantly improve health markers.',
        tips: [
          'A 200-300 calorie daily deficit can lead to steady, manageable weight loss',
          'Focus on whole foods and protein to stay satisfied while eating less',
          'Combine nutrition with consistent movement for best results',
        ],
      },
      {
        slug: 'far-from-goal',
        seoTitle: 'Far From Goal Weight Results — What It Means for You | FitFeky',
        seoDescription: 'Your weight is above the healthy range. Learn about sustainable approaches to reach a healthier weight without extreme diets.',
        h1: 'Your Ideal Weight Results — Building a New Path',
        summary: 'Your weight is above the healthy BMI range. The best approach is sustainable, gradual change focused on habits rather than quick fixes.',
        tips: [
          'Start with one habit at a time — small changes compound over months',
          'Aim for 0.5-1 kg of weight loss per week for sustainable progress',
          'Focus on what you are adding (vegetables, protein, water) not just cutting',
        ],
      },
    ],
  },
  'body-fat-calculator': {
    tool: 'Body Fat Calculator',
    toolPath: '/calculators/body-fat-calculator',
    categories: [
      {
        slug: 'essential',
        seoTitle: 'Essential Body Fat Results — What It Means for You | FitFeky',
        seoDescription: 'Your body fat is in the essential range. Learn what this means for your health, hormones, and athletic performance.',
        h1: 'Your Body Fat Results — Essential Range',
        summary: 'Essential body fat (10-14%) is the minimum required for basic health. This range is typically seen in competitive athletes and requires careful maintenance.',
        tips: [
          'This low body fat requires precise nutrition to maintain health',
          'Monitor menstrual cycle regularity — disruptions signal too low body fat',
          'Work with a professional to ensure bone density and hormone health',
        ],
      },
      {
        slug: 'athletic',
        seoTitle: 'Athletic Body Fat Results — What It Means for You | FitFeky',
        seoDescription: 'Your body fat is in the athletic range. See how to maintain this healthy composition for performance and aesthetics.',
        h1: 'Your Body Fat Results — Athletic Range',
        summary: 'The athletic range (14-20%) is common among active women. This body fat level balances performance, health, and aesthetics.',
        tips: [
          'Maintain this range with regular strength training and adequate protein',
          'This body fat level typically supports normal menstrual function',
          'Focus on performance goals rather than chasing lower body fat',
        ],
      },
      {
        slug: 'fitness',
        seoTitle: 'Fitness Body Fat Results — What It Means for You | FitFeky',
        seoDescription: 'Your body fat is in the fitness range. Learn how this healthy range supports wellness and energy for daily life.',
        h1: 'Your Body Fat Results — Fitness Range',
        summary: 'The fitness range (20-24%) is where many women feel and perform their best. It represents a healthy balance of muscle and fat.',
        tips: [
          'This range is associated with good metabolic and hormonal health',
          'Body recomposition (building muscle while losing fat) works well here',
          'Focus on how your clothes fit rather than the number on the scale',
        ],
      },
      {
        slug: 'average',
        seoTitle: 'Average Body Fat Results — What It Means for You | FitFeky',
        seoDescription: 'Your body fat is in the average range. See how small changes can improve your body composition over time.',
        h1: 'Your Body Fat Results — Average Range',
        summary: 'The acceptable range (24-31%) is common among the general population and does not typically pose health risks.',
        tips: [
          'Adding 2-3 strength sessions per week can shift body composition',
          'Protein intake becomes more important for preserving muscle',
          'Small, consistent changes yield better results than crash approaches',
        ],
      },
      {
        slug: 'overweight',
        seoTitle: 'Overweight Body Fat Results — What It Means for You | FitFeky',
        seoDescription: 'Your body fat is in the overweight range. Learn about effective, sustainable strategies to reduce body fat and improve health.',
        h1: 'Your Body Fat Results — Overweight Range',
        summary: 'Body fat above 31% is considered overweight. This range is associated with increased health risks, but sustainable change is achievable.',
        tips: [
          'Start with walking and nutrition adjustments before intense exercise',
          'Focus on reducing processed foods and increasing whole foods',
          'Consistency matters more than perfection — aim for 80% adherence',
        ],
      },
    ],
  },
  'water-intake-calculator': {
    tool: 'Water Intake Calculator',
    toolPath: '/calculators/water-intake-calculator',
    categories: [
      {
        slug: 'low',
        seoTitle: 'Low Water Intake Results — What It Means for You | FitFeky',
        seoDescription: 'Your daily water target is on the lower end. Learn how to stay hydrated with a smaller volume and why every drop counts.',
        h1: 'Your Water Intake Results — Lower Range',
        summary: 'A lower water intake target is typical for smaller body sizes or less active lifestyles. Even at lower volumes, consistent hydration matters.',
        tips: [
          'Sip water throughout the day rather than drinking large amounts at once',
          'Herbal teas and water-rich foods (cucumber, watermelon) count toward intake',
          'Set a gentle reminder every 2 hours to take a few sips',
        ],
      },
      {
        slug: 'moderate',
        seoTitle: 'Moderate Water Intake Results — What It Means for You | FitFeky',
        seoDescription: 'Your daily water target is in the moderate range. See how to maintain good hydration for energy, skin, and metabolism.',
        h1: 'Your Water Intake Results — Moderate Range',
        summary: 'A moderate water intake target of 2-2.5 liters is the most common recommendation and supports overall health and daily function.',
        tips: [
          'Carry a reusable water bottle to track your intake throughout the day',
          'Drink a glass of water with each meal to spread intake evenly',
          'Increase intake slightly on workout days to replace fluid loss',
        ],
      },
      {
        slug: 'high',
        seoTitle: 'High Water Intake Results — What It Means for You | FitFeky',
        seoDescription: 'Your daily water target is on the higher end. Learn how to manage increased hydration needs for activity, climate, or breastfeeding.',
        h1: 'Your Water Intake Results — Higher Range',
        summary: 'A higher water intake target reflects increased needs from activity, hot climate, or breastfeeding. Your body requires more fluid to function optimally.',
        tips: [
          'Spread your intake across the day — drinking too much at once causes discomfort',
          'Add electrolytes if you are sweating heavily from exercise or heat',
          'Breastfeeding mothers should prioritize hydration before and after nursing',
        ],
      },
    ],
  },
  'protein-calculator': {
    tool: 'Protein Calculator',
    toolPath: '/calculators/protein-calculator',
    categories: [
      {
        slug: 'weight-loss',
        seoTitle: 'Weight Loss Protein Results — What It Means for You | FitFeky',
        seoDescription: 'Your protein target for weight loss. See how higher protein intake helps preserve muscle and keeps you full during a calorie deficit.',
        h1: 'Your Protein Results for Weight Loss',
        summary: 'A higher protein target during weight loss helps preserve lean muscle, increases satiety, and supports metabolic rate.',
        tips: [
          'Aim for 25-35g of protein per meal to maximize muscle protein synthesis',
          'Include protein in your breakfast — it sets the tone for the day',
          'Protein shakes can help bridge the gap on busy days',
        ],
      },
      {
        slug: 'maintenance',
        seoTitle: 'Maintenance Protein Results — What It Means for You | FitFeky',
        seoDescription: 'Your protein target for weight maintenance. See how adequate protein supports muscle health and overall wellness.',
        h1: 'Your Protein Results for Maintenance',
        summary: 'A maintenance protein target supports muscle preservation and general health without the higher demands of active muscle building.',
        tips: [
          'Distribute protein evenly across 3-4 meals for best utilization',
          'Include a protein source with every meal and snack',
          'Adjust upward if you start a new strength training program',
        ],
      },
      {
        slug: 'muscle-building',
        seoTitle: 'Muscle Building Protein Results — What It Means for You | FitFeky',
        seoDescription: 'Your protein target for building muscle. See how higher protein intake supports muscle growth and recovery from strength training.',
        h1: 'Your Protein Results for Muscle Building',
        summary: 'A muscle-building protein target is higher to support muscle repair and growth. Combined with strength training, this drives visible results.',
        tips: [
          'Timing matters — eat protein within 2 hours after your workout',
          'Combine protein with carbohydrates post-workout for better recovery',
          'Stay consistent — muscle growth happens over weeks, not days',
        ],
      },
    ],
  },
};

export function getAllResultPagePaths(): Array<{ tool: string; category: string }> {
  const paths: Array<{ tool: string; category: string }> = [];
  for (const [tool, config] of Object.entries(resultPageConfigs)) {
    for (const cat of config.categories) {
      paths.push({ tool, category: cat.slug });
    }
  }
  return paths;
}

export function getResultPageData(tool: string, category: string): { toolConfig: ToolResultConfig; categoryData: ResultCategory } | null {
  const toolConfig = resultPageConfigs[tool];
  if (!toolConfig) return null;
  const categoryData = toolConfig.categories.find(c => c.slug === category);
  if (!categoryData) return null;
  return { toolConfig, categoryData };
}

export const VALID_TOOLS = Object.keys(resultPageConfigs);

// Maps each calculator tool to 3+ recommended blog article slugs.
// Every calculator must recommend at least 3 articles.
export const CATEGORY_ARTICLE_MAP: Record<string, string[]> = {
  'tdee-calculator': ['lose-belly-fat-yoga', 'weight-loss-busy-moms', 'best-diet-plan-weight-loss-women'],
  'bmr-calculator': ['yoga-weight-loss-women-40', 'lose-belly-fat-yoga', 'does-yoga-burn-calories'],
  'calorie-deficit-calculator': ['weight-loss-busy-moms', 'best-diet-plan-weight-loss-women', 'lose-weight-without-exercise'],
  'macro-calculator': ['best-diet-plan-weight-loss-women', 'intermittent-fasting-beginners', 'weight-loss-busy-moms'],
  'ideal-weight-calculator': ['yoga-weight-loss-women-40', 'lose-belly-fat-yoga', 'best-diet-plan-weight-loss-women'],
  'body-fat-calculator': ['yoga-weight-loss-women-40', 'lose-belly-fat-yoga', 'best-diet-plan-weight-loss-women'],
  'water-intake-calculator': ['restorative-yoga-sleep', 'yoga-beginners-at-home', 'can-yoga-help-lose-weight'],
  'protein-calculator': ['intermittent-fasting-beginners', 'best-diet-plan-weight-loss-women', 'not-losing-weight-diet-exercise'],
};

export const VALID_CATEGORY_LABELS: Record<string, string> = {
  'tdee-calculator': 'activity level',
  'bmr-calculator': 'BMR range',
  'calorie-deficit-calculator': 'deficit level',
  'macro-calculator': 'goal type',
  'ideal-weight-calculator': 'weight category',
  'body-fat-calculator': 'body fat category',
  'water-intake-calculator': 'intake level',
  'protein-calculator': 'goal type',
};
