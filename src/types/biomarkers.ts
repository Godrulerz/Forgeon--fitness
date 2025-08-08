export interface BiomarkerModule {
  id: string;
  name: string;
  description: string;
  subModules: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  description: string;
  tests: BiomarkerTest[];
}

export interface BiomarkerTest {
  id: string;
  name: string;
  description: string;
  category: 'blood_markers' | 'hormonal_markers' | 'nutritional_markers';
  estimatedDuration: number; // minutes (for manual entry)
  equipmentRequired: string[]; // e.g., 'Lab Report', 'Manual Entry'
  instructions: string;
  dataFields: DataField[];
  hasBatchImport?: boolean; // For CSV import
  calculations?: Calculation[];
}

export interface DataField {
  id: string;
  name: string;
  type: 'number' | 'text' | 'dropdown' | 'boolean' | 'date';
  unit?: string;
  required: boolean;
  options?: string[]; // for dropdown
  min?: number;
  max?: number;
  placeholder?: string;
  step?: number;
}

export interface Calculation {
  id: string;
  name: string;
  formula: string;
  unit: string;
  dependsOn: string[]; // field IDs
}