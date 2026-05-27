import { useState, useCallback, useRef } from 'react';
import { getChatbotResponse, categorizeUserMessage } from '@/lib/chatbotPersonality';
import { productList } from '@/lib/products';

export interface Message {
  id: string;
  content: string;
  from: 'user' | 'bot';
  productRecommendation?: {
    title: string;
    category: string;
    link: string;
    price: number;
    reason: string;
  };
}

export const INITIAL_SUGGESTIONS = [
  'How do I start?',
  'What program is best for me?',
  'Help with weight loss',
  'Yoga for beginners',
  'How to stop emotional eating'
];

interface ChatContext {
  userName?: string;
  userArchetype?: string;
  userGoal?: string;
  conversationTurn: number;
  previousTopics: string[];
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function selectProductForContext(category: string, userGoal?: string): Message['productRecommendation'] | undefined {
  const matching = productList.filter(p => {
    if (category === 'YOGA' && p.category === 'YOGA') return true;
    if (category === 'KETO' && p.category === 'KETO') return true;
    if (category === 'FITNESS' && (p.category === 'FITNESS' || p.category === 'FAT_LOSS')) return true;
    if (category === 'GLOW' && p.category === 'GLOW') return true;
    return false;
  });

  if (matching.length === 0) return undefined;

  const pick = matching[Math.floor(Math.random() * Math.min(matching.length, 2))];

  const reasons: Record<string, string> = {
    YOGA: 'Perfect for stress relief and flexibility — thousands of women use this daily',
    KETO: 'Women on this program report 2-3x faster results with less cravings',
    FITNESS: 'Designed for busy women who want maximum results in minimum time',
    GLOW: 'Holistic approach that transforms how you look and feel from the inside out'
  };

  return {
    title: pick.title,
    category: pick.category,
    link: pick.link,
    price: pick.price,
    reason: reasons[pick.category] || 'Recommended based on your goals'
  };
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contextRef = useRef<ChatContext>({
    conversationTurn: 0,
    previousTopics: []
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      content,
      from: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const ctx = contextRef.current;
    ctx.conversationTurn++;
    const category = categorizeUserMessage(content);
    if (!ctx.previousTopics.includes(category)) {
      ctx.previousTopics.push(category);
    }

    // Brief delay so the typing indicator shows naturally
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

    try {
      const response = getChatbotResponse(content, {
        userName: ctx.userName,
        userArchetype: ctx.userArchetype,
        userGoal: ctx.userGoal as any,
        conversationTurn: ctx.conversationTurn,
        previousTopics: ctx.previousTopics
      });

      const shouldRecommend = ctx.conversationTurn >= 2 && ctx.conversationTurn <= 8;
      let productRec: Message['productRecommendation'] | undefined;

      if (shouldRecommend && response.shouldRecommendProduct && response.recommendedProductCategory) {
        productRec = selectProductForContext(response.recommendedProductCategory, ctx.userGoal);
      }

      const botMessage: Message = {
        id: generateId(),
        content: response.content,
        from: 'bot',
        productRecommendation: productRec
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUserContext = useCallback((ctx: Partial<ChatContext>) => {
    contextRef.current = { ...contextRef.current, ...ctx };
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    contextRef.current = {
      conversationTurn: 0,
      previousTopics: []
    };
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat, setUserContext };
}

export default useChat;
