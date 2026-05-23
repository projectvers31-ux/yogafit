export interface PsychologicalProfile {
  archetype: string;
  archetypeDescription: string;
  traits: string[];
  motivationStyle: 'intrinsic' | 'extrinsic' | 'balance';
  emotionalState: 'stressed' | 'motivated' | 'overwhelmed' | 'determined';
  barriers: string[];
  strengths: string[];
  emotionalEatingTriggers: string[];
  stressLevel: 'low' | 'moderate' | 'high';
  confidenceLevel: 'low' | 'building' | 'high';
  lifestylePace: 'slow' | 'moderate' | 'hectic';
  productAffinity: string[];
}

export interface MetabolicProfile {
  bmr: number;
  tdee: number;
  calorieTarget: number;
  proteinG: number;
  carbG: number;
  fatG: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
  healthRiskScore: number;
  healthRiskLabel: string;
}

export interface TransformationPlan {
  week1: string[];
  week2: string[];
  week3: string[];
  week4: string[];
  keyFocus: string;
  consistencyStrategy: string;
  weeklyProductTip: string[];
}

export interface PersonalityInsight {
  trait: string;
  description: string;
  productSuggestion?: string;
}

export interface PerAnswerInsight {
  question: string;
  answer: string;
  insight: string;
  recommendation: string;
  productHint?: string;
}

export interface ActionPlanItem {
  week: number;
  title: string;
  description: string;
  duration: string;
  focus: string;
}

export interface EnhancedAnalysis {
  goal: 'weight_loss' | 'flexibility' | 'energy';
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  weightToLose: number;
  personalizedMessage: string;

  psychologicalProfile: PsychologicalProfile;
  metabolicProfile: MetabolicProfile;
  transformationPlan: TransformationPlan;
  personalityInsights: PersonalityInsight[];
  perAnswerInsights: PerAnswerInsight[];
  credibilityBadges: string[];
  urgencyMessage: string;
  aiEnriched: boolean;

  yogaRecommendations: string[];
  wellnessTips: string[];
  actionPlan: ActionPlanItem[];
  transformationTimeline: string;
  dietTips: string[];
  motivationQuotes: string[];
  aiCta: string;
}

const PRODUCT_AFFINITY_MAP: Record<string, string[]> = {
  'Busy Working Woman': ['FITNESS', 'KETO', 'GLOW'],
  'Emotional Eater': ['YOGA', 'KETO', 'GLOW'],
  'Beginner Restarting Journey': ['YOGA', 'KETO', 'GLOW'],
  'Transformation-Ready Champion': ['FITNESS', 'KETO'],
  'Consistent Grower': ['YOGA', 'GLOW', 'KETO'],
  'Ambitious Achiever': ['FITNESS', 'GLOW']
};

const EMOTIONAL_EATING_TRIGGERS: Record<string, string[]> = {
  'stress': ['Work pressure', 'Financial stress', 'Relationship tension'],
  'emotion': ['Loneliness', 'Sadness', 'Boredom', 'Anxiety'],
  'energy': ['Fatigue-driven cravings', 'Hormonal fluctuations', 'Low blood sugar']
};

