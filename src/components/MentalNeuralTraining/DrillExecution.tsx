import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Square, 
  Timer, 
  Target, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  RotateCcw,
  TrendingUp,
  Award,
  Clock,
  Activity
} from 'lucide-react';
import { NeuralDrill, DrillSession, DrillResult } from '../../types/neuralTraining';
import { ProgressIndicator } from '../ProgressIndicator';
import { StatusIndicator } from '../StatusIndicator';

interface DrillExecutionProps {
  drill: NeuralDrill;
  onBack: () => void;
  onComplete: (session: DrillSession) => void;
}

type ExecutionPhase = 'setup' | 'ready' | 'running' | 'paused' | 'completed';

interface DrillConfig {
  duration: number; // seconds
  trials: number;
  restBetweenTrials: number; // seconds
  difficulty: 'easy' | 'medium' | 'hard';
  audioEnabled: boolean;
  visualCues: boolean;
}

export const DrillExecution: React.FC<DrillExecutionProps> = ({
  drill,
  onBack,
  onComplete
}) => {
  const [phase, setPhase] = useState<ExecutionPhase>('setup');
  const [config, setConfig] = useState<DrillConfig>({
    duration: drill.estimatedDuration ? drill.estimatedDuration * 60 : 300, // convert to seconds
    trials: 10,
    restBetweenTrials: 3,
    difficulty: 'medium',
    audioEnabled: true,
    visualCues: true
  });
  
  const [currentTrial, setCurrentTrial] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.duration);
  const [trialStartTime, setTrialStartTime] = useState<Date | null>(null);
  const [results, setResults] = useState<DrillResult[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  
  // Simulated neural pod data
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isStimulus, setIsStimulus] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (phase === 'running' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setPhase('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [phase, timeRemaining]);

  // Simulate neural pod stimulus
  useEffect(() => {
    let stimulusTimeout: NodeJS.Timeout;
    
    if (phase === 'running' && currentTrial < config.trials) {
      // Random stimulus every 2-5 seconds
      const delay = Math.random() * 3000 + 2000;
      stimulusTimeout = setTimeout(() => {
        triggerStimulus();
      }, delay);
    }
    
    return () => clearTimeout(stimulusTimeout);
  }, [phase, currentTrial]);

  const triggerStimulus = () => {
    setIsStimulus(true);
    setTrialStartTime(new Date());
    
    // Auto-hide stimulus after 2 seconds if no response
    setTimeout(() => {
      if (isStimulus) {
        handleMissedResponse();
      }
    }, 2000);
  };

  const handleResponse = useCallback(() => {
    if (!isStimulus || !trialStartTime) return;
    
    const responseTime = Date.now() - trialStartTime.getTime();
    setReactionTime(responseTime);
    setIsStimulus(false);
    
    // Record result
    const result: DrillResult = {
      id: `result-${currentTrial + 1}`,
      metric: 'reaction_time',
      value: responseTime,
      unit: 'ms',
      timestamp: new Date(),
      trial: currentTrial + 1
    };
    
    setResults(prev => [...prev, result]);
    setCurrentTrial(prev => prev + 1);
    setAccuracy(prev => prev + (responseTime < 500 ? 10 : 5)); // Simple scoring
    
    // Brief rest between trials
    if (currentTrial + 1 < config.trials) {
      setTimeout(() => {
        setReactionTime(null);
      }, config.restBetweenTrials * 1000);
    }
  }, [isStimulus, trialStartTime, currentTrial, config.trials, config.restBetweenTrials]);

  const handleMissedResponse = () => {
    setIsStimulus(false);
    setReactionTime(null);
    
    // Record missed response
    const result: DrillResult = {
      id: `result-${currentTrial + 1}`,
      metric: 'reaction_time',
      value: 2000, // Max time for missed response
      unit: 'ms',
      timestamp: new Date(),
      trial: currentTrial + 1
    };
    
    setResults(prev => [...prev, result]);
    setCurrentTrial(prev => prev + 1);
  };

  const startDrill = () => {
    setPhase('running');
    setSessionStartTime(new Date());
    setCurrentTrial(0);
    setResults([]);
    setAccuracy(0);
    setTimeRemaining(config.duration);
  };

  const pauseDrill = () => {
    setPhase('paused');
  };

  const resumeDrill = () => {
    setPhase('running');
  };

  const stopDrill = () => {
    setPhase('completed');
  };

  const completeDrill = () => {
    const session: DrillSession = {
      id: `session-${Date.now()}`,
      drillId: drill.id,
      athleteId: 'current-athlete', // This would come from context
      startTime: sessionStartTime!,
      endTime: new Date(),
      results,
      status: 'completed'
    };
    
    onComplete(session);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAverageReactionTime = () => {
    if (results.length === 0) return 0;
    const validResults = results.filter(r => r.value < 2000);
    return validResults.reduce((sum, r) => sum + r.value, 0) / validResults.length;
  };

  // Setup Phase
  if (phase === 'setup') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Setup: {drill.name}</h2>
                </div>
                <p className="text-gray-700">{drill.quickPurpose}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Drill Configuration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (seconds)
              </label>
              <input
                type="number"
                value={config.duration}
                onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="60"
                max="1800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Trials
              </label>
              <input
                type="number"
                value={config.trials}
                onChange={(e) => setConfig(prev => ({ ...prev, trials: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="5"
                max="50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rest Between Trials (seconds)
              </label>
              <input
                type="number"
                value={config.restBetweenTrials}
                onChange={(e) => setConfig(prev => ({ ...prev, restBetweenTrials: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
                max="10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={config.difficulty}
                onChange={(e) => setConfig(prev => ({ ...prev, difficulty: e.target.value as any }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.audioEnabled}
                onChange={(e) => setConfig(prev => ({ ...prev, audioEnabled: e.target.checked }))}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Enable Audio Cues</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.visualCues}
                onChange={(e) => setConfig(prev => ({ ...prev, visualCues: e.target.checked }))}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Enable Visual Cues</span>
            </label>
          </div>
        </div>

        {/* Equipment Check */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Equipment Checklist</h3>
          </div>
          
          <div className="space-y-3">
            {drill.equipmentRequired?.map((equipment, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">{equipment}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Ready to Begin</h3>
              <p className="text-gray-600">All equipment checked and configuration set</p>
            </div>
            <button
              onClick={() => setPhase('ready')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-semibold"
            >
              <Play className="w-5 h-5" />
              <span>Start Drill</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Ready Phase
  if (phase === 'ready') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPhase('setup')}
                className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Get Ready: {drill.name}</h2>
                <p className="text-gray-700">Position yourself and prepare for the drill</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-purple-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Ready!</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Position yourself comfortably. When you're ready, click Start to begin the drill. 
            Respond as quickly as possible when you see the stimulus.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{config.trials}</div>
              <div className="text-sm text-gray-600">Trials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{formatTime(config.duration)}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 capitalize">{config.difficulty}</div>
              <div className="text-sm text-gray-600">Difficulty</div>
            </div>
          </div>
          
          <button
            onClick={startDrill}
            className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-3 mx-auto font-semibold text-lg"
          >
            <Play className="w-6 h-6" />
            <span>START DRILL</span>
          </button>
        </div>
      </div>
    );
  }

  // Running/Paused Phase
  if (phase === 'running' || phase === 'paused') {
    return (
      <div className="space-y-6">
        {/* Header with Controls */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">{drill.name}</h2>
                <StatusIndicator
                  status={phase === 'running' ? 'active' : 'warning'}
                  label={phase === 'running' ? 'Running' : 'Paused'}
                  size="sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {phase === 'running' ? (
                <button
                  onClick={pauseDrill}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={resumeDrill}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Resume</span>
                </button>
              )}
              <button
                onClick={stopDrill}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Square className="w-4 h-4" />
                <span>Stop</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <ProgressIndicator
            steps={Array.from({ length: config.trials }, (_, i) => ({
              id: `trial-${i + 1}`,
              label: `Trial ${i + 1}`,
              status: i < currentTrial ? 'completed' : i === currentTrial ? 'current' : 'upcoming'
            }))}
            currentStep={currentTrial}
            showLabels={false}
          />
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Remaining</p>
                <p className="text-2xl font-bold text-gray-900">{formatTime(timeRemaining)}</p>
              </div>
              <Timer className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Trial</p>
                <p className="text-2xl font-bold text-gray-900">{currentTrial + 1}/{config.trials}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Reaction</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reactionTime ? `${reactionTime}ms` : '--'}
                </p>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Score</p>
                <p className="text-2xl font-bold text-gray-900">{accuracy}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Stimulus Area */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="text-center">
            <div 
              className={`w-32 h-32 mx-auto rounded-full border-4 transition-all duration-200 cursor-pointer ${
                isStimulus 
                  ? 'bg-red-500 border-red-600 animate-pulse' 
                  : 'bg-gray-100 border-gray-300'
              }`}
              onClick={handleResponse}
            >
              <div className="w-full h-full flex items-center justify-center">
                {isStimulus ? (
                  <Zap className="w-16 h-16 text-white" />
                ) : (
                  <span className="text-gray-500 text-sm">Ready</span>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isStimulus ? 'TAP NOW!' : phase === 'paused' ? 'Paused' : 'Wait for stimulus...'}
              </p>
              <p className="text-sm text-gray-600">
                {isStimulus ? 'React as quickly as possible' : 'Stay focused and ready to respond'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Completed Phase
  if (phase === 'completed') {
    const avgReactionTime = getAverageReactionTime();
    const successRate = (results.filter(r => r.value < 1000).length / results.length) * 100;
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Drill Complete: {drill.name}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Reaction Time</p>
                <p className="text-2xl font-bold text-gray-900">{avgReactionTime.toFixed(0)}ms</p>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{successRate.toFixed(0)}%</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trials Completed</p>
                <p className="text-2xl font-bold text-gray-900">{results.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.min(...results.map(r => r.value)).toFixed(0)}ms
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trial Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Trial</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Reaction Time</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.id}>
                    <td className="px-4 py-2 text-sm text-gray-900">{result.trial}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{result.value}ms</td>
                    <td className="px-4 py-2">
                      <StatusIndicator
                        status={result.value < 500 ? 'success' : result.value < 1000 ? 'warning' : 'error'}
                        label={result.value < 500 ? 'Excellent' : result.value < 1000 ? 'Good' : 'Slow'}
                        size="sm"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {result.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setPhase('setup');
                setCurrentTrial(0);
                setResults([]);
                setAccuracy(0);
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Drill</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Drills
              </button>
              <button
                onClick={completeDrill}
                className="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-semibold"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save Results</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};