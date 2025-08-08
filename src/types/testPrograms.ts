export interface TestProgram {
  id: string;
  name: string;
  moduleId: string;
  category: 'theory' | 'practical' | 'field' | 'lab';
  size: 'small' | 'medium' | 'large';
  estimatedDuration: number; // minutes
  description: string;
  objectives: string[];
  subtests: SubTest[];
  equipment: EquipmentRequirement[];
  acceptanceCriteria: AcceptanceCriteria;
  normativeData?: NormativeReference[];
  prerequisites?: string[];
  contraindications?: string[];
  status: 'draft' | 'active' | 'deprecated';
  version: string;
  lastUpdated: Date;
  createdBy: string;
}

export interface SubTest {
  id: string;
  name: string;
  description: string;
  order: number;
  estimatedDuration: number; // minutes
  category: 'measurement' | 'assessment' | 'calculation';
  required: boolean;
  protocol: TestProtocol;
  dataPoints: DataPointDefinition[];
  equipment: EquipmentRequirement[];
  instructions: string;
  safetyNotes?: string[];
}

export interface TestProtocol {
  id: string;
  name: string;
  steps: ProtocolStep[];
  warmupRequired: boolean;
  warmupDuration?: number;
  cooldownRequired: boolean;
  cooldownDuration?: number;
  restPeriods: RestPeriod[];
  environmentalRequirements: EnvironmentalRequirement[];
  safetyChecklist: SafetyCheckItem[];
}

export interface ProtocolStep {
  id: string;
  order: number;
  title: string;
  instruction: string;
  duration?: number; // seconds, null for unlimited
  type: 'preparation' | 'measurement' | 'exercise' | 'recovery' | 'assessment';
  dataCollection: {
    metrics: string[];
    frequency: number; // Hz, 0 for single point
    validation: ValidationRule[];
    required: boolean;
  };
  visualAids?: string[]; // URLs to images/videos
  notes?: string;
  criticalPoint: boolean; // Must be completed successfully
}

export interface EquipmentRequirement {
  equipmentId: string;
  name: string;
  type: string;
  required: boolean;
  calibrationRequired: boolean;
  calibrationFrequency: number; // days
  accuracy: number; // percentage
  alternatives?: string[]; // Alternative equipment IDs
  setupInstructions: string;
  operatingRange: {
    min: number;
    max: number;
    unit: string;
  };
}

export interface DataPointDefinition {
  id: string;
  name: string;
  description: string;
  unit: string;
  dataType: 'number' | 'boolean' | 'string' | 'enum';
  required: boolean;
  validationRules: ValidationRule[];
  normativeComparison: boolean;
  reportIncluded: boolean;
  calculationFormula?: string; // For derived metrics
  dependsOn?: string[]; // Other data point IDs
}

export interface ValidationRule {
  type: 'range' | 'pattern' | 'custom';
  parameters: Record<string, any>;
  errorMessage: string;
  severity: 'error' | 'warning' | 'info';
}

export interface AcceptanceCriteria {
  passThreshold?: number;
  reliabilityCV?: number; // Coefficient of variation for test-retest
  protocolCompliance: number; // Percentage
  dataQuality: {
    completeness: number; // Percentage
    accuracy: number; // Percentage
    outlierThreshold: number; // Standard deviations
  };
  timeConstraints?: {
    minimum?: number; // minutes
    maximum?: number; // minutes
  };
}

export interface NormativeReference {
  id: string;
  population: string;
  ageRange: { min: number; max: number };
  gender: 'male' | 'female' | 'all';
  sport?: string;
  level?: 'recreational' | 'competitive' | 'elite';
  percentiles: Record<number, number>; // percentile -> value
  categories: {
    poor: { min: number; max: number };
    fair: { min: number; max: number };
    good: { min: number; max: number };
    excellent: { min: number; max: number };
    superior: { min: number; max: number };
  };
  source: string;
  datePublished: Date;
}

export interface RestPeriod {
  afterStep: number;
  duration: number; // seconds
  type: 'passive' | 'active';
  instructions: string;
}

export interface EnvironmentalRequirement {
  parameter: 'temperature' | 'humidity' | 'altitude' | 'noise' | 'lighting';
  range: { min: number; max: number };
  unit: string;
  critical: boolean;
}

export interface SafetyCheckItem {
  id: string;
  description: string;
  required: boolean;
  category: 'equipment' | 'environment' | 'participant' | 'personnel';
  checkMethod: 'visual' | 'measurement' | 'verbal_confirmation';
}

export interface TestExecution {
  id: string;
  testProgramId: string;
  athleteId: string;
  sessionId: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'aborted' | 'failed';
  startTime?: Date;
  endTime?: Date;
  currentStep: number;
  completedSteps: number[];
  dataCollected: ExecutionDataPoint[];
  qualityFlags: QualityFlag[];
  protocolDeviations: ProtocolDeviation[];
  environmentalConditions: Record<string, number>;
  personnel: {
    primaryTechnician: string;
    assistants: string[];
    supervisor?: string;
  };
  notes: string;
  results?: TestResults;
}

export interface ExecutionDataPoint {
  stepId: string;
  metric: string;
  value: number | string | boolean;
  unit?: string;
  timestamp: Date;
  source: 'equipment' | 'manual' | 'calculated';
  quality: 'valid' | 'flagged' | 'invalid';
  technician: string;
  notes?: string;
}

export interface ProtocolDeviation {
  id: string;
  stepId: string;
  type: 'timing' | 'procedure' | 'equipment' | 'environment';
  description: string;
  impact: 'none' | 'minor' | 'moderate' | 'major';
  timestamp: Date;
  approvedBy?: string;
  justification?: string;
}

export interface QualityFlag {
  id: string;
  type: 'calibration' | 'outlier' | 'missing' | 'protocol_deviation' | 'equipment_failure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  stepId?: string;
  dataPointId?: string;
  resolved: boolean;
  resolvedBy?: string;
  resolution?: string;
}

export interface TestResults {
  id: string;
  executionId: string;
  rawData: Record<string, any>;
  processedData: Record<string, any>;
  normativeComparisons: NormativeComparison[];
  qualityScore: number; // 0-100
  reliability: {
    testRetest?: number; // CV percentage
    interRater?: number; // ICC
  };
  interpretation: string;
  recommendations: string[];
  flaggedConcerns: string[];
  reportGenerated: boolean;
  reportUrl?: string;
}

export interface NormativeComparison {
  metric: string;
  value: number;
  percentile: number;
  category: 'poor' | 'fair' | 'good' | 'excellent' | 'superior';
  referencePopulation: string;
  zScore: number;
}