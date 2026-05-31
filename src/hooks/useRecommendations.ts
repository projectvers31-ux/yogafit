import { useState, useEffect, useRef } from 'react';
import type { EnhancedAnalysis } from '@/lib/quizAnalysis';
import { getTopRecommendations } from '@/lib/recommendationEngine';
import type { Product } from '@/lib/products';

export interface UseRecommendationsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useRecommendations(analysis: EnhancedAnalysis | null): UseRecommendationsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const analysisRef = useRef<string | null>(null);

  useEffect(() => {
    if (!analysis) {
      setProducts([]);
      setLoading(false);
      setError(null);
      analysisRef.current = null;
      return;
    }

    const analysisKey = JSON.stringify({ goal: analysis.goal, archetype: analysis.psychologicalProfile.archetype, focusCategories: analysis.psychologicalProfile.focusCategories });
    if (analysisRef.current === analysisKey) return;
    analysisRef.current = analysisKey;

    let cancelled = false;

    console.log('[useRecommendations] AI Quiz Output:', {
      goal: analysis.goal,
      archetype: analysis.psychologicalProfile.archetype,
      focusCategories: analysis.psychologicalProfile.focusCategories,
      bmiCategory: analysis.bmiCategory,
    });

    setLoading(true);
    setError(null);

    try {
      const result = getTopRecommendations(analysis, 3);
      console.log('[useRecommendations] Filtered products:', result.map(p => ({ name: p.name, rating: p.rating, reviews: p.ratingsCount, tags: p.tags })));
      console.log('[useRecommendations] Final recommendation result:', result.map(p => p.name));

      if (cancelled) return;

      if (result.length > 0) {
        setProducts(result);
      } else {
        console.warn('[useRecommendations] No products returned from engine');
        setProducts([]);
        setError('No matching products found for your profile.');
      }
    } catch (err) {
      if (cancelled) return;
      console.error('[useRecommendations] Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to find recommendations');
      setProducts([]);
    } finally {
      if (!cancelled) setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [analysis]);

  return { products, loading, error };
}
