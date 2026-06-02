export default function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center" role="status" aria-label={text}>
      <div className="w-10 h-10 border-2 border-brand-sage/20 border-t-brand-sage rounded-full animate-spin mb-4" />
      <p className="text-sm text-brand-muted">{text}</p>
    </div>
  );
}
