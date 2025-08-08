export interface FoundationsModule {
  id: string;
  name: string;
  description: string;
  subModules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  type: 'theory' | 'practical';
  estimatedDuration: number; // minutes
  content: TopicContent;
  quiz?: Quiz;
  practicalAssessment?: PracticalAssessment;
  completed?: boolean;
  lastAccessed?: Date;
}

export interface TopicContent {
  overview: string;
  keyDefinitions: Definition[];
  diagrams?: string[]; // URLs to diagrams/images
  videos?: string[]; // URLs to videos
  examples?: string[];
}

export interface Definition {
  term: string;
  definition: string;
  example?: string;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number; // percentage
  timeLimit?: number; // minutes
}

export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'scenario';
  prompt: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  points: number;
}

export interface PracticalAssessment {
  id: string;
  name: string;
  description: string;
  steps: AssessmentStep[];
  rubric: RubricCriteria[];
  maxScore: number;
}

export interface AssessmentStep {
  id: string;
  order: number;
  instruction: string;
  expectedAction: string;
  points: number;
  criticalPoint: boolean;
}

export interface RubricCriteria {
  id: string;
  criterion: string;
  excellent: string; // 4 points
  good: string; // 3 points
  satisfactory: string; // 2 points
  needsImprovement: string; // 1 point
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  topicsCompleted: string[];
  quizScores: QuizResult[];
  practicalScores: PracticalResult[];
  overallProgress: number; // percentage
  lastActivity: Date;
}

export interface QuizResult {
  quizId: string;
  score: number; // percentage
  timeSpent: number; // minutes
  attempts: number;
  passed: boolean;
  completedAt: Date;
}

export interface PracticalResult {
  assessmentId: string;
  score: number;
  feedback: string;
  evaluatedBy: string;
  completedAt: Date;
}