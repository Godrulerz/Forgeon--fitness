import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Play, 
  BookOpen, 
  Clock, 
  Bell, 
  BarChart3, 
  Plus, 
  CircleDot as DragHandleDots2, 
  AlertTriangle, 
  CheckCircle,
  Users,
  Award,
  Info,
  Target,
  Activity,
  Database,
  Zap,
  Heart,
  Shield,
  LineChart
} from 'lucide-react';
import { integratedTestingModule, predefinedModels, scheduleTemplates, sampleAlerts } from '../../data/integratedTesting';
import { SubModule, Screen, PeriodizationModel } from '../../types/integratedTesting';

interface IntegratedTestingViewProps {
  onBack: () => void;
}

const SubModuleCard: React.FC<{
  subModule: SubModule;
  onSelect: () => void;
}> = ({ subModule, onSelect }) => {
  const getSubModuleImage = (id: string) => {
    const images = {
      'sub-4-1': 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      'sub-4-2': 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800',
      'sub-4-3': 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    return images[id as keyof typeof images] || images['sub-4-1'];
  };

  const getSubModuleGradient = (id: string) => {
    const gradients = {
      'sub-4-1': 'from-green-500 to-teal-600',
      'sub-4-2': 'from-blue-500 to-indigo-600', 
      'sub-4-3': 'from-purple-500 to-pink-600'
    };
    return gradients[id as keyof typeof gradients] || gradients['sub-4-1'];
  };

  const getSubModuleIcon = (id: string) => {
    const icons = {
      'sub-4-1': BookOpen,
      'sub-4-2': Calendar,
      'sub-4-3': LineChart
    };
    const IconComponent = icons[id as keyof typeof icons] || BookOpen;
    return <IconComponent className="w-6 h-6" />;
  };

  const totalScreens = subModule.screens.length;
  const hasCalendar = subModule.screens.some(s => s.hasCalendar);
  const hasGraphs = subModule.screens.some(s => s.hasGraphs);
  const hasDragDrop = subModule.screens.some(s => s.hasDragDrop);
  const hasNotifications = subModule.screens.some(s => s.hasNotifications);

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
            {totalScreens} Screens
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-2 text-white">
            {getSubModuleIcon(subModule.id)}
            <div>
              <h3 className="text-lg font-bold leading-tight">{subModule.name}</h3>
              <p className="text-xs opacity-90">Strategic Planning</p>
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
          {hasCalendar && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              <Calendar className="w-3 h-3" />
              <span>Calendar</span>
            </span>
          )}
          {hasGraphs && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              <BarChart3 className="w-3 h-3" />
              <span>Analytics</span>
            </span>
          )}
          {hasDragDrop && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              <DragHandleDots2 className="w-3 h-3" />
              <span>Drag & Drop</span>
            </span>
          )}
          {hasNotifications && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
              <Bell className="w-3 h-3" />
              <span>Alerts</span>
            </span>
          )}
        </div>

        {/* Screen Preview */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Available Screens</h4>
          <div className="space-y-1">
            {subModule.screens.slice(0, 3).map((screen, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{screen.name}</span>
                <span className="text-gray-500 capitalize">{screen.type}</span>
              </div>
            ))}
            {subModule.screens.length > 3 && (
              <div className="text-xs text-blue-600">+{subModule.screens.length - 3} more screens...</div>
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

const ScreenCard: React.FC<{
  screen: Screen;
  onSelect: () => void;
}> = ({ screen, onSelect }) => {
  const getScreenColor = (type: string) => {
    const colors = {
      library: 'from-green-500 to-teal-600',
      builder: 'from-blue-500 to-indigo-600',
      calendar: 'from-purple-500 to-pink-600',
      dashboard: 'from-orange-500 to-red-600',
      alerts: 'from-yellow-500 to-orange-600'
    };
    return colors[type as keyof typeof colors] || colors.library;
  };

  const getScreenIcon = (type: string) => {
    const icons = {
      library: BookOpen,
      builder: Settings,
      calendar: Calendar,
      dashboard: BarChart3,
      alerts: Bell
    };
    const IconComponent = icons[type as keyof typeof icons] || BookOpen;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getScreenColor(screen.type)}`}>
            {getScreenIcon(screen.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {screen.name}
            </h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
              {screen.type}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {screen.hasCalendar && <Calendar className="w-4 h-4 text-blue-500" />}
          {screen.hasGraphs && <BarChart3 className="w-4 h-4 text-green-500" />}
          {screen.hasDragDrop && <DragHandleDots2 className="w-4 h-4 text-purple-500" />}
          {screen.hasNotifications && <Bell className="w-4 h-4 text-orange-500" />}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{screen.description}</p>

      {/* Features Preview */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Features</h4>
        <div className="space-y-1">
          {screen.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
          {screen.features.length > 3 && (
            <div className="text-xs text-blue-600">+{screen.features.length - 3} more features...</div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button className={`w-full px-4 py-2 bg-gradient-to-r ${getScreenColor(screen.type)} text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium`}>
        <Play className="w-4 h-4" />
        <span>Open Screen</span>
      </button>
    </div>
  );
};
export const IntegratedTestingView: React.FC<IntegratedTestingViewProps> = ({ onBack }) => {
  const [selectedSubModule, setSelectedSubModule] = useState<SubModule | null>(null);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);

  const handleSubModuleSelect = (subModule: SubModule) => {
    setSelectedSubModule(subModule);
    setSelectedScreen(null);
  };

  const handleScreenSelect = (screen: Screen) => {
    setSelectedScreen(screen);
  };

  const handleBackToModule = () => {
    setSelectedSubModule(null);
    setSelectedScreen(null);
  };

  const handleBackToSubModule = () => {
    setSelectedScreen(null);
  };

  // Screen Detail Views
  if (selectedScreen) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToSubModule}
                className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedScreen.name}</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full capitalize">
                    {selectedScreen.type}
                  </span>
                </div>
                <p className="text-gray-700">{selectedScreen.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {selectedScreen.hasCalendar && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Calendar</span>
                </div>
              )}
              {selectedScreen.hasGraphs && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Graphs</span>
                </div>
              )}
              {selectedScreen.hasDragDrop && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  <DragHandleDots2 className="w-4 h-4" />
                  <span className="text-sm">Drag & Drop</span>
                </div>
              )}
              {selectedScreen.hasNotifications && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Alerts</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Screen Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Screen Type</p>
                <p className="text-lg font-bold text-gray-900 capitalize">{selectedScreen.type}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Features</p>
                <p className="text-lg font-bold text-gray-900">{selectedScreen.features.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Interactive</p>
                <p className="text-lg font-bold text-gray-900">{selectedScreen.hasDragDrop ? 'Yes' : 'View Only'}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Source</p>
                <p className="text-lg font-bold text-gray-900">Live</p>
              </div>
            </div>
          </div>
        </div>
        {/* Screen Content */}
        {selectedScreen.type === 'library' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Periodization Models Library</h3>
                  <p className="text-gray-600">Browse and select from predefined periodization models</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Custom Model</span>
                </button>
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {predefinedModels.map((model) => (
                  <div key={model.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-600">{model.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        {model.phases.length} Phases
                      </span>
                    </div>
                  
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{model.totalDuration} weeks total</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {model.phases.slice(0, 2).map((phase, index) => (
                        <div key={phase.id} className="flex items-center justify-between p-2 bg-white rounded text-sm">
                          <span className="font-medium text-gray-700">Phase {index + 1}: {phase.name}</span>
                          <span className="text-gray-500">{phase.duration}w</span>
                        </div>
                      ))}
                      {model.phases.length > 2 && (
                        <div className="text-sm text-blue-600 text-center py-1">+{model.phases.length - 2} more phases...</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Add to Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedScreen.type === 'builder' && selectedScreen.id === 'custom-builder' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Create Custom Periodization Model</h3>
                <p className="text-gray-600">Build a tailored periodization model for your specific needs</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter model name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Phases</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="3">3 Phases</option>
                    <option value="4">4 Phases</option>
                    <option value="5">5 Phases</option>
                    <option value="6">6 Phases</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <h4 className="text-md font-semibold text-gray-900">Phase Configuration</h4>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((phaseNum) => (
                    <div key={phaseNum} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {phaseNum}
                        </div>
                        <h5 className="font-medium text-gray-900">Phase {phaseNum}</h5>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phase Name</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Phase ${phaseNum} name...`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
                          <input
                            type="number"
                            min="1"
                            max="12"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="4"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Tests</label>
                          <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="vo2max">VO₂max Test</option>
                            <option value="1rm">1RM Testing</option>
                            <option value="jump">Vertical Jump</option>
                            <option value="flexibility">Flexibility</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={handleBackToSubModule}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Model</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedScreen.type === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Testing Schedule Calendar</h3>
                    <p className="text-gray-600">Interactive calendar for scheduling tests with conflict detection</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">Month</button>
                    <button className="px-3 py-1 text-gray-600 rounded text-sm hover:bg-gray-100">Week</button>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Schedule Test</span>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-700 py-2 bg-gray-50 rounded">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 6; // Start from previous month
                  const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                  const hasTest = [5, 12, 19, 26].includes(dayNum);
                  
                  return (
                    <div
                      key={i}
                      className={`min-h-[80px] p-2 border rounded-lg transition-colors hover:bg-gray-50 ${
                        isCurrentMonth ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
                      } ${hasTest ? 'border-blue-300 bg-blue-50' : ''}`}
                    >
                      <div className={`text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                        {dayNum > 0 ? dayNum : ''}
                      </div>
                      {hasTest && (
                        <div className="mt-1">
                          <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded font-medium">
                            VO₂max
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Rest Interval Validation</h4>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Ensure 48-72 hours between high-intensity tests for optimal recovery.
              </p>
            </div>
          </div>
        )}

        {selectedScreen.type === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Athlete Performance Dashboard</h3>
                    <p className="text-gray-600">Comprehensive view of athlete performance trends over time</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export Data
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Alex Rodriguez</option>
                  <option>Emma Johnson</option>
                  <option>Marcus Chen</option>
                </select>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { metric: 'VO₂max', value: '52.3', unit: 'ml/kg/min', trend: '+2.1%', color: 'text-green-600', bg: 'bg-green-50' },
                  { metric: 'Vertical Jump', value: '58.2', unit: 'cm', trend: '+1.8%', color: 'text-green-600', bg: 'bg-green-50' },
                  { metric: '1RM Squat', value: '142', unit: 'kg', trend: '+5.2%', color: 'text-green-600', bg: 'bg-green-50' },
                  { metric: 'Body Fat', value: '12.4', unit: '%', trend: '-0.8%', color: 'text-green-600', bg: 'bg-green-50' }
                ].map((item) => (
                  <div key={item.metric} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{item.metric}</h4>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${item.bg} ${item.color}`}>
                        {item.trend}
                      </span>
                    </div>
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                      <span className="text-sm text-gray-600">{item.unit}</span>
                    </div>
                    <div className="h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-end justify-center">
                      <div className="text-xs text-gray-500 font-medium">Interactive Chart</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedScreen.type === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Bell className="w-6 h-6 text-orange-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Metric Alerts & Thresholds</h3>
                    <p className="text-gray-600">Set up automated alerts for performance thresholds and changes</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Alert</span>
                </button>
              </div>

              <div className="space-y-4">
                {sampleAlerts.map((alert) => (
                  <div key={alert.id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{alert.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            alert.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {alert.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{alert.notes}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="p-2 bg-white rounded">
                            <span className="text-gray-500">Metric:</span>
                            <p className="font-medium capitalize">{alert.metric.replace('_', ' ')}</p>
                          </div>
                          <div className="p-2 bg-white rounded">
                            <span className="text-gray-500">Threshold:</span>
                            <p className="font-medium">{alert.thresholdValue}{alert.thresholdType === 'percent_change' ? '%' : ''}</p>
                          </div>
                          <div className="p-2 bg-white rounded">
                            <span className="text-gray-500">Notification:</span>
                            <p className="font-medium capitalize">{alert.notificationMethod.replace('_', ' ')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                          <Bell className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToModule}
                className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSubModule.name}</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    {selectedSubModule.screens.length} Screens
                  </span>
                </div>
                <p className="text-gray-700">{selectedSubModule.description}</p>
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
                <p className="text-sm text-gray-600">Total Screens</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.screens.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Interactive</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.screens.filter(s => s.hasDragDrop).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">With Analytics</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.screens.filter(s => s.hasGraphs).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">With Alerts</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.screens.filter(s => s.hasNotifications).length}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Screens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedSubModule.screens.map((screen) => (
            <ScreenCard
              key={screen.id}
              screen={screen}
              onSelect={() => handleScreenSelect(screen)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Main Module View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 shadow-sm border border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">{integratedTestingModule.name}</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Module 4
                </span>
              </div>
              <p className="text-gray-700 text-lg">{integratedTestingModule.description}</p>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{integratedTestingModule.subModules.length} Sub-Modules</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>{integratedTestingModule.subModules.reduce((total, sm) => total + sm.screens.length, 0)} Total Screens</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Database className="w-4 h-4" />
                  <span>Strategic Planning</span>
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
              <p className="text-sm font-medium text-gray-600">Sub-Modules</p>
              <p className="text-2xl font-bold text-gray-900">{integratedTestingModule.subModules.length}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Screens</p>
              <p className="text-2xl font-bold text-gray-900">{integratedTestingModule.subModules.reduce((total, sm) => total + sm.screens.length, 0)}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interactive Tools</p>
              <p className="text-2xl font-bold text-gray-900">{integratedTestingModule.subModules.reduce((total, sm) => total + sm.screens.filter(s => s.hasDragDrop).length, 0)}</p>
            </div>
            <DragHandleDots2 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
      {/* Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integratedTestingModule.subModules.map((subModule) => (
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