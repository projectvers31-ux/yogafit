import { products as catalogProducts } from '@/data/products';
import { allProducts as jsonProducts, getProductById as getJsonProductById } from '@/lib/products';
import { isValidAmazonUrl } from '@/lib/urlValidation';
import { AFFILIATE_TAG } from '@/lib/affiliate';
import type { Product as CatalogProduct } from '@/data/products';
import type { Product as JsonProduct, ProductCategory, SkillLevel } from '@/lib/products';

export type RegistrySource = 'catalog' | 'json' | 'fallback';

export interface RegistryProduct {
  id: string;
  asin?: string;
  name: string;
  image: string;
  price: string;
  priceValue: number;
  rating: number;
  reviewCount: number;
  url: string;
  category: string;
  goals: string[];
  benefits: string[];
  tags: string[];
  skillLevel: SkillLevel;
  source: RegistrySource;
  isValid: boolean;
  validationError?: string;
}

function normalizeRegistryProduct(
  p: CatalogProduct | JsonProduct,
  source: RegistrySource,
): RegistryProduct {
  const isCatalog = 'affiliateLink' in p;
  const asin = isCatalog ? (p as CatalogProduct).asin : extractAsinFromUrl((p as JsonProduct).url);
  const url = isCatalog
    ? (p as CatalogProduct).affiliateLink
    : (p as JsonProduct).url;
  const valid = isValidAmazonUrl(url);

  return {
    id: p.id,
    asin,
    name: p.name,
    image: p.image,
    price: isCatalog ? (p as CatalogProduct).price : `$${(p as JsonProduct).price.toFixed(2)}`,
    priceValue: isCatalog
      ? parseFloat((p as CatalogProduct).price.replace(/[^0-9.]/g, '')) || 0
      : (p as JsonProduct).price,
    rating: p.rating,
    reviewCount: isCatalog
      ? (p as CatalogProduct).reviewCount
      : (p as JsonProduct).ratingsCount,
    url,
    category: isCatalog ? (p as CatalogProduct).category : (p as JsonProduct).category,
    goals: isCatalog ? (p as CatalogProduct).goals : [],
    benefits: isCatalog ? (p as CatalogProduct).benefits : [],
    tags: isCatalog ? [] : (p as JsonProduct).tags,
    skillLevel: isCatalog ? 'beginner' : (p as JsonProduct).skillLevel,
    source,
    isValid: valid,
    ...(valid ? {} : { validationError: `Invalid or missing Amazon URL: "${url}"` }),
  };
}

const ASIN_RE = /\/dp\/([A-Z0-9]{10})(?:\/|$)/i;
function extractAsinFromUrl(url: string): string | undefined {
  const match = url.match(ASIN_RE);
  return match ? match[1] : undefined;
}

// Build registry — deduplicate by ASIN, preferring catalog products
const asinMap = new Map<string, RegistryProduct>();
const idMap = new Map<string, RegistryProduct>();
const registryLog: string[] = [];

