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
- `frontend/vite.config.ts` — build config, alias resolution, prod optimizations

## What to do first on a new task
1. Confirm whether the requested change is for the frontend app or the `backend/` backend.
2. Run `npm run lint` to catch TypeScript issues after edits.
3. Use `npm run dev` locally to verify UI and navigation changes.

## Notes for AI agents
- This repository currently has no dedicated test suite.
- Do not invent missing documentation; use actual existing files and code when possible.
- Keep suggestions limited to the app architecture and file structure present in this repo.
