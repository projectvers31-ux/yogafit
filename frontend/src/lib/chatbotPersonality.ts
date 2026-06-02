export interface ChatbotContext {
  userGoal?: 'weight_loss' | 'flexibility' | 'energy';
  userName?: string;
  userArchetype?: string;
  conversationTurn: number;
  previousTopics: string[];
}

export interface ChatResponse {
  content: string;
  tone: 'supportive' | 'motivational' | 'educational' | 'conversational';
  suggestions?: string[];
  shouldRecommendProduct?: boolean;
  recommendedProductCategory?: string;
}

export const SYSTEM_PROMPT = `You are FitFeky AI, a premium women's fitness and wellness coach.

RULES:
- Warm, supportive, encouraging tone
- Keep responses SHORT: 2-4 sentences max
- Give practical, actionable advice
- Never judge, never shame, always empower
- Focus on women's wellness
- End with a follow-up question
- NEVER use emojis`;

const RESPONSE_TEMPLATES = {
  greeting: [
    "Hi there! I'm your FitFeky AI Coach. What's on your mind today? Weight loss, fitness, yoga, nutrition, or something else?",
    "Welcome! I'm here to help with any women's fitness and wellness questions. What brought you here today?",
    "Hello! I'm your personal wellness coach. Whether you want to lose weight, build strength, or find calm — I can help. Where would you like to start?"
  ],
  weightLoss: [
    "Weight loss is about consistency over intensity. The best approach is the one you will actually stick with. Tell me more about your situation — what is your biggest challenge?",
    "I love when someone is ready to transform. Let us focus on sustainable habits. Quick fixes fail, but systems work. What is your current biggest obstacle?",
    "Sustainable weight loss happens when you stop fighting your body and start working with it. Small daily habits beat extreme efforts every time. What does your current routine look like?",
    "The number on the scale is just data — it does not define your progress. How your clothes fit, your energy levels, and how you feel matter more. What motivated you to start this journey?"
  ],
  motivation: [
    "Motivation is temporary, but systems are permanent. Tiny daily wins compound into massive results. Start incredibly small — can you commit to 10 minutes today?",
    "I get it — motivation fades. That is why we build habits instead. Even when you do not feel like it, your system carries you forward. What is one thing you can do today?",
    "Every expert was once a beginner who refused to give up. You do not need to be perfect — you just need to show up. What is the hardest part of staying consistent for you?"
  ],
  nutrition: [
    "Nutrition is 70% of transformation. The rule is simple: whole foods, right portions, consistency. What is your current biggest nutrition struggle?",
    "Eating right does not mean restriction — it means strategic choices that serve your body. Tell me what you are eating now, and I will help you optimize without suffering.",
    "Think of food as fuel, not the enemy. When you nourish your body well, everything else gets easier — your energy, your mood, your sleep. What does a typical day of eating look like for you?"
  ],
  yoga: [
    "Yoga is meditation in motion. It builds flexibility, reduces stress, and improves posture all at once. Are you a beginner or already practicing?",
    "Yoga transforms both body and mind. Even 10 minutes daily creates noticeable flexibility gains. What is drawing you to yoga?",
    "Yoga is one of the most powerful tools for women's wellness. It lowers cortisol, improves mobility, and builds strength without bulk. Would you like gentle flows or something more dynamic?"
  ],
  emotionalEating: [
    "Emotional eating is so common, and it is not a weakness — it is just your nervous system seeking comfort. Let us address the root: what emotions trigger eating for you?",
    "Food is often used for emotional regulation. That is human. But we can build better stress-relief tools. What stresses you most?",
    "When you feel the urge to eat emotionally, pause and ask: am I hungry, or am I feeling something uncomfortable? Naming the emotion takes away its power. What tends to trigger it for you?"
  ],
  confidence: [
    "Confidence comes from action, not motivation. Every small win rebuilds your belief in yourself. Start with one achievable goal — what is it?",
    "Your confidence will grow with every tiny victory. Track your progress visibly — photos, measurements, how your clothes fit. You will be amazed at the transformation.",
    "Feeling confident in your body starts with how you talk to yourself. Would you speak to a friend the way you speak to yourself? Let us work on that together. What is one thing you appreciate about your body today?"
  ],
  energy: [
    "Energy comes from sleep, nutrition, and movement. If you are tired, let us address these three first. Which is your weakest area?",
    "Low energy often signals your body needs something specific. Tell me: how is your sleep? What are you eating? Are you moving enough?",
    "Chronic fatigue is usually a sign that something is out of balance. Let us check the basics: hydration, sleep quality, protein intake, and stress levels. Which of these needs the most attention?"
  ],
  general: [
    "That is a great question. Let me help you find the right direction. What area of wellness are you most focused on right now?",
    "I am here to support you on every step of your wellness journey. Tell me a bit more about what you need help with, and I will give you practical advice you can use today.",
    "There is no one-size-fits-all approach to wellness. The key is finding what works for YOUR body and YOUR life. Let us figure that out together. What is your top priority right now?"
  ]
};

