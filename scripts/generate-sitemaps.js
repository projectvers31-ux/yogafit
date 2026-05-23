#!/usr/bin/env node

/**
 * Sitemap Generator Utility
 * Purpose: Automatically generate XML sitemaps from your content
 * Usage: node scripts/generate-sitemaps.js
 * 
 * This script should be run after adding new content or before deployment
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://fitfeky.com';
const PUBLIC_DIR = path.join(__dirname, '../public');

// Function to format timestamp for sitemap
const formatTimestamp = (date = new Date()) => {
  return date.toISOString().split('T')[0] + 'T' + date.toISOString().split('T')[1].split('.')[0] + '+00:00';
};

// Main pages sitemap
const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage (highest priority) -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Quiz Page -->
  <url>
    <loc>${SITE_URL}/quiz</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Quiz Results (template) -->
  <url>
    <loc>${SITE_URL}/quiz/results</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Shop / Products -->
  <url>
    <loc>${SITE_URL}/shop</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contact / Support -->
  <url>
    <loc>${SITE_URL}/contact</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Legal Pages -->
  <url>
    <loc>${SITE_URL}/privacy</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>${SITE_URL}/terms</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>${SITE_URL}/affiliate-disclosure</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  
</urlset>`;

// Blog sitemap with sample articles
const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Blog Index -->
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Articles -->
  <url>
    <loc>${SITE_URL}/blog/lose-belly-fat-yoga</loc>
    <lastmod>2026-05-22T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  
  <url>
    <loc>${SITE_URL}/blog/yoga-beginners-at-home</loc>
    <lastmod>2026-05-20T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  
  <url>
    <loc>${SITE_URL}/blog/weight-loss-busy-moms</loc>
    <lastmod>2026-05-18T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${SITE_URL}/blog/yoga-weight-loss-women-40</loc>
    <lastmod>2026-05-16T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${SITE_URL}/blog/restorative-yoga-sleep</loc>
    <lastmod>2026-05-14T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${SITE_URL}/blog/intermittent-fasting-beginners</loc>
    <lastmod>2026-05-12T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${SITE_URL}/blog/yoga-anxiety-depression</loc>
    <lastmod>2026-05-10T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${SITE_URL}/blog/best-diet-plan-weight-loss-women</loc>
    <lastmod>2026-05-08T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${SITE_URL}/blog/yoga-lower-back-pain</loc>
    <lastmod>2026-05-06T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>${SITE_URL}/blog/lose-weight-without-exercise</loc>
    <lastmod>2026-05-04T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  
</urlset>`;

// Products sitemap
const productsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Product/Program: 21-Day Energy Reset -->
  <url>
    <loc>${SITE_URL}/products/21-day-energy-reset</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Product/Program: 90-Day Transformation -->
  <url>
    <loc>${SITE_URL}/products/90-day-transformation</loc>
    <lastmod>${formatTimestamp()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Product/Program: Gentle Yoga 21 -->
  <url>
    <loc>${SITE_URL}/products/gentle-yoga-21</loc>
    <lastmod>2026-05-20T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Product/Program: Strength & Flexibility -->
  <url>
    <loc>${SITE_URL}/products/strength-flexibility</loc>
    <lastmod>2026-05-18T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
</urlset>`;

// Function to write sitemaps
function writeSitemaps() {
  try {
    // Ensure public directory exists
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    // Write main sitemap
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-main.xml'), mainSitemap);
    console.log('✓ sitemap-main.xml generated');

    // Write blog sitemap
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-blog.xml'), blogSitemap);
    console.log('✓ sitemap-blog.xml generated');

    // Write products sitemap
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-products.xml'), productsSitemap);
    console.log('✓ sitemap-products.xml generated');

    // Update main sitemap index
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages sitemap -->
  <sitemap>
    <loc>${SITE_URL}/sitemap-main.xml</loc>
    <lastmod>${formatTimestamp()}</lastmod>
  </sitemap>
  
  <!-- Blog/content sitemap -->
  <sitemap>
    <loc>${SITE_URL}/sitemap-blog.xml</loc>
    <lastmod>${formatTimestamp()}</lastmod>
  </sitemap>
  
  <!-- Products/services sitemap -->
  <sitemap>
    <loc>${SITE_URL}/sitemap-products.xml</loc>
    <lastmod>${formatTimestamp()}</lastmod>
  </sitemap>
</sitemapindex>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndex);
    console.log('✓ sitemap.xml (index) generated');

    console.log('\n✅ All sitemaps generated successfully!');
    console.log(`📍 Sitemaps are ready at: ${SITE_URL}/sitemap.xml`);
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error.message);
    process.exit(1);
  }
}

// Run the generator
writeSitemaps();
