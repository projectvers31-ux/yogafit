import React, { useState } from 'react';
import { buildRecommendations } from '@/lib/affiliateProducts';
import AffiliateProducts from '@/components/products/AffiliateProducts';
import { Copy, Check } from 'lucide-react';

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

const AffiliateProductDemo: React.FC = () => {
  const [recommendations, setRecommendations] = useState<ProductRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Test case from user request
  const TEST_QUIZ = {
    goal: 'lose weight',
    problem: 'no time for gym, wants home solution',
    budget: 50,
    experienceLevel: 'beginner',
    preferences: 'home workout, fat burning, simple equipment'
  };

  const handleRunDemo = () => {
    setLoading(true);
    setTimeout(() => {
      const result = buildRecommendations(TEST_QUIZ);
      setRecommendations(result.recommendations);
      setLoading(false);
    }, 500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Amazon Affiliate Product Recommender Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test the AI-powered product recommendation engine with real data from our test case. This system matches user quiz answers with Amazon products and generates affiliate links.
          </p>
        </div>

        {/* Test Case Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Case Data</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Goal</p>
              <p className="text-lg font-bold text-gray-900">{TEST_QUIZ.goal}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Budget</p>
              <p className="text-lg font-bold text-gray-900">${TEST_QUIZ.budget}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Experience</p>
              <p className="text-lg font-bold text-gray-900">{TEST_QUIZ.experienceLevel}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg col-span-1 md:col-span-2 lg:col-span-2">
              <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Problem</p>
              <p className="text-lg font-bold text-gray-900">{TEST_QUIZ.problem}</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
            <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Preferences</p>
            <p className="text-lg font-bold text-gray-900">{TEST_QUIZ.preferences}</p>
          </div>

          <button
            onClick={handleRunDemo}
            disabled={loading || recommendations !== null}
            className="w-full py-4 px-6 bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Processing Recommendations...' : recommendations ? 'Already Generated' : 'Generate Recommendations'}
          </button>
        </div>

        {/* Recommendations */}
        {recommendations && (
          <>
            {/* JSON Output */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">API Response (JSON)</h2>
              
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-4">
                <pre className="text-green-400 font-mono text-sm">
                  {JSON.stringify(
                    { recommendations: recommendations },
                    null,
                    2
                  )}
                </pre>
              </div>

              <button
                onClick={() => copyToClipboard(JSON.stringify({ recommendations }, null, 2), 'json')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                {copied === 'json' ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy JSON
                  </>
                )}
              </button>
            </div>

            {/* Rendered Products */}
            <AffiliateProducts
              recommendations={recommendations}
              title="Top 5 Recommended Products"
              description="These products are ranked by conversion probability based on the test case quiz answers"
            />

            {/* Affiliate Links Table */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Affiliate Links</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold text-gray-900">Rank</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900">Product</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900">Score</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900">Affiliate Link</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recommendations.map((rec, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-900">#{i + 1}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{rec.title}</p>
                            <p className="text-xs text-gray-500">${rec.price} • ⭐{rec.rating}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-blue-600">{rec.conversion_score}%</td>
                        <td className="px-6 py-4">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 truncate block max-w-xs">
                            {rec.affiliate_link}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => copyToClipboard(rec.affiliate_link, `link-${i}`)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-semibold rounded transition-colors"
                          >
                            {copied === `link-${i}` ? (
                              <>
                                <Check className="w-4 h-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Affiliate Tag Info */}
              <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                <p className="text-sm text-amber-900 font-semibold">
                  🔗 Affiliate Tag: <code className="bg-white px-2 py-1 rounded">233232122-20</code>
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  All generated links include this affiliate tag for tracking and earnings
                </p>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => setRecommendations(null)}
                className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Run Demo Again
              </button>
            </div>
          </>
        )}

        {/* Feature Overview */}
        {!recommendations && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How the System Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quiz Input</h3>
                <p className="text-gray-600">
                  User provides 5 key data points: goal, problem, budget, experience level, and preferences.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Matching</h3>
                <p className="text-gray-600">
                  Algorithm scores products based on 100+ criteria including goal match, budget fit, and conversion probability.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Affiliate Links</h3>
                <p className="text-gray-600">
                  Top 5 products ranked by conversion score with affiliate links tagged for tracking and earnings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateProductDemo;
