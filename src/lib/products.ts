export type Category = 'KETO' | 'YOGA' | 'FAT_LOSS' | 'FITNESS' | 'GLOW';
export type Goal = 'weight_loss' | 'flexibility' | 'energy';
export type Platform = 'gumroad' | 'external';
export type Archetype = 'Busy Working Woman' | 'Emotional Eater' | 'Beginner Restarting Journey' | 'Transformation-Ready Champion' | 'Consistent Grower' | 'Ambitious Achiever';

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
  bestFor?: Archetype[];
  painPoints?: string[];
  timeRequired?: string;
}

export interface BehavioralMatch {
  productId: string;
  score: number;
  reasons: string[];
}

export const productList: Product[] = [
  // --- KETO ---
  {
    id: 'best-keto',
    title: 'The Best Keto Cookbook',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://joeduff.gumroad.com/l/BestKetoCookbook?a=383200147',
    platform: 'gumroad',
    image: '/images/best-keto.jpg',
    price: 29,
    oldPrice: 49,
    description: 'The ultimate collection of delicious, easy-to-make keto recipes that actually taste good.',
    benefit: 'Lose weight without giving up your favorite flavors.',
    features: ['100+ gourmet keto recipes', 'Macro breakdowns included', 'Simple shopping lists'],
    bestFor: ['Emotional Eater', 'Beginner Restarting Journey'],
    painPoints: ['nutrition', 'cravings', 'cooking'],
    timeRequired: '30 min'
  },
  {
    id: 'savory-keto',
    title: 'Savory Keto Cookbook',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://joeduff.gumroad.com/l/SavoryKetoCookbook?a=383200147',
    platform: 'gumroad',
    image: '/images/savory-keto.jpg',
    price: 27,
    oldPrice: 45,
    description: 'Focus on savory, satisfying meals that keep you in ketosis and crush cravings.',
    benefit: 'Stay full and satisfied while your body burns fat.',
    features: ['Comfort food reimagined', 'Quick 30-min meals', 'Family-friendly options'],
    bestFor: ['Busy Working Woman', 'Emotional Eater'],
    painPoints: ['cravings', 'time', 'family'],
    timeRequired: '30 min'
  },
  {
    id: 'pe-diet',
    title: 'The P:E Diet',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://tednaiman.gumroad.com/l/thepediet?a=383200147',
    platform: 'gumroad',
    image: '/images/pe-diet.jpg',
    price: 35,
    oldPrice: 50,
    description: 'The most effective strategy for body recomposition and sustainable weight loss.',
    benefit: 'Build lean muscle and torch fat with metabolic science.',
    features: ['Protein-to-Energy ratio', 'Science-backed approach', 'Optimize your metabolism'],
    bestFor: ['Transformation-Ready Champion', 'Consistent Grower'],
    painPoints: ['stubborn fat', 'metabolism', 'science'],
    timeRequired: 'ongoing'
  },
  {
    id: 'satiety-calorie',
    title: 'Satiety Per Calorie',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://tednaiman.gumroad.com/l/satietypercalorie?a=383200147',
    platform: 'gumroad',
    image: '/images/satiety.jpg',
    price: 25,
    oldPrice: 39,
    description: 'Learn how to eat more food while losing more weight by focusing on satiety.',
    benefit: 'Eat until you are full and still drop the pounds.',
    features: ['End constant hunger', 'Food satiety index', 'Practical eating guides'],
    bestFor: ['Emotional Eater', 'Beginner Restarting Journey'],
    painPoints: ['hunger', 'portion control', 'overeating'],
    timeRequired: '15 min'
  },
  {
    id: 'fpd',
    title: 'The Fairy Princess Diet',
    category: 'KETO',
    goal: 'weight_loss',
    link: 'https://fairyprincessdiet.gumroad.com/l/fpd?a=383200147',
    platform: 'gumroad',
    image: '/images/fpd.jpg',
    price: 22,
    oldPrice: 35,
    description: 'A magical, aesthetic approach to wellness, flexibility, and feminine fitness.',
    benefit: 'Achieve a lean, graceful physique with aesthetic routines.',
    features: ['Aesthetic meal planning', 'Graceful workout routines', 'Mindfulness and posture'],
    bestFor: ['Consistent Grower', 'Ambitious Achiever'],
    painPoints: ['aesthetics', 'feminine', 'holistic'],
    timeRequired: '20 min'
  },

  // --- YOGA ---
  {
    id: 'yoga-membership',
    title: 'Yoga Membership',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://pouyayoga.gumroad.com/l/YogaMembership?a=383200147',
    platform: 'gumroad',
    image: '/images/yoga-membership.jpg',
    price: 29,
    oldPrice: 99,
    description: 'Full access to our premium yoga library and community.',
    benefit: 'Master flexibility from home with expert guidance.',
    features: ['All video flows', 'Live sessions', 'Community support'],
    bestFor: ['Beginner Restarting Journey', 'Consistent Grower'],
    painPoints: ['flexibility', 'stress', 'community'],
    timeRequired: '15 min'
  },
  {
    id: 'mindful-goddess',
    title: 'The Mindful Goddess',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://rogueevans.gumroad.com/l/themindfulgoddess?a=383200147',
    platform: 'gumroad',
    image: '/images/mindful-goddess.jpg',
    price: 19,
    oldPrice: 47,
    description: 'Embrace your inner power through mindfulness and movement.',
    benefit: 'Reduce stress and tone your body with feminine energy.',
    features: ['Meditation guides', 'Morning rituals', 'Stress relief'],
    bestFor: ['Emotional Eater', 'Busy Working Woman'],
    painPoints: ['stress', 'anxiety', 'mindfulness'],
    timeRequired: '10 min'
  },
  {
    id: 'yoga-pam',
    title: 'Yoga with Pam',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://onlineyogawithpam.gumroad.com/l/bivzn?a=383200147',
    platform: 'gumroad',
    image: '/images/yoga-pam.jpg',
    price: 25,
    oldPrice: 50,
    description: 'Expert-led yoga sessions for all levels.',
    benefit: 'Fix your posture and gain agility in minutes a day.',
    features: ['Personalized feedback', 'Variety of styles', 'Flexible schedule'],
    bestFor: ['Beginner Restarting Journey', 'Busy Working Woman'],
    painPoints: ['posture', 'back pain', 'beginner'],
    timeRequired: '20 min'
  },
  {
    id: 'niitty',
    title: 'Niitty Yoga',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://somiyoga.gumroad.com/l/niitty?a=383200147',
    platform: 'gumroad',
    image: '/images/niitty.jpg',
    price: 15,
    oldPrice: 30,
    description: 'Simple and effective yoga routines for daily practice.',
    benefit: 'Low-impact movements for high-impact results.',
    features: ['Short sessions', 'Focus on basics', 'Improve posture'],
    bestFor: ['Beginner Restarting Journey', 'Busy Working Woman'],
    painPoints: ['time', 'simplicity', 'basics'],
    timeRequired: '10 min'
  },
  {
    id: 'babajiskyp',
    title: 'Babaji Sky Yoga',
    category: 'YOGA',
    goal: 'flexibility',
    link: 'https://babajiskyp.gumroad.com/l/CNlac?a=383200147',
    platform: 'gumroad',
    image: '/images/babaji.jpg',
    price: 20,
    oldPrice: 40,
    description: 'Traditional yoga techniques for modern life.',
    benefit: 'Connect mind and body for ultimate flexibility.',
    features: ['Ancient wisdom', 'Breathwork', 'Spiritual growth'],
    bestFor: ['Consistent Grower', 'Ambitious Achiever'],
    painPoints: ['spiritual', 'depth', 'tradition'],
    timeRequired: '30 min'
  },

  // --- FITNESS ---
  {
    id: 'accel-fatloss',
    title: 'Accelerated Fat Loss',
    category: 'FITNESS',
    goal: 'weight_loss',
    link: 'https://alexanderjacortes.gumroad.com/l/AcceleratedFatloss?a=383200147',
    platform: 'gumroad',
    image: '/images/accel-fatloss.jpg',
    price: 47,
    oldPrice: 97,
    description: 'The fastest way to drop body fat safely and effectively.',
    benefit: 'Torch stubborn fat with high-efficiency protocols.',
    features: ['Proven workout plan', 'Nutrition guide', 'Progress tracking'],
    bestFor: ['Transformation-Ready Champion', 'Ambitious Achiever'],
    painPoints: ['stubborn fat', 'speed', 'intensity'],
    timeRequired: '30 min'
  },
  {
    id: 'ajac-diet',
    title: 'AJAC Diet',
    category: 'FITNESS',
    goal: 'weight_loss',
    link: 'https://alexanderjacortes.gumroad.com/l/AJACDiet?a=383200147',
    platform: 'gumroad',
    image: '/images/ajac-diet.jpg',
    price: 37,
    oldPrice: 67,
    description: 'A sustainable approach to eating for long-term health and performance.',
    benefit: 'Eat for your body type and never diet again.',
    features: ['Flexible dieting', 'Macro optimization', 'Food list'],
    bestFor: ['Consistent Grower', 'Busy Working Woman'],
    painPoints: ['sustainability', 'flexibility', 'long-term'],
    timeRequired: '20 min'
  },
  {
    id: 'big-bean',
    title: 'The Big Bean',
    category: 'FITNESS',
    goal: 'energy',
    link: 'https://soberfitness.gumroad.com/l/thebigbean?a=383200147',
    platform: 'gumroad',
    image: '/images/big-bean.jpg',
    price: 19,
    oldPrice: 39,
    description: 'Boost your energy and vitality with this comprehensive fitness plan.',
    benefit: 'Unlock explosive energy levels and mental focus.',
    features: ['High-intensity training', 'Energy protocols', 'Motivation'],
    bestFor: ['Transformation-Ready Champion', 'Busy Working Woman'],
    painPoints: ['energy', 'focus', 'vitality'],
    timeRequired: '25 min'
  },
  {
    id: 'fit-patriot',
    title: 'Fit Patriot',
    category: 'FITNESS',
    goal: 'energy',
    link: 'https://fitpatriot.gumroad.com/l/goovg?a=383200147',
    platform: 'gumroad',
    image: '/images/fit-patriot.jpg',
    price: 25,
    oldPrice: 45,
    description: 'Build strength and endurance with a patriotic twist.',
    benefit: 'Develop functional strength and unstoppable stamina.',
    features: ['Military-style workouts', 'Endurance focus', 'Toughness'],
    bestFor: ['Ambitious Achiever', 'Transformation-Ready Champion'],
    painPoints: ['strength', 'endurance', 'challenge'],
    timeRequired: '35 min'
  },

  // --- GLOW ---
  {
    id: 'glow-up',
    title: 'Glow Up Guide',
    category: 'GLOW',
    goal: 'energy',
    link: 'https://bloombody.gumroad.com/l/GlowUp?a=383200147',
    platform: 'gumroad',
    image: '/images/glow-up.jpg',
    price: 15,
    oldPrice: 29,
    description: 'A holistic guide to looking and feeling your best.',
    benefit: 'Radiate confidence with a total body glow-up.',
    features: ['Skincare tips', 'Wellness habits', 'Confidence building'],
    bestFor: ['Emotional Eater', 'Consistent Grower'],
    painPoints: ['confidence', 'holistic', 'self-care'],
    timeRequired: '10 min'
  },
  {
    id: 'luovl',
    title: 'Lyna Glow',
    category: 'GLOW',
    goal: 'energy',
    link: 'https://glowupwithlyna.gumroad.com/l/luovl?a=383200147',
    platform: 'gumroad',
    image: '/images/lyna-glow.jpg',
    price: 17,
    oldPrice: 35,
    description: 'Personalized glow-up strategies for the modern woman.',
    benefit: 'Master the art of aesthetic wellness and beauty.',
    features: ['Style advice', 'Health hacks', 'Daily routines'],
    bestFor: ['Busy Working Woman', 'Ambitious Achiever'],
    painPoints: ['aesthetics', 'routine', 'modern'],
    timeRequired: '15 min'
  },
  {
    id: 'diet-planner',
    title: 'Diet Planner',
    category: 'GLOW',
    goal: 'energy',
    link: 'https://harrisonwallace1999.gumroad.com/l/dietplanner?a=383200147',
    platform: 'gumroad',
    image: '/images/diet-planner.jpg',
    price: 12,
    oldPrice: 25,
    description: 'Simple and effective tool for planning your meals.',
    benefit: 'Take the guesswork out of healthy eating.',
    features: ['Meal templates', 'Grocery list', 'Easy tracking'],
    bestFor: ['Beginner Restarting Journey', 'Busy Working Woman'],
    painPoints: ['planning', 'organization', 'simplicity'],
    timeRequired: '10 min'
  },
  {
    id: 'pro-coach',
    title: 'Pro Coach',
    category: 'GLOW',
    goal: 'energy',
    link: 'https://harrisonwallace1999.gumroad.com/l/procoach?a=383200147',
    platform: 'gumroad',
    image: '/images/pro-coach.jpg',
    price: 49,
    oldPrice: 99,
    description: 'Get expert coaching to reach your fitness and lifestyle goals.',
    benefit: 'Work 1-on-1 with a pro to transform your life.',
    features: ['1-on-1 support', 'Custom plans', 'Weekly check-ins'],
    bestFor: ['Transformation-Ready Champion', 'Ambitious Achiever'],
    painPoints: ['accountability', 'customization', 'expert guidance'],
    timeRequired: 'varies'
  }
];

