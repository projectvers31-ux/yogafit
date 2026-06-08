import { Check } from 'lucide-react';

interface EmotionalMirrorProps {
  items: string[];
}

export default function EmotionalMirror({ items }: EmotionalMirrorProps) {
  return (
    <div className="bg-brand-sage/5 border border-brand-sage/10 rounded-2xl p-5 md:p-6">
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-brand-sage/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Check size={12} className="text-brand-sage" />
            </div>
            <span className="text-sm text-brand-muted leading-snug">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
