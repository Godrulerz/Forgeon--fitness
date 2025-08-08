import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Plus,
  Filter,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockSessions, mockUsers } from '../data/mockData';

const getStatusColor = (status: string) => {
  const colors = {
    scheduled: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
  };
  return colors[status as keyof typeof colors] || colors.scheduled;
};

const getStatusIcon = (status: string) => {
  const icons = {
    scheduled: <Calendar className="w-4 h-4" />,
    in_progress: <Clock className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
    cancelled: <AlertCircle className="w-4 h-4" />
  };
  return icons[status as keyof typeof icons] || icons.scheduled;
};

const SessionCard: React.FC<{
  session: typeof mockSessions[0];
}> = ({ session }) => {
  const athlete = mockUsers.find(u => u.id === session.athleteId);
  const coach = mockUsers.find(u => u.id === session.coachId);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{athlete?.name}</h3>
            <p className="text-sm text-gray-600">Coach: {coach?.name}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(session.status)}`}>
          {getStatusIcon(session.status)}
          <span className="capitalize">{session.status.replace('_', ' ')}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Date & Time</p>
          <p className="font-medium text-gray-900">
            {session.scheduledDate.toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            {session.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Test Type</p>
          <p className="font-medium text-gray-900">VO₂max Assessment</p>
        </div>
      </div>

      {session.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Notes</p>
          <p className="text-sm text-gray-900">{session.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          {session.status === 'scheduled' ? 'Start Test' : 'View Details'}
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          {session.status === 'scheduled' ? 'Reschedule' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export const ScheduleView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSessions = mockSessions.filter(session => {
    if (statusFilter === 'all') return true;
    return session.status === statusFilter;
  });

  const todaysSessions = filteredSessions.filter(session => {
    const today = new Date();
    return session.scheduledDate.toDateString() === today.toDateString();
  });

  const upcomingSessions = filteredSessions.filter(session => {
    const today = new Date();
    return session.scheduledDate > today;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Test Schedule</h2>
          <p className="text-gray-600">Manage testing sessions and appointments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Schedule Test</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export Schedule
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search athletes or tests..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Tests</p>
              <p className="text-2xl font-bold text-gray-900">{todaysSessions.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredSessions.filter(s => s.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilization</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Today's Sessions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Schedule</h3>
        {todaysSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No tests scheduled for today</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {todaysSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingSessions.slice(0, 4).map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};