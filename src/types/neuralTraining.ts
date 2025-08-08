export interface NeuralDrill {
  id: string;
  tier: string;
  name: string;
  quickPurpose: string;
  description?: string;
  estimatedDuration?: number; // minutes
  equipmentRequired?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'foundation_simple' | 'foundation_choice' | 'foundation_sequence' | 'applied_cricket' | 'applied_agility' | 'dual_task' | 'fatigue_endurance' | 'rehab' | 'advanced_game';
}

export interface NeuralTrainingModule {
  id: string;
  name: string;
  description: string;
  overview: {
    eli5: string;
    scientificExplanation: BrainScienceLevel[];
  };
  assessmentDrills: NeuralDrill[];
  trainingDrills: NeuralDrill[];
}

export interface BrainScienceLevel {
  level: string;
  keyPoints: string;
  podExploitation: string;
}

export interface DrillSession {
  id: string;
  drillId: string;
  athleteId: string;
  startTime: Date;
  endTime?: Date;
  results: DrillResult[];
  notes?: string;
  status: 'in_progress' | 'completed' | 'cancelled';
}

export interface DrillResult {
  id: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: Date;
  trial: number;
}