import {
  getAllProducts,
  getReplacementProduct,
  getRelatedProducts,
  type RegistryProduct,
} from './affiliateRegistry';

export interface FallbackResult {
  primary: RegistryProduct;
  replacements: RegistryProduct[];
  usedFallback: boolean;
}

/**
 * Resolves a product by ID with fallback support.
 * If the primary product is invalid/missing, finds the best replacement.
 */
export function resolveProduct(id: string): FallbackResult {
  const replacement = getReplacementProduct(id);
  if (!replacement) {
    // Absolute fallback — first valid product in registry
    const anyValid = getAllProducts().find(p => p.isValid);
    return {
      primary: anyValid!,
      replacements: getAllProducts().filter(p => p.isValid && p.id !== anyValid?.id).slice(0, 3),
      usedFallback: true,
    };
  }

  const usedFallback = replacement.id !== id;
  const related = getRelatedProducts(replacement.id, 3);

  return {
    primary: replacement,
    replacements: related,
    usedFallback,
  };
}

/**
 * Batch-resolves multiple product IDs with fallback.
 */
export function resolveProducts(ids: string[]): FallbackResult[] {
  return ids.map(id => resolveProduct(id));
}

/**
 * Gets recommended products for a calculator page context.
 * Tries exact match first, then category match, then any valid product.
 */
export function getCalculatorProducts(
  calculatorType: string,
  productIds: string[],
  count = 2,
): RegistryProduct[] {
  const resolved = resolveProducts(productIds);

  const validProducts = resolved
    .filter(r => r.primary.isValid)
    .map(r => r.primary);

  if (validProducts.length >= count) return validProducts.slice(0, count);

  // Fill with category-matched products
  const categoryMap: Record<string, string[]> = {
    'BMR Calculator': ['health-wellness', 'fitness-equipment'],
    'Calorie Deficit': ['health-wellness', 'supplements'],
    'Macro Calculator': ['supplements', 'nutrition'],
    'Ideal Weight': ['health-wellness', 'fitness-equipment'],
    'Body Fat': ['health-wellness', 'fitness-equipment'],
    'TDEE Calculator': ['health-wellness', 'nutrition'],
    'Water Intake': ['health-wellness', 'fitness-equipment'],
    'Protein Calculator': ['supplements', 'nutrition'],
  };

  const categories = categoryMap[calculatorType] || ['health-wellness'];
  const all = getAllProducts();

  for (const cat of categories) {
    if (validProducts.length >= count) break;
    const catProducts = all.filter(
      p => p.category === cat && p.isValid && !validProducts.find(v => v.id === p.id),
    );
    validProducts.push(...catProducts.slice(0, count - validProducts.length));
  }

  return validProducts.slice(0, count);
}
