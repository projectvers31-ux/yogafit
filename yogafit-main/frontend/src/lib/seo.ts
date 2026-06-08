export const SITE_URL = 'https://www.fitfeky.com';
export const SITE_NAME = 'FitFeky';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.webp`;
export const TWITTER_HANDLE = '@fitfeky';
export const AUTHOR = 'FitFeky Wellness Team';

const TITLE_SUFFIX = ` | ${SITE_NAME}`;

export const TITLES: Record<string, string> = {
  '/': `Women's Fitness Quiz — Free Personalized Yoga Plan${TITLE_SUFFIX}`,
  '/about': `About Us${TITLE_SUFFIX}`,
  '/contact': `Contact Us${TITLE_SUFFIX}`,
  '/privacy': `Privacy Policy${TITLE_SUFFIX}`,
  '/terms': `Terms of Service${TITLE_SUFFIX}`,
  '/blog': `Wellness Blog — Tips for Women's Health & Fitness${TITLE_SUFFIX}`,
  '/stories': `Real Success Stories — Women's Transformation Journeys${TITLE_SUFFIX}`,
  '/calculators': `Free Fitness Calculators — TDEE, BMR, Macro, BMI & More${TITLE_SUFFIX}`,
  '/calculators/tdee-calculator': `TDEE Calculator — Calculate Your Total Daily Energy Expenditure${TITLE_SUFFIX}`,
  '/calculators/bmr-calculator': `BMR Calculator — Basal Metabolic Rate Calculator for Women${TITLE_SUFFIX}`,
  '/calculators/calorie-deficit-calculator': `Calorie Deficit Calculator — Lose Weight Calculator${TITLE_SUFFIX}`,
  '/calculators/macro-calculator': `Macro Calculator — Calculate Your Daily Macros${TITLE_SUFFIX}`,
  '/calculators/ideal-weight-calculator': `Ideal Weight Calculator — Find Your Healthy Weight${TITLE_SUFFIX}`,
  '/calculators/body-fat-calculator': `Body Fat Calculator — Estimate Your Body Fat Percentage${TITLE_SUFFIX}`,
  '/calculators/water-intake-calculator': `Water Intake Calculator — How Much Water to Drink Daily${TITLE_SUFFIX}`,
  '/calculators/protein-calculator': `Protein Calculator — Daily Protein Intake for Women${TITLE_SUFFIX}`,
};

export const DESCRIPTIONS: Record<string, string> = {
  '/': 'Take our free women\'s fitness quiz in 60 seconds. Get a personalized yoga and weight loss program for busy women. Instant results. No credit card required.',
  '/about': 'FitFeky creates science-backed, personalized fitness and nutrition plans for women. Built by certified instructors and backed by behavioral science.',
  '/contact': 'Have questions about your personalized fitness plan? Contact the FitFeky team. We are here to help you on your transformation journey.',
  '/privacy': 'FitFeky takes your privacy seriously. Read our privacy policy to understand how we collect, use, and protect your personal information.',
  '/terms': 'Read the terms and conditions for using FitFeky\'s personalized fitness and wellness services.',
  '/blog': 'Expert wellness articles for women covering yoga for weight loss, nutrition tips, fitness routines, and healthy lifestyle advice. Updated weekly.',
  '/stories': 'Real women, real transformations. Read inspiring success stories from women who transformed their bodies and lives with FitFeky\'s personalized plans.',
  '/calculators': 'Use our free fitness calculators to track your health metrics. TDEE, BMR, BMI, macro, calorie deficit, ideal weight, body fat, water intake, and protein calculators.',
  '/calculators/tdee-calculator': 'Calculate your Total Daily Energy Expenditure (TDEE) for free. Get personalized calorie targets for weight loss, maintenance, or muscle gain.',
  '/calculators/bmr-calculator': 'Calculate your Basal Metabolic Rate (BMR) — the calories your body burns at rest. Free BMR calculator for women with personalized results.',
  '/calculators/calorie-deficit-calculator': 'Use our free calorie deficit calculator to determine how many calories you need to eat to lose weight safely and sustainably.',
  '/calculators/macro-calculator': 'Calculate your daily macronutrient needs — protein, carbs, and fat — based on your goals. Free macro calculator for women.',
  '/calculators/ideal-weight-calculator': 'Find your ideal body weight based on height, age, and body frame. Free ideal weight calculator for women.',
  '/calculators/body-fat-calculator': 'Estimate your body fat percentage with our free calculator. Track your body composition changes over time.',
  '/calculators/water-intake-calculator': 'Calculate how much water you should drink daily based on your weight, activity level, and climate. Free hydration calculator.',
  '/calculators/protein-calculator': 'Calculate your daily protein needs based on your weight, activity level, and fitness goals. Free protein intake calculator for women.',
};

export function pageTitle(page: string, customSuffix?: string): string {
  return TITLES[page] || `${page.replace(/^\//, '').replace(/[-/]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}${TITLE_SUFFIX}`;
}

export function pageDescription(page: string): string {
  return DESCRIPTIONS[page] || 'Personalized fitness and wellness plans for women. Science-backed yoga, nutrition, and lifestyle programs.';
}

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function ogImage(path?: string): string {
  return path || DEFAULT_OG_IMAGE;
}

export function generateMeta(path: string, overrides?: {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}) {
  return {
    title: overrides?.title || pageTitle(path),
    description: overrides?.description || pageDescription(path),
    ogImage: overrides?.ogImage || DEFAULT_OG_IMAGE,
    ogType: overrides?.ogType || 'website',
    canonical: canonicalUrl(path),
    noIndex: overrides?.noIndex || false,
    siteName: SITE_NAME,
    twitterHandle: TWITTER_HANDLE,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${SITE_NAME} Women's Fitness Quiz`,
    description: 'Take our free women\'s fitness quiz in 60 seconds. Get a personalized yoga and weight loss plan.',
    url: SITE_URL,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
  };
}

export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function productSchema(product: {
  name: string;
  image: string;
  url: string;
  price: number;
  priceCurrency?: string;
  rating?: number;
  ratingsCount?: number;
  description?: string;
  brand?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description || `${product.name} — premium health and wellness supplement.`,
    brand: {
      '@type': 'Brand',
      name: product.brand || SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.priceCurrency || 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Amazon',
      },
    },
  };

  if (product.rating && product.ratingsCount && product.ratingsCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.ratingsCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export function articleSchema(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author || AUTHOR,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.webp`,
    sameAs: [
      'https://www.instagram.com/fitfeky2025/',
      'https://pin.it/4WXisJo3W',
    ],
  };
}
