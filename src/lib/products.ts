export type Category = 'KETO' | 'YOGA' | 'FAT_LOSS' | 'FITNESS' | 'GLOW';
export type Goal = 'weight_loss' | 'flexibility' | 'energy';
export type Platform = 'gumroad' | 'external';

export interface AnalysisResult {
  goal: Goal;
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  weightToLose: number;
  personalizedMessage: string;
}

export interface Product {
  id: string;
  title: string;
  category: Category;
  goal: Goal;
  link: string;
  platform: Platform;
  image: string;
  price: number;
  oldPrice: number;
  description: string;
  benefit: string;
  features: string[];
}

export const productList: Product[] = [
  // --- KETO ---
  {
    id: 'best-keto',
    title: 'The Best Keto Cookbook',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://joeduff.gumroad.com/l/BestKetoCookbook',
    platform: 'gumroad',
    image: '/images/best-keto.jpg',
    price: 29,
    oldPrice: 49,
    description: 'The ultimate collection of delicious, easy-to-make keto recipes that actually taste good.',
    benefit: 'Lose weight without giving up your favorite flavors.',
    features: ['100+ gourmet keto recipes', 'Macro breakdowns included', 'Simple shopping lists']
  },
  {
    id: 'savory-keto',
    title: 'Savory Keto Cookbook',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://joeduff.gumroad.com/l/SavoryKetoCookbook',
    platform: 'gumroad',
    image: '/images/savory-keto.jpg',
    price: 27,
    oldPrice: 45,
    description: 'Focus on savory, satisfying meals that keep you in ketosis and crush cravings.',
    benefit: 'Stay full and satisfied while your body burns fat.',
    features: ['Comfort food reimagined', 'Quick 30-min meals', 'Family-friendly options']
  },
  {
    id: 'pe-diet',
    title: 'The P:E Diet',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://tednaiman.gumroad.com/l/thepediet',
    platform: 'gumroad',
    image: '/images/pe-diet.jpg',
    price: 35,
    oldPrice: 50,
    description: 'The most effective strategy for body recomposition and sustainable weight loss.',
    benefit: 'Build lean muscle and torch fat with metabolic science.',
    features: ['Protein-to-Energy ratio', 'Science-backed approach', 'Optimize your metabolism']
  },
  {
    id: 'satiety-calorie',
    title: 'Satiety Per Calorie',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://tednaiman.gumroad.com/l/satietypercalorie',
    platform: 'gumroad',
    image: '/images/satiety.jpg',
    price: 25,
    oldPrice: 39,
    description: 'Learn how to eat more food while losing more weight by focusing on satiety.',
    benefit: 'Eat until you are full and still drop the pounds.',
    features: ['End constant hunger', 'Food satiety index', 'Practical eating guides']
  },
  {
    id: 'fpd',
    title: 'The Fairy Princess Diet',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://fairyprincessdiet.gumroad.com/l/fpd',
    platform: 'gumroad',
    image: '/images/fpd.jpg',
    price: 22,
    oldPrice: 35,
    description: 'A magical, aesthetic approach to wellness, flexibility, and feminine fitness.',
    benefit: 'Achieve a lean, graceful physique with aesthetic routines.',
    features: ['Aesthetic meal planning', 'Graceful workout routines', 'Mindfulness & posture']
  },

  // --- YOGA ---
  {
    id: 'yoga-membership',
    title: 'Yoga Membership',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://pouyayoga.gumroad.com/l/YogaMembership',
    platform: 'gumroad',
    image: '/images/yoga-membership.jpg',
    price: 29,
    oldPrice: 99,
    description: 'Full access to our premium yoga library and community.',
    benefit: 'Master flexibility from home with expert guidance.',
    features: ['All video flows', 'Live sessions', 'Community support']
  },
  {
    id: 'mindful-goddess',
    title: 'The Mindful Goddess',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://rogueevans.gumroad.com/l/themindfulgoddess',
    platform: 'gumroad',
    image: '/images/mindful-goddess.jpg',
    price: 19,
    oldPrice: 47,
    description: 'Embrace your inner power through mindfulness and movement.',
    benefit: 'Reduce stress and tone your body with feminine energy.',
    features: ['Meditation guides', 'Morning rituals', 'Stress relief']
  },
  {
    id: 'yoga-pam',
    title: 'Yoga with Pam',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://onlineyogawithpam.gumroad.com/l/bivzn',
    platform: 'gumroad',
    image: '/images/yoga-pam.jpg',
    price: 25,
    oldPrice: 50,
    description: 'Expert-led yoga sessions for all levels.',
    benefit: 'Fix your posture and gain agility in minutes a day.',
    features: ['Personalized feedback', 'Variety of styles', 'Flexible schedule']
  },
  {
    id: 'niitty',
    title: 'Niitty Yoga',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://somiyoga.gumroad.com/l/niitty',
    platform: 'gumroad',
    image: '/images/niitty.jpg',
    price: 15,
    oldPrice: 30,
    description: 'Simple and effective yoga routines for daily practice.',
    benefit: 'Low-impact movements for high-impact results.',
    features: ['Short sessions', 'Focus on basics', 'Improve posture']
  },
  {
    id: 'babajiskyp',
    title: 'Babaji Sky Yoga',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://babajiskyp.gumroad.com/l/CNlac',
    platform: 'gumroad',
    image: '/images/babaji.jpg',
    price: 20,
    oldPrice: 40,
    description: 'Traditional yoga techniques for modern life.',
    benefit: 'Connect mind and body for ultimate flexibility.',
    features: ['Ancient wisdom', 'Breathwork', 'Spiritual growth']
  },

  // --- FITNESS ---
  {
    id: 'accel-fatloss',
    title: 'Accelerated Fat Loss',
    category: 'FITNESS',
    goal: 'weight_loss',
    link: 'https://alexanderjacortes.gumroad.com/l/AcceleratedFatloss',
    platform: 'gumroad',
    image: '/images/accel-fatloss.jpg',
    price: 47,
    oldPrice: 97,
    description: 'The fastest way to drop body fat safely and effectively.',
    benefit: 'Torch stubborn fat with high-efficiency protocols.',
    features: ['Proven workout plan', 'Nutrition guide', 'Progress tracking']
  },
  {
    id: 'ajac-diet',
    title: 'AJAC Diet',
    category: 'FITNESS',
    goal: 'weight_loss',
    link: 'https://alexanderjacortes.gumroad.com/l/AJACDiet',
    platform: 'gumroad',
    image: '/images/ajac-diet.jpg',
    price: 37,
    oldPrice: 67,
    description: 'A sustainable approach to eating for long-term health and performance.',
    benefit: 'Eat for your body type and never diet again.',
    features: ['Flexible dieting', 'Macro optimization', 'Food list']
  },
  {
    id: 'big-bean',
    title: 'The Big Bean',
    category: 'FITNESS',
    goal: 'energy',
    link: 'https://soberfitness.gumroad.com/l/thebigbean',
    platform: 'gumroad',
    image: '/images/big-bean.jpg',
    price: 19,
    oldPrice: 39,
    description: 'Boost your energy and vitality with this comprehensive fitness plan.',
    benefit: 'Unlock explosive energy levels and mental focus.',
    features: ['High-intensity training', 'Energy protocols', 'Motivation']
  },
  {
    id: 'fit-patriot',
    title: 'Fit Patriot',
    category: 'FITNESS',
    goal: 'energy',
    link: 'https://fitpatriot.gumroad.com/l/goovg',
    platform: 'gumroad',
    image: '/images/fit-patriot.jpg',
    price: 25,
    oldPrice: 45,
    description: 'Build strength and endurance with a patriotic twist.',
    benefit: 'Develop functional strength and unstoppable stamina.',
    features: ['Military-style workouts', 'Endurance focus', 'Toughness']
  },

  // --- GLOW ---
  {
    id: 'glow-up',
    title: 'Glow Up Guide',
    category: 'GLOW',
    goal: 'energy',
    link: 'https://bloombody.gumroad.com/l/GlowUp',
    platform: 'gumroad',
    image: '/images/glow-up.jpg',
    price: 15,
    oldPrice: 29,
    description: 'A holistic guide to looking and feeling your best.',
    benefit: 'Radiate confidence with a total body glow-up.',
    features: ['Skincare tips', 'Wellness habits', 'Confidence building']
  },
  {
    id: 'luovl',
    title: 'Lyna Glow',
    category: 'GLOW',
    goal: 'energy',
    link: 'https://glowupwithlyna.gumroad.com/l/luovl',
    platform: 'gumroad',
    image: '/images/lyna-glow.jpg',
    price: 17,
    oldPrice: 35,
    description: 'Personalized glow-up strategies for the modern woman.',
    benefit: 'Master the art of aesthetic wellness and beauty.',
    features: ['Style advice', 'Health hacks', 'Daily routines']
  },
  {
    id: 'diet-planner',
    title: 'Diet Planner',
    category: 'GLOW',
    goal: 'energy',
    link: 'https://harrisonwallace1999.gumroad.com/l/dietplanner',
    platform: 'gumroad',
    image: '/images/diet-planner.jpg',
    price: 12,
    oldPrice: 25,
    description: 'Simple and effective tool for planning your meals.',
    benefit: 'Take the guesswork out of healthy eating.',
    features: ['Meal templates', 'Grocery list', 'Easy tracking']
  },
  {
    id: 'pro-coach',
    title: 'Pro Coach',
    category: 'GLOW',
    goal: 'energy',
    link: 'https://harrisonwallace1999.gumroad.com/l/procoach',
    platform: 'gumroad',
    image: '/images/pro-coach.jpg',
    price: 49,
    oldPrice: 99,
    description: 'Get expert coaching to reach your fitness and lifestyle goals.',
    benefit: 'Work 1-on-1 with a pro to transform your life.',
    features: ['1-on-1 support', 'Custom plans', 'Weekly check-ins']
  }
];

