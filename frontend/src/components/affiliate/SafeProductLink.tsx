import { type ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { getProduct, getReplacementProduct, getRelatedProducts } from '@/lib/affiliateRegistry';
import { isValidAmazonUrl } from '@/lib/urlValidation';
import type { RegistryProduct } from '@/lib/affiliateRegistry';

interface SafeProductLinkProps {
  productId: string;
  children: (product: RegistryProduct, isFallback: boolean) => ReactNode;
  fallback?: ReactNode;
}

export default function SafeProductLink({
  productId,
  children,
  fallback,
}: SafeProductLinkProps) {
  const product = getProduct(productId);
  let resolvedProduct: RegistryProduct | undefined;
  let isFallback = false;

  if (!product || !product.isValid) {
    resolvedProduct = getReplacementProduct(productId);
    isFallback = true;
  } else {
    resolvedProduct = product;
  }

  if (!resolvedProduct) {
    return <>{fallback ?? null}</>;
  }

  return <>{children(resolvedProduct, isFallback)}</>;
}

interface SafeExternalLinkProps {
  url: string;
  fallbackUrl?: string;
  className?: string;
  children: ReactNode;
}

export function SafeExternalLink({
  url,
  fallbackUrl = '/picks',
  className,
  children,
}: SafeExternalLinkProps) {
  const valid = isValidAmazonUrl(url);

  if (!valid) {
    return (
      <a
        href={fallbackUrl}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

interface SafeProductCardProps {
  productId: string;
  renderCard: (product: RegistryProduct, isFallback: boolean) => ReactNode;
  renderRelated?: (products: RegistryProduct[]) => ReactNode;
  fallback?: ReactNode;
}

export function SafeProductCard({
  productId,
  renderCard,
  renderRelated,
  fallback,
}: SafeProductCardProps) {
  const product = getProduct(productId);
  let resolvedProduct: RegistryProduct | undefined;
  let isFallback = false;

  if (!product || !product.isValid) {
    resolvedProduct = getReplacementProduct(productId);
    isFallback = true;
  } else {
    resolvedProduct = product;
  }

  if (!resolvedProduct) {
    return <>{fallback ?? null}</>;
  }

  return (
    <>
      {renderCard(resolvedProduct, isFallback)}
      {isFallback && renderRelated && (
        <div className="mt-2">
          {renderRelated(getRelatedProducts(resolvedProduct.id, 3))}
        </div>
      )}
    </>
  );
}
