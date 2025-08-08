export interface IntegratedTestingModule {
  id: string;
  name: string;
  description: string;
  subModules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  description: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  description: string;
  type: 'library' | 'builder' | 'calendar' | 'dashboard' | 'alerts';
  features: string[];
  hasCalendar?: boolean;
  hasGraphs?: boolean;
  hasDragDrop?: boolean;
  hasNotifications?: boolean;
}

export interface PeriodizationModel {
  id: string;
  name: string;
  type: 'predefined' | 'custom';
  description: string;
  phases: Phase[];
  totalDuration: number; // weeks
  createdBy?: string;
  isActive: boolean;
}

export interface Phase {
  id: string;
  name: string;
  duration: number; // weeks
  objectives: string[];
  recommendedTests: string[];
  notes?: string;
}

export interface TestSchedule {
  id: string;
  name: string;
  athleteId: string;
  modelId?: string;
  events: ScheduleEvent[];
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'completed';
}

export interface ScheduleEvent {
  id: string;
  testId: string;
  testName: string;
  date: Date;
  time?: string;
  restDaysBefore: number;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface ScheduleTemplate {
  id: string;
  name: string;
  description: string;
  sequence: TemplateEvent[];
  totalDuration: number; // days
  createdBy: string;
}

export interface TemplateEvent {
  id: string;
  dayOffset: number; // D+0, D+7, etc.
  testId: string;
  testName: string;
  notes?: string;
}

export interface MetricAlert {
  id: string;
  name: string;
  athleteId?: string; // if null, applies to all athletes
  metric: string;
  thresholdType: 'min' | 'max' | 'percent_change' | 'trend';
  thresholdValue: number;
  notificationMethod: 'in_app' | 'email' | 'both';
  isActive: boolean;
  notes?: string;
  createdBy: string;
  lastTriggered?: Date;
}

export interface AthleteMetricData {
  athleteId: string;
  athleteName: string;
  metrics: MetricTimeSeries[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface MetricTimeSeries {
  metric: string;
  unit: string;
  dataPoints: DataPoint[];
}

export interface DataPoint {
  date: Date;
  value: number;
  testSessionId: string;
  notes?: string;
}