export const analyzeAnswers = (answers: any): AnalysisResult => {
  let scores = {
    weight_loss: 0,
    flexibility: 0,
    energy: 0
  };

  // Secondary signals (+1)
  const identity = answers.identity || '';
  if (identity.includes('mom') || identity.includes('active')) scores.weight_loss += 1;
  if (identity.includes('beginner')) scores.flexibility += 1;
  if (identity.includes('Working')) scores.energy += 1;

  const painPoint = answers.painPoint || '';
  if (painPoint.includes('belly') || painPoint.includes('pregnancy')) scores.weight_loss += 1;
  if (painPoint.includes('energy')) scores.energy += 1;
  if (painPoint.includes('Stress')) scores.flexibility += 1;

  // Primary signal (+3) - Using desiredResult (Question 3/7)
  const goal = answers.desiredResult || '';
  if (goal.includes('weight') || goal.includes('fat') || goal.includes('clothes')) scores.weight_loss += 3;
  if (goal.includes('flexibility') || goal.includes('posture')) scores.flexibility += 3;
  if (goal.includes('energy') || goal.includes('confidence')) scores.energy += 3;

  // Find highest score
  let maxScore = -1;
  let finalGoal: Goal = 'weight_loss';

  (Object.keys(scores) as Goal[]).forEach(key => {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      finalGoal = key;
    }
  });

  // Calculate BMI
  const currentWeight = parseFloat(answers.currentWeight) || 0;
  const height = parseFloat(answers.height) || 0;
  const targetWeight = parseFloat(answers.targetWeight) || 0;
  
  let bmi = 0;
  let bmiCategory: AnalysisResult['bmiCategory'] = 'normal';
  
  if (height > 0 && currentWeight > 0) {
    bmi = currentWeight / ((height / 100) * (height / 100));
    if (bmi < 18.5) bmiCategory = 'underweight';
    else if (bmi < 25) bmiCategory = 'normal';
    else if (bmi < 30) bmiCategory = 'overweight';
    else bmiCategory = 'obese';
  }

  // Calculate weight difference
  const weightToLose = currentWeight - targetWeight;

  // Generate personalized message
  let personalizedMessage = '';
  if (weightToLose > 2) {
    personalizedMessage = "Your profile suggests a strong focus on sustainable fat loss and metabolic optimization to reach your target weight.";
  } else if (weightToLose < -2) {
    personalizedMessage = "We'll focus on lean muscle gain and strength building to help you reach your body composition goals.";
  } else {
    personalizedMessage = "Your focus should be on maintenance, toning, and improving overall functional flexibility.";
  }

  return {
    goal: finalGoal,
    bmi,
    bmiCategory,
    weightToLose,
    personalizedMessage
  };
};

