import { Module, Test, TestSession, Equipment, User } from '../types';

export const mockModules: Module[] = [
  {
    id: '1',
    name: 'Foundations in Physiology & Assessment',
    description: 'Theory exam and practical skills assessment',
    status: 'active',
    testsCount: 2,
    completionRate: 92,
    icon: 'BookOpen'
  },
  {
    id: '2',
    name: 'Health-Related Fitness Testing',
    description: 'Body composition, aerobic endurance, strength, flexibility',
    status: 'active',
    testsCount: 8,
    completionRate: 87,
    icon: 'Heart'
  },
  {
    id: '3',
    name: 'Skill-Related & Performance Testing',
    description: 'Anaerobic power, speed, agility, reaction time',
    status: 'active',
    testsCount: 7,
    completionRate: 79,
    icon: 'Zap'
  },
  {
    id: '4',
    name: 'Integrated Testing & Periodization',
    description: 'Test scheduling and longitudinal data management',
    status: 'active',
    testsCount: 3,
    completionRate: 94,
    icon: 'Calendar'
  },
  {
    id: '5',
    name: 'Mental & Neural Training',
    description: 'Advanced reaction time and cognitive training using light-based neural pods',
    status: 'active',
    testsCount: 24,
    completionRate: 0,
    icon: 'Brain'
  }
];

export const mockTests: Test[] = [
  {
    id: '1',
    name: 'Written Theory Exam',
    module: 'Foundations in Physiology & Assessment',
    size: 'small',
    duration: 30,
    equipmentRequired: ['Computer', 'Testing Software'],
    description: 'MCQ & short answer covering exercise physiology',
    protocol: 'Standardized digital assessment with time limits',
    acceptanceCriteria: '≥ 85% pass rate required'
  },
  {
    id: '2',
    name: 'VO₂max Test (CPET)',
    module: 'Health-Related Fitness Testing',
    size: 'large',
    duration: 90,
    equipmentRequired: ['Cycle Ergometer', 'Metabolic Cart', 'ECG Monitor'],
    description: 'Maximal oxygen uptake assessment',
    protocol: 'Incremental test to exhaustion with continuous monitoring',
    acceptanceCriteria: 'RER ≥ 1.10 and plateau in VO₂'
  },
  {
    id: '3',
    name: 'Wingate Anaerobic Test',
    module: 'Skill-Related & Performance Testing',
    size: 'large',
    duration: 60,
    equipmentRequired: ['Cycle Ergometer', 'Force Plates', 'Timing System'],
    description: '30-second all-out cycling test',
    protocol: 'Maximal effort against body weight resistance',
    acceptanceCriteria: 'Peak power within 5% of normative data'
  },
  {
    id: '4',
    name: 'Vertical Jump Test',
    module: 'Skill-Related & Performance Testing',
    size: 'medium',
    duration: 45,
    equipmentRequired: ['ForceDecks', 'Jump Mat'],
    description: 'Explosive power assessment',
    protocol: '3 maximal countermovement jumps',
    acceptanceCriteria: 'CV ≤ 3% between trials'
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Cycle Ergometer Pro',
    type: 'Cardio Equipment',
    status: 'operational',
    lastCalibration: new Date('2024-12-01'),
    nextCalibration: new Date('2025-01-01'),
    location: 'Lab A',
    accuracy: 99.2
  },
  {
    id: '2',
    name: 'ForceDecks System',
    type: 'Force Measurement',
    status: 'calibration_due',
    lastCalibration: new Date('2024-11-15'),
    nextCalibration: new Date('2024-12-30'),
    location: 'Testing Hall',
    accuracy: 98.8
  },
  {
    id: '3',
    name: 'Metabolic Cart',
    type: 'Gas Analysis',
    status: 'maintenance',
    lastCalibration: new Date('2024-11-20'),
    nextCalibration: new Date('2025-01-20'),
    location: 'Lab B',
    accuracy: 97.5
  },
  {
    id: '4',
    name: 'DEXA Scanner',
    type: 'Body Composition',
    status: 'operational',
    lastCalibration: new Date('2024-12-10'),
    nextCalibration: new Date('2025-02-10'),
    location: 'Imaging Suite',
    accuracy: 99.5
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@forgeron.com',
    role: 'coach',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@forgeron.com',
    role: 'lab_technician',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@forgeron.com',
    role: 'athlete',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Devansh Chawla',
    email: 'devansh@forgeron.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockSessions: TestSession[] = [
  {
    id: '1',
    testId: '2',
    athleteId: '3',
    coachId: '1',
    scheduledDate: new Date('2024-12-28T10:00:00'),
    status: 'scheduled',
    notes: 'Pre-season baseline assessment'
  },
  {
    id: '2',
    testId: '3',
    athleteId: '3',
    coachId: '1',
    scheduledDate: new Date('2024-12-29T14:00:00'),
    status: 'in_progress',
    notes: 'Follow-up test after 4 weeks training'
  },
  {
    id: '3',
    testId: '1',
    athleteId: '3',
    coachId: '1',
    scheduledDate: new Date('2024-12-15T09:00:00'),
    status: 'completed',
    results: [
      {
        id: '1',
        metric: 'Score',
        value: 89,
        unit: '%',
        normative: { percentile: 75, category: 'good' }
      }
    ]
  }
];