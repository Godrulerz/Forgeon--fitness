import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Settings, 
  Play,
  FileText,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Copy,
  Trash2
} from 'lucide-react';
import { TestProgram } from '../../types/testPrograms';
import { testPrograms } from '../../data/testPrograms';
import { TestProgramForm } from './TestProgramForm';
import { TestProgramDetail } from './TestProgramDetail';

const TestProgramCard: React.FC<{
  program: TestProgram;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ program, onView, onEdit, onDuplicate, onDelete }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      theory: 'bg-blue-100 text-blue-700',
      practical: 'bg-green-100 text-green-700',
      field: 'bg-orange-100 text-orange-700',
      lab: 'bg-purple-100 text-purple-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getSizeIcon = (size: string) => {
    switch (size) {
      case 'small': return '●';
      case 'medium': return '●●';
      case 'large': return '●●●';
      default: return '●';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(program.category)}`}>
              {program.category}
            </span>
            <span className="text-sm text-gray-500">
              {getSizeIcon(program.size)} {program.size}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{program.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{program.estimatedDuration} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-gray-500" />
              <span>{program.equipment.length} equipment</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span>{program.subtests.length} subtests</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>v{program.version}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${
            program.status === 'active' ? 'bg-green-500' : 
            program.status === 'draft' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Objectives:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {program.objectives.slice(0, 2).map((objective, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>{objective}</span>
            </li>
          ))}
          {program.objectives.length > 2 && (
            <li className="text-blue-600 text-xs">+{program.objectives.length - 2} more...</li>
          )}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onView(program.id)}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button
            onClick={() => onEdit(program.id)}
            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onDuplicate(program.id)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(program.id)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface TestProgramViewProps {
  onExecuteProgram?: (testProgramId: string) => void;
}

export const TestProgramView: React.FC<TestProgramViewProps> = ({ onExecuteProgram }) => {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<TestProgram | undefined>(undefined);
  const [viewingProgram, setViewingProgram] = useState<TestProgram | undefined>(undefined);

  const filteredPrograms = testPrograms.filter(program => {
    const matchesModule = selectedModule === 'all' || program.moduleId === selectedModule;
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesModule && matchesCategory && matchesSearch;
  });

  const handleView = (id: string) => {
    const program = testPrograms.find(tp => tp.id === id);
    setViewingProgram(program);
  };

  const handleEdit = (id: string) => {
    const program = testPrograms.find(tp => tp.id === id);
    setEditingProgram(program);
    setShowForm(true);
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate test program:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete test program:', id);
  };

  const handleCreateNew = () => {
    setEditingProgram(undefined);
    setShowForm(true);
  };

  const handleSaveProgram = (programData: Partial<TestProgram>) => {
    console.log('Save program:', programData);
    // In a real app, this would save to backend
    setShowForm(false);
    setEditingProgram(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProgram(undefined);
  };

  const handleBackFromDetail = () => {
    setViewingProgram(undefined);
  };

  const handleEditFromDetail = () => {
    setEditingProgram(viewingProgram);
    setViewingProgram(undefined);
    setShowForm(true);
  };

  const handleExecuteFromDetail = (programId: string) => {
    if (onExecuteProgram) {
      onExecuteProgram(programId);
    }
  };

  const modules = [
    { id: '1', name: 'Module 1: Foundations' },
    { id: '2', name: 'Module 2: Health-Related' },
    { id: '3', name: 'Module 3: Skill-Related' },
    { id: '4', name: 'Module 4: Integration' },
    { id: '5', name: 'Module 5: Reporting' },
    { id: '6', name: 'Module 6: Capstone' }
  ];

  if (viewingProgram) {
    return (
      <TestProgramDetail
        program={viewingProgram}
        onBack={handleBackFromDetail}
        onEdit={handleEditFromDetail}
        onExecute={handleExecuteFromDetail}
      />
    );
  }

  if (showForm) {
    return (
      <TestProgramForm
        program={editingProgram}
        onSave={handleSaveProgram}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Test Programs</h2>
          <p className="text-gray-600">Detailed test protocols and procedures for each assessment module</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleCreateNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Test Program
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Import Protocol
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Modules</option>
              {modules.map(module => (
                <option key={module.id} value={module.id}>{module.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="theory">Theory</option>
              <option value="practical">Practical</option>
              <option value="field">Field</option>
              <option value="lab">Lab</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search programs..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-gray-900">{testPrograms.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Programs</p>
              <p className="text-2xl font-bold text-gray-900">
                {testPrograms.filter(tp => tp.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(testPrograms.reduce((sum, tp) => sum + tp.estimatedDuration, 0) / testPrograms.length)} min
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft Programs</p>
              <p className="text-2xl font-bold text-gray-900">
                {testPrograms.filter(tp => tp.status === 'draft').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Test Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <TestProgramCard
            key={program.id}
            program={program}
            onView={handleView}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No test programs found</h3>
          <p className="text-gray-600">Try adjusting your filters or create a new test program.</p>
        </div>
      )}
    </div>
  );
};