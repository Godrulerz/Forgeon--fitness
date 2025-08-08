import { IntegratedTestingModule, PeriodizationModel, ScheduleTemplate, MetricAlert } from '../types/integratedTesting';

export const integratedTestingModule: IntegratedTestingModule = {
  id: 'module-4',
  name: 'Integrated Testing & Periodization',
  description: 'Strategic planning, scheduling, and longitudinal monitoring of fitness assessments',
  subModules: [
    {
      id: 'sub-4-1',
      name: 'Training Periodization Models',
      description: 'Predefined and custom periodization models for systematic training progression',
      screens: [
        {
          id: 'model-library',
          name: 'Model Library',
          description: 'Browse and select from predefined periodization models',
          type: 'library',
          features: [
            'OPT™ Model (NASM)',
            'Linear Periodization',
            'Block Periodization', 
            'Daily Undulating Periodization',
            'Conjugate Method'
          ]
        },
        {
          id: 'custom-builder',
          name: 'Custom Model Builder',
          description: 'Create custom periodization models tailored to specific needs',
          type: 'builder',
          features: [
            'Phase configuration',
            'Duration planning',
            'Test recommendation engine',
            'Model validation'
          ]
        }
      ]
    },
    {
      id: 'sub-4-2',
      name: 'Testing Schedule Design',
      description: 'Calendar-based scheduling and template creation for systematic testing',
      screens: [
        {
          id: 'calendar-view',
          name: 'Calendar View',
          description: 'Interactive calendar for scheduling tests with conflict detection',
          type: 'calendar',
          hasCalendar: true,
          hasDragDrop: true,
          features: [
            'Drag-and-drop scheduling',
            'Rest interval validation',
            'Conflict detection',
            'Multi-athlete view'
          ]
        },
        {
          id: 'template-editor',
          name: 'Schedule Template Editor',
          description: 'Create reusable testing schedule templates',
          type: 'builder',
          features: [
            'Sequence builder',
            'Day offset configuration',
            'Template preview',
            'Reusable templates'
          ]
        }
      ]
    },
    {
      id: 'sub-4-3',
      name: 'Longitudinal Monitoring & Data Integration',
      description: 'Track performance trends and set up automated alerts for key metrics',
      screens: [
        {
          id: 'athlete-dashboard',
          name: 'Athlete Dashboard',
          description: 'Comprehensive view of athlete performance trends over time',
          type: 'dashboard',
          hasGraphs: true,
          features: [
            'Multi-metric trending',
            'Interactive graphs',
            'Date range selection',
            'Performance annotations'
          ]
        },
        {
          id: 'metric-alerts',
          name: 'Metric Alerts & Thresholds',
          description: 'Set up automated alerts for performance thresholds and changes',
          type: 'alerts',
          hasNotifications: true,
          features: [
            'Threshold monitoring',
            'Trend analysis',
            'Multi-channel notifications',
            'Alert management'
          ]
        }
      ]
    }
  ]
};