export function analyzePsychologicalProfile(quizData: any): PsychologicalProfile {
  const identity = (quizData.identity || '').toLowerCase();
  const painPoint = (quizData.painPoint || '').toLowerCase();
  const timeAvailable = (quizData.timeAvailable || '').toLowerCase();
  const pastObstacle = (quizData.pastObstacle || '').toLowerCase();
  const commitment = (quizData.commitment || '').toLowerCase();
  const urgency = (quizData.urgency || '').toLowerCase();
  const desiredResult = (quizData.desiredResult || '').toLowerCase();

  let archetype = 'Ambitious Achiever';
  let archetypeDescription = 'You are driven, focused, and ready to take on any challenge.';
  let traits: string[] = [];
  let motivationStyle: 'intrinsic' | 'extrinsic' | 'balance' = 'balance';
  let emotionalState: 'stressed' | 'motivated' | 'overwhelmed' | 'determined' = 'determined';
  let barriers: string[] = [];
  let strengths: string[] = [];
  let emotionalEatingTriggers: string[] = [];
  let stressLevel: 'low' | 'moderate' | 'high' = 'moderate';
  let confidenceLevel: 'low' | 'building' | 'high' = 'building';
  let lifestylePace: 'slow' | 'moderate' | 'hectic' = 'moderate';

  if (identity.includes('mom')) {
    archetype = 'Busy Working Woman';
    archetypeDescription = 'You are the backbone of your family, juggling an intricate web of responsibilities with quiet strength. Your fitness journey must integrate seamlessly into your life — not demand more from a schedule that has no more to give. We respect your time and your sacrifices.';
    emotionalState = 'overwhelmed';
    stressLevel = 'high';
    lifestylePace = 'hectic';
    confidenceLevel = 'building';
    barriers.push('Time constraints', 'Family responsibilities', 'Mental fatigue', 'Guilt about taking time for self');
    strengths.push('Exceptional multi-tasking', 'Deep motivation from family', 'Natural discipline', 'Resilience');
    if (painPoint.includes('emotional') || painPoint.includes('stress')) {
      emotionalEatingTriggers.push('Evening stress after family duties', 'Lack of personal time', 'Emotional exhaustion');
    }
  } else if (identity.includes('working') || identity.includes('professional')) {
    archetype = 'Busy Working Woman';
    archetypeDescription = 'You bring the same drive to your health that you bring to your career. Structure is your secret weapon — and we will use it to deliver measurable, predictable results. Your body deserves the same strategic investment you give your professional life.';
    emotionalState = 'determined';
    stressLevel = 'high';
    lifestylePace = 'hectic';
    confidenceLevel = 'high';
    barriers.push('Long work hours', 'Mental energy depletion', 'Sedentary desk job', 'Unpredictable schedule');
    strengths.push('Goal-oriented mindset', 'Strong work ethic', 'Problem-solving skills', 'Financial independence');
    if (painPoint.includes('stress') || painPoint.includes('energy')) {
      emotionalEatingTriggers.push('After-work burnout', 'Skipping meals then overeating', 'Caffeine dependency');
    }
  } else if (identity.includes('beginner') || identity.includes('restart')) {
    archetype = 'Beginner Restarting Journey';
    archetypeDescription = 'This is not a setback — this is the setup for the most meaningful comeback of your life. Every expert was once a beginner who refused to give up. You have the humility to start fresh, the courage to try again, and the wisdom to know that this time is different because you are different.';
    emotionalState = 'determined';
    stressLevel = 'moderate';
    confidenceLevel = 'low';
    lifestylePace = 'moderate';
    barriers.push('Past discouragement', 'Not knowing where to start', 'Fear of failure', 'Comparison to others');
    strengths.push('Humility to learn', 'Fresh perspective', 'Determination to change', 'Open-mindedness');
    if (painPoint.includes('weight') || painPoint.includes('belly')) {
      emotionalEatingTriggers.push('Frustration with past failures', 'All-or-nothing mentality', 'Weekend indulgence');
    }
  } else if (painPoint.includes('emotional') || painPoint.includes('stress')) {
    archetype = 'Emotional Eater';
    archetypeDescription = 'You feel deeply, and food has become an emotional anchor in a stormy world. There is no shame in that — only an opportunity to build healthier coping tools. Your emotional intelligence is a superpower once redirect-ed toward nourishing rather than numbing. We will address the root, not the symptom.';
    emotionalState = 'stressed';
    stressLevel = 'high';
    confidenceLevel = 'low';
    lifestylePace = 'moderate';
    barriers.push('Emotional eating patterns', 'Stress-triggered cravings', 'Self-criticism', 'All-or-nothing thinking');
    strengths.push('High self-awareness', 'Deep emotional intelligence', 'Sincere desire for change', 'Empathy');
    emotionalEatingTriggers = EMOTIONAL_EATING_TRIGGERS[painPoint] || EMOTIONAL_EATING_TRIGGERS['emotion'];
  } else if (commitment.includes('100') || urgency.includes('urgent') || (commitment.includes('high') && urgency.includes('very'))) {
    archetype = 'Transformation-Ready Champion';
    archetypeDescription = 'You have the fire. You are done waiting, done negotiating, done settling for less than you deserve. This is your moment of total commitment — and we will match your intensity with a precision plan that delivers visible, measurable transformation.';
    emotionalState = 'motivated';
    stressLevel = 'moderate';
    confidenceLevel = 'high';
    lifestylePace = 'moderate';
    barriers.push('Impatience with pace', 'Risk of burnout', 'Perfectionism', 'Expectation management');
    strengths.push('Unwavering commitment', 'High motivation', 'Discipline', 'Action orientation');
  } else {
    archetype = 'Consistent Grower';
    archetypeDescription = 'You understand a truth most people miss: lasting transformation is not an event — it is a process. Your patience, your consistency, your quiet discipline — these are the traits that build bodies that last and habits that stick. You are playing the long game, and you will win it.';
    emotionalState = 'determined';
    stressLevel = 'low';
    confidenceLevel = 'high';
    lifestylePace = 'moderate';
    barriers.push('Slow progress visibility', 'Maintaining interest over time', 'Breaking old habits');
    strengths.push('Natural consistency', 'Patience', 'Balance in all things', 'Adaptability');
  }

  const productAffinity = PRODUCT_AFFINITY_MAP[archetype] || ['FITNESS', 'KETO'];

  if (painPoint.includes('confidence') || urgency.includes('personal')) {
    motivationStyle = 'intrinsic';
  } else if (commitment.includes('accountability') || identity.includes('social') || identity.includes('community')) {
    motivationStyle = 'extrinsic';
  }

  if (timeAvailable.includes('15') || timeAvailable.includes('few')) {
    traits.push('Time-efficient', 'Maximizes every minute', 'Needs streamlined solutions');
  } else if (timeAvailable.includes('30')) {
    traits.push('Balanced schedule', 'Committed to self-investment', 'Structured');
  } else {
    traits.push('Deep-diver', 'Prefers immersive experiences', 'Makes time for what matters');
  }

  if (desiredResult.includes('confidence')) {
    traits.push('Inner transformation seeker', 'Values self-worth', 'Emotional growth focus');
  } else if (desiredResult.includes('weight') || desiredResult.includes('fat')) {
    traits.push('Result-oriented', 'Physical transformation focus', 'Goal-driven');
  } else if (desiredResult.includes('flexibility') || desiredResult.includes('posture')) {
    traits.push('Mind-body connection', 'Preventive health focus', 'Longevity-minded');
  } else if (desiredResult.includes('energy')) {
    traits.push('Vitality seeker', 'Performance-focused', 'Whole-life optimization');
  }

  if (motivationStyle === 'intrinsic') {
    traits.push('Self-driven', 'Values personal growth', 'Internally motivated');
  } else if (motivationStyle === 'extrinsic') {
    traits.push('Community-oriented', 'Thrives on accountability', 'Social support seeker');
  } else {
    traits.push('Pragmatic', 'Flexible', 'Adaptive to circumstances');
  }

  traits.push("Women's wellness-focused", 'Personal transformation journey');

  return {
    archetype,
    archetypeDescription,
    traits,
    motivationStyle,
    emotionalState,
    barriers,
    strengths,
    emotionalEatingTriggers,
    stressLevel,
    confidenceLevel,
    lifestylePace,
    productAffinity
  };
}

