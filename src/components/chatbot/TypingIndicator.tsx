import React from 'react';
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="w-2 h-2 bg-brand-muted rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-brand-muted rounded-full animate-pulse delay-75" />
      <div className="w-2 h-2 bg-brand-muted rounded-full animate-pulse delay-150" />
    </div>
  );
}
