import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { useChat, INITIAL_SUGGESTIONS } from '@/hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  userContext?: {
    name?: string;
    archetype?: string;
    goal?: string;
  };
}

export default function ChatWindow({ isOpen, onClose, userContext }: ChatWindowProps) {
  const { messages, isLoading, error, sendMessage, clearChat, setUserContext } = useChat();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userContext) {
      setUserContext({
        userName: userContext.name,
        userArchetype: userContext.archetype,
        userGoal: userContext.goal
      });
    }
  }, [userContext, setUserContext]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    await sendMessage(content);
  };

  const handleSuggestedClick = (question: string) => {
    if (!isLoading) {
      handleSend(question);
    }
  };

  const showSuggestions = messages.length === 0 && !isLoading;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed bottom-20 right-4 md:right-6 lg:right-8 w-[calc(100%-2rem)] md:w-100 lg:w-112.5 h-150 md:h-162.5 bg-white rounded-3xl md:rounded-4xl shadow-2xl border border-brand-border/50 flex flex-col overflow-hidden z-50"
      role="dialog"
      aria-label="AI Fitness Coach Chat"
    >
      <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-brand-sage text-white border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-bold">FitFeky AI Coach</h2>
            <p className="text-[10px] md:text-xs text-white/70">
              {userContext?.name ? `Hi, ${userContext.name}` : 'Your personal fitness assistant'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      <div
        ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-brand-warm"
      >
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-brand-sage" />
            </div>
            <h3 className="text-base md:text-lg font-serif text-brand-ink mb-2">
              Hi{userContext?.name ? ` ${userContext.name}` : ''}! I am your AI Fitness Coach
            </h3>
            <p className="text-sm text-brand-muted max-w-70 mx-auto">
              I can help you with workout plans, nutrition advice, yoga recommendations, and more. Ask me anything.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="p-3 bg-brand-blush/30 border border-brand-blush/50 rounded-xl text-sm text-brand-ink">
            {error}
          </div>
        )}

        {showSuggestions && (
          <div className="pt-2">
            <p className="text-[10px] md:text-xs text-brand-muted/70 mb-2 px-1">
              Try asking:
            </p>
            <SuggestedQuestions
              suggestions={INITIAL_SUGGESTIONS}
              onSelect={handleSuggestedClick}
              disabled={isLoading}
            />
          </div>
        )}

        <div ref={(el) => { if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
      </div>

      <ChatInput
        onSend={handleSend}
        disabled={isLoading}
        onClear={clearChat}
        showClear={messages.length > 0}
      />
    </motion.div>
  );
}