export function calculateMetabolicProfile(
  age: number = 30,
  weight: number,
  height: number,
  goal: 'weight_loss' | 'flexibility' | 'energy'
): MetabolicProfile {
  const bmr = 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier = 1.55;
  const tdee = Math.round(bmr * activityMultiplier);

  let calorieTarget = tdee;
  if (goal === 'weight_loss') {
    calorieTarget = Math.round(tdee * 0.85);
  } else if (goal === 'energy') {
    calorieTarget = Math.round(tdee * 1.1);
  }

  let proteinTarget = 30;
  let carbTarget = 40;
  let fatTarget = 30;

  if (goal === 'weight_loss') {
    proteinTarget = 35;
    carbTarget = 35;
    fatTarget = 30;
  } else if (goal === 'flexibility') {
    proteinTarget = 25;
    carbTarget = 50;
    fatTarget = 25;
  }

  const proteinG = Math.round((calorieTarget * (proteinTarget / 100)) / 4);
  const carbG = Math.round((calorieTarget * (carbTarget / 100)) / 4);
  const fatG = Math.round((calorieTarget * (fatTarget / 100)) / 9);

  const bmi = weight / ((height / 100) ** 2);
  let healthRiskScore = 0;
  let healthRiskLabel = 'Low Risk';

  if (bmi < 18.5) {
    healthRiskScore = 20;
    healthRiskLabel = 'Underweight — Focus on nutrition';
  } else if (bmi < 25) {
    healthRiskScore = 10;
    healthRiskLabel = 'Healthy — Maintain and optimize';
  } else if (bmi < 30) {
    healthRiskScore = 40;
    healthRiskLabel = 'Overweight — Gradual fat loss';
  } else {
    healthRiskScore = 70;
    healthRiskLabel = 'High Risk — Medical consultation recommended';
  }

  return {
    bmr: Math.round(bmr),
    tdee,
    calorieTarget,
    proteinG,
    carbG,
    fatG,
    proteinTarget,
    carbTarget,
    fatTarget,
    healthRiskScore,
    healthRiskLabel
  };
}

