import React, { useState } from 'react';
import { Save, Plus, Trash2, AlertCircle } from 'lucide-react';
import { DataPoint } from '../../types/dataCollection';

interface ManualDataEntryProps {
  testSessionId: string;
  availableMetrics: string[];
  onSave: (dataPoints: Omit<DataPoint, 'id' | 'timestamp'>[]) => void;
}

interface ManualEntry {
  metric: string;
  value: string;
  unit: string;
  notes: string;
}

export const ManualDataEntry: React.FC<ManualDataEntryProps> = ({
  testSessionId,
  availableMetrics,
  onSave
}) => {
  const [entries, setEntries] = useState<ManualEntry[]>([
    { metric: '', value: '', unit: '', notes: '' }
  ]);
  const [errors, setErrors] = useState<Record<number, string>>({});

  const addEntry = () => {
    setEntries([...entries, { metric: '', value: '', unit: '', notes: '' }]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
    const newErrors = { ...errors };
    delete newErrors[index];
    setErrors(newErrors);
  };

  const updateEntry = (index: number, field: keyof ManualEntry, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);

    // Clear error for this entry
    if (errors[index]) {
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const validateEntries = () => {
    const newErrors: Record<number, string> = {};
    
    entries.forEach((entry, index) => {
      if (!entry.metric) {
        newErrors[index] = 'Metric is required';
      } else if (!entry.value) {
        newErrors[index] = 'Value is required';
      } else if (isNaN(Number(entry.value))) {
        newErrors[index] = 'Value must be a number';
      } else if (!entry.unit) {
        newErrors[index] = 'Unit is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateEntries()) return;

    const dataPoints: Omit<DataPoint, 'id' | 'timestamp'>[] = entries.map(entry => ({
      testSessionId,
      metric: entry.metric,
      value: Number(entry.value),
      unit: entry.unit,
      source: 'manual' as const,
      notes: entry.notes || undefined,
      quality: 'valid' as const
    }));

    onSave(dataPoints);
    setEntries([{ metric: '', value: '', unit: '', notes: '' }]);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Manual Data Entry</h3>
          <p className="text-gray-600">Enter measurements and observations</p>
        </div>
        <button
          onClick={addEntry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Entry</span>
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {entries.map((entry, index) => (
          <div key={index} className={`p-4 border rounded-lg ${errors[index] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metric *
                </label>
                <select
                  value={entry.metric}
                  onChange={(e) => updateEntry(index, 'metric', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select metric...</option>
                  {availableMetrics.map(metric => (
                    <option key={metric} value={metric}>{metric}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value *
                </label>
                <input
                  type="number"
                  step="any"
                  value={entry.value}
                  onChange={(e) => updateEntry(index, 'value', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <input
                  type="text"
                  value={entry.unit}
                  onChange={(e) => updateEntry(index, 'unit', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="kg, cm, sec..."
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => removeEntry(index)}
                  disabled={entries.length === 1}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={entry.notes}
                onChange={(e) => updateEntry(index, 'notes', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Additional observations or comments..."
              />
            </div>

            {errors[index] && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errors[index]}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Data Points</span>
        </button>
      </div>
    </div>
  );
};