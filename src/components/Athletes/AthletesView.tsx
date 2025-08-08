import React, { useState } from 'react';
import { 
  User, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Heart,
  Zap,
  Target,
  Activity,
  Clock,
  Award,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  ArrowLeft,
  Camera,
  FileText,
  AlertTriangle,
  CheckCircle,
  Star,
  BarChart3
} from 'lucide-react';
import { mockAthletes } from '../../data/athletes';
import { Athlete, PerformanceMetric, Achievement, InjuryRecord } from '../../types/athletes';
import { StatusIndicator } from '../StatusIndicator';
import { Tooltip } from '../Tooltip';

interface AthletesViewProps {}

const AthleteCard: React.FC<{
  athlete: Athlete;
  onView: (athlete: Athlete) => void;
  onEdit: (athlete: Athlete) => void;
}> = ({ athlete, onView, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'injured': return 'error';
      case 'recovering': return 'warning';
      case 'inactive': return 'inactive';
      default: return 'inactive';
    }
  };

  const getPerformanceTrend = () => {
    const recentMetrics = athlete.performanceMetrics.slice(-3);
    if (recentMetrics.length < 2) return 'stable';
    
    const improving = recentMetrics.filter(m => m.trend === 'up').length;
    const declining = recentMetrics.filter(m => m.trend === 'down').length;
    
    if (improving > declining) return 'up';
    if (declining > improving) return 'down';
    return 'stable';
  };

  const trend = getPerformanceTrend();
  const trendIcon = trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-600" /> :
                   trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-600" /> :
                   <Minus className="w-4 h-4 text-gray-600" />;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={athlete.profilePhoto} 
              alt={athlete.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
              athlete.status === 'active' ? 'bg-green-500' : 
              athlete.status === 'injured' ? 'bg-red-500' : 
              athlete.status === 'recovering' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{athlete.name}</h3>
            <p className="text-sm text-gray-600">{athlete.sport} • {athlete.position}</p>
            <p className="text-xs text-gray-500">{athlete.team}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIndicator
            status={getStatusColor(athlete.status)}
            label={athlete.status.charAt(0).toUpperCase() + athlete.status.slice(1)}
            size="sm"
          />
          {trendIcon}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{athlete.age}</div>
          <div className="text-xs text-gray-600">Age</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{athlete.performanceMetrics.length}</div>
          <div className="text-xs text-gray-600">Metrics</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{athlete.achievements.length}</div>
          <div className="text-xs text-gray-600">Awards</div>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Performance</h4>
        <div className="space-y-1">
          {athlete.performanceMetrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{metric.name}</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{metric.value} {metric.unit}</span>
                {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 text-green-500" /> :
                 metric.trend === 'down' ? <TrendingDown className="w-3 h-3 text-red-500" /> :
                 <Minus className="w-3 h-3 text-gray-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onView(athlete)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Profile</span>
        </button>
        <button
          onClick={() => onEdit(athlete)}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

const AthleteDetailView: React.FC<{
  athlete: Athlete;
  onBack: () => void;
  onEdit: () => void;
}> = ({ athlete, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'achievements' | 'medical'>('overview');

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      injured: 'bg-red-100 text-red-700',
      recovering: 'bg-yellow-100 text-yellow-700',
      inactive: 'bg-gray-100 text-gray-700'
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  const renderSparkline = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="flex items-end space-x-1 h-8 w-20">
        {data.map((value, index) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className="bg-blue-500 w-1 rounded-t"
              style={{ height: `${Math.max(height, 5)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <img 
                src={athlete.profilePhoto} 
                alt={athlete.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{athlete.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(athlete.status)}`}>
                    {athlete.status.charAt(0).toUpperCase() + athlete.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-700">{athlete.sport} • {athlete.position}</p>
                <p className="text-gray-600">{athlete.team}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>Age: {athlete.age}</span>
                  <span>Height: {athlete.height}cm</span>
                  <span>Weight: {athlete.weight}kg</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onEdit}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assessments</p>
              <p className="text-2xl font-bold text-gray-900">{athlete.totalAssessments}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{athlete.achievements.length}</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Assessment</p>
              <p className="text-2xl font-bold text-gray-900">{athlete.lastAssessment.toLocaleDateString()}</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Performance Rating</p>
              <p className="text-2xl font-bold text-gray-900">{athlete.performanceRating}/10</p>
            </div>
            <Star className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'performance', label: 'Performance', icon: BarChart3 },
              { id: 'achievements', label: 'Achievements', icon: Trophy },
              { id: 'medical', label: 'Medical', icon: Heart }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{athlete.nationality}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Born: {athlete.dateOfBirth.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{athlete.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{athlete.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Career Highlights */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Career Highlights</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{athlete.bio}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
                <div className="flex items-center space-x-4">
                  {athlete.socialMedia.instagram && (
                    <a href={athlete.socialMedia.instagram} className="flex items-center space-x-2 px-3 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors">
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm">Instagram</span>
                    </a>
                  )}
                  {athlete.socialMedia.twitter && (
                    <a href={athlete.socialMedia.twitter} className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  )}
                  {athlete.socialMedia.facebook && (
                    <a href={athlete.socialMedia.facebook} className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      <Facebook className="w-4 h-4" />
                      <span className="text-sm">Facebook</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentile</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {athlete.performanceMetrics.map((metric) => (
                      <tr key={metric.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{metric.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{metric.category.replace('_', ' ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{metric.value} {metric.unit}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${
                            metric.changePercent > 0 ? 'text-green-600' : 
                            metric.changePercent < 0 ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderSparkline(metric.trendData)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{metric.percentile}th</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{metric.lastUpdated.toLocaleDateString()}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {athlete.achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{achievement.date.toLocaleDateString()}</span>
                          <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full font-medium">
                            {achievement.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medical Tab */}
          {activeTab === 'medical' && (
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medical Status</h3>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  {athlete.status === 'active' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {athlete.status === 'active' ? 'Cleared for All Activities' : 
                       athlete.status === 'injured' ? 'Currently Injured' :
                       athlete.status === 'recovering' ? 'In Recovery' : 'Inactive'}
                    </p>
                    <p className="text-sm text-gray-600">Last medical check: {athlete.lastMedicalCheck?.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Injury History */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Injury History</h3>
                {athlete.injuryHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No injury history recorded</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {athlete.injuryHistory.map((injury) => (
                      <div key={injury.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{injury.type}</h4>
                            <p className="text-sm text-gray-600">{injury.description}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {injury.date.toLocaleDateString()} - {injury.recoveryDate?.toLocaleDateString() || 'Ongoing'}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            injury.severity === 'minor' ? 'bg-green-100 text-green-700' :
                            injury.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {injury.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AthletesView: React.FC<AthletesViewProps> = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'sport' | 'lastAssessment' | 'performance'>('name');

  const filteredAthletes = mockAthletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === 'all' || athlete.sport === sportFilter;
    const matchesStatus = statusFilter === 'all' || athlete.status === statusFilter;
    
    return matchesSearch && matchesSport && matchesStatus;
  });

  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'sport':
        return a.sport.localeCompare(b.sport);
      case 'lastAssessment':
        return b.lastAssessment.getTime() - a.lastAssessment.getTime();
      case 'performance':
        return b.performanceRating - a.performanceRating;
      default:
        return 0;
    }
  });

  const handleViewAthlete = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
  };

  const handleEditAthlete = (athlete: Athlete) => {
    console.log('Edit athlete:', athlete.id);
    // TODO: Implement edit functionality
  };

  const handleBackToList = () => {
    setSelectedAthlete(null);
  };

  const handleEditFromDetail = () => {
    console.log('Edit athlete from detail:', selectedAthlete?.id);
    // TODO: Implement edit functionality
  };

  const sports = [...new Set(mockAthletes.map(a => a.sport))];

  if (selectedAthlete) {
    return (
      <AthleteDetailView
        athlete={selectedAthlete}
        onBack={handleBackToList}
        onEdit={handleEditFromDetail}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">Athletes</h2>
            <Tooltip content="Comprehensive athlete management system for tracking profiles, performance metrics, and assessment history" />
          </div>
          <p className="text-gray-600 mt-1">Manage athlete profiles and track performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Athlete</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Import Athletes
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search athletes..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sports</option>
            {sports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="injured">Injured</option>
            <option value="recovering">Recovering</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="sport">Sort by Sport</option>
            <option value="lastAssessment">Sort by Last Assessment</option>
            <option value="performance">Sort by Performance</option>
          </select>
          
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Total Athletes</p>
                <Tooltip content="Total number of athletes registered in the system" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{mockAthletes.length}</p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Active Athletes</p>
                <Tooltip content="Athletes currently active and available for testing" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {mockAthletes.filter(a => a.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Sports Covered</p>
                <Tooltip content="Number of different sports represented by athletes" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{sports.length}</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <Tooltip content="Average performance rating across all athletes" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {(mockAthletes.reduce((sum, a) => sum + a.performanceRating, 0) / mockAthletes.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Athletes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAthletes.map((athlete) => (
          <AthleteCard
            key={athlete.id}
            athlete={athlete}
            onView={handleViewAthlete}
            onEdit={handleEditAthlete}
          />
        ))}
      </div>

      {sortedAthletes.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No athletes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};