export function categorizeUserMessage(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes('weight') || msg.includes('fat') || msg.includes('lose') || msg.includes('lbs') || msg.includes('kg') || msg.includes('scale') || msg.includes('bmi')) {
    return 'weightLoss';
  } else if (msg.includes('motiv') || msg.includes('inspiration') || msg.includes('don\'t feel') || msg.includes('give up') || msg.includes('tired of')) {
    return 'motivation';
  } else if (msg.includes('food') || msg.includes('eat') || msg.includes('diet') || msg.includes('nutrition') || msg.includes('recipe') || msg.includes('meal') || msg.includes('calorie')) {
    return 'nutrition';
  } else if (msg.includes('yoga') || msg.includes('stretch') || msg.includes('flexibility') || msg.includes('posture') || msg.includes('meditation')) {
    return 'yoga';
  } else if (msg.includes('emotional') || msg.includes('stress') || msg.includes('comfort') || msg.includes('anxiety') || msg.includes('overwhelmed')) {
    return 'emotionalEating';
  } else if (msg.includes('confid') || msg.includes('self-esteem') || msg.includes('believe') || msg.includes('body image')) {
    return 'confidence';
  } else if (msg.includes('energy') || msg.includes('tired') || msg.includes('fatigue') || msg.includes('sleep')) {
    return 'energy';
  }

  return 'general';
}

export function shouldRecommendProduct(category: string, conversationTurn: number): { should: boolean; category?: string } {
  if (conversationTurn < 2) return { should: false };
  if (conversationTurn > 8) return { should: false };

  const productCategoryMap: Record<string, string> = {
    weightLoss: 'KETO',
    nutrition: 'KETO',
    yoga: 'YOGA',
    flexibility: 'YOGA',
    energy: 'FITNESS',
    emotionalEating: 'YOGA',
    motivation: 'FITNESS',
    confidence: 'GLOW'
  };

  if (productCategoryMap[category]) {
    return { should: true, category: productCategoryMap[category] };
  }

  return { should: false };
}

export function generateChatResponse(
  userMessage: string,
  context: ChatbotContext
): ChatResponse {
  const category = categorizeUserMessage(userMessage);
  const templates = RESPONSE_TEMPLATES[category as keyof typeof RESPONSE_TEMPLATES] || RESPONSE_TEMPLATES.greeting;
  const template = templates[Math.floor(Math.random() * templates.length)];

  let content = template;
  if (context.userName && content.toLowerCase().includes('hi there')) {
    content = content.replace(/Hi there/i, `Hi ${context.userName}`);
  }

  const suggestions = generateFollowUpSuggestions(category, context);
  const productRec = shouldRecommendProduct(category, context.conversationTurn);

  return {
    content,
    tone: selectTone(category),
    suggestions,
    shouldRecommendProduct: productRec.should,
    recommendedProductCategory: productRec.category
  };
}

export function selectTone(category: string): 'supportive' | 'motivational' | 'educational' | 'conversational' {
  const toneMap: Record<string, 'supportive' | 'motivational' | 'educational' | 'conversational'> = {
    emotionalEating: 'supportive',
    motivation: 'motivational',
    nutrition: 'educational',
    yoga: 'educational',
    energy: 'supportive',
    weightLoss: 'conversational',
    confidence: 'supportive',
    general: 'conversational'
  };

  return toneMap[category] || 'conversational';
}

export function generateFollowUpSuggestions(
  category: string,
  context: ChatbotContext
): string[] {
  const suggestions: Record<string, string[]> = {
    weightLoss: [
      'What is your current diet like?',
      'How much time can you exercise?',
      'What has stopped you before?'
    ],
    nutrition: [
      'Do you prefer meal prepping?',
      'Any dietary restrictions?',
      'What is your biggest food craving?'
    ],
    yoga: [
      'Are you a beginner?',
      'How much time daily?',
      'Looking for flexibility or strength?'
    ],
    motivation: [
      'What is your biggest goal?',
      'How can I help you get started?',
      'Want accountability tips?'
    ],
    emotionalEating: [
      'What stresses you most?',
      'Other stress relief methods?',
      'Support system in place?'
    ],
    energy: [
      'How many hours are you sleeping?',
      'What is your current diet?',
      'Moving regularly?'
    ],
    confidence: [
      'What would make you feel stronger?',
      'Do you track your progress?',
      'What is one win from this week?'
    ]
  };

  return suggestions[category] || [
    'Tell me more about your goals',
    'What is your biggest challenge?',
    'How can I support you?'
  ];
}

