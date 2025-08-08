import React from 'react';
import { 
  Clock, 
  Users, 
  Settings, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Play,
  Edit,
  ArrowLeft
} from 'lucide-react';
import { TestProgram, ProtocolStep } from '../../types/testPrograms';

interface SubTest {
  id: string;
  name: string;
  description: string;
  order: number;
  estimatedDuration: number;
  category: 'measurement' | 'assessment' | 'calculation';
  required: boolean;
  protocol: any;
  dataPoints: any[];
  equipment: any[];
  instructions: string;
  safetyNotes?: string[];
}

interface TestProgramDetailProps {
  program: TestProgram;
  onBack: () => void;
  onEdit: () => void;
  onExecute: () => void;
}

const SubTestCard: React.FC<{ subtest: SubTest; index: number }> = ({ subtest, index }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      measurement: 'bg-blue-100 text-blue-700',
      assessment: 'bg-teal-100 text-teal-700',
      calculation: 'bg-purple-100 text-purple-700',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {index + 1}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{subtest.name}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(subtest.category)}`}>
              {subtest.category}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {subtest.required && (
            <AlertTriangle className="w-4 h-4 text-red-500" title="Required" />
          )}
          <span className="text-sm text-gray-500">{subtest.estimatedDuration}min</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{subtest.description}</p>
      
      <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
        <h5 className="text-xs font-semibold text-blue-900 mb-2 flex items-center">
          <Play className="w-3 h-3 mr-1" />
          How to Test
        </h5>
        <p className="text-xs text-blue-800 leading-relaxed font-medium">{subtest.instructions}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="font-medium text-gray-700">Data Points:</span>
          <p className="text-gray-600">{subtest.dataPoints.length} metrics</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Equipment:</span>
          <p className="text-gray-600">{subtest.equipment.length} items</p>
        </div>
      </div>
      
      {subtest.safetyNotes && subtest.safetyNotes.length > 0 && (
        <div className="mt-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <p className="text-xs font-medium text-yellow-800">Safety Notes:</p>
          <ul className="text-xs text-yellow-700 mt-1">
            {subtest.safetyNotes.map((note, idx) => (
              <li key={idx}>• {note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const TestProgramDetail: React.FC<TestProgramDetailProps> = ({
  program,
  onBack,
  onEdit,
  onExecute
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      theory: 'bg-blue-100 text-blue-700',
      practical: 'bg-green-100 text-green-700',
      field: 'bg-orange-100 text-orange-700',
      lab: 'bg-purple-100 text-purple-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{program.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(program.category)}`}>
                {program.category}
              </span>
              <span className={`w-3 h-3 rounded-full ${
                program.status === 'active' ? 'bg-green-500' : 
                program.status === 'draft' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
            </div>
            <p className="text-gray-600">{program.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onEdit}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Program</span>
          </button>
          <button
            onClick={() => onExecute(program.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Execute Test</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Duration</p>
              <p className="text-2xl font-bold text-gray-900">{program.estimatedDuration}min</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Subtests</p>
              <p className="text-2xl font-bold text-gray-900">{program.subtests.length}</p>
            </div>
            <FileText className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Equipment</p>
              <p className="text-2xl font-bold text-gray-900">{program.equipment.length}</p>
            </div>
            <Settings className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Data Points</p>
              <p className="text-2xl font-bold text-gray-900">{program.subtests.reduce((sum, st) => sum + st.dataPoints.length, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subtests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Subtests</h3>
            <div className="space-y-4">
              {program.subtests.map((subtest, index) => (
                <SubTestCard key={subtest.id} subtest={subtest} index={index} />
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Objectives</h3>
            <ul className="space-y-2">
              {program.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Equipment Requirements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Required</h3>
            <div className="space-y-3">
              {program.equipment.map((equipment) => (
                <div key={equipment.equipmentId} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{equipment.name}</h4>
                    {equipment.required && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Required</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{equipment.type}</p>
                  <p className="text-xs text-gray-500 mt-1">Accuracy: {equipment.accuracy}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Acceptance Criteria */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acceptance Criteria</h3>
            <div className="space-y-3">
              {program.acceptanceCriteria.passThreshold && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pass Threshold:</span>
                  <span className="text-sm font-medium">{program.acceptanceCriteria.passThreshold}%</span>
                </div>
              )}
              {program.acceptanceCriteria.reliabilityCV && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reliability CV:</span>
                  <span className="text-sm font-medium">≤{program.acceptanceCriteria.reliabilityCV}%</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Protocol Compliance:</span>
                <span className="text-sm font-medium">{program.acceptanceCriteria.protocolCompliance}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Data Completeness:</span>
                <span className="text-sm font-medium">{program.acceptanceCriteria.dataQuality.completeness}%</span>
              </div>
            </div>
          </div>

          {/* Safety Information */}
          {(program.contraindications || program.prerequisites) && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Information</h3>
              
              {program.prerequisites && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Prerequisites:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {program.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {program.contraindications && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Contraindications:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {program.contraindications.map((contra, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{contra}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};