export const getRecommendedProducts = (answers: any, limit: number = 3): Product[] => {
  const analysis = analyzeAnswers(answers);
  const goal = analysis.goal;
  const bmi = analysis.bmi;

  // Define product sets by category for easy selection
  const ketoProducts = productList.filter(p => p.category === 'KETO');
  const yogaProducts = productList.filter(p => p.category === 'YOGA');
  const fitnessProducts = productList.filter(p => p.category === 'FITNESS');
  const glowProducts = productList.filter(p => p.category === 'GLOW');

  let recommended: Product[] = [];

  // BMI Overrides (Prioritize based on real body data)
  if (bmi >= 25) {
    // If BMI high -> prioritize weight loss focus (Keto + Fitness)
    recommended = [...ketoProducts, ...fitnessProducts];
  } else {
    // Standard goal-based logic as requested
    if (goal === "weight_loss") {
      recommended = [...ketoProducts, ...fitnessProducts];
    } else if (goal === "flexibility") {
      recommended = yogaProducts;
    } else if (goal === "energy") {
      recommended = [...fitnessProducts, ...glowProducts];
    } else {
      // Default fallback
      recommended = ketoProducts;
    }
  }

  // Ensure no empty results (Final fallback)
  if (recommended.length === 0) {
    recommended = productList;
  }

  return recommended.slice(0, limit);
};
