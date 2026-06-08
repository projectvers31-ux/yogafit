import { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackEvent, trackStepView, trackConversion, trackMetaIntent, trackMetaCommitment } from '@/lib/analytics';
import type { EnhancedAnalysis } from '@/lib/types';
import SEOHelmet from '@/components/seo/SEOHelmet';
import { websiteSchema, webApplicationSchema, organizationSchema, faqPageSchema as faqSchema, breadcrumbSchema as breadcrumbSchemaFn } from '@/lib/seo';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnalyzingStep from '@/components/quiz/AnalyzingStep';
import ProgressBar from '@/components/quiz/ProgressBar';
import QuizStepContainer from '@/components/quiz/QuizStepContainer';
import QuizOption from '@/components/quiz/QuizOption';
import Hero from '@/components/landing/Hero';
import SocialProof from '@/components/landing/SocialProof';
import HowItWorks from '@/components/landing/HowItWorks';
import WhyFitFeky from '@/components/landing/WhyFitFeky';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import {
  ArrowRight, Sparkles, Star, CheckCircle2, Target, Scale, Ruler, Zap, Waves, Dumbbell, X, Lock, ChevronRight, MessageCircle
} from 'lucide-react';

const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const Stories = lazy(() => import('./pages/Stories'));
const StoryDetail = lazy(() => import('./pages/StoryDetail'));
const Calculators = lazy(() => import('./pages/Calculators'));
const TDEECalculator = lazy(() => import('./pages/TDEECalculator'));
const BMRCalculator = lazy(() => import('./pages/calculators/BMRCalculator'));
const CalorieDeficitCalculator = lazy(() => import('./pages/calculators/CalorieDeficitCalculator'));
const MacroCalculator = lazy(() => import('./pages/calculators/MacroCalculator'));
const IdealWeightCalculator = lazy(() => import('./pages/calculators/IdealWeightCalculator'));
const BodyFatCalculator = lazy(() => import('./pages/calculators/BodyFatCalculator'));
const WaterIntakeCalculator = lazy(() => import('./pages/calculators/WaterIntakeCalculator'));
const ProteinCalculator = lazy(() => import('./pages/calculators/ProteinCalculator'));
const ResultsStep = lazy(() => import('@/components/quiz/ResultsStep'));
const ChatWindow = lazy(() => import('@/components/chatbot/ChatWindow'));

type QuizStep = 'welcome' | 'identity' | 'painPoint' | 'desiredResult' | 'timeAvailable' | 'pastObstacle' | 'commitment' | 'urgency' | 'currentWeight' | 'height' | 'targetWeight' | 'email' | 'analyzing' | 'result' | 'name';

interface QuizData {
  identity: string;
  painPoint: string;
  desiredResult: string;
  timeAvailable: string;
  pastObstacle: string;
  commitment: string;
  urgency: string;
  currentWeight: string;
  height: string;
  targetWeight: string;
  email: string;
  name: string;
}

