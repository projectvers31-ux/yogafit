import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductRecommenderQuiz from '@/components/products/ProductRecommenderQuiz';

const ProductRecommender: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Product Recommendations | YogaFit</title>
        <meta
          name="description"
          content="Get personalized Amazon product recommendations based on your fitness goals and preferences."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <ProductRecommenderQuiz />
    </>
  );
};

export default ProductRecommender;
