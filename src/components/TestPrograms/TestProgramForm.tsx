import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  Settings, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Users
} from 'lucide-react';
import { TestProgram, SubTest, EquipmentRequirement, DataPointDefinition } from '../../types/testPrograms';

interface TestProgramFormProps {
  program?: TestProgram;
  onSave: (program: Partial<TestProgram>) => void;
  onCancel: () => void;
}

export const TestProgramForm: React.FC<TestProgramFormProps> = ({
  program,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<TestProgram>>({
    name: program?.name || '',
    moduleId: program?.moduleId || '1',
    category: program?.category || 'practical',
    size: program?.size || 'medium',
    estimatedDuration: program?.estimatedDuration || 30,
    description: program?.description || '',
    objectives: program?.objectives || [''],
    subtests: program?.subtests || [],
    equipment: program?.equipment || [],
    acceptanceCriteria: program?.acceptanceCriteria || {
      protocolCompliance: 90,
      dataQuality: {
        completeness: 95,
        accuracy: 98,
        outlierThreshold: 2
      }
    },
    status: program?.status || 'draft',
    version: program?.version || '1.0'
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'subtests' | 'equipment' | 'criteria'>('basic');

  const updateFormData = (field: keyof TestProgram, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addObjective = () => {
    const objectives = [...(formData.objectives || []), ''];
    updateFormData('objectives', objectives);
  };

  const updateObjective = (index: number, value: string) => {
    const objectives = [...(formData.objectives || [])];
    objectives[index] = value;
    updateFormData('objectives', objectives);
  };

  const removeObjective = (index: number) => {
    const objectives = (formData.objectives || []).filter((_, i) => i !== index);
    updateFormData('objectives', objectives);
  };

  const addSubtest = () => {
    const newSubtest: Partial<SubTest> = {
      id: `subtest-${Date.now()}`,
      name: '',
      description: '',
      order: (formData.subtests?.length || 0) + 1,
      estimatedDuration: 10,
      category: 'measurement',
      required: true,
      instructions: '',
      dataPoints: [],
      equipment: []
    };
    updateFormData('subtests', [...(formData.subtests || []), newSubtest as SubTest]);
  };

  const updateSubtest = (index: number, field: keyof SubTest, value: any) => {
    const subtests = [...(formData.subtests || [])];
    subtests[index] = { ...subtests[index], [field]: value };
    updateFormData('subtests', subtests);
  };

  const removeSubtest = (index: number) => {
    const subtests = (formData.subtests || []).filter((_, i) => i !== index);
    updateFormData('subtests', subtests);
  };

  const addEquipment = () => {
    const newEquipment: EquipmentRequirement = {
      equipmentId: `eq-${Date.now()}`,
      name: '',
      type: '',
      required: true,
      calibrationRequired: false,
      calibrationFrequency: 0,
      accuracy: 100,
      setupInstructions: '',
      operatingRange: { min: 0, max: 100, unit: '' }
    };
    updateFormData('equipment', [...(formData.equipment || []), newEquipment]);
  };

  const updateEquipment = (index: number, field: keyof EquipmentRequirement, value: any) => {
    const equipment = [...(formData.equipment || [])];
    equipment[index] = { ...equipment[index], [field]: value };
    updateFormData('equipment', equipment);
  };

  const removeEquipment = (index: number) => {
    const equipment = (formData.equipment || []).filter((_, i) => i !== index);
    updateFormData('equipment', equipment);
  };

  const handleSave = () => {
    const programData = {
      ...formData,
      lastUpdated: new Date(),
      createdBy: 'current-user' // This would come from auth context
    };
    onSave(programData);
  };

  const modules = [
    { id: '1', name: 'Module 1: Foundations' },
    { id: '2', name: 'Module 2: Health-Related' },
    { id: '3', name: 'Module 3: Skill-Related' },
    { id: '4', name: 'Module 4: Integration' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onCancel}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {program ? 'Edit Test Program' : 'Create New Test Program'}
              </h1>
              <p className="text-gray-600">Define protocols and procedures for assessment execution</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Program</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'basic', label: 'Basic Info', icon: FileText },
              { id: 'subtests', label: 'Subtests', icon: CheckCircle },
              { id: 'equipment', label: 'Equipment', icon: Settings },
              { id: 'criteria', label: 'Criteria', icon: AlertTriangle }
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
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter program name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Module *
                  </label>
                  <select
                    value={formData.moduleId}
                    onChange={(e) => updateFormData('moduleId', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {modules.map(module => (
                      <option key={module.id} value={module.id}>{module.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateFormData('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="theory">Theory</option>
                    <option value="practical">Practical</option>
                    <option value="field">Field</option>
                    <option value="lab">Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size *
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => updateFormData('size', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedDuration}
                    onChange={(e) => updateFormData('estimatedDuration', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => updateFormData('status', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="deprecated">Deprecated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the test program..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Objectives
                  </label>
                  <button
                    onClick={addObjective}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {(formData.objectives || []).map((objective, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => updateObjective(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter objective..."
                      />
                      <button
                        onClick={() => removeObjective(index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Subtests Tab */}
          {activeTab === 'subtests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Test Subtests</h3>
                <button
                  onClick={addSubtest}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Subtest</span>
                </button>
              </div>

              <div className="space-y-4">
                {(formData.subtests || []).map((subtest, index) => (
                  <div key={subtest.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Subtest {index + 1}</h4>
                      <button
                        onClick={() => removeSubtest(index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={subtest.name}
                          onChange={(e) => updateSubtest(index, 'name', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Subtest name..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category *
                        </label>
                        <select
                          value={subtest.category}
                          onChange={(e) => updateSubtest(index, 'category', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="measurement">Measurement</option>
                          <option value="assessment">Assessment</option>
                          <option value="calculation">Calculation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (min) *
                        </label>
                        <input
                          type="number"
                          value={subtest.estimatedDuration}
                          onChange={(e) => updateSubtest(index, 'estimatedDuration', parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={subtest.required}
                            onChange={(e) => updateSubtest(index, 'required', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Required</span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={subtest.description}
                        onChange={(e) => updateSubtest(index, 'description', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder="Describe the subtest..."
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instructions
                      </label>
                      <textarea
                        value={subtest.instructions}
                        onChange={(e) => updateSubtest(index, 'instructions', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Step-by-step testing instructions..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipment Tab */}
          {activeTab === 'equipment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Equipment Requirements</h3>
                <button
                  onClick={addEquipment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Equipment</span>
                </button>
              </div>

              <div className="space-y-4">
                {(formData.equipment || []).map((equipment, index) => (
                  <div key={equipment.equipmentId} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Equipment {index + 1}</h4>
                      <button
                        onClick={() => removeEquipment(index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={equipment.name}
                          onChange={(e) => updateEquipment(index, 'name', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Equipment name..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type *
                        </label>
                        <input
                          type="text"
                          value={equipment.type}
                          onChange={(e) => updateEquipment(index, 'type', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Equipment type..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Accuracy (%) *
                        </label>
                        <input
                          type="number"
                          value={equipment.accuracy}
                          onChange={(e) => updateEquipment(index, 'accuracy', parseFloat(e.target.value))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={equipment.required}
                            onChange={(e) => updateEquipment(index, 'required', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Required</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={equipment.calibrationRequired}
                            onChange={(e) => updateEquipment(index, 'calibrationRequired', e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Calibration Required</span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Setup Instructions
                      </label>
                      <textarea
                        value={equipment.setupInstructions}
                        onChange={(e) => updateEquipment(index, 'setupInstructions', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder="Equipment setup instructions..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Criteria Tab */}
          {activeTab === 'criteria' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Acceptance Criteria</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pass Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={formData.acceptanceCriteria?.passThreshold || ''}
                    onChange={(e) => updateFormData('acceptanceCriteria', {
                      ...formData.acceptanceCriteria,
                      passThreshold: parseFloat(e.target.value)
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Protocol Compliance (%)
                  </label>
                  <input
                    type="number"
                    value={formData.acceptanceCriteria?.protocolCompliance || 90}
                    onChange={(e) => updateFormData('acceptanceCriteria', {
                      ...formData.acceptanceCriteria,
                      protocolCompliance: parseFloat(e.target.value)
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Completeness (%)
                  </label>
                  <input
                    type="number"
                    value={formData.acceptanceCriteria?.dataQuality?.completeness || 95}
                    onChange={(e) => updateFormData('acceptanceCriteria', {
                      ...formData.acceptanceCriteria,
                      dataQuality: {
                        ...formData.acceptanceCriteria?.dataQuality,
                        completeness: parseFloat(e.target.value)
                      }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Accuracy (%)
                  </label>
                  <input
                    type="number"
                    value={formData.acceptanceCriteria?.dataQuality?.accuracy || 98}
                    onChange={(e) => updateFormData('acceptanceCriteria', {
                      ...formData.acceptanceCriteria,
                      dataQuality: {
                        ...formData.acceptanceCriteria?.dataQuality,
                        accuracy: parseFloat(e.target.value)
                      }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};