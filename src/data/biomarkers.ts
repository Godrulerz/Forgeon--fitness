import { BiomarkerModule } from '../types/biomarkers';

export const biomarkerModule: BiomarkerModule = {
  id: 'module-6',
  name: 'Biomarker & Lab Testing',
  description: 'Manual entry and batch import of lab results for comprehensive athlete monitoring',
  subModules: [
    {
      id: 'sub-6-1',
      name: 'Blood Markers',
      description: 'Key blood markers related to inflammation, muscle damage, and general health',
      tests: [
        {
          id: 'ck-mm',
          name: 'Creatine Kinase (CK-MM)',
          description: 'Measures muscle damage and recovery status',
          category: 'blood_markers',
          estimatedDuration: 5,
          equipmentRequired: ['Lab Report', 'Manual Entry'],
          instructions: 'Enter CK-MM value from lab report. Note sample date and time.',
          dataFields: [
            { id: 'ck_mm_value', name: 'CK-MM Value', type: 'number', unit: 'U/L', required: true, min: 0 },
            { id: 'sample_date', name: 'Sample Date', type: 'date', required: true },
            { id: 'sample_time', name: 'Sample Time', type: 'text', placeholder: 'HH:MM', required: false }
          ]
        },
        {
          id: 'crp',
          name: 'C-Reactive Protein (CRP)',
          description: 'Indicates systemic inflammation',
          category: 'blood_markers',
          estimatedDuration: 5,
          equipmentRequired: ['Lab Report', 'Manual Entry'],
          instructions: 'Enter CRP value from lab report.',
          dataFields: [
            { id: 'crp_value', name: 'CRP Value', type: 'number', unit: 'mg/L', required: true, min: 0 },
            { id: 'sample_date', name: 'Sample Date', type: 'date', required: true }
          ]
        }
      ]
    },
    {
      id: 'sub-6-2',
      name: 'Hormonal Markers',
      description: 'Assessment of key hormonal balance for training adaptation and recovery',
      tests: [
        {
          id: 'tc-ratio',
          name: 'Testosterone:Cortisol Ratio',
          description: 'Ratio indicating anabolic/catabolic balance and overtraining risk',
          category: 'hormonal_markers',
          estimatedDuration: 5,
          equipmentRequired: ['Lab Report', 'Manual Entry'],
          instructions: 'Enter Testosterone and Cortisol values from lab report. Ratio will be calculated.',
          dataFields: [
            { id: 'testosterone_value', name: 'Testosterone', type: 'number', unit: 'nmol/L', required: true, min: 0 },
            { id: 'cortisol_value', name: 'Cortisol', type: 'number', unit: 'nmol/L', required: true, min: 0 },
            { id: 'sample_date', name: 'Sample Date', type: 'date', required: true }
          ],
          calculations: [
            { id: 'tc_ratio_calc', name: 'T:C Ratio', formula: 'testosterone_value / cortisol_value', unit: 'ratio', dependsOn: ['testosterone_value', 'cortisol_value'] }
          ]
        }
      ]
    },
    {
      id: 'sub-6-3',
      name: 'Nutritional Markers',
      description: 'Key vitamins and minerals essential for athlete performance and health',
      tests: [
        {
          id: 'vit-d',
          name: 'Vitamin D (25-OH)',
          description: 'Assesses Vitamin D status, crucial for bone health and immune function',
          category: 'nutritional_markers',
          estimatedDuration: 5,
          equipmentRequired: ['Lab Report', 'Manual Entry'],
          instructions: 'Enter 25-OH Vitamin D value from lab report.',
          dataFields: [
            { id: 'vit_d_value', name: 'Vitamin D', type: 'number', unit: 'nmol/L', required: true, min: 0 },
            { id: 'sample_date', name: 'Sample Date', type: 'date', required: true }
          ]
        },
        {
          id: 'ferritin',
          name: 'Ferritin',
          description: 'Indicates iron stores, important for oxygen transport',
          category: 'nutritional_markers',
          estimatedDuration: 5,
          equipmentRequired: ['Lab Report', 'Manual Entry'],
          instructions: 'Enter Ferritin value from lab report.',
          dataFields: [
            { id: 'ferritin_value', name: 'Ferritin', type: 'number', unit: 'µg/L', required: true, min: 0 },
            { id: 'sample_date', name: 'Sample Date', type: 'date', required: true }
          ]
        }
      ]
    }
  ]
};