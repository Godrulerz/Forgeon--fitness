import { AnalyticsMetric, CoachInsight, ActionItem, Alert, AthleteAnalytics } from '../types/analytics';

export const mockAthleteAnalytics: AthleteAnalytics[] = [
  {
    id: 'athlete-1',
    name: 'Alex Rodriguez',
    sport: 'Soccer',
    position: 'Midfielder',
    age: 24,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastAssessment: new Date('2024-12-20'),
    metrics: [
      // Module 1: Foundations - Theory Scores
      {
        id: 'theory-exam-alex',
        name: 'Theory Exam Score',
        category: 'knowledge',
        latestValue: 89,
        unit: '%',
        changePercent: 2.3,
        trend: 'up',
        trendData: [82, 84, 86, 87, 89, 88, 89],
        lastUpdated: new Date('2024-12-20'),
        percentile: 75,
        category_rating: 'good'
      },
      // Module 2: Health-Related Fitness - Body Composition
      {
        id: 'dexa-total-mass-alex',
        name: 'Total Body Mass (DEXA)',
        category: 'body_composition',
        latestValue: 72.5,
        unit: 'kg',
        changePercent: 1.2,
        trend: 'up',
        trendData: [70.8, 71.2, 71.6, 72.0, 72.5, 72.3, 72.5],
        lastUpdated: new Date('2024-12-20'),
        percentile: 65,
        category_rating: 'good'
      },
      {
        id: 'dexa-fat-mass-alex',
        name: 'Fat Mass (DEXA)',
        category: 'body_composition',
        latestValue: 7.1,
        unit: 'kg',
        changePercent: -2.1,
        trend: 'up',
        trendData: [7.8, 7.6, 7.4, 7.2, 7.1, 7.2, 7.1],
        lastUpdated: new Date('2024-12-20'),
        percentile: 85,
        category_rating: 'excellent'
      },
      {
        id: 'dexa-lean-mass-alex',
        name: 'Lean Mass (DEXA)',
        category: 'body_composition',
        latestValue: 62.8,
        unit: 'kg',
        changePercent: 1.8,
        trend: 'up',
        trendData: [60.2, 61.0, 61.8, 62.3, 62.8, 62.5, 62.8],
        lastUpdated: new Date('2024-12-20'),
        percentile: 78,
        category_rating: 'good'
      },
      {
        id: 'skinfolds-sum-alex',
        name: 'Sum of 7 Skinfolds',
        category: 'body_composition',
        latestValue: 58.2,
        unit: 'mm',
        changePercent: -3.2,
        trend: 'up',
        trendData: [65.1, 62.8, 60.5, 59.2, 58.2, 59.0, 58.2],
        lastUpdated: new Date('2024-12-19'),
        percentile: 82,
        category_rating: 'excellent'
      },
      {
        id: 'bia-body-fat-alex',
        name: 'Body Fat % (BIA)',
        category: 'body_composition',
        latestValue: 9.8,
        unit: '%',
        changePercent: -1.2,
        trend: 'up',
        trendData: [10.8, 10.5, 10.2, 9.9, 9.8, 9.9, 9.8],
        lastUpdated: new Date('2024-12-19'),
        percentile: 90,
        category_rating: 'excellent'
      },
      {
        id: 'waist-hip-ratio-alex',
        name: 'Waist-Hip Ratio',
        category: 'body_composition',
        latestValue: 0.82,
        unit: 'ratio',
        changePercent: -1.8,
        trend: 'up',
        trendData: [0.86, 0.85, 0.84, 0.83, 0.82, 0.83, 0.82],
        lastUpdated: new Date('2024-12-18'),
        percentile: 88,
        category_rating: 'excellent'
      },
      // Module 2: Aerobic Endurance
      {
        id: 'vo2max-alex',
        name: 'VO₂ Max',
        category: 'endurance',
        latestValue: 58.3,
        unit: 'ml/kg/min',
        changePercent: 3.2,
        trend: 'up',
        trendData: [54.2, 55.1, 56.3, 57.2, 58.3, 57.9, 58.3],
        lastUpdated: new Date('2024-12-20'),
        percentile: 85,
        category_rating: 'excellent'
      },
      {
        id: 'max-hr-alex',
        name: 'Maximum Heart Rate',
        category: 'endurance',
        latestValue: 195,
        unit: 'bpm',
        changePercent: 0.5,
        trend: 'stable',
        trendData: [194, 194, 195, 195, 195, 194, 195],
        lastUpdated: new Date('2024-12-20'),
        percentile: 72,
        category_rating: 'good'
      },
      {
        id: 'shuttle-run-level-alex',
        name: '20m Shuttle Run Level',
        category: 'endurance',
        latestValue: 14.2,
        unit: 'level',
        changePercent: 4.8,
        trend: 'up',
        trendData: [12.8, 13.2, 13.6, 14.0, 14.2, 14.0, 14.2],
        lastUpdated: new Date('2024-12-19'),
        percentile: 83,
        category_rating: 'excellent'
      },
      {
        id: 'cooper-12min-alex',
        name: 'Cooper 12-min Distance',
        category: 'endurance',
        latestValue: 3250,
        unit: 'm',
        changePercent: 2.8,
        trend: 'up',
        trendData: [3080, 3120, 3180, 3220, 3250, 3230, 3250],
        lastUpdated: new Date('2024-12-18'),
        percentile: 86,
        category_rating: 'excellent'
      },
      // Module 2: Strength & Endurance
      {
        id: 'bench-press-1rm-alex',
        name: '1RM Bench Press',
        category: 'strength',
        latestValue: 85,
        unit: 'kg',
        changePercent: 3.7,
        trend: 'up',
        trendData: [78, 80, 82, 84, 85, 84, 85],
        lastUpdated: new Date('2024-12-17'),
        percentile: 75,
        category_rating: 'good'
      },
      {
        id: 'squat-1rm-alex',
        name: '1RM Back Squat',
        category: 'strength',
        latestValue: 125,
        unit: 'kg',
        changePercent: 4.2,
        trend: 'up',
        trendData: [115, 118, 121, 123, 125, 124, 125],
        lastUpdated: new Date('2024-12-17'),
        percentile: 80,
        category_rating: 'excellent'
      },
      {
        id: 'pushup-endurance-alex',
        name: 'Push-up Endurance',
        category: 'strength',
        latestValue: 68,
        unit: 'reps',
        changePercent: 6.2,
        trend: 'up',
        trendData: [58, 61, 64, 66, 68, 67, 68],
        lastUpdated: new Date('2024-12-16'),
        percentile: 88,
        category_rating: 'excellent'
      },
      {
        id: 'plank-hold-alex',
        name: 'Plank Hold Time',
        category: 'strength',
        latestValue: 185,
        unit: 's',
        changePercent: 8.8,
        trend: 'up',
        trendData: [155, 165, 172, 178, 185, 182, 185],
        lastUpdated: new Date('2024-12-16'),
        percentile: 85,
        category_rating: 'excellent'
      },
      // Module 2: Flexibility
      {
        id: 'sit-reach-alex',
        name: 'Sit & Reach',
        category: 'flexibility',
        latestValue: 32.5,
        unit: 'cm',
        changePercent: 1.8,
        trend: 'up',
        trendData: [30.0, 30.8, 31.5, 32.0, 32.5, 32.2, 32.5],
        lastUpdated: new Date('2024-12-16'),
        percentile: 72,
        category_rating: 'good'
      },
      {
        id: 'fms-total-alex',
        name: 'FMS Total Score',
        category: 'flexibility',
        latestValue: 16,
        unit: 'points',
        changePercent: 6.7,
        trend: 'up',
        trendData: [14, 14, 15, 15, 16, 15, 16],
        lastUpdated: new Date('2024-12-15'),
        percentile: 78,
        category_rating: 'good'
      },
      {
        id: 'shoulder-flexion-alex',
        name: 'Shoulder Flexion ROM',
        category: 'flexibility',
        latestValue: 175,
        unit: '°',
        changePercent: 2.9,
        trend: 'up',
        trendData: [168, 170, 172, 174, 175, 174, 175],
        lastUpdated: new Date('2024-12-15'),
        percentile: 82,
        category_rating: 'excellent'
      },
      // Module 3: Skill-Related Performance - Power
      {
        id: 'wingate-peak-power-alex',
        name: 'Wingate Peak Power',
        category: 'power',
        latestValue: 1285,
        unit: 'W',
        changePercent: 3.8,
        trend: 'up',
        trendData: [1180, 1220, 1250, 1270, 1285, 1275, 1285],
        lastUpdated: new Date('2024-12-19'),
        percentile: 82,
        category_rating: 'excellent'
      },
      {
        id: 'vertical-jump-alex',
        name: 'Vertical Jump',
        category: 'power',
        latestValue: 62.5,
        unit: 'cm',
        changePercent: 2.1,
        trend: 'up',
        trendData: [58.1, 59.2, 60.0, 61.8, 62.5, 61.9, 62.5],
        lastUpdated: new Date('2024-12-19'),
        percentile: 78,
        category_rating: 'good'
      },
      {
        id: 'broad-jump-alex',
        name: 'Broad Jump',
        category: 'power',
        latestValue: 285,
        unit: 'cm',
        changePercent: 2.9,
        trend: 'up',
        trendData: [268, 272, 278, 282, 285, 283, 285],
        lastUpdated: new Date('2024-12-19'),
        percentile: 80,
        category_rating: 'excellent'
      },
      // Module 3: Speed & Agility
      {
        id: 'sprint-5m-alex',
        name: '5m Sprint',
        category: 'speed',
        latestValue: 1.02,
        unit: 's',
        changePercent: -1.9,
        trend: 'up',
        trendData: [1.08, 1.06, 1.04, 1.03, 1.02, 1.03, 1.02],
        lastUpdated: new Date('2024-12-18'),
        percentile: 85,
        category_rating: 'excellent'
      },
      {
        id: 'sprint-10m-alex',
        name: '10m Sprint',
        category: 'speed',
        latestValue: 1.68,
        unit: 's',
        changePercent: -2.3,
        trend: 'up',
        trendData: [1.78, 1.74, 1.71, 1.69, 1.68, 1.70, 1.68],
        lastUpdated: new Date('2024-12-18'),
        percentile: 83,
        category_rating: 'excellent'
      },
      {
        id: 'sprint-30m-alex',
        name: '30m Sprint',
        category: 'speed',
        latestValue: 4.12,
        unit: 's',
        changePercent: -2.8,
        trend: 'up',
        trendData: [4.35, 4.28, 4.22, 4.18, 4.15, 4.12, 4.12],
        lastUpdated: new Date('2024-12-18'),
        percentile: 82,
        category_rating: 'excellent'
      },
      {
        id: 't-test-alex',
        name: 'T-Test Agility',
        category: 'agility',
        latestValue: 9.45,
        unit: 's',
        changePercent: -1.8,
        trend: 'up',
        trendData: [9.85, 9.72, 9.58, 9.51, 9.45, 9.48, 9.45],
        lastUpdated: new Date('2024-12-17'),
        percentile: 88,
        category_rating: 'excellent'
      },
      {
        id: 'illinois-agility-alex',
        name: 'Illinois Agility',
        category: 'agility',
        latestValue: 15.2,
        unit: 's',
        changePercent: -2.6,
        trend: 'up',
        trendData: [16.1, 15.8, 15.5, 15.3, 15.2, 15.4, 15.2],
        lastUpdated: new Date('2024-12-17'),
        percentile: 86,
        category_rating: 'excellent'
      },
      {
        id: 'yoyo-ir-alex',
        name: 'Yo-Yo IR Test Level',
        category: 'agility',
        latestValue: 18.5,
        unit: 'level',
        changePercent: 5.7,
        trend: 'up',
        trendData: [16.2, 16.8, 17.4, 18.0, 18.5, 18.2, 18.5],
        lastUpdated: new Date('2024-12-17'),
        percentile: 89,
        category_rating: 'excellent'
      },
      // Module 3: Reaction & Coordination
      {
        id: 'reaction-time-light-alex',
        name: 'Reaction Time (Light)',
        category: 'coordination',
        latestValue: 0.185,
        unit: 's',
        changePercent: -8.4,
        trend: 'up',
        trendData: [0.218, 0.205, 0.195, 0.188, 0.185, 0.190, 0.185],
        lastUpdated: new Date('2024-12-16'),
        percentile: 82,
        category_rating: 'excellent'
      },
      {
        id: 'reaction-time-sound-alex',
        name: 'Reaction Time (Sound)',
        category: 'coordination',
        latestValue: 0.168,
        unit: 's',
        changePercent: -6.7,
        trend: 'up',
        trendData: [0.195, 0.185, 0.178, 0.172, 0.168, 0.175, 0.168],
        lastUpdated: new Date('2024-12-16'),
        percentile: 85,
        category_rating: 'excellent'
      },
      {
        id: 'patellar-reflex-alex',
        name: 'Patellar Reflex (DTR)',
        category: 'coordination',
        latestValue: 2,
        unit: 'grade',
        changePercent: 0,
        trend: 'stable',
        trendData: [2, 2, 2, 2, 2, 2, 2],
        lastUpdated: new Date('2024-12-15'),
        percentile: 95,
        category_rating: 'excellent'
      },
      // Module 3: Functional Fitness
      {
        id: 'ioct-time-alex',
        name: 'IOCT Completion Time',
        category: 'functional',
        latestValue: 125.8,
        unit: 's',
        changePercent: -4.2,
        trend: 'up',
        trendData: [138.5, 134.2, 130.8, 128.1, 125.8, 127.5, 125.8],
        lastUpdated: new Date('2024-12-14'),
        percentile: 87,
        category_rating: 'excellent'
      },
      // Additional Comprehensive Metrics
      {
        id: 'resting-hr-alex',
        name: 'Resting Heart Rate',
        category: 'cardiovascular',
        latestValue: 52,
        unit: 'bpm',
        changePercent: -3.7,
        trend: 'up',
        trendData: [58, 56, 54, 53, 52, 53, 52],
        lastUpdated: new Date('2024-12-20'),
        percentile: 92,
        category_rating: 'excellent'
      },
      {
        id: 'blood-pressure-sys-alex',
        name: 'Systolic Blood Pressure',
        category: 'cardiovascular',
        latestValue: 118,
        unit: 'mmHg',
        changePercent: -1.7,
        trend: 'stable',
        trendData: [122, 121, 120, 119, 118, 119, 118],
        lastUpdated: new Date('2024-12-20'),
        percentile: 88,
        category_rating: 'excellent'
      },
      {
        id: 'blood-pressure-dia-alex',
        name: 'Diastolic Blood Pressure',
        category: 'cardiovascular',
        latestValue: 75,
        unit: 'mmHg',
        changePercent: -2.6,
        trend: 'stable',
        trendData: [79, 78, 77, 76, 75, 76, 75],
        lastUpdated: new Date('2024-12-20'),
        percentile: 85,
        category_rating: 'excellent'
      },
      {
        id: 'hydration-status-alex',
        name: 'Hydration Status',
        category: 'body_composition',
        latestValue: 62.5,
        unit: '%',
        changePercent: 1.6,
        trend: 'stable',
        trendData: [60.8, 61.2, 61.8, 62.2, 62.5, 62.3, 62.5],
        lastUpdated: new Date('2024-12-19'),
        percentile: 78,
        category_rating: 'good'
      },
      {
        id: 'lactate-threshold-alex',
        name: 'Lactate Threshold',
        category: 'endurance',
        latestValue: 4.2,
        unit: 'mmol/L',
        changePercent: -5.4,
        trend: 'up',
        trendData: [4.8, 4.6, 4.5, 4.3, 4.2, 4.3, 4.2],
        lastUpdated: new Date('2024-12-18'),
        percentile: 85,
        category_rating: 'excellent'
      },
      {
        id: 'flexibility-alex',
        name: 'Sit & Reach',
        category: 'flexibility',
        latestValue: 32.5,
        unit: 'cm',
        changePercent: 1.8,
        trend: 'up',
        trendData: [30.0, 30.8, 31.5, 32.0, 32.5, 32.2, 32.5],
        lastUpdated: new Date('2024-12-16'),
        percentile: 72,
        category_rating: 'good'
      }
    ],
    insights: [
      {
        id: 'insight-alex-1',
        athleteId: 'athlete-1',
        metricId: 'vo2max-alex',
        title: 'Excellent Aerobic Progress',
        description: 'VO₂ Max has improved 3.2% over the last 6 weeks, indicating strong cardiovascular adaptation to current training.',
        type: 'observation',
        confidence: 94,
        generatedAt: new Date('2024-12-20'),
        pinned: true
      },
      {
        id: 'insight-alex-2',
        athleteId: 'athlete-1',
        metricId: 'sprint-30m-alex',
        title: 'Speed Development Success',
        description: 'Sprint times have improved significantly. Consider maintaining current speed training protocol.',
        type: 'recommendation',
        confidence: 88,
        generatedAt: new Date('2024-12-18'),
        pinned: false
      }
    ],
    actions: [
      {
        id: 'action-alex-1',
        athleteId: 'athlete-1',
        title: 'Maintain Current Training Load',
        description: 'Continue current aerobic training protocol as adaptations are progressing well',
        category: 'training',
        priority: 'medium',
        dueDate: new Date('2024-12-28'),
        acknowledged: false,
        relatedMetrics: ['vo2max-alex']
      },
      {
        id: 'action-alex-2',
        athleteId: 'athlete-1',
        title: 'Flexibility Focus Session',
        description: 'Add dedicated flexibility work to improve sit-and-reach scores',
        category: 'training',
        priority: 'low',
        dueDate: new Date('2024-12-30'),
        acknowledged: false,
        relatedMetrics: ['flexibility-alex']
      }
    ],
    alerts: []
  },
  {
    id: 'athlete-2',
    name: 'Emma Johnson',
    sport: 'Basketball',
    position: 'Point Guard',
    age: 22,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastAssessment: new Date('2024-12-19'),
    metrics: [
      {
        id: 'vo2max-emma',
        name: 'VO₂ Max',
        category: 'endurance',
        latestValue: 52.1,
        unit: 'ml/kg/min',
        changePercent: -1.8,
        trend: 'down',
        trendData: [55.2, 54.8, 53.9, 53.1, 52.8, 52.1, 52.1],
        lastUpdated: new Date('2024-12-19'),
        percentile: 68,
        category_rating: 'good'
      },
      {
        id: 'vertical-jump-emma',
        name: 'Vertical Jump',
        category: 'power',
        latestValue: 58.8,
        unit: 'cm',
        changePercent: 4.2,
        trend: 'up',
        trendData: [54.1, 55.2, 56.8, 57.5, 58.8, 58.2, 58.8],
        lastUpdated: new Date('2024-12-18'),
        percentile: 82,
        category_rating: 'excellent'
      },
      {
        id: 'agility-emma',
        name: 'T-Test Agility',
        category: 'agility',
        latestValue: 9.85,
        unit: 's',
        changePercent: -3.1,
        trend: 'up',
        trendData: [10.45, 10.28, 10.12, 9.98, 9.85, 9.92, 9.85],
        lastUpdated: new Date('2024-12-17'),
        percentile: 88,
        category_rating: 'excellent'
      },
      {
        id: 'strength-emma',
        name: '1RM Squat',
        category: 'strength',
        latestValue: 95,
        unit: 'kg',
        changePercent: 2.7,
        trend: 'up',
        trendData: [88, 90, 92, 94, 95, 94, 95],
        lastUpdated: new Date('2024-12-16'),
        percentile: 75,
        category_rating: 'good'
      }
    ],
    insights: [
      {
        id: 'insight-emma-1',
        athleteId: 'athlete-2',
        metricId: 'vo2max-emma',
        title: 'Aerobic Capacity Decline',
        description: 'VO₂ Max has decreased 1.8% over recent weeks. Consider reviewing training load and recovery.',
        type: 'alert',
        confidence: 85,
        generatedAt: new Date('2024-12-19'),
        pinned: true
      },
      {
        id: 'insight-emma-2',
        athleteId: 'athlete-2',
        metricId: 'vertical-jump-emma',
        title: 'Power Development Trending Well',
        description: 'Vertical jump improvements suggest effective plyometric training adaptations.',
        type: 'observation',
        confidence: 91,
        generatedAt: new Date('2024-12-18'),
        pinned: false
      }
    ],
    actions: [
      {
        id: 'action-emma-1',
        athleteId: 'athlete-2',
        title: 'Review Training Load',
        description: 'Assess current training volume and intensity due to VO₂ decline',
        category: 'recovery',
        priority: 'high',
        dueDate: new Date('2024-12-25'),
        acknowledged: false,
        relatedMetrics: ['vo2max-emma']
      },
      {
        id: 'action-emma-2',
        athleteId: 'athlete-2',
        title: 'Continue Plyometric Program',
        description: 'Maintain current jump training as adaptations are positive',
        category: 'training',
        priority: 'medium',
        dueDate: new Date('2024-12-30'),
        acknowledged: false,
        relatedMetrics: ['vertical-jump-emma']
      }
    ],
    alerts: [
      {
        id: 'alert-emma-1',
        athleteId: 'athlete-2',
        title: 'VO₂ Max Decline Alert',
        description: 'VO₂ Max has dropped below expected range',
        metricId: 'vo2max-emma',
        threshold: {
          type: 'below',
          value: 53
        },
        severity: 'medium',
        isActive: true,
        triggeredAt: new Date('2024-12-19T14:30:00')
      }
    ]
  },
  {
    id: 'athlete-3',
    name: 'Marcus Chen',
    sport: 'Track & Field',
    position: 'Sprinter',
    age: 26,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastAssessment: new Date('2024-12-18'),
    metrics: [
      {
        id: 'sprint-100m-marcus',
        name: '100m Sprint',
        category: 'speed',
        latestValue: 10.85,
        unit: 's',
        changePercent: -1.2,
        trend: 'up',
        trendData: [11.12, 11.05, 10.98, 10.92, 10.85, 10.88, 10.85],
        lastUpdated: new Date('2024-12-18'),
        percentile: 92,
        category_rating: 'excellent'
      },
      {
        id: 'power-marcus',
        name: 'Wingate Peak Power',
        category: 'power',
        latestValue: 1420,
        unit: 'W',
        changePercent: 5.8,
        trend: 'up',
        trendData: [1280, 1320, 1360, 1390, 1420, 1410, 1420],
        lastUpdated: new Date('2024-12-17'),
        percentile: 95,
        category_rating: 'superior'
      },
      {
        id: 'reaction-time-marcus',
        name: 'Reaction Time',
        category: 'coordination',
        latestValue: 0.142,
        unit: 's',
        changePercent: -8.4,
        trend: 'up',
        trendData: [0.168, 0.162, 0.155, 0.148, 0.142, 0.145, 0.142],
        lastUpdated: new Date('2024-12-16'),
        percentile: 88,
        category_rating: 'excellent'
      },
      {
        id: 'body-fat-marcus',
        name: 'Body Fat',
        category: 'body_composition',
        latestValue: 7.2,
        unit: '%',
        changePercent: -0.5,
        trend: 'stable',
        trendData: [7.8, 7.6, 7.4, 7.3, 7.2, 7.2, 7.2],
        lastUpdated: new Date('2024-12-15'),
        percentile: 95,
        category_rating: 'superior'
      }
    ],
    insights: [
      {
        id: 'insight-marcus-1',
        athleteId: 'athlete-3',
        metricId: 'sprint-100m-marcus',
        title: 'Peak Sprint Performance',
        description: 'Sprint times are approaching personal best levels. Focus on maintaining current form.',
        type: 'observation',
        confidence: 96,
        generatedAt: new Date('2024-12-18'),
        pinned: true
      },
      {
        id: 'insight-marcus-2',
        athleteId: 'athlete-3',
        metricId: 'reaction-time-marcus',
        title: 'Reaction Time Optimization',
        description: 'Significant improvement in reaction time suggests enhanced neuromuscular efficiency.',
        type: 'observation',
        confidence: 89,
        generatedAt: new Date('2024-12-16'),
        pinned: false
      }
    ],
    actions: [
      {
        id: 'action-marcus-1',
        athleteId: 'athlete-3',
        title: 'Competition Preparation',
        description: 'Begin competition taper protocol to peak for upcoming meets',
        category: 'training',
        priority: 'high',
        dueDate: new Date('2024-12-26'),
        acknowledged: false,
        relatedMetrics: ['sprint-100m-marcus', 'power-marcus']
      },
      {
        id: 'action-marcus-2',
        athleteId: 'athlete-3',
        title: 'Maintain Reaction Training',
        description: 'Continue current reaction time training protocols',
        category: 'training',
        priority: 'medium',
        dueDate: new Date('2025-01-02'),
        acknowledged: false,
        relatedMetrics: ['reaction-time-marcus']
      }
    ],
    alerts: []
  },
  {
    id: 'athlete-4',
    name: 'Sofia Martinez',
    sport: 'Swimming',
    position: 'Distance Freestyle',
    age: 20,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastAssessment: new Date('2024-12-17'),
    metrics: [
      {
        id: 'vo2max-sofia',
        name: 'VO₂ Max',
        category: 'endurance',
        latestValue: 64.2,
        unit: 'ml/kg/min',
        changePercent: 1.8,
        trend: 'up',
        trendData: [61.8, 62.5, 63.1, 63.8, 64.2, 63.9, 64.2],
        lastUpdated: new Date('2024-12-17'),
        percentile: 98,
        category_rating: 'superior'
      },
      {
        id: 'lactate-threshold-sofia',
        name: 'Lactate Threshold',
        category: 'endurance',
        latestValue: 4.2,
        unit: 'mmol/L',
        changePercent: -2.1,
        trend: 'up',
        trendData: [4.8, 4.6, 4.5, 4.3, 4.2, 4.3, 4.2],
        lastUpdated: new Date('2024-12-16'),
        percentile: 85,
        category_rating: 'excellent'
      },
      {
        id: 'shoulder-flexibility-sofia',
        name: 'Shoulder Flexibility',
        category: 'flexibility',
        latestValue: 185,
        unit: '°',
        changePercent: 2.8,
        trend: 'up',
        trendData: [175, 178, 180, 182, 185, 184, 185],
        lastUpdated: new Date('2024-12-15'),
        percentile: 92,
        category_rating: 'excellent'
      },
      {
        id: 'core-strength-sofia',
        name: 'Plank Hold',
        category: 'strength',
        latestValue: 285,
        unit: 's',
        changePercent: 8.2,
        trend: 'up',
        trendData: [245, 255, 265, 275, 285, 280, 285],
        lastUpdated: new Date('2024-12-14'),
        percentile: 88,
        category_rating: 'excellent'
      }
    ],
    insights: [
      {
        id: 'insight-sofia-1',
        athleteId: 'athlete-4',
        metricId: 'vo2max-sofia',
        title: 'Elite Aerobic Capacity',
        description: 'VO₂ Max values are in the superior range for distance swimmers. Excellent base fitness.',
        type: 'observation',
        confidence: 97,
        generatedAt: new Date('2024-12-17'),
        pinned: true
      },
      {
        id: 'insight-sofia-2',
        athleteId: 'athlete-4',
        metricId: 'core-strength-sofia',
        title: 'Core Strength Gains',
        description: 'Significant improvement in core endurance supports stroke efficiency development.',
        type: 'observation',
        confidence: 92,
        generatedAt: new Date('2024-12-14'),
        pinned: false
      }
    ],
    actions: [
      {
        id: 'action-sofia-1',
        athleteId: 'athlete-4',
        title: 'Race Pace Training',
        description: 'Incorporate more race-specific pace work to optimize lactate threshold',
        category: 'training',
        priority: 'medium',
        dueDate: new Date('2024-12-27'),
        acknowledged: false,
        relatedMetrics: ['lactate-threshold-sofia']
      },
      {
        id: 'action-sofia-2',
        athleteId: 'athlete-4',
        title: 'Maintain Flexibility Routine',
        description: 'Continue current shoulder mobility work to support stroke mechanics',
        category: 'training',
        priority: 'low',
        dueDate: new Date('2025-01-03'),
        acknowledged: false,
        relatedMetrics: ['shoulder-flexibility-sofia']
      }
    ],
    alerts: []
  },
  {
    id: 'athlete-5',
    name: 'James Wilson',
    sport: 'Football',
    position: 'Linebacker',
    age: 23,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastAssessment: new Date('2024-12-16'),
    metrics: [
      {
        id: 'bench-press-james',
        name: '1RM Bench Press',
        category: 'strength',
        latestValue: 145,
        unit: 'kg',
        changePercent: 6.2,
        trend: 'up',
        trendData: [132, 135, 138, 142, 145, 144, 145],
        lastUpdated: new Date('2024-12-16'),
        percentile: 85,
        category_rating: 'excellent'
      },
      {
        id: 'squat-james',
        name: '1RM Squat',
        category: 'strength',
        latestValue: 185,
        unit: 'kg',
        changePercent: 4.8,
        trend: 'up',
        trendData: [168, 172, 176, 180, 185, 183, 185],
        lastUpdated: new Date('2024-12-15'),
        percentile: 88,
        category_rating: 'excellent'
      },
      {
        id: 'power-to-weight-alex',
        name: 'Power-to-Weight Ratio',
        category: 'power',
        latestValue: 17.8,
        unit: 'W/kg',
        changePercent: 2.9,
        trend: 'up',
        trendData: [16.5, 16.9, 17.2, 17.5, 17.8, 17.6, 17.8],
        lastUpdated: new Date('2024-12-19'),
        percentile: 84,
        category_rating: 'excellent'
      },
      {
        id: 'body-weight-james',
        name: 'Body Weight',
        category: 'body_composition',
        latestValue: 102,
        unit: 'kg',
        changePercent: 1.2,
        trend: 'up',
        trendData: [98, 99, 100, 101, 102, 101, 102],
        lastUpdated: new Date('2024-12-13'),
        percentile: 75,
        category_rating: 'good'
      }
    ],
    insights: [
      {
        id: 'insight-james-1',
        athleteId: 'athlete-5',
        metricId: 'bench-press-james',
        title: 'Strength Gains Accelerating',
        description: 'Upper body strength improvements are ahead of schedule. Consider progressive overload adjustments.',
        type: 'recommendation',
        confidence: 91,
        generatedAt: new Date('2024-12-16'),
        pinned: true
      },
      {
        id: 'insight-james-2',
        athleteId: 'athlete-5',
        metricId: 'agility-james',
        title: 'Agility Improvement',
        description: 'Change of direction speed is improving, supporting on-field performance goals.',
        type: 'observation',
        confidence: 86,
        generatedAt: new Date('2024-12-14'),
        pinned: false
      }
    ],
    actions: [
      {
        id: 'action-james-1',
        athleteId: 'athlete-5',
        title: 'Increase Training Load',
        description: 'Progress to next strength training phase based on recent gains',
        category: 'training',
        priority: 'medium',
        dueDate: new Date('2024-12-28'),
        acknowledged: false,
        relatedMetrics: ['bench-press-james', 'squat-james']
      },
      {
        id: 'action-james-2',
        athleteId: 'athlete-5',
        title: 'Monitor Body Composition',
        description: 'Track weight gain to ensure it\'s lean mass, not fat mass',
        category: 'nutrition',
        priority: 'low',
        dueDate: new Date('2025-01-05'),
        acknowledged: false,
        relatedMetrics: ['body-weight-james']
      }
    ],
    alerts: []
  }
];

// Legacy exports for backward compatibility
export const mockAnalyticsData: AnalyticsMetric[] = mockAthleteAnalytics.flatMap(athlete => athlete.metrics);
export const mockInsights: CoachInsight[] = mockAthleteAnalytics.flatMap(athlete => athlete.insights);
export const mockActions: ActionItem[] = mockAthleteAnalytics.flatMap(athlete => athlete.actions);
export const mockAlerts: Alert[] = mockAthleteAnalytics.flatMap(athlete => athlete.alerts);