export interface User {
  id: string;
  name: string;
  email: string;
  role: 'coach' | 'athlete' | 'lab_technician' | 'admin';
  avatar?: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'development';
  testsCount: number;
  completionRate: number;
  icon: string;
}

export interface Test {
  id: string;
  name: string;
  module: string;
  size: 'small' | 'medium' | 'large';
  duration: number;
  equipmentRequired: string[];
  description: string;
  protocol: string;
  acceptanceCriteria: string;
  lastCalibration?: Date;
  nextCalibration?: Date;
}

export interface TestSession {
  id: string;
  testId: string;
  athleteId: string;
  coachId: string;
  scheduledDate: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  results?: TestResult[];
  notes?: string;
}

export interface TestResult {
  id: string;
  metric: string;
  value: number;
  unit: string;
  normative: {
    percentile: number;
    category: 'poor' | 'fair' | 'good' | 'excellent' | 'superior';
  };
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'calibration_due' | 'out_of_service';
  lastCalibration: Date;
  nextCalibration: Date;
  location: string;
  accuracy: number;
}