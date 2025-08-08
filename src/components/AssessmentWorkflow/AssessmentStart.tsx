import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Play,
  ArrowLeft,
  Users,
  Search
} from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { mockModules } from '../../data/mockData';

interface AssessmentStartProps {
  moduleId: string;
  onBack: () => void;
  onStartAssessment: (moduleId: string, athleteId: string) => void;
}

export const AssessmentStart: React.FC<AssessmentStartProps> = ({
  moduleId,
  onBack,
  onStartAssessment
}) => {
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const module = mockModules.find(m => m.id === moduleId);
  const athletes = mockUsers.filter(user => user.role === 'athlete');
  
  const filteredAthletes = athletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartAssessment = () => {
    if (selectedAthlete && moduleId) {
      onStartAssessment(moduleId, selectedAthlete);
    }
  };

  if (!module) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Module Not Found</h3>
        <p className="text-gray-600">The requested assessment module could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Start Assessment</h2>
              <p className="text-gray-600">{module.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{module.name}</h3>
            <p className="text-gray-600 mb-4">{module.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{module.testsCount} Tests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">~60-90 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{module.completionRate}% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Individual Assessment</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              {testProgram ? 'Program Requirements' : 'Assessment Requirements'}
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Equipment calibration verified</li>
              <li>• Athlete consent obtained</li>
              <li>• Environmental conditions checked</li>
              <li>• Safety protocols reviewed</li>
              {testProgram && <li>• Protocol compliance required</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Athlete Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Athlete</h3>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search athletes by name or email..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Athlete List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredAthletes.map((athlete) => (
            <div
              key={athlete.id}
              onClick={() => setSelectedAthlete(athlete.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedAthlete === athlete.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {athlete.avatar ? (
                  <img 
                    src={athlete.avatar} 
                    alt={athlete.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{athlete.name}</p>
                  <p className="text-sm text-gray-600">{athlete.email}</p>
                </div>
              </div>
              {selectedAthlete === athlete.id && (
                <div className="mt-2 flex items-center space-x-2 text-blue-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Selected</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAthletes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No athletes found matching your search.</p>
          </div>
        )}
      </div>

      {/* Pre-Assessment Checklist */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pre-Assessment Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Equipment calibrated and functional',
            'Testing environment prepared',
            'Athlete consent form signed',
            'Medical clearance verified',
            'Safety equipment available',
            'Data collection forms ready'
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Start Assessment Button */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Ready to Begin</h3>
            <p className="text-gray-600">
              {selectedAthlete 
                ? `${testProgram ? 'Test program execution' : 'Assessment'} will begin for ${filteredAthletes.find(a => a.id === selectedAthlete)?.name}`
                : 'Please select an athlete to continue'
              }
            </p>
          </div>
          <button
            onClick={handleStartAssessment}
            disabled={!selectedAthlete}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>{testProgram ? 'Execute Program' : 'Start Assessment'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};