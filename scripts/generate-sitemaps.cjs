#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.fitfeky.com';
const PUBLIC_DIR = path.join(__dirname, '../public');

const now = new Date();
const fmt = (d) => d.toISOString().split('T')[0] + 'T' + d.toISOString().split('T')[1].split('.')[0] + '+00:00';

const url = (loc, priority, changefreq = 'monthly', lastmod) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod || fmt(now)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${url('/', '1.0', 'weekly')}
${url('/shop', '0.85', 'weekly')}
${url('/about', '0.7')}
${url('/contact', '0.6')}
${url('/privacy', '0.5', 'yearly')}
${url('/terms', '0.5', 'yearly')}
${url('/affiliate-disclosure', '0.4', 'yearly')}
${url('/calculators', '0.9', 'weekly')}
${url('/calculators/tdee-calculator', '0.8')}
${url('/calculators/bmr-calculator', '0.8')}
${url('/calculators/calorie-deficit-calculator', '0.8')}
${url('/calculators/macro-calculator', '0.8')}
${url('/calculators/ideal-weight-calculator', '0.8')}
${url('/calculators/body-fat-calculator', '0.8')}
${url('/calculators/water-intake-calculator', '0.8')}
${url('/calculators/protein-calculator', '0.8')}
</urlset>`;

const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${url('/blog', '0.8', 'weekly')}
${url('/blog/lose-belly-fat-yoga', '0.75', 'monthly', '2026-05-22T10:00:00+00:00')}
${url('/blog/yoga-beginners-at-home', '0.75', 'monthly', '2026-05-20T10:00:00+00:00')}
${url('/blog/weight-loss-busy-moms', '0.75', 'monthly', '2026-05-18T10:00:00+00:00')}
${url('/blog/yoga-weight-loss-women-40', '0.75', 'monthly', '2026-05-16T10:00:00+00:00')}
${url('/blog/restorative-yoga-sleep', '0.75', 'monthly', '2026-05-14T10:00:00+00:00')}
${url('/blog/intermittent-fasting-beginners', '0.75', 'monthly', '2026-05-12T10:00:00+00:00')}
${url('/blog/yoga-anxiety-depression', '0.75', 'monthly', '2026-05-10T10:00:00+00:00')}
${url('/blog/best-diet-plan-weight-loss-women', '0.75', 'monthly', '2026-05-08T10:00:00+00:00')}
${url('/blog/yoga-lower-back-pain', '0.75', 'monthly', '2026-05-06T10:00:00+00:00')}
${url('/blog/lose-weight-without-exercise', '0.75', 'monthly', '2026-05-04T10:00:00+00:00')}
</urlset>`;

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-main.xml</loc>
    <lastmod>${fmt(now)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-blog.xml</loc>
    <lastmod>${fmt(now)}</lastmod>
  </sitemap>
</sitemapindex>`;

function writeSitemaps() {
  try {
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-main.xml'), mainSitemap);
    console.log('✓ sitemap-main.xml generated');

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-blog.xml'), blogSitemap);
    console.log('✓ sitemap-blog.xml generated');

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndex);
    console.log('✓ sitemap.xml (index) generated');

    console.log('\n✅ All sitemaps generated successfully!');
    console.log(`📍 Sitemaps ready at: ${SITE_URL}/sitemap.xml`);
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error.message);
    process.exit(1);
  }
}

writeSitemaps();
