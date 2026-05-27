import React from 'react';
import { Star, ExternalLink, ShoppingBag, TrendingUp } from 'lucide-react';

interface ProductRecommendation {
  title: string;
  keyword: string;
  reason: string;
  conversion_score: number;
  affiliate_link: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

interface AffiliateProductsProps {
  recommendations: ProductRecommendation[];
  title?: string;
  description?: string;
}

const AffiliateProducts: React.FC<AffiliateProductsProps> = ({
  recommendations,
  title = 'Recommended Products for You',
  description = 'Based on your quiz answers, here are the best products to achieve your goals'
}) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-linear-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-green-50 rounded-full">
            <ShoppingBag className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Personalized Recommendations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recommendations.map((product, index) => (
            <div
              key={`${product.keyword}-${index}`}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Rank Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-linear-to-br from-orange-400 to-orange-500 rounded-full text-white font-bold text-sm shadow-lg">
                  #{index + 1}
                </div>
              </div>

              {/* Conversion Score Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-md">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-600">{product.conversion_score}% Match</span>
              </div>

              {/* Product Image */}
              <div className="relative h-56 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {product.rating} ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>

                {/* Reason */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.reason}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500">on Amazon</span>
                </div>

                {/* CTA Button */}
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  View on Amazon
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Affiliate Disclaimer */}
                <p className="text-xs text-gray-500 mt-3 text-center">
                  We may earn a commission from Amazon purchases
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Transformation</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            These products are recommended based on your specific fitness goals and preferences. Choose the ones that fit your budget and lifestyle best.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop All Recommendations
          </a>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProducts;
