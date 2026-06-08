import { memo } from 'react';
import { Link } from 'react-router-dom';


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

export default memo(function Footer() {
  const year = new Date().getFullYear();

  return (
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
              <a href="https://pin.it/4WXisJo3W" target="_blank" rel="noopener noreferrer" className="hover:text-brand-sage hover:-translate-y-0.5 transition-all"><PinterestIcon size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-sage mb-5">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">About Us</Link>
              <Link to="/privacy" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Privacy</Link>
              <Link to="/terms" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Terms</Link>
              <Link to="/contact" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Contact</Link>
              <Link to="/blog" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Blog</Link>
              <Link to="/picks" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">FitFeky Picks</Link>
              <Link to="/stories" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Real Stories</Link>
              <Link to="/calculators" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">All Calculators</Link>
              <Link to="/calculators/tdee-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">TDEE Calculator</Link>
              <Link to="/calculators/bmr-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">BMR Calculator</Link>
              <Link to="/calculators/calorie-deficit-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Calorie Deficit</Link>
              <Link to="/calculators/macro-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Macro Calculator</Link>
              <Link to="/calculators/ideal-weight-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Ideal Weight</Link>
              <Link to="/calculators/body-fat-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Body Fat</Link>
              <Link to="/calculators/water-intake-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Water Intake</Link>
              <Link to="/calculators/protein-calculator" className="text-sm text-brand-muted hover:text-brand-sage transition-colors">Protein Calculator</Link>
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
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted/40 whitespace-nowrap">&copy; {year} FitFeky</span>
        </div>
      </div>
    </footer>
  );
});
