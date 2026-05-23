/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, ReactNode, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { trackEvent, trackStepView, trackConversion, trackMetaIntent, trackMetaCommitment } from '@/lib/analytics';
import { getRecommendedProducts, getMatchReasons, getArchetype } from './lib/products';
import { analyzeQuizEnhanced } from './lib/quizAnalysis';
import type { EnhancedAnalysis, ProductMatch } from '@/lib/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Star,
  Menu,
  X,
  Dumbbell,
  Waves,
  Zap,
  Target,
  Lock,
  ChevronDown,
  Instagram,
  Clock,
  Scale,
  Ruler,
  ArrowUp,
  MessageCircle,
  Sparkles,
  Heart,
  ShieldCheck
} from 'lucide-react';

const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const Shop = lazy(() => import('./pages/Shop'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const AffiliateDisclosure = lazy(() => import('./pages/AffiliateDisclosure'));
const TDEECalculator = lazy(() => import('./pages/TDEECalculator'));
const ResultsStep = lazy(() => import('@/components/quiz/ResultsStep'));
const ChatWindow = lazy(() => import('@/components/chatbot/ChatWindow'));

// --- Shared Components ---

const PinterestIcon = ({ size = 22, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.99 3.99-.281 1.192.597 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.86-2.063-4.852-5.008-4.852-3.41 0-5.409 2.562-5.409 5.2 0 1.03.394 2.143.889 2.741.099.12.112.224.085.345l-.352 1.467c-.035.147-.11.177-.268.107-1.003-.502-1.63-2.078-1.63-3.341 0-3.768 2.74-7.229 7.896-7.229 4.15 0 7.548 2.954 7.548 6.923 0 4.27-2.686 7.704-6.411 7.704-1.252 0-2.429-.325-3.439-.855l-.937.503c-.356.19-.679.627-.955 1.29-.131.349-.684 2.811-.854 3.54-.063.333-.291.335-.608.148l-4.561-3.368c-.338-.251-.337-.651-.01-.886l1.378-1.036c.338-.252.337-.652.01-.886L5.768 15.112c-.338-.251-.337-.651-.01-.886l4.561 3.368z"/>
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = "relative text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-brand-sage after:transition-all hover:after:w-full";
  
  return (
    <nav className={`fixed top-0 w-full z-100 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 md:py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setIsMenuOpen(false)}>
          <div className="w-8 h-8 md:w-9 md:h-9 bg-brand-sage rounded-full flex items-center justify-center text-white shadow-sm group-hover:shadow-md group-hover:shadow-brand-sage/20 transition-all">
            <span className="font-bold text-lg tracking-tight">F</span>
          </div>
          <div className="text-xl md:text-2xl font-serif font-black tracking-tight text-brand-ink">
            FitFeky
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to={isLanding ? "/#method" : "/"} className={navLinkClasses}>Method</Link>
          <Link to={isLanding ? "/#testimonials" : "/"} className={navLinkClasses}>Stories</Link>
          <Link to={isLanding ? "/#faq" : "/"} className={navLinkClasses}>FAQ</Link>
          <Link to="/shop" className={navLinkClasses}>Shop</Link>
          <Link to="/about" className={navLinkClasses}>About</Link>
          <Link to="/blog" className={navLinkClasses}>Blog</Link>
          <Link
            to="/"
            className="bg-brand-sage text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] hover:-translate-y-0.5 transition-all shadow-md shadow-brand-sage/20"
          >
            Take the Quiz
          </Link>
        </div>

        <button
          className="md:hidden text-brand-ink p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-brand-border/20 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              <Link to={isLanding ? "/#method" : "/"} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Method</Link>
              <Link to={isLanding ? "/#testimonials" : "/"} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Stories</Link>
              <Link to={isLanding ? "/#faq" : "/"} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">FAQ</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Shop</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">About</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Blog</Link>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="mt-2 bg-brand-sage text-white text-center px-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#243D31] transition-all">Take the Quiz</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-brand-warm border-t border-brand-border/20 py-16 md:py-20 px-6 md:px-12 text-brand-muted text-sm">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12 md:mb-14">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-brand-sage rounded-full flex items-center justify-center text-white shadow-sm group-hover:shadow-md group-hover:shadow-brand-sage/20 transition-all">
              <span className="font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-serif font-black tracking-tight text-brand-ink">
              FitFeky
            </span>
          </div>
          <p className="text-sm leading-relaxed text-brand-muted/80 max-w-xs">
            Your personalized wellness companion. Science-backed fitness and nutrition designed for real women&apos;s lives.
          </p>
          <div className="flex items-center gap-4 text-brand-muted/60 mt-1">
            <a href="https://www.instagram.com/fitfeky2025/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-brand-sage hover:-translate-y-0.5 transition-all"><Instagram size={18} /></a>
            <a href="https://pin.it/4WXisJo3W" target="_blank" rel="noopener noreferrer" className="hover:text-brand-sage hover:-translate-y-0.5 transition-all"><PinterestIcon size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-sage mb-5">Quick Links</h4>
          <div className="flex flex-col gap-3">
            <Link to="/shop" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Shop</Link>
            <Link to="/about" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">About Us</Link>
            <Link to="/privacy" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Terms</Link>
            <Link to="/contact" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Contact</Link>
            <Link to="/blog" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Blog</Link>
            <Link to="/calculators/tdee-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">TDEE Calculator</Link>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-sage mb-5">Stay Connected</h4>
          <p className="text-sm text-brand-muted/80 mb-4 leading-relaxed">
            Get weekly wellness tips and exclusive offers delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 min-w-0 px-4 py-2.5 bg-white border border-brand-border/40 rounded-xl text-sm text-brand-ink placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-sage/20 transition-all"
            />
            <button className="px-4 py-2.5 bg-brand-sage text-white text-sm font-semibold rounded-xl hover:bg-[#243D31] transition-all whitespace-nowrap shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-brand-border/20">
        <p className="text-[10px] md:text-[11px] text-brand-muted/50 leading-relaxed max-w-2xl">
          The content provided on FitFeky is for informational purposes only. Consult with a healthcare professional before starting any new fitness or diet program.
        </p>
        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/40 whitespace-nowrap">&copy; {new Date().getFullYear()} FitFeky</span>
      </div>
    </div>
  </footer>
);

// --- Quiz Types ---
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

// --- Quiz Components ---

const AnalyzingStep = ({ name, onComplete }: { name: string, onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analyzing your responses...");
  
  const messages = [
    "Calculating your metabolic profile...",
    "Analyzing stress & recovery markers...",
    "Matching your profile to 200+ proven programs...",
    "Optimizing for your schedule...",
    "Finalizing your 30-day transformation plan..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        const increment = Math.random() * 12;
        const next = Math.min(prev + increment, 100);
        
        const msgIndex = Math.floor((next / 100) * messages.length);
        if (messages[msgIndex]) setStatus(messages[msgIndex]);
        
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      key="analyzing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-6 md:px-8 min-h-[75vh] md:min-h-[80vh] flex flex-col justify-center items-center py-12 md:py-20 text-center"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-sage/10 rounded-full flex items-center justify-center mb-8 md:mb-10 relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-transparent border-t-brand-sand rounded-full"
        />
        <Target size={32} className="text-brand-sage animate-pulse md:w-10 md:h-10" />
      </div>

      <h2 className="text-2xl md:text-5xl font-serif text-brand-ink mb-4 md:mb-6 px-4 leading-tight">Creating Your Personal Blueprint</h2>
      <p className="text-brand-muted italic mb-10 md:mb-12 text-sm md:text-lg px-6">We are tailoring a unique plan for {name || 'you'}...</p>

      <div className="w-full max-w-xs sm:max-w-sm space-y-4 px-4">
        <div className="h-1.5 md:h-2 bg-brand-sage/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-brand-sand to-brand-sage rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-sage">{status}</p>
          <p className="text-[10px] font-mono font-bold text-brand-muted">{Math.round(progress)}%</p>
        </div>
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-lg px-4">
        {[
          { icon: Sparkles, label: "Metabolic", color: "text-brand-sand" },
          { icon: Heart, label: "Recovery", color: "text-brand-sage" },
          { icon: Star, label: "Efficiency", color: "text-brand-sand" },
          { icon: Target, label: "Strength", color: "text-brand-sage" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.2 }}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/60 border border-brand-border/30"
          >
            <item.icon size={16} className={item.color} />
            <span className="text-[8px] font-bold uppercase tracking-widest text-brand-muted">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-brand-sage/10 z-50">
    <motion.div 
      className="h-full bg-gradient-to-r from-brand-sand via-brand-sage to-brand-sage"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>
);

const QuizStepContainer = ({ title, children, onBack, currentStep, totalSteps }: { title: string, children: ReactNode, onBack?: () => void, currentStep?: number, totalSteps?: number, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className="max-w-xl mx-auto px-5 md:px-8 min-h-[60vh] md:min-h-[75vh] flex flex-col justify-center py-8 md:py-16 relative"
  >
    {onBack && (
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 md:top-6 md:left-8 flex items-center gap-1.5 text-brand-muted/60 hover:text-brand-sage transition-colors text-[10px] font-bold uppercase tracking-widest"
      >
        <ChevronRight size={12} className="rotate-180" /> Back
      </button>
    )}

    {currentStep && totalSteps && (
      <div className="absolute top-4 right-4 md:top-6 md:right-8 text-[9px] font-bold uppercase tracking-[0.15em] text-brand-sand/60">
        {currentStep} of {totalSteps}
      </div>
    )}

    <div className="text-center mb-8 md:mb-10">
      <h2 className="text-xl md:text-3xl font-serif text-brand-ink mb-2 md:mb-3 px-2 leading-tight">{title}</h2>
      <p className="text-sm text-brand-muted px-4">Choose the option that fits you best.</p>
    </div>
    <div className="space-y-2.5 md:space-y-3">
      {children}
    </div>
  </motion.div>
);

const QuizOption = ({ label, icon: Icon, onClick, active }: { label: string, icon: any, onClick: () => void, active: boolean, key?: string }) => (
  <motion.button 
    whileHover={{ scale: 1.005 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 md:gap-4 px-4 py-3.5 md:px-5 md:py-4 rounded-2xl border transition-all duration-300 text-left ${
      active 
      ? 'border-brand-sage bg-brand-sage/5 shadow-sm' 
      : 'border-brand-border/30 bg-white hover:border-brand-sand/30 hover:bg-brand-warm'
    }`}
  >
    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-brand-sage text-white' : 'bg-brand-blush/40 text-brand-muted'}`}>
      <Icon size={18} />
    </div>
    <span className={`text-sm md:text-base font-medium transition-colors leading-snug grow ${active ? 'text-brand-ink' : 'text-brand-muted'}`}>{label}</span>
    <div className={`shrink-0 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${active ? 'border-brand-sage bg-brand-sage' : 'border-brand-border/50'}`}>
      {active && <CheckCircle2 size={10} className="text-white" />}
    </div>
  </motion.button>
);

function LandingPage() {
  const [step, setStep] = useState<QuizStep>('welcome');
  const [quizData, setQuizData] = useState<QuizData>({
    identity: '',
    painPoint: '',
    desiredResult: '',
    timeAvailable: '',
    pastObstacle: '',
    commitment: '',
    urgency: '',
    currentWeight: '',
    height: '',
    targetWeight: '',
    email: '',
    name: ''
  });
  
  const [analysis, setAnalysis] = useState<EnhancedAnalysis | null>(null);
  const [productMatches, setProductMatches] = useState<ProductMatch[]>([]);
  const [stepHistory, setStepHistory] = useState<QuizStep[]>(['welcome']);

  const quizSteps: QuizStep[] = ['welcome', 'identity', 'painPoint', 'timeAvailable', 'pastObstacle', 'commitment', 'urgency', 'desiredResult', 'currentWeight', 'height', 'targetWeight', 'email', 'analyzing', 'result'];

  const calculateProgress = () => {
    const index = quizSteps.indexOf(step);
    return (index / (quizSteps.length - 1)) * 100;
  };

  const handleNext = (nextStep: QuizStep) => {
    if (nextStep === 'result') {
      const result = analyzeQuizEnhanced(quizData);
      const products = getRecommendedProducts(quizData);
      const reasons = getMatchReasons(quizData);
      const matches: ProductMatch[] = products.map((product, i) => ({
        product,
        matchScore: Math.round(100 - (i * 15) - Math.random() * 5),
        matchReasons: reasons[i] || []
      }));
      setAnalysis(result);
      setProductMatches(matches);
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

  const Hero = () => (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-warm">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80" 
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-warm/95 via-brand-warm/60 to-brand-warm/20" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-warm to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full border border-white/40">
              <Sparkles size={12} /> Free 60-Second Quiz
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.15] mb-5 text-brand-ink tracking-tight">
              Find Your Perfect Wellness Plan in{" "}
              <span className="text-brand-sage italic">60 Seconds</span>
            </h1>

            <p className="text-base md:text-lg text-brand-muted max-w-lg mb-8 leading-relaxed">
              Answer 10 quick questions and get a personalized yoga, weight loss, or strength plan built for your body.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {[
                { icon: Star, text: '50K+ Women', color: 'text-brand-gold' },
                { icon: Lock, text: '100% Free', color: 'text-brand-sage' },
                { icon: Zap, text: '60 Seconds', color: 'text-brand-gold' },
                { icon: Target, text: 'Results', color: 'text-brand-sage' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-muted/80">
                  <item.icon size={12} className={item.color} />
                  {item.text}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                trackEvent('quiz_start', { 'event_category': 'Quiz' });
                handleNext('identity');
              }}
              className="group inline-flex items-center gap-3 bg-brand-sage text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-brand-sage/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-sage/30"
            >
              FIND MY PERFECT PLAN — FREE
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2 mt-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                1,247 women started this quiz today
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const SocialProof = () => (
    <section className="bg-brand-warm py-10 md:py-14 border-y border-brand-border/20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <img 
                key={i} 
                src={`https://picsum.photos/seed/face${i}/64/64`} 
                className="w-11 h-11 md:w-12 md:h-12 rounded-full border-3 border-white object-cover shadow-sm" 
                alt=""
              />
            ))}
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border-3 border-white bg-brand-sage flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
              +50K
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 text-brand-gold">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <div className="h-8 w-px bg-brand-border/40" />
            <p className="text-sm md:text-base text-brand-muted">
              Join <span className="text-brand-sage font-semibold">50,000+ women</span> who transformed with FitFeky
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const FAQ = () => (
    <section id="faq" className="py-20 md:py-28 px-6 md:px-12 bg-brand-warm border-t border-brand-border/20 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
          FAQ
        </div>
        <h2 className="text-3xl md:text-5xl font-serif mb-10 md:mb-14 text-brand-ink text-center px-4 leading-tight">Your Questions, Answered</h2>
        <div className="space-y-4 w-full">
          {[
            {
              q: "What is the best yoga program for beginner women?",
              a: "For women who are just starting their fitness journey, the best yoga program for beginner women focuses on gentle foundational flows, breathing techniques, and flexibility build-up over 30 days."
            },
            {
              q: "How can women lose belly fat at home without equipment?",
              a: "Losing belly fat at home without equipment requires a combination of core-focused high-intensity interval training (HIIT), whole-body metabolic conditioning, and a hormone-balanced nutrition plan."
            },
            {
              q: "Is 15 minutes of yoga daily enough to see results?",
              a: "Yes, absolutely! Consistency is far more important than duration. Practicing just 15 minutes of yoga daily is enough to see significant improvements in your flexibility, core strength, and mental clarity."
            },
            {
              q: "What fitness program works best for busy moms?",
              a: "The fitness program that works best for busy moms is one that offers maximum flexibility, requires zero commute time, and delivers efficient, full-body results in under 20 minutes daily."
            },
            {
              q: "How does the FitFeky quiz work?",
              a: "The FitFeky quiz is a rapid, 60-second assessment designed to pinpoint your unique physical needs, lifestyle constraints, and personal wellness goals. By answering exactly 10 targeted questions, you receive a personalized action plan."
            }
          ].map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-brand-border/30 hover:border-brand-sand/30 transition-all duration-300 overflow-hidden" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                <h3 className="text-sm md:text-base font-medium text-brand-ink group-open:text-brand-sage transition-colors pr-4 text-left leading-snug">
                  {faq.q}
                </h3>
                <ChevronDown size={16} className="text-brand-muted shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5">
                <div className="h-px bg-brand-border/20 -mx-6 mb-4" />
                <p className="text-sm text-brand-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-brand-warm font-sans text-brand-ink selection:bg-brand-sage/20">
      
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

      {step === 'welcome' && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="md:hidden fixed bottom-6 left-6 right-6 z-40"
        >
          <button 
            onClick={() => handleNext('identity')}
            className="w-full bg-brand-sage text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-brand-sage/30 flex items-center justify-center gap-2 border-b-2 border-white/10 active:scale-95 transition-transform"
          >
            Discover Your Blueprint <ArrowRight size={16} />
          </button>
        </motion.div>
      )}

      <main id="main-content" className="relative">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero />
              <SocialProof />
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
                    setQuizData({...quizData, identity: opt.label});
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
                    setQuizData({...quizData, painPoint: opt.label});
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
                { label: '10–15 minutes (very busy)', icon: Zap },
                { label: '20–30 minutes (manageable)', icon: Target },
                { label: '45–60 minutes (fully committed)', icon: CheckCircle2 }
              ].map((opt) => (
                <QuizOption 
                  key={opt.label}
                  label={opt.label} 
                  icon={opt.icon} 
                  active={quizData.timeAvailable === opt.label}
                  onClick={() => {
                    setQuizData({...quizData, timeAvailable: opt.label});
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
                    setQuizData({...quizData, pastObstacle: opt.label});
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
                { label: 'Want to try — no big commitment yet', icon: Waves },
                { label: 'Ready to start — just need the right plan', icon: Target },
                { label: '100% committed — ready to invest in myself', icon: Star }
              ].map((opt) => (
                <QuizOption 
                  key={opt.label}
                  label={opt.label} 
                  icon={opt.icon} 
                  active={quizData.commitment === opt.label}
                  onClick={() => {
                    setQuizData({...quizData, commitment: opt.label});
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
                { label: 'ASAP — within 2 weeks', icon: Zap },
                { label: 'About a month — realistic', icon: Target },
                { label: '3 months — I want lasting change', icon: Star }
              ].map((opt) => (
                <QuizOption 
                  key={opt.label}
                  label={opt.label} 
                  icon={opt.icon} 
                  active={quizData.urgency === opt.label}
                  onClick={() => {
                    setQuizData({...quizData, urgency: opt.label});
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
                    setQuizData({...quizData, desiredResult: opt.label});
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
                  value={quizData.currentWeight} onChange={(e) => setQuizData({...quizData, currentWeight: e.target.value})} autoFocus
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
                  value={quizData.height} onChange={(e) => setQuizData({...quizData, height: e.target.value})} autoFocus
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
                  value={quizData.targetWeight} onChange={(e) => setQuizData({...quizData, targetWeight: e.target.value})} autoFocus
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
                    value={quizData.name} onChange={(e) => setQuizData({...quizData, name: e.target.value})}
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="quiz-email" className="block text-[9px] font-bold uppercase tracking-widest text-brand-muted mb-1.5">Email Address</label>
                  <input 
                    id="quiz-email"
                    type="email" required placeholder="name@example.com"
                    className="w-full p-3.5 rounded-xl border border-brand-border/30 focus:border-brand-sage outline-none bg-white transition-all text-sm"
                    value={quizData.email} onChange={(e) => setQuizData({...quizData, email: e.target.value})}
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
              <ResultsStep quizData={quizData} analysis={analysis} productMatches={productMatches} />
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
                archetype: quizData.identity ? getArchetype(quizData) : undefined,
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

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/calculators/tdee-calculator" element={<TDEECalculator />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
