import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, ArrowUp, CheckCircle2, Clock, Lock, ShieldCheck, Star, Target, Zap, Heart, Brain, Flame, Award, Sparkles, Activity, ShoppingCart, Users, ExternalLink,
  BookOpen, Share2, Mail, Crown, TrendingUp, Copy, ChevronRight, Scale
} from 'lucide-react';
import { trackResultsView } from '@/lib/analytics';
import { useCountdown } from '@/hooks/useCountdown';
import { useRecommendations } from '@/hooks/useRecommendations';
import { productSchema } from '@/lib/seo';
import { articles } from '@/content/blogArticles';
import { getTopRecommendations } from '@/lib/recommendationEngine';
import type { QuizData, EnhancedAnalysis } from '@/lib/types';
import type { Product } from '@/lib/products';

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
}: {
  quizData: QuizData;
  analysis: EnhancedAnalysis;
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

      {/* === SECTION 1: PERSONAL SUMMARY HEADER === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-6 text-center">Your Personal Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          <div className="bg-white rounded-2xl md:rounded-3xl border border-brand-border p-4 md:p-6 shadow-sm text-center">
            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-brand-muted">Current Weight</span>
            <div className="text-2xl md:text-3xl font-black text-brand-ink mt-1">{quizData.currentWeight} <span className="text-sm font-medium text-brand-muted">kg</span></div>
          </div>
          <div className="bg-white rounded-2xl md:rounded-3xl border border-brand-border p-4 md:p-6 shadow-sm text-center">
            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-brand-muted">Target Weight</span>
            <div className="text-2xl md:text-3xl font-black text-brand-ink mt-1">{quizData.targetWeight} <span className="text-sm font-medium text-brand-muted">kg</span></div>
          </div>
          <div className="bg-white rounded-2xl md:rounded-3xl border border-brand-border p-4 md:p-6 shadow-sm text-center">
            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-brand-muted">To {Math.abs(analysis.weightToLose) > 0 ? (analysis.weightToLose > 0 ? 'Lose' : 'Gain') : 'Maintain'}</span>
            <div className={`text-2xl md:text-3xl font-black mt-1 ${analysis.weightToLose > 0 ? 'text-brand-rose' : 'text-brand-sage'}`}>
              {Math.abs(analysis.weightToLose)} <span className="text-sm font-medium text-brand-muted">kg</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl md:rounded-3xl border border-brand-border p-4 md:p-6 shadow-sm text-center">
            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-brand-muted">Est. Timeline</span>
            <div className="text-lg md:text-xl font-black text-brand-gold mt-1">
              {Math.max(4, Math.ceil(Math.abs(analysis.weightToLose) / 0.75))} weeks
            </div>
          </div>
        </div>
      </motion.div>

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

      {/* === SECTION 2: CALORIE & MACRO TARGETS === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <div className="bg-white rounded-3xl border border-brand-border p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-brand-ink">Calorie & Macro Targets</h3>
              <p className="text-[10px] text-brand-muted">Daily targets based on your unique biometrics</p>
            </div>
            <Link
              to="/calculators/macro-calculator"
              onClick={() => localStorage.setItem('calc_calculators_macro-calculator_clicked', Date.now().toString())}
              className="text-[9px] font-bold text-brand-sage hover:underline inline-flex items-center gap-1"
            >
              Full Calculator <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            <div className="bg-brand-sage/5 rounded-2xl p-4 md:p-5 text-center border border-brand-sage/10">
              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-muted">Calorie Target</span>
              <div className="text-3xl md:text-4xl font-black text-brand-ink mt-1">{meta.calorieTarget}</div>
              <span className="text-[9px] text-brand-muted">calories/day</span>
              <div className="mt-2 h-1.5 bg-brand-bone rounded-full overflow-hidden">
                <div className="h-full bg-brand-sage rounded-full" style={{ width: `${Math.min(100, (meta.calorieTarget / (meta.tdee || 2000)) * 100)}%` }} />
              </div>
              <p className="text-[8px] text-brand-muted/60 mt-1">
                {analysis.goal === 'weight_loss' ? `${Math.round((1 - meta.calorieTarget / (meta.tdee || 2000)) * 100)}% deficit` : 'Maintenance level'}
              </p>
            </div>
            <div className="bg-brand-gold/5 rounded-2xl p-4 md:p-5 text-center border border-brand-gold/10">
              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-muted">Protein</span>
              <div className="text-3xl md:text-4xl font-black text-brand-ink mt-1">{meta.proteinG}g</div>
              <span className="text-[9px] text-brand-muted">{meta.proteinTarget}% of calories</span>
              <div className="mt-2 h-1.5 bg-brand-bone rounded-full overflow-hidden">
                <div className="h-full bg-brand-rose rounded-full" style={{ width: `${meta.proteinTarget}%` }} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/calculators/tdee-calculator"
                onClick={() => localStorage.setItem('calc_calculators_tdee-calculator_clicked', Date.now().toString())}
                className="flex-1 bg-brand-tan/20 rounded-xl p-3 flex items-center gap-3 hover:bg-brand-tan/30 transition-colors"
              >
                <Zap size={14} className="text-brand-gold shrink-0" />
                <div className="text-left">
                  <span className="text-[9px] font-bold text-brand-ink block">TDEE: {meta.tdee} cal</span>
                  <span className="text-[8px] text-brand-muted">Total daily energy expenditure</span>
                </div>
                <ChevronRight size={12} className="text-brand-muted ml-auto shrink-0" />
              </Link>
              <Link
                to="/calculators/bmr-calculator"
                onClick={() => localStorage.setItem('calc_calculators_bmr-calculator_clicked', Date.now().toString())}
                className="flex-1 bg-brand-tan/20 rounded-xl p-3 flex items-center gap-3 hover:bg-brand-tan/30 transition-colors"
              >
                <Heart size={14} className="text-brand-rose shrink-0" />
                <div className="text-left">
                  <span className="text-[9px] font-bold text-brand-ink block">BMR: {meta.bmr} cal</span>
                  <span className="text-[8px] text-brand-muted">Basal metabolic rate</span>
                </div>
                <ChevronRight size={12} className="text-brand-muted ml-auto shrink-0" />
              </Link>
            </div>
          </div>

          <div className="bg-brand-bone/20 rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center text-[9px]">
              <div>
                <span className="font-bold text-brand-ink block">{meta.carbG}g</span>
                <span className="text-brand-muted">Carbs ({meta.carbTarget}%)</span>
              </div>
              <div>
                <span className="font-bold text-brand-ink block">{meta.fatG}g</span>
                <span className="text-brand-muted">Fat ({meta.fatTarget}%)</span>
              </div>
              <div>
                <span className="font-bold text-brand-ink block">{meta.carbG + meta.proteinG + meta.fatG}g</span>
                <span className="text-brand-muted">Total macros</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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

      {/* === SECTION 4: EMOTIONAL FEEDBACK === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <div className="bg-linear-to-br from-brand-rose/5 to-brand-tan/10 border border-brand-rose/15 rounded-3xl md:rounded-[3rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Heart size={80} className="text-brand-rose" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-rose/10 flex items-center justify-center">
              <Heart size={18} className="text-brand-rose" />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-rose">Your Emotional Insight</span>
              <p className="text-[10px] text-brand-muted">Understanding what has held you back</p>
            </div>
          </div>
          <p className="text-base md:text-lg text-brand-ink leading-relaxed font-serif italic">
            &ldquo;
            {quizData.pastObstacle?.toLowerCase().includes('hard to stick') &&
              'You have tried programs that demanded too much too soon. The key is finding an approach that fits your life — not the other way around. This plan is built for consistency, not intensity.'}
            {quizData.pastObstacle?.toLowerCase().includes('spent money') &&
              'You have invested in solutions that did not deliver. This plan is different — it is personalized to your body and goals, eliminating guesswork and wasted effort.'}
            {quizData.pastObstacle?.toLowerCase().includes('never found') &&
              'You have been searching for the right fit. Generic programs fail because they treat everyone the same. Your plan is uniquely crafted for you.'}
            {quizData.pastObstacle?.toLowerCase().includes('no gym') &&
              'You do not need a gym. Every workout in your plan can be done at home with zero equipment. Your living room is your studio.'}
            {!quizData.pastObstacle?.toLowerCase().includes('hard to stick') &&
             !quizData.pastObstacle?.toLowerCase().includes('spent money') &&
             !quizData.pastObstacle?.toLowerCase().includes('never found') &&
             !quizData.pastObstacle?.toLowerCase().includes('no gym') &&
              'Your past obstacles have shaped your resilience. This plan addresses those specific challenges with targeted strategies.'}
            &rdquo;
          </p>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-brand-sage font-bold">
            <CheckCircle2 size={12} /> Personalized to your past challenges
          </div>
        </div>
      </motion.div>

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

      {/* === RECOMMENDATION TAGS === */}
      <div className="mb-12 md:mb-16">
        <h3 className="text-xl md:text-4xl font-serif text-brand-ink mb-3 text-center">Your Recommendation Profile</h3>
        <p className="text-xs md:text-base text-brand-muted italic max-w-2xl mx-auto text-center mb-8">
          Based on your answers, here is what suits you best.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} className="text-brand-sage" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-sage">Focus Areas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.psychologicalProfile.focusCategories.map((cat, i) => (
                <span key={i} className="px-3 py-1.5 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-wider rounded-full border border-brand-sage/20">
                  {cat}
                </span>
              ))}
              <span className="px-3 py-1.5 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-wider rounded-full border border-brand-gold/20">
                {goal === 'weight_loss' ? 'Fat Loss' : goal === 'flexibility' ? 'Mobility' : 'Vitality'}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-brand-gold" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold">Fitness Level</span>
            </div>
            <p className="text-sm font-bold text-brand-ink capitalize">
              {analysis.psychologicalProfile.archetype === 'Beginner Restarting Journey' ? 'Beginner' :
               analysis.psychologicalProfile.archetype === 'Transformation-Ready Champion' ? 'Intermediate' :
               analysis.psychologicalProfile.archetype === 'Ambitious Achiever' ? 'Intermediate' :
               analysis.psychologicalProfile.archetype === 'Consistent Grower' ? 'Beginner - Intermediate' :
               'Beginner'}
            </p>
            <p className="text-[10px] text-brand-muted mt-1">Based on your experience and commitment level</p>
          </div>

          <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={16} className="text-brand-rose" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-rose">Best Suited For</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {generateTags(analysis).map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-brand-sage/5 text-brand-muted text-[10px] font-bold uppercase tracking-wider rounded-full border border-brand-border/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === SECTION 5: NEXT STEPS === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-6 text-center">Your Next Steps</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {[
            { icon: Zap, title: 'Start Your Journey', desc: 'Begin with Week 1 of your 4-week action plan above', color: 'text-brand-sage', bg: 'bg-brand-sage/10' },
            { icon: Target, title: 'Track Progress', desc: 'Take photos and measurements to see your transformation', color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
            { icon: Users, title: 'Join Community', desc: 'Connect with women on the same journey for accountability', color: 'text-brand-rose', bg: 'bg-brand-rose/10' },
            { icon: BookOpen, title: 'Read Your Guides', desc: 'Explore personalized articles matched to your profile below', color: 'text-brand-sage', bg: 'bg-brand-sage/10' },
          ].map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-brand-border p-4 md:p-6 shadow-sm text-center hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-full ${step.bg} flex items-center justify-center mx-auto mb-3`}>
                <step.icon size={18} className={step.color} />
              </div>
              <h4 className="text-xs md:text-sm font-bold text-brand-ink mb-1">{step.title}</h4>
              <p className="text-[9px] md:text-[10px] text-brand-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* === SECTION 6: CALCULATOR LINKS === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <div className="bg-linear-to-br from-brand-tan/20 to-brand-sage/5 rounded-3xl md:rounded-[3rem] p-6 md:p-10 border border-brand-border">
          <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-2 text-center">Free Tools & Calculators</h3>
          <p className="text-xs md:text-sm text-brand-muted italic text-center mb-6 max-w-lg mx-auto">Track your progress with these science-backed calculators</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: Scale, title: 'BMI Calculator', desc: 'Check your body mass index', link: '/bmi-calculator', color: 'text-brand-sage' },
              { icon: Zap, title: 'TDEE Calculator', desc: 'Know your daily energy needs', link: '/calculators/tdee-calculator', color: 'text-brand-gold' },
              { icon: Target, title: 'Calorie Calculator', desc: 'Find your fat loss target', link: '/calorie-calculator', color: 'text-brand-rose' },
              { icon: Activity, title: 'Nutrition Calculator', desc: 'Split protein, carbs & fat', link: '/nutrition-calculator', color: 'text-brand-sage' },
            ].map((calc, i) => (
              <Link
                key={i}
                to={calc.link}
                onClick={() => {
                  const key = `calc_${calc.link.replace(/\//g, '_')}_clicked`;
                  localStorage.setItem(key, Date.now().toString());
                }}
                className="bg-white rounded-2xl border border-brand-border p-4 md:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center group block"
              >
                <calc.icon size={20} className={`${calc.color} mx-auto mb-2`} />
                <h4 className="text-[10px] md:text-xs font-bold text-brand-ink mb-0.5">{calc.title}</h4>
                <p className="text-[8px] md:text-[9px] text-brand-muted">{calc.desc}</p>
                <span className="text-[8px] font-bold text-brand-sage opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-0.5 mt-1">
                  Open <ChevronRight size={8} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* === SECTION 7: PERSONALIZED BLOG ARTICLES === */}
      <BlogArticlesSection analysis={analysis} />

      {/* === SECTION 8: AFFILIATE PRODUCTS === */}
      <AffiliateProductsSection analysis={analysis} />

      {/* === RECOMMENDED PRODUCTS === */}
      <RecommendationProducts analysis={analysis} />

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

      {/* === SECTION 3: TIMELINE PREDICTION === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-6 text-center">Your Milestone Timeline</h3>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-brand-sage/20 hidden md:block" />
          <div className="space-y-6 md:space-y-0">
            {[
              { week: 'Wk 1-2', title: 'Neuro-Adaptation', desc: 'Your nervous system learns new movement patterns. Energy stabilizes.', color: 'bg-brand-sage', icon: Brain },
              { week: 'Wk 3-4', title: 'Metabolic Shift', desc: 'Your body taps into stored fat. Sleep improves. Clothes fit differently.', color: 'bg-brand-gold', icon: Flame },
              { week: 'Wk 5-8', title: 'Visible Transformation', desc: 'Physical changes become apparent. Friends will notice.', color: 'bg-brand-rose', icon: TrendingUp },
              { week: 'Wk 9-12', title: 'Lifestyle Integration', desc: 'New habits become automatic. Transformation becomes permanent.', color: 'bg-brand-sage', icon: Crown },
            ].map((phase, i) => (
              <div key={i} className="md:flex items-center gap-6 md:odd:flex-row-reverse">
                <div className="hidden md:block md:w-1/2" />
                <div className="flex items-center gap-4 md:gap-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:flex-col md:items-center">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${phase.color} text-white flex items-center justify-center shadow-lg shrink-0 relative z-10`}>
                    <phase.icon size={18} />
                  </div>
                  <div className="md:hidden">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">{phase.week}</span>
                    <h4 className="text-sm font-bold text-brand-ink">{phase.title}</h4>
                    <p className="text-[10px] text-brand-muted">{phase.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2 md:pl-8 md:odd:pl-0 md:odd:pr-8 md:odd:text-right">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">{phase.week}</span>
                  <h4 className="text-sm font-bold text-brand-ink">{phase.title}</h4>
                  <p className="text-[10px] text-brand-muted">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

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

      {/* === SECTION 9: SAVE & CONTINUE === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <div className="bg-white rounded-3xl md:rounded-[3rem] border border-brand-border p-6 md:p-10 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown size={24} className="text-brand-gold" />
            </div>
            <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-2">Save Your Plan & Continue</h3>
            <p className="text-sm text-brand-muted max-w-lg mx-auto">Get your personalized plan delivered to your inbox and join our 7-Day Challenge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-brand-sage/5 rounded-2xl p-5 text-center border border-brand-sage/10">
              <Mail size={20} className="text-brand-sage mx-auto mb-3" />
              <h4 className="text-sm font-bold text-brand-ink mb-1">Email Your Plan</h4>
              <p className="text-[10px] text-brand-muted mb-3">Never lose access to your results</p>
              <div className="flex gap-2">
                <input
                  type="email" placeholder="your@email.com"
                  defaultValue={quizData.email || ''}
                  className="flex-1 px-3 py-2 rounded-xl border border-brand-border/30 text-[11px] focus:border-brand-sage outline-none bg-white"
                />
                <button className="bg-brand-sage text-white px-3 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-brand-sage/90 transition-all whitespace-nowrap">
                  Send
                </button>
              </div>
            </div>

            <Link
              to="/"
              className="bg-brand-gold/5 rounded-2xl p-5 text-center border border-brand-gold/10 hover:bg-brand-gold/10 transition-all block group"
            >
              <Zap size={20} className="text-brand-gold mx-auto mb-3" />
              <h4 className="text-sm font-bold text-brand-ink mb-1">Join 7-Day Challenge</h4>
              <p className="text-[10px] text-brand-muted mb-3">Start seeing results this week</p>
              <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest inline-flex items-center gap-1 group-hover:underline">
                Start Free <ArrowRight size={12} />
              </span>
            </Link>

            <div className="bg-brand-tan/30 rounded-2xl p-5 text-center border border-brand-border/30">
              <Share2 size={20} className="text-brand-sage mx-auto mb-3" />
              <h4 className="text-sm font-bold text-brand-ink mb-1">Share Your Results</h4>
              <p className="text-[10px] text-brand-muted mb-3">Inspire others on their journey</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="text-[9px] font-bold text-brand-sage uppercase tracking-widest inline-flex items-center gap-1 hover:underline"
              >
                <Copy size={12} /> Copy Link
              </button>
            </div>
          </div>

          <div className="bg-brand-sage/5 rounded-2xl p-4 md:p-6 text-center border border-brand-sage/10">
            <p className="text-xs text-brand-muted mb-3">
              <Sparkles size={12} className="inline text-brand-gold mr-1" />
              Your plan is saved locally. For full access across devices, enter your email above.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-[8px] font-bold uppercase tracking-widest text-brand-muted/50">
              <span className="flex items-center gap-1"><Lock size={10} /> Encrypted</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={10} /> Free Forever</span>
              <span className="flex items-center gap-1"><Zap size={10} /> Instant Access</span>
            </div>
          </div>
        </div>
      </motion.div>

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
                  Your Personalized Plan
                </p>
                <p className="text-[10px] text-brand-muted flex items-center gap-1">
                  <Clock size={10} /> Limited offer — {formatTime(timeLeft)} left
                </p>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto bg-brand-sage text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-brand-sage/20 hover:bg-brand-sage/90 transition-all flex items-center justify-center gap-2 border-b-[3px] border-black/10 active:border-b-0"
              >
                Review Your Plan <ArrowRight size={16} />
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

function generateTags(analysis: EnhancedAnalysis): string[] {
  const tags: string[] = [];
  const goal = analysis.goal;
  const archetype = analysis.psychologicalProfile.archetype;

  if (goal === 'weight_loss') tags.push('Fat Loss', 'Metabolic', 'Body Composition');
  if (goal === 'flexibility') tags.push('Mobility', 'Gentle Flow', 'Posture');
  if (goal === 'energy') tags.push('Vitality', 'Strength Building', 'Endurance');

  if (archetype === 'Busy Working Woman') tags.push('Time Efficient', 'Quick Sessions');
  if (archetype === 'Emotional Eater') tags.push('Stress Relief', 'Mindful Movement');
  if (archetype === 'Beginner Restarting Journey') tags.push('Beginner Friendly', 'Low Impact');
  if (archetype === 'Transformation-Ready Champion') tags.push('Progressive', 'Structured');

  if (analysis.psychologicalProfile.stressLevel === 'high') tags.push('Cortisol Management', 'Restorative');
  if (analysis.psychologicalProfile.lifestylePace === 'hectic') tags.push('Home Based', 'No Equipment');

  return tags;
}

function RecommendationProducts({ analysis }: { analysis: EnhancedAnalysis }) {
  const { products, loading, error } = useRecommendations(analysis);

  if (loading) return null;
  if (error) {
    console.warn('[ResultsStep] Recommendation error:', error);
  }

  const displayProducts = products.length > 0 ? products.slice(0, 3) : [];

  if (displayProducts.length === 0) return null;

  return (
    <>
      <Helmet>
        {displayProducts.map((product) => (
          <script key={product.id} type="application/ld+json">
            {JSON.stringify(productSchema({
              name: product.name,
              image: product.image,
              url: product.url,
              price: product.price,
              rating: product.rating,
              ratingsCount: product.ratingsCount,
              description: `${product.name} — rated ${product.rating}/5 with ${product.ratingsCount.toLocaleString()} reviews. ${product.tags.join(', ')}.`,
            }))}
          </script>
        ))}
      </Helmet>
    <div className="mb-12 md:mb-16">
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-4xl font-serif text-brand-ink mb-2">Recommended Products For You</h3>
        <p className="text-brand-muted italic text-sm md:text-base max-w-2xl mx-auto">
          Top-rated products matched to your goals and profile
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {displayProducts.map((product) => (
          <motion.a
            key={product.id}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col"
          >
            <div className="aspect-4/3 bg-brand-bone/30 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 md:p-5 flex flex-col flex-1">
              <h4 className="text-xs md:text-sm font-bold text-brand-ink leading-snug mb-2 line-clamp-2">
                {product.name}
              </h4>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-brand-gold fill-brand-gold" />
                  <span className="text-[10px] font-bold text-brand-ink">{product.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={11} className="text-brand-muted" />
                  <span className="text-[9px] text-brand-muted">{product.ratingsCount.toLocaleString()} reviews</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {product.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[7px] md:text-[8px] font-bold uppercase tracking-wider text-brand-muted bg-brand-bone/50 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-sm md:text-base font-black text-brand-ink">${product.price.toFixed(2)}</span>
                <span className="text-[9px] font-bold text-brand-sage group-hover:underline inline-flex items-center gap-1">
                  View Deal <ExternalLink size={10} />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
    </>
  );
}

const ARCHETYPE_CATEGORY_MAP: Record<string, string[]> = {
  'Busy Working Woman': ['Wellness', 'Nutrition'],
  'Emotional Eater': ['Wellness', 'Yoga'],
  'Beginner Restarting Journey': ['Yoga', 'Weight Loss'],
  'Transformation-Ready Champion': ['Weight Loss', 'Nutrition'],
  'Consistent Grower': ['Nutrition', 'Wellness'],
  'Ambitious Achiever': ['Nutrition', 'Weight Loss'],
};

function BlogArticlesSection({ analysis }: { analysis: EnhancedAnalysis }) {
  const archetype = analysis.psychologicalProfile.archetype;
  const categories = ARCHETYPE_CATEGORY_MAP[archetype] || ['Weight Loss', 'Wellness'];
  const goalCategory = analysis.goal === 'flexibility' ? 'Yoga' : analysis.goal === 'weight_loss' ? 'Weight Loss' : 'Nutrition';
  const allCategories = [...new Set([...categories, goalCategory])];

  const matchedArticles = useMemo(() => {
    const filtered = articles.filter(a => allCategories.includes(a.category));
    return filtered.slice(0, 3);
  }, [allCategories]);

  if (matchedArticles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 md:mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-2">Personalized Reads For You</h3>
        <p className="text-brand-muted italic text-sm md:text-base max-w-lg mx-auto">
          Articles curated to your {archetype.toLowerCase()} profile
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {matchedArticles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            className="group bg-white rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 flex flex-col"
          >
            <div className="aspect-video bg-brand-bone/30 overflow-hidden">
              <img
                src={article.ogImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 md:p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-bold uppercase tracking-widest text-brand-sage bg-brand-sage/5 px-2 py-0.5 rounded-full">
                  {article.category}
                </span>
                <span className="text-[8px] text-brand-muted">{article.readTime}</span>
              </div>
              <h4 className="text-xs md:text-sm font-bold text-brand-ink leading-snug mb-2 line-clamp-2 group-hover:text-brand-sage transition-colors">
                {article.title}
              </h4>
              <p className="text-[10px] text-brand-muted leading-relaxed line-clamp-2 flex-1">
                {article.excerpt}
              </p>
              <span className="text-[9px] font-bold text-brand-sage mt-3 inline-flex items-center gap-1 group-hover:underline">
                Read More <ArrowRight size={10} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function AffiliateProductsSection({ analysis }: { analysis: EnhancedAnalysis }) {
  const products = useMemo(() => {
    return getTopRecommendations(analysis, 4);
  }, [analysis]);

  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 md:mb-16"
    >
      <div className="bg-white rounded-3xl border border-brand-border p-6 md:p-8 shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-serif text-brand-ink mb-1">Top Picks For Your Profile</h3>
          <p className="text-[10px] text-brand-muted">Hand-picked products based on your archetype and goals</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => (
            <motion.a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="group bg-brand-bone/20 rounded-xl border border-brand-border/50 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="aspect-square bg-white p-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h4 className="text-[10px] font-bold text-brand-ink leading-snug line-clamp-2 mb-1">{product.name}</h4>
                <div className="flex items-center gap-1 mb-1">
                  <Star size={8} className="text-brand-gold fill-brand-gold" />
                  <span className="text-[8px] font-bold text-brand-ink">{product.rating.toFixed(1)}</span>
                  <span className="text-[7px] text-brand-muted">({product.ratingsCount.toLocaleString()})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-brand-ink">${product.price.toFixed(2)}</span>
                  <span className="text-[7px] font-bold text-brand-sage group-hover:underline">Shop</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
