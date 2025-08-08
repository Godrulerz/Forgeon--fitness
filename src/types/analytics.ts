export interface AnalyticsMetric {
  id: string;
  name: string;
  category: 'strength' | 'endurance' | 'power' | 'flexibility' | 'body_composition';
  category: 'strength' | 'endurance' | 'power' | 'flexibility' | 'body_composition' | 'speed' | 'agility' | 'coordination';
  latestValue: number;
  unit: string;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  trendData: number[]; // For sparkline
  lastUpdated: Date;
  percentile: number; // 0-100
  category_rating: 'poor' | 'fair' | 'good' | 'excellent' | 'superior';
}

export interface CoachInsight {
  id: string;
  athleteId: string;
  metricId?: string;
  title: string;
  description: string;
  type: 'observation' | 'recommendation' | 'alert';
  confidence: number; // 0-100
  generatedAt: Date;
  pinned: boolean;
  coachNotes?: string;
}

export interface ActionItem {
  id: string;
  athleteId: string;
  title: string;
  description: string;
  category: 'training' | 'recovery' | 'nutrition' | 'technique' | 'medical';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  assignedTo?: string;
  acknowledged: boolean;
  completedAt?: Date;
  relatedMetrics: string[];
}

export interface Alert {
  id: string;
  athleteId: string;
  title: string;
  description: string;
  metricId: string;
  threshold: {
    type: 'above' | 'below' | 'change';
    value: number;
  };
  severity: 'low' | 'medium' | 'high';
  isActive: boolean;
  triggeredAt: Date;
  acknowledgedAt?: Date;
  snoozeUntil?: Date;
}

export interface AthleteAnalytics {
  id: string;
  name: string;
  sport: string;
  position: string;
  age: number;
  avatar: string;
  lastAssessment: Date;
  metrics: AnalyticsMetric[];
  insights: CoachInsight[];
  actions: ActionItem[];
  alerts: Alert[];
}

export interface AnalyticsFilter {
  coaches: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: string[];
  athletes: string[];
}

export interface ChartData {
  metricId: string;
  timeSeriesData: {
    date: Date;
    value: number;
    athleteId: string;
  }[];
  normativeData?: {
    percentile25: number;
    percentile50: number;
    percentile75: number;
    mean: number;
  };
  cohortComparison?: {
    group: string;
    mean: number;
    standardDeviation: number;
  }[];
}