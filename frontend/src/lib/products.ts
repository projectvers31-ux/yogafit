import rawData from '@/data/products.json';
import { ensureAffiliateTag } from './affiliate';

export type ProductCategory = 'weight_loss' | 'yoga' | 'fitness' | 'nutrition';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Product {
  id: string;
  name: string;
  url: string;
  image: string;
  price: number;
  rating: number;
  ratingsCount: number;
  category: ProductCategory;
  tags: string[];
  skillLevel: SkillLevel;
}

function normalizeProduct(item: any, index: number): Product | null {
  if (!item) return null;

  let name: string;
  let url: string;
  let image: string;
  let price: number;
  let rating: number;
  let ratingsCount: number;
  let category: ProductCategory;
  let tags: string[];
  let skillLevel: SkillLevel;

  if (item.id && item.name !== undefined) {
    name = String(item.name).trim();
    url = ensureAffiliateTag(String(item.url || ''));
    image = String(item.image || '');
    price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    rating = typeof item.rating === 'number' ? item.rating : parseFloat(item.rating) || 0;
    ratingsCount = typeof item.ratingsCount === 'number' ? item.ratingsCount : parseInt(item.ratingsCount, 10) || 0;
    category = item.category || 'nutrition';
    tags = Array.isArray(item.tags) ? item.tags : [];
    skillLevel = item.skillLevel || 'beginner';
  } else {
    name = String(item['Product Name'] || '').trim();
    url = ensureAffiliateTag(String(item['Product URL'] || ''));
    image = String(item['Product Image'] || '');
    price = parseFloat(item['Price (USD)']) || 0;
    rating = parseFloat(item['Rating (Max 5)']) || 0;
    ratingsCount = parseInt(item['Number of Ratings'], 10) || 0;

    const lower = name.toLowerCase();
    if (/\b(weight|fat.?burn|slim|belly.?fat|lose.?weight)\b/.test(lower)) category = 'weight_loss';
    else if (/\b(yoga|mat|stretch|flexibility|meditation)\b/.test(lower)) category = 'yoga';
    else if (/\b(protein|gym|muscle|pre.?workout|creatine|bcaa)\b/.test(lower)) category = 'fitness';
    else category = 'nutrition';

    const keywordMap: Record<string, string[]> = {
      detox: ['detox', 'cleanse'], cleanse: ['cleanse', 'detox'], colon: ['colon', 'digestive'],
      probiotic: ['probiotic', 'gut health'], fiber: ['fiber', 'digestive'], liver: ['liver', 'detox'],
      magnesium: ['magnesium', 'minerals'], charcoal: ['charcoal', 'detox'], enzyme: ['enzyme', 'digestion'],
      collagen: ['collagen', 'skin', 'joints'], protein: ['protein', 'nutrition'], vegan: ['vegan', 'plant-based'],
      sleep: ['sleep', 'rest'], stress: ['stress', 'calm'], energy: ['energy', 'vitality'],
      immune: ['immune', 'immunity'], weight: ['weight loss', 'fat loss'], thyroid: ['thyroid', 'hormone'],
      vitamin: ['vitamins', 'nutrition'], herbal: ['herbal', 'natural'], tea: ['herbal tea', 'detox'],
    };
    const found: string[] = [];
    for (const [keyword, tgs] of Object.entries(keywordMap)) {
      if (lower.includes(keyword)) found.push(...tgs);
    }
    tags = found.length > 0 ? [...new Set(found)] : ['supplement'];

    if (/\b(advanced|pro|extreme|intensive)\b/.test(lower)) skillLevel = 'advanced';
    else if (/\b(intermediate|plus|extra)\b/.test(lower)) skillLevel = 'intermediate';
    else skillLevel = 'beginner';
  }

  if (name.length < 3 || !url) return null;

  return {
    id: item.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80),
    name,
    url,
    image,
    price,
    rating,
    ratingsCount,
    category,
    tags,
    skillLevel,
  };
}

const _allProducts: Product[] = (rawData as any[])
  .map((item: any, i: number) => normalizeProduct(item, i))
  .filter((p: Product | null): p is Product => p !== null);

export const allProducts: readonly Product[] = _allProducts;

export function getProductById(id: string): Product | undefined {
  return _allProducts.find(p => p.id === id);
}
