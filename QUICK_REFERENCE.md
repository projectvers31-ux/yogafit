# Amazon Affiliate Product Recommender - Developer Quick Reference

## Quick Links

- **Main Page**: `/products`
- **Demo Page**: `/products` (has demo mode)
- **Core Logic**: `src/lib/affiliateProducts.ts`
- **Docs**: `AFFILIATE_PRODUCTS_README.md`
- **Test Report**: `TEST_CASE_REPORT.md`

---

## File Locations

```
src/
├── lib/
│   └── affiliateProducts.ts              [Core algorithm & product data]
├── components/products/
│   ├── AffiliateProducts.tsx              [Product grid display component]
│   ├── ProductRecommenderQuiz.tsx         [Interactive quiz form]
│   └── AffiliateProductDemo.tsx           [Demo & testing page]
└── pages/
    └── ProductRecommender.tsx             [Main page wrapper]
```

---

## Key Functions

### Build Recommendations
```typescript
import { buildRecommendations } from '@/lib/affiliateProducts';

const result = buildRecommendations({
  goal: 'lose weight',
  problem: 'no time for gym',
  budget: 50,
  experienceLevel: 'beginner',
  preferences: 'home workout'
});

// Returns:
// {
//   recommendations: [
//     { title, keyword, reason, conversion_score, affiliate_link, price, rating, reviews, image },
//     ...
//   ]
// }
```

### Match Products
```typescript
import { matchProductsWithQuiz } from '@/lib/affiliateProducts';

const topProducts = matchProductsWithQuiz(quizAnswers);
// Returns: AffiliateProduct[]
```

### Generate Link
```typescript
import { generateAffiliateLink } from '@/lib/affiliateProducts';

const link = generateAffiliateLink('yoga mat');
// Returns: https://www.amazon.com/s?k=yoga+mat&tag=233232122-20
```

### Get Match Reasons
```typescript
import { getMatchReasons } from '@/lib/affiliateProducts';

const reasons = getMatchReasons(product, quizAnswers);
// Returns: string[]
```

---

## Component Usage

### Display Products
```tsx
import AffiliateProducts from '@/components/products/AffiliateProducts';

<AffiliateProducts 
  recommendations={recommendations}
  title="Your Recommendations"
  description="Based on your quiz answers..."
/>
```

### Use Quiz Form
```tsx
import ProductRecommenderQuiz from '@/components/products/ProductRecommenderQuiz';

<ProductRecommenderQuiz />
```

### Run Demo
```tsx
import AffiliateProductDemo from '@/components/products/AffiliateProductDemo';

<AffiliateProductDemo />
```

---

## Types

```typescript
interface QuizAnswers {
  goal: string;
  problem: string;
  budget: number;
  experienceLevel: string;
  preferences: string;
}

interface AffiliateProduct {
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

interface RecommendationResult {
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
```

---

## Constants

### Affiliate Tag
```typescript
const AFFILIATE_TAG = '233232122-20';
```

### Product Categories
```typescript
'YOGA_MAT' | 'SUPPLEMENT' | 'HOME_FITNESS'
```

### Experience Levels
```typescript
'beginner' | 'intermediate' | 'advanced'
```

### Budget Tiers
```typescript
'budget' | 'mid' | 'premium'
```

---

## Data Access

### Yoga Mats Array
```typescript
import { yogaMats } from '@/lib/affiliateProducts';

// 45 products from $11.99 - $164.95
```

### Supplements Array
```typescript
import { supplements } from '@/lib/affiliateProducts';

// 7 supplements from $14.99 - $33.30
```

---

## Customization

### Change Affiliate Tag
**File**: `src/lib/affiliateProducts.ts` (line ~40)
```typescript
const AFFILIATE_TAG = 'YOUR_NEW_TAG_HERE';
```

### Add Product
**File**: `src/lib/affiliateProducts.ts` (line ~90 for yogaMats array)
```typescript
{
  id: 'unique-id',
  title: 'Product Name',
  keyword: 'search keyword',
  price: 29.99,
  rating: 4.6,
  reviews: 5000,
  imageUrl: 'image-url',
  amazonUrl: 'amazon-url',
  category: 'YOGA_MAT',
  goalMatch: ['weight_loss', 'flexibility'],
  experienceLevel: 'beginner',
  budget: 'mid',
  conversionScore: 85
}
```

