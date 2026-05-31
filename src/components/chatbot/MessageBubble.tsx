export default function MessageBubble({ message }: { message: { id: string; content: string; from: 'user' | 'bot' } }) {
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
      </div>
    </div>
  );
}
