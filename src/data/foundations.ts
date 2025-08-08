import { FoundationsModule } from '../types/foundations';

export const foundationsModule: FoundationsModule = {
  id: 'module-1',
  name: 'Foundations in Physiology & Assessment',
  description: 'Essential knowledge base covering exercise physiology principles and testing methodologies',
  subModules: [
    {
      id: 'sub-1-1',
      name: 'Exercise Physiology & Systems',
      description: 'Fundamental physiological concepts and system adaptations to exercise',
      topics: [
        {
          id: 'cardiovascular-adaptations',
          name: 'Cardiovascular Adaptations',
          description: 'Heart rate, stroke volume, cardiac output responses to exercise',
          type: 'theory',
          estimatedDuration: 25,
          content: {
            overview: 'The cardiovascular system undergoes significant adaptations during exercise to meet increased metabolic demands. Understanding these responses is crucial for proper test interpretation and exercise prescription.',
            keyDefinitions: [
              {
                term: 'Cardiac Output',
                definition: 'The volume of blood pumped by the heart per minute',
                example: 'CO = Heart Rate × Stroke Volume'
              },
              {
                term: 'Stroke Volume',
                definition: 'The amount of blood ejected from the left ventricle with each heartbeat',
                example: 'Typically increases from ~70ml at rest to ~120ml during exercise'
              },
              {
                term: 'Arteriovenous Oxygen Difference',
                definition: 'The difference in oxygen content between arterial and venous blood',
                example: 'Widens from ~5ml/100ml at rest to ~15ml/100ml during maximal exercise'
              },
              {
                term: 'Maximum Heart Rate',
                definition: 'The highest heart rate an individual can achieve during maximal exercise',
                example: 'Estimated as 220 - age (though individual variation exists)'
              }
            ],
            examples: [
              'Resting HR: 60-100 bpm → Exercise HR: up to 220-age bpm',
              'Resting SV: ~70ml → Exercise SV: ~120ml (trained athletes)',
              'Resting CO: ~5L/min → Exercise CO: up to 25L/min'
            ]
          },
          quiz: {
            id: 'cardio-quiz',
            questions: [
              {
                id: 'q1',
                type: 'multiple_choice',
                prompt: 'What is the primary determinant of cardiac output during exercise?',
                options: [
                  'Blood pressure',
                  'Heart rate and stroke volume',
                  'Respiratory rate',
                  'Muscle fiber type'
                ],
                correctAnswer: 1,
                explanation: 'Cardiac output equals heart rate multiplied by stroke volume (CO = HR × SV)',
                points: 1
              },
              {
                id: 'q2',
                type: 'multiple_choice',
                prompt: 'During progressive exercise, stroke volume typically:',
                options: [
                  'Decreases continuously',
                  'Remains constant',
                  'Increases then plateaus at moderate intensities',
                  'Only increases at maximal intensities'
                ],
                correctAnswer: 2,
                explanation: 'Stroke volume increases with exercise intensity but plateaus at around 50-60% of maximum capacity',
                points: 1
              }
            ],
            passingScore: 80,
            timeLimit: 10
          }
        },
        {
          id: 'respiratory-mechanics',
          name: 'Respiratory Mechanics',
          description: 'Ventilation, gas exchange, and respiratory adaptations during exercise',
          type: 'theory',
          estimatedDuration: 20,
          content: {
            overview: 'The respiratory system adapts to exercise by increasing ventilation to meet oxygen demands and remove carbon dioxide. Key concepts include tidal volume, respiratory rate, and ventilatory thresholds.',
            keyDefinitions: [
              {
                term: 'Tidal Volume',
                definition: 'The volume of air inhaled or exhaled with each breath',
                example: 'Increases from ~500ml at rest to ~3000ml during exercise'
              },
              {
                term: 'Minute Ventilation',
                definition: 'The total volume of air breathed per minute',
                example: 'VE = Tidal Volume × Respiratory Rate'
              },
              {
                term: 'Ventilatory Threshold',
                definition: 'The exercise intensity at which ventilation increases disproportionately to oxygen uptake',
                example: 'Often occurs around 50-60% of VO₂max in untrained individuals'
              }
            ],
            examples: [
              'Rest: TV ~500ml, RR ~12/min, VE ~6L/min',
              'Exercise: TV ~3000ml, RR ~50/min, VE ~150L/min'
            ]
          }
        },
        {
          id: 'energy-systems',
          name: 'Energy Systems (Aerobic vs. Anaerobic)',
          description: 'ATP production pathways and their contributions during different exercise intensities',
          type: 'theory',
          estimatedDuration: 30,
          content: {
            overview: 'The body uses three primary energy systems to produce ATP: phosphocreatine, glycolytic, and oxidative systems. Understanding their characteristics and contributions is essential for test selection and interpretation.',
            keyDefinitions: [
              {
                term: 'Phosphocreatine System',
                definition: 'Immediate energy system providing ATP for high-intensity, short-duration activities',
                example: 'Primary system for 0-10 seconds of maximal exercise'
              },
              {
                term: 'Glycolytic System',
                definition: 'Anaerobic breakdown of glucose/glycogen to produce ATP',
                example: 'Primary system for 10 seconds to 2 minutes of high-intensity exercise'
              },
              {
                term: 'Oxidative System',
                definition: 'Aerobic metabolism of carbohydrates, fats, and proteins to produce ATP',
                example: 'Primary system for exercise lasting longer than 2-3 minutes'
              },
              {
                term: 'VO₂max',
                definition: 'Maximum rate of oxygen consumption during incremental exercise',
                example: 'Represents the upper limit of the oxidative energy system'
              }
            ],
            examples: [
              '100m sprint: 50% PCr, 45% Glycolytic, 5% Oxidative',
              '1500m run: 25% PCr/Glycolytic, 75% Oxidative',
              'Marathon: 2% PCr/Glycolytic, 98% Oxidative'
            ]
          },
          quiz: {
            id: 'energy-quiz',
            questions: [
              {
                id: 'q1',
                type: 'multiple_choice',
                prompt: 'Which energy system is primary during a 400m sprint?',
                options: [
                  'Phosphocreatine system',
                  'Glycolytic system',
                  'Oxidative system',
                  'All systems contribute equally'
                ],
                correctAnswer: 1,
                explanation: 'The glycolytic system is the primary contributor for high-intensity exercise lasting 10 seconds to 2 minutes',
                points: 1
              }
            ],
            passingScore: 80
          }
        },
        {
          id: 'muscle-fiber-types',
          name: 'Muscle Fiber Types & Recruitment',
          description: 'Type I and Type II fiber characteristics and recruitment patterns',
          type: 'theory',
          estimatedDuration: 25,
          content: {
            overview: 'Skeletal muscle contains different fiber types with distinct metabolic and contractile properties. Understanding fiber type characteristics helps explain individual differences in performance and training adaptations.',
            keyDefinitions: [
              {
                term: 'Type I Fibers (Slow-Twitch)',
                definition: 'Oxidative fibers with high endurance capacity but lower power output',
                example: 'Predominant in endurance athletes; fatigue-resistant'
              },
              {
                term: 'Type IIa Fibers (Fast-Twitch Oxidative)',
                definition: 'Fast-contracting fibers with moderate oxidative capacity',
                example: 'Good for sustained power activities like 800m running'
              },
              {
                term: 'Type IIx Fibers (Fast-Twitch Glycolytic)',
                definition: 'Fast-contracting fibers with high glycolytic capacity but low endurance',
                example: 'Predominant in power/sprint athletes; fatigue quickly'
              },
              {
                term: 'Size Principle',
                definition: 'Motor units are recruited in order of increasing size during voluntary contractions',
                example: 'Type I → Type IIa → Type IIx as force demands increase'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'sub-1-2',
      name: 'Testing Theory & Administration',
      description: 'Principles of test validity, reliability, safety protocols, and standardization procedures',
      topics: [
        {
          id: 'validity-reliability',
          name: 'Validity & Reliability Concepts',
          description: 'Understanding test accuracy, consistency, and measurement error',
          type: 'theory',
          estimatedDuration: 30,
          content: {
            overview: 'Valid and reliable testing is fundamental to meaningful fitness assessment. These concepts ensure that tests measure what they claim to measure and produce consistent results.',
            keyDefinitions: [
              {
                term: 'Validity',
                definition: 'The degree to which a test measures what it claims to measure',
                example: 'A VO₂max test should accurately reflect aerobic capacity'
              },
              {
                term: 'Reliability',
                definition: 'The consistency of test results when repeated under similar conditions',
                example: 'Test-retest reliability: CV < 5% for most fitness tests'
              },
              {
                term: 'Objectivity',
                definition: 'The degree to which test results are independent of the tester',
                example: 'Automated timing systems vs. manual stopwatch timing'
              },
              {
                term: 'Standard Error of Measurement',
                definition: 'The amount of measurement error expected in individual test scores',
                example: 'SEM = SD × √(1 - reliability coefficient)'
              }
            ],
            examples: [
              'Face validity: Does the test appear to measure what it claims?',
              'Criterion validity: How well does the test correlate with a gold standard?',
              'Test-retest reliability: Consistency across multiple testing sessions'
            ]
          },
          quiz: {
            id: 'validity-quiz',
            questions: [
              {
                id: 'q1',
                type: 'multiple_choice',
                prompt: 'A test that consistently produces the same results but doesn\'t measure what it claims to measure has:',
                options: [
                  'High validity, high reliability',
                  'High validity, low reliability',
                  'Low validity, high reliability',
                  'Low validity, low reliability'
                ],
                correctAnswer: 2,
                explanation: 'Reliability refers to consistency, while validity refers to accuracy. A test can be consistent (reliable) but still not measure what it claims (invalid).',
                points: 1
              }
            ],
            passingScore: 80
          }
        },
        {
          id: 'safety-prescreening',
          name: 'Safety & Pre-Screening Protocols',
          description: 'Risk assessment, contraindications, and emergency procedures',
          type: 'practical',
          estimatedDuration: 35,
          content: {
            overview: 'Safety is paramount in fitness testing. Proper pre-screening identifies individuals at risk and ensures appropriate test selection and monitoring protocols.',
            keyDefinitions: [
              {
                term: 'PAR-Q+',
                definition: 'Physical Activity Readiness Questionnaire for Everyone',
                example: 'Screening tool to identify individuals who should seek medical clearance'
              },
              {
                term: 'Absolute Contraindications',
                definition: 'Conditions that completely prohibit exercise testing',
                example: 'Unstable angina, uncontrolled cardiac arrhythmias'
              },
              {
                term: 'Relative Contraindications',
                definition: 'Conditions requiring medical supervision or modified protocols',
                example: 'Controlled hypertension, stable chronic disease'
              },
              {
                term: 'Informed Consent',
                definition: 'Written agreement acknowledging risks and procedures',
                example: 'Must include test procedures, risks, and right to terminate'
              }
            ],
            examples: [
              'Emergency action plan: Know location of AED, emergency contacts',
              'Risk stratification: Low, moderate, high risk categories',
              'Termination criteria: Chest pain, severe dyspnea, equipment failure'
            ]
          },
          practicalAssessment: {
            id: 'safety-practical',
            name: 'Pre-Screening Protocol Demonstration',
            description: 'Demonstrate proper pre-screening procedures and safety protocols',
            steps: [
              {
                id: 'step1',
                order: 1,
                instruction: 'Administer PAR-Q+ questionnaire',
                expectedAction: 'Review all questions with participant, explain any unclear items',
                points: 2,
                criticalPoint: true
              },
              {
                id: 'step2',
                order: 2,
                instruction: 'Assess risk stratification',
                expectedAction: 'Categorize participant as low, moderate, or high risk based on criteria',
                points: 2,
                criticalPoint: true
              },
              {
                id: 'step3',
                order: 3,
                instruction: 'Obtain informed consent',
                expectedAction: 'Explain procedures, risks, and participant rights; obtain signature',
                points: 2,
                criticalPoint: true
              },
              {
                id: 'step4',
                order: 4,
                instruction: 'Identify emergency procedures',
                expectedAction: 'Locate emergency equipment, explain termination criteria',
                points: 1,
                criticalPoint: false
              }
            ],
            rubric: [
              {
                id: 'communication',
                criterion: 'Communication with Participant',
                excellent: 'Clear, professional, addresses all questions',
                good: 'Generally clear with minor gaps',
                satisfactory: 'Adequate but could be clearer',
                needsImprovement: 'Unclear or unprofessional communication'
              },
              {
                id: 'safety',
                criterion: 'Safety Protocol Knowledge',
                excellent: 'Demonstrates comprehensive safety knowledge',
                good: 'Good safety awareness with minor gaps',
                satisfactory: 'Basic safety knowledge',
                needsImprovement: 'Inadequate safety preparation'
              }
            ],
            maxScore: 7
          }
        },
        {
          id: 'test-selection',
          name: 'Test Selection Criteria',
          description: 'Choosing appropriate tests based on population, goals, and resources',
          type: 'theory',
          estimatedDuration: 25,
          content: {
            overview: 'Selecting the right tests requires consideration of multiple factors including participant characteristics, testing goals, available equipment, and time constraints.',
            keyDefinitions: [
              {
                term: 'Specificity',
                definition: 'Tests should match the demands of the activity or sport',
                example: 'Cycling VO₂max test for cyclists vs. treadmill test'
              },
              {
                term: 'Feasibility',
                definition: 'Practical considerations of time, cost, and equipment',
                example: 'Field tests vs. laboratory tests based on resources'
              },
              {
                term: 'Population Appropriateness',
                definition: 'Tests must be suitable for the age, fitness level, and health status',
                example: 'Modified protocols for elderly or clinical populations'
              }
            ]
          }
        },
        {
          id: 'standardization-calibration',
          name: 'Standardization & Calibration',
          description: 'Equipment calibration, environmental controls, and protocol standardization',
          type: 'practical',
          estimatedDuration: 30,
          content: {
            overview: 'Standardized procedures and properly calibrated equipment are essential for accurate and reproducible test results.',
            keyDefinitions: [
              {
                term: 'Calibration',
                definition: 'Process of adjusting equipment to ensure accurate measurements',
                example: 'Daily calibration of metabolic cart with reference gases'
              },
              {
                term: 'Standardization',
                definition: 'Consistent application of test protocols and procedures',
                example: 'Same instructions, timing, and environmental conditions'
              },
              {
                term: 'Quality Control',
                definition: 'Ongoing monitoring of test procedures and equipment accuracy',
                example: 'Regular checks of timing systems, force plates, scales'
              }
            ]
          },
          practicalAssessment: {
            id: 'calibration-practical',
            name: 'Equipment Calibration Demonstration',
            description: 'Demonstrate proper calibration procedures for common testing equipment',
            steps: [
              {
                id: 'step1',
                order: 1,
                instruction: 'Perform scale calibration',
                expectedAction: 'Use known weights to verify accuracy within ±0.1kg',
                points: 2,
                criticalPoint: true
              },
              {
                id: 'step2',
                order: 2,
                instruction: 'Check timing system accuracy',
                expectedAction: 'Verify timing gates against stopwatch over known distance',
                points: 2,
                criticalPoint: true
              },
              {
                id: 'step3',
                order: 3,
                instruction: 'Document calibration results',
                expectedAction: 'Record calibration data with date, time, and results',
                points: 1,
                criticalPoint: false
              }
            ],
            rubric: [
              {
                id: 'accuracy',
                criterion: 'Calibration Accuracy',
                excellent: 'All equipment calibrated within specifications',
                good: 'Most equipment properly calibrated',
                satisfactory: 'Basic calibration completed',
                needsImprovement: 'Calibration procedures inadequate'
              }
            ],
            maxScore: 5
          }
        }
      ]
    }
  ]
};

export const sampleProgress = {
  userId: 'user-1',
  moduleId: 'module-1',
  topicsCompleted: ['cardiovascular-adaptations', 'validity-reliability'],
  quizScores: [
    {
      quizId: 'cardio-quiz',
      score: 85,
      timeSpent: 8,
      attempts: 1,
      passed: true,
      completedAt: new Date('2024-12-20')
    }
  ],
  practicalScores: [],
  overallProgress: 25,
  lastActivity: new Date('2024-12-20')
};