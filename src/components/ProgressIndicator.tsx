import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  optional?: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  showLabels = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const getStepIcon = (step: Step, index: number) => {
    if (step.status === 'completed') {
      return <CheckCircle className={`${sizeClasses[size]} text-green-600`} />;
    } else if (step.status === 'current') {
      return (
        <div className={`${sizeClasses[size]} bg-blue-600 text-white rounded-full flex items-center justify-center font-medium`}>
          {index + 1}
        </div>
      );
    } else {
      return (
        <div className={`${sizeClasses[size]} bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-medium`}>
          {index + 1}
        </div>
      );
    }
  };

  const getConnectorClass = (index: number) => {
    if (index < currentStep) {
      return 'bg-green-600';
    } else if (index === currentStep) {
      return 'bg-blue-600';
    } else {
      return 'bg-gray-200';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className="relative">
                {getStepIcon(step, index)}
                {step.optional && (
                  <span className="absolute -top-1 -right-1 text-xs text-gray-400">?</span>
                )}
              </div>
              {showLabels && (
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    step.status === 'current' ? 'text-blue-600' : 
                    step.status === 'completed' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  {step.optional && (
                    <div className="text-xs text-gray-400">Optional</div>
                  )}
                </div>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-1 rounded-full transition-colors duration-300 ${getConnectorClass(index)}`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};