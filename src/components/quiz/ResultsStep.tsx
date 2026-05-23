import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, ArrowUp, CheckCircle2, Clock, Lock, ShieldCheck, Star, Target, Zap, Heart, Brain, Flame, Award, Sparkles, Activity
} from 'lucide-react';
import { trackResultsView, trackProductClick, trackCtaClick } from '@/lib/analytics';
import { useCountdown } from '@/hooks/useCountdown';
import type { QuizData, EnhancedAnalysis, ProductMatch } from '@/lib/types';

function getGoalIcon(goal: string) {
  if (goal === 'weight_loss') return Flame;
  if (goal === 'flexibility') return Activity;
  return Zap;
}

function getGoalColor(goal: string) {
  if (goal === 'weight_loss') return 'text-brand-rose';
  if (goal === 'flexibility') return 'text-brand-sage';
  return 'text-brand-gold';
}

function getGoalBg(goal: string) {
  if (goal === 'weight_loss') return 'bg-brand-rose/10';
  if (goal === 'flexibility') return 'bg-brand-sage/10';
  return 'bg-brand-gold/10';
}

export default function ResultsStep({
  quizData,
  analysis,
  productMatches,
}: {
  quizData: QuizData;
  analysis: EnhancedAnalysis;
  productMatches: ProductMatch[];
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { timeLeft, formatTime } = useCountdown();
  const goal = analysis.goal;
  const meta = analysis.metabolicProfile;

  useEffect(() => {
    trackResultsView(goal);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [goal]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const GoalIcon = getGoalIcon(goal);

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20"
      ref={resultsRef}
    >
      {/* === HEADER + COUNTDOWN === */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl md:text-6xl font-serif mb-4 md:mb-6 text-brand-ink leading-tight">
          {quizData.name}, Your Personalized Plan is Ready
        </h2>
        {analysis.urgencyMessage ? (
          <div className="bg-brand-rose/10 text-brand-rose inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[10px] md:text-sm mb-6">
            <Zap size={16} /> {analysis.urgencyMessage}
          </div>
        ) : (
          <div className="bg-brand-gold/10 text-brand-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[10px] md:text-sm mb-6">
            <Clock size={16} /> LIMITED TIME: Your personalized results expire in {formatTime(timeLeft)}
          </div>
        )}
        {analysis.aiEnriched && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={14} className="text-brand-gold" />
            <span className="text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-wider">
              AI-Powered Personalized Analysis
            </span>
          </div>
        )}
      </div>

      {/* === CREDIBILITY BADGES === */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {analysis.credibilityBadges.map((badge, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 bg-brand-sage/5 border border-brand-sage/20 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-sage px-3 py-1.5 rounded-full">
            <Award size={12} /> {badge}
          </span>
        ))}
      </div>

      {/* === PERSONALIZED MESSAGE === */}
      <div className="bg-linear-to-br from-brand-sage/5 to-brand-tan/10 border border-brand-sage/20 rounded-3xl md:rounded-[3.5rem] p-6 md:p-12 mb-10 md:mb-14 text-left relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 pointer-events-none">
          <GoalIcon size={80} className={getGoalColor(goal)} />
        </div>
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className={`w-10 h-10 rounded-full ${getGoalBg(goal)} flex items-center justify-center`}>
            <GoalIcon size={20} className={getGoalColor(goal)} />
          </div>
          <div>
            <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${getGoalColor(goal)}`}>
              {goal === 'weight_loss' ? 'Energy & Resilience' : goal === 'flexibility' ? 'Strength & Flexibility' : 'Calm & Balance'} Profile
            </span>
            <p className="text-[11px] text-brand-muted">Analysis complete — {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-base md:text-lg text-brand-ink leading-relaxed font-serif italic">
          &ldquo;{analysis.personalizedMessage}&rdquo;
        </p>
      </div>

      {/* === METABOLIC DASHBOARD === */}
      <div className="mb-12 md:mb-16">
        <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-6 text-center">Your Metabolic Dashboard</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {[
            { label: 'Basal Metabolic Rate', value: `${meta.bmr}`, unit: 'cal/day', icon: Heart, desc: 'Calories burned at complete rest', color: 'text-brand-rose' },
            { label: 'Total Daily Energy', value: `${meta.tdee}`, unit: 'cal/day', icon: Zap, desc: 'Calories with your activity level', color: 'text-brand-gold' },
            { label: 'Target Intake', value: `${meta.calorieTarget}`, unit: 'cal/day', icon: Target, desc: goal === 'weight_loss' ? 'Optimized for sustainable energy' : 'Optimized for your goal', color: 'text-brand-sage' },
            { label: 'Health Risk Score', value: `${meta.healthRiskScore}`, unit: '/100', icon: ShieldCheck, desc: meta.healthRiskLabel, color: meta.healthRiskScore > 25 ? 'text-brand-rose' : 'text-brand-sage' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl md:rounded-3xl border border-brand-border p-4 md:p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <item.icon size={14} className={item.color} />
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-brand-muted">{item.label}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl md:text-4xl font-black text-brand-ink">{item.value}</span>
                <span className="text-[9px] md:text-[10px] font-bold text-brand-muted">{item.unit}</span>
              </div>
              <p className="text-[9px] md:text-[10px] text-brand-muted/70 italic">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Macros */}
        <div className="mt-4 md:mt-5 bg-white rounded-2xl md:rounded-3xl border border-brand-border p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award size={14} className="text-brand-sage" />
            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-brand-muted">Recommended Macronutrient Split</span>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {[
              { label: 'Protein', value: `${meta.proteinG}g`, pct: `${meta.proteinTarget}%`, color: 'bg-brand-rose', bar: meta.proteinTarget },
              { label: 'Carbs', value: `${meta.carbG}g`, pct: `${meta.carbTarget}%`, color: 'bg-brand-gold', bar: meta.carbTarget },
              { label: 'Fat', value: `${meta.fatG}g`, pct: `${meta.fatTarget}%`, color: 'bg-brand-sage', bar: meta.fatTarget },
            ].map((macro, i) => (
              <div key={i} className="text-center">
                <div className="text-lg md:text-2xl font-black text-brand-ink">{macro.value}</div>
                <div className="text-[9px] md:text-[10px] font-bold text-brand-muted">{macro.label}</div>
                <div className="mt-2 h-1.5 bg-brand-bone rounded-full overflow-hidden">
                  <div className={`h-full ${macro.color} rounded-full`} style={{ width: `${macro.bar}%` }} />
                </div>
                <div className="text-[8px] text-brand-muted/60 mt-1">{macro.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === PERSONALITY INSIGHTS === */}
      {analysis.personalityInsights.length > 0 && (
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-6 text-center">Your Fitness Personality Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {analysis.personalityInsights.map((insight, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-brand-border p-5 md:p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Brain size={18} className="text-brand-sage" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-brand-ink mb-1">{insight.trait}</h4>
                  <p className="text-xs md:text-sm text-brand-muted leading-relaxed">{insight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* === PER-ANSWER INSIGHTS === */}
      <div className="mb-12 md:mb-16">
        <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-6 text-center">Your Answers — Deep Analysis</h3>
        <div className="space-y-3 md:space-y-4">
          {analysis.perAnswerInsights.map((insight, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-brand-border p-5 md:p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-sage">{insight.question}</span>
                <span className="text-[9px] md:text-[10px] font-medium text-brand-ink bg-brand-bone/50 px-2.5 py-1 rounded-full shrink-0 max-w-[40%] truncate">{insight.answer}</span>
              </div>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed">{insight.insight}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === PRODUCT RECOMMENDATIONS === */}
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-xl md:text-4xl font-serif text-brand-ink mb-3">Your Matched Programs</h3>
        <p className="text-xs md:text-base text-brand-muted italic max-w-2xl mx-auto">
          Each program below was scored against your answers. Match scores reflect how well each program fits your unique profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20 px-2">
        {productMatches.map((match, index) => {
          const product = match.product;
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              className={`bg-white rounded-3xl md:rounded-[2.5rem] border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative p-6 md:p-10 ${
                index === 0 ? 'border-brand-sage ring-2 ring-brand-sage/10 md:scale-105 z-10' : 'border-brand-border'
              }`}
            >
              {index === 0 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-sage text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg z-20 flex items-center gap-1.5">
                  <Award size={12} /> Best Match
                </div>
              )}

              {/* Match Score */}
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-block bg-brand-sage/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-sage">
                  {product.category}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-brand-gold" fill="currentColor" />
                  <span className="text-[10px] font-bold text-brand-ink">{match.matchScore}%</span>
                  <span className="text-[8px] text-brand-muted">match</span>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-brand-ink leading-tight mb-2">{product.title}</h3>

              <p className="text-[10px] md:text-xs text-brand-muted italic mb-4 font-serif">{product.description}</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-brand-sage leading-none">${product.price}</span>
                <span className="text-sm text-brand-muted line-through font-medium opacity-60">${product.oldPrice}</span>
                <span className="text-[8px] font-bold text-brand-rose bg-brand-rose/10 px-2 py-0.5 rounded-full">Save ${product.oldPrice - product.price}</span>
              </div>

              {/* Match Reasons */}
              <div className="mb-4 p-4 bg-brand-sage/5 rounded-2xl border border-brand-sage/20">
                <p className="text-[8px] font-bold uppercase tracking-widest text-brand-sage mb-2">Why this matches you</p>
                <ul className="space-y-1.5">
                  {match.matchReasons.slice(0, 2).map((reason, ri) => (
                    <li key={ri} className="flex items-start gap-2 text-[10px] md:text-xs text-brand-ink leading-relaxed">
                      <CheckCircle2 size={10} className="text-brand-sage mt-0.5 shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 p-4 bg-brand-bone/50 rounded-2xl border border-brand-border/50">
                <p className="text-[9px] font-bold text-brand-sage uppercase tracking-widest mb-1">Primary Benefit</p>
                <p className="text-xs md:text-sm text-brand-ink italic font-serif leading-relaxed">&ldquo;{product.benefit}&rdquo;</p>
              </div>

              <div className="space-y-2.5 mb-5 grow">
                {product.features.slice(0, 3).map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2.5 text-xs md:text-sm font-medium text-brand-ink/70">
                    <div className="w-5 h-5 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage shrink-0">
                      <CheckCircle2 size={11} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              {/* Trust badges near CTA */}
              <div className="flex items-center gap-2 mb-3 text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-brand-muted/50 justify-center">
                <span>✅ 30-Day Energy Guarantee</span>
                <span className="w-0.5 h-0.5 rounded-full bg-brand-muted/30" />
                <span>⚡ Instant Access</span>
                <span className="w-0.5 h-0.5 rounded-full bg-brand-muted/30" />
                <span>🔒 Secure</span>
              </div>

              <a
                href={`${product.link}?utm_source=fitfeky&utm_medium=quiz&utm_campaign=${goal}&utm_content=${product.id}&score=${match.matchScore}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackProductClick(product.title, product.category);
                  trackCtaClick('product_card', product.id, goal);
                }}
                className={`w-full group p-5 rounded-full font-bold text-sm md:text-base shadow-lg transition-all flex justify-center items-center gap-2 border-b-4 border-black/10 active:border-b-0 active:translate-y-1 ${
                  index === 0
                    ? 'bg-brand-sage text-white shadow-brand-sage/20 hover:bg-brand-sage/90 hover:-translate-y-0.5'
                    : 'bg-brand-tan/20 text-brand-ink hover:bg-brand-tan/40 shadow-brand-tan/10'
                }`}
              >
                {index === 0 ? (analysis.aiCta || 'START FEELING BETTER') : 'VIEW PROGRAM'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* === PERSONALIZED YOGA & WELLNESS RECOMMENDATIONS === */}
      {(analysis.yogaRecommendations?.length > 0 || analysis.wellnessTips?.length > 0) && (
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-4xl font-serif text-brand-ink mb-2">Your Personalized Recommendations</h3>
            <p className="text-brand-muted italic text-sm md:text-base max-w-2xl mx-auto">
              Based on your unique profile, we've curated these specifically for you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysis.yogaRecommendations?.length > 0 && (
              <div className="bg-linear-to-br from-brand-sage/5 to-brand-tan/10 border border-brand-sage/20 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-sage/10 flex items-center justify-center">
                    <Activity size={24} className="text-brand-sage" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-serif text-brand-ink">Yoga & Flexibility</h4>
                    <p className="text-[10px] md:text-xs text-brand-muted">Recommended for your goals</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {analysis.yogaRecommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-sage mt-0.5 shrink-0" />
                      <span className="text-xs md:text-sm text-brand-ink leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {analysis.wellnessTips?.length > 0 && (
              <div className="bg-linear-to-br from-brand-gold/5 to-brand-tan/10 border border-brand-gold/20 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <Heart size={24} className="text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-serif text-brand-ink">Wellness & Lifestyle</h4>
                    <p className="text-[10px] md:text-xs text-brand-muted">Daily habits for success</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {analysis.wellnessTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-brand-gold mt-0.5 shrink-0" />
                      <span className="text-xs md:text-sm text-brand-ink leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === TRANSFORMATION TIMELINE === */}
      <div className="mb-12 md:mb-16 bg-linear-to-br from-brand-tan/20 to-brand-sage/5 rounded-3xl md:rounded-[3rem] p-6 md:p-12 border border-brand-border">
        <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-6 text-center">Your Transformation Timeline</h3>
        <div className="whitespace-pre-line text-sm md:text-base text-brand-muted leading-relaxed text-center max-w-2xl mx-auto">
          {analysis.transformationTimeline}
        </div>
      </div>

      {/* === 4-WEEK ACTION PLAN === */}
      <div className="mb-12 md:mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-4xl font-serif text-brand-ink mb-2">Your 4-Week Action Plan</h3>
          <p className="text-brand-muted italic text-sm md:text-base">{analysis.personalizedMessage.slice(0, 80)}...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {analysis.actionPlan.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-brand-border p-5 md:p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-16 h-16 bg-brand-sage/5 rounded-bl-4xl" />
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-brand-sage/10 flex items-center justify-center text-[10px] font-bold text-brand-sage">{step.week}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-sage">Week {step.week}</span>
              </div>
              <h4 className="text-base md:text-lg font-serif text-brand-ink mb-2 leading-snug">{step.title}</h4>
              <p className="text-xs md:text-sm text-brand-muted mb-3 leading-relaxed">{step.description}</p>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-gold">
                <Clock size={11} /> {step.duration} &middot; {step.focus}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === DIET TIPS === */}
      <div className="mb-12 md:mb-16">
        <div className="bg-brand-sage/5 border border-brand-sage/20 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-sage mb-4 flex items-center gap-2">
            <Sparkles size={14} /> Nutrition Protocol
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.dietTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-brand-ink">
                <div className="w-6 h-6 rounded-full bg-brand-sage/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={12} className="text-brand-sage" />
                </div>
                <span className="text-xs md:text-sm leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === MOTIVATION === */}
      <div className="mb-12 md:mb-16">
        <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-4">Your Daily Motivation</h4>
          <div className="space-y-3">
            {analysis.motivationQuotes.map((quote, i) => (
              <p key={i} className="text-sm md:text-base text-brand-ink font-serif italic leading-relaxed">{quote}</p>
            ))}
          </div>
        </div>
      </div>

      {/* === GUARANTEE + TRUST === */}
      <div className="bg-brand-tan/30 rounded-[3rem] p-8 md:p-20 border border-brand-border text-center relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10">
          <div className="bg-brand-sage text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl" style={{ width: 72, height: 72 }}>
            <ShieldCheck size={36} />
          </div>
          <h3 className="text-2xl md:text-4xl font-serif text-brand-ink mb-4 leading-tight">
            Your Results Are Guaranteed
          </h3>
          <p className="text-brand-muted max-w-2xl mx-auto mb-6 text-base md:text-lg leading-relaxed">
            &ldquo;If you don&apos;t feel more energized, sleep better, and move with more confidence in 30 days, we&apos;ll refund every penny.
            No questions asked. No forms to fill.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-2 mb-8 text-[11px] font-bold text-brand-sage bg-brand-sage/5 px-4 py-2 rounded-full mx-auto w-max">
            <Award size={14} /> Backed by 50,000+ success stories
          </div>
          <button
            onClick={() => {
              if (productMatches.length > 0) {
                const p = productMatches[0].product;
                window.open(`${p.link}?utm_source=fitfeky&utm_medium=quiz&utm_campaign=${goal}&utm_content=${p.id}&score=${productMatches[0].matchScore}`, '_blank', 'noopener');
                trackProductClick(p.title, p.category);
                trackCtaClick('guarantee_cta', p.id, goal);
              }
            }}
            className="inline-flex items-center gap-2 bg-brand-sage text-white px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-brand-sage/20 hover:bg-brand-sage/90 hover:-translate-y-0.5 transition-all border-b-[3px] border-black/10 active:border-b-0"
          >
            {analysis.aiCta || 'Start Feeling Better'} <ArrowRight size={18} />
          </button>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted/60">
            <span className="flex items-center gap-1.5"><Lock size={13} className="text-brand-sage" /> SSL Secure</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-brand-sage" /> 50K+ Reclaimed Energy</span>
            <span className="flex items-center gap-1.5"><Zap size={13} className="text-brand-gold" /> Instant Access</span>
          </div>
        </div>
      </div>

      {/* === STICKY BOTTOM CTA === */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-brand-border px-4 py-3 md:py-4 shadow-2xl"
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold text-brand-ink leading-tight">
                  {productMatches[0]?.product.title || 'Your Personalized Plan'}
                </p>
                <p className="text-[10px] text-brand-muted flex items-center gap-1">
                  <Clock size={10} /> Limited offer — {formatTime(timeLeft)} left
                </p>
              </div>
              <button
                onClick={() => {
                  if (productMatches.length > 0) {
                    const p = productMatches[0].product;
                    window.open(`${p.link}?utm_source=fitfeky&utm_medium=quiz&utm_campaign=${goal}&utm_content=${p.id}&score=${productMatches[0].matchScore}`, '_blank', 'noopener');
                    trackProductClick(p.title, p.category);
                    trackCtaClick('sticky_cta', p.id, goal);
                  }
                }}
                className="w-full sm:w-auto bg-brand-sage text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-brand-sage/20 hover:bg-brand-sage/90 transition-all flex items-center justify-center gap-2 border-b-[3px] border-black/10 active:border-b-0"
              >
                {analysis.aiCta || 'Start Feeling Better'} <ArrowRight size={16} />
              </button>
              <button onClick={scrollToTop} className="hidden sm:flex text-brand-muted hover:text-brand-ink transition-colors p-2" aria-label="Back to top">
                <ArrowUp size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