export function generateTransformationPlan(
  psychProfile: PsychologicalProfile,
  goal: 'weight_loss' | 'flexibility' | 'energy'
): TransformationPlan {
  let week1: string[] = [];
  let week2: string[] = [];
  let week3: string[] = [];
  let week4: string[] = [];
  let keyFocus = '';
  let consistencyStrategy = '';
  let weeklyProductTip: string[] = [];

  if (goal === 'weight_loss') {
    week1 = [
      'Start with 3x 30-minute walks (no gym required)',
      'Track one meal per day to build awareness',
      'Replace one sugary drink with water daily',
      'Get 7+ hours of sleep consistently'
    ];
    week2 = [
      'Add 2x 20-minute home workouts (bodyweight)',
      'Track all meals — no judgment, just awareness',
      'Meal prep one easy recipe (protein + veggies)',
      'Reduce refined carbs by 30%'
    ];
    week3 = [
      'Increase to 4x 30-minute workouts',
      'Create a weekly meal plan',
      'Try intermittent fasting 14:10 if interested',
      'Join an accountability group or find a buddy'
    ];
    week4 = [
      'Establish routine: 5x workouts weekly',
      'Full nutrition tracking with macros',
      'Take first transformation progress photos',
      'Plan month 2 goals and adjustments'
    ];
    keyFocus = 'Consistency over intensity — small daily wins compound';
    consistencyStrategy = psychProfile.emotionalState === 'overwhelmed'
      ? 'Start incredibly small — 10 minutes a day. Build the habit first, intensity later.'
      : 'Progressive challenge — increase by 10% weekly to stay engaged';
    weeklyProductTip = [
      'A keto cookbook can make healthy eating effortless this week',
      'Meal prep tools save hours — worth every penny',
      'A food scale helps with portion awareness without stress',
      'Consider a structured program to lock in your progress'
    ];
  } else if (goal === 'flexibility') {
    week1 = [
      '5x 10-minute yoga sessions (follow along online)',
      'Daily 2-minute stretching routine upon waking',
      'Learn basic diaphragmatic breathing',
      'Identify your tightest muscle groups'
    ];
    week2 = [
      '4x 20-minute yoga flows',
      'Add 5-minute morning mobility routine',
      'Experiment with different yoga styles (Hatha, Vinyasa)',
      'Note improvements in daily movement comfort'
    ];
    week3 = [
      '5x 30-minute yoga sessions',
      'Include one challenging flow per week',
      'Combine with light strength training (2x/week)',
      'Meditate 3x for 5 minutes'
    ];
    week4 = [
      'Full weekly routine established and maintained',
      'Mix yoga + strength + mobility seamlessly',
      'Track flexibility improvements with photos',
      'Plan for advanced postures or classes'
    ];
    keyFocus = "Progressive opening — respect your body's timeline";
    consistencyStrategy = 'Yoga is meditative — focus on how you FEEL, not performance';
    weeklyProductTip = [
      'A quality yoga mat makes daily practice more comfortable',
      'Yoga blocks help beginners achieve proper alignment',
      'An online yoga membership gives you variety and guidance',
      'Meditation apps complement your physical practice perfectly'
    ];
  } else {
    week1 = [
      '3x 25-minute energizing workouts',
      'Add caffeine-free morning ritual (10 min stretching)',
      'Optimize sleep schedule — aim for bed by 10pm',
      'Eat protein with every meal'
    ];
    week2 = [
      '4x 35-minute high-energy workouts',
      'Add pre-workout snack (banana + nut butter)',
      'Morning cold shower 3x per week (30 seconds)',
      'Hydrate 3+ liters daily'
    ];
    week3 = [
      '5x mixed intensity training sessions',
      'Add afternoon energy boost ritual',
      'Identify energy dips — address with movement or snacks',
      'Track energy levels in a journal'
    ];
    week4 = [
      'Establish your peak energy routine',
      'Full nutrition + movement + sleep optimization',
      'Energy transformation check-in',
      'Advanced training phase planning'
    ];
    keyFocus = 'Energy is multi-factor: sleep + nutrition + movement + mindset';
    consistencyStrategy = 'Energy feeds energy — start when you feel it most, then expand';
    weeklyProductTip = [
      'An energizing workout program can kickstart your momentum',
      'Meal planning tools help maintain stable energy through the day',
      'Sleep optimization resources transform recovery quality',
      'A holistic glow-up guide ties everything together beautifully'
    ];
  }

  if (psychProfile.stressLevel === 'high') {
    week1 = week1.map(w => w.includes('30-minute') ? w.replace('30-minute', '15-minute gentle') : w);
    week2 = week2.map(w => w.includes('20-minute') ? w.replace('20-minute', '15-minute') : w);
    if (!consistencyStrategy.includes('10 minutes')) {
      consistencyStrategy = 'Low stress is priority one — gentle movement still counts as a win';
    }
  }

  if (psychProfile.lifestylePace === 'hectic') {
    week1 = week1.filter(w => !w.includes('meal prep') && !w.includes('all meals'));
    week1.push('Use a simple checklist app to track just 2 habits');
    weeklyProductTip[0] = 'Short, efficient programs work best for your schedule';
  }

  if (psychProfile.emotionalEatingTriggers.length > 0) {
    week2.push('Identify your top 3 emotional eating triggers and write them down');
    week3.push('Practice a 5-minute pause before emotional eating — breathe or stretch instead');
    weeklyProductTip[1] = 'Mindful movement (yoga) helps break the emotional eating cycle';
  }

  return { week1, week2, week3, week4, keyFocus, consistencyStrategy, weeklyProductTip };
}

export function generatePersonalityInsights(
  psychProfile: PsychologicalProfile
): PersonalityInsight[] {
  const insights: PersonalityInsight[] = [];

  insights.push({
    trait: `Your Archetype: ${psychProfile.archetype}`,
    description: psychProfile.archetypeDescription,
    productSuggestion: `Products in ${psychProfile.productAffinity.join(', ')} categories are ideally suited for you`
  });

  if (psychProfile.motivationStyle === 'intrinsic') {
    insights.push({
      trait: 'Intrinsic Motivation',
      description: 'You are self-driven. Focus on personal improvement milestones rather than external validation. Track your own progress religiously.',
      productSuggestion: 'Goal-tracking tools and progress journals align with your internal drive'
    });
  } else if (psychProfile.motivationStyle === 'extrinsic') {
    insights.push({
      trait: 'Community Motivation',
      description: 'You thrive with external support. Join accountability groups, find a fitness buddy, or share progress publicly for maximum motivation.',
      productSuggestion: 'Community-based programs and coaching keep you engaged and accountable'
    });
  } else {
    insights.push({
      trait: 'Balanced Motivation',
      description: 'You respond to both internal and external drivers. Combine personal goals with community support for optimal results.',
      productSuggestion: 'A mix of self-guided programs and community support works best for you'
    });
  }

  insights.push({
    trait: `Emotional State: ${psychProfile.emotionalState.charAt(0).toUpperCase() + psychProfile.emotionalState.slice(1)}`,
    description:
      psychProfile.emotionalState === 'overwhelmed' ? 'Start small. One tiny habit change per week compounds into massive transformation. Avoid perfection paralysis.' :
      psychProfile.emotionalState === 'stressed' ? 'Movement and nutrition are stress management tools. Use fitness to decompress, not add pressure.' :
      psychProfile.emotionalState === 'motivated' ? 'Channel that energy into action immediately. Create momentum while you feel it.' :
      'Consistency beats intensity. Sustainable progress is your superpower.'
  });

  if (psychProfile.strengths.length > 0) {
    insights.push({
      trait: 'Your Superpowers',
      description: `Your key strengths are: ${psychProfile.strengths.join(', ')}. Leverage these in your fitness journey.`
    });
  }

  if (psychProfile.barriers.length > 0) {
    insights.push({
      trait: 'Known Barriers',
      description: `Common challenges: ${psychProfile.barriers.join(', ')}. Your plan specifically addresses these to ensure success.`,
      productSuggestion: psychProfile.barriers.includes('Time constraints') ? 'Short-duration programs (10-15 min) maximize your limited time' :
        psychProfile.barriers.includes('Emotional eating patterns') ? 'Mindfulness and yoga resources help break the cycle' :
        psychProfile.barriers.includes('Past discouragement') ? 'Beginner-friendly programs rebuild confidence gradually' :
        undefined
    });
  }

  if (psychProfile.emotionalEatingTriggers.length > 0) {
    insights.push({
      trait: 'Emotional Awareness',
      description: `Your emotional eating triggers include: ${psychProfile.emotionalEatingTriggers.join(', ')}. Awareness is the first step to freedom. Movement is a powerful alternative to emotional eating.`,
      productSuggestion: 'Yoga and mindfulness programs provide healthy emotional regulation tools'
    });
  }

  return insights;
}

