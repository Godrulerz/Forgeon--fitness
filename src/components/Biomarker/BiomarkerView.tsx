import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Settings, 
  Play,
  Camera,
  Calculator,
  Users,
  Award,
  TrendingUp,
  Info,
  Target,
  Activity,
  Droplet, // Icon for blood/biomarkers
  FlaskConical, // Icon for lab tests
  Dna, // Icon for genetic/molecular
  FileText, // For reports
  CheckCircle
} from 'lucide-react';
import { biomarkerModule } from '../../data/biomarkers';
import { SubModule, BiomarkerTest } from '../../types/biomarkers';
import { Breadcrumb } from '../Breadcrumb';
import { StatusIndicator } from '../StatusIndicator';
import { Tooltip } from '../Tooltip';

interface BiomarkerViewProps {
  onBack: () => void;
}

const SubModuleCard: React.FC<{
  subModule: SubModule;
  onSelect: () => void;
}> = ({ subModule, onSelect }) => {
  const getSubModuleImage = (id: string) => {
    const images = {
      'sub-6-1': 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800', // Blood sample
      'sub-6-2': 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=800', // Hormones/chemistry
      'sub-6-3': 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=800' // Nutrition
    };
    return images[id as keyof typeof images] || images['sub-6-1'];
  };

  const getSubModuleGradient = (id: string) => {
    const gradients = {
      'sub-6-1': 'from-red-500 to-pink-600',
      'sub-6-2': 'from-orange-500 to-yellow-600', 
      'sub-6-3': 'from-green-500 to-teal-600'
    };
    return gradients[id as keyof typeof gradients] || gradients['sub-6-1'];
  };

  const getSubModuleIcon = (id: string) => {
    const icons = {
      'sub-6-1': Droplet,
      'sub-6-2': FlaskConical,
      'sub-6-3': Dna
    };
    const IconComponent = icons[id as keyof typeof icons] || Droplet;
    return <IconComponent className="w-6 h-6" />;
  };

  const estimatedTime = subModule.tests.reduce((total, test) => total + test.estimatedDuration, 0);
  const totalTests = subModule.tests.length;
  const hasCalculations = subModule.tests.some(t => t.calculations && t.calculations.length > 0);
  const hasBatchImport = subModule.tests.some(t => t.hasBatchImport);

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
              <p className="text-xs opacity-90">{estimatedTime} min total (manual)</p>
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
          {hasCalculations && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              <Calculator className="w-3 h-3" />
              <span>Auto-calc</span>
            </span>
          )}
          {hasBatchImport && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              <FileText className="w-3 h-3" />
              <span>Batch Import</span>
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
  test: BiomarkerTest;
  onSelect: () => void;
}> = ({ test, onSelect }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      blood_markers: 'from-red-500 to-pink-600',
      hormonal_markers: 'from-orange-500 to-yellow-600',
      nutritional_markers: 'from-green-500 to-teal-600'
    };
    return colors[category as keyof typeof colors] || colors.blood_markers;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      blood_markers: Droplet,
      hormonal_markers: FlaskConical,
      nutritional_markers: Dna
    };
    const IconComponent = icons[category as keyof typeof icons] || Droplet;
    return <IconComponent className="w-5 h-5" />;
  };

  const getDifficultyLevel = (duration: number) => {
    if (duration <= 5) return { level: 'Quick Entry', color: 'text-green-600', bg: 'bg-green-100' };
    if (duration <= 10) return { level: 'Standard Entry', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Detailed Entry', color: 'text-red-600', bg: 'bg-red-100' };
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
          {test.calculations && test.calculations.length > 0 && <Calculator className="w-4 h-4 text-purple-500" />}
          {test.hasBatchImport && <FileText className="w-4 h-4 text-blue-500" />}
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
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Required for Entry</h4>
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
        <span>Enter Data</span>
      </button>
    </div>
  );
};

export const BiomarkerView: React.FC<BiomarkerViewProps> = ({ onBack }) => {
  const [selectedSubModule, setSelectedSubModule] = useState<SubModule | null>(null);
  const [selectedTest, setSelectedTest] = useState<BiomarkerTest | null>(null);

  const handleSubModuleSelect = (subModule: SubModule) => {
    setSelectedSubModule(subModule);
    setSelectedTest(null);
  };

  const handleTestSelect = (test: BiomarkerTest) => {
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
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 shadow-sm border border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToSubModule}
                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTest.name}</h2>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full capitalize">
                    {selectedTest.category.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-700">{selectedTest.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedTest.estimatedDuration} minutes (manual entry)</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{selectedTest.dataFields.length} data points</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Settings className="w-4 h-4" />
                    <span>{selectedTest.equipmentRequired.length} required items</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {selectedTest.calculations && selectedTest.calculations.length > 0 && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  <Calculator className="w-4 h-4" />
                  <span className="text-sm">Auto-calc</span>
                </div>
              )}
              {selectedTest.hasBatchImport && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Batch Import</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Entry Time</p>
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
                <p className="text-sm text-gray-600">Required Items</p>
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
              <h3 className="text-lg font-semibold text-gray-900">Required for Data Entry</h3>
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
                Ensure you have the necessary reports or data sources.
              </p>
            </div>
          </div>

          {/* Instructions & Protocol */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">How to Enter Data</h3>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border-l-4 border-red-500">
                <h4 className="text-md font-semibold text-red-900 mb-3 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Data Entry Protocol
                </h4>
                <p className="text-sm text-red-800 leading-relaxed font-medium">{selectedTest.instructions}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Category:</span>
                  <p className="font-medium capitalize">{selectedTest.category.replace('_', ' ')}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">Type:</span>
                  <p className="font-medium">Biomarker</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Collection Preview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Data Fields</h3>
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

        {/* Data Entry Form */}
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
                ) : field.type === 'date' ? (
                  <input
                    type="date"
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
                    step={field.step || 0.1}
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

          {/* Batch Import Option */}
          {selectedTest.hasBatchImport && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Batch Import (CSV)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drag & drop CSV file or click to upload</p>
                <p className="text-xs text-gray-500 mt-1">Ensure CSV format matches template</p>
              </div>
            </div>
          )}

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
              <button className="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Complete Entry</span>
              </button>
            </div>
          </div>
        </div>
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
                    <span>{selectedSubModule.tests.reduce((total, test) => total + test.estimatedDuration, 0)} min total (manual)</span>
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
              <div className="p-2 bg-red-100 rounded-lg">
                <Target className="w-5 h-5 text-red-600" />
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
                <p className="text-sm text-gray-600">Total Entry Time</p>
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
                <p className="text-sm text-gray-600">Required Items</p>
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
          { label: biomarkerModule.name, current: true }
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
                <Droplet className="w-8 h-8 text-red-600" />
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">{biomarkerModule.name}</h2>
                  <Tooltip content="Manual entry and batch import of lab results for comprehensive athlete monitoring" />
                </div>
                <StatusIndicator
                  status="active"
                  label="Module 6"
                  size="sm"
                />
              </div>
              <p className="text-gray-700 text-lg">{biomarkerModule.description}</p>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{biomarkerModule.subModules.length} Sub-Modules</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>{biomarkerModule.subModules.reduce((total, sm) => total + sm.tests.length, 0)} Total Tests</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{biomarkerModule.subModules.reduce((total, sm) => total + sm.tests.reduce((testTotal, test) => testTotal + test.estimatedDuration, 0), 0)} min (manual)</span>
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
                <Tooltip content="Number of specialized biomarker categories in this module" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{biomarkerModule.subModules.length}</p>
            </div>
            <Target className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <Tooltip content="Total number of individual biomarker tests available" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{biomarkerModule.subModules.reduce((total, sm) => total + sm.tests.length, 0)}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Est. Entry Time</p>
                <Tooltip content="Estimated time to manually enter data for all tests in this module" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{Math.round(biomarkerModule.subModules.reduce((total, sm) => total + sm.tests.reduce((testTotal, test) => testTotal + test.estimatedDuration, 0), 0))} min</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Batch Import Ready</p>
                <Tooltip content="Number of tests that support batch data import via CSV" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{biomarkerModule.subModules.reduce((total, sm) => total + sm.tests.filter(t => t.hasBatchImport).length, 0)}</p>
            </div>
            <FileText className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {biomarkerModule.subModules.map((subModule) => (
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