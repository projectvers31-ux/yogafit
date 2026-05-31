import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
}

export default function SafeImage({ src, alt, className = '', width, height, loading = 'lazy', fetchPriority, sizes }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`bg-brand-sage/5 flex items-center justify-center ${className}`}
        style={width && height ? { width, height } : undefined}
        role="img"
        aria-label={alt}
      >
        <svg className="w-8 h-8 text-brand-sage/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={sizes}
      onError={() => setError(true)}
      decoding="async"
    />
  );
}
