/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { trackEvent, trackStepView, trackConversion, trackMetaIntent, trackMetaCommitment, trackMetaProductClick } from '@/src/lib/analytics';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import { getRecommendedProducts, Product, analyzeAnswers, Goal, AnalysisResult } from './lib/products';
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
  Facebook,
  Twitter,
  Mail,
  ArrowRightCircle,
  Play,
  Clock,
  Scale,
  Ruler,
  ArrowUp
} from 'lucide-react';

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
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  
  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-100 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-3.5 md:py-4 flex justify-between items-center text-[#5A6359]">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
          <div className="w-8 h-8 md:w-9 md:h-9 bg-brand-sage rounded-full flex items-center justify-center text-white shadow-sm">
            <span className="font-bold text-lg italic">F</span>
          </div>
          <div className="text-xl md:text-2xl font-serif font-black tracking-tight text-brand-ink">
            FitFeky
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-brand-muted">
          <Link to={isLanding ? "/#method" : "/"} className="hover:text-brand-sage transition-colors">Method</Link>
          <Link to={isLanding ? "/#testimonials" : "/"} className="hover:text-brand-sage transition-colors">Success Stories</Link>
          <Link to={isLanding ? "/#faq" : "/"} className="hover:text-brand-sage transition-colors">FAQ</Link>
          <Link to="/shop" className="hover:text-brand-sage transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-brand-sage transition-colors">About Us</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-brand-ink p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-brand-border overflow-hidden shadow-lg"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <Link to={isLanding ? "/#method" : "/"} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Method</Link>
              <Link to={isLanding ? "/#testimonials" : "/"} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Success Stories</Link>
              <Link to={isLanding ? "/#faq" : "/"} onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">FAQ</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Shop</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">About Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-brand-bone border-t border-brand-border py-12 md:py-20 px-4 md:px-12 text-brand-muted text-sm font-medium">
    <div className="flex flex-col items-center gap-10 md:gap-12 max-w-5xl mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-sage rounded-full flex items-center justify-center text-white shadow-sm">
            <span className="font-bold text-lg italic">F</span>
          </div>
          <div className="text-xl font-serif font-black tracking-tight text-brand-ink">
            FitFeky
          </div>
        </div>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-muted opacity-60">Empowering Women Daily</p>
      </div>

      <div className="flex justify-center items-center gap-8 md:gap-10 text-brand-sage/70">
        <a href="https://www.instagram.com/fitfeky2025/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-brand-sage hover:-translate-y-1 transition-all"><Instagram size={22} className="md:w-6 md:h-6" /></a>
        <a href="https://pin.it/4WXisJo3W" target="_blank" rel="noopener noreferrer" className="hover:text-brand-sage hover:-translate-y-1 transition-all"><PinterestIcon size={22} className="md:w-6 md:h-6" /></a>
      </div>
      
      <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-10 gap-y-3 text-[10px] md:text-xs font-bold uppercase tracking-widest">
        <Link to="/shop" className="hover:text-brand-sage transition-all">Shop</Link>
        <Link to="/about" className="hover:text-brand-sage transition-all">About Us</Link>
        <Link to="/privacy" className="hover:text-brand-sage transition-all">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-brand-sage transition-all">Terms of Service</Link>
        <Link to="/contact" className="hover:text-brand-sage transition-all">Contact Us</Link>
      </div>

      <div className="text-center text-[9px] md:text-[11px] text-brand-muted/60 flex flex-col gap-4 font-normal max-w-3xl px-4 leading-relaxed">
        <p>
          The content provided on FitFeky is for informational purposes only. Consult with a healthcare professional before starting any new fitness or diet program. Individual results may vary based on effort, body composition, and adherence.
        </p>
        <p>
          This site is not a part of the Facebook or Instagram websites or Meta Inc. Additionally, This site is NOT endorsed by Facebook or Instagram in any way. FACEBOOK and INSTAGRAM are trademarks of Meta, Inc.
        </p>
      </div>

      <div className="pt-8 border-t border-brand-border/30 w-full flex flex-col items-center gap-4">
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-40">&copy; {new Date().getFullYear()} FitFeky. All rights reserved.</span>
      </div>
    </div>
  </footer>
);