### Adjust Scoring Weights
**File**: `src/lib/affiliateProducts.ts` in `matchProductsWithQuiz()` function
```typescript
// Change point allocations
if (goalLower.includes('weight')) score += 40; // Adjust this
if (problemLower.includes('home')) score += 30; // Or this
// ... etc
```

---

## Testing

### Test with Pre-filled Data
Visit `/products` and click "Generate Recommendations"

**Expected Result:**
- 5 yoga mats
- Prices $18-25
- Ratings 4.5-4.7
- Conversion scores 90-95%
- All include affiliate tag

### Verify Links
```javascript
// In browser console:
const link = 'https://www.amazon.com/s?k=yoga+mat&tag=233232122-20';
console.log(link.includes('233232122-20')); // Should be true
```

### Check Errors
```bash
npm run dev
# Check browser console for errors
# All TypeScript should compile without errors
```

---

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/products` | ProductRecommender | Main page |
| N/A | AffiliateProductDemo | Demo/test page |

---

## Integration Checklist

- [x] Import ProductRecommender in App.tsx
- [x] Add route `/products`
- [x] Add navbar link (desktop)
- [x] Add navbar link (mobile)
- [x] Create component files
- [x] Create page wrapper
- [x] Create library functions
- [x] Test with sample data
- [x] Verify affiliate links

---

## Performance Tips

### Optimize Product Display
```typescript
// Use React.memo for product cards
const ProductCard = React.memo(({ product }) => {
  // Component logic
});
```

### Lazy Load Images
```typescript
// Images use lazy loading via lazy attribute
<img src={product.image} loading="lazy" />
```

### Memoize Calculations
```typescript
const recommendations = useMemo(
  () => buildRecommendations(quizAnswers),
  [quizAnswers]
);
```

---

## Analytics Setup

### Track Affiliate Clicks
```typescript
const handleAffiliateClick = (product) => {
  trackEvent('affiliate_click', {
    product_id: product.id,
    conversion_score: product.conversionScore
  });
  // Then redirect
  window.open(product.affiliate_link, '_blank');
};
```

### Monitor Conversions
```typescript
// When user purchases through link
trackEvent('affiliate_conversion', {
  product_id: product.id,
  price: product.price,
  revenue: expectedCommission
});
```

---

## Troubleshooting

### Products Not Showing
1. Check console for errors
2. Verify `yogaMats` and `supplements` arrays populated
3. Confirm `matchProductsWithQuiz()` returns results

### Links Broken
1. Verify affiliate tag: `233232122-20`
2. Check URL encoding: `encodeURIComponent()`
3. Test link in incognito window

### Wrong Products Recommended
1. Review quiz input values
2. Check scoring algorithm in `matchProductsWithQuiz()`
3. Verify product goalMatch arrays

### Styling Issues
1. Ensure Tailwind CSS loaded
2. Check responsive breakpoints
3. Verify dark mode not enabled

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Targets

| Metric | Target | How to Test |
|--------|--------|-----------|
| Page Load | <1s | DevTools Performance |
| Recommendation | <500ms | Measure function execution |
| TTI | <2s | DevTools Lighthouse |
| Mobile | <3s | DevTools Mobile Throttling |

---

## Security Notes

- No sensitive data collected
- All links are external (safe)
- No local storage used
- No API keys exposed
- CORS compliant

---

## Version Info

- React: 18+
- TypeScript: 5+
- Tailwind: 3+
- Node: 16+

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview build

# Type Checking
npx tsc --noEmit         # Check for TypeScript errors

# Styling
npm run tailwind:build   # Build Tailwind CSS
```

---

## Resources

- [Amazon Associates](https://affiliate-program.amazon.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

## Support

- Full docs: `AFFILIATE_PRODUCTS_README.md`
- Test results: `TEST_CASE_REPORT.md`
- Implementation: `IMPLEMENTATION_SUMMARY.md`

---

**Last Updated**: May 27, 2026  
**Status**: Production Ready  
**Affiliate Tag**: `233232122-20`