function log(msg: string) {
  registryLog.push(msg);
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[AffiliateRegistry] ${msg}`);
  }
}

// Load catalog products first (primary)
for (const p of catalogProducts) {
  const rp = normalizeRegistryProduct(p, 'catalog');
  idMap.set(rp.id, rp);
  if (rp.asin) {
    asinMap.set(rp.asin, rp);
  }
  if (!rp.isValid) {
    log(`Catalog product "${rp.name}" (${rp.id}) has ${rp.validationError}`);
  }
  if (!rp.asin) {
    log(`Catalog product "${rp.name}" (${rp.id}) has no ASIN`);
  }
}

// Load JSON products second, only if not already in registry by ASIN
for (const p of jsonProducts) {
  const rp = normalizeRegistryProduct(p, 'json');
  if (idMap.has(rp.id)) continue;
  if (rp.asin && asinMap.has(rp.asin)) continue;
  idMap.set(rp.id, rp);
  if (rp.asin) {
    asinMap.set(rp.asin, rp);
  }
  if (!rp.isValid) {
    log(`JSON product "${rp.name}" (${rp.id}) has ${rp.validationError}`);
  }
  if (!rp.asin) {
    log(`JSON product "${rp.name}" (${rp.id}) has no ASIN`);
  }
}

log(`Registry loaded: ${idMap.size} unique products (${catalogProducts.length} catalog + ${jsonProducts.length} json, ${idMap.size - catalogProducts.length} unique json)`);

// --- Public API ---

export function getProduct(id: string): RegistryProduct | undefined {
  return idMap.get(id);
}

export function getAllProducts(): RegistryProduct[] {
  return Array.from(idMap.values());
}

export function getProductsByCategory(category: string): RegistryProduct[] {
  return Array.from(idMap.values()).filter(
    p => p.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getProductsByGoal(goal: string): RegistryProduct[] {
  return Array.from(idMap.values()).filter(
    p => p.goals.some(g => g.toLowerCase() === goal.toLowerCase()),
  );
}

export function getProductsByTag(tag: string): RegistryProduct[] {
  return Array.from(idMap.values()).filter(
    p => p.tags.some(t => t.toLowerCase().includes(tag.toLowerCase())),
  );
}

/** Finds a replacement product when the requested one is unavailable */
export function getReplacementProduct(id: string): RegistryProduct | undefined {
  const product = idMap.get(id);
  if (!product) {
    // Pick any valid product
    const valid = Array.from(idMap.values()).find(p => p.isValid);
    return valid;
  }
  if (product.isValid) return product;

  // Same category, any valid product
  const sameCategory = Array.from(idMap.values()).find(
    p => p.category === product.category && p.id !== id && p.isValid,
  );
  if (sameCategory) return sameCategory;

  // Any valid product
  return Array.from(idMap.values()).find(p => p.isValid);
}

export function getRelatedProducts(id: string, count = 3): RegistryProduct[] {
  const product = idMap.get(id);
  if (!product) return [];

  const sameCategory = Array.from(idMap.values()).filter(
    p => p.id !== id && p.category === product.category && p.isValid,
  );
  if (sameCategory.length >= count) return sameCategory.slice(0, count);

  // Fill remaining with any valid products
  const others = Array.from(idMap.values()).filter(
    p => p.id !== id && p.isValid && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}

/** Returns all products in the Product format used by the recommendation engine */
export function getAllAsRecommendationProducts(): JsonProduct[] {
  const categoryMap: Record<string, ProductCategory> = {
    'yoga-mat': 'yoga',
    yoga: 'yoga',
    supplements: 'nutrition',
    nutrition: 'nutrition',
    'fitness-equipment': 'fitness',
    'health-wellness': 'weight_loss',
    'home-gym': 'fitness',
  };
  return Array.from(idMap.values())
    .filter(p => p.isValid && p.priceValue > 0)
    .map(p => ({
      id: p.id,
      name: p.name,
      url: p.url,
      image: p.image,
      price: p.priceValue,
      rating: p.rating,
      ratingsCount: p.reviewCount,
      category: categoryMap[p.category] || ('nutrition' as ProductCategory),
      tags: p.tags.length > 0 ? p.tags : [...p.goals, ...p.benefits],
      skillLevel: p.skillLevel,
    }));
}

/** Returns indices of products with issues for maintenance */
export function getRegistryHealthReport(): {
  totalProducts: number;
  validProducts: number;
  invalidProducts: number;
  missingAsin: number;
  log: string[];
  invalid: RegistryProduct[];
  noAsin: RegistryProduct[];
} {
  const all = getAllProducts();
  const invalid = all.filter(p => !p.isValid);
  const noAsin = all.filter(p => !p.asin);

  return {
    totalProducts: all.length,
    validProducts: all.filter(p => p.isValid).length,
    invalidProducts: invalid.length,
    missingAsin: noAsin.length,
    log: registryLog,
    invalid,
    noAsin,
  };
}
