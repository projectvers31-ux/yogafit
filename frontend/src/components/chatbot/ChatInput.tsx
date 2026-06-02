import React, { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';

export default function ChatInput({
  onSend,
  disabled,
  onClear,
  showClear
}: {
  onSend: (s: string) => void;
  disabled?: boolean;
  onClear?: () => void;
  showClear?: boolean;
}) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 md:p-4 bg-white border-t border-brand-border/50">
      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={disabled}
          className="flex-1 px-4 py-2.5 bg-brand-bone/40 border border-brand-border/50 rounded-xl text-sm text-brand-ink placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-sage/20 focus:border-brand-sage transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="p-2.5 bg-brand-sage text-white rounded-xl hover:bg-brand-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
        {showClear && onClear && (
          <button
            onClick={onClear}
            className="p-2.5 text-brand-muted hover:text-brand-ink hover:bg-brand-bone/50 rounded-xl transition-all"
            aria-label="Clear chat"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
