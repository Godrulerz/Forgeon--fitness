import { HealthRelatedModule } from '../types/healthRelatedFitness';

export const healthRelatedFitnessModule: HealthRelatedModule = {
  id: 'module-2',
  name: 'Health-Related Fitness',
  description: 'Comprehensive assessment of body composition, aerobic endurance, strength, and flexibility',
  subModules: [
    {
      id: 'sub-2-1',
      name: 'Body Composition & Anthropometry',
      description: 'Assessment of body composition using various methods',
      tests: [
        {
          id: 'dexa-scan',
          name: 'DEXA Scan',
          description: 'Dual-energy X-ray absorptiometry for precise body composition',
          category: 'body_composition',
          estimatedDuration: 15,
          equipmentRequired: ['DEXA Scanner'],
          instructions: 'Position athlete supine on scanner bed. Ensure minimal clothing and remove all metal objects.',
          hasMedia: true,
          dataFields: [
            { id: 'total_mass', name: 'Total Mass', type: 'number', unit: 'kg', required: true },
            { id: 'fat_mass', name: 'Fat Mass', type: 'number', unit: 'kg', required: true },
            { id: 'lean_mass', name: 'Lean Mass', type: 'number', unit: 'kg', required: true },
            { id: 'bone_density', name: 'Bone Mineral Density', type: 'number', unit: 'g/cm²', required: true }
          ],
          calculations: [
            {
              id: 'body_fat_percentage',
              name: 'Body Fat Percentage',
              formula: '(fat_mass / total_mass) * 100',
              unit: '%',
              dependsOn: ['fat_mass', 'total_mass']
            }
          ]
        },
        {
          id: 'skinfolds-7site',
          name: 'Skinfolds (7-site)',
          description: 'Seven-site skinfold measurement for body fat estimation',
          category: 'body_composition',
          estimatedDuration: 10,
          equipmentRequired: ['Skinfold Calipers'],
          instructions: 'Take measurements on right side of body. Pinch skin and subcutaneous fat, apply calipers 1cm below fingers.',
          hasMedia: true,
          dataFields: [
            { id: 'chest', name: 'Chest', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'axilla', name: 'Axilla', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'tricep', name: 'Tricep', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'subscapular', name: 'Subscapular', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'abdomen', name: 'Abdomen', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'suprailiac', name: 'Suprailiac', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'thigh', name: 'Thigh', type: 'number', unit: 'mm', required: true, min: 0, max: 50 }
          ],
          calculations: [
            {
              id: 'sum_skinfolds',
              name: 'Sum of Skinfolds',
              formula: 'chest + axilla + tricep + subscapular + abdomen + suprailiac + thigh',
              unit: 'mm',
              dependsOn: ['chest', 'axilla', 'tricep', 'subscapular', 'abdomen', 'suprailiac', 'thigh']
            }
          ]
        },
        {
          id: 'bia',
          name: 'BIA',
          description: 'Bioelectrical Impedance Analysis',
          category: 'body_composition',
          estimatedDuration: 5,
          equipmentRequired: ['BIA Device'],
          instructions: 'Ensure athlete is hydrated, has not exercised recently, and has removed shoes and socks.',
          dataFields: [
            { id: 'impedance', name: 'Impedance', type: 'number', unit: 'Ω', required: true },
            { id: 'body_fat_percent', name: 'Body Fat %', type: 'number', unit: '%', required: true },
            { id: 'muscle_mass', name: 'Muscle Mass', type: 'number', unit: 'kg', required: true },
            { id: 'water_percent', name: 'Body Water %', type: 'number', unit: '%', required: true }
          ]
        },
        {
          id: 'girth-measurements',
          name: 'Girth Measurements',
          description: 'Circumference measurements at key body sites',
          category: 'body_composition',
          estimatedDuration: 8,
          equipmentRequired: ['Measuring Tape'],
          instructions: 'Use non-elastic tape measure. Take measurements at end of normal expiration.',
          dataFields: [
            { id: 'waist', name: 'Waist', type: 'number', unit: 'cm', required: true },
            { id: 'hip', name: 'Hip', type: 'number', unit: 'cm', required: true },
            { id: 'neck', name: 'Neck', type: 'number', unit: 'cm', required: true },
            { id: 'chest', name: 'Chest', type: 'number', unit: 'cm', required: true },
            { id: 'arm_relaxed', name: 'Arm (Relaxed)', type: 'number', unit: 'cm', required: true },
            { id: 'arm_flexed', name: 'Arm (Flexed)', type: 'number', unit: 'cm', required: true },
            { id: 'thigh', name: 'Thigh', type: 'number', unit: 'cm', required: true }
          ],
          calculations: [
            {
              id: 'waist_hip_ratio',
              name: 'Waist-Hip Ratio',
              formula: 'waist / hip',
              unit: 'ratio',
              dependsOn: ['waist', 'hip']
            },
            {
              id: 'body_fat_navy',
              name: 'Body Fat % (Navy Method)',
              formula: 'gender === "male" ? 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76 : 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387',
              unit: '%',
              dependsOn: ['waist', 'neck', 'height', 'gender', 'hip']
            }
          ]
        },
        {
          id: 'skinfolds-8site',
          name: 'Skinfolds (8-site)',
          description: 'Eight-site skinfold measurement for body fat estimation, including calf.',
          category: 'body_composition',
          estimatedDuration: 12,
          equipmentRequired: ['Skinfold Calipers'],
          instructions: 'Take measurements on right side of body. Pinch skin and subcutaneous fat, apply calipers 1cm below fingers. Add calf measurement.',
          hasMedia: true,
          dataFields: [
            { id: 'chest', name: 'Chest', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'axilla', name: 'Axilla', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'tricep', name: 'Tricep', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'subscapular', name: 'Subscapular', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'abdomen', name: 'Abdomen', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'suprailiac', name: 'Suprailiac', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'thigh', name: 'Thigh', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'calf', name: 'Calf', type: 'number', unit: 'mm', required: true, min: 0, max: 50 }
          ],
          calculations: [
            {
              id: 'sum_skinfolds_8',
              name: 'Sum of 8 Skinfolds',
              formula: 'chest + axilla + tricep + subscapular + abdomen + suprailiac + thigh + calf',
              unit: 'mm',
              dependsOn: ['chest', 'axilla', 'tricep', 'subscapular', 'abdomen', 'suprailiac', 'thigh', 'calf']
            }
          ]
        }
      ]
    },
    {
      id: 'sub-2-2',
      name: 'Aerobic Endurance',
      description: 'Assessment of cardiovascular fitness and aerobic capacity',
      tests: [
        {
          id: 'cpet-lab',
          name: 'CPET (Lab)',
          description: 'Cardiopulmonary Exercise Test with metabolic cart',
          category: 'aerobic_endurance',
          estimatedDuration: 45,
          equipmentRequired: ['Metabolic Cart', 'Cycle Ergometer', 'ECG Monitor'],
          instructions: 'Incremental test starting at 50W, increasing 25W every minute until exhaustion.',
          hasMedia: true,
          dataFields: [
            { id: 'vo2_max', name: 'VO₂ Max', type: 'number', unit: 'ml/kg/min', required: true },
            { id: 'max_hr', name: 'Max Heart Rate', type: 'number', unit: 'bpm', required: true },
            { id: 'max_power', name: 'Max Power', type: 'number', unit: 'W', required: true },
            { id: 'rer_max', name: 'Max RER', type: 'number', unit: 'ratio', required: true },
            { id: 'test_duration', name: 'Test Duration', type: 'time', required: true }
          ]
        },
        {
          id: 'shuttle-run-20m',
          name: '20m Shuttle Run',
          description: 'Progressive shuttle run test with audio cues',
          category: 'aerobic_endurance',
          estimatedDuration: 20,
          equipmentRequired: ['Cones', 'Audio System', '20m Space'],
          instructions: 'Run between 20m markers in time with audio beeps. Speed increases each level.',
          hasTimer: true,
          dataFields: [
            { id: 'final_level', name: 'Final Level', type: 'number', required: true, min: 1, max: 21 },
            { id: 'final_shuttles', name: 'Final Shuttles', type: 'number', required: true, min: 0, max: 15 },
            { id: 'total_shuttles', name: 'Total Shuttles', type: 'number', required: true }
          ],
          calculations: [
            {
              id: 'estimated_vo2max',
              name: 'Estimated VO₂ Max',
              formula: '31.025 + (3.238 * final_level) - (3.248 * age) + (0.1536 * final_level * age)',
              unit: 'ml/kg/min',
              dependsOn: ['final_level']
            }
          ]
        },
        {
          id: 'cooper-12min',
          name: 'Cooper 12-min Run',
          description: '12-minute maximal distance run test',
          category: 'aerobic_endurance',
          estimatedDuration: 15,
          equipmentRequired: ['400m Track', 'Stopwatch'],
          instructions: 'Run as far as possible in 12 minutes. Record total distance covered.',
          hasTimer: true,
          dataFields: [
            { id: 'distance', name: 'Distance', type: 'number', unit: 'm', required: true, min: 1000, max: 4000 },
            { id: 'laps_completed', name: 'Laps Completed', type: 'number', required: true }
          ],
          calculations: [
            {
              id: 'estimated_vo2max',
              name: 'Estimated VO₂ Max',
              formula: '(distance - 504.9) / 44.73',
              unit: 'ml/kg/min',
              dependsOn: ['distance']
            }
          ]
        },
        {
          id: 'ift-30-15',
          name: '30-15 IFT',
          description: '30-15 Intermittent Fitness Test for intermittent endurance capacity',
          category: 'aerobic_endurance',
          estimatedDuration: 25,
          equipmentRequired: ['Cones', 'Audio System', '40m Space'],
          instructions: 'Run 30m shuttles with 15s active recovery. Speed increases progressively. Record final speed.',
          hasTimer: true,
          //hasAudio: true,
          dataFields: [
            { id: 'final_speed', name: 'Final Speed', type: 'number', unit: 'km/h', required: true, min: 8, max: 24 },
            { id: 'total_distance', name: 'Total Distance', type: 'number', unit: 'm', required: true },
            { id: 'max_hr', name: 'Max Heart Rate', type: 'number', unit: 'bpm', required: false }
          ]
        }
      ]
    },
    {
      id: 'sub-2-3',
      name: 'Muscular Strength & Endurance',
      description: 'Assessment of muscular strength, power, and endurance',
      tests: [
        {
          id: 'handheld-dynamometry',
          name: 'Handheld Dynamometry',
          description: 'Isometric strength testing using handheld dynamometer',
          category: 'strength_endurance',
          estimatedDuration: 15,
          equipmentRequired: ['Handheld Dynamometer'],
          instructions: 'Test major muscle groups. 3 trials per muscle group with 30s rest between trials.',
          dataFields: [
            { id: 'muscle_group', name: 'Muscle Group', type: 'dropdown', required: true, 
              options: ['Shoulder Flexors', 'Shoulder Extensors', 'Elbow Flexors', 'Elbow Extensors', 'Hip Flexors', 'Hip Extensors', 'Knee Flexors', 'Knee Extensors'] },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 'kg', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 'kg', required: true },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 'kg', required: true }
          ],
          calculations: [
            {
              id: 'max_force',
              name: 'Maximum Force',
              formula: 'Math.max(trial_1, trial_2, trial_3)',
              unit: 'kg',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            }
          ]
        },
        {
          id: 'imtp-peak-force',
          name: 'IMTP Peak Force',
          description: 'Isometric Mid-Thigh Pull Peak Force assessment using force plates',
          category: 'strength_endurance',
          estimatedDuration: 15,
          equipmentRequired: ['Force Plates', 'Barbell', 'Pull Rack'],
          instructions: 'Perform maximal isometric pull from mid-thigh position. Record peak force.',
          hasMedia: true,
          dataFields: [
            { id: 'peak_force_n', name: 'Peak Force', type: 'number', unit: 'N', required: true, min: 0, max: 5000 },
            { id: 'rate_of_force_development', name: 'RFD (0-200ms)', type: 'number', unit: 'N/s', required: false },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 'N', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 'N', required: true },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 'N', required: true }
          ],
          calculations: [
            {
              id: 'best_peak_force',
              name: 'Best Peak Force',
              formula: 'Math.max(trial_1, trial_2, trial_3)',
              unit: 'N',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            }
          ]
        },
        {
          id: 'one-rm-testing',
          name: '1RM Testing',
          description: 'One repetition maximum testing for major lifts',
          category: 'strength_endurance',
          estimatedDuration: 30,
          equipmentRequired: ['Barbell', 'Weight Plates', 'Safety Equipment'],
          instructions: 'Progressive loading to determine 1RM. Ensure proper warm-up and safety protocols.',
          hasMedia: true,
          dataFields: [
            { id: 'lift_type', name: 'Lift Type', type: 'dropdown', required: true, 
              options: ['Back Squat', 'Bench Press', 'Deadlift', 'Overhead Press'] },
            { id: 'warmup_weight', name: 'Warm-up Weight', type: 'number', unit: 'kg', required: true },
            { id: 'one_rm', name: '1RM', type: 'number', unit: 'kg', required: true },
            { id: 'rpe', name: 'RPE', type: 'number', required: true, min: 1, max: 10 },
            { id: 'form_notes', name: 'Form Notes', type: 'text', required: false }
          ],
          calculations: [
            {
              id: 'relative_strength',
              name: 'Relative Strength',
              formula: 'one_rm / body_weight',
              unit: 'kg/kg',
              dependsOn: ['one_rm']
            }
          ]
        },
        {
          id: 'pushup-endurance',
          name: 'Push-Up Endurance',
          description: 'Maximum number of push-ups performed to exhaustion',
          category: 'strength_endurance',
          estimatedDuration: 5,
          equipmentRequired: ['Exercise Mat'],
          instructions: 'Perform push-ups with proper form until exhaustion. Count total repetitions.',
          hasTimer: true,
          dataFields: [
            { id: 'total_reps', name: 'Total Repetitions', type: 'number', required: true, min: 0 },
            { id: 'test_duration', name: 'Test Duration', type: 'time', required: true },
            { id: 'form_breakdown', name: 'Form Breakdown Point', type: 'number', required: false }
          ]
        },
        {
          id: 'plank-hold',
          name: 'Plank Hold',
          description: 'Maximum time holding plank position',
          category: 'strength_endurance',
          estimatedDuration: 5,
          equipmentRequired: ['Exercise Mat', 'Stopwatch'],
          instructions: 'Hold plank position with proper form. Stop when form breaks down.',
          hasTimer: true,
          dataFields: [
            { id: 'hold_time', name: 'Hold Time', type: 'time', required: true },
            { id: 'form_notes', name: 'Form Notes', type: 'text', required: false }
          ]
        }
      ]
    },
    {
      id: 'sub-2-4',
      name: 'Flexibility & Mobility',
      description: 'Assessment of joint range of motion and movement quality',
      tests: [
        {
          id: 'sit-and-reach',
          name: 'Sit-and-Reach',
          description: 'Hamstring and lower back flexibility test',
          category: 'flexibility',
          estimatedDuration: 5,
          equipmentRequired: ['Sit-and-Reach Box'],
          instructions: 'Sit with legs extended, reach forward as far as possible. Hold for 2 seconds.',
          dataFields: [
            { id: 'reach_distance', name: 'Reach Distance', type: 'number', unit: 'cm', required: true },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 'cm', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 'cm', required: true },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 'cm', required: true }
          ],
          calculations: [
            {
              id: 'best_reach',
              name: 'Best Reach',
              formula: 'Math.max(trial_1, trial_2, trial_3)',
              unit: 'cm',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            }
          ]
        },
        {
          id: 'fms',
          name: 'Functional Movement Screen (FMS)',
          description: 'Seven movement patterns scored 0-3',
          category: 'flexibility',
          estimatedDuration: 15,
          equipmentRequired: ['FMS Kit', 'Measuring Stick'],
          instructions: 'Score each movement pattern 0-3. Note asymmetries and pain.',
          hasMedia: true,
          dataFields: [
            { id: 'deep_squat', name: 'Deep Squat', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'hurdle_step_l', name: 'Hurdle Step (L)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'hurdle_step_r', name: 'Hurdle Step (R)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'inline_lunge_l', name: 'In-Line Lunge (L)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'inline_lunge_r', name: 'In-Line Lunge (R)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'shoulder_mobility_l', name: 'Shoulder Mobility (L)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'shoulder_mobility_r', name: 'Shoulder Mobility (R)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'active_straight_leg_l', name: 'Active Straight Leg (L)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'active_straight_leg_r', name: 'Active Straight Leg (R)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'trunk_stability', name: 'Trunk Stability', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'rotary_stability_l', name: 'Rotary Stability (L)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] },
            { id: 'rotary_stability_r', name: 'Rotary Stability (R)', type: 'dropdown', required: true, options: ['0', '1', '2', '3'] }
          ],
          calculations: [
            {
              id: 'total_score',
              name: 'Total FMS Score',
              formula: 'parseInt(deep_squat) + Math.min(parseInt(hurdle_step_l), parseInt(hurdle_step_r)) + Math.min(parseInt(inline_lunge_l), parseInt(inline_lunge_r)) + Math.min(parseInt(shoulder_mobility_l), parseInt(shoulder_mobility_r)) + Math.min(parseInt(active_straight_leg_l), parseInt(active_straight_leg_r)) + parseInt(trunk_stability) + Math.min(parseInt(rotary_stability_l), parseInt(rotary_stability_r))',
              unit: 'points',
              dependsOn: ['deep_squat', 'hurdle_step_l', 'hurdle_step_r', 'inline_lunge_l', 'inline_lunge_r', 'shoulder_mobility_l', 'shoulder_mobility_r', 'active_straight_leg_l', 'active_straight_leg_r', 'trunk_stability', 'rotary_stability_l', 'rotary_stability_r']
            }
          ]
        },
        {
          id: 'joint-rom',
          name: 'Joint-Specific ROM',
          description: 'Goniometric measurement of joint range of motion',
          category: 'flexibility',
          estimatedDuration: 20,
          equipmentRequired: ['Goniometer'],
          instructions: 'Measure active and passive ROM for selected joints. Record in degrees.',
          dataFields: [
            { id: 'joint', name: 'Joint', type: 'dropdown', required: true, 
              options: ['Shoulder Flexion', 'Shoulder Extension', 'Shoulder Abduction', 'Hip Flexion', 'Hip Extension', 'Knee Flexion', 'Ankle Dorsiflexion', 'Ankle Plantarflexion'] },
            { id: 'side', name: 'Side', type: 'dropdown', required: true, options: ['Left', 'Right'] },
            { id: 'active_rom', name: 'Active ROM', type: 'number', unit: '°', required: true },
            { id: 'passive_rom', name: 'Passive ROM', type: 'number', unit: '°', required: true },
            { id: 'pain_present', name: 'Pain Present', type: 'boolean', required: true }
          ]
        }
      ]
    },
    {
      id: 'sub-2-5',
      name: 'Balance & Proprioception',
      description: 'Assessment of static and dynamic balance, and proprioceptive capabilities',
      tests: [
        {
          id: 'y-balance-reach',
          name: 'Y-Balance Reach Test',
          description: 'Measures dynamic balance and proprioception in three directions',
          category: 'balance',
          estimatedDuration: 15,
          equipmentRequired: ['Y-Balance Kit', 'Measuring Tape'],
          instructions: 'Maintain single-leg stance while reaching as far as possible with the free limb in anterior, posteromedial, and posterolateral directions. Test both legs.',
          hasMedia: true,
          dataFields: [
            { id: 'leg_tested', name: 'Leg Tested', type: 'dropdown', required: true, options: ['Left', 'Right'] },
            { id: 'anterior_reach_1', name: 'Anterior Reach 1', type: 'number', unit: 'cm', required: true },
            { id: 'anterior_reach_2', name: 'Anterior Reach 2', type: 'number', unit: 'cm', required: true },
            { id: 'anterior_reach_3', name: 'Anterior Reach 3', type: 'number', unit: 'cm', required: true },
            { id: 'posteromedial_reach_1', name: 'Posteromedial Reach 1', type: 'number', unit: 'cm', required: true },
            { id: 'posteromedial_reach_2', name: 'Posteromedial Reach 2', type: 'number', unit: 'cm', required: true },
            { id: 'posteromedial_reach_3', name: 'Posteromedial Reach 3', type: 'number', unit: 'cm', required: true },
            { id: 'posterolateral_reach_1', name: 'Posterolateral Reach 1', type: 'number', unit: 'cm', required: true },
            { id: 'posterolateral_reach_2', name: 'Posterolateral Reach 2', type: 'number', unit: 'cm', required: true },
            { id: 'posterolateral_reach_3', name: 'Posterolateral Reach 3', type: 'number', unit: 'cm', required: true }
          ],
          calculations: [
            {
              id: 'composite_score',
              name: 'Composite Score',
              formula: '(Math.max(anterior_reach_1, anterior_reach_2, anterior_reach_3) + Math.max(posteromedial_reach_1, posteromedial_reach_2, posteromedial_reach_3) + Math.max(posterolateral_reach_1, posterolateral_reach_2, posterolateral_reach_3)) / (3 * leg_length)',
              unit: '%',
              dependsOn: ['anterior_reach_1', 'anterior_reach_2', 'anterior_reach_3', 'posteromedial_reach_1', 'posteromedial_reach_2', 'posteromedial_reach_3', 'posterolateral_reach_1', 'posterolateral_reach_2', 'posterolateral_reach_3', 'leg_length']
            },
            {
              id: 'asymmetry_alert',
              name: 'Asymmetry Alert',
              formula: 'Math.abs(left_composite_score - right_composite_score) > 4 ? "Alert: Asymmetry > 4%" : "Symmetry within normal limits"',
              unit: 'text',
              dependsOn: ['left_composite_score', 'right_composite_score']
            }
          ]
        }
      ]
    }
  ]
};