function LandingPage() {
  const [step, setStep] = useState<QuizStep>('welcome');
  const [quizData, setQuizData] = useState<QuizData>({
    identity: '', painPoint: '', desiredResult: '', timeAvailable: '',
    pastObstacle: '', commitment: '', urgency: '', currentWeight: '',
    height: '', targetWeight: '', email: '', name: ''
  });
  const [analysis, setAnalysis] = useState<EnhancedAnalysis | null>(null);
  const [stepHistory, setStepHistory] = useState<QuizStep[]>(['welcome']);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const exitIntentTriggered = useRef(false);
  const [socialProofIndex, setSocialProofIndex] = useState(0);
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const socialProofs = [
    "Sara from Cairo just purchased Yoga 21 ✓",
    "Emma from London started the Flat Belly Mom Program ✓",
    "Ayesha from Dubai just unlocked her personalized plan ✓",
    "Chloe from Sydney joined the 90-Day Transformation ✓",
    "Nour from Amman finished the quiz ✓"
  ];

  const quizSteps: QuizStep[] = ['welcome', 'identity', 'painPoint', 'timeAvailable', 'pastObstacle', 'commitment', 'urgency', 'desiredResult', 'currentWeight', 'height', 'targetWeight', 'email', 'analyzing', 'result'];

  const calculateProgress = useCallback(() => {
    const index = quizSteps.indexOf(step);
    return (index / (quizSteps.length - 1)) * 100;
  }, [step, quizSteps]);

  const handleNext = async (nextStep: QuizStep) => {
    if (nextStep === 'result') {
      const { analyzeQuizEnhanced } = await import('./lib/quizAnalysis');
      const result = analyzeQuizEnhanced(quizData);
      setAnalysis(result);
    }
    setStepHistory(prev => [...prev, nextStep]);
    setStep(nextStep);
    trackStepView(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop();
      const prevStep = newHistory[newHistory.length - 1];
      setStepHistory(newHistory);
      setStep(prevStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartQuiz = useCallback(() => {
    trackEvent('quiz_start', { 'event_category': 'Quiz' });
    handleNext('identity');
  }, []);

  const updateQuizData = useCallback((field: keyof QuizData, value: string) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    trackStepView('welcome');
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered.current && (step === 'result' || step === 'email')) {
        setShowExitIntent(true);
        exitIntentTriggered.current = true;
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [step]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSocialProofIndex((prev) => (prev + 1) % socialProofs.length);
      setShowSocialProof(true);
      setTimeout(() => setShowSocialProof(false), 5000);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-brand-warm font-sans text-brand-ink selection:bg-brand-sage/20">
      <SEOHelmet
        title="Women's Fitness Quiz — Free Personalized Yoga Plan | FitFeky"
        description="Take our free women's fitness quiz in 60 seconds. Get a personalized yoga and weight loss program for busy women. Instant results."
        canonicalPath="/"
      />

      <AnimatePresence>
        {showSocialProof && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            role="status" aria-live="polite"
            className="fixed bottom-20 md:bottom-6 left-6 z-40 bg-white/95 backdrop-blur-md border border-brand-border/30 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2.5 max-w-xs"
          >
            <div className="w-7 h-7 rounded-full bg-brand-sage/10 text-brand-sage flex items-center justify-center shrink-0">
              <CheckCircle2 size={14} />
            </div>
            <p className="text-[11px] font-medium text-brand-ink leading-tight">
              {socialProofs[socialProofIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-brand-ink/30 backdrop-blur-sm flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Your results are ready"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-ink transition-colors"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
              <div className="w-14 h-14 bg-brand-sage/10 text-brand-sage rounded-full flex items-center justify-center mb-5 mx-auto">
                <Sparkles size={26} />
              </div>
              <h3 className="text-xl font-serif text-center text-brand-ink mb-3">Your results are ready</h3>
              <p className="text-center text-sm text-brand-muted mb-6 leading-relaxed">
                Your personalized plan has been created. Do not lose your progress.
              </p>
              <button
                onClick={() => setShowExitIntent(false)}
                className="w-full bg-brand-sage text-white p-3.5 rounded-xl font-semibold text-sm hover:bg-[#243D31] transition-all"
              >
                Continue to My Plan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" className="relative">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onStartQuiz={handleStartQuiz} />
              <SocialProof />
              <HowItWorks />
              <WhyFitFeky />
              <Testimonials />
              <FAQ />
            </motion.div>
          )}

          {step !== 'welcome' && step !== 'result' && step !== 'analyzing' && <ProgressBar progress={calculateProgress()} />}

          {step === 'identity' && (
            <QuizStepContainer key="identity" title="What describes you best?" onBack={handleBack} currentStep={1} totalSteps={10}>
              {[
                { label: 'Busy mom trying to get her body back', icon: Zap },
                { label: 'Working woman with no time to waste', icon: Target },
                { label: 'Complete beginner, don\'t know where to start', icon: CheckCircle2 },
                { label: 'Already active but not seeing results', icon: Dumbbell }
              ].map((opt) => (
                <QuizOption
                  key={opt.label}
                  label={opt.label}
                  icon={opt.icon}
                  active={quizData.identity === opt.label}
                  onClick={() => {
                    updateQuizData('identity', opt.label);
                    trackEvent('quiz_interaction', { category: 'identity', value: opt.label });
                    handleNext('painPoint');
                  }}
                />
              ))}
            </QuizStepContainer>
          )}

          {step === 'painPoint' && (
            <QuizStepContainer key="painPoint" title="What bothers you most right now?" onBack={handleBack} currentStep={2} totalSteps={10}>
              {[
                { label: 'Stubborn belly fat that won\'t go away', icon: Zap },
                { label: 'Low energy and constant fatigue', icon: Waves },
                { label: 'Lost my shape after pregnancy or weight gain', icon: Target },
                { label: 'Stress and anxiety controlling my life', icon: X }
              ].map((opt) => (
                <QuizOption
                  key={opt.label}
                  label={opt.label}
                  icon={opt.icon}
                  active={quizData.painPoint === opt.label}
                  onClick={() => {
                    updateQuizData('painPoint', opt.label);
                    trackEvent('quiz_interaction', { category: 'painPoint', value: opt.label });
                    handleNext('timeAvailable');
                  }}
                />
              ))}
            </QuizStepContainer>
          )}

          {step === 'timeAvailable' && (
            <QuizStepContainer key="timeAvailable" title="How much time can you commit daily?" onBack={handleBack} currentStep={3} totalSteps={10}>
              <div className="bg-brand-sage/5 text-brand-sage text-[10px] font-bold uppercase tracking-widest text-center py-1.5 px-4 rounded-full mb-5 mx-auto w-max border border-brand-sage/10">
                You are doing great
              </div>
              {[
                { label: '10\u201315 minutes (very busy)', icon: Zap },
                { label: '20\u201330 minutes (manageable)', icon: Target },
                { label: '45\u201360 minutes (fully committed)', icon: CheckCircle2 }
              ].map((opt) => (
                <QuizOption
                  key={opt.label}
                  label={opt.label}
                  icon={opt.icon}
                  active={quizData.timeAvailable === opt.label}
                  onClick={() => {
                    updateQuizData('timeAvailable', opt.label);
                    trackEvent('quiz_interaction', { category: 'timeAvailable', value: opt.label });
                    trackMetaCommitment(opt.label);
                    handleNext('pastObstacle');
                  }}
                />
              ))}
            </QuizStepContainer>
          )}

          {step === 'pastObstacle' && (
            <QuizStepContainer key="pastObstacle" title="What stopped you from getting results before?" onBack={handleBack} currentStep={4} totalSteps={10}>
              {[
                { label: 'Programs too hard to stick to', icon: X },
                { label: 'Spent money on things that didn\'t work', icon: Target },
                { label: 'Never found the right program for me', icon: CheckCircle2 },
                { label: 'No gym or equipment at home', icon: Dumbbell }
              ].map((opt) => (
                <QuizOption
                  key={opt.label}
                  label={opt.label}
                  icon={opt.icon}
                  active={quizData.pastObstacle === opt.label}
                  onClick={() => {
                    updateQuizData('pastObstacle', opt.label);
                    trackEvent('quiz_interaction', { category: 'pastObstacle', value: opt.label });
                    handleNext('commitment');
                  }}
                />
              ))}
            </QuizStepContainer>
          )}

          {step === 'commitment' && (
            <QuizStepContainer key="commitment" title="How serious are you about changing your body?" onBack={handleBack} currentStep={5} totalSteps={10}>
              {[
                { label: 'Want to try \u2014 no big commitment yet', icon: Waves },
                { label: 'Ready to start \u2014 just need the right plan', icon: Target },
                { label: '100% committed \u2014 ready to invest in myself', icon: Star }
              ].map((opt) => (
                <QuizOption
                  key={opt.label}
                  label={opt.label}
                  icon={opt.icon}
                  active={quizData.commitment === opt.label}
                  onClick={() => {
                    updateQuizData('commitment', opt.label);
                    trackEvent('quiz_interaction', { category: 'commitment', value: opt.label });
                    handleNext('urgency');
                  }}
                />
              ))}
            </QuizStepContainer>
          )}

          {step === 'urgency' && (
            <QuizStepContainer key="urgency" title="When do you want your first real results?" onBack={handleBack} currentStep={6} totalSteps={10}>
              {[
                { label: 'ASAP \u2014 within 2 weeks', icon: Zap },
                { label: 'About a month \u2014 realistic', icon: Target },
                { label: '3 months \u2014 I want lasting change', icon: Star }
              ].map((opt) => (
                <QuizOption
                  key={opt.label}
                  label={opt.label}
                  icon={opt.icon}
                  active={quizData.urgency === opt.label}
                  onClick={() => {
                    updateQuizData('urgency', opt.label);
                    trackEvent('quiz_interaction', { category: 'urgency', value: opt.label });
                    handleNext('desiredResult');
                  }}
                />
              ))}
            </QuizStepContainer>
          )}

          {step === 'desiredResult' && (
            <QuizStepContainer key="desiredResult" title="Finally, what is your primary fitness goal?" onBack={handleBack} currentStep={7} totalSteps={10}>
              {[
                { label: 'Lose weight & burn fat', icon: Star, goal: 'weight_loss' },
                { label: 'Increase flexibility & posture', icon: Waves, goal: 'flexibility' },
                { label: 'Boost energy & confidence', icon: Zap, goal: 'energy' },
                { label: 'Fit into my old clothes again', icon: Target, goal: 'weight_loss' }
              ].map((opt) => (
                <QuizOption
                  key={opt.label}
                  label={opt.label}
                  icon={opt.icon}
                  active={quizData.desiredResult === opt.label}
                  onClick={() => {
                    updateQuizData('desiredResult', opt.label);
                    trackEvent('quiz_interaction', { category: 'desiredResult', value: opt.label });
                    trackMetaIntent(opt.goal);
                    handleNext('currentWeight');
                  }}
                />
              ))}
            </QuizStepContainer>
          )}

          {step === 'currentWeight' && (
            <QuizStepContainer key="currentWeight" title="What is your current weight?" onBack={handleBack} currentStep={8} totalSteps={10}>
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-border/30 focus-within:border-brand-sage/30 transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-sage/5 rounded-xl flex items-center justify-center text-brand-sage">
                    <Scale size={18} />
                  </div>
                  <span className="text-sm font-medium text-brand-muted">Weight in kg</span>
                </div>
                <input
                  type="number" inputMode="decimal" placeholder="e.g. 75" min={20} max={500}
                  className="w-full bg-transparent border-none text-2xl md:text-3xl font-serif p-2 focus:ring-0 placeholder:text-brand-muted/20 text-brand-ink"
                  value={quizData.currentWeight} onChange={(e) => updateQuizData('currentWeight', e.target.value)} autoFocus
                />
                <div className="h-px bg-brand-border/20 mt-1 mb-6" />
                <button
                  disabled={!quizData.currentWeight}
                  onClick={() => handleNext('height')}
                  className="w-full bg-brand-sage text-white p-3.5 rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-[#243D31] transition-all flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </QuizStepContainer>
          )}

          {step === 'height' && (
            <QuizStepContainer key="height" title="What is your height?" onBack={handleBack} currentStep={9} totalSteps={10}>
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-border/30 focus-within:border-brand-sage/30 transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-sage/5 rounded-xl flex items-center justify-center text-brand-sage">
                    <Ruler size={18} />
                  </div>
                  <span className="text-sm font-medium text-brand-muted">Height in cm</span>
                </div>
                <input
                  type="number" inputMode="decimal" placeholder="e.g. 165" min={50} max={250}
                  className="w-full bg-transparent border-none text-2xl md:text-3xl font-serif p-2 focus:ring-0 placeholder:text-brand-muted/20 text-brand-ink"
                  value={quizData.height} onChange={(e) => updateQuizData('height', e.target.value)} autoFocus
                />
                <div className="h-px bg-brand-border/20 mt-1 mb-6" />
                <button
                  disabled={!quizData.height}
                  onClick={() => handleNext('targetWeight')}
                  className="w-full bg-brand-sage text-white p-3.5 rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-[#243D31] transition-all flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </QuizStepContainer>
          )}

          {step === 'targetWeight' && (
            <QuizStepContainer key="targetWeight" title="What is your target weight?" onBack={handleBack} currentStep={10} totalSteps={10}>
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-border/30 focus-within:border-brand-sage/30 transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-sage/5 rounded-xl flex items-center justify-center text-brand-sage">
                    <Target size={18} />
                  </div>
                  <span className="text-sm font-medium text-brand-muted">Target weight in kg</span>
                </div>
                <input
                  type="number" inputMode="decimal" placeholder="e.g. 65" min={20} max={500}
                  className="w-full bg-transparent border-none text-2xl md:text-3xl font-serif p-2 focus:ring-0 placeholder:text-brand-muted/20 text-brand-ink"
                  value={quizData.targetWeight} onChange={(e) => updateQuizData('targetWeight', e.target.value)} autoFocus
                />
                <div className="h-px bg-brand-border/20 mt-1 mb-6" />
                <button
                  disabled={!quizData.targetWeight}
                  onClick={() => handleNext('email')}
                  className="w-full bg-brand-sage text-white p-3.5 rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-[#243D31] transition-all flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </QuizStepContainer>
          )}

          {step === 'email' && (
            <motion.div key="email" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto px-6 md:px-8 py-12 md:py-20 text-center">
              <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={28} className="text-brand-sage" />
              </div>
              <h2 className="text-2xl md:text-4xl font-serif mb-3 text-brand-ink leading-tight">Your Blueprint Is Ready</h2>
              <p className="text-sm md:text-base text-brand-muted mb-8 leading-relaxed px-2">
                Where should we send your personalized plan?
              </p>
              <form
                className="space-y-4 text-left"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = quizData.name.trim();
                  const email = quizData.email.trim();
                  if (name.length < 2) return;
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
                  trackConversion('quiz_completion', { goal: quizData.desiredResult, lifestyle: quizData.identity });
                  handleNext('analyzing');
                }}
              >
                <div>
                  <label htmlFor="quiz-name" className="block text-[9px] font-bold uppercase tracking-widest text-brand-muted mb-1.5">Your Name</label>
                  <input
                    id="quiz-name"
                    type="text" required minLength={2} placeholder="Enter your name"
                    className="w-full p-3.5 rounded-xl border border-brand-border/30 focus:border-brand-sage outline-none bg-white transition-all text-sm"
                    value={quizData.name} onChange={(e) => updateQuizData('name', e.target.value)}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="quiz-email" className="block text-[9px] font-bold uppercase tracking-widest text-brand-muted mb-1.5">Email Address</label>
                  <input
                    id="quiz-email"
                    type="email" required placeholder="name@example.com"
                    className="w-full p-3.5 rounded-xl border border-brand-border/30 focus:border-brand-sage outline-none bg-white transition-all text-sm"
                    value={quizData.email} onChange={(e) => updateQuizData('email', e.target.value)}
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!quizData.name.trim() || !quizData.email.trim()}
                  className="w-full bg-brand-sage text-white p-3.5 rounded-xl font-semibold text-sm hover:bg-[#243D31] transition-all flex items-center justify-center gap-2 border-b-2 border-white/10 disabled:opacity-40"
                >
                  Send My Blueprint <ArrowRight size={16} />
                </button>
              </form>
              <p className="mt-5 text-[9px] text-brand-muted/50 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <Lock size={10} /> Your information is safe
              </p>
            </motion.div>
          )}

          {step === 'analyzing' && <AnalyzingStep name={quizData.name} onComplete={() => handleNext('result')} />}
          {step === 'result' && analysis && (
            <Suspense fallback={<LoadingSpinner text="Loading your results..." />}>
              <ResultsStep quizData={quizData} analysis={analysis} />
            </Suspense>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {chatOpen && (
          <Suspense fallback={null}>
            <ChatWindow
              isOpen={chatOpen}
              onClose={() => setChatOpen(false)}
              userContext={{
                name: quizData.name || undefined,
                archetype: quizData.identity ? quizData.identity : undefined,
                goal: analysis?.goal || undefined
              }}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setChatOpen(!chatOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all ${
          chatOpen
            ? 'bg-brand-ink scale-90'
            : 'bg-brand-sage hover:bg-brand-sage/90 hover:-translate-y-1'
        }`}
        whileHover={{ scale: chatOpen ? 0.95 : 1.05 }}
        whileTap={{ scale: 0.9 }}
        aria-expanded={chatOpen}
        aria-label={chatOpen ? 'Close AI coach chat' : 'Open AI coach chat'}
      >
        {chatOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="relative">
            <MessageCircle size={24} className="text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-gold rounded-full border-2 border-white" />
          </div>
        )}
      </motion.button>
    </div>
  );
}

function CentralSchemas() {
  const location = useLocation();
  const siteUrl = 'https://www.fitfeky.com';
  const path = location.pathname;
  const schemas: Record<string, unknown>[] = [];

  schemas.push(websiteSchema());
  schemas.push(webApplicationSchema());
  schemas.push(organizationSchema());

  if (path === '/') {
    schemas.push(faqSchema([
      { question: 'What is the best yoga program for beginner women?', answer: 'The best yoga program for beginner women is one that respects where you are today while gently guiding you toward where you want to be.' },
      { question: 'How can women lose belly fat at home without equipment?', answer: 'Losing belly fat at home without equipment requires a combination of core-focused HIIT, whole-body metabolic conditioning, and a hormone-balanced nutrition plan.' },
      { question: 'Is 15 minutes of yoga daily enough to see results?', answer: 'Yes, absolutely! Consistency is far more important than duration.' },
    ]));
  }

  if (path !== '/') {
    schemas.push(breadcrumbSchemaFn([
      { name: 'Home', url: siteUrl },
      { name: path.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), url: `${siteUrl}${path}` },
    ]));
  }

  return (
    <Helmet>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}

function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-warm flex flex-col items-center justify-center px-6 text-center">
      <SEOHelmet title="Page Not Found | FitFeky" description="The page you are looking for does not exist." canonicalPath="/404" noIndex />
      <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mb-6">
        <span className="text-2xl font-bold text-brand-sage">?</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-serif text-brand-ink mb-4">Page Not Found</h1>
      <p className="text-brand-muted mb-8 max-w-md">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-sage/90 transition-all">
        <ArrowRight size={16} className="rotate-180" /> Back to Home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <CentralSchemas />
      <Navbar />
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-brand-warm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A373]" />
        </div>
      }>
        {/*
          The application uses React Router for client-side pages.
          The blog list is available at /blog and each article is displayed at /blog/:slug.
          The slug is read by the BlogArticle page using useParams().
        */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/tdee-calculator" element={<TDEECalculator />} />
          <Route path="/calculators/bmr-calculator" element={<BMRCalculator />} />
          <Route path="/calculators/calorie-deficit-calculator" element={<CalorieDeficitCalculator />} />
          <Route path="/calculators/macro-calculator" element={<MacroCalculator />} />
          <Route path="/calculators/ideal-weight-calculator" element={<IdealWeightCalculator />} />
          <Route path="/calculators/body-fat-calculator" element={<BodyFatCalculator />} />
          <Route path="/calculators/water-intake-calculator" element={<WaterIntakeCalculator />} />
          <Route path="/calculators/protein-calculator" element={<ProteinCalculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
