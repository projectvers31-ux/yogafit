/**
 * Amazon Affiliate Product Recommendations
 * Tag: 233232122-20
 */

export interface AffiliateProduct {
  id: string;
  title: string;
  keyword: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  amazonUrl: string;
  category: 'YOGA_MAT' | 'SUPPLEMENT' | 'HOME_FITNESS';
  goalMatch: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  budget: 'budget' | 'mid' | 'premium';
  conversionScore: number;
}

export interface QuizAnswers {
  goal: string;
  problem: string;
  budget: number;
  experienceLevel: string;
  preferences: string;
}

export interface RecommendationResult {
  recommendations: Array<{
    title: string;
    keyword: string;
    reason: string;
    conversion_score: number;
    affiliate_link: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
  }>;
}

const AFFILIATE_TAG = '233232122-20';

// Yoga Mats Dataset
export const yogaMats: AffiliateProduct[] = [
  {
    id: 'amazon-basics-mat',
    title: 'Amazon Basics Extra Thick Exercise Yoga Mat',
    keyword: 'yoga mat',
    price: 22.48,
    rating: 4.6,
    reviews: 68518,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61WrjbRYC3L._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/AmazonBasics-Extra-Thick-Exercise-Carrying/dp/B01LP0U5X0/',
    category: 'YOGA_MAT',
    goalMatch: ['weight_loss', 'flexibility', 'home_workout'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 95
  },
  {
    id: 'gaiam-essentials',
    title: 'Gaiam Essentials 2/5" Thick Yoga & Pilates Mat',
    keyword: 'pilates mat',
    price: 18.78,
    rating: 4.6,
    reviews: 45844,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81Mb+wFuOML._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Gaiam-Essentials-Fitness-Exercise-Easy-Cinch/dp/B07H9PDL2Y/',
    category: 'YOGA_MAT',
    goalMatch: ['weight_loss', 'home_workout', 'flexibility'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 92
  },
  {
    id: 'retrospec-solana',
    title: 'Retrospec Solana Yoga Mat 1" Thick Non Slip',
    keyword: 'exercise mat',
    price: 31.61,
    rating: 4.5,
    reviews: 14335,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61T8eKzs2VL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Retrospec-Solana-Thick-Nylon-Strap/dp/B092XNCFF7/',
    category: 'YOGA_MAT',
    goalMatch: ['weight_loss', 'home_workout', 'flexibility'],
    experienceLevel: 'beginner',
    budget: 'mid',
    conversionScore: 88
  },
  {
    id: 'gruper-eco',
    title: 'Gruper Yoga Mat Non Slip Eco Friendly',
    keyword: 'eco friendly yoga mat',
    price: 19.47,
    rating: 4.5,
    reviews: 10125,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71MQ8weHJOL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Gruper-Friendly-Exercise-Exercises-Thickness-6mm/dp/B07JQCVBBZ/',
    category: 'YOGA_MAT',
    goalMatch: ['weight_loss', 'home_workout', 'flexibility'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 90
  },
  {
    id: 'cap-barbell-half',
    title: 'CAP Barbell 1/2-Inch High Density Exercise Mat',
    keyword: 'exercise mat',
    price: 18.99,
    rating: 4.7,
    reviews: 3230,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/713tDtR2ppL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/CAP-Barbell-Density-Exercise-strap/dp/B0DG3WYD54/',
    category: 'YOGA_MAT',
    goalMatch: ['weight_loss', 'home_workout'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 93
  },
  {
    id: 'fitvids-thick',
    title: 'Fitvids Yoga Mat 1/2-Inch Extra Thick',
    keyword: 'thick yoga mat',
    price: 18.44,
    rating: 4.5,
    reviews: 93978,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71h3+YwHtbL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Fitvids-Exercise-Anti-Tear-Carrying-Exercises/dp/B0DQC5XLFH/',
    category: 'YOGA_MAT',
    goalMatch: ['weight_loss', 'home_workout', 'flexibility'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 94
  },
  {
    id: 'balance-from-1inch',
    title: 'BalanceFrom Yoga Mat 1-Inch Extra Thick',
    keyword: 'thick exercise mat',
    price: 30.99,
    rating: 4.7,
    reviews: 18659,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61QBdY4wtbL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/One-Inch-Exercise-Anti-Tear-Carrying-Exercises/dp/B07R7RMQF5/',
    category: 'YOGA_MAT',
    goalMatch: ['weight_loss', 'home_workout'],
    experienceLevel: 'beginner',
    budget: 'mid',
    conversionScore: 91
  },
  {
    id: 'gaiam-premium-print',
    title: 'Gaiam Premium Print Reversible Yoga Mat',
    keyword: 'premium yoga mat',
    price: 29.24,
    rating: 4.7,
    reviews: 15444,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81oQh5H8mWL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Gaiam-Premium-Reversible-Exercise-Workouts/dp/B09WF85T8M/',
    category: 'YOGA_MAT',
    goalMatch: ['weight_loss', 'home_workout', 'flexibility'],
    experienceLevel: 'beginner',
    budget: 'mid',
    conversionScore: 89
  }
];

// Supplement Dataset (for additional recommendations)
export const supplements: AffiliateProduct[] = [
  {
    id: 'magnesium-glycinate-pure',
    title: 'Pure Encapsulations Magnesium Glycinate',
    keyword: 'magnesium supplement',
    price: 27.0,
    rating: 4.7,
    reviews: 48014,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71xzWlvjHAL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Pure-Encapsulations-Magnesium-Glycinate-Physiological/dp/B07P5K7DQP/',
    category: 'SUPPLEMENT',
    goalMatch: ['weight_loss', 'sleep', 'recovery'],
    experienceLevel: 'beginner',
    budget: 'mid',
    conversionScore: 85
  },
  {
    id: 'creatine-optimum',
    title: 'Optimum Nutrition Micronized Creatine',
    keyword: 'creatine powder',
    price: 16.0,
    rating: 4.6,
    reviews: 103425,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/712VrHndy5L._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/NUTRITION-Micronized-Creatine-Monohydrate-Unflavored/dp/B002DYIZEE/',
    category: 'SUPPLEMENT',
    goalMatch: ['weight_loss', 'muscle', 'strength'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 84
  },
  {
    id: 'probiotics-physicians',
    title: "Physician's CHOICE Probiotics 60 Billion CFU",
    keyword: 'probiotics',
    price: 20.37,
    rating: 4.6,
    reviews: 141965,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81iUTfEkj3L._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Probiotics-Formulated-Probiotic-Supplement-Acidophilus/dp/B079H53D2B/',
    category: 'SUPPLEMENT',
    goalMatch: ['weight_loss', 'digestion', 'gut_health'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 82
  },
  {
    id: 'collagen-vital',
    title: 'Vital Proteins Collagen Peptides',
    keyword: 'collagen powder',
    price: 18.65,
    rating: 4.6,
    reviews: 66739,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QZNoHaxdL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Vital-Proteins-Collagen-Peptides-Unflavored/dp/B09RQBHRCT/',
    category: 'SUPPLEMENT',
    goalMatch: ['weight_loss', 'skin', 'joints'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 80
  },
  {
    id: 'omega3-nordic',
    title: 'Nordic Naturals Ultimate Omega',
    keyword: 'omega 3 fish oil',
    price: 33.3,
    rating: 4.7,
    reviews: 58513,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61NIfEDqazL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/Nordic-Naturals-Ultimate-Omega-SoftGels/dp/B0739KKHWL/',
    category: 'SUPPLEMENT',
    goalMatch: ['weight_loss', 'heart', 'brain'],
    experienceLevel: 'beginner',
    budget: 'mid',
    conversionScore: 83
  },
  {
    id: 'vitamin-d3-naturewise',
    title: 'NatureWise Vitamin D3 5000iu',
    keyword: 'vitamin d3 supplement',
    price: 14.99,
    rating: 4.7,
    reviews: 192768,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/7162k36ybFL._AC_UL600_SR600,400_.jpg',
    amazonUrl: 'https://www.amazon.com/NatureWise-Vitamin-Function-Cold-Pressed-Gluten-Free/dp/B00GB85JR4/',
    category: 'SUPPLEMENT',
    goalMatch: ['weight_loss', 'immunity', 'bones'],
    experienceLevel: 'beginner',
    budget: 'budget',
    conversionScore: 81
  }
];

/**
 * Match quiz answers with products based on conversion probability
 */
export function matchProductsWithQuiz(quizAnswers: QuizAnswers): AffiliateProduct[] {
  const allProducts = [...yogaMats, ...supplements];
  
  // Parse quiz data
  const goalLower = quizAnswers.goal.toLowerCase();
  const problemLower = quizAnswers.problem.toLowerCase();
  const preferencesLower = quizAnswers.preferences.toLowerCase();
  const budgetNum = typeof quizAnswers.budget === 'string' ? parseInt(quizAnswers.budget) : quizAnswers.budget;
  const experienceLower = quizAnswers.experienceLevel.toLowerCase();

  // Score each product
  const scoredProducts = allProducts.map(product => {
    let score = 0;

    // Goal matching (40 points)
    if (goalLower.includes('weight') || goalLower.includes('loss')) {
      if (product.goalMatch.includes('weight_loss')) score += 40;
    }

    // Problem matching (30 points)
    if (problemLower.includes('home') || problemLower.includes('time')) {
      if (product.category === 'YOGA_MAT' || product.category === 'HOME_FITNESS') score += 30;
    }

    // Preferences matching (20 points)
    if (preferencesLower.includes('home') && product.category === 'YOGA_MAT') score += 20;
    if (preferencesLower.includes('fat') || preferencesLower.includes('burn')) {
      if (product.goalMatch.includes('weight_loss')) score += 15;
    }
    if (preferencesLower.includes('simple') || preferencesLower.includes('equipment')) {
      if (product.category === 'YOGA_MAT') score += 15;
    }

    // Budget matching (15 points)
    if (budgetNum <= 25 && product.budget === 'budget') score += 15;
    if (budgetNum <= 50 && (product.budget === 'budget' || product.budget === 'mid')) score += 15;
    if (budgetNum > 50 && product.budget === 'premium') score += 15;

    // Experience level matching (10 points)
    if (experienceLower.includes('beginner') && product.experienceLevel === 'beginner') score += 10;

    // Base conversion score
    score += product.conversionScore * 0.3;

    return { product, score };
  });

  // Sort by score and return top recommendations
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ product }) => product);
}

/**
 * Generate Amazon affiliate link
 */
export function generateAffiliateLink(keyword: string): string {
  const encodedKeyword = encodeURIComponent(keyword);
  return `https://www.amazon.com/s?k=${encodedKeyword}&tag=${AFFILIATE_TAG}`;
}

/**
 * Get match reasons for a product
 */
export function getMatchReasons(product: AffiliateProduct, quiz: QuizAnswers): string[] {
  const reasons: string[] = [];
  const goalLower = quiz.goal.toLowerCase();
  const preferencesLower = quiz.preferences.toLowerCase();

  if (product.category === 'YOGA_MAT') {
    reasons.push('Perfect for home workout without gym membership');
    if (goalLower.includes('weight') || goalLower.includes('loss')) {
      reasons.push('Ideal foundation for fat-burning home exercises');
    }
    if (quiz.experienceLevel.toLowerCase().includes('beginner')) {
      reasons.push('Beginner-friendly with excellent cushioning');
    }
    if (product.price <= 25) {
      reasons.push('Fits your tight budget');
    }
  } else if (product.category === 'SUPPLEMENT') {
    if (product.goalMatch.includes('weight_loss')) {
      reasons.push('Supports weight loss and metabolism');
    }
    if (product.price <= 30) {
      reasons.push('Affordable supplement option');
    }
  }

  if (product.rating >= 4.6) {
    reasons.push(`Highly rated (${product.rating}⭐ with ${product.reviews.toLocaleString()} reviews)`);
  }

  return reasons;
}

/**
 * Build complete recommendation result
 */
export function buildRecommendations(quizAnswers: QuizAnswers): RecommendationResult {
  const topProducts = matchProductsWithQuiz(quizAnswers);

  const recommendations = topProducts.map(product => ({
    title: product.title,
    keyword: product.keyword,
    reason: getMatchReasons(product, quizAnswers)[0] || 'Best match for your goals',
    conversion_score: product.conversionScore,
    affiliate_link: generateAffiliateLink(product.keyword),
    price: product.price,
    rating: product.rating,
    reviews: product.reviews,
    image: product.imageUrl
  }));

  return { recommendations };
}
