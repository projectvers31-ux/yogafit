import type {
  EnhancedAnalysis,
  PsychologicalProfile,
  MetabolicProfile,
  TransformationPlan,
  PersonalityInsight,
  PerAnswerInsight,
  ActionPlanItem
} from './quizAnalysis';

export type { EnhancedAnalysis, PsychologicalProfile, MetabolicProfile, TransformationPlan, PersonalityInsight, PerAnswerInsight, ActionPlanItem };

export type QuizData = { name: string };

export type ProductMatch = { product: any; matchScore: number; matchReasons?: string[] };

export type ChatMessage = {
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
};

export type UserArchetype = 'Busy Working Woman' | 'Emotional Eater' | 'Beginner Restarting Journey' | 'Transformation-Ready Champion' | 'Consistent Grower' | 'Ambitious Achiever';

export type BehavioralProductMatch = {
  productId: string;
  score: number;
  reasons: string[];
};
