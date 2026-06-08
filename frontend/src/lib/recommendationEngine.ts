import type { EnhancedAnalysis } from './quizAnalysis';
import { getAllAsRecommendationProducts } from './affiliateRegistry';
import type { Product } from './products';

const allProducts = getAllAsRecommendationProducts();

export interface RecommendationInput {
  goal: string;
  tags: string[];
  level: string;
  category?: string;
}

export interface RecommendationResult {
  products: Product[];
}

const GOAL_CATEGORY_MAP: Record<string, string> = {
  weight_loss: 'weight_loss',
  flexibility: 'yoga',
  energy: 'nutrition',
};

const GOAL_TAGS_MAP: Record<string, string[]> = {
  weight_loss: ['weight loss', 'fat loss', 'detox', 'energy', 'digestive'],
  flexibility: ['joints', 'calm', 'stress', 'herbal', 'natural'],
  energy: ['energy', 'vitality', 'protein', 'nutrition', 'vitamins', 'herbal'],
};

const ARCHETYPE_TAG_MAP: Record<string, string[]> = {
  'Busy Working Woman': ['energy', 'quick', 'herbal'],
  'Emotional Eater': ['stress', 'calm', 'herbal', 'digestive'],
  'Beginner Restarting Journey': ['digestive', 'detox', 'calm'],
  'Transformation-Ready Champion': ['weight loss', 'protein', 'energy'],
  'Consistent Grower': ['vitamins', 'nutrition', 'herbal'],
  'Ambitious Achiever': ['energy', 'protein', 'nutrition'],
};

const FOCUS_CATEGORY_TAGS: Record<string, string[]> = {
  weight_loss: ['weight loss', 'fat loss', 'detox', 'digestive'],
  quick_session: ['energy', 'quick', 'vitality'],
  strength: ['protein', 'nutrition', 'vitamins'],
  stress_relief: ['stress', 'calm', 'sleep', 'herbal'],
  low_impact: ['joints', 'digestive', 'natural'],
  mindfulness: ['herbal', 'calm', 'natural'],
  flexibility: ['joints', 'calm'],
  energy: ['energy', 'vitality', 'protein'],
};

function generateDefaultTags(goal: string): string[] {
  return GOAL_TAGS_MAP[goal] || ['supplement', 'nutrition'];
}

function calculateScore(product: Product, input: RecommendationInput): number {
  let score = 0;

  const goalCategory = GOAL_CATEGORY_MAP[input.goal] || 'nutrition';
  if (product.category === goalCategory) score += 30;

  if (input.tags.length > 0) {
    for (const tag of input.tags) {
      if (product.tags.includes(tag)) {
        score += 25;
      }
    }
  }

  if (input.level === 'beginner' && product.skillLevel === 'beginner') {
    score += 15;
  } else if (input.level === 'intermediate' && product.skillLevel !== 'beginner') {
    score += 10;
  }

  if (product.rating >= 4.5) score += 15;
  else if (product.rating >= 4.0) score += 10;

  if (product.ratingsCount > 10000) score += 12;
  else if (product.ratingsCount > 5000) score += 8;
  else if (product.ratingsCount > 1000) score += 5;

  return score;
}

function getTopRatedProducts(limit: number): Product[] {
  return [...allProducts]
    .sort((a, b) => {
      const ratingDiff = b.rating - a.rating;
      if (ratingDiff !== 0) return ratingDiff;
      return b.ratingsCount - a.ratingsCount;
    })
    .slice(0, limit);
}

export function getTopRecommendations(analysis: EnhancedAnalysis, max: number = 3): Product[] {
  const goal = analysis.goal;
  const archetype = analysis.psychologicalProfile.archetype;
  const focusCategories = analysis.psychologicalProfile.focusCategories || [];
  const bmiCategory = analysis.bmiCategory || 'normal';

  let tags: string[] = generateDefaultTags(goal);

  const archetypeTags = ARCHETYPE_TAG_MAP[archetype] || [];
  tags.push(...archetypeTags);

  for (const focus of focusCategories) {
    const focusTags = FOCUS_CATEGORY_TAGS[focus] || [];
    tags.push(...focusTags);
  }

  if (bmiCategory === 'overweight' || bmiCategory === 'obese') {
    tags.push('weight loss', 'detox', 'digestive');
  }

  tags = [...new Set(tags)];

  console.log('[RecommendationEngine] Input:', { goal, archetype, focusCategories, bmiCategory });
  console.log('[RecommendationEngine] Generated tags:', tags);

  let level = 'beginner';
  if (archetype === 'Transformation-Ready Champion' || archetype === 'Ambitious Achiever') {
    level = 'intermediate';
  }

  const input: RecommendationInput = { goal, tags, level };

  const scored = allProducts
    .map(p => ({ product: p, score: calculateScore(p, input) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ratingDiff = b.product.rating - a.product.rating;
      if (ratingDiff !== 0) return ratingDiff;
      return b.product.ratingsCount - a.product.ratingsCount;
    });

  console.log('[RecommendationEngine] Scored products:', scored.slice(0, 10).map(s => ({ name: s.product.name, score: s.score, rating: s.product.rating, reviews: s.product.ratingsCount })));

  const matched = scored.filter(s => s.score > 0);
  console.log('[RecommendationEngine] Matched products (score > 0):', matched.length);

  if (matched.length >= max) {
    const result = matched.slice(0, max).map(s => s.product);
    console.log('[RecommendationEngine] Returning matched products:', result.map(p => p.name));
    return result;
  }

  if (matched.length > 0) {
    const result = matched.map(s => s.product);
    const remaining = max - result.length;
    const fillers = getTopRatedProducts(remaining + 3)
      .filter(f => !result.find(r => r.id === f.id))
      .slice(0, remaining);
    result.push(...fillers);
    console.log('[RecommendationEngine] Partially matched, filled with top-rated:', result.map(p => p.name));
    return result;
  }

  const fallback = getTopRatedProducts(max);
  console.log('[RecommendationEngine] No match, returning top-rated fallback:', fallback.map(p => p.name));
  return fallback;
}
