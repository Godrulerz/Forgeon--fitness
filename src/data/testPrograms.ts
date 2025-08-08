import { TestProgram } from '../types/testPrograms';

export const testPrograms: TestProgram[] = [
  // MODULE 1: Foundations in Physiology & Assessment
  {
    id: 'tp-001',
    name: 'Written Theory Examination',
    moduleId: '1',
    category: 'theory',
    size: 'small',
    estimatedDuration: 30,
    description: 'Comprehensive written examination covering exercise physiology principles and assessment methodologies',
    objectives: [
      'Assess understanding of exercise physiology fundamentals',
      'Evaluate knowledge of test administration protocols',
      'Verify comprehension of safety procedures',
      'Test interpretation of normative data'
    ],
    subtests: [
      {
        id: 'subtest-001',
        name: 'Multiple Choice Questions',
        description: 'Comprehensive MCQ covering exercise physiology and assessment principles',
        order: 1,
        estimatedDuration: 20,
        category: 'assessment',
        required: true,
        instructions: 'Answer all 50 multiple choice questions. Each question has one correct answer.',
        protocol: {
          id: 'prot-001-mcq',
          name: 'MCQ Assessment Protocol',
          steps: [
            {
              id: 'step-001',
              order: 1,
              title: 'Pre-test Setup',
              instruction: 'Verify computer functionality and testing software access',
              duration: 300,
              type: 'preparation',
              dataCollection: {
                metrics: ['setup_complete'],
                frequency: 0,
                validation: [],
                required: true
              },
              criticalPoint: true
            },
            {
              id: 'step-002',
              order: 2,
              title: 'MCQ Examination',
              instruction: 'Complete 50 multiple choice questions',
              duration: 1200,
              type: 'assessment',
              dataCollection: {
                metrics: ['mcq_score', 'completion_time'],
                frequency: 0,
                validation: [
                  {
                    type: 'range',
                    parameters: { min: 0, max: 100 },
                    errorMessage: 'Score must be between 0-100%',
                    severity: 'error'
                  }
                ],
                required: true
              },
              criticalPoint: true
            }
          ],
          warmupRequired: false,
          cooldownRequired: false,
          restPeriods: [],
          environmentalRequirements: [],
          safetyChecklist: []
        },
        dataPoints: [
          {
            id: 'dp-001',
            name: 'MCQ Score',
            description: 'Multiple choice question score percentage',
            unit: '%',
            dataType: 'number',
            required: true,
            validationRules: [
              {
                type: 'range',
                parameters: { min: 0, max: 100 },
                errorMessage: 'Score must be 0-100%',
                severity: 'error'
              }
            ],
            normativeComparison: true,
            reportIncluded: true
          }
        ],
        equipment: [
          {
            equipmentId: 'computer-001',
            name: 'Testing Computer',
            type: 'Computer Hardware',
            required: true,
            calibrationRequired: false,
            calibrationFrequency: 0,
            accuracy: 100,
            setupInstructions: 'Ensure stable internet connection and testing software is loaded',
            operatingRange: { min: 0, max: 100, unit: '%' }
          }
        ]
      },
      {
        id: 'subtest-002',
        name: 'Short Answer Questions',
        description: 'Written responses demonstrating deeper understanding',
        order: 2,
        estimatedDuration: 10,
        category: 'assessment',
        required: true,
        instructions: 'Provide detailed written answers to 5 short answer questions.',
        protocol: {
          id: 'prot-001-short',
          name: 'Short Answer Protocol',
          steps: [
            {
              id: 'step-003',
              order: 1,
              title: 'Short Answer Section',
              instruction: 'Complete 5 short answer questions',
              duration: 600,
              type: 'assessment',
              dataCollection: {
                metrics: ['short_answer_score'],
                frequency: 0,
                validation: [],
                required: true
              },
              criticalPoint: true
            }
          ],
          warmupRequired: false,
          cooldownRequired: false,
          restPeriods: [],
          environmentalRequirements: [],
          safetyChecklist: []
        },
        dataPoints: [
          {
            id: 'dp-002',
            name: 'Short Answer Score',
            description: 'Short answer section score percentage',
            unit: '%',
            dataType: 'number',
            required: true,
            validationRules: [
              {
                type: 'range',
                parameters: { min: 0, max: 100 },
                errorMessage: 'Score must be 0-100%',
                severity: 'error'
              }
            ],
            normativeComparison: true,
            reportIncluded: true
          }
        ],
        equipment: []
      }
    ],
    equipment: [
      {
        equipmentId: 'computer-001',
        name: 'Testing Computer',
        type: 'Computer Hardware',
        required: true,
        calibrationRequired: false,
        calibrationFrequency: 0,
        accuracy: 100,
        setupInstructions: 'Ensure stable internet connection and testing software is loaded',
        operatingRange: { min: 0, max: 100, unit: '%' }
      }
    ],
    acceptanceCriteria: {
      passThreshold: 85,
      protocolCompliance: 100,
      dataQuality: {
        completeness: 100,
        accuracy: 100,
        outlierThreshold: 2
      },
      timeConstraints: {
        maximum: 35
      }
    },
    status: 'active',
    version: '1.0',
    lastUpdated: new Date('2024-12-01'),
    createdBy: 'system'
  },

  // MODULE 2: Health-Related Fitness Testing
  {
    id: 'tp-002',
    name: 'VO₂max Assessment (CPET)',
    moduleId: '2',
    category: 'lab',
    size: 'large',
    estimatedDuration: 90,
    description: 'Maximal oxygen uptake assessment using cardiopulmonary exercise testing',
    objectives: [
      'Determine maximal aerobic capacity (VO₂max)',
      'Assess cardiovascular response to exercise',
      'Identify anaerobic threshold',
      'Evaluate exercise tolerance and safety'
    ],
    subtests: [
      {
        id: 'subtest-003',
        name: 'Pre-Exercise Screening',
        description: 'Medical history and contraindication assessment',
        order: 1,
        estimatedDuration: 15,
        category: 'assessment',
        required: true,
        instructions: 'Complete comprehensive pre-exercise screening including PAR-Q+ and medical history.',
        safetyNotes: ['Verify no contraindications to maximal exercise testing'],
        protocol: {
          id: 'prot-002-screen',
          name: 'Pre-Exercise Screening Protocol',
          steps: [
            {
              id: 'step-004',
              order: 1,
              title: 'Medical Screening',
              instruction: 'Complete PAR-Q+, medical history, and contraindication screening',
              duration: 600,
              type: 'preparation',
              dataCollection: {
                metrics: ['par_q_score', 'medical_clearance', 'contraindications'],
                frequency: 0,
                validation: [],
                required: true
              },
              criticalPoint: true
            }
          ],
          warmupRequired: false,
          cooldownRequired: false,
          restPeriods: [],
          environmentalRequirements: [],
          safetyChecklist: []
        },
        dataPoints: [
          {
            id: 'dp-003',
            name: 'PAR-Q Score',
            description: 'Physical Activity Readiness Questionnaire score',
            unit: 'score',
            dataType: 'number',
            required: true,
            validationRules: [],
            normativeComparison: false,
            reportIncluded: true
          }
        ],
        equipment: []
      },
      {
        id: 'subtest-004',
        name: 'Resting Measurements',
        description: 'Baseline cardiovascular and respiratory measurements',
        order: 2,
        estimatedDuration: 10,
        category: 'measurement',
        required: true,
        instructions: 'Record resting heart rate, blood pressure, and respiratory parameters.',
        protocol: {
          id: 'prot-002-rest',
          name: 'Resting Measurements Protocol',
          steps: [
            {
              id: 'step-005',
              order: 1,
              title: 'Resting Measurements',
              instruction: 'Record baseline HR, BP, and respiratory parameters',
              duration: 600,
              type: 'measurement',
              dataCollection: {
                metrics: ['resting_hr', 'resting_bp_sys', 'resting_bp_dia'],
                frequency: 1,
                validation: [],
                required: true
              },
              criticalPoint: false
            }
          ],
          warmupRequired: false,
          cooldownRequired: false,
          restPeriods: [],
          environmentalRequirements: [],
          safetyChecklist: []
        },
        dataPoints: [
          {
            id: 'dp-004',
            name: 'Resting Heart Rate',
            description: 'Resting heart rate in beats per minute',
            unit: 'bpm',
            dataType: 'number',
            required: true,
            validationRules: [
              {
                type: 'range',
                parameters: { min: 40, max: 120 },
                errorMessage: 'Resting HR should be 40-120 bpm',
                severity: 'warning'
              }
            ],
            normativeComparison: true,
            reportIncluded: true
          }
        ],
        equipment: [
          {
            equipmentId: 'hr-monitor-001',
            name: 'Heart Rate Monitor',
            type: 'Monitoring Equipment',
            required: true,
            calibrationRequired: false,
            calibrationFrequency: 0,
            accuracy: 99,
            setupInstructions: 'Ensure proper electrode placement',
            operatingRange: { min: 30, max: 220, unit: 'bpm' }
          }
        ]
      },
      {
        id: 'subtest-005',
        name: 'Maximal Exercise Test',
        description: 'Incremental exercise test to exhaustion',
        order: 3,
        estimatedDuration: 45,
        category: 'assessment',
        required: true,
        instructions: 'Perform incremental cycling test with continuous monitoring until volitional exhaustion.',
        safetyNotes: [
          'Continuous ECG monitoring required',
          'Emergency equipment must be available',
          'Qualified medical personnel present'
        ],
        protocol: {
          id: 'prot-002-max',
          name: 'Maximal Exercise Test Protocol',
          steps: [
            {
              id: 'step-006',
              order: 1,
              title: 'Incremental Test',
              instruction: 'Increase power by 25W every minute until exhaustion',
              duration: null,
              type: 'exercise',
              dataCollection: {
                metrics: ['power', 'hr', 'vo2', 'vco2', 'rer', 'rpe'],
                frequency: 10,
                validation: [
                  {
                    type: 'custom',
                    parameters: { formula: 'rer >= 1.10' },
                    errorMessage: 'RER should reach ≥1.10 for maximal effort',
                    severity: 'warning'
                  }
                ],
                required: true
              },
              criticalPoint: true
            }
          ],
          warmupRequired: true,
          warmupDuration: 180,
          cooldownRequired: true,
          cooldownDuration: 300,
          restPeriods: [],
          environmentalRequirements: [
            {
              parameter: 'temperature',
              range: { min: 18, max: 22 },
              unit: '°C',
              critical: true
            }
          ],
          safetyChecklist: [
            {
              id: 'safety-002',
              description: 'Emergency equipment available and functional',
              required: true,
              category: 'equipment',
              checkMethod: 'visual'
            }
          ]
        },
        dataPoints: [
          {
            id: 'dp-005',
            name: 'VO₂max',
            description: 'Maximal oxygen uptake',
            unit: 'ml/kg/min',
            dataType: 'number',
            required: true,
            validationRules: [
              {
                type: 'range',
                parameters: { min: 15, max: 80 },
                errorMessage: 'VO₂max outside expected range',
                severity: 'warning'
              }
            ],
            normativeComparison: true,
            reportIncluded: true
          },
          {
            id: 'dp-006',
            name: 'Peak Power',
            description: 'Maximum power output achieved',
            unit: 'W',
            dataType: 'number',
            required: true,
            validationRules: [],
            normativeComparison: true,
            reportIncluded: true
          }
        ],
        equipment: [
          {
            equipmentId: 'metabolic-cart-001',
            name: 'Metabolic Cart',
            type: 'Gas Analysis',
            required: true,
            calibrationRequired: true,
            calibrationFrequency: 1,
            accuracy: 98,
            setupInstructions: 'Warm up for 30 minutes, calibrate with reference gases',
            operatingRange: { min: 0, max: 8000, unit: 'ml/min' }
          },
          {
            equipmentId: 'cycle-ergometer-001',
            name: 'Cycle Ergometer',
            type: 'Exercise Equipment',
            required: true,
            calibrationRequired: true,
            calibrationFrequency: 7,
            accuracy: 99,
            setupInstructions: 'Adjust seat height, ensure proper bike fit',
            operatingRange: { min: 0, max: 500, unit: 'W' }
          }
        ]
      },
      {
        id: 'subtest-006',
        name: 'Recovery Monitoring',
        description: 'Post-exercise recovery assessment',
        order: 4,
        estimatedDuration: 20,
        category: 'measurement',
        required: true,
        instructions: 'Monitor cardiovascular recovery for 15 minutes post-exercise.',
        protocol: {
          id: 'prot-002-recovery',
          name: 'Recovery Monitoring Protocol',
          steps: [
            {
              id: 'step-007',
              order: 1,
              title: 'Recovery Monitoring',
              instruction: 'Monitor for 15 minutes post-exercise',
              duration: 900,
              type: 'recovery',
              dataCollection: {
                metrics: ['hr', 'bp_sys', 'bp_dia', 'symptoms'],
                frequency: 1,
                validation: [],
                required: true
              },
              criticalPoint: true
            }
          ],
          warmupRequired: false,
          cooldownRequired: false,
          restPeriods: [],
          environmentalRequirements: [],
          safetyChecklist: []
        },
        dataPoints: [
          {
            id: 'dp-007',
            name: 'Recovery Heart Rate',
            description: 'Heart rate at 5 minutes post-exercise',
            unit: 'bpm',
            dataType: 'number',
            required: true,
            validationRules: [],
            normativeComparison: false,
            reportIncluded: true
          }
        ],
        equipment: []
      }
    ],
    equipment: [
      {
        equipmentId: 'metabolic-cart-001',
        name: 'Metabolic Cart',
        type: 'Gas Analysis',
        required: true,
        calibrationRequired: true,
        calibrationFrequency: 1,
        accuracy: 98,
        setupInstructions: 'Warm up for 30 minutes, calibrate with reference gases',
        operatingRange: { min: 0, max: 8000, unit: 'ml/min' }
      },
      {
        equipmentId: 'cycle-ergometer-001',
        name: 'Cycle Ergometer',
        type: 'Exercise Equipment',
        required: true,
        calibrationRequired: true,
        calibrationFrequency: 7,
        accuracy: 99,
        setupInstructions: 'Adjust seat height, ensure proper bike fit',
        operatingRange: { min: 0, max: 500, unit: 'W' }
      }
    ],
    acceptanceCriteria: {
      reliabilityCV: 5,
      protocolCompliance: 90,
      dataQuality: {
        completeness: 95,
        accuracy: 98,
        outlierThreshold: 2.5
      }
    },
    normativeData: [
      {
        id: 'norm-001',
        population: 'Healthy Adults',
        ageRange: { min: 20, max: 29 },
        gender: 'male',
        percentiles: {
          10: 35,
          25: 42,
          50: 48,
          75: 55,
          90: 62
        },
        categories: {
          poor: { min: 0, max: 35 },
          fair: { min: 36, max: 42 },
          good: { min: 43, max: 48 },
          excellent: { min: 49, max: 55 },
          superior: { min: 56, max: 100 }
        },
        source: 'ACSM Guidelines 2022',
        datePublished: new Date('2022-01-01')
      }
    ],
    prerequisites: ['Medical clearance', 'Completed PAR-Q+'],
    contraindications: [
      'Unstable angina',
      'Uncontrolled cardiac arrhythmias',
      'Acute myocarditis',
      'Severe aortic stenosis',
      'Uncontrolled hypertension (>180/110)'
    ],
    status: 'active',
    version: '2.1',
    lastUpdated: new Date('2024-12-01'),
    createdBy: 'system'
  }
];

export const getTestProgramsByModule = (moduleId: string): TestProgram[] => {
  return testPrograms.filter(tp => tp.moduleId === moduleId);
};

export const getTestProgramById = (id: string): TestProgram | undefined => {
  return testPrograms.find(tp => tp.id === id);
};

export const getActiveTestPrograms = (): TestProgram[] => {
  return testPrograms.filter(tp => tp.status === 'active');
};