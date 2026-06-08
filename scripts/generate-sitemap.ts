import * as fs from 'node:fs';
import * as path from 'node:path';
import { articles } from '../frontend/src/content/blogArticles';
import { getAllResultPagePaths } from '../frontend/src/data/resultPages';

const SITE_URL = 'https://www.fitfeky.com';
const FRONTEND_DIR = path.resolve(import.meta.dirname, '../frontend');
const PUBLIC_DIR = path.join(FRONTEND_DIR, 'public');

const now = new Date();

function fmtDate(d: Date): string {
  return d.toISOString().split('T')[0] + 'T' + d.toISOString().split('T')[1].split('.')[0] + '+00:00';
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function entry(loc: string, priority: string, changefreq = 'monthly', lastmod?: string): SitemapEntry {
  return {
    loc: `${SITE_URL}${loc}`,
    lastmod: lastmod || fmtDate(now),
    changefreq,
    priority,
  };
}

function readJson(filePath: string): unknown[] {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Warning: ${fullPath} not found, skipping`);
    return [];
  }
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

function buildSitemap(): string {
  const entries: SitemapEntry[] = [];

  entries.push(entry('/', '1.0', 'weekly'));
  entries.push(entry('/about', '0.6'));
  entries.push(entry('/contact', '0.5'));
  entries.push(entry('/privacy', '0.4', 'yearly'));
  entries.push(entry('/terms', '0.4', 'yearly'));
  entries.push(entry('/picks', '0.8', 'weekly'));
  entries.push(entry('/blog', '0.9', 'weekly'));
  entries.push(entry('/stories', '0.7'));
  entries.push(entry('/calculators', '0.9', 'weekly'));

  const calculatorTools = [
    '/calculators/tdee-calculator',
    '/calculators/bmr-calculator',
    '/calculators/calorie-deficit-calculator',
    '/calculators/macro-calculator',
    '/calculators/ideal-weight-calculator',
    '/calculators/body-fat-calculator',
    '/calculators/water-intake-calculator',
    '/calculators/protein-calculator',
  ];
  for (const toolPath of calculatorTools) {
    entries.push(entry(toolPath, '0.8', 'weekly'));
  }

  for (const article of articles) {
    entries.push(entry(`/blog/${article.slug}`, '0.75', 'monthly', article.date ? `${article.date}T10:00:00+00:00` : undefined));
  }

  const stories: Array<{ id: string }> = readJson(path.join(FRONTEND_DIR, 'src/data/stories.json')) as Array<{ id: string }>;
  for (const story of stories) {
    if (story.id) {
      entries.push(entry(`/stories/${story.id}`, '0.6'));
    }
  }

  const resultPaths = getAllResultPagePaths();
  for (const rp of resultPaths) {
    entries.push(entry(`/calculators/${rp.tool}/result/${rp.category}`, '0.7', 'monthly'));
  }

  const seen = new Set<string>();
  const unique: SitemapEntry[] = [];
  for (const e of entries) {
    if (!seen.has(e.loc)) {
      seen.add(e.loc);
      unique.push(e);
    }
  }

  const urlElements = unique.map(e =>
    `  <url>\n` +
    `    <loc>${e.loc}</loc>\n` +
    `    <lastmod>${e.lastmod}</lastmod>\n` +
    `    <changefreq>${e.changefreq}</changefreq>\n` +
    `    <priority>${e.priority}</priority>\n` +
    `  </url>`
  ).join('\n');

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urlElements + '\n' +
    `</urlset>`
  );
}

function main() {
  try {
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    const sitemap = buildSitemap();
    const outputPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemap, 'utf-8');

    const urlCount = (sitemap.match(/<url>/g) || []).length;
    console.log(`Generated sitemap.xml with ${urlCount} URLs`);
    console.log(`Output: ${outputPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