export function generatePerAnswerInsights(quizData: any): PerAnswerInsight[] {
  const insights: PerAnswerInsight[] = [];

  const questions = [
    { key: 'identity', label: 'Who are you?' },
    { key: 'painPoint', label: 'What is your biggest pain point?' },
    { key: 'desiredResult', label: 'What is your desired result?' },
    { key: 'timeAvailable', label: 'How much time can you commit?' },
    { key: 'pastObstacle', label: 'What has stopped you before?' },
    { key: 'commitment', label: 'How committed are you?' },
    { key: 'urgency', label: 'What is your urgency level?' }
  ];

  for (const q of questions) {
    const answer = quizData[q.key] || '';
    if (!answer) continue;

    let insight = '';
    let recommendation = '';
    let productHint: string | undefined;

    if (q.key === 'identity') {
      if (answer.toLowerCase().includes('mom')) {
        insight = 'You are balancing multiple responsibilities. Your fitness journey needs to fit YOUR life, not the other way around.';
        recommendation = 'Short, efficient home workouts. 15 minutes of focus beats 1 hour of distraction.';
        productHint = 'Look for programs designed for busy moms — they understand your schedule';
      } else if (answer.toLowerCase().includes('working')) {
        insight = 'You have a structured life. This means you can leverage routines and habits effectively.';
        recommendation = 'Schedule workouts like meetings. Treat them as non-negotiable appointments.';
        productHint = 'Structured fitness programs match your professional mindset perfectly';
      } else if (answer.toLowerCase().includes('beginner')) {
        insight = 'You are starting fresh. This is actually an advantage — no bad habits to break, just new ones to build.';
        recommendation = 'Master the basics first. Consistency matters more than complexity.';
        productHint = 'Beginner-friendly programs build confidence without intimidation';
      }
    } else if (q.key === 'painPoint') {
      if (answer.toLowerCase().includes('belly') || answer.toLowerCase().includes('weight')) {
        insight = 'You are ready to address a specific body concern. This clarity is powerful.';
        recommendation = 'Combine targeted nutrition with full-body training for best results.';
        productHint = 'Nutrition guides and structured workout plans target stubborn areas effectively';
      } else if (answer.toLowerCase().includes('energy')) {
        insight = 'Low energy suggests sleep, nutrition, or stress issues. Fitness is the solution, not the problem.';
        recommendation = 'Prioritize sleep and nutrition first, then add movement for energy amplification.';
        productHint = 'Energy-focused programs address all three pillars: sleep, nutrition, movement';
      } else if (answer.toLowerCase().includes('stress') || answer.toLowerCase().includes('emotional')) {
        insight = "You are using fitness for mental health. This is one of fitness's greatest gifts.";
        recommendation = 'Yoga and walking are meditation in motion. Use movement for stress release.';
        productHint = 'Yoga and mindfulness programs transform stress into strength';
      }
    } else if (q.key === 'desiredResult') {
      if (answer.toLowerCase().includes('confidence')) {
        insight = 'Confidence comes from consistent action and visible progress. You will build it step by step.';
        recommendation = 'Track progress (photos, measurements, strength gains) to see confidence build.';
        productHint = 'Holistic glow-up guides combine inner and outer transformation';
      } else if (answer.toLowerCase().includes('health')) {
        insight = 'Health-focused motivation is sustainable and long-lasting. You are playing the long game.';
        recommendation = 'Focus on biomarkers: energy, sleep quality, lab work, how clothes fit.';
      }
    } else if (q.key === 'timeAvailable') {
      if (answer.toLowerCase().includes('30') || answer.toLowerCase().includes('1 hour')) {
        insight = 'You have solid time for this. Consistency will be your advantage.';
        recommendation = 'This is enough for real results. 30 mins of focused work beats 2 hours distracted.';
      } else if (answer.toLowerCase().includes('15') || answer.toLowerCase().includes('few minutes')) {
        insight = 'Limited time means maximum efficiency. Every minute counts.';
        recommendation = 'High-intensity circuits, yoga flows, or walking will fit perfectly.';
        productHint = 'Short-duration programs (10-15 min) deliver results in minimal time';
      }
    } else if (q.key === 'pastObstacle') {
      insight = `You have identified your failure pattern: ${answer}. Awareness is the first step to breaking it.`;
      recommendation = 'Build accountability systems to prevent this pattern from repeating.';
      if (answer.toLowerCase().includes('motivation')) {
        productHint = 'Structured programs with built-in accountability keep you on track when motivation dips';
      } else if (answer.toLowerCase().includes('money') || answer.toLowerCase().includes('wasted')) {
        productHint = 'Our programs come with a satisfaction guarantee — no risk, just results';
      }
    } else if (q.key === 'commitment') {
      if (answer.toLowerCase().includes('high') || answer.toLowerCase().includes('100')) {
        insight = 'Your high commitment is your greatest asset. Channel it into consistent action.';
        recommendation = 'Set ambitious goals and track them weekly for maximum motivation.';
      } else if (answer.toLowerCase().includes('moderate')) {
        insight = 'Moderate commitment is realistic and sustainable. Progress will compound over time.';
        recommendation = 'Focus on habit-building over heroic efforts. Small wins create big changes.';
      }
    } else if (q.key === 'urgency') {
      if (answer.toLowerCase().includes('very') || answer.toLowerCase().includes('urgent')) {
        insight = 'Your sense of urgency is powerful motivation. Use it now while momentum exists.';
        recommendation = 'Start immediately with Week 1 plan. Do not wait for perfect conditions.';
      } else if (answer.toLowerCase().includes('not') || answer.toLowerCase().includes('relaxed')) {
        insight = 'You are taking a long-term perspective. This allows for strategic, sustainable planning.';
        recommendation = 'Focus on building lifestyle habits that last, not quick fixes.';
      }
    }

    if (insight) {
      insights.push({
        question: q.label,
        answer,
        insight,
        recommendation,
        productHint
      });
    }
  }

  return insights;
}

