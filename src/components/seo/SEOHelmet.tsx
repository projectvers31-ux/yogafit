import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHelmetProps {
  title: string;
  description?: string;
  ogDescription?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ldJson?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = 'https://www.fitfeky.com';

export default function SEOHelmet({
  title,
  description,
  ogDescription,
  canonicalPath,
  noIndex = false,
  ldJson,
}: SEOHelmetProps) {
  const location = useLocation();
  const canonical = canonicalPath
    ? `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
    : `${SITE_URL}${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      {description && (
        <meta name="description" content={description} />
      )}
      {(ogDescription || description) && (
        <meta property="og:description" content={ogDescription || description} />
      )}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={ogDescription || description || ''} />
      <meta name="twitter:image" content="https://www.fitfeky.com/og-image.webp" />
      <link rel="canonical" href={canonical} />
      {ldJson && (
        <script type="application/ld+json">
          {JSON.stringify(ldJson)}
        </script>
      )}
    </Helmet>
  );
}
