export interface HealthRelatedModule {
  id: string;
  name: string;
  description: string;
  subModules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  description: string;
  tests: FitnessTest[];
}

export interface FitnessTest {
  id: string;
  name: string;
  description: string;
  category: 'body_composition' | 'aerobic_endurance' | 'strength_endurance' | 'flexibility' | 'balance';
  estimatedDuration: number; // minutes
  equipmentRequired: string[];
  instructions: string;
  dataFields: DataField[];
  hasTimer?: boolean;
  hasMedia?: boolean;
  calculations?: Calculation[];
}

export interface DataField {
  id: string;
  name: string;
  type: 'number' | 'text' | 'dropdown' | 'boolean' | 'time';
  unit?: string;
  required: boolean;
  options?: string[]; // for dropdown
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface Calculation {
  id: string;
  name: string;
  formula: string;
  unit: string;
  dependsOn: string[]; // field IDs
}

export interface TestSession {
  id: string;
  athleteId: string;
  testId: string;
  coachId: string;
  startTime: Date;
  endTime?: Date;
  data: Record<string, any>;
  media?: MediaAttachment[];
  notes?: string;
  status: 'in_progress' | 'completed' | 'cancelled';
}

export interface MediaAttachment {
  id: string;
  type: 'photo' | 'video';
  url: string;
  caption?: string;
  timestamp: Date;
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
  height: number; // cm
  weight: number; // kg
  photo?: string;
  medicalNotes?: string;
  lastSession?: Date;
  sessions: TestSession[];
}