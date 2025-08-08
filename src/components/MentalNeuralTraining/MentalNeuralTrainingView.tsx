import React, { useState } from 'react';
import { ArrowLeft, Brain, Zap, Clock, Target, Play, Eye, Settings, Award, Activity, Users, CheckCircle, AlertTriangle, Info, Lightbulb, Timer, TrendingUp, Shield, Gamepad2, Cpu, SlashIcon as Flash } from 'lucide-react';
import { neuralTrainingModule, getAllDrills } from '../../data/neuralDrills';
import { NeuralDrill, DrillSession } from '../../types/neuralTraining';
import { Breadcrumb } from '../Breadcrumb';
import { StatusIndicator } from '../StatusIndicator';
import { Tooltip } from '../Tooltip';
import { DrillExecution } from './DrillExecution';

interface MentalNeuralTrainingViewProps {
  onBack?: () => void;
}

const DrillCard: React.FC<{
  drill: NeuralDrill;
  onSelect: () => void;
  onStart: () => void;
  isAssessment?: boolean;
}> = ({ drill, onSelect, onStart, isAssessment = false }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      foundation_simple: 'from-blue-500 to-indigo-600',
      foundation_choice: 'from-green-500 to-emerald-600',
      foundation_sequence: 'from-purple-500 to-violet-600',
      applied_cricket: 'from-orange-500 to-red-600',
      applied_agility: 'from-yellow-500 to-orange-600',
      dual_task: 'from-pink-500 to-rose-600',
      fatigue_endurance: 'from-red-500 to-pink-600',
      rehab: 'from-teal-500 to-cyan-600',
      advanced_game: 'from-indigo-500 to-purple-600'
    };
    return colors[category as keyof typeof colors] || colors.foundation_simple;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      foundation_simple: Flash,
      foundation_choice: Target,
      foundation_sequence: Brain,
      applied_cricket: Activity,
      applied_agility: Zap,
      dual_task: Cpu,
      fatigue_endurance: Timer,
      rehab: Shield,
      advanced_game: Gamepad2
    };
    const IconComponent = icons[category as keyof typeof icons] || Flash;
    return <IconComponent className="w-5 h-5" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700'
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(drill.category)}`}>
            {getCategoryIcon(drill.category)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {drill.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                {drill.difficulty}
              </span>
              {isAssessment && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  Assessment
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {drill.estimatedDuration && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{drill.estimatedDuration}min</span>
            </div>
          )}
        </div>
      </div>

      {/* Tier */}
      <div className="mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{drill.tier}</span>
      </div>

      {/* Purpose */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{drill.quickPurpose}</p>

      {/* Equipment Preview */}
      {drill.equipmentRequired && drill.equipmentRequired.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Equipment</h4>
          <div className="flex flex-wrap gap-1">
            {drill.equipmentRequired.slice(0, 3).map((equipment, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {equipment}
              </span>
            ))}
            {drill.equipmentRequired.length > 3 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                +{drill.equipmentRequired.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={onSelect}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
        <button 
          onClick={onStart}
          className={`flex-1 px-4 py-2 bg-gradient-to-r ${getCategoryColor(drill.category)} text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium`}
        >
          <Play className="w-4 h-4" />
          <span>Start</span>
        </button>
      </div>
    </div>
  );
};

const CategorySection: React.FC<{
  title: string;
  drills: NeuralDrill[];
  onDrillSelect: (drill: NeuralDrill) => void;
  onDrillStart: (drill: NeuralDrill) => void;
  isAssessment?: boolean;
}> = ({ title, drills, onDrillSelect, onDrillStart, isAssessment = false }) => {
  if (drills.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
          {drills.length} drills
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drills.map((drill) => (
          <DrillCard
            key={drill.id}
            drill={drill}
            onSelect={() => onDrillSelect(drill)}
            onStart={() => onDrillStart(drill)}
            isAssessment={isAssessment}
          />
        ))}
      </div>
    </div>
  );
};

export const MentalNeuralTrainingView: React.FC<MentalNeuralTrainingViewProps> = ({ onBack }) => {
  const [selectedDrill, setSelectedDrill] = useState<NeuralDrill | null>(null);
  const [executingDrill, setExecutingDrill] = useState<NeuralDrill | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'assessment' | 'training'>('overview');

  const handleDrillSelect = (drill: NeuralDrill) => {
    setSelectedDrill(drill);
  };

  const handleStartDrill = (drill: NeuralDrill) => {
    setExecutingDrill(drill);
    setSelectedDrill(null);
  };

  const handleDrillComplete = (session: DrillSession) => {
    console.log('Drill session completed:', session);
    // In a real app, this would save to backend
    setExecutingDrill(null);
  };

  const handleBackFromExecution = () => {
    setExecutingDrill(null);
  };

  const handleBackToDrills = () => {
    setSelectedDrill(null);
  };

  const allDrills = getAllDrills();
  const assessmentDrills = neuralTrainingModule.assessmentDrills;
  const trainingDrills = neuralTrainingModule.trainingDrills;

  // Group training drills by category
  const groupedTrainingDrills = trainingDrills.reduce((acc, drill) => {
    const category = drill.tier;
    if (!acc[category]) acc[category] = [];
    acc[category].push(drill);
    return acc;
  }, {} as Record<string, NeuralDrill[]>);

  // Drill Execution View
  if (executingDrill) {
    return (
      <DrillExecution
        drill={executingDrill}
        onBack={handleBackFromExecution}
        onComplete={handleDrillComplete}
      />
    );
  }

  // Drill Detail View
  if (selectedDrill) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDrills}
                className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDrill.name}</h2>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full capitalize">
                    {selectedDrill.difficulty}
                  </span>
                </div>
                <p className="text-gray-700">{selectedDrill.quickPurpose}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedDrill.estimatedDuration || 'Variable'} minutes</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{selectedDrill.tier}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drill Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Equipment & Setup */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Equipment Required</h3>
              </div>
              <div className="space-y-2">
                {selectedDrill.equipmentRequired?.map((equipment, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">{equipment}</span>
                  </div>
                )) || (
                  <p className="text-sm text-gray-600">No specific equipment listed</p>
                )}
              </div>
            </div>

            {/* Drill Information */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Drill Information</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">Category:</span>
                  <p className="text-sm text-blue-900 capitalize">{selectedDrill.category.replace('_', ' ')}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-700">Difficulty:</span>
                  <p className="text-sm text-green-900 capitalize">{selectedDrill.difficulty}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-700">Purpose:</span>
                  <p className="text-sm text-purple-900">{selectedDrill.quickPurpose}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <button
              onClick={handleBackToDrills}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Drills</span>
            </button>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-lg flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Configure Drill</span>
              </button>
              <button 
                onClick={() => handleStartDrill(selectedDrill)}
                className="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-semibold"
              >
                <Play className="w-4 h-4" />
                <span>Start Drill</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main View
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Assessment Modules', onClick: onBack },
          { label: neuralTrainingModule.name, current: true }
        ]}
        onNavigate={(item) => {
          if (item.label === 'Home') {
            onBack?.();
          }
        }}
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Brain className="w-8 h-8 text-purple-600" />
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">{neuralTrainingModule.name}</h2>
                  <Tooltip content="Advanced reaction time and cognitive training using light-based neural pods" />
                </div>
                <StatusIndicator
                  status="active"
                  label="Module 5"
                  size="sm"
                />
              </div>
              <p className="text-gray-700 text-lg">{neuralTrainingModule.description}</p>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{allDrills.length} Total Drills</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{assessmentDrills.length} Assessments</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>{trainingDrills.length} Training Drills</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Info },
              { id: 'assessment', label: 'Assessment', icon: Eye },
              { id: 'training', label: 'Training Drills', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* ELI5 Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">ELI5 Snapshot</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {neuralTrainingModule.overview.eli5}
                </p>
              </div>

              {/* Scientific Explanation */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">What's happening inside the brain & body?</h3>
                </div>
                <div className="space-y-6">
                  {neuralTrainingModule.overview.scientificExplanation.map((level, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{level.level}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Key Science Points</h5>
                          <p className="text-sm text-gray-600 leading-relaxed">{level.keyPoints}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Why Pods Exploit It</h5>
                          <p className="text-sm text-gray-600 leading-relaxed">{level.podExploitation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-600">Total Drills</p>
                        <Tooltip content="Total number of neural training drills available" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{allDrills.length}</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-600">Assessment Drills</p>
                        <Tooltip content="Drills designed to assess baseline neural performance" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{assessmentDrills.length}</p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-600">Training Drills</p>
                        <Tooltip content="Progressive training drills for neural enhancement" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{trainingDrills.length}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-600">Categories</p>
                        <Tooltip content="Different types of neural training categories available" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{Object.keys(groupedTrainingDrills).length}</p>
                    </div>
                    <Award className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assessment Tab */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Assessment Drills</h4>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  These drills are designed to assess baseline neural performance and establish benchmarks for training progression.
                </p>
              </div>
              
              <CategorySection
                title="Foundation Assessment Drills"
                drills={assessmentDrills}
                onDrillSelect={handleDrillSelect}
                onDrillStart={handleStartDrill}
                isAssessment={true}
              />
            </div>
          )}

          {/* Training Tab */}
          {activeTab === 'training' && (
            <div className="space-y-8">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Training Drills</h4>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Progressive training drills organized by complexity and application, from basic reaction time to advanced game-sense scenarios.
                </p>
              </div>

              {Object.entries(groupedTrainingDrills).map(([category, drills]) => (
                <CategorySection
                  key={category}
                  title={category}
                  drills={drills}
                  onDrillSelect={handleDrillSelect}
                  onDrillStart={handleStartDrill}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};