export function analyzeAnswers(answers: any): AnalysisResult {
  let scores = {
    weight_loss: 0,
    flexibility: 0,
    energy: 0
  };

  const identity = answers.identity || '';
  if (identity.includes('mom') || identity.includes('active')) scores.weight_loss += 1;
  if (identity.includes('beginner')) scores.flexibility += 1;
  if (identity.includes('Working')) scores.energy += 1;

  const painPoint = answers.painPoint || '';
  if (painPoint.includes('belly') || painPoint.includes('pregnancy')) scores.weight_loss += 1;
  if (painPoint.includes('energy')) scores.energy += 1;
  if (painPoint.includes('Stress')) scores.flexibility += 1;

  const goal = answers.desiredResult || '';
  if (goal.includes('weight') || goal.includes('fat') || goal.includes('clothes')) scores.weight_loss += 3;
  if (goal.includes('flexibility') || goal.includes('posture')) scores.flexibility += 3;
  if (goal.includes('energy') || goal.includes('confidence')) scores.energy += 3;

  let maxScore = -1;
  let finalGoal: Goal = 'weight_loss';

  (Object.keys(scores) as Goal[]).forEach(key => {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      finalGoal = key;
    }
  });

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

  const weightToLose = currentWeight - targetWeight;

  let personalizedMessage = '';
  if (weightToLose > 2) {
    personalizedMessage = 'Your profile suggests a strong focus on sustainable fat loss and metabolic optimization to reach your target weight.';
  } else if (weightToLose < -2) {
    personalizedMessage = 'We will focus on lean muscle gain and strength building to help you reach your body composition goals.';
  } else {
    personalizedMessage = 'Your focus should be on maintenance, toning, and improving overall functional flexibility.';
  }

  return {
    goal: finalGoal,
    bmi,
    bmiCategory,
    weightToLose,
    personalizedMessage
  };
}

function determineArchetype(answers: any): Archetype {
  const identity = (answers.identity || '').toLowerCase();
  const painPoint = (answers.painPoint || '').toLowerCase();
  const commitment = (answers.commitment || '').toLowerCase();
  const urgency = (answers.urgency || '').toLowerCase();
  const pastObstacle = (answers.pastObstacle || '').toLowerCase();

  if ((identity.includes('mom') || identity.includes('busy')) && painPoint.includes('time')) {
    return 'Busy Working Woman';
  }
  if (painPoint.includes('emotional') || painPoint.includes('stress') || pastObstacle.includes('motivation')) {
    return 'Emotional Eater';
  }
  if (identity.includes('beginner') || identity.includes('restart') || pastObstacle.includes('wasted')) {
    return 'Beginner Restarting Journey';
  }
  if (commitment.includes('100%') || urgency.includes('urgent') || (commitment.includes('high') && urgency.includes('very'))) {
    return 'Transformation-Ready Champion';
  }
  if (commitment.includes('moderate') || identity.includes('active')) {
    return 'Consistent Grower';
  }
  return 'Ambitious Achiever';
}

function matchProductsByBehavior(answers: any, archetype: Archetype, limit: number = 3): { products: Product[]; reasons: string[][] } {
  const goal = analyzeAnswers(answers).goal;
  const bmi = parseFloat(answers.currentWeight) / ((parseFloat(answers.height) / 100) ** 2) || 0;
  const painPoint = (answers.painPoint || '').toLowerCase();
  const timeAvailable = (answers.timeAvailable || '').toLowerCase();

  const scored = productList.map(product => {
    let score = 0;
    const reasons: string[] = [];

    // Archetype match (+40)
    if (product.bestFor?.includes(archetype)) {
      score += 40;
      reasons.push('Perfect for your personality type');
    }

    // Goal match (+30)
    if (product.goal === goal) {
      score += 30;
      reasons.push('Aligned with your fitness goal');
    }

    // Pain point match (+20)
    if (product.painPoints?.some(pp => painPoint.includes(pp))) {
      score += 20;
      reasons.push('Addresses your specific challenge');
    }

    // BMI high → prioritize weight loss products (+15)
    if (bmi >= 25 && (product.category === 'KETO' || product.category === 'FITNESS')) {
      score += 15;
      reasons.push('Optimized for your body composition');
    }

    // Time match (+10)
    if (timeAvailable.includes('15') && product.timeRequired && parseInt(product.timeRequired) <= 15) {
      score += 10;
      reasons.push('Fits your busy schedule');
    }
    if (timeAvailable.includes('30') && product.timeRequired && parseInt(product.timeRequired) <= 30) {
      score += 5;
    }

    // Category bonus based on archetype (+5)
    if (archetype === 'Emotional Eater' && product.category === 'YOGA') score += 5;
    if (archetype === 'Busy Working Woman' && (product.category === 'FITNESS' || product.category === 'KETO')) score += 5;
    if (archetype === 'Beginner Restarting Journey' && product.timeRequired && parseInt(product.timeRequired) <= 15) score += 5;
    if (archetype === 'Transformation-Ready Champion' && product.category === 'FITNESS') score += 5;

    return { product, score, reasons };
  });

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, limit);
  return {
    products: top.map(s => s.product),
    reasons: top.map(s => s.reasons)
  };
}

export function getRecommendedProducts(answers: any, limit: number = 3): Product[] {
  const archetype = determineArchetype(answers);
  const { products } = matchProductsByBehavior(answers, archetype, limit);

  if (products.length > 0) return products;

  const analysis = analyzeAnswers(answers);
  const goal = analysis.goal;
  const bmi = analysis.bmi;

  const ketoProducts = productList.filter(p => p.category === 'KETO');
  const yogaProducts = productList.filter(p => p.category === 'YOGA');
  const fitnessProducts = productList.filter(p => p.category === 'FITNESS');
  const glowProducts = productList.filter(p => p.category === 'GLOW');

  let recommended: Product[] = [];

  if (bmi >= 25) {
    recommended = [...ketoProducts, ...fitnessProducts];
  } else {
    if (goal === 'weight_loss') {
      recommended = [...ketoProducts, ...fitnessProducts];
    } else if (goal === 'flexibility') {
      recommended = yogaProducts;
    } else if (goal === 'energy') {
      recommended = [...fitnessProducts, ...glowProducts];
    } else {
      recommended = ketoProducts;
    }
  }

  if (recommended.length === 0) {
    recommended = productList;
  }

  return recommended.slice(0, limit);
}

export function getMatchReasons(answers: any): string[][] {
  const archetype = determineArchetype(answers);
  const { reasons } = matchProductsByBehavior(answers, archetype, 3);
  return reasons;
}

export function getArchetype(answers: any): Archetype {
  return determineArchetype(answers);
}