export function analyzeQuizEnhanced(quizData: any): EnhancedAnalysis {
  const currentWeight = parseFloat(quizData.currentWeight) || 0;
  const height = parseFloat(quizData.height) || 0;
  const targetWeight = parseFloat(quizData.targetWeight) || 0;
  const age = parseInt(quizData.age) || 30;

  const bmi = currentWeight > 0 && height > 0 ? currentWeight / ((height / 100) ** 2) : 0;
  let bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese' = 'normal';
  if (bmi < 18.5) bmiCategory = 'underweight';
  else if (bmi >= 25 && bmi < 30) bmiCategory = 'overweight';
  else if (bmi >= 30) bmiCategory = 'obese';

  const desiredResult = (quizData.desiredResult || '').toLowerCase();
  let goal: 'weight_loss' | 'flexibility' | 'energy' = 'weight_loss';
  if (desiredResult.includes('flexibility') || desiredResult.includes('posture')) goal = 'flexibility';
  else if (desiredResult.includes('energy') || desiredResult.includes('confidence')) goal = 'energy';

  const weightToLose = currentWeight - targetWeight;

  let personalizedMessage = '';
  if (weightToLose > 5) {
    personalizedMessage = `Your metabolic analysis reveals ${Math.round(weightToLose)}kg between your current and ideal composition. Through scientifically calibrated nutrition timing, strategic macro partitioning, and progressive metabolic conditioning, you can achieve sustainable fat loss while preserving — and even building — lean muscle tissue. Your plan targets hormonal optimization and lifestyle integration for results that last.`;
  } else if (weightToLose < -3) {
    personalizedMessage = 'Your body composition goals require a strategic muscle-building protocol. Progressive resistance training combined with precision-calibrated nutrition will drive lean mass gains while maintaining your feminine aesthetics. Your plan leverages the latest research in female muscle physiology.';
  } else if (goal === 'flexibility') {
    personalizedMessage = 'Your focus on flexibility and mobility places you in the top tier of women who understand that true strength includes suppleness. Through progressive yoga sequencing, fascial release work, and mindful movement patterning, you will unlock range of motion, correct postural imbalances, and build lean, functional strength that protects your body for decades to come.';
  } else if (goal === 'energy') {
    personalizedMessage = 'Energy is the currency of a well-lived life — and yours is about to receive a strategic upgrade. By synchronizing your circadian rhythms, optimizing nutrient timing, regulating stress hormones, and implementing micro-recovery protocols, we will unlock a level of vitality that transforms how you show up for everything that matters.';
  } else {
    personalizedMessage = 'Your unique biometric and psychological profile has been analyzed against our database of 50,000+ women to create a comprehensive transformation blueprint. This is not generic fitness advice — it is a precision-crafted roadmap designed exclusively for your body, your psychology, and your life.';
  }

  const psychologicalProfile = analyzePsychologicalProfile(quizData);
  const metabolicProfile = calculateMetabolicProfile(age, currentWeight, height, goal);
  const transformationPlan = generateTransformationPlan(psychologicalProfile, goal);
  const personalityInsights = generatePersonalityInsights(psychologicalProfile);
  const perAnswerInsights = generatePerAnswerInsights(quizData);

  const credibilityBadges = [
    'Science-Based Analysis',
    'Personalized for Women',
    'AI-Powered Insights',
    '4-Week Transformation Plan',
    `${psychologicalProfile.archetype} Profile`,
    psychologicalProfile.emotionalEatingTriggers.length > 0 ? 'Emotional Wellness Focus' : 'Performance Optimization'
  ];

  let urgencyMessage = '';
  const urgency = (quizData.urgency || '').toLowerCase();
  if (urgency.includes('very') || urgency.includes('urgent')) {
    urgencyMessage = 'You are ready for change. Your personalized window is active now — start your transformation today.';
  } else if (urgency.includes('moderate') || urgency.includes('soon')) {
    urgencyMessage = 'You have the motivation. Do not let it fade — take the first step while you feel this drive.';
  }

  const yogaRecommendations = generateYogaRecommendations(goal, psychologicalProfile);
  const wellnessTips = generateWellnessTips(psychologicalProfile, goal);
  const actionPlan = generateActionPlan(transformationPlan);
  const transformationTimeline = generateTransformationTimeline(goal, psychologicalProfile, weightToLose);
  const dietTips = generateDietTips(goal, psychologicalProfile);
  const motivationQuotes = generateMotivationQuotes(psychologicalProfile);
  const aiCta = generateAiCta(psychologicalProfile);

  return {
    goal,
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    weightToLose: Math.round(weightToLose * 10) / 10,
    personalizedMessage,
    psychologicalProfile,
    metabolicProfile,
    transformationPlan,
    personalityInsights,
    perAnswerInsights,
    credibilityBadges,
    urgencyMessage,
    aiEnriched: true,
    yogaRecommendations,
    wellnessTips,
    actionPlan,
    transformationTimeline,
    dietTips,
    motivationQuotes,
    aiCta
  };
}

