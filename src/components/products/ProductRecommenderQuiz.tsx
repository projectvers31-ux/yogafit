import React, { useState } from 'react';
import { buildRecommendations, QuizAnswers } from '@/lib/affiliateProducts';
import AffiliateProducts from '@/components/products/AffiliateProducts';
import { ChevronDown, AlertCircle } from 'lucide-react';

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

const ProductRecommenderQuiz: React.FC = () => {
  const [formData, setFormData] = useState<QuizAnswers>({
    goal: 'lose weight',
    problem: 'no time for gym, wants home solution',
    budget: 50,
    experienceLevel: 'beginner',
    preferences: 'home workout, fat burning, simple equipment'
  });

  const [recommendations, setRecommendations] = useState<ProductRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (field: keyof QuizAnswers, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setHasSubmitted(true);

    // Simulate processing delay
    setTimeout(() => {
      const result = buildRecommendations(formData);
      setRecommendations(result.recommendations);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full bg-linear-to-b from-gray-50 to-white">
      {/* Quiz Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!hasSubmitted ? (
          <>
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Find Your Perfect Fitness Products
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Answer a few quick questions and we'll recommend the best Amazon products tailored to your fitness goals and budget.
              </p>
            </div>

            {/* Quiz Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Goal */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    🎯 What's your main fitness goal?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., lose weight, build flexibility, increase strength"
                    value={formData.goal}
                    onChange={(e) => handleChange('goal', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Problem */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    🚧 What's your main challenge?
                  </label>
                  <textarea
                    placeholder="e.g., no time for gym, wants home solution, needs low impact"
                    value={formData.problem}
                    onChange={(e) => handleChange('problem', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    💰 What's your budget?
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-2xl font-bold text-blue-600 min-w-24 text-right">
                      ${formData.budget}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Drag to adjust your budget range</p>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    🏋️ Experience level?
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleChange('experienceLevel', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none bg-white cursor-pointer"
                  >
                    <option value="beginner">Beginner - Just starting out</option>
                    <option value="intermediate">Intermediate - Regular exerciser</option>
                    <option value="advanced">Advanced - Long-time fitness enthusiast</option>
                  </select>
                </div>

                {/* Preferences */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    ⭐ Preferences (optional)
                  </label>
                  <textarea
                    placeholder="e.g., eco-friendly, portable, premium quality, beginner-friendly"
                    value={formData.preferences}
                    onChange={(e) => handleChange('preferences', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Analyzing Your Answers...' : 'Get My Top Recommendations'}
                </button>
              </form>

              {/* Test Data Notice */}
              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 font-semibold">Demo Mode Active</p>
                    <p className="text-sm text-blue-700 mt-1">
                      This form uses pre-filled test data. Modify any field and click "Get My Top Recommendations" to see personalized results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Recommendations Section */}
        {recommendations && hasSubmitted && (
          <div className="mt-16">
            <AffiliateProducts
              recommendations={recommendations}
              title="Your Top Personalized Products"
              description={`Based on your goal to "${formData.goal}" with a budget of $${formData.budget}, here are the best products matched to your needs`}
            />
          </div>
        )}
      </div>

      {/* Info Section */}
      {!hasSubmitted && (
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Answer Questions',
                  description: 'Tell us about your fitness goals, budget, and preferences.'
                },
                {
                  step: '02',
                  title: 'AI Matching',
                  description: 'Our algorithm analyzes your answers and finds the best matches from Amazon.'
                },
                {
                  step: '03',
                  title: 'Get Recommendations',
                  description: 'Receive your personalized top 5 products with affiliate links.'
                }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-blue-700 text-white rounded-full font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRecommenderQuiz;
