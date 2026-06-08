import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

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

export default memo(function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
          <Link to="/picks" className={navLinkClasses}>Picks</Link>
          <Link to="/stories" className={navLinkClasses}>Stories</Link>
          <Link to="/calculators" className={navLinkClasses}>Calculators</Link>
          <Link to="/blog" className={navLinkClasses}>Blog</Link>
          <Link to="/about" className={navLinkClasses}>About</Link>
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
              <Link to="/picks" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Picks</Link>
              <Link to="/stories" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Stories</Link>
              <Link to="/calculators" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Calculators</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">Blog</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand-muted hover:text-brand-sage transition-colors">About</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});