export function enhanceWithPersonality(response: ChatResponse, context: ChatbotContext): ChatResponse {
  const personalizations = {
    supportive: ' You have got this.',
    motivational: ' Let us make it happen.',
    educational: ' Understanding this changes everything.',
    conversational: ' I am here to help.'
  };

  if (!response.content.endsWith('.') && !response.content.endsWith('?') && !response.content.endsWith('!')) {
    response.content += personalizations[response.tone];
  }

  if (context.userArchetype === 'Busy Working Woman' && response.suggestions) {
    response.suggestions = response.suggestions.map(s =>
      s === 'How much time can you exercise?' ? 'Can you find just 10-15 mins daily?' : s
    );
  }

  if (context.userArchetype === 'Emotional Eater' && response.suggestions) {
    response.suggestions = response.suggestions.map(s =>
      s === 'What stresses you most?' ? 'What triggers your stress eating most?' : s
    );
  }

  if (context.userArchetype === 'Beginner Restarting Journey') {
    response.content += ' Starting fresh is actually a superpower — no bad habits to break.';
  }

  return response;
}

export function handleFAQ(userMessage: string): ChatResponse | null {
  const faqs: Record<string, ChatResponse> = {
    'how do i start': {
      content: 'Great question. Start here: 1) Commit to one small habit — 10 minutes daily, 2) Track your food for awareness, not restriction, 3) Get one week of consistency under your belt. That foundation builds everything else.',
      tone: 'motivational',
      suggestions: ['What habit interests you?', 'How much time can you commit?', 'Where do you struggle most?']
    },
    'best program for me': {
      content: 'The best program is the one YOU will actually do. I can help personalize based on your goal, lifestyle, and what has stopped you before. Tell me: what is your number one goal?',
      tone: 'conversational',
      suggestions: ['Weight loss focus', 'Flexibility focus', 'Energy focus']
    },
    'how fast will i see results': {
      content: 'Real talk: you will feel changes in 7 days — more energy, better sleep, mental clarity. Visible changes take 3-4 weeks — clothes fit better, energy boosts. Real transformation takes 12 weeks. Be patient with the process — it works.',
      tone: 'educational',
      suggestions: ['I am ready to start', 'What should week 1 look like?', 'How do I stay consistent?']
    },
    'emotional eating': {
      content: 'Emotional eating is your nervous system seeking comfort. You are not weak — you are human. Instead of fighting it, let us build better stress tools: yoga, walking, journaling, or talking. Which sounds good?',
      tone: 'supportive',
      suggestions: ['Yoga sounds great', 'More about stress relief', 'How do I stop cravings?']
    },
    'meal prep ideas': {
      content: 'Keep it simple: protein + veggies + healthy fat. Batch cook chicken or tofu, roast vegetables, and portion into containers. Takes 2 hours on Sunday and you are set for the week. Want specific recipes?',
      tone: 'educational',
      suggestions: ['Give me a recipe', 'How many meals?', 'Best snacks?']
    },
    'belly fat': {
      content: 'Belly fat is often driven by stress (cortisol) and nutrition. You cannot spot-reduce, but full-body strength training, clean eating, and stress management will transform your midsection. Yoga and walking are surprisingly effective here.',
      tone: 'educational',
      suggestions: ['Best exercises?', 'What foods help?', 'How long does it take?']
    },
    'postpartum': {
      content: 'Postpartum fitness is about rebuilding from the inside out. Start with deep core breathing, pelvic floor exercises, and gentle walking. Do not rush — your body needs time to heal. Many women love our gentle yoga programs for this phase.',
      tone: 'supportive',
      suggestions: ['When can I start?', 'Safe exercises?', 'Diastasis recti help?']
    },
    'what to eat': {
      content: 'Focus on protein at every meal, plenty of vegetables, healthy fats, and complex carbs. A simple formula: fill half your plate with veggies, a quarter with protein, and a quarter with whole grains or starchy veggies. Drink water before meals — thirst often feels like hunger.',
      tone: 'educational',
      suggestions: ['Meal prep ideas', 'Best snacks for weight loss', 'How many calories?']
    },
    'workout routine': {
      content: 'An ideal weekly routine combines strength training 3 times a week, cardio 2 times, and yoga or stretching 2 times. Each session can be just 20-30 minutes. Consistency beats intensity every time. What equipment do you have available?',
      tone: 'educational',
      suggestions: ['Bodyweight exercises', 'Home gym setup', 'Quick 15-min routines']
    },
    'stay consistent': {
      content: 'Consistency comes from identity, not willpower. Instead of saying "I need to work out," say "I am someone who moves her body daily." Attach your new habit to an existing one — do yoga right after your morning coffee. Stack your habits and they become automatic.',
      tone: 'motivational',
      suggestions: ['Morning routine tips', 'How to build habits', 'Overcome procrastination']
    },
    'water intake': {
      content: 'Aim for 2-3 liters of water daily. Start your morning with a full glass before coffee. If you feel hungry, drink water first — dehydration often masquerades as hunger. Add lemon or cucumber if plain water feels boring.',
      tone: 'educational',
      suggestions: ['How to drink more water', 'Best hydration tips', 'Signs of dehydration']
    },
    'sleep': {
      content: 'Sleep is when your body repairs and resets. Aim for 7-8 hours. Create a wind-down routine: no screens 30 minutes before bed, keep the room cool and dark, and try gentle stretching or deep breathing. Poor sleep directly impacts weight loss and cravings.',
      tone: 'supportive',
      suggestions: ['Improve sleep quality', 'Bedtime yoga routine', 'Natural sleep aids']
    },
    'cortisol': {
      content: 'Cortisol is your stress hormone, and when it is chronically high, your body holds onto belly fat and craves sugar. The best ways to lower it: gentle movement like yoga, deep breathing, adequate sleep, and reducing caffeine. Stress management is not optional — it is essential for weight loss.',
      tone: 'educational',
      suggestions: ['Stress relief techniques', 'Yoga for cortisol', 'Breathing exercises']
    }
  };

  const msg = userMessage.toLowerCase();
  for (const [key, response] of Object.entries(faqs)) {
    if (msg.includes(key)) {
      return response;
    }
  }

  return null;
}

