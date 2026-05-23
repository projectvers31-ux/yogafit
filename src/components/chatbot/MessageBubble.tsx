import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductRec {
  title: string;
  category: string;
  link: string;
  price: number;
  reason: string;
}

interface Message {
  id: string;
  content: string;
  from: 'user' | 'bot';
  productRecommendation?: ProductRec;
}

export default function MessageBubble({ message }: { message: Message }) {
  const isBot = message.from === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] rounded-2xl p-4 ${
          isBot
            ? 'bg-white border border-brand-border/50 shadow-sm'
            : 'bg-brand-sage text-white'
        }`}
      >
        <div className={`text-sm leading-relaxed ${isBot ? 'text-brand-ink' : 'text-white/90'}`}>
          {message.content}
        </div>

        {isBot && message.productRecommendation && (
          <div className="mt-4 pt-3 border-t border-brand-border/30">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 size={12} className="text-brand-gold" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">
                  Recommendation
                </p>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {message.productRecommendation.reason}
                </p>
              </div>
            </div>
            <a
              href={message.productRecommendation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand-sage hover:text-brand-sage/80 transition-colors"
            >
              See {message.productRecommendation.title} 
              <span className="text-brand-gold font-black">${message.productRecommendation.price}</span>
              <ArrowRight size={12} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
