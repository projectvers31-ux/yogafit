import {
  getAllProducts,
  getRegistryHealthReport,
  type RegistryProduct,
} from './affiliateRegistry';
import { isValidAmazonUrl } from './urlValidation';

/** ASIN format: 10 alphanumeric chars (uppercase) */
const ASIN_RE = /^[A-Z0-9]{10}$/;

export interface ProductHealthIssue {
  product: RegistryProduct;
  type: 'invalid_url' | 'missing_asin' | 'malformed_asin' | 'missing_image' | 'low_rating' | 'low_reviews' | 'missing_name';
  message: string;
}

export interface MaintenanceReport {
  generatedAt: string;
  summary: {
    total: number;
    healthy: number;
    issues: number;
    critical: number;
  };
  issues: ProductHealthIssue[];
  invalidUrls: RegistryProduct[];
  missingAsins: RegistryProduct[];
  lowQuality: RegistryProduct[];
  registryLog: string[];
}

function getIssues(product: RegistryProduct): ProductHealthIssue[] {
  const issues: ProductHealthIssue[] = [];

  if (!product.isValid) {
    issues.push({
      product,
      type: 'invalid_url',
      message: `Invalid or broken affiliate URL: "${product.url}"`,
    });
  }

  if (!product.asin) {
    issues.push({
      product,
      type: 'missing_asin',
      message: 'No ASIN found — cannot validate product on Amazon',
    });
  } else if (!ASIN_RE.test(product.asin)) {
    issues.push({
      product,
      type: 'malformed_asin',
      message: `ASIN "${product.asin}" does not match expected format (10 alphanumeric chars)`,
    });
  }

  if (!product.image || product.image.length < 10) {
    issues.push({
      product,
      type: 'missing_image',
      message: `Missing or invalid product image: "${product.image}"`,
    });
  }

  if (product.rating > 0 && product.rating < 3.5) {
    issues.push({
      product,
      type: 'low_rating',
      message: `Low rating: ${product.rating}/5`,
    });
  }

  if (product.reviewCount > 0 && product.reviewCount < 50) {
    issues.push({
      product,
      type: 'low_reviews',
      message: `Very few reviews: ${product.reviewCount}`,
    });
  }

  if (!product.name || product.name.length < 3) {
    issues.push({
      product,
      type: 'missing_name',
      message: 'Product name is missing or too short',
    });
  }

  return issues;
}

export function generateReport(): MaintenanceReport {
  const allProducts = getAllProducts();
  const health = getRegistryHealthReport();
  const allIssues: ProductHealthIssue[] = [];

  for (const product of allProducts) {
    allIssues.push(...getIssues(product));
  }

  const criticalIssues = allIssues.filter(
    i => i.type === 'invalid_url' || i.type === 'missing_asin' || i.type === 'missing_name',
  );

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      total: allProducts.length,
      healthy: health.validProducts,
      issues: allIssues.length,
      critical: criticalIssues.length,
    },
    issues: allIssues,
    invalidUrls: health.invalid,
    missingAsins: health.noAsin,
    lowQuality: allProducts.filter(
      p => (p.rating > 0 && p.rating < 3.5) || (p.reviewCount > 0 && p.reviewCount < 50),
    ),
    registryLog: health.log,
  };
}

export function logReport(report: MaintenanceReport): void {
  console.group('[ProductHealth] Maintenance Report');
  console.log(`Generated: ${report.generatedAt}`);
  console.log(`Total: ${report.summary.total}`);
  console.log(`Healthy: ${report.summary.healthy}`);
  console.log(`Issues: ${report.summary.issues} (${report.summary.critical} critical)`);

  if (report.issues.length > 0) {
    console.group('Issues:');
    for (const issue of report.issues) {
      console.warn(`  [${issue.type}] ${issue.product.name}: ${issue.message}`);
    }
    console.groupEnd();
  }

  if (report.invalidUrls.length > 0) {
    console.group('Invalid URLs:');
    for (const p of report.invalidUrls) {
      console.warn(`  ${p.name} (${p.id}): ${p.url}`);
    }
    console.groupEnd();
  }

  if (report.missingAsins.length > 0) {
    console.group('Missing ASINs:');
    for (const p of report.missingAsins) {
      console.warn(`  ${p.name} (${p.id})`);
    }
    console.groupEnd();
  }

  console.groupEnd();
}
