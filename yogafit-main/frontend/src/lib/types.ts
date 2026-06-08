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

export type ChatMessage = {
  id: string;
  content: string;
  from: 'user' | 'bot';
};

export type UserArchetype = 'Busy Working Woman' | 'Emotional Eater' | 'Beginner Restarting Journey' | 'Transformation-Ready Champion' | 'Consistent Grower' | 'Ambitious Achiever';
