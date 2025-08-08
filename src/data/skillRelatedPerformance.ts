import { SkillRelatedModule } from '../types/skillRelatedPerformance';

export const skillRelatedPerformanceModule: SkillRelatedModule = {
  id: 'module-3',
  name: 'Skill-Related & Performance',
  description: 'Assessment of anaerobic power, speed, agility, reaction time, coordination, and functional fitness',
  subModules: [
    {
      id: 'sub-3-1',
      name: 'Anaerobic & Power',
      description: 'Assessment of anaerobic capacity and explosive power output',
      tests: [
        {
          id: 'wingate-test',
          name: 'Wingate Anaerobic Test',
          description: '30-second all-out cycling test for anaerobic power assessment',
          category: 'anaerobic_power',
          estimatedDuration: 15,
          equipmentRequired: ['Cycle Ergometer', 'Heart Rate Monitor', 'Stopwatch'],
          instructions: 'Perform 30-second all-out sprint against body weight resistance. Ensure proper warm-up completed.',
          hasTimer: true,
          hasMedia: true,
          safetyNotes: ['Ensure proper warm-up completed', 'Monitor for signs of distress', 'Have emergency equipment available'],
          dataFields: [
            { id: 'warmup_confirmed', name: 'Warm-up Completed', type: 'checkbox', required: true },
            { id: 'peak_power_w', name: 'Peak Power', type: 'number', unit: 'W', required: true, min: 0, max: 2000 },
            { id: 'peak_power_relative', name: 'Peak Power (Relative)', type: 'number', unit: 'W/kg', required: true, min: 0, max: 30 },
            { id: 'mean_power', name: 'Mean Power', type: 'number', unit: 'W', required: true, min: 0, max: 1500 },
            { id: 'fatigue_index', name: 'Fatigue Index', type: 'number', unit: '%', required: true, min: 0, max: 100 }
          ]
        },
        {
          id: 'vertical-jump',
          name: 'Vertical Jump (ForceDecks / Jump Mat)',
          description: 'Countermovement jump assessment using force plates or jump mat',
          category: 'anaerobic_power',
          estimatedDuration: 10,
          equipmentRequired: ['ForceDecks', 'Jump Mat'],
          instructions: 'Stand with feet shoulder-width apart. Perform countermovement jump with arms. Take best of 3 trials.',
          hasMedia: true,
          dataFields: [
            { id: 'measurement_method', name: 'Measurement Method', type: 'dropdown', required: true, 
              options: ['ForceDecks', 'Jump Mat', 'Vertec', 'Wall Mark'] },
            { id: 'jump_height', name: 'Jump Height', type: 'number', unit: 'cm', required: true, min: 0, max: 100 },
            { id: 'peak_power', name: 'Peak Power', type: 'number', unit: 'W', required: false, min: 0, max: 5000 },
            { id: 'mean_power', name: 'Mean Power', type: 'number', unit: 'W', required: false, min: 0, max: 3000 },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 'cm', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 'cm', required: true },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 'cm', required: true }
          ],
          calculations: [
            {
              id: 'best_jump',
              name: 'Best Jump Height',
              formula: 'Math.max(trial_1, trial_2, trial_3)',
              unit: 'cm',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            }
          ]
        },
        {
          id: 'broad-jump',
          name: 'Broad Jump Test',
          description: 'Standing long jump for horizontal power assessment',
          category: 'anaerobic_power',
          estimatedDuration: 8,
          equipmentRequired: ['Measuring Tape', 'Non-slip Surface'],
          instructions: 'Stand behind take-off line. Jump as far as possible horizontally. Measure from take-off line to nearest landing point.',
          hasMedia: true,
          dataFields: [
            { id: 'jump_distance', name: 'Jump Distance', type: 'number', unit: 'cm', required: true, min: 0, max: 400 },
            { id: 'athlete_height', name: 'Athlete Height', type: 'number', unit: 'cm', required: true, min: 140, max: 220 },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 'cm', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 'cm', required: true },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 'cm', required: true }
          ],
          calculations: [
            {
              id: 'best_distance',
              name: 'Best Distance',
              formula: 'Math.max(trial_1, trial_2, trial_3)',
              unit: 'cm',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            },
            {
              id: 'relative_to_height',
              name: 'Relative to Height',
              formula: '(jump_distance / athlete_height) * 100',
              unit: '%',
              dependsOn: ['jump_distance', 'athlete_height']
            }
          ]
        },
        {
          id: 'time-to-peak',
          name: 'Time-to-Peak Force',
          description: 'Measures the time taken to reach peak force during an explosive movement',
          category: 'anaerobic_power',
          estimatedDuration: 10,
          equipmentRequired: ['Force Plates', 'High-Speed Camera'],
          instructions: 'Perform a maximal vertical jump or isometric pull. Analyze force-time curve for time to peak force.',
          hasMedia: true,
          dataFields: [
            { id: 'peak_force_n', name: 'Peak Force', type: 'number', unit: 'N', required: true },
            { id: 'time_to_peak_ms', name: 'Time to Peak', type: 'number', unit: 'ms', required: true },
            { id: 'movement_type', name: 'Movement Type', type: 'dropdown', required: true, options: ['CMJ', 'IMTP'] }
          ]
        },
        {
          id: 'flight-time',
          name: 'Flight Time',
          description: 'Measures the duration an athlete is airborne during a jump',
          category: 'anaerobic_power',
          estimatedDuration: 8,
          equipmentRequired: ['Jump Mat', 'Force Plates'],
          instructions: 'Perform a maximal vertical jump. Flight time is calculated from jump mat or force plate data.',
          hasTimer: true,
          dataFields: [
            { id: 'flight_time_ms', name: 'Flight Time', type: 'number', unit: 'ms', required: true },
            { id: 'jump_height_calc', name: 'Calculated Jump Height', type: 'number', unit: 'cm', required: false }
          ],
          calculations: [
            { id: 'jump_height_from_ft', name: 'Jump Height (from Flight Time)', formula: '(flight_time_ms / 1000) * (flight_time_ms / 1000) * 9.81 * 100 / 8', unit: 'cm', dependsOn: ['flight_time_ms'] }
          ]
        }
      ]
    },
    {
      id: 'sub-3-2',
      name: 'Speed, Acceleration & Agility',
      description: 'Assessment of linear speed, acceleration, and change of direction ability',
      tests: [
        {
          id: 'timing-gates',
          name: 'Timing Gates (5m, 10m, 30m)',
          description: 'Sprint speed assessment at multiple distances',
          category: 'speed_agility',
          estimatedDuration: 12,
          equipmentRequired: ['Timing Gates', 'Measuring Tape'],
          instructions: 'Sprint maximally through timing gates. Start 0.5m behind first gate. Take best of 3 trials.',
          hasTimer: true,
          hasMedia: true,
          dataFields: [
            { id: 'distance', name: 'Distance', type: 'dropdown', required: true, options: ['5m', '10m', '30m'] },
            { id: 'time_seconds', name: 'Time', type: 'number', unit: 's', required: true, min: 0, max: 10, step: 0.01 },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 's', required: true, step: 0.01 },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 's', required: true, step: 0.01 },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 's', required: true, step: 0.01 }
          ],
          calculations: [
            {
              id: 'best_time',
              name: 'Best Time',
              formula: 'Math.min(trial_1, trial_2, trial_3)',
              unit: 's',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            },
            {
              id: 'speed',
              name: 'Speed',
              formula: 'parseFloat(distance) / time_seconds',
              unit: 'm/s',
              dependsOn: ['distance', 'time_seconds']
            }
          ]
        },
        {
          id: 't-test',
          name: 'T-Test',
          description: 'Agility test involving forward, lateral, and backward movements',
          category: 'speed_agility',
          estimatedDuration: 10,
          equipmentRequired: ['4 Cones', 'Stopwatch', 'Measuring Tape'],
          instructions: 'Sprint forward to cone B, shuffle left to A, shuffle right to C, shuffle left to B, backpedal to start.',
          hasTimer: true,
          hasMedia: true,
          dataFields: [
            { id: 'completion_time', name: 'Completion Time', type: 'number', unit: 's', required: true, min: 0, max: 30, step: 0.01 },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 's', required: true, step: 0.01 },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 's', required: true, step: 0.01 },
            { id: 'shuttle_breakdown', name: 'Shuttle Breakdown', type: 'text', required: false, placeholder: 'Optional timing splits' }
          ],
          calculations: [
            {
              id: 'best_time',
              name: 'Best Time',
              formula: 'Math.min(trial_1, trial_2)',
              unit: 's',
              dependsOn: ['trial_1', 'trial_2']
            }
          ]
        },
        {
          id: '505-agility',
          name: '505 Agility Test',
          description: 'Measures agility and change of direction speed over 5 and 10 meters',
          category: 'speed_agility',
          estimatedDuration: 10,
          equipmentRequired: ['Timing Gates', 'Cones', 'Measuring Tape'],
          instructions: 'Sprint 10m, turn 180 degrees, sprint back 5m. Record time for the 5m segment.',
          hasTimer: true,
          dataFields: [
            { id: 'time_5m_sprint', name: '5m Sprint Time', type: 'number', unit: 's', required: true, step: 0.01 },
            { id: 'time_10m_sprint', name: '10m Sprint Time', type: 'number', unit: 's', required: true, step: 0.01 },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 's', required: true, step: 0.01 },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 's', required: true, step: 0.01 }
          ]
        },
        {
          id: 'illinois-agility',
          name: 'Illinois Agility Test',
          description: 'Standardized agility course with multiple direction changes',
          category: 'speed_agility',
          estimatedDuration: 8,
          equipmentRequired: ['8 Cones', 'Stopwatch', 'Measuring Tape'],
          instructions: 'Complete the Illinois agility course as quickly as possible. Follow the prescribed path around cones.',
          hasTimer: true,
          hasMedia: true,
          dataFields: [
            { id: 'completion_time', name: 'Completion Time', type: 'number', unit: 's', required: true, min: 0, max: 30, step: 0.01 },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 's', required: true, step: 0.01 },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 's', required: true, step: 0.01 }
          ],
          calculations: [
            {
              id: 'best_time',
              name: 'Best Time',
              formula: 'Math.min(trial_1, trial_2)',
              unit: 's',
              dependsOn: ['trial_1', 'trial_2']
            }
          ]
        },
        {
          id: 'yoyo-ir-test',
          name: 'Yo-Yo Intermittent Recovery Test',
          description: 'Intermittent running test with recovery periods',
          category: 'speed_agility',
          estimatedDuration: 20,
          equipmentRequired: ['Audio System', 'Cones', 'Measuring Tape'],
          instructions: 'Run 2x20m shuttles followed by 10s active recovery. Continue until exhaustion.',
          hasTimer: true,
          hasAudio: true,
          hasMedia: true,
          dataFields: [
            { id: 'level_reached', name: 'Level Reached', type: 'number', required: true, min: 1, max: 25 },
            { id: 'shuttle_count', name: 'Shuttle Count', type: 'number', required: true, min: 0, max: 50 },
            { id: 'total_distance', name: 'Total Distance', type: 'number', unit: 'm', required: false }
          ],
          calculations: [
            {
              id: 'estimated_vo2max',
              name: 'Estimated VO₂max',
              formula: 'total_distance * 0.0084 + 36.4',
              unit: 'ml/kg/min',
              dependsOn: ['total_distance']
            }
          ]
        },
        {
          id: 'max-run-up-speed',
          name: 'Max Run-Up Speed',
          description: 'Measures maximum speed achieved during a sport-specific run-up (e.g., bowling, pitching)',
          category: 'speed_agility',
          estimatedDuration: 10,
          equipmentRequired: ['Radar Gun', 'Timing Gates (optional)'],
          instructions: 'Perform a maximal effort run-up. Record peak speed using a radar gun.',
          hasMedia: true,
          dataFields: [
            { id: 'peak_speed_kmh', name: 'Peak Speed', type: 'number', unit: 'km/h', required: true, min: 0, max: 100 },
            { id: 'run_up_distance_m', name: 'Run-up Distance', type: 'number', unit: 'm', required: false },
            { id: 'sport_context', name: 'Sport Context', type: 'text', required: false, placeholder: 'e.g., Cricket Bowling, Baseball Pitching' }
          ]
        }
      ]
    },
    {
      id: 'sub-3-3',
      name: 'Reaction, Coordination & Reflex',
      description: 'Assessment of reaction time, neuromuscular coordination, and reflex responses',
      tests: [
        {
          id: 'simple-reaction-time',
          name: 'Simple Reaction Time (Light/Sound)',
          description: 'Measurement of simple reaction time to visual or auditory stimulus',
          category: 'reaction_coordination',
          estimatedDuration: 10,
          equipmentRequired: ['Reaction Timer', 'Light/Sound Stimulus'],
          instructions: 'Respond as quickly as possible to the stimulus. Complete 10 trials with adequate rest between.',
          hasTimer: true,
          hasMedia: true,
          dataFields: [
            { id: 'stimulus_type', name: 'Stimulus Type', type: 'dropdown', required: true, options: ['Light', 'Sound'] },
            { id: 'avg_reaction_time', name: 'Average Reaction Time', type: 'number', unit: 'ms', required: true, min: 0, max: 1000 },
            { id: 'best_trial', name: 'Best Trial', type: 'number', unit: 'ms', required: true, min: 0, max: 1000 },
            { id: 'worst_trial', name: 'Worst Trial', type: 'number', unit: 'ms', required: true, min: 0, max: 1000 },
            { id: 'consistency', name: 'Consistency (CV)', type: 'number', unit: '%', required: false }
          ]
        },
        {
          id: 'deep-tendon-reflexes',
          name: 'Deep Tendon Reflexes (DTR)',
          description: 'Assessment of deep tendon reflex responses',
          category: 'reaction_coordination',
          estimatedDuration: 15,
          equipmentRequired: ['Reflex Hammer', 'Examination Table'],
          instructions: 'Test reflexes at standard anatomical locations. Grade response on 0-4+ scale.',
          hasMedia: true,
          safetyNotes: ['Ensure patient is relaxed', 'Use appropriate force', 'Test bilaterally for comparison'],
          dataFields: [
            { id: 'reflex_type', name: 'Reflex Type', type: 'dropdown', required: true, 
              options: ['Patellar', 'Achilles', 'Biceps', 'Triceps', 'Brachioradialis'] },
            { id: 'left_response', name: 'Left Response', type: 'dropdown', required: true, 
              options: ['0 (Absent)', '1+ (Hypoactive)', '2+ (Normal)', '3+ (Hyperactive)', '4+ (Clonus)'] },
            { id: 'right_response', name: 'Right Response', type: 'dropdown', required: true, 
              options: ['0 (Absent)', '1+ (Hypoactive)', '2+ (Normal)', '3+ (Hyperactive)', '4+ (Clonus)'] },
            { id: 'symmetry', name: 'Symmetry', type: 'boolean', required: true }
          ]
        },
        {
          id: 'h-reflex',
          name: 'Hoffmann\'s Reflex (H-reflex)',
          description: 'Electrophysiological assessment of spinal reflex arc',
          category: 'reaction_coordination',
          estimatedDuration: 25,
          equipmentRequired: ['EMG System', 'Stimulator', 'Electrodes'],
          instructions: 'Stimulate tibial nerve and record H-reflex from soleus muscle. Ensure proper electrode placement.',
          hasMedia: true,
          safetyNotes: ['Electrical stimulation - ensure proper grounding', 'Check for contraindications', 'Trained personnel only'],
          dataFields: [
            { id: 'latency', name: 'H-reflex Latency', type: 'number', unit: 'ms', required: true, min: 0, max: 50 },
            { id: 'amplitude', name: 'H-reflex Amplitude', type: 'number', unit: 'mV', required: true, min: 0, max: 10 },
            { id: 'm_wave_amplitude', name: 'M-wave Amplitude', type: 'number', unit: 'mV', required: true, min: 0, max: 20 },
            { id: 'h_m_ratio', name: 'H/M Ratio', type: 'number', unit: 'ratio', required: false, min: 0, max: 1 }
          ],
          calculations: [
            {
              id: 'h_m_ratio_calc',
              name: 'H/M Ratio',
              formula: 'amplitude / m_wave_amplitude',
              unit: 'ratio',
              dependsOn: ['amplitude', 'm_wave_amplitude']
            }
          ]
        },
        {
          id: 'vor-test',
          name: 'Vestibulo-Ocular Reflex (VOR)',
          description: 'Assessment of vestibular system and eye movement coordination',
          category: 'reaction_coordination',
          estimatedDuration: 20,
          equipmentRequired: ['VOR Testing Device', 'Video Recording'],
          instructions: 'Perform head impulse test or dynamic visual acuity assessment. Record eye movements.',
          hasMedia: true,
          safetyNotes: ['Check for neck problems', 'Stop if dizziness occurs', 'Have support available'],
          dataFields: [
            { id: 'test_type', name: 'Test Type', type: 'dropdown', required: true, 
              options: ['Head Impulse Test', 'Dynamic Visual Acuity', 'Rotary Chair'] },
            { id: 'gain_ratio', name: 'VOR Gain', type: 'number', unit: 'ratio', required: true, min: 0, max: 2 },
            { id: 'saccade_present', name: 'Corrective Saccades', type: 'boolean', required: true },
            { id: 'asymmetry', name: 'Asymmetry Present', type: 'boolean', required: false }
          ]
        }
      ]
    },
    {
      id: 'sub-3-4',
      name: 'Functional Fitness Simulation',
      description: 'Real-world movement patterns and obstacle-based assessments',
      tests: [
        {
          id: 'ioct',
          name: 'Indoor Obstacle Course Test (IOCT)',
          description: 'Standardized obstacle course simulating real-world movements',
          category: 'functional_simulation',
          estimatedDuration: 15,
          equipmentRequired: ['Obstacle Course Setup', 'Stopwatch', 'Safety Equipment'],
          instructions: 'Complete the standardized obstacle course as quickly as possible while maintaining proper form.',
          hasTimer: true,
          hasMedia: true,
          safetyNotes: ['Ensure proper warm-up', 'Check equipment stability', 'Have spotter available'],
          dataFields: [
            { id: 'total_time', name: 'Total Time', type: 'number', unit: 's', required: true, min: 0, max: 300 },
            { id: 'penalties', name: 'Penalties', type: 'number', required: true, min: 0, max: 10 },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 's', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 's', required: false },
            { id: 'form_breakdown', name: 'Form Breakdown Point', type: 'text', required: false }
          ],
          calculations: [
            {
              id: 'adjusted_time',
              name: 'Penalty-Adjusted Time',
              formula: 'total_time + (penalties * 5)',
              unit: 's',
              dependsOn: ['total_time', 'penalties']
            }
          ]
        },
        {
          id: 'custom-obstacle',
          name: 'Custom Obstacle Circuit',
          description: 'Customizable obstacle course with selectable elements',
          category: 'functional_simulation',
          estimatedDuration: 20,
          equipmentRequired: ['Modular Obstacles', 'Stopwatch', 'Safety Equipment'],
          instructions: 'Complete selected obstacle elements in sequence. Time each element and total course.',
          hasTimer: true,
          hasMedia: true,
          dataFields: [
            { id: 'crawl_selected', name: 'Crawl Element', type: 'checkbox', required: false },
            { id: 'crawl_time', name: 'Crawl Time', type: 'number', unit: 's', required: false },
            { id: 'climb_selected', name: 'Climb Element', type: 'checkbox', required: false },
            { id: 'climb_time', name: 'Climb Time', type: 'number', unit: 's', required: false },
            { id: 'jump_selected', name: 'Jump Element', type: 'checkbox', required: false },
            { id: 'jump_time', name: 'Jump Time', type: 'number', unit: 's', required: false },
            { id: 'carry_selected', name: 'Carry Element', type: 'checkbox', required: false },
            { id: 'carry_time', name: 'Carry Time', type: 'number', unit: 's', required: false },
            { id: 'total_time', name: 'Total Circuit Time', type: 'number', unit: 's', required: true }
          ],
          calculations: [
            {
              id: 'element_count',
              name: 'Elements Completed',
              formula: '(crawl_selected ? 1 : 0) + (climb_selected ? 1 : 0) + (jump_selected ? 1 : 0) + (carry_selected ? 1 : 0)',
              unit: 'count',
              dependsOn: ['crawl_selected', 'climb_selected', 'jump_selected', 'carry_selected']
            }
          ]
        }
      ]
    },
    {
      id: 'sub-3-5',
      name: 'Neuromuscular Readiness',
      description: 'Daily assessments to monitor an athlete\'s readiness to perform and adapt to training',
      tests: [
        {
          id: 'daily-readiness-assessment',
          name: 'Daily Readiness Assessment',
          description: 'A quick morning check to gauge an athlete\'s physical and mental readiness',
          category: 'neuromuscular_readiness',
          estimatedDuration: 5,
          equipmentRequired: ['None (Self-Report)', 'Optional: Jump Mat for CMJ'],
          instructions: 'Athlete completes a short questionnaire and/or performs a single countermovement jump.',
          hasTimer: false,
          hasMedia: false,
          safetyNotes: [],
          dataFields: [
            { id: 'sleep_quality', name: 'Sleep Quality (1-5)', type: 'number', unit: 'score', required: true, min: 1, max: 5 },
            { id: 'muscle_soreness', name: 'Muscle Soreness (1-5)', type: 'number', unit: 'score', required: true, min: 1, max: 5 },
            { id: 'stress_level', name: 'Stress Level (1-5)', type: 'number', unit: 'score', required: true, min: 1, max: 5 },
            { id: 'mood', name: 'Mood (1-5)', type: 'number', unit: 'score', required: true, min: 1, max: 5 },
            { id: 'cmj_height_cm', name: 'CMJ Height (Optional)', type: 'number', unit: 'cm', required: false },
            { id: 'readiness_notes', name: 'Notes', type: 'text', required: false, placeholder: 'Any additional comments on readiness...' }
          ],
          calculations: [
            { id: 'overall_readiness_score', name: 'Overall Readiness Score', formula: '(sleep_quality + (6-muscle_soreness) + (6-stress_level) + mood) / 4', unit: 'score', dependsOn: ['sleep_quality', 'muscle_soreness', 'stress_level', 'mood'] }
          ]
        }
      ]
    }
  ]
};