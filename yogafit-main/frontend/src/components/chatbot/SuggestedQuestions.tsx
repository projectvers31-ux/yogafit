export default function SuggestedQuestions({ suggestions, onSelect, disabled }: { suggestions: string[]; onSelect: (s: string) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <button key={i} onClick={() => onSelect(s)} disabled={disabled} className="px-3 py-1 bg-brand-bone rounded-full text-sm">{s}</button>
      ))}
    </div>
  );
}
