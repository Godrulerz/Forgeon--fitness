import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Settings, Vibrate as Calibrate, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { EquipmentStream } from '../../types/dataCollection';

interface EquipmentInterfaceProps {
  equipmentId: string;
  onDataReceived: (data: any) => void;
  onStatusChange: (status: EquipmentStream) => void;
}

export const EquipmentInterface: React.FC<EquipmentInterfaceProps> = ({
  equipmentId,
  onDataReceived,
  onStatusChange
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [dataRate, setDataRate] = useState(0);
  const [lastData, setLastData] = useState<any>(null);
  const [calibrationStatus, setCalibrationStatus] = useState<'valid' | 'due' | 'overdue'>('valid');

  // Simulate equipment connection and data streaming
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected) {
      interval = setInterval(() => {
        // Simulate receiving data from equipment
        const mockData = {
          timestamp: new Date(),
          force: Math.random() * 1000 + 500, // N
          velocity: Math.random() * 2 + 1, // m/s
          power: Math.random() * 500 + 200, // W
        };
        
        setLastData(mockData);
        onDataReceived(mockData);
        setDataRate(100); // 100 Hz
      }, 10); // 100 Hz = every 10ms
    } else {
      setDataRate(0);
    }

    return () => clearInterval(interval);
  }, [isConnected, onDataReceived]);

  // Update parent component with status changes
  useEffect(() => {
    onStatusChange({
      equipmentId,
      isConnected,
      lastHeartbeat: new Date(),
      dataRate,
      calibrationStatus
    });
  }, [equipmentId, isConnected, dataRate, calibrationStatus, onStatusChange]);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const handleCalibrate = () => {
    setCalibrationStatus('valid');
    // In real implementation, this would trigger equipment calibration
  };

  const getStatusColor = () => {
    if (!isConnected) return 'text-red-600';
    if (calibrationStatus === 'overdue') return 'text-red-600';
    if (calibrationStatus === 'due') return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
            {isConnected ? (
              <Wifi className="w-6 h-6 text-green-600" />
            ) : (
              <WifiOff className="w-6 h-6 text-red-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Equipment {equipmentId}</h3>
            <p className={`text-sm ${getStatusColor()}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleConnect}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isConnected 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </button>
          
          <button
            onClick={handleCalibrate}
            disabled={!isConnected}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{dataRate} Hz</div>
          <div className="text-sm text-gray-600">Data Rate</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className={`text-lg font-bold ${getStatusColor()}`}>
            {calibrationStatus.toUpperCase()}
          </div>
          <div className="text-sm text-gray-600">Calibration</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">
            {isConnected ? '< 1ms' : 'N/A'}
          </div>
          <div className="text-sm text-gray-600">Latency</div>
        </div>
      </div>

      {/* Real-time Data Display */}
      {isConnected && lastData && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Live Data Stream</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Force</div>
              <div className="text-lg font-bold text-blue-900">
                {lastData.force?.toFixed(1)} N
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Velocity</div>
              <div className="text-lg font-bold text-green-900">
                {lastData.velocity?.toFixed(2)} m/s
              </div>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-sm text-orange-600 font-medium">Power</div>
              <div className="text-lg font-bold text-orange-900">
                {lastData.power?.toFixed(0)} W
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calibration Warning */}
      {calibrationStatus !== 'valid' && (
        <div className={`mt-4 p-3 rounded-lg border-l-4 ${
          calibrationStatus === 'overdue' 
            ? 'bg-red-50 border-red-500' 
            : 'bg-yellow-50 border-yellow-500'
        }`}>
          <div className="flex items-center space-x-2">
            <AlertTriangle className={`w-4 h-4 ${
              calibrationStatus === 'overdue' ? 'text-red-600' : 'text-yellow-600'
            }`} />
            <span className={`text-sm font-medium ${
              calibrationStatus === 'overdue' ? 'text-red-800' : 'text-yellow-800'
            }`}>
              Calibration {calibrationStatus === 'overdue' ? 'overdue' : 'due soon'}
            </span>
          </div>
          <button
            onClick={handleCalibrate}
            className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Calibrate Now
          </button>
        </div>
      )}
    </div>
  );
};