export function getChatbotResponse(
  userMessage: string,
  context: ChatbotContext
): ChatResponse {
  const faqResponse = handleFAQ(userMessage);
  if (faqResponse) {
    return faqResponse;
  }

  let response = generateChatResponse(userMessage, context);
  response = enhanceWithPersonality(response, context);

  return response;
}

export function recommendProductNaturally(category: string, userArchetype?: string): string {
  const recommendations: Record<string, Record<string, string>> = {
    KETO: {
      default: 'If nutrition is your challenge, there are great resources designed specifically for women managing weight. No guilt, just delicious results.',
      'Busy Working Woman': 'Quick, no-fuss nutrition guides exist for women with zero time. They take the guesswork out of eating right — even on your busiest days.',
      'Emotional Eater': 'There are nutrition programs that focus on food freedom, not restriction. They help break the emotional eating cycle naturally.',
      'Beginner Restarting Journey': 'Simple, beginner-friendly nutrition guides can help you build confidence in the kitchen without feeling overwhelmed.'
    },
    YOGA: {
      default: 'Many women love yoga programs for flexibility and stress relief. They can transform both your body and mind.',
      'Busy Working Woman': 'Short 10-15 minute yoga flows exist for women with packed schedules. They melt stress and improve posture fast.',
      'Emotional Eater': 'Yoga is one of the best tools for emotional regulation. It calms your nervous system naturally and helps you feel in control.'
    },
    FITNESS: {
      default: 'There are science-backed fitness programs designed for real women\'s lives. They work around your schedule, not the other way around.',
      'Busy Working Woman': 'Efficient workout programs that deliver results in 20 minutes exist. No gym required, just consistency.',
      'Beginner Restarting Journey': 'Programs designed for absolute beginners exist. They build your strength gradually without intimidation.'
    },
    GLOW: {
      default: 'Holistic wellness guides help you feel confident from the inside out — covering skincare, habits, and mindset together.'
    }
  };

  const archetypeRecs = recommendations[category];
  if (!archetypeRecs) return 'We have resources tailored to exactly what you need.';

  return archetypeRecs[userArchetype || ''] || archetypeRecs.default || recommendations[category]?.default || 'We have resources tailored to exactly what you need.';
}
