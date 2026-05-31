import * as fs from 'node:fs';
import * as path from 'node:path';

const AFFILIATE_TAG = '233232122-20';
const RAW_PATH = path.resolve(import.meta.dirname, '../src/data/products.json');
const OUTPUT_PATH = path.resolve(import.meta.dirname, '../src/data/products-enhanced.json');

const AMAZON_DOMAINS = [
  'amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.fr',
  'amazon.co.jp', 'amazon.ca', 'amazon.it', 'amazon.es',
  'amazon.in', 'amazon.com.au', 'amazon.com.br', 'amazon.com.mx',
  'amazon.nl', 'amazon.se', 'amazon.pl', 'amazon.sg',
];

type ProductCategory = 'weight_loss' | 'yoga' | 'fitness' | 'nutrition';
type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

interface RawProduct {
  'Product Name': string;
  'Product URL': string;
  'Product Image': string;
  'Price (USD)': string;
  'Rating (Max 5)': string;
  'Number of Ratings': string;
}

interface EnhancedProduct {
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

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);
}

function isAmazonUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return AMAZON_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
  } catch {
    return false;
  }
}

function ensureAffiliateTag(url: string): string {
  if (!isAmazonUrl(url)) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('tag', AFFILIATE_TAG);
    return parsed.toString();
  } catch {
    return url;
  }
}

function deriveCategory(name: string): ProductCategory {
  const lower = name.toLowerCase();
  if (/\b(weight|fat.?burn|slim|belly.?fat|lose.?weight)\b/.test(lower)) return 'weight_loss';
  if (/\b(yoga|mat|stretch|flexibility|meditation)\b/.test(lower)) return 'yoga';
  if (/\b(protein|gym|muscle|pre.?workout|creatine|bcaa)\b/.test(lower)) return 'fitness';
  return 'nutrition';
}

function deriveTags(name: string): string[] {
  const lower = name.toLowerCase();
  const found: string[] = [];
  const keywordMap: Record<string, string[]> = {
    detox: ['detox', 'cleanse'],
    cleanse: ['cleanse', 'detox'],
    colon: ['colon', 'digestive'],
    probiotic: ['probiotic', 'gut health'],
    fiber: ['fiber', 'digestive'],
    liver: ['liver', 'detox'],
    magnesium: ['magnesium', 'minerals'],
    charcoal: ['charcoal', 'detox'],
    enzyme: ['enzyme', 'digestion'],
    collagen: ['collagen', 'skin', 'joints'],
    protein: ['protein', 'nutrition'],
    vegan: ['vegan', 'plant-based'],
    sleep: ['sleep', 'rest'],
    stress: ['stress', 'calm'],
    energy: ['energy', 'vitality'],
    immune: ['immune', 'immunity'],
    weight: ['weight loss', 'fat loss'],
    thyroid: ['thyroid', 'hormone'],
    vitamin: ['vitamins', 'nutrition'],
    herbal: ['herbal', 'natural'],
    tea: ['herbal tea', 'detox'],
  };
  for (const [keyword, tags] of Object.entries(keywordMap)) {
    if (lower.includes(keyword)) found.push(...tags);
  }
  if (found.length === 0) found.push('supplement');
  return [...new Set(found)];
}

function deriveSkillLevel(name: string): SkillLevel {
  const lower = name.toLowerCase();
  if (/\b(advanced|pro|extreme|intensive)\b/.test(lower)) return 'advanced';
  if (/\b(intermediate|plus|extra)\b/.test(lower)) return 'intermediate';
  return 'beginner';
}

function validate(raw: RawProduct, i: number): string | null {
  if (!raw['Product Name'] || raw['Product Name'].trim().length < 3) return `#${i}: missing name`;
  if (!raw['Product URL']?.startsWith('http')) return `#${i}: missing URL`;
  if (!raw['Product Image']?.startsWith('http')) return `#${i}: missing image`;
  const price = parseFloat(raw['Price (USD)']);
  if (isNaN(price) || price <= 0) return `#${i}: invalid price "${raw['Price (USD)']}"`;
  const rating = parseFloat(raw['Rating (Max 5)']);
  if (isNaN(rating) || rating < 0 || rating > 5) return `#${i}: invalid rating`;
  return null;
}

function main() {
  const raw: RawProduct[] = JSON.parse(fs.readFileSync(RAW_PATH, 'utf-8'));

  console.log(`Loaded ${raw.length} raw products from ${RAW_PATH}`);

  const errors: string[] = [];
  const enhanced: EnhancedProduct[] = [];
  let fixedUrls = 0;

  for (let i = 0; i < raw.length; i++) {
    const err = validate(raw[i], i);
    if (err) {
      errors.push(err);
      continue;
    }

    const name = raw[i]['Product Name'].trim();
    const originalUrl = raw[i]['Product URL'].trim();
    const fixedUrl = ensureAffiliateTag(originalUrl);

    if (fixedUrl !== originalUrl) fixedUrls++;

    enhanced.push({
      id: slugify(name),
      name,
      url: fixedUrl,
      image: raw[i]['Product Image'].trim(),
      price: parseFloat(raw[i]['Price (USD)']),
      rating: parseFloat(raw[i]['Rating (Max 5)']),
      ratingsCount: parseInt(raw[i]['Number of Ratings'], 10) || 0,
      category: deriveCategory(name),
      tags: deriveTags(name),
      skillLevel: deriveSkillLevel(name),
    });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(enhanced, null, 2), 'utf-8');

  console.log(`\nResults:`);
  console.log(`  Valid products: ${enhanced.length}`);
  console.log(`  Removed (invalid): ${errors.length}`);
  console.log(`  URLs fixed with affiliate tag: ${fixedUrls}`);
  console.log(`  Output: ${OUTPUT_PATH}`);

  if (errors.length > 0) {
    console.log(`\nValidation errors:`);
    errors.forEach(e => console.log(`  - ${e}`));
  }

  const counts: Record<string, number> = {};
  for (const p of enhanced) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  console.log(`\nCategory breakdown:`);
  for (const [cat, n] of Object.entries(counts)) {
    console.log(`  ${cat}: ${n}`);
  }
}

main();
