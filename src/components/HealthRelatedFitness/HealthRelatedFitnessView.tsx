import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Settings, 
  Play,
  Camera,
  Timer,
  Calculator,
  Users,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Target,
  Activity,
  Zap,
  Heart
} from 'lucide-react';
import { healthRelatedFitnessModule } from '../../data/healthRelatedFitness';
import { SubModule, FitnessTest } from '../../types/healthRelatedFitness';
import { Breadcrumb } from '../Breadcrumb';
import { StatusIndicator } from '../StatusIndicator';
import { Tooltip } from '../Tooltip';
import { LoadingSpinner } from '../LoadingSpinner';

interface HealthRelatedFitnessViewProps {
  onBack: () => void;
}

const SubModuleCard: React.FC<{
  subModule: SubModule;
  onSelect: () => void;
}> = ({ subModule, onSelect }) => {
  const getSubModuleImage = (id: string) => {
    const images = {
      'sub-2-1': 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800',
      'sub-2-2': 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      'sub-2-3': 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
      'sub-2-4': 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    return images[id as keyof typeof images] || images['sub-2-1'];
  };

  const getSubModuleGradient = (id: string) => {
    const gradients = {
      'sub-2-1': 'from-purple-500 to-indigo-600',
      'sub-2-2': 'from-blue-500 to-cyan-600', 
      'sub-2-3': 'from-green-500 to-emerald-600',
      'sub-2-4': 'from-orange-500 to-red-600'
    };
    return gradients[id as keyof typeof gradients] || gradients['sub-2-1'];
  };

  const getSubModuleIcon = (id: string) => {
    const icons = {
      'sub-2-1': Users,
      'sub-2-2': Heart,
      'sub-2-3': Zap,
      'sub-2-4': Activity
    };
    const IconComponent = icons[id as keyof typeof icons] || Users;
    return <IconComponent className="w-6 h-6" />;
  };

  const estimatedTime = subModule.tests.reduce((total, test) => total + test.estimatedDuration, 0);
  const totalTests = subModule.tests.length;
  const hasTimedTests = subModule.tests.some(t => t.hasTimer);
  const hasMediaTests = subModule.tests.some(t => t.hasMedia);
  const hasCalculations = subModule.tests.some(t => t.calculations && t.calculations.length > 0);

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      {/* Hero Image Section */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={getSubModuleImage(subModule.id)} 
          alt={subModule.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${getSubModuleGradient(subModule.id)} opacity-80`}></div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {totalTests} Tests
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-2 text-white">
            {getSubModuleIcon(subModule.id)}
            <div>
              <h3 className="text-lg font-bold leading-tight">{subModule.name}</h3>
              <p className="text-xs opacity-90">{estimatedTime} min total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {subModule.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hasTimedTests && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              <Timer className="w-3 h-3" />
              <span>Timed</span>
            </span>
          )}
          {hasMediaTests && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              <Camera className="w-3 h-3" />
              <span>Media</span>
            </span>
          )}
          {hasCalculations && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              <Calculator className="w-3 h-3" />
              <span>Auto-calc</span>
            </span>
          )}
        </div>

        {/* Test Preview */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Included Tests</h4>
          <div className="space-y-1">
            {subModule.tests.slice(0, 3).map((test, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{test.name}</span>
                <span className="text-gray-500">{test.estimatedDuration}min</span>
              </div>
            ))}
            {subModule.tests.length > 3 && (
              <div className="text-xs text-blue-600">+{subModule.tests.length - 3} more tests...</div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button className={`w-full px-4 py-3 bg-gradient-to-r ${getSubModuleGradient(subModule.id)} text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold`}>
          <Play className="w-4 h-4" />
          <span>Enter Sub-Module</span>
        </button>
      </div>
    </div>
  );
};

const TestCard: React.FC<{
  test: FitnessTest;
  onSelect: () => void;
}> = ({ test, onSelect }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      body_composition: 'from-purple-500 to-indigo-600',
      aerobic_endurance: 'from-blue-500 to-cyan-600',
      strength_endurance: 'from-green-500 to-emerald-600',
      flexibility: 'from-orange-500 to-red-600'
    };
    return colors[category as keyof typeof colors] || colors.body_composition;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      body_composition: Users,
      aerobic_endurance: Heart,
      strength_endurance: Zap,
      flexibility: Activity
    };
    const IconComponent = icons[category as keyof typeof icons] || Users;
    return <IconComponent className="w-5 h-5" />;
  };

  const getDifficultyLevel = (duration: number) => {
    if (duration <= 10) return { level: 'Easy', color: 'text-green-600', bg: 'bg-green-100' };
    if (duration <= 20) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Advanced', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const difficulty = getDifficultyLevel(test.estimatedDuration);

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(test.category)}`}>
            {getCategoryIcon(test.category)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {test.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficulty.bg} ${difficulty.color}`}>
              {difficulty.level}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {test.hasTimer && <Timer className="w-4 h-4 text-blue-500" />}
          {test.hasMedia && <Camera className="w-4 h-4 text-green-500" />}
          {test.calculations && test.calculations.length > 0 && <Calculator className="w-4 h-4 text-purple-500" />}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{test.description}</p>

      {/* Test Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{test.estimatedDuration} min</span>
        </div>
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{test.equipmentRequired.length} items</span>
        </div>
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{test.dataFields.length} metrics</span>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 capitalize">{test.category.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Equipment Preview */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Equipment</h4>
        <div className="flex flex-wrap gap-1">
          {test.equipmentRequired.slice(0, 3).map((equipment, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {equipment}
            </span>
          ))}
          {test.equipmentRequired.length > 3 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
              +{test.equipmentRequired.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button className={`w-full px-4 py-2 bg-gradient-to-r ${getCategoryColor(test.category)} text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium`}>
        <Play className="w-4 h-4" />
        <span>Start Test</span>
      </button>
    </div>
  );
};

export const HealthRelatedFitnessView: React.FC<HealthRelatedFitnessViewProps> = ({ onBack }) => {
  const [selectedSubModule, setSelectedSubModule] = useState<SubModule | null>(null);
  const [selectedTest, setSelectedTest] = useState<FitnessTest | null>(null);
  // Cooper test quick evaluation state
  const [cooperDistance, setCooperDistance] = useState<string>('');
  const [cooperResult, setCooperResult] = useState<{ vo2max: number; category: string } | null>(null);
  const [cooperLoading, setCooperLoading] = useState<boolean>(false);
  const [cooperError, setCooperError] = useState<string | null>(null);

  const handleSubModuleSelect = (subModule: SubModule) => {
    setSelectedSubModule(subModule);
    setSelectedTest(null);
  };

  const handleTestSelect = (test: FitnessTest) => {
    setSelectedTest(test);
  };

  const handleBackToModule = () => {
    setSelectedSubModule(null);
    setSelectedTest(null);
  };

  const handleBackToSubModule = () => {
    setSelectedTest(null);
  };

  // Test Detail View
  if (selectedTest) {
    return (
      <div className="space-y-6">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToSubModule}
                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTest.name}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full capitalize">
                    {selectedTest.category.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-700">{selectedTest.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedTest.estimatedDuration} minutes</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{selectedTest.dataFields.length} data points</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Settings className="w-4 h-4" />
                    <span>{selectedTest.equipmentRequired.length} equipment items</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {selectedTest.hasTimer && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  <Timer className="w-4 h-4" />
                  <span className="text-sm">Timer</span>
                </div>
              )}
              {selectedTest.hasMedia && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm">Media</span>
                </div>
              )}
              {selectedTest.calculations && selectedTest.calculations.length > 0 && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  <Calculator className="w-4 h-4" />
                  <span className="text-sm">Auto-calc</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-lg font-bold text-gray-900">{selectedTest.estimatedDuration} min</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Points</p>
                <p className="text-lg font-bold text-gray-900">{selectedTest.dataFields.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Equipment</p>
                <p className="text-lg font-bold text-gray-900">{selectedTest.equipmentRequired.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calculator className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Calculations</p>
                <p className="text-lg font-bold text-gray-900">{selectedTest.calculations?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Test Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equipment & Setup */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Equipment & Setup</h3>
              <Settings className="w-5 h-5 text-orange-600" />
            </div>
            <div className="space-y-3">
              {selectedTest.equipmentRequired.map((equipment, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-medium">{equipment}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-orange-700">
                <Info className="w-3 h-3 inline mr-1" />
                Ensure all equipment is calibrated before starting
              </p>
            </div>
          </div>

          {/* Instructions & Protocol */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">How to Test</h3>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-900 mb-3 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Step-by-Step Protocol
                </h4>
                <p className="text-sm text-blue-800 leading-relaxed font-medium">{selectedTest.instructions}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Category:</span>
                  <p className="font-medium capitalize">{selectedTest.category.replace('_', ' ')}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Type:</span>
                  <p className="font-medium">Health-Related</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Collection Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Data Collection</h3>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedTest.dataFields.slice(0, 5).map((field, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-700">{field.name}</span>
                  <div className="flex items-center space-x-2">
                    {field.unit && (
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {field.unit}
                      </span>
                    )}
                    {field.required && (
                      <span className="text-xs text-red-600">*</span>
                    )}
                  </div>
                </div>
              ))}
              {selectedTest.dataFields.length > 5 && (
                <div className="text-center text-xs text-blue-600 py-2">
                  +{selectedTest.dataFields.length - 5} more fields...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Entry Form */
        }
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Data Entry Form</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{selectedTest.dataFields.filter(f => f.required).length} required fields</span>
              <span>•</span>
              <span>{selectedTest.dataFields.length} total fields</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedTest.dataFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.name} {field.required && <span className="text-red-500">*</span>}
                  {field.unit && <span className="text-gray-500"> ({field.unit})</span>}
                </label>
                
                {field.type === 'dropdown' ? (
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select {field.name.toLowerCase()}...</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'boolean' ? (
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name={field.id} value="true" className="mr-2 text-blue-600 focus:ring-blue-500" />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name={field.id} value="false" className="mr-2 text-blue-600 focus:ring-blue-500" />
                      No
                    </label>
                  </div>
                ) : field.type === 'time' ? (
                  <input
                    type="time"
                    step="1"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : field.type === 'text' ? (
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type="number"
                    min={field.min}
                    max={field.max}
                    step="0.1"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                  />
                )}
                {field.required && (
                  <p className="text-xs text-gray-500">This field is required</p>
                )}
              </div>
            ))}
          </div>

          {/* Calculations Display */}
          {selectedTest.calculations && selectedTest.calculations.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="w-5 h-5 text-purple-600" />
                <h4 className="text-md font-semibold text-gray-900">Auto-Calculated Values</h4>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {selectedTest.calculations.length} calculations
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTest.calculations.map((calc) => (
                  <div key={calc.id} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-900">{calc.name}</span>
                      <span className="text-lg font-bold text-purple-600">
                        -- {calc.unit}
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 mt-1 flex items-center">
                      <Calculator className="w-3 h-3 mr-1" />
                      Auto-calculated from input data
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media and Notes */}
          <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedTest.hasMedia && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera className="w-4 h-4 inline mr-1" />
                  Attach Media (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to add photo or video</p>
                  <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, MP4 (max 10MB)</p>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Info className="w-4 h-4 inline mr-1" />
                Coach Notes (Optional)
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Additional observations, form notes, or comments..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <button
              onClick={handleBackToSubModule}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tests</span>
            </button>
            <div className="flex items-center space-x-3">
              {selectedTest.hasTimer && (
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-lg flex items-center space-x-2">
                  <Timer className="w-4 h-4" />
                  <span>Start Timer</span>
                </button>
              )}
              <button className="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Complete Test</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cooper Test Quick Evaluation */}
        {selectedTest.id === 'cooper-12min' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Cooper Test Evaluation
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance (m)</label>
                <input
                  type="number"
                  min={0}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2600"
                  value={cooperDistance}
                  onChange={(e) => setCooperDistance(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    setCooperError(null);
                    setCooperResult(null);
                    setCooperLoading(true);
                    try {
                      const res = await fetch('/api/fitness/health/tests/cooper/evaluate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ distance: Number(cooperDistance) })
                      });
                      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                      const json = await res.json();
                      const vo2 = json?.data?.results?.estimated_vo2max;
                      const cat = json?.data?.results?.category;
                      setCooperResult({ vo2max: vo2, category: cat });
                    } catch (err: any) {
                      setCooperError(err?.message || 'Failed to evaluate');
                    } finally {
                      setCooperLoading(false);
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                  disabled={cooperLoading || !cooperDistance}
                >
                  {cooperLoading ? 'Calculating...' : 'Calculate VO₂max'}
                </button>
                <button
                  onClick={() => { setCooperDistance(''); setCooperResult(null); setCooperError(null); }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
            {cooperError && (
              <p className="mt-4 text-sm text-red-600">{cooperError}</p>
            )}
            {cooperResult && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <p className="text-sm text-blue-800">Estimated VO₂max</p>
                  <p className="text-2xl font-bold text-blue-900">{cooperResult.vo2max} ml/kg/min</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <p className="text-sm text-emerald-800">Category</p>
                  <p className="text-2xl font-bold text-emerald-900 capitalize">{cooperResult.category.replaceAll('_', ' ')}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Sub-Module View
  if (selectedSubModule) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 shadow-sm border border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToModule}
                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSubModule.name}</h2>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                    {selectedSubModule.tests.length} Tests
                  </span>
                </div>
                <p className="text-gray-700">{selectedSubModule.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedSubModule.tests.reduce((total, test) => total + test.estimatedDuration, 0)} min total</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{selectedSubModule.tests.reduce((total, test) => total + test.dataFields.length, 0)} data points</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Module Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tests</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.tests.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.tests.reduce((total, test) => total + test.estimatedDuration, 0)} min</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Equipment Items</p>
                <p className="text-lg font-bold text-gray-900">{new Set(selectedSubModule.tests.flatMap(test => test.equipmentRequired)).size}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Points</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.tests.reduce((total, test) => total + test.dataFields.length, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedSubModule.tests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              onSelect={() => handleTestSelect(test)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Main Module View
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Assessment Modules', onClick: onBack },
          { label: healthRelatedFitnessModule.name, current: true }
        ]}
        onNavigate={(item) => {
          if (item.label === 'Home') {
            onBack();
          }
        }}
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 shadow-sm border border-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Heart className="w-8 h-8 text-red-600" />
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">{healthRelatedFitnessModule.name}</h2>
                  <Tooltip content="Comprehensive assessment of body composition, aerobic endurance, strength, and flexibility" />
                </div>
                <StatusIndicator
                  status="active"
                  label="Module 2"
                  size="sm"
                />
              </div>
              <p className="text-gray-700 text-lg">{healthRelatedFitnessModule.description}</p>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{healthRelatedFitnessModule.subModules.length} Sub-Modules</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>{healthRelatedFitnessModule.subModules.reduce((total, sm) => total + sm.tests.length, 0)} Total Tests</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{healthRelatedFitnessModule.subModules.reduce((total, sm) => total + sm.tests.reduce((testTotal, test) => testTotal + test.estimatedDuration, 0), 0)} min</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Sub-Modules</p>
                <Tooltip content="Number of specialized testing categories in this module" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{healthRelatedFitnessModule.subModules.length}</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <Tooltip content="Total number of individual fitness tests available" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{healthRelatedFitnessModule.subModules.reduce((total, sm) => total + sm.tests.length, 0)}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Est. Duration</p>
                <Tooltip content="Estimated time to complete all tests in this module" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{Math.round(healthRelatedFitnessModule.subModules.reduce((total, sm) => total + sm.tests.reduce((testTotal, test) => testTotal + test.estimatedDuration, 0), 0) / 60)}h</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <Tooltip content="Percentage of athletes who successfully complete this module" />
              </div>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthRelatedFitnessModule.subModules.map((subModule) => (
          <SubModuleCard
            key={subModule.id}
            subModule={subModule}
            onSelect={() => handleSubModuleSelect(subModule)}
          />
        ))}
      </div>
    </div>
  );
};