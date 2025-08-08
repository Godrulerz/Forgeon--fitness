import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Wifi, 
  WifiOff, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { DataCollectionSession, EquipmentStream, DataPoint } from '../../types/dataCollection';

interface DataCollectionDashboardProps {
  session: DataCollectionSession;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onDataPoint: (dataPoint: Omit<DataPoint, 'id' | 'timestamp'>) => void;
}

export const DataCollectionDashboard: React.FC<DataCollectionDashboardProps> = ({
  session,
  onStart,
  onPause,
  onStop,
  onDataPoint
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (session.status === 'in_progress' && session.startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - session.startTime!.getTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session.status, session.startTime]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'setup': return 'bg-gray-100 text-gray-700';
      case 'in_progress': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'aborted': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Collection Session</h2>
          <p className="text-gray-600">Real-time monitoring and control</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
            {session.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Session Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Session Time</span>
            <Clock className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatTime(elapsedTime)}</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Data Points</span>
            <Activity className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{session.dataPoints.length}</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Quality Flags</span>
            <AlertTriangle className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{session.qualityFlags.length}</div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-4 mb-6">
        {session.status === 'setup' && (
          <button
            onClick={onStart}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Start Collection</span>
          </button>
        )}

        {session.status === 'in_progress' && (
          <>
            <button
              onClick={onPause}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
            >
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </button>
            <button
              onClick={onStop}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Square className="w-5 h-5" />
              <span>Stop</span>
            </button>
          </>
        )}

        {session.status === 'paused' && (
          <button
            onClick={onStart}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Resume</span>
          </button>
        )}
      </div>

      {/* Equipment Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {session.equipmentStreams.map((stream) => (
            <div key={stream.equipmentId} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Equipment {stream.equipmentId}</span>
                {stream.isConnected ? (
                  <Wifi className="w-5 h-5 text-green-600" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="text-sm text-gray-600">
                <p>Rate: {stream.dataRate} Hz</p>
                <p>Calibration: {stream.calibrationStatus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Flags */}
      {session.qualityFlags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Alerts</h3>
          <div className="space-y-2">
            {session.qualityFlags.map((flag) => (
              <div key={flag.id} className={`p-3 rounded-lg border-l-4 ${
                flag.severity === 'high' ? 'bg-red-50 border-red-500' :
                flag.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{flag.type.replace('_', ' ').toUpperCase()}</p>
                    <p className="text-sm text-gray-600">{flag.message}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {flag.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};