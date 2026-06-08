# FitFeky AI Agent Instructions

## What this repository is
- A React + TypeScript + Vite web application for a women's fitness / yoga quiz and landing site.
- Uses Tailwind CSS v4 and `react-router-dom` for navigation.
- Contains an optional automation backend in `backend/` that is separate from the main frontend app.

## Key commands
- `npm install` — install dependencies
- `npm run dev` — start the Vite development server on port 3000
- `npm run build` — build the production static app
- `npm run preview` — preview the production build locally
- `npm run lint` — type-check with `tsc --noEmit`
- `npm run fix-products` — run the repository script for product data cleanup
- In browser dev console: run `__affiliateReport()` to generate a product health maintenance report

## Affiliate Product System

### Architecture
The affiliate product system has three layers:

1. **`lib/affiliateRegistry.ts`** — Centralized product registry that merges `data/products.ts` (72 catalog products) and `data/products.json` (~80 recommendation products), deduplicating by ASIN. Provides single-source lookup: `getProduct(id)`, `getReplacementProduct(id)`, `getRelatedProducts(id)`.

2. **`lib/fallbackEngine.ts`** — Fallback recommendation layer. `resolveProduct(id)` returns the product or the best available replacement. `getCalculatorProducts(type, ids, count)` fills gaps with category-matched products.

3. **`lib/productHealth.ts`** — Validation and reporting. `generateReport()` returns a full maintenance report with invalid URLs, missing ASINs, low-quality products. `logReport(report)` prints it to console.

### Safe rendering components
- `components/affiliate/ProductMention.tsx` — Inline product card with auto-fallback to `/picks` or related products if URL is invalid or product missing.
- `components/affiliate/AffiliateCard.tsx` — Full/mini product card with URL validation; falls back to `<Link to="/picks">` if URL is invalid.
- `components/affiliate/SafeProductLink.tsx` — Render-prop component that resolves product ID with fallback; `SafeExternalLink` validates URLs before rendering.
- `components/affiliate/SafeProductCard.tsx` — Card wrapper with automatic replacement and related-products display.

### Data flow
```
CalculatorTemplate
  └─ productCards prop (product IDs)
      └─ resolveProduct(id) from fallbackEngine
          └─ getProduct(id) from affiliateRegistry
              ├─ data/products.ts (primary, 72 products)
              └─ data/products.json via lib/products.ts (secondary, ~80 products)
```

### Product health report
In dev mode, `__affiliateReport()` is available in the browser console. It outputs:
- Total / healthy / issue product counts
- Invalid URLs (products where Amazon URL fails validation)
- Missing ASINs
- Low-quality products (low rating or few reviews)
- A console.table of all issues with product name, type, and message

### Choosing a product data source
- **`data/products.ts`** — For curated catalog products used in calculator cards, `Picks.tsx` page, and `AffiliateCard`/`ProductMention` components. Has benefits, goals, and category metadata.
- **`data/products.json`** — For the recommendation engine (`lib/products.ts`) used in quiz results. Has tags, skillLevel, and numeric pricing.

Always use `lib/affiliateRegistry.ts` APIs (`getProduct`, `getReplacementProduct`, `resolveProduct`) rather than importing directly from data files.

## Important patterns and conventions
- Root package uses ESM: `type: "module"`.
- Vite alias `@` points to `frontend/src` in `frontend/vite.config.ts`.
- The main frontend app lives in `frontend/src/`.
- Core page composition is in `frontend/src/App.tsx` with lazily loaded route pages.
- UI components are organized under `frontend/src/components/`.
- Page-level screens live under `frontend/src/pages/`.
- Shared logic and utilities are in `frontend/src/lib/` and `frontend/src/hooks/`.
- Content and data files are under `frontend/src/content/` and `frontend/src/data/`.
- SEO metadata uses `frontend/src/components/seo/SEOHelmet.tsx` and `frontend/src/lib/seo.ts`.
- Tailwind classes are used throughout; preserve class-based styling when editing markup.

## When editing code
- Keep TypeScript types aligned with existing interface and type definitions.
- Use the `@` alias for imports from `frontend/src/` rather than relative paths where appropriate.
- Preserve lazy route imports in `frontend/src/App.tsx` unless a change explicitly requires eager loading.
- Do not add runtime code that depends on unsupported browser APIs without fallback.
- Avoid modifying the separate `backend/` subtree unless the task is specifically about the automation backend.

## Most relevant files for common tasks
- `frontend/src/App.tsx` — homepage and quiz flow, route setup, analytics hooks
- `frontend/src/pages/` — static pages, blog, stories, calculators
- `frontend/src/components/landing/` — hero, FAQ, social proof, testimonials
- `frontend/src/components/chatbot/` — chatbot UI and message handling
- `frontend/src/lib/quizAnalysis.ts` — quiz scoring and recommendation logic
- `frontend/src/lib/analytics.ts` — custom analytics tracking
- `frontend/src/content/blogArticles.ts` — blog content definitions
- `frontend/src/data/products.json` — product data used in recommendations
- `frontend/src/lib/affiliateRegistry.ts` — centralized product registry (use this for product lookups)
- `frontend/src/lib/fallbackEngine.ts` — fallback product resolution
- `frontend/src/lib/productHealth.ts` — product health validation and report generation
- `frontend/vite.config.ts` — build config, alias resolution, prod optimizations

## What to do first on a new task
1. Confirm whether the requested change is for the frontend app or the `backend/` backend.
2. Run `npm run lint` to catch TypeScript issues after edits.
3. Use `npm run dev` locally to verify UI and navigation changes.

## Notes for AI agents
- This repository currently has no dedicated test suite.
- Do not invent missing documentation; use actual existing files and code when possible.
- Keep suggestions limited to the app architecture and file structure present in this repo.