export const predefinedModels: PeriodizationModel[] = [
  {
    id: 'opt-model',
    name: 'OPT™ Model (NASM)',
    type: 'predefined',
    description: 'NASM Optimum Performance Training model with systematic progression',
    totalDuration: 12,
    isActive: true,
    phases: [
      {
        id: 'phase-1',
        name: 'Stabilization Endurance',
        duration: 4,
        objectives: [
          'Improve muscular endurance',
          'Enhance joint stability',
          'Increase neuromuscular efficiency'
        ],
        recommendedTests: [
          'Overhead Squat Assessment',
          'Single-Leg Squat',
          'Pushing Assessment',
          'Pulling Assessment'
        ]
      },
      {
        id: 'phase-2',
        name: 'Strength Endurance',
        duration: 4,
        objectives: [
          'Improve stabilization endurance',
          'Increase prime mover strength',
          'Improve overall work capacity'
        ],
        recommendedTests: [
          '1RM Testing',
          'Push-Up Test',
          'Plank Hold',
          'Davies Test'
        ]
      },
      {
        id: 'phase-3',
        name: 'Hypertrophy',
        duration: 4,
        objectives: [
          'Achieve optimal levels of muscular hypertrophy',
          'Improve neuromuscular efficiency',
          'Increase lean body mass'
        ],
        recommendedTests: [
          'DEXA Scan',
          'Circumference Measurements',
          '1RM Testing',
          'Vertical Jump'
        ]
      }
    ]
  },
  {
    id: 'linear-periodization',
    name: 'Linear Periodization',
    type: 'predefined',
    description: 'Traditional linear progression from high volume/low intensity to low volume/high intensity',
    totalDuration: 16,
    isActive: true,
    phases: [
      {
        id: 'anatomical-adaptation',
        name: 'Anatomical Adaptation',
        duration: 4,
        objectives: [
          'Prepare body for training',
          'Improve work capacity',
          'Establish movement patterns'
        ],
        recommendedTests: [
          'Movement Screen',
          'Flexibility Assessment',
          'Aerobic Base Testing'
        ]
      },
      {
        id: 'hypertrophy-phase',
        name: 'Hypertrophy',
        duration: 4,
        objectives: [
          'Increase muscle mass',
          'Improve muscular endurance',
          'Build training volume tolerance'
        ],
        recommendedTests: [
          'Body Composition',
          'Muscular Endurance Tests',
          'Volume Tolerance Assessment'
        ]
      },
      {
        id: 'strength-phase',
        name: 'Maximum Strength',
        duration: 4,
        objectives: [
          'Develop maximum strength',
          'Improve neuromuscular efficiency',
          'Increase force production'
        ],
        recommendedTests: [
          '1RM Testing',
          'Isometric Strength',
          'Rate of Force Development'
        ]
      },
      {
        id: 'power-phase',
        name: 'Power',
        duration: 4,
        objectives: [
          'Convert strength to power',
          'Improve explosive capabilities',
          'Peak for competition'
        ],
        recommendedTests: [
          'Vertical Jump',
          'Wingate Test',
          'Sprint Testing',
          'Agility Assessment'
        ]
      }
    ]
  }
];

export const scheduleTemplates: ScheduleTemplate[] = [
  {
    id: 'baseline-assessment',
    name: 'Baseline Assessment Battery',
    description: 'Comprehensive initial assessment across all fitness domains',
    totalDuration: 14,
    createdBy: 'system',
    sequence: [
      {
        id: 'seq-1',
        dayOffset: 0,
        testId: 'movement-screen',
        testName: 'Movement Screen',
        notes: 'Start with movement quality assessment'
      },
      {
        id: 'seq-2',
        dayOffset: 2,
        testId: 'body-composition',
        testName: 'Body Composition (DEXA)',
        notes: 'Fasted state preferred'
      },
      {
        id: 'seq-3',
        dayOffset: 7,
        testId: 'vo2max-test',
        testName: 'VO₂max Test',
        notes: 'Well-rested, 48h post last training'
      },
      {
        id: 'seq-4',
        dayOffset: 10,
        testId: 'strength-testing',
        testName: '1RM Testing Battery',
        notes: 'Progressive loading protocol'
      },
      {
        id: 'seq-5',
        dayOffset: 14,
        testId: 'power-testing',
        testName: 'Power Assessment',
        notes: 'Jump tests and sprint assessment'
      }
    ]
  }
];

export const sampleAlerts: MetricAlert[] = [
  {
    id: 'alert-1',
    name: 'VO₂max Decline Alert',
    metric: 'vo2_max',
    thresholdType: 'percent_change',
    thresholdValue: -10,
    notificationMethod: 'both',
    isActive: true,
    notes: 'Alert when VO₂max drops more than 10% from baseline',
    createdBy: 'coach-1'
  },
  {
    id: 'alert-2',
    name: 'Jump Height Monitoring',
    metric: 'vertical_jump_height',
    thresholdType: 'min',
    thresholdValue: 45,
    notificationMethod: 'in_app',
    isActive: true,
    notes: 'Monitor for fatigue indicators',
    createdBy: 'coach-1'
  }
];