function generateYogaRecommendations(
  goal: 'weight_loss' | 'flexibility' | 'energy',
  psychProfile: PsychologicalProfile
): string[] {
  const recs: string[] = [];

  if (goal === 'flexibility' || goal === 'weight_loss') {
    recs.push('Daily 10-minute morning stretch flow to release overnight stiffness and reset your nervous system');
    recs.push('Hatha or Yin yoga 3x per week for deep connective tissue release and stress reduction');
    recs.push('Breathwork (4-7-8 method) before meals to activate parasympathetic state and improve digestion');
  } else {
    recs.push('Dynamic Vinyasa flow 4x per week to build internal heat and cardiovascular endurance');
    recs.push('Sun salutations as a 5-minute morning energy ritual to awaken the body');
    recs.push('Restorative yoga with props on rest days for active recovery and cortisol management');
  }

  if (psychProfile.stressLevel === 'high') {
    recs.push('Yoga Nidra (yogic sleep) 2x per week — clinically proven to reduce anxiety by up to 60%');
  }

  if (psychProfile.emotionalEatingTriggers.length > 0) {
    recs.push('Mindful movement practice — 5-minute pause-and-stretch before emotional eating episodes');
  }

  return recs;
}

function generateWellnessTips(
  psychProfile: PsychologicalProfile,
  goal: 'weight_loss' | 'flexibility' | 'energy'
): string[] {
  const tips: string[] = [];

  tips.push('Morning sunlight exposure (10-15 min within 30 min of waking) to entrain your circadian rhythm and boost vitamin D');

  if (psychProfile.stressLevel === 'high') {
    tips.push('Digital sunset — no screens 60 minutes before bed to protect melatonin production');
    tips.push('Box breathing (4-4-4-4) for 2 minutes whenever stress spikes — activates vagal tone');
  }

  if (psychProfile.lifestylePace === 'hectic') {
    tips.push('Batch your decisions — plan outfits, meals, and workouts the night before to conserve mental energy');
  }

  if (goal === 'weight_loss') {
    tips.push('Eat protein within 30 minutes of waking to stabilize blood sugar and reduce cravings');
    tips.push('Front-load your calories — larger breakfast and lunch, lighter dinner for metabolic advantage');
  } else if (goal === 'energy') {
    tips.push('Cold exposure (30-sec cold shower) 3x per week to increase dopamine and alertness');
    tips.push('Hydrate to 3L daily — even 2% dehydration drops energy by 20-30%');
  } else {
    tips.push('Incorporate dynamic sitting — use a stability ball or standing desk to improve posture throughout the day');
    tips.push('Self-myofascial release with a lacrosse ball for 5 min daily on tight areas');
  }

  tips.push('Weekly digital detox — 24 hours without social media to reset dopamine receptors and reduce comparison anxiety');

  return tips;
}

function generateActionPlan(plan: TransformationPlan): ActionPlanItem[] {
  const weeks = [plan.week1, plan.week2, plan.week3, plan.week4];
  const titles = [
    'Foundation & Awareness',
    'Building Momentum',
    'Expansion & Integration',
    'Mastery & Lock-In'
  ];
  const durations = ['15-20 min', '20-25 min', '25-30 min', '30-40 min'];
  const focuses = ['Habit formation', 'Intensity scaling', 'Routine automation', 'Performance optimization'];

  return weeks.map((items, i) => ({
    week: i + 1,
    title: titles[i],
    description: items.slice(0, 2).join('. '),
    duration: durations[i],
    focus: focuses[i]
  }));
}

function generateTransformationTimeline(
  goal: 'weight_loss' | 'flexibility' | 'energy',
  psychProfile: PsychologicalProfile,
  weightToLose: number
): string {
  const archetype = psychProfile.archetype;

  let timeline = `Your ${goal === 'weight_loss' ? 'body recomposition' : goal === 'flexibility' ? 'mobility transformation' : 'energy optimization'} follows a science-backed 4-phase progression designed for your ${archetype.toLowerCase()} profile.\n\n`;

  timeline += 'Week 1-2: NEURO-ADAPTATION PHASE\nYour nervous system learns new movement patterns. You may not see physical changes yet, but your brain is building neural superhighways. Energy levels begin stabilizing. Cortrol levels start normalizing.\n\n';

  timeline += 'Week 3-4: METABOLIC SHIFT PHASE\nYour body begins tapping into stored fat for fuel more efficiently.' + (goal === 'weight_loss' ? ' The scale starts moving downward. Clothes fit differently.' : '') + ' Sleep quality improves markedly. This is where most women report "something is changing."\n\n';

  timeline += 'Week 5-8: VISIBLE TRANSFORMATION PHASE\nPhysical changes become apparent. ' + (weightToLose > 0 ? `You can expect steady progress of 2-4kg during this window.` : 'Your body composition shifts noticeably.') + ' Friends and family will start commenting. Your confidence grows exponentially.\n\n';

  timeline += 'Week 9-12: LIFESTYLE INTEGRATION PHASE\nYour new habits become automatic. The effort that once felt challenging now feels natural. You have built a body and a lifestyle that serves you — not the other way around. This is where transformation becomes permanent.';

  if (psychProfile.stressLevel === 'high') {
    timeline += '\n\nNOTE: Given your current stress profile, your timeline may extend slightly — and that is by design. We prioritize cortisol management over speed because stressed bodies do not release fat efficiently. Patience here accelerates your long-term results.';
  }

  return timeline;
}

