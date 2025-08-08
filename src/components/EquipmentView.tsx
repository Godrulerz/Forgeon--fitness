import React from 'react';
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Calendar,
  TrendingUp,
  Settings
} from 'lucide-react';
import { mockEquipment } from '../data/mockData';

const getStatusColor = (status: string) => {
  const colors = {
    operational: 'bg-green-100 text-green-700',
    maintenance: 'bg-red-100 text-red-700',
    calibration_due: 'bg-yellow-100 text-yellow-700',
    out_of_service: 'bg-gray-100 text-gray-700'
  };
  return colors[status as keyof typeof colors] || colors.operational;
};

const getStatusIcon = (status: string) => {
  const icons = {
    operational: <CheckCircle className="w-4 h-4" />,
    maintenance: <AlertTriangle className="w-4 h-4" />,
    calibration_due: <Clock className="w-4 h-4" />,
    out_of_service: <AlertTriangle className="w-4 h-4" />
  };
  return icons[status as keyof typeof icons] || icons.operational;
};

const EquipmentCard: React.FC<{
  equipment: typeof mockEquipment[0];
}> = ({ equipment }) => {
  const daysUntilCalibration = Math.ceil(
    (equipment.nextCalibration.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Wrench className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{equipment.name}</h3>
            <p className="text-sm text-gray-600">{equipment.type}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(equipment.status)}`}>
          {getStatusIcon(equipment.status)}
          <span className="capitalize">{equipment.status.replace('_', ' ')}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Location</p>
          <p className="font-medium text-gray-900">{equipment.location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="font-medium text-gray-900">{equipment.accuracy}%</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Last Calibration</span>
          <span className="text-sm font-medium">{equipment.lastCalibration.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Next Calibration</span>
          <span className={`text-sm font-medium ${
            daysUntilCalibration <= 7 ? 'text-red-600' : 
            daysUntilCalibration <= 14 ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {daysUntilCalibration > 0 ? `${daysUntilCalibration} days` : 'Overdue'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Calibrate
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Schedule Maintenance
        </button>
      </div>
    </div>
  );
};

export const EquipmentView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Equipment Management</h2>
          <p className="text-gray-600">Monitor and maintain your assessment equipment</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Equipment
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Calibration Schedule
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Equipment</p>
              <p className="text-2xl font-bold text-gray-900">{mockEquipment.length}</p>
            </div>
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operational</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEquipment.filter(e => e.status === 'operational').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEquipment.filter(e => e.status !== 'operational').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">
                {(mockEquipment.reduce((sum, e) => sum + e.accuracy, 0) / mockEquipment.length).toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockEquipment.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>

      {/* Calibration Schedule */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Calibrations</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Full Schedule
          </button>
        </div>
        
        <div className="space-y-4">
          {mockEquipment
            .sort((a, b) => a.nextCalibration.getTime() - b.nextCalibration.getTime())
            .map((equipment) => {
              const daysUntil = Math.ceil(
                (equipment.nextCalibration.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <div key={equipment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      daysUntil <= 7 ? 'bg-red-500' : 
                      daysUntil <= 14 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{equipment.name}</p>
                      <p className="text-sm text-gray-600">{equipment.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {equipment.nextCalibration.toLocaleDateString()}
                    </p>
                    <p className={`text-xs ${
                      daysUntil <= 7 ? 'text-red-600' : 
                      daysUntil <= 14 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {daysUntil > 0 ? `${daysUntil} days` : 'Overdue'}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};