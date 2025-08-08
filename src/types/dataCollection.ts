export interface DataPoint {
  id: string;
  testSessionId: string;
  equipmentId?: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: Date;
  source: 'equipment' | 'manual' | 'calculated';
  technician?: string;
  notes?: string;
  quality: 'valid' | 'flagged' | 'invalid';
}

export interface EquipmentStream {
  equipmentId: string;
  isConnected: boolean;
  lastHeartbeat: Date;
  dataRate: number; // Hz
  calibrationStatus: 'valid' | 'due' | 'overdue';
}

export interface TestProtocol {
  id: string;
  name: string;
  moduleId: string;
  steps: ProtocolStep[];
  expectedDuration: number;
  equipmentRequired: string[];
  dataPoints: string[]; // metric names to collect
}

export interface ProtocolStep {
  id: string;
  order: number;
  instruction: string;
  duration?: number;
  dataCollection: {
    metrics: string[];
    frequency: number; // Hz for continuous, 0 for single point
    validation?: ValidationRule[];
  };
}

export interface ValidationRule {
  metric: string;
  min?: number;
  max?: number;
  required: boolean;
  tolerance?: number; // for test-retest reliability
}

export interface DataCollectionSession {
  id: string;
  testSessionId: string;
  protocolId: string;
  status: 'setup' | 'in_progress' | 'paused' | 'completed' | 'aborted';
  startTime?: Date;
  endTime?: Date;
  currentStep: number;
  dataPoints: DataPoint[];
  equipmentStreams: EquipmentStream[];
  qualityFlags: QualityFlag[];
}

export interface QualityFlag {
  id: string;
  type: 'calibration' | 'outlier' | 'missing' | 'protocol_deviation';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: Date;
  resolved: boolean;
}