import { useState, useCallback, useRef } from 'react';
import { getChatbotResponse, categorizeUserMessage } from '@/lib/chatbotPersonality';
import { generateGeminiResponse } from '@/lib/gemini';
import type { ChatHistoryEntry } from '@/lib/gemini';

export interface Message {
  id: string;
  content: string;
  from: 'user' | 'bot';
}

export const INITIAL_SUGGESTIONS = [
  'How do I start losing weight?',
  'What program is best for me?',
  'Help with emotional eating',
  'Yoga for beginners at home',
  'Quick energy boost tips'
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

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contextRef = useRef<ChatContext>({
    conversationTurn: 0,
    previousTopics: []
  });
  const historyRef = useRef<ChatHistoryEntry[]>([]);

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

    historyRef.current.push({ role: 'user', text: content });

    try {
      let responseContent: string;

      const geminiResult = await generateGeminiResponse(content, historyRef.current.slice(-10), {
        name: ctx.userName,
        archetype: ctx.userArchetype,
        goal: ctx.userGoal,
      });

      if (geminiResult.content) {
        responseContent = geminiResult.content;
      } else {
        const fallback = getChatbotResponse(content, {
          userName: ctx.userName,
          userArchetype: ctx.userArchetype,
          userGoal: ctx.userGoal as any,
          conversationTurn: ctx.conversationTurn,
          previousTopics: ctx.previousTopics
        });
        responseContent = fallback.content;
      }

      historyRef.current.push({ role: 'model', text: responseContent });

      const botMessage: Message = {
        id: generateId(),
        content: responseContent,
        from: 'bot'
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
    historyRef.current = [];
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat, setUserContext };
}

export default useChat;
