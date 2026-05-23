import { useEffect, useId } from 'react';

interface SEOHelmetProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ldJson?: Record<string, unknown> | Record<string, unknown>[];
}

const upsertMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const upsertCanonicalLink = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

const upsertLdJson = (id: string, data: Record<string, unknown> | Record<string, unknown>[]) => {
  let existing = document.head.querySelector<HTMLScriptElement>(`script[data-ldjson="${id}"]`);

  if (!existing) {
    existing = document.createElement('script');
    existing.setAttribute('type', 'application/ld+json');
    existing.setAttribute('data-ldjson', id);
    document.head.appendChild(existing);
  }

  existing.textContent = JSON.stringify(data);
};

export default function SEOHelmet({
  title,
  description,
  canonicalPath,
  noIndex = false,
  ldJson,
}: SEOHelmetProps) {
  const id = useId();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.title = title;
    upsertMetaTag('property', 'og:title', title);

    if (description) {
      upsertMetaTag('name', 'description', description);
      upsertMetaTag('property', 'og:description', description);
    }

    upsertMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    if (canonicalPath && typeof window !== 'undefined') {
      upsertCanonicalLink(new URL(canonicalPath, window.location.origin).toString());
    }

    if (ldJson) {
      upsertLdJson(id, ldJson);
    }
  }, [canonicalPath, description, id, ldJson, noIndex, title]);

  return null;
}
