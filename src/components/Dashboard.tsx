import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';
import { Tooltip } from './Tooltip';

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}> = ({ title, value, change, changeType, icon }) => {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 ${changeColor[changeType]}`}>
            {change}
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const upcomingTests = [
    { athlete: 'Alex Rodriguez', test: 'VO₂max Test', time: '10:00 AM', status: 'scheduled' },
    { athlete: 'Emma Johnson', test: 'Wingate Test', time: '2:00 PM', status: 'in_progress' },
    { athlete: 'Marcus Chen', test: 'Vertical Jump', time: '3:30 PM', status: 'scheduled' },
    { athlete: 'Sofia Martinez', test: 'Flexibility Assessment', time: '4:00 PM', status: 'scheduled' }
  ];

  const equipmentAlerts = [
    { equipment: 'ForceDecks System', issue: 'Calibration due', severity: 'warning' },
    { equipment: 'Metabolic Cart', issue: 'Maintenance required', severity: 'error' },
    { equipment: 'DEXA Scanner', issue: 'Operational', severity: 'success' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <Tooltip content="Overview of your fitness assessment platform activity and key metrics" />
          </div>
          <p className="text-gray-600 mt-1">Welcome back! Here's your assessment overview.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Schedule Test
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tests Completed"
          value="1,247"
          change="+12% from last month"
          changeType="positive"
          icon={<CheckCircle className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="Active Athletes"
          value="89"
          change="+5 new this week"
          changeType="positive"
          icon={<Users className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="Equipment Uptime"
          value="96.8%"
          change="-2.1% from last week"
          changeType="negative"
          icon={<Target className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="Avg Test Duration"
          value="47 min"
          change="Within target range"
          changeType="neutral"
          icon={<Clock className="w-6 h-6 text-blue-600" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{test.athlete}</p>
                    <p className="text-sm text-gray-600">{test.test}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{test.time}</p>
                  <StatusIndicator
                    status={test.status === 'scheduled' ? 'pending' : 'active'}
                    label={test.status === 'scheduled' ? 'Scheduled' : 'In Progress'}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Equipment Status</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage
            </button>
          </div>
          
          <div className="space-y-4">
            {equipmentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <StatusIndicator
                  status={alert.severity === 'error' ? 'error' : alert.severity === 'warning' ? 'warning' : 'success'}
                  label=""
                  size="sm"
                  showIcon={false}
                  showDot={true}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.equipment}</p>
                  <p className="text-xs text-gray-600">
                    {alert.issue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Performance Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">Module Performance Overview</h3>
            <Tooltip content="Completion rates across all assessment modules" />
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
            View Details
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-green-700">Module 1 Completion</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">87%</div>
            <div className="text-sm text-blue-700">Module 2 Completion</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">79%</div>
            <div className="text-sm text-orange-700">Module 3 Completion</div>
          </div>
        </div>
      </div>
    </div>
  );
};