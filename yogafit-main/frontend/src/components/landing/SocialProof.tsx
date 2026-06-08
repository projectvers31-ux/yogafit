import { memo } from 'react';
import { Star, Award, ShieldCheck, Heart } from 'lucide-react';

const avatarImages = [
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=44&h=44&fit=crop&crop=face&q=60',
  'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=44&h=44&fit=crop&crop=face&q=60',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=44&h=44&fit=crop&crop=face&q=60',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=44&h=44&fit=crop&crop=face&q=60',
];

export default memo(function SocialProof() {
  return (
    <section className="bg-brand-warm py-10 md:py-14 border-y border-brand-border/20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          <div className="flex -space-x-3">
            {avatarImages.map((src, i) => (
              <img
                key={i}
                src={src}
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white object-cover shadow-sm"
                alt={`FitFeky member ${i + 1}`}
              />
            ))}
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white bg-brand-sage flex items-center justify-center text-white text-[9px] font-bold shadow-sm">
              +50K
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex gap-0.5 text-brand-gold">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={13} fill="currentColor" />)}
            </div>
            <p className="text-xs md:text-sm text-brand-muted leading-snug text-center md:text-left italic">
              &ldquo;The quiz knew exactly what my body needed. Lost 5 kg in 6 weeks without starving.&rdquo;
            </p>
            <p className="text-[10px] text-brand-muted/50 font-medium">
              — Sarah M., Lost 5 kg with FitFeky
            </p>
          </div>

          <div className="hidden md:block w-px h-10 bg-brand-border/30" />

          <div className="flex flex-col items-center md:items-start">
            <p className="text-base md:text-lg font-bold text-brand-ink leading-tight">
              50,000+ <span className="text-brand-sage">women</span>
            </p>
            <p className="text-[11px] md:text-xs text-brand-muted leading-snug text-center md:text-left">
              have lost weight, built confidence, and created habits that last
            </p>
          </div>

          <div className="hidden md:block w-px h-10 bg-brand-border/30" />

          <div className="flex flex-col gap-1.5">
            {[
              { icon: Award, text: 'Certified yoga & nutrition experts' },
              { icon: ShieldCheck, text: 'Science-backed, no gimmicks' },
              { icon: Heart, text: 'No gym, no equipment needed' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <item.icon size={11} className="text-brand-sage shrink-0" />
                <span className="text-[10px] md:text-[11px] text-brand-muted/70 leading-tight">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