function generateDietTips(
  goal: 'weight_loss' | 'flexibility' | 'energy',
  psychProfile: PsychologicalProfile
): string[] {
  const tips: string[] = [];

  if (goal === 'weight_loss') {
    tips.push('Prioritize protein (25-35g per meal) to maximize thermic effect of food and preserve lean mass');
    tips.push('Eat vegetables first, then protein, then carbs — food order affects glucose response by up to 40%');
    tips.push('Reduce ultra-processed foods — they bypass satiety signals and drive overconsumption');
    tips.push('Time-restricted eating (14:10 window) aligns food intake with circadian metabolism');
  } else if (goal === 'flexibility') {
    tips.push('Anti-inflammatory foods (turmeric, ginger, omega-3s) accelerate recovery and reduce joint stiffness');
    tips.push('Hydrate with electrolytes — fascial tissue hydration directly impacts flexibility');
    tips.push('Collagen protein supports tendon and ligament health during mobility work');
    tips.push('Avoid inflammatory seed oils — they contribute to systemic inflammation and stiffness');
  } else {
    tips.push('Break the fast with protein within 30 min of waking to stabilize cortisol and blood sugar');
    tips.push('Iron-rich foods (spinach, lentils, red meat) combat the #1 cause of female fatigue');
    tips.push('B-vitamins from whole foods support mitochondrial energy production');
    tips.push('Limit caffeine after 2pm — it disrupts deep sleep and creates an energy debt cycle');
  }

  if (psychProfile.emotionalEatingTriggers.length > 0) {
    tips.push('Create a "pause protocol" — when craving hits, drink water, wait 10 minutes, then choose consciously');
    tips.push('Do not restrict during stress — maintenance eating is a win during high-cortisol periods');
  }

  return tips;
}

function generateMotivationQuotes(psychProfile: PsychologicalProfile): string[] {
  const quotes: string[] = [];

  if (psychProfile.archetype === 'Busy Working Woman') {
    quotes.push('"You do not need more time — you need more efficient actions. Quality beats quantity when your back is against the clock."');
    quotes.push('"Taking care of yourself is not selfish. It is the most productive thing you can do — for yourself and everyone who depends on you."');
    quotes.push('"Your body is not a machine. It is the vehicle that carries every ambition, every responsibility, every dream. Maintain it with reverence."');
  } else if (psychProfile.archetype === 'Emotional Eater') {
    quotes.push('"Food is not the problem — it is the solution you learned when you had no other tools. Now you are building a better toolbox."');
    quotes.push('"Healing your relationship with food is not about willpower. It is about rewiring your nervous system to know safety without the snack."');
    quotes.push('"Every time you choose movement over numbing, you are voting for the woman you are becoming."');
  } else if (psychProfile.archetype === 'Beginner Restarting Journey') {
    quotes.push('"The best time to start was yesterday. The second best time is today. Your past does not define your future — your next choice does."');
    quotes.push('"You have not failed. You have practiced. And now you know what does not work — which means you are closer than ever to what does."');
    quotes.push('"Comparison is the thief of progress. Your only competition is the woman you were yesterday."');
  } else if (psychProfile.archetype === 'Transformation-Ready Champion') {
    quotes.push('"The woman who says "I am ready" is already halfway there. Commitment is not a feeling — it is a decision that precedes the results."');
    quotes.push('"Discipline is simply choosing what you want most over what you want now. Every choice is a vote for your future self."');
    quotes.push('"You did not come this far to only come this far. The transformation you seek is on the other side of the work you are ready to do."');
  } else {
    quotes.push('"Consistency is not glamorous, but it is the only path to results that last. The compound effect of small daily choices is unstoppable."');
    quotes.push('"You do not rise to the level of your goals. You fall to the level of your systems. Your systems are now built for success."');
    quotes.push('"Patience is not passive waiting. It is active persistence in the direction of your goals while trusting the process."');
  }

  return quotes;
}

function generateAiCta(psychProfile: PsychologicalProfile): string {
  const archetype = psychProfile.archetype;

  const ctas: Record<string, string> = {
    'Busy Working Woman': 'START YOUR 15-MINUTE TRANSFORMATION',
    'Emotional Eater': 'BEGIN YOUR FREEDOM JOURNEY',
    'Beginner Restarting Journey': 'START FRESH — YOUR COMEBACK STARTS NOW',
    'Transformation-Ready Champion': 'UNLOCK YOUR TRANSFORMATION',
    'Consistent Grower': 'TAKE THE NEXT STEP',
    'Ambitious Achiever': 'START DOMINATING YOUR GOALS'
  };

  return ctas[archetype] || 'START YOUR TRANSFORMATION';
}
