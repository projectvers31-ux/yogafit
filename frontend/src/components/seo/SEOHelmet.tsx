import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL, SITE_NAME, TWITTER_HANDLE, DEFAULT_OG_IMAGE, generateMeta } from '@/lib/seo';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ldJson?: Record<string, unknown> | Record<string, unknown>[];
}

export default function SEOHelmet({
  title,
  description,
  ogImage,
  ogType,
  canonicalPath,
  noIndex = false,
  ldJson,
}: SEOHelmetProps) {
  const location = useLocation();
  const path = canonicalPath || location.pathname;
  const meta = generateMeta(path, { title, description, ogImage, ogType, noIndex });

  const canonical = canonicalPath
    ? `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
    : `${SITE_URL}${location.pathname}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <link rel="canonical" href={canonical} />

      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.noIndex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={meta.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.ogImage} />

      {ldJson && (
        <script type="application/ld+json">
          {JSON.stringify(ldJson)}
        </script>
      )}
    </Helmet>
  );
}