// --- Quiz Types ---
type QuizStep = 'welcome' | 'identity' | 'painPoint' | 'desiredResult' | 'timeAvailable' | 'pastObstacle' | 'commitment' | 'urgency' | 'currentWeight' | 'height' | 'targetWeight' | 'email' | 'analyzing' | 'result';

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
    "Matching goals to 147 proven programs...",
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
      className="max-w-3xl mx-auto px-4 md:px-6 min-h-[75vh] md:min-h-[80vh] flex flex-col justify-center items-center py-12 md:py-20 text-center"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-sage/10 rounded-full flex items-center justify-center mb-8 md:mb-10 relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-transparent border-t-brand-sage rounded-full"
        />
        <Target size={32} className="text-brand-sage animate-pulse md:w-10 md:h-10" />
      </div>

      <h2 className="text-2xl md:text-5xl font-serif text-brand-ink mb-4 md:mb-6 px-4 leading-tight">Expert Analysis in Progress</h2>
      <p className="text-brand-muted italic mb-10 md:mb-12 text-sm md:text-lg px-6">We're tailoring a unique fitness blueprint for {name || 'you'}...</p>

      <div className="w-full max-w-70 sm:max-w-md space-y-4 px-4">
        <div className="h-3 md:h-4 bg-brand-sage/10 rounded-full overflow-hidden border border-brand-border p-0.5 shadow-inner">
          <motion.div 
            className="h-full bg-brand-sage rounded-full shadow-[0_0_15px_rgba(110,140,110,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sage animate-pulse truncate max-w-[70%] text-left">
            {status}
          </p>
          <p className="text-[10px] md:text-xs font-mono font-bold text-brand-muted shrink-0">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl opacity-60 px-4">
        {[
          { icon: Zap, label: "Metabolic", color: "text-brand-gold" },
          { icon: Waves, label: "Recovery", color: "text-brand-sage" },
          { icon: Star, label: "Efficiency", color: "text-brand-gold" },
          { icon: Dumbbell, label: "Strength", color: "text-brand-sage" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.2 }}
            className="flex flex-col items-center gap-2 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white border border-brand-border shadow-sm"
          >
            <item.icon size={18} className={`${item.color} md:w-4.5 md:h-4.5`} />
            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ResultsStep = ({ quizData, analysis, recommendations }: { quizData: QuizData, analysis: AnalysisResult, recommendations: Product[] }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 - 1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const goal = analysis.goal;
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent('view_results', {
      'event_category': 'Results',
      'goal': goal
    });
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [goal]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPersonalizedSummary = () => {
    const identity = quizData.identity.toLowerCase();
    
    let type = "comprehensive transformation";
    if (goal === 'weight_loss') type = "targeted fat loss";
    if (goal === 'flexibility') type = "flexibility and posture";
    if (goal === 'energy') type = "metabolic energy boost";

    return (
      <div className="bg-brand-sage/5 border border-brand-sage/20 rounded-3xl md:rounded-[3.5rem] p-5 md:p-12 mb-10 md:mb-16 text-left relative overflow-hidden shadow-sm mx-1">
        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 md:opacity-10 pointer-events-none">
          <Target size={60} className="md:w-30 md:h-30" />
        </div>
        <h3 className="text-xl md:text-3xl font-serif text-brand-ink mb-6 md:mb-8 pr-12 md:pr-0">Your Personalized Analysis</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-10">
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-brand-border shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <Scale size={16} className="text-brand-sage md:w-5 md:h-5" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted">Current BMI</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-brand-ink">{analysis.bmi.toFixed(1)}</span>
              <span className={`text-[8px] md:text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                analysis.bmiCategory === 'normal' ? 'bg-green-100 text-green-700' : 'bg-brand-gold/20 text-brand-gold'
              }`}>
                {analysis.bmiCategory}
              </span>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-brand-border shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <Target size={16} className="text-brand-gold md:w-5 md:h-5" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted">Target Goal</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-brand-ink">{quizData.targetWeight}</span>
              <span className="text-[10px] md:text-xs font-bold text-brand-muted">KG</span>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-brand-border shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={16} className="text-brand-sage md:w-5 md:h-5" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted">Difference</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-black text-brand-ink">
                {analysis.weightToLose > 0 ? `-${analysis.weightToLose.toFixed(1)}` : `+${Math.abs(analysis.weightToLose).toFixed(1)}`}
              </span>
              <span className="text-[10px] md:text-xs font-bold text-brand-muted">KG</span>
            </div>
          </div>
        </div>

        <p className="text-base md:text-lg text-brand-muted leading-relaxed font-serif italic mb-6 md:mb-8 px-1">
          "Hello {quizData.name || 'there'}, based on your profile as a <span className="text-brand-sage font-bold not-italic">{identity || 'fitness seeker'}</span> struggling with <span className="text-brand-sage font-bold not-italic">{quizData.painPoint || 'your health goals'}</span>, we have identified that you need a <span className="text-brand-sage font-bold not-italic">{type}</span> plan."
        </p>

        <div className="bg-brand-sage/10 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-brand-sage/20 mb-6 md:mb-8">
          <p className="text-sm md:text-base text-brand-ink font-medium leading-relaxed">
            <span className="font-bold text-brand-sage uppercase text-[10px] md:text-xs tracking-widest block mb-2">Recommendation:</span>
            {analysis.personalizedMessage}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="bg-white/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-brand-border flex items-center gap-3">
            <Clock size={14} className="text-brand-sage md:w-4 md:h-4" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted">Commitment: {quizData.timeAvailable || 'Flexible'}</span>
          </div>
          <div className="bg-white/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-brand-border flex items-center gap-3">
            <Star size={14} className="text-brand-gold md:w-4 md:h-4" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted">Focus: {quizData.desiredResult}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20"
      ref={resultsRef}
    >
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-6xl font-serif mb-4 md:mb-6 text-brand-ink leading-tight">Your Personalized Plan is Ready</h2>
        
        <div className="bg-brand-gold/10 text-brand-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[10px] md:text-sm mb-6 md:mb-8">
          <Clock size={16} className="md:w-5 md:h-5" /> LIMITED TIME OFFER EXPIRES IN: {formatTime(timeLeft)}
        </div>
      </div>

      {getPersonalizedSummary()}

      <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto px-2">
        <h3 className="text-xl md:text-4xl font-serif text-brand-ink mb-4 md:mb-6 leading-tight">Stop Guessing. Start Transforming.</h3>
        <p className="text-sm md:text-lg text-brand-muted leading-relaxed mb-6 md:mb-8">
          We know that {quizData.painPoint.toLowerCase() || "reaching your fitness goals"} has been a challenge in the past. 
          But your body data tells a different story—one of incredible potential. 
          The protocols below were specifically matched to your metabolic profile and lifestyle constraints. 
          This isn't just another program; it's the solution you've been searching for.
        </p>
        <div className="w-16 md:w-20 h-1 bg-brand-sage/30 mx-auto rounded-full" />
      </div>

      <div className="text-center mb-8 md:mb-12 px-4">
        <h3 className="text-lg md:text-2xl font-serif text-brand-ink mb-2">Recommended Protocols</h3>
        <p className="text-xs md:text-brand-muted italic">The following programs have been matched to your unique metabolic profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20 px-2">
        {recommendations.length > 0 ? recommendations.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-3xl md:rounded-[2.5rem] border overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative p-6 md:p-10 ${
              index === 0 ? 'border-brand-sage ring-2 ring-brand-sage/10 md:scale-105 z-10' : 'border-brand-border'
            }`}
          >
            {index === 0 && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-sage text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg z-20">
                Best Match
              </div>
            )}
            
            <div className="flex flex-col grow">
              <div className="mb-6">
                <div className="inline-block bg-brand-sage/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-sage mb-4">
                  {product.category}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-brand-ink leading-tight mb-4">{product.title}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-black text-brand-sage leading-none">${product.price}</span>
                  <span className="text-sm text-brand-muted line-through font-medium opacity-60">${product.oldPrice}</span>
                </div>
              </div>
              
              <div className="mb-8 p-5 bg-brand-bone/50 rounded-2xl border border-brand-border/50">
                <p className="text-[10px] font-bold text-brand-sage uppercase tracking-[0.2em] mb-2">Primary Benefit</p>
                <p className="text-sm md:text-base text-brand-ink italic font-serif leading-relaxed">"{product.benefit}"</p>
              </div>

              <div className="space-y-4 mb-10 grow">
                {product.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-medium text-brand-ink/70">
                    <div className="w-5 h-5 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage shrink-0">
                      <CheckCircle2 size={12} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <a 
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full group p-5 rounded-full font-bold text-sm md:text-base shadow-lg transition-all flex justify-center items-center gap-2 border-b-4 border-black/10 active:border-b-0 active:translate-y-1 ${
                  index === 0 
                  ? 'bg-brand-sage text-white shadow-brand-sage/20 hover:bg-brand-sage/90' 
                  : 'bg-brand-tan/20 text-brand-ink hover:bg-brand-tan/40 shadow-brand-tan/10'
                }`}
                onClick={() => {
                  trackMetaProductClick(product.title, product.category);
                }}
              >
                START NOW <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full text-center py-20 bg-brand-sage/5 rounded-[3rem] border border-brand-border">
            <p className="text-brand-muted italic">No specific recommendations found. Please try the quiz again.</p>
          </div>
        )}
      </div>

      <div className="bg-brand-tan/30 rounded-[3rem] p-10 md:p-20 border border-brand-border text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10">
          <div className="w-20 h-20 bg-brand-sage text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Star size={40} />
          </div>
          <h3 className="text-3xl md:text-5xl font-serif text-brand-ink mb-8">Our Iron-Clad Satisfaction Guarantee</h3>
          <p className="text-brand-muted max-w-3xl mx-auto mb-12 text-lg md:text-xl leading-relaxed italic font-serif">
            "We are so confident in these recommended protocols that we offer a 60-day, no-questions-asked refund policy. If you don't see results, you don't pay. It's that simple."
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest"><Lock size={16} className="text-brand-sage" /> Secure SSL Encryption</div>
            <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest"><CheckCircle2 size={16} className="text-brand-sage" /> Trusted by 50K+ Women</div>
            <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest"><Zap size={16} className="text-brand-gold" /> Instant Access</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-60 bg-brand-sage text-white p-4 rounded-full shadow-2xl hover:bg-brand-sage/90 transition-all flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 w-full h-1.5 bg-brand-sage/10 z-50">
    <motion.div 
      className="h-full bg-brand-sage progress-glow"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>
);

const QuizStepContainer = ({ title, children, onBack, currentStep, totalSteps }: { title: string, children: ReactNode, onBack?: () => void, currentStep?: number, totalSteps?: number, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="max-w-2xl mx-auto px-4 md:px-6 min-h-[75vh] md:min-h-[80vh] flex flex-col justify-center py-10 md:py-16 relative overflow-hidden"
  >
    {onBack && (
      <button 
        onClick={onBack}
        className="absolute top-6 left-4 flex items-center gap-2 text-brand-muted hover:text-brand-sage transition-colors font-bold text-[10px] md:text-xs uppercase tracking-widest p-2 -ml-2"
      >
        <ChevronRight size={14} className="rotate-180" /> Back
      </button>
    )}

    {currentStep && totalSteps && (
      <div className="absolute top-6 right-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sage/60 p-2">
        Step {currentStep}/{totalSteps}
      </div>
    )}

    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl md:text-5xl font-serif text-[#4A4A4A] mb-3 md:mb-4 px-2 leading-tight">{title}</h2>
      <p className="text-brand-muted italic font-serif text-sm md:text-base px-4">Select the option that fits you best.</p>
    </div>
    <div className="space-y-3 md:space-y-4 px-1">
      {children}
    </div>
  </motion.div>
);

const QuizOption = ({ label, icon: Icon, onClick, active }: { label: string, icon: any, onClick: () => void, active: boolean, key?: string }) => (
  <motion.button 
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full min-h-16 md:min-h-17.5 flex items-center gap-4 md:gap-5 px-4 py-4 md:px-6 md:py-5 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 text-left ${
      active 
      ? 'border-brand-sage bg-brand-sage/10 shadow-md ring-1 ring-brand-sage/20' 
      : 'border-brand-border hover:border-brand-sage/40 bg-white hover:bg-brand-bone'
    }`}
  >
    <div className={`w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors ${active ? 'bg-brand-sage text-white' : 'bg-brand-tan/50 text-brand-muted'}`}>
      <Icon size={22} className="md:w-6 md:h-6" />
    </div>
    <span className={`text-sm md:text-lg font-bold transition-colors leading-tight grow ${active ? 'text-[#4A4A4A]' : 'text-brand-muted'}`}>{label}</span>
    <div className={`shrink-0 w-6 h-6 md:w-6 md:h-6 rounded-full border-2 transition-all flex items-center justify-center ${active ? 'border-brand-sage bg-brand-sage text-white' : 'border-brand-border'}`}>
      {active && <CheckCircle2 size={14} className="md:w-4 md:h-4" />}
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
  
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [stepHistory, setStepHistory] = useState<QuizStep[]>(['welcome']);

  const quizSteps: QuizStep[] = ['welcome', 'identity', 'painPoint', 'timeAvailable', 'pastObstacle', 'commitment', 'urgency', 'desiredResult', 'currentWeight', 'height', 'targetWeight', 'email', 'analyzing', 'result'];

  const calculateProgress = () => {
    const index = quizSteps.indexOf(step);
    return (index / (quizSteps.length - 1)) * 100;
  };

  const handleNext = (nextStep: QuizStep) => {
    if (nextStep === 'result') {
      const result = analyzeAnswers(quizData);
      const products = getRecommendedProducts(quizData);
      setAnalysis(result);
      setRecommendations(products);
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

  const VideoFacade = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-8 md:mt-16 w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-brand-border shadow-2xl relative max-w-4xl mx-auto aspect-video bg-black/5 group cursor-pointer"
        onClick={() => setIsLoaded(true)}
      >
        {isLoaded ? (
          <iframe 
            className="absolute top-0 left-0 w-full h-full border-0"
            src="https://www.canva.com/design/DAHIhW08ZVM/eM_D8fesHLXKZOfPJoYPeQ/watch?embed&autoplay=1&muted=1" 
            allowFullScreen 
            allow="autoplay; fullscreen; picture-in-picture"
            title="FitFeky Introduction Video"
            loading="lazy"
          ></iframe>
        ) : (
          <>
            <img 
              src="https://picsum.photos/seed/fitfeky-yoga/1200/675" 
              alt="Video thumbnail" 
              className="absolute top-0 left-0 w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-sage text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform z-10">
                <Play size={24} className="translate-x-1 md:w-8 md:h-8" fill="currentColor" />
              </div>
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] drop-shadow-md">Watch the FitFeky Method</span>
            </div>
          </>
        )}
      </motion.div>
    );
  };

  const Hero = () => (
    <section className="relative px-4 py-8 md:py-24 flex flex-col items-center text-center max-w-6xl mx-auto min-h-[85vh] md:min-h-[80vh] justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <div className="mb-4 md:mb-6 inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
          Free 60-Second Quiz
        </div>
        
        <h1 className="text-3xl md:text-7xl font-serif leading-[1.2] md:leading-[1.1] mb-4 md:mb-6 text-brand-ink">
          Discover Your Perfect Women's Fitness Plan in <span className="text-brand-sage italic">60 Seconds</span>
        </h1>
        
        <h2 className="text-sm md:text-2xl text-brand-muted max-w-2xl mb-8 md:mb-10 mx-auto leading-relaxed font-medium px-4">
          Answer 7 questions — get a personalized yoga, weight loss, or strength plan built for YOUR body.
        </h2>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 md:gap-8 mb-10 md:mb-12 text-[9px] md:text-xs font-bold uppercase tracking-widest text-brand-muted/80 px-4">
          <div className="flex items-center gap-1.5"><Star size={14} className="text-brand-gold fill-brand-gold" /> 50K+ Women</div>
          <div className="flex items-center gap-1.5"><Lock size={14} className="text-brand-sage" /> 100% Free</div>
          <div className="flex items-center gap-1.5"><Zap size={14} className="text-brand-gold" /> 60 Seconds</div>
          <div className="flex items-center gap-1.5"><Target size={14} className="text-brand-sage" /> Results</div>
        </div>

        <div className="w-full max-w-sm md:max-w-md mx-auto space-y-4 md:space-y-6 px-4">
          <button 
            onClick={() => {
              trackEvent('quiz_start', { 'event_category': 'Quiz' });
              handleNext('identity');
            }}
            className="group w-full relative inline-flex items-center justify-center gap-3 bg-brand-sage text-white px-6 md:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-brand-sage/90 hover:-translate-y-1 transition-all shadow-xl shadow-brand-sage/20 border-b-4 border-black/10 active:border-b-0 active:translate-y-1"
          >
            START MY FREE QUIZ
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            <p className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-brand-muted">
              🔥 347 women started this quiz today
            </p>
          </div>
        </div>
      </motion.div>

      <VideoFacade />
    </section>
  );

  const Methodology = () => (
    <section id="method" className="py-12 md:py-24 px-4 md:px-12 bg-white border-t border-brand-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-sage/10 text-brand-sage text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
            Our Science
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-ink mb-4 md:mb-6 px-2">The FitFeky <span className="text-brand-sage italic">Method</span></h2>
          <p className="text-base md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed italic px-4">
            "Combining ancient yoga wisdom with modern metabolic science to empower women's health."
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 px-2">
          {[
            {
              title: "Dynamic Personalization",
              desc: "Our proprietary algorithm analyzes your unique body type, hormone profile, and lifestyle to build a plan that eliminates the guesswork.",
              icon: Target
            },
            {
              title: "Metabolic Synergy",
              desc: "We focus on lowering cortisol—the 'stress hormone'—through targeted yoga flows that switch your body from fat-storage to fat-burning mode.",
              icon: Waves
            },
            {
              title: "Micro-Consistency",
              desc: "We prioritize 15-minute daily 'Micro-Flows'. This approach builds neuro-pathways for lasting habits without the burnout of traditional gym routines.",
              icon: Clock
            }
          ].map((m, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] bg-brand-bone border border-brand-border hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-sage text-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-brand-sage/20 transition-transform">
                <m.icon size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-brand-ink mb-3 md:mb-4">{m.title}</h3>
              <p className="text-brand-muted leading-relaxed text-sm font-medium">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const SocialProof = () => (
    <section className="bg-brand-tan/10 py-8 md:py-12 border-y border-brand-border overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <img 
              key={i} 
              src={`https://picsum.photos/seed/face${i}/64/64`} 
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-brand-bone object-cover ring-2 ring-brand-tan/20" 
              alt="Transformed user"
            />
          ))}
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-brand-bone bg-brand-sage flex items-center justify-center text-white text-[9px] md:text-xs font-black shadow-lg">
            +50K
          </div>
        </div>
        
        <div>
          <div className="flex justify-center md:justify-start gap-1 text-brand-gold mb-1">
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <p className="text-base md:text-xl font-serif text-brand-ink">
            Join <span className="text-brand-sage font-bold">50,000+ women</span> who transformed with <span className="italic">FitFeky</span>
          </p>
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-12 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#4A4A4A] text-center px-2">Real Success Stories from Our Community</h2>
        <p className="text-brand-muted text-center mb-10 md:mb-16 text-base md:text-lg italic px-4">Join thousands of women who've transformed their bodies, minds, and lives with FitFeky.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full px-2">
          {[
            {
              name: "Sarah M.",
              location: "Los Angeles, CA",
              program: "Flat Belly Mom Program",
              results: "Lost 12 lbs • Reduced bloating • Reclaimed core strength",
              text: "After my second child, I felt completely disconnected from my body. FitFeky gave me back my confidence in just 12 weeks. The 15-minute routines fit perfectly into my schedule—I started doing them during my morning coffee before the kids woke up. My husband couldn't believe the transformation in my midsection. More importantly, I feel strong and energized again. This program literally saved my postpartum journey.",
              image: "https://picsum.photos/seed/sarah/200/200",
              duration: "12 weeks",
            },
            {
              name: "Elena G.",
              location: "New York, NY",
              program: "90-Day Transformation Program",
              results: "Lost 18 lbs • +3 energy levels • Stopped yo-yo dieting",
              text: "I was on the hamster wheel of diet culture—restricting, binging, feeling guilty. The personalized approach from FitFeky stopped that cycle completely. The program educated me on sustainable habits instead of quick fixes. I lost 18 pounds steady over three months, my energy skyrocketed, and for the first time, I'm not dreading the scale. This isn't just weight loss; it's a lifestyle I can actually maintain forever.",
              image: "https://picsum.photos/seed/elena/200/200",
              duration: "90 days",
            },
            {
              name: "Jessica P.",
              location: "London, UK",
              program: "Gentle Yoga 21 Program",
              results: "Anxiety reduced by 80% • Eliminated chronic back pain • Flexibility +40%",
              text: "I was prescribed medication for anxiety and dealt with constant lower back pain from desk work. My physiotherapist suggested yoga, but I was intimidated by traditional classes. FitFeky's gentle 21-day program met me exactly where I was. The breathing techniques alone transformed my nervous system—I noticed the difference within days. After three weeks, I had less back pain than I'd felt in years. I'm off my anxiety medication, more flexible, and actually look forward to my daily practice.",
              image: "https://picsum.photos/seed/jessica/200/200",
              duration: "21 days",
            },
            {
              name: "Priya K.",
              location: "Toronto, Canada",
              program: "Strength & Flexibility Blend",
              results: "Built visible muscle • Gained 12 lbs of lean mass • Transformed body composition",
              text: "I always thought yoga was just stretching. FitFeky showed me how powerful it is for building real strength. I started at 118 lbs with virtually no upper body strength—couldn't do a single push-up. After eight weeks of the Strength & Flexibility program, I'm 130 lbs of muscle and can do 15 push-ups. My body shape completely changed. What I love most is that I feel capable and strong, not just thin. This program finally helped me understand that strength is beautiful.",
              image: "https://picsum.photos/seed/priya/200/200",
              duration: "8 weeks",
            },
            {
              name: "Michelle T.",
              location: "Austin, TX",
              program: "Stress Relief & Deep Stretch",
              results: "Sleep quality +95% • Chronic tension released • Cortisol normalized",
              text: "My stress manifested as a constant knot in my shoulders and neck. I'd been to chiropractors, massages, everything—nothing stuck. The Stress Relief program uses targeted restorative poses that literally melted the tension away. I started sleeping through the night again for the first time in three years. My posture improved, my headaches disappeared, and I honestly feel like a new person. The mental clarity I gained is almost more valuable than the physical benefits.",
              image: "https://picsum.photos/seed/michelle/200/200",
              duration: "6 weeks",
            },
            {
              name: "Amanda L.",
              location: "Miami, FL",
              program: "Post-Injury Recovery Flow",
              results: "Full mobility restored • Returned to CrossFit • Zero pain",
              text: "I torn my rotator cuff doing CrossFit and was devastated thinking my fitness days were over. Physical therapy got me so far, but I was still limited. FitFeky's Post-Injury Recovery program filled the gaps. The careful progressions allowed me to rebuild my shoulder stability without re-injury. After 10 weeks, my physical therapist cleared me to return to full CrossFit. Not only am I back—I'm stronger than before because I finally understand proper shoulder mechanics. This program gave me my life back.",
              image: "https://picsum.photos/seed/amanda/200/200",
              duration: "10 weeks",
            }
          ].map((t, i) => (
            <div key={i} className="bg-[#F9FBFA] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-brand-border hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
              <div className="flex text-brand-gold mb-3 mt-2 relative z-10">
                {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
              </div>
              <div className="mb-4 relative z-10">
                <p className="text-[10px] md:text-[11px] font-bold text-brand-sage uppercase tracking-widest">{t.program} • {t.duration}</p>
                <p className="text-[9px] md:text-[10px] text-brand-sage/70 mt-1 italic">{t.results}</p>
              </div>
              <p className="text-brand-muted mb-8 leading-relaxed relative z-10 text-sm md:text-base">"{t.text}"</p>
              <div className="flex items-center gap-4 relative z-10 border-t border-brand-border pt-6">
                <img src={t.image} alt={t.name} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-md grayscale-20 group-hover:grayscale-0 transition-all" />
                <div>
                  <div className="font-bold text-[#5A524A] text-xs md:text-sm uppercase tracking-tighter">{t.name}</div>
                  <div className="text-[9px] md:text-[10px] text-brand-muted uppercase tracking-[0.2em]">{t.location}</div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity hidden md:block">
                <CheckCircle2 size={120} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const FAQ = () => (
    <section id="faq" className="py-16 md:py-24 px-4 md:px-12 bg-brand-tan/20 border-t border-brand-border overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-5xl font-serif mb-8 md:mb-16 text-[#4A4A4A] text-center px-4 leading-tight">Frequently Asked Questions</h2>
        <div className="space-y-4 w-full px-1">
          {[
            {
              q: "What is the best yoga program for beginner women?",
              a: "For women who are just starting their fitness journey, the best yoga program for beginner women focuses on gentle foundational flows, breathing techniques, and flexibility building without overwhelming the body. Our Yoga 21 Program is specifically tailored for absolute beginners. It eliminates the confusion of complex poses and instead guides you through stress-reducing, low-impact routines that build a strong foundation. You'll learn how to properly align your body, connect with your breath, and gradually increase your flexibility over 21 days, establishing a sustainable habit that feels restorative rather than exhausting."
            },
            {
              q: "How can women lose belly fat at home without equipment?",
              a: "Losing belly fat at home without equipment requires a combination of core-focused high-intensity interval training (HIIT), whole-body metabolic conditioning, and a hormone-balancing diet. Our Flat Belly Mom Program and Home Workout Starter use bodyweight-only exercises that elevate your heart rate and engage your deep core muscles—transverse abdominis—to effectively tone your midsection. Consistency in these targeted movements, combined with our personalized nutrition guidance to manage stress hormones like cortisol (which often causes abdominal fat storage), provides a comprehensive blueprint to lose belly fat entirely from the comfort of your living room."
            },
            {
              q: "Is 15 minutes of yoga daily enough to see results?",
              a: "Yes, absolutely! Consistency is far more important than duration. Practicing just 15 minutes of yoga daily is enough to see significant improvements in your flexibility, core strength, and mental clarity. A focused, 15-minute daily flow can effectively regulate your nervous system, lower stress levels, and relieve muscle tension from sitting or working. Our express routines are scientifically structured to maximize this short window, giving busy women all the fundamental benefits of a full 60-minute studio class, ensuring you can stick to your goals even on your most chaotic days."
            },
            {
              q: "What fitness program works best for busy moms?",
              a: "The fitness program that works best for busy moms is one that offers maximum flexibility, requires zero commute time, and delivers efficient, full-body results in under 20 minutes a day. Moms juggle incredible mental and physical loads, so the ideal routine must accommodate unpredictable schedules. Our Flat Belly Mom Program is specifically engineered for this lifestyle. It features quick, high-impact core recovery flows and energy-boosting strength circuits that you can complete while the baby naps or before the kids wake up, helping you regain your strength and confidence without adding onto your daily stress."
            },
            {
              q: "How does the FitFeky quiz work?",
              a: "The FitFeky quiz is a rapid, 60-second assessment designed to pinpoint your unique physical needs, lifestyle constraints, and personal wellness goals. By answering exactly 10 targeted questions about your current activity level, biggest obstacles, available time, and fitness aspirations, our algorithm immediately matches you with the ideal personalized program. Whether you need a gentle beginner yoga flow, a fast-paced fat-loss routine, or a muscle-toning framework, the quiz eliminates the guesswork, instantly generating a customized action plan tailored exclusively to your female physiology and daily routine."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 cursor-pointer hover:shadow-md transition-shadow group border border-brand-border">
              <h3 className="text-base md:text-xl font-bold text-[#4A4A4A] flex justify-between items-center group-hover:text-brand-sage transition-colors text-left gap-4">
                <span className="leading-snug">{faq.q}</span>
                <ChevronDown className="text-brand-muted group-hover:text-brand-sage transition-colors shrink-0" />
              </h3>
              <p className="text-brand-muted mt-4 leading-relaxed pl-2 border-l-2 border-brand-sage/20 hidden group-hover:block transition-all text-sm md:text-base">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#333333] selection:bg-brand-sage/20">
      
      {/* Social Proof Popup */}
      <AnimatePresence>
        {showSocialProof && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: -20 }}
            className="fixed bottom-6 left-6 z-50 bg-white/90 backdrop-blur-md border border-brand-border px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 max-w-xs"
          >
            <div className="w-8 h-8 rounded-full bg-brand-sage/20 text-brand-sage flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <p className="text-xs font-bold text-brand-ink leading-tight">
              {socialProofs[socialProofIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-brand-ink/40 backdrop-blur-sm flex items-center justify-center p-6"
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
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <div className="w-16 h-16 bg-[#D32F2F]/10 text-[#D32F2F] rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-serif text-center text-brand-ink mb-4">Wait{quizData?.name ? ` ${quizData.name}` : ''}! Your results are about to expire...</h3>
              <p className="text-center text-brand-muted mb-8">
                Your personalized plan has been generated and reserved for you. Don't lose your progress and the special discount!
              </p>
              <button 
                onClick={() => setShowExitIntent(false)}
                className="w-full bg-brand-sage text-white p-4 rounded-full font-bold text-lg hover:bg-brand-sage/90 hover:-translate-y-1 transition-all shadow-xl shadow-brand-sage/20 border-b-4 border-black/10 active:border-b-0 active:translate-y-1"
              >
                RETURN TO MY PLAN
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Bar */}
      <AnimatePresence>
        {step === 'welcome' && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="md:hidden fixed bottom-6 left-6 right-6 z-40"
          >
            <button 
              onClick={() => handleNext('identity')}
              className="w-full bg-brand-sage text-white py-4 rounded-full font-bold shadow-2xl shadow-brand-sage/40 flex items-center justify-center gap-3 border-b-4 border-black/10 active:border-b-0 active:translate-y-1"
            >
              START MY FREE QUIZ <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero />
              <SocialProof />
              <Methodology />
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
              <div className="bg-brand-gold/10 text-brand-gold font-bold text-xs uppercase tracking-widest text-center py-2 px-4 rounded-full mb-6 mx-auto w-max">
                ✨ You're doing great! Keep going
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
              <div className="bg-white p-8 rounded-[2.5rem] border-2 border-brand-border focus-within:border-brand-sage transition-all shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center text-brand-sage">
                    <Scale size={24} />
                  </div>
                  <span className="text-lg font-medium text-brand-ink">Weight in Kilograms (kg)</span>
                </div>
                <input 
                  type="number" 
                  inputMode="decimal"
                  placeholder="e.g. 75"
                  className="w-full bg-brand-bone/50 border-none text-2xl md:text-3xl font-serif p-4 focus:ring-0 placeholder:text-brand-muted/30"
                  value={quizData.currentWeight}
                  onChange={(e) => setQuizData({...quizData, currentWeight: e.target.value})}
                  autoFocus
                />
                <button 
                  disabled={!quizData.currentWeight}
                  onClick={() => handleNext('height')}
                  className="w-full mt-8 bg-brand-sage text-white p-5 rounded-full font-bold shadow-xl shadow-brand-sage/20 disabled:opacity-50 disabled:shadow-none hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  CONTINUE <ArrowRight size={20} />
                </button>
              </div>
            </QuizStepContainer>
          )}

          {step === 'height' && (
            <QuizStepContainer key="height" title="What is your height?" onBack={handleBack} currentStep={9} totalSteps={10}>
              <div className="bg-white p-8 rounded-[2.5rem] border-2 border-brand-border focus-within:border-brand-sage transition-all shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center text-brand-sage">
                    <Ruler size={24} />
                  </div>
                  <span className="text-lg font-medium text-brand-ink">Height in Centimeters (cm)</span>
                </div>
                <input 
                  type="number" 
                  inputMode="decimal"
                  placeholder="e.g. 165"
                  className="w-full bg-brand-bone/50 border-none text-2xl md:text-3xl font-serif p-4 focus:ring-0 placeholder:text-brand-muted/30"
                  value={quizData.height}
                  onChange={(e) => setQuizData({...quizData, height: e.target.value})}
                  autoFocus
                />
                <button 
                  disabled={!quizData.height}
                  onClick={() => handleNext('targetWeight')}
                  className="w-full mt-8 bg-brand-sage text-white p-5 rounded-full font-bold shadow-xl shadow-brand-sage/20 disabled:opacity-50 disabled:shadow-none hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  CONTINUE <ArrowRight size={20} />
                </button>
              </div>
            </QuizStepContainer>
          )}

          {step === 'targetWeight' && (
            <QuizStepContainer key="targetWeight" title="What is your target weight?" onBack={handleBack} currentStep={10} totalSteps={10}>
              <div className="bg-white p-8 rounded-[2.5rem] border-2 border-brand-border focus-within:border-brand-sage transition-all shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brand-sage/10 rounded-2xl flex items-center justify-center text-brand-sage">
                    <Target size={24} />
                  </div>
                  <span className="text-lg font-medium text-brand-ink">Target Weight in Kilograms (kg)</span>
                </div>
                <input 
                  type="number" 
                  inputMode="decimal"
                  placeholder="e.g. 65"
                  className="w-full bg-brand-bone/50 border-none text-2xl md:text-3xl font-serif p-4 focus:ring-0 placeholder:text-brand-muted/30"
                  value={quizData.targetWeight}
                  onChange={(e) => setQuizData({...quizData, targetWeight: e.target.value})}
                  autoFocus
                />
                <button 
                  disabled={!quizData.targetWeight}
                  onClick={() => handleNext('email')}
                  className="w-full mt-8 bg-brand-sage text-white p-5 rounded-full font-bold shadow-xl shadow-brand-sage/20 disabled:opacity-50 disabled:shadow-none hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  CONTINUE <ArrowRight size={20} />
                </button>
              </div>
            </QuizStepContainer>
          )}

          {step === 'email' && (
            <motion.div key="email" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto px-4 md:px-6 py-12 md:py-20 text-center">
              <h2 className="text-2xl md:text-5xl font-serif mb-3 md:mb-4 text-brand-ink leading-tight">Your Plan is Ready! 🎯</h2>
              <p className="text-sm md:text-lg text-brand-muted mb-8 md:mb-10 leading-relaxed font-serif italic px-2">
                Where should we send your FREE personalized plan + bonus nutrition guide (valued at $27)?
              </p>
              <form 
                className="space-y-4 md:space-y-6 text-left px-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (quizData.name && quizData.email) {
                    trackConversion('quiz_completion', { goal: quizData.desiredResult, lifestyle: quizData.identity });
                    handleNext('analyzing');
                  }
                }}
              >
                <div>
                  <label className="block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">First Name</label>
                  <input 
                    type="text" required placeholder="Enter your name"
                    className="w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 border-brand-border focus:border-brand-sage outline-none bg-white transition-all shadow-sm text-sm"
                    value={quizData.name} onChange={(e) => setQuizData({...quizData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">Email Address</label>
                  <input 
                    type="email" required placeholder="name@example.com"
                    className="w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 border-brand-border focus:border-brand-sage outline-none bg-white transition-all shadow-sm text-sm"
                    value={quizData.email} onChange={(e) => setQuizData({...quizData, email: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-sage text-white p-4 md:p-5 rounded-full font-bold text-base md:text-lg shadow-xl shadow-brand-sage/20 hover:bg-brand-sage/90 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 border-b-4 border-black/10 active:border-b-0 active:translate-y-1 mt-6"
                >
                  GET MY RESULTS NOW <ArrowRight size={20} />
                </button>
              </form>
              <div className="mt-8 flex items-center justify-center gap-2 text-[9px] md:text-[10px] text-brand-muted/60 uppercase tracking-widest">
                <Lock size={12} /> SECURE & PRIVATE. NO SPAM EVER.
              </div>
            </motion.div>
          )}

          {step === 'analyzing' && <AnalyzingStep name={quizData.name} onComplete={() => handleNext('result')} />}
          {step === 'result' && analysis && <ResultsStep quizData={quizData} analysis={analysis} recommendations={recommendations} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
