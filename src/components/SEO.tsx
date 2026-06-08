import React from 'react';
import { Helmet } from 'react-helmet-async';

// تعريف أنواع البيانات المستقبلة (TypeScript Interface) لمنع الأخطاء
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, ogImage, ogUrl }) => {
  // الإعدادات الافتراضية للموقع
  const defaultTitle = "FitFeky | Fitness & Yoga Products";
  const defaultDesc = "Discover the best fitness equipment, yoga gear, and weight loss products to transform your health.";
  const defaultKeywords = "fitness, yoga, weight loss, gym gear, FitFeky";
  const defaultImage = "https://www.fitfeky.com/default-share-image.jpg"; 
  const defaultUrl = "https://www.fitfeky.com";

  return (
    <Helmet>
      {/* الميتا الأساسية لمحركات البحث وعناوين الكلمات المفتاحية */}
      <title>{title ? `${title} | FitFeky` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content="index, follow" />

      {/* ميتا منصات التواصل الاجتماعي - Open Graph (Facebook, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:url" content={ogUrl || defaultUrl} />

      {/* ميتا منصة X (تويتر سابقاً) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
    </Helmet>
  );
};

export default SEO;