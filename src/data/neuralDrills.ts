import { NeuralTrainingModule, NeuralDrill } from '../types/neuralTraining';

export const neuralTrainingModule: NeuralTrainingModule = {
  id: 'neural-training',
  name: 'Mental & Neural Training',
  description: 'Advanced reaction time and cognitive training using light-based neural pods',
  overview: {
    eli5: "Imagine a high-tech game of Whac-A-Mole: coloured pucks light up, you slap or dodge them. Each slap is time-stamped in milliseconds. Your brain rewires itself to spot the lights faster next round—just like practising times-tables makes you quicker at maths. The pods simply give your nervous system thousands of rapid see-decide-move reps it would never get in a normal gym.",
    scientificExplanation: [
      {
        level: "Sensory Input",
        keyPoints: "Magnocellular (fast-motion) cells in the retina feed the dorsal \"where\" stream for timing & spatial accuracy. Visual flashes <100 ms force this pathway to fire.",
        podExploitation: "Multi-colour LEDs present unpredictable, sub-second cues that overload the \"where\" stream, sharpening motion detection."
      },
      {
        level: "Perception-Action Coupling",
        keyPoints: "Mirror areas in parietal & premotor cortex integrate the visual cue with a motor program in ~150–250 ms.",
        podExploitation: "By measuring that latency every rep, athletes get immediate knowledge of results—a potent motor-learning driver."
      },
      {
        level: "Decision Speed",
        keyPoints: "Hick's Law: the more choices, the longer the response time (RT ≈ a + b · log₂ N).",
        podExploitation: "Pods can scale N (choice lights, colours, numbers) so programmes progress from simple to complex decision-making."
      }
    ]
  },
  assessmentDrills: [
    {
      id: 'drill-001',
      tier: 'Foundation — Simple Reaction',
      name: 'Flash & Tap',
      quickPurpose: 'Basic simple RT (1 pod lights, athlete taps)',
      difficulty: 'beginner',
      category: 'foundation_simple',
      estimatedDuration: 5,
      equipmentRequired: ['Neural Pod', 'Timer System']
    },
    {
      id: 'drill-004',
      tier: 'Foundation — Choice Reaction',
      name: '3-Colour Choice',
      quickPurpose: 'Tap the flashing colour among three pods',
      difficulty: 'beginner',
      category: 'foundation_choice',
      estimatedDuration: 8,
      equipmentRequired: ['3 Neural Pods', 'Timer System']
    },
    {
      id: 'drill-007',
      tier: 'Foundation — Sequence & Memory',
      name: 'Follow-the-Light',
      quickPurpose: 'Pods light in fixed 4-step loop; train rhythmic timing',
      difficulty: 'intermediate',
      category: 'foundation_sequence',
      estimatedDuration: 10,
      equipmentRequired: ['4 Neural Pods', 'Timer System']
    }
  ],
  trainingDrills: [
    {
      id: 'drill-002',
      tier: 'Foundation — Simple Reaction',
      name: 'Flash & Dodge',
      quickPurpose: 'Whole-body evasion; pod logs near-miss via IMU',
      difficulty: 'beginner',
      category: 'foundation_simple',
      estimatedDuration: 6,
      equipmentRequired: ['Neural Pod with IMU', 'Timer System']
    },
    {
      id: 'drill-003',
      tier: 'Foundation — Simple Reaction',
      name: 'Go / No-Go',
      quickPurpose: 'Green = tap, Red = ignore → impulse-control',
      difficulty: 'beginner',
      category: 'foundation_simple',
      estimatedDuration: 7,
      equipmentRequired: ['Neural Pod', 'Timer System']
    },
    {
      id: 'drill-005',
      tier: 'Foundation — Choice Reaction',
      name: '6-Spot Arc',
      quickPurpose: 'Six pods in semicircle; cue tests spatial scan',
      difficulty: 'intermediate',
      category: 'foundation_choice',
      estimatedDuration: 12,
      equipmentRequired: ['6 Neural Pods', 'Timer System']
    },
    {
      id: 'drill-006',
      tier: 'Foundation — Choice Reaction',
      name: 'Right-Left Split',
      quickPurpose: 'Two pods either side of mid-line; lateral bias check',
      difficulty: 'beginner',
      category: 'foundation_choice',
      estimatedDuration: 8,
      equipmentRequired: ['2 Neural Pods', 'Timer System']
    },
    {
      id: 'drill-008',
      tier: 'Foundation — Sequence & Memory',
      name: 'Simon-Sequence (4→6→8)',
      quickPurpose: 'Remember & repeat growing pattern (working memory)',
      difficulty: 'intermediate',
      category: 'foundation_sequence',
      estimatedDuration: 15,
      equipmentRequired: ['8 Neural Pods', 'Timer System']
    },
    {
      id: 'drill-009',
      tier: 'Applied — Cricket Specific',
      name: 'Run-Up Trigger',
      quickPurpose: 'Pod flashes → bowler starts run-up; logs start RT',
      difficulty: 'intermediate',
      category: 'applied_cricket',
      estimatedDuration: 10,
      equipmentRequired: ['Neural Pod', 'Timer System', 'Cricket Equipment']
    },
    {
      id: 'drill-010',
      tier: 'Applied — Cricket Specific',
      name: 'Line-Length Map',
      quickPurpose: 'Six pods mapped to good-length grid; flash = bowl there',
      difficulty: 'intermediate',
      category: 'applied_cricket',
      estimatedDuration: 15,
      equipmentRequired: ['6 Neural Pods', 'Cricket Pitch', 'Timer System']
    },
    {
      id: 'drill-011',
      tier: 'Applied — Cricket Specific',
      name: 'Slip-Catch Reflex',
      quickPurpose: 'Pod behind nets flashes; fielder reacts for catch sim',
      difficulty: 'intermediate',
      category: 'applied_cricket',
      estimatedDuration: 12,
      equipmentRequired: ['Neural Pod', 'Cricket Nets', 'Timer System']
    },
    {
      id: 'drill-012',
      tier: 'Applied — Cricket Specific',
      name: 'Throw-Down Target',
      quickPurpose: 'Pod on stump flashes section; fielder aims throw',
      difficulty: 'intermediate',
      category: 'applied_cricket',
      estimatedDuration: 10,
      equipmentRequired: ['Neural Pod', 'Cricket Stumps', 'Timer System']
    },
    {
      id: 'drill-013',
      tier: 'Applied — Agility / Footwork',
      name: '5-10-5 Shuttle Cue',
      quickPurpose: 'Pod cues change-of-direction in agility shuttle',
      difficulty: 'intermediate',
      category: 'applied_agility',
      estimatedDuration: 8,
      equipmentRequired: ['Neural Pod', 'Agility Cones', 'Timer System']
    },
    {
      id: 'drill-014',
      tier: 'Applied — Agility / Footwork',
      name: 'Hexagon Hop',
      quickPurpose: 'Six-pod hex grid; flash = hop to that vertex',
      difficulty: 'intermediate',
      category: 'applied_agility',
      estimatedDuration: 10,
      equipmentRequired: ['6 Neural Pods', 'Timer System']
    },
    {
      id: 'drill-015',
      tier: 'Dual-Task / Cognitive Load',
      name: 'Colour + Math',
      quickPurpose: 'Flash shows colour & digit; tap if digit even',
      difficulty: 'advanced',
      category: 'dual_task',
      estimatedDuration: 12,
      equipmentRequired: ['Neural Pod with Display', 'Timer System']
    },
    {
      id: 'drill-016',
      tier: 'Dual-Task / Cognitive Load',
      name: 'Stroop Slam',
      quickPurpose: 'Word "RED" lit in blue LED → tap true colour (inhibition)',
      difficulty: 'advanced',
      category: 'dual_task',
      estimatedDuration: 10,
      equipmentRequired: ['Neural Pod with Display', 'Timer System']
    },
    {
      id: 'drill-017',
      tier: 'Dual-Task / Cognitive Load',
      name: 'Audio-Visual Clash',
      quickPurpose: 'Phone shouts "left" while right pod flashes; resolve conflict',
      difficulty: 'advanced',
      category: 'dual_task',
      estimatedDuration: 12,
      equipmentRequired: ['Neural Pod', 'Audio System', 'Timer System']
    },
    {
      id: 'drill-018',
      tier: 'Fatigue & Endurance',
      name: '30-Sec Burst',
      quickPurpose: 'Max taps in 30 s; tracks RT decay curve',
      difficulty: 'intermediate',
      category: 'fatigue_endurance',
      estimatedDuration: 5,
      equipmentRequired: ['Neural Pod', 'Timer System']
    },
    {
      id: 'drill-019',
      tier: 'Fatigue & Endurance',
      name: 'Ramp-Up Ladder',
      quickPurpose: 'Cue-on time shrinks every 5 reps until error',
      difficulty: 'advanced',
      category: 'fatigue_endurance',
      estimatedDuration: 8,
      equipmentRequired: ['Neural Pod', 'Timer System']
    },
    {
      id: 'drill-020',
      tier: 'Rehab / Return-to-Play',
      name: 'Single-Leg Tap',
      quickPurpose: 'Balance + RT; injured limb only',
      difficulty: 'beginner',
      category: 'rehab',
      estimatedDuration: 8,
      equipmentRequired: ['Neural Pod', 'Balance Platform', 'Timer System']
    },
    {
      id: 'drill-021',
      tier: 'Rehab / Return-to-Play',
      name: 'Cognitive-Balance Dual',
      quickPurpose: 'Stand on wobble board while doing Colour + Math',
      difficulty: 'advanced',
      category: 'rehab',
      estimatedDuration: 12,
      equipmentRequired: ['Neural Pod with Display', 'Wobble Board', 'Timer System']
    },
    {
      id: 'drill-022',
      tier: 'Advanced Game-Sense',
      name: 'Scenario Call-Out',
      quickPurpose: 'Coach calls "Yorker to lefty"; correct line-length pod flashes—bowler executes',
      difficulty: 'advanced',
      category: 'advanced_game',
      estimatedDuration: 20,
      equipmentRequired: ['6 Neural Pods', 'Cricket Equipment', 'Audio System', 'Timer System']
    },
    {
      id: 'drill-023',
      tier: 'Advanced Game-Sense',
      name: 'Predict-the-Next',
      quickPurpose: 'Pods flash pattern ABAC? Athlete anticipates next cue',
      difficulty: 'advanced',
      category: 'advanced_game',
      estimatedDuration: 15,
      equipmentRequired: ['Multiple Neural Pods', 'Timer System']
    },
    {
      id: 'drill-024',
      tier: 'Advanced Game-Sense',
      name: 'Team Relay RT',
      quickPurpose: 'Two athletes share kit; relay tag via pod hit (coordination)',
      difficulty: 'advanced',
      category: 'advanced_game',
      estimatedDuration: 18,
      equipmentRequired: ['Multiple Neural Pods', 'Timer System']
    }
  ]
};

export const getAllDrills = (): NeuralDrill[] => {
  return [...neuralTrainingModule.assessmentDrills, ...neuralTrainingModule.trainingDrills];
};

export const getDrillsByCategory = (category: string): NeuralDrill[] => {
  return getAllDrills().filter(drill => drill.category === category);
};

export const getDrillsByDifficulty = (difficulty: string): NeuralDrill[] => {
  return getAllDrills().filter(drill => drill.difficulty === difficulty);
};