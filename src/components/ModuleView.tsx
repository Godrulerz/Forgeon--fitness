import React from 'react';
import { 
  BookOpen, 
  Heart, 
  Zap, 
  Calendar, 
  FileText, 
  Trophy,
  Users,
  Clock, // For duration
  Droplet, // For Biomarkers
  CheckCircle,
  AlertCircle,
  Play,
  GraduationCap,
  Activity,
  Target,
  TrendingUp,
  Brain
} from 'lucide-react';
import { mockModules } from '../data/mockData';
import { Breadcrumb } from './Breadcrumb';
import { StatusIndicator } from './StatusIndicator';
import { Tooltip } from './Tooltip';

const getModuleIcon = (iconName: string) => {
  const icons = {
    BookOpen,
    Heart,
    Zap,
    Calendar,
    FileText,
    Trophy,
    Brain,
    Droplet
  };
  return icons[iconName as keyof typeof icons] || BookOpen;
};

const ModuleCard: React.FC<{
  module: typeof mockModules[0];
  onViewDetails: () => void;
  onStartAssessment: () => void;
}> = ({ module, onViewDetails, onStartAssessment }) => {
  const Icon = getModuleIcon(module.icon);
  
  // Enhanced module data with imagery and improved descriptions
  const moduleEnhancements = {
    '1': {
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Master the scientific foundations of exercise physiology and assessment protocols. Build essential knowledge before hands-on testing.',
      highlights: ['Exercise Physiology', 'Testing Theory', 'Safety Protocols'],
      difficulty: 'Beginner',
      prerequisites: []
    },
    '2': {
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-red-500 to-pink-600',
      description: 'Comprehensive assessment of cardiovascular fitness, body composition, strength, and flexibility using gold-standard protocols.',
      highlights: ['VO₂max Testing', 'Body Composition', 'Strength Assessment'],
      difficulty: 'Intermediate',
      prerequisites: ['Module 1 Completion']
    },
    '3': {
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-yellow-500 to-orange-600',
      description: 'Evaluate explosive power, speed, agility, and neuromuscular coordination through sport-specific performance testing.',
      highlights: ['Power Testing', 'Speed & Agility', 'Reaction Time'],
      difficulty: 'Intermediate',
      prerequisites: ['Module 1 Completion']
    },
    '4': {
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-green-500 to-teal-600',
      description: 'Strategic test scheduling, periodization planning, and longitudinal performance monitoring for optimal training outcomes.',
      highlights: ['Test Scheduling', 'Data Integration', 'Performance Trends'],
      difficulty: 'Advanced',
      prerequisites: ['Modules 1-3 Completion']
    },
    '5': {
      image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-purple-500 to-indigo-600',
      description: 'Advanced reaction time and cognitive training using light-based neural pods for enhanced neuromuscular performance.',
      highlights: ['Neural Training', 'Reaction Time', 'Cognitive Assessment'],
      difficulty: 'Advanced',
      prerequisites: ['Module 3 Completion']
    },
    '6': {
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-red-500 to-pink-600',
      description: 'Comprehensive analysis of blood, hormonal, and nutritional markers to optimize athlete health and performance.',
      highlights: ['Neural Training', 'Reaction Time', 'Cognitive Assessment'],
      difficulty: 'Advanced',
      prerequisites: ['Module 3 Completion']
    }
  };

  const enhancement = moduleEnhancements[module.id as keyof typeof moduleEnhancements];
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Hero Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={enhancement?.image} 
          alt={module.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${enhancement?.gradient} opacity-80`}></div>
        <div className="absolute top-4 right-4">
          <StatusIndicator
            status={module.status === 'active' ? 'success' : module.status === 'development' ? 'warning' : 'inactive'}
            label={module.status === 'active' ? 'Active' : module.status === 'development' ? 'Development' : 'Inactive'}
            size="sm"
            showDot={false}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 text-white">
            <Icon className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold leading-tight">{module.name}</h3>
              <p className="text-sm opacity-90">Module {module.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {enhancement?.description}
        </p>

        {/* Key Highlights */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Features</h4>
            <Tooltip content="Core components and capabilities of this assessment module" />
          </div>
          <div className="flex flex-wrap gap-2">
            {enhancement?.highlights.map((highlight, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Difficulty and Prerequisites */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Difficulty:</span>
              <span className={`font-medium ${
                enhancement?.difficulty === 'Beginner' ? 'text-green-600' :
                enhancement?.difficulty === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
              }`}>{enhancement?.difficulty}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Prerequisites:</span>
              <span className="font-medium text-gray-700">
                {enhancement?.prerequisites.length === 0 ? 'None' : enhancement?.prerequisites.length}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-lg font-bold text-gray-900">{module.testsCount}</span>
            </div>
            <span className="text-xs text-gray-600">Tests Available</span>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <CheckCircle className="w-4 h-4 text-gray-500" />
              <span className="text-lg font-bold text-gray-900">{module.completionRate}%</span>
            </div>
            <span className="text-xs text-gray-600">Completion Rate</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 font-medium">Module Progress</span>
            <span className="font-bold text-gray-900">{module.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${enhancement?.gradient}`}
              style={{ width: `${module.completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onStartAssessment(module.id)}
            className={`px-6 py-3 bg-gradient-to-r ${enhancement?.gradient} text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-semibold`}
          >
            <Play className="w-4 h-4" />
            <span>Start Module</span>
          </button>
          <button
            onClick={() => onViewDetails(module.id)}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

interface ModuleViewProps {
  onStartAssessment?: (moduleId: string) => void;
  onNavigateToModuleContent?: (moduleId: string) => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ onStartAssessment, onNavigateToModuleContent }) => {
  const handleStartAssessment = (moduleId: string) => {
    // Route to Mental & Neural Training for Module 5
    if (moduleId === '5' && onNavigateToModuleContent) {
      onNavigateToModuleContent(moduleId);
      return;
    }
    
    // Route to Foundations for Module 1
    if (moduleId === '1') {
      window.location.hash = 'foundations';
      return;
    }
    
    // Route to Health-Related Fitness for Module 2
    if (moduleId === '2') {
      window.location.hash = 'health-related-fitness';
      return;
    }
    
    // Route to Skill-Related Performance for Module 3
    if (moduleId === '3') {
      window.location.hash = 'skill-related-performance';
      return;
    }
    
    // Route to Integrated Testing for Module 4
    if (moduleId === '4') {
      window.location.hash = 'integrated-testing';
      return;
    }
    
    // Route to Biomarkers for Module 6
    if (moduleId === '6') {
      window.location.hash = 'biomarkers';
      return;
    }

    if (onStartAssessment) {
      onStartAssessment(moduleId);
    }
  };

  const handleViewDetails = (moduleId: string) => {
    // Route to Foundations for Module 1
    if (moduleId === '1') {
      window.location.hash = 'foundations';
      return;
    }
    
    // Route to Health-Related Fitness for Module 2
    if (moduleId === '2') {
      window.location.hash = 'health-related-fitness';
      return;
    }
    
    // Route to Skill-Related Performance for Module 3
    if (moduleId === '3') {
      window.location.hash = 'skill-related-performance';
      return;
    }
    
    // Route to Integrated Testing for Module 4
    if (moduleId === '4') {
      window.location.hash = 'integrated-testing';
      return;
    }

    // Route to Biomarkers for Module 6
    if (moduleId === '6') {
      window.location.hash = 'biomarkers';
      return;
    }
    
    console.log('View details for module:', moduleId);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Assessment Modules', current: true }
        ]}
        onNavigate={(item) => {
          if (item.label === 'Home') {
            // Navigate to dashboard
            console.log('Navigate to dashboard');
          }
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">Assessment Modules</h2>
            <Tooltip content="Six comprehensive modules covering all aspects of fitness assessment from theory to advanced performance testing" />
          </div>
          <p className="text-gray-600 mt-1">Manage your comprehensive fitness assessment system</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            New Module
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Import Protocol
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Total Modules</p> 
                <Tooltip content="Number of assessment modules available in the system" />
              </div>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Active Tests</p>
                <Tooltip content="Total number of active assessment tests across all modules" />
              </div>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <Tooltip content="Average completion rate across all assessment modules" />
              </div>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Est. Total Time</p>
                <Tooltip content="Estimated time to complete all assessment modules" />
              </div>
              <p className="text-2xl font-bold text-gray-900">6h</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onViewDetails={() => handleViewDetails(module.id)}
            onStartAssessment={() => handleStartAssessment(module.id)}
          />
        ))}
      </div>

    </div>
  );
};