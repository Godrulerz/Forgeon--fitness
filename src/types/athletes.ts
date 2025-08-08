export interface Athlete {
  id: string;
  name: string;
  sport: string;
  position: string;
  team: string;
  age: number;
  dateOfBirth: Date;
  height: number; // cm
  weight: number; // kg
  nationality: string;
  email: string;
  phone: string;
  profilePhoto: string;
  status: 'active' | 'injured' | 'recovering' | 'inactive';
  performanceRating: number; // 1-10
  totalAssessments: number;
  lastAssessment: Date;
  lastMedicalCheck?: Date;
  bio: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  performanceMetrics: PerformanceMetric[];
  achievements: Achievement[];
  injuryHistory: InjuryRecord[];
  upcomingEvents: UpcomingEvent[];
  recentNews: NewsItem[];
}

export interface PerformanceMetric {
  id: string;
  name: string;
  category: 'strength' | 'endurance' | 'power' | 'speed' | 'agility' | 'flexibility' | 'body_composition';
  value: number;
  unit: string;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  trendData: number[]; // For sparkline
  percentile: number; // 0-100
  lastUpdated: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  level: 'Local' | 'Regional' | 'National' | 'International';
  category: 'Competition' | 'Record' | 'Award' | 'Milestone';
}

export interface InjuryRecord {
  id: string;
  type: string;
  description: string;
  date: Date;
  recoveryDate?: Date;
  severity: 'minor' | 'moderate' | 'major';
  affectedArea: string;
  treatment: string;
  status: 'recovered' | 'ongoing' | 'chronic';
}

export interface UpcomingEvent {
  id: string;
  name: string;
  date: Date;
  type: 'Competition' | 'Training' | 'Assessment' | 'Medical';
  location: string;
  importance: 'low' | 'medium' | 'high';
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: Date;
  source: string;
  url?: string;
  type: 'performance' | 'injury' | 'achievement' | 'transfer' | 'general';
}