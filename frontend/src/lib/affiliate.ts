export const AFFILIATE_TAG = '233232122-20';

const AMAZON_DOMAINS = [
  'amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.fr',
  'amazon.co.jp', 'amazon.ca', 'amazon.it', 'amazon.es',
  'amazon.in', 'amazon.com.au', 'amazon.com.br', 'amazon.com.mx',
  'amazon.nl', 'amazon.se', 'amazon.pl', 'amazon.sg',
];

function isAmazonUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return AMAZON_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
  } catch {
    return false;
  }
}

export function ensureAffiliateTag(url: string): string {
  if (!isAmazonUrl(url)) return url;

  try {
    const parsed = new URL(url);
    const params = new URLSearchParams(parsed.search);

    if (params.has('tag')) {
      const existing = params.get('tag')?.trim();
      if (existing === AFFILIATE_TAG) return url;
    }

    params.set('tag', AFFILIATE_TAG);
    parsed.search = params.toString();

    return parsed.toString();
  } catch {
    return url;
  }
}

export function isAffiliateLinkValid(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get('tag') === AFFILIATE_TAG;
  } catch {
    return false;
  }
}
