export function isValidAmazonUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    return (
      hostname === 'www.amazon.com' ||
      hostname === 'amazon.com' ||
      hostname.endsWith('.amazon.com') ||
      hostname === 'www.amazon.co.uk' ||
      hostname === 'amzn.to' ||
      hostname === 'www.amzn.to'
    );
  } catch {
    return false;
  }
}
