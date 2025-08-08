import React, { useState } from 'react';
import { AssessmentStart } from './AssessmentStart';

type AssessmentStep = 'start' | 'workflow';

interface AssessmentManagerProps {
  moduleId?: string;
  onBack: () => void;
}

export const AssessmentManager: React.FC<AssessmentManagerProps> = ({
  moduleId,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('start');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(moduleId || null);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null);

  const handleStartAssessment = (moduleId: string, athleteId: string) => {
    setSelectedModuleId(moduleId);
    setSelectedAthleteId(athleteId);
    setCurrentStep('workflow');
  };

  const handleBackToStart = () => {
    setCurrentStep('start');
    setSelectedAthleteId(null);
  };

  if (currentStep === 'start' && selectedModuleId) {
    return (
      <AssessmentStart
        moduleId={selectedModuleId}
        onBack={onBack}
        onStartAssessment={handleStartAssessment}
      />
    );
  }

  if (currentStep === 'workflow') {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Assessment in Progress</h3>
          <p className="text-gray-600">
            {selectedModuleId ? `Module ${selectedModuleId} assessment` : 
             selectedProgramId ? `Test Program ${selectedProgramId} execution` : 
             'Assessment workflow'} would be implemented here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Assessment Setup</h3>
      <p className="text-gray-600">Please select a module to begin assessment.</p>
    </div>
  );
};