import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Minus, Search, Filter, Download, RefreshCw, Eye, EyeOff, ChevronLeft, ChevronRight, ArrowLeft, Target, Brain, Lightbulb, CheckCircle, AlertTriangle, Clock, User, Calendar, Award, Activity, Heart, Zap, Users, Plus, Bell, Database, TrendingUp as TrendIcon, Calculator, FileText, Info, Maximize2, Shield, LineChart, PieChart, BarChart, ScatterChart as Scatter } from 'lucide-react';
import { AthleteAnalytics, AnalyticsMetric } from '../../types/analytics';
import { mockAthleteAnalytics } from '../../data/analytics';

interface AnalyticsViewProps {}

const AthleteCard: React.FC<{
  athlete: AthleteAnalytics;
  onSelect: (athlete: AthleteAnalytics) => void;
}> = ({ athlete, onSelect }) => {
  const getOverallTrend = () => {
    const improving = athlete.metrics.filter(m => m.trend === 'up').length;
    const declining = athlete.metrics.filter(m => m.trend === 'down').length;
    
    if (improving > declining) return { trend: 'up', color: 'text-green-600', icon: TrendingUp };
    if (declining > improving) return { trend: 'down', color: 'text-red-600', icon: TrendingDown };
    return { trend: 'stable', color: 'text-gray-600', icon: Minus };
  };

  const overallTrend = getOverallTrend();
  const TrendIcon = overallTrend.icon;

  return (
    <div 
      onClick={() => onSelect(athlete)}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img 
            src={athlete.avatar} 
            alt={athlete.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {athlete.name}
            </h3>
            <p className="text-sm text-gray-600">{athlete.sport} • {athlete.position}</p>
            <p className="text-xs text-gray-500">Age: {athlete.age}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendIcon className={`w-5 h-5 ${overallTrend.color}`} />
          <span className="text-sm text-gray-500">
            {athlete.metrics.length} metrics
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{athlete.metrics.length}</div>
          <div className="text-xs text-gray-600">Metrics</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{athlete.insights.length}</div>
          <div className="text-xs text-gray-600">Insights</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{athlete.actions.length}</div>
          <div className="text-xs text-gray-600">Actions</div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Performance</h4>
        <div className="space-y-1">
          {athlete.metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{metric.name}</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{metric.latestValue} {metric.unit}</span>
                {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 text-green-500" /> :
                 metric.trend === 'down' ? <TrendingDown className="w-3 h-3 text-red-500" /> :
                 <Minus className="w-3 h-3 text-gray-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Last Assessment: {athlete.lastAssessment.toLocaleDateString()}
      </div>
    </div>
  );
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

export const AnalyticsView: React.FC<AnalyticsViewProps> = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteAnalytics | null>(null);
  const [activeTab, setActiveTab] = useState<'data' | 'information' | 'knowledge' | 'wisdom'>('data');
  const [selectedMetric, setSelectedMetric] = useState<AnalyticsMetric | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'metric' | 'value' | 'change' | 'percentile'>('metric');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState({
    metric: true,
    value: true,
    change: true,
    trend: true,
    percentile: true,
    rating: true
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('30d');
  const [coachFilter, setCoachFilter] = useState('all');

  const itemsPerPage = 10;

  const handleAthleteSelect = (athlete: AthleteAnalytics) => {
    setSelectedAthlete(athlete);
    setActiveTab('data');
    setSelectedMetric(null);
  };

  const handleBackToAthletes = () => {
    setSelectedAthlete(null);
    setActiveTab('data');
    setSelectedMetric(null);
  };

  const handleMetricSelect = (metric: AnalyticsMetric) => {
    setSelectedMetric(metric);
    setActiveTab('information');
  };

  const handleTabChange = (tab: 'data' | 'information' | 'knowledge' | 'wisdom') => {
    setActiveTab(tab);
  };

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const handleSort = (column: 'metric' | 'value' | 'change' | 'percentile') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Filter and sort metrics
  const getFilteredMetrics = () => {
    if (!selectedAthlete) return [];
    
    let filtered = selectedAthlete.metrics.filter(metric =>
      metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort metrics
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'metric':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'value':
          aValue = a.latestValue;
          bValue = b.latestValue;
          break;
        case 'change':
          aValue = a.changePercent;
          bValue = b.changePercent;
          break;
        case 'percentile':
          aValue = a.percentile;
          bValue = b.percentile;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });

    return filtered;
  };

  const filteredMetrics = getFilteredMetrics();
  const totalPages = Math.ceil(filteredMetrics.length / itemsPerPage);
  const paginatedMetrics = filteredMetrics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // If no athlete selected, show athlete selection
  if (!selectedAthlete) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
            <p className="text-gray-600">Select an athlete to view comprehensive performance analysis</p>
          </div>
        </div>

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAthleteAnalytics.map((athlete) => (
            <AthleteCard
              key={athlete.id}
              athlete={athlete}
              onSelect={handleAthleteSelect}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Global Toolbar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToAthletes}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
              <p className="text-gray-600">{selectedAthlete.name} - {selectedAthlete.sport}</p>
            </div>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coach Filter</label>
              <select
                value={coachFilter}
                onChange={(e) => setCoachFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Coaches</option>
                <option value="coach-1">Dr. Sarah Johnson</option>
                <option value="coach-2">Michael Chen</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4-TAP Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'data', label: 'TAP 1 - DATA', icon: Database, description: 'Raw Test Data' },
              { id: 'information', label: 'TAP 2 - INFORMATION', icon: BarChart3, description: 'Patterns & Trends' },
              { id: 'knowledge', label: 'TAP 3 - KNOWLEDGE', icon: Brain, description: 'Synthesis & Understanding' },
              { id: 'wisdom', label: 'TAP 4 - WISDOM', icon: Target, description: 'Strategic Recommendations' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <div className="text-left">
                    <div>{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* TAP 1 - DATA */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Analytics</span>
                <span>/</span>
                <span className="font-medium text-gray-900">TAP 1 - DATA</span>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Raw Test Data & Measurements</h3>
                    <p className="text-gray-700">All quantitative assessments, biometric readings, and performance measurements</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-blue-600 font-medium">Total Metrics:</span>
                    <p className="text-lg font-bold text-gray-900">{selectedAthlete.metrics.length}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-blue-600 font-medium">Categories:</span>
                    <p className="text-lg font-bold text-gray-900">{new Set(selectedAthlete.metrics.map(m => m.category)).size}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <span className="text-blue-600 font-medium">Last Updated:</span>
                    <p className="text-lg font-bold text-gray-900">{selectedAthlete.lastAssessment.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Table Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search metrics..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Column Visibility:</span>
                    {Object.entries(visibleColumns).map(([column, visible]) => (
                      <button
                        key={column}
                        onClick={() => toggleColumn(column as keyof typeof visibleColumns)}
                        className={`p-1 rounded ${visible ? 'text-blue-600' : 'text-gray-400'}`}
                        title={`Toggle ${column} column`}
                      >
                        {visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Showing {paginatedMetrics.length} of {filteredMetrics.length} metrics
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {visibleColumns.metric && (
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('metric')}
                        >
                          Metric {sortBy === 'metric' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                      )}
                      {visibleColumns.value && (
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('value')}
                        >
                          Latest Value {sortBy === 'value' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                      )}
                      {visibleColumns.change && (
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('change')}
                        >
                          Δ vs Last (%) {sortBy === 'change' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                      )}
                      {visibleColumns.trend && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trend Sparkline
                        </th>
                      )}
                      {visibleColumns.percentile && (
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('percentile')}
                        >
                          Percentile {sortBy === 'percentile' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                      )}
                      {visibleColumns.rating && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedMetrics.map((metric) => (
                      <tr 
                        key={metric.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleMetricSelect(metric)}
                      >
                        {visibleColumns.metric && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{metric.name}</div>
                            <div className="text-sm text-gray-500 capitalize">{metric.category.replace('_', ' ')}</div>
                          </td>
                        )}
                        {visibleColumns.value && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{metric.latestValue} {metric.unit}</div>
                            <div className="text-xs text-gray-500">{metric.lastUpdated.toLocaleDateString()}</div>
                          </td>
                        )}
                        {visibleColumns.change && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${
                              metric.changePercent > 0 ? 'text-green-600' : 
                              metric.changePercent < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                            </div>
                          </td>
                        )}
                        {visibleColumns.trend && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderSparkline(metric.trendData)}
                          </td>
                        )}
                        {visibleColumns.percentile && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{metric.percentile}th</div>
                          </td>
                        )}
                        {visibleColumns.rating && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {metric.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-600" /> :
                               metric.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-600" /> :
                               <Minus className="w-4 h-4 text-gray-600" />}
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                metric.category_rating === 'superior' ? 'bg-purple-100 text-purple-700' :
                                metric.category_rating === 'excellent' ? 'bg-green-100 text-green-700' :
                                metric.category_rating === 'good' ? 'bg-blue-100 text-blue-700' :
                                metric.category_rating === 'fair' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {metric.category_rating}
                              </span>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAP 2 - INFORMATION */}
          {activeTab === 'information' && (
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <button 
                  onClick={() => setActiveTab('data')}
                  className="hover:text-blue-600 transition-colors"
                >
                  TAP 1 - DATA
                </button>
                <span>/</span>
                <span className="font-medium text-gray-900">TAP 2 - INFORMATION</span>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Patterns, Trends & Statistical Analysis</h3>
                    <p className="text-gray-700">Meaningful information derived from raw data through statistical analysis</p>
                  </div>
                </div>
              </div>

              {selectedMetric ? (
                <div className="space-y-6">
                  {/* Metric Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedMetric.name}</h3>
                        <p className="text-gray-600 capitalize">{selectedMetric.category.replace('_', ' ')} Assessment</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="flex items-center space-x-1">
                            <span className="text-gray-600">Current:</span>
                            <span className="font-bold text-gray-900">{selectedMetric.latestValue} {selectedMetric.unit}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="text-gray-600">Percentile:</span>
                            <span className="font-bold text-gray-900">{selectedMetric.percentile}th</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="text-gray-600">Rating:</span>
                            <span className={`font-bold capitalize ${
                              selectedMetric.category_rating === 'superior' ? 'text-purple-600' :
                              selectedMetric.category_rating === 'excellent' ? 'text-green-600' :
                              selectedMetric.category_rating === 'good' ? 'text-blue-600' :
                              selectedMetric.category_rating === 'fair' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {selectedMetric.category_rating}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className={`text-right ${
                        selectedMetric.changePercent > 0 ? 'text-green-600' : 
                        selectedMetric.changePercent < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <div className="text-2xl font-bold">
                          {selectedMetric.changePercent > 0 ? '+' : ''}{selectedMetric.changePercent.toFixed(1)}%
                        </div>
                        <div className="text-sm">vs. Previous</div>
                      </div>
                    </div>
                  </div>

                  {/* Statistical Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      {/* Primary Chart */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">Performance Trend Analysis</h4>
                          <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                              Compare to Norm
                            </button>
                          </div>
                        </div>
                        <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                            <p className="text-gray-600">Interactive Time-Series Chart</p>
                            <p className="text-sm text-gray-500">Trend: {selectedMetric.trendData.join(' → ')}</p>
                          </div>
                        </div>
                      </div>

                      {/* Pattern Recognition */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Pattern Recognition & Correlations</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h5 className="font-medium text-green-900 mb-2">Trend Direction</h5>
                            <div className="flex items-center space-x-2">
                              {selectedMetric.trend === 'up' ? (
                                <TrendingUp className="w-5 h-5 text-green-600" />
                              ) : selectedMetric.trend === 'down' ? (
                                <TrendingDown className="w-5 h-5 text-red-600" />
                              ) : (
                                <Minus className="w-5 h-5 text-gray-600" />
                              )}
                              <span className="text-sm font-medium capitalize">{selectedMetric.trend}ward</span>
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h5 className="font-medium text-blue-900 mb-2">Consistency</h5>
                            <p className="text-sm text-blue-800">
                              CV: {((selectedMetric.trendData.reduce((sum, val, _, arr) => {
                                const mean = arr.reduce((s, v) => s + v, 0) / arr.length;
                                return sum + Math.pow(val - mean, 2);
                              }, 0) / selectedMetric.trendData.length) ** 0.5 / selectedMetric.latestValue * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Statistical Insights */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Statistical Summary</h4>
                        <div className="space-y-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Mean Value</div>
                            <div className="text-lg font-bold text-gray-900">
                              {(selectedMetric.trendData.reduce((sum, val) => sum + val, 0) / selectedMetric.trendData.length).toFixed(1)} {selectedMetric.unit}
                            </div>
                          </div>
                          
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Range</div>
                            <div className="text-lg font-bold text-gray-900">
                              {Math.min(...selectedMetric.trendData).toFixed(1)} - {Math.max(...selectedMetric.trendData).toFixed(1)} {selectedMetric.unit}
                            </div>
                          </div>
                          
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Z-Score</div>
                            <div className="text-lg font-bold text-gray-900">
                              {((selectedMetric.percentile - 50) / 15).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Correlations */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Related Metrics</h4>
                        <div className="space-y-3">
                          {selectedAthlete.metrics
                            .filter(m => m.category === selectedMetric.category && m.id !== selectedMetric.id)
                            .slice(0, 3)
                            .map((relatedMetric) => (
                            <div key={relatedMetric.id} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900">{relatedMetric.name}</span>
                                <div className="flex items-center space-x-1">
                                  <span className="text-sm text-gray-600">{relatedMetric.latestValue} {relatedMetric.unit}</span>
                                  {relatedMetric.trend === 'up' ? (
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                  ) : relatedMetric.trend === 'down' ? (
                                    <TrendingDown className="w-3 h-3 text-red-500" />
                                  ) : (
                                    <Minus className="w-3 h-3 text-gray-500" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Metric for Analysis</h3>
                  <p className="text-gray-600">Click on any metric from TAP 1 - DATA to view detailed statistical analysis</p>
                  <button
                    onClick={() => setActiveTab('data')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Back to Data
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAP 3 - KNOWLEDGE */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <button 
                  onClick={() => setActiveTab('data')}
                  className="hover:text-blue-600 transition-colors"
                >
                  TAP 1 - DATA
                </button>
                <span>/</span>
                <button 
                  onClick={() => setActiveTab('information')}
                  className="hover:text-blue-600 transition-colors"
                >
                  TAP 2 - INFORMATION
                </button>
                <span>/</span>
                <span className="font-medium text-gray-900">TAP 3 - KNOWLEDGE</span>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Synthesis & Understanding</h3>
                    <p className="text-gray-700">Drawing conclusions and understanding implications of the data patterns</p>
                  </div>
                </div>
              </div>

              {/* Holistic Assessment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="w-6 h-6 text-red-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Overall Physical State</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">Excellent</div>
                    <p className="text-sm text-gray-600">Strong performance across multiple domains with consistent improvement trends</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cardiovascular:</span>
                      <span className="font-medium text-green-600">Superior</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Strength:</span>
                      <span className="font-medium text-blue-600">Good</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Power:</span>
                      <span className="font-medium text-green-600">Excellent</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendIcon className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Performance Trajectory</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">Ascending</div>
                    <p className="text-sm text-gray-600">Positive trends in 80% of key performance indicators</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Improving:</span>
                      <span className="font-medium text-green-600">{selectedAthlete.metrics.filter(m => m.trend === 'up').length} metrics</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Stable:</span>
                      <span className="font-medium text-gray-600">{selectedAthlete.metrics.filter(m => m.trend === 'stable').length} metrics</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Declining:</span>
                      <span className="font-medium text-red-600">{selectedAthlete.metrics.filter(m => m.trend === 'down').length} metrics</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Risk Assessment</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">Low-Medium</div>
                    <p className="text-sm text-gray-600">Monitor flexibility metrics for injury prevention</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Injury Risk:</span>
                      <span className="font-medium text-yellow-600">Low</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Overtraining:</span>
                      <span className="font-medium text-green-600">None</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recovery:</span>
                      <span className="font-medium text-green-600">Optimal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-orange-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Key Insights & Understanding</h4>
                </div>
                
                <div className="space-y-4">
                  {selectedAthlete.insights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-blue-900">{insight.title}</h5>
                        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-blue-800">{insight.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-blue-700">
                        <span>Type: {insight.type}</span>
                        <span>Generated: {insight.generatedAt.toLocaleDateString()}</span>
                        {insight.pinned && <span className="bg-blue-200 px-2 py-1 rounded">Pinned</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmarking */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="w-6 h-6 text-purple-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Benchmarking & Standards Comparison</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Sport-Specific Standards</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">VO₂max (Soccer)</span>
                        <span className="text-sm font-medium text-green-600">Above Average</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Sprint Speed</span>
                        <span className="text-sm font-medium text-green-600">Excellent</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Agility</span>
                        <span className="text-sm font-medium text-blue-600">Good</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Age Group Comparison</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Overall Fitness</span>
                        <span className="text-sm font-medium text-green-600">85th Percentile</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Strength Metrics</span>
                        <span className="text-sm font-medium text-blue-600">78th Percentile</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">Endurance</span>
                        <span className="text-sm font-medium text-green-600">92nd Percentile</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAP 4 - WISDOM */}
          {activeTab === 'wisdom' && (
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <button 
                  onClick={() => setActiveTab('data')}
                  className="hover:text-blue-600 transition-colors"
                >
                  TAP 1 - DATA
                </button>
                <span>/</span>
                <button 
                  onClick={() => setActiveTab('information')}
                  className="hover:text-blue-600 transition-colors"
                >
                  TAP 2 - INFORMATION
                </button>
                <span>/</span>
                <button 
                  onClick={() => setActiveTab('knowledge')}
                  className="hover:text-blue-600 transition-colors"
                >
                  TAP 3 - KNOWLEDGE
                </button>
                <span>/</span>
                <span className="font-medium text-gray-900">TAP 4 - WISDOM</span>
              </div>

              {/* Section Header */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 shadow-sm border border-orange-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-900">WISDOM</h2>
                </div>
                <p className="text-gray-700">Strategic recommendations, decision guidance, and actionable insights</p>
              </div>

              {/* Strategic Recommendations */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-900">Strategic Action Plan</h3>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Action</span>
                  </button>
                </div>

                {/* Action Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assign</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedAthlete.actions.map((action) => (
                        <tr key={action.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{action.title}</div>
                            <div className="text-sm text-gray-500">{action.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              action.priority === 'high' ? 'bg-red-100 text-red-700' :
                              action.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {action.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{action.dueDate.toLocaleDateString()}</div>
                            <div className={`text-xs ${
                              action.dueDate < new Date() ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              {action.dueDate < new Date() ? 'Overdue' : 'Upcoming'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full capitalize">
                              {action.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors">
                              Assign to Coach
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={action.acknowledged}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                readOnly
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                {action.acknowledged ? 'Completed' : 'Pending'}
                              </span>
                            </label>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Decision Guidance */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Decision-Making Guidance</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-900 mb-3">Immediate Actions (Next 2 Weeks)</h5>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Continue current aerobic training protocol</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Increase plyometric training frequency</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Schedule flexibility assessment</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-3">Long-term Strategy (Next 3 Months)</h5>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start space-x-2">
                        <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Periodize training for peak performance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Monitor for overtraining indicators</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Reassess every 4-6 weeks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Risk Mitigation */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Risk Assessment & Mitigation</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <h5 className="font-medium text-yellow-900 mb-2">Moderate Risk: Flexibility Decline</h5>
                    <p className="text-sm text-yellow-800 mb-3">
                      Flexibility metrics showing slight decline over past month. Could indicate increased injury risk.
                    </p>
                    <div className="text-sm text-yellow-800">
                      <strong>Mitigation:</strong> Implement daily mobility routine, schedule massage therapy, monitor closely.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <h5 className="font-medium text-green-900 mb-2">Low Risk: Overall Performance</h5>
                    <p className="text-sm text-green-800 mb-3">
                      Strong performance trends across most metrics with good recovery indicators.
                    </p>
                    <div className="text-sm text-green-800">
                      <strong>Maintenance:</strong> Continue current training approach with minor adjustments.
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Panel */}
              {selectedAthlete.alerts.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-orange-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Active Alerts</h4>
                    </div>
                    <button className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200 transition-colors">
                      Create New Alert
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedAthlete.alerts.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                        alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                        alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                        'bg-blue-50 border-blue-500'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900">{alert.title}</h5>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                              Snooze
                            </button>
                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors">
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};