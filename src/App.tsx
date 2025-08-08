import React, { useState } from 'react';
import { mockUsers } from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ModuleView } from './components/ModuleView';
import { ScheduleView } from './components/ScheduleView';
import { EquipmentView } from './components/EquipmentView';
import { ReportsView } from './components/ReportsView';
import { TestExecution } from './components/TestExecution';
import { TestProgramView } from './components/TestPrograms/TestProgramView';
import { AssessmentManager } from './components/AssessmentWorkflow/AssessmentManager';
import { HealthRelatedFitnessView } from './components/HealthRelatedFitness/HealthRelatedFitnessView';
import { SkillRelatedPerformanceView } from './components/SkillRelatedPerformance/SkillRelatedPerformanceView';
import { IntegratedTestingView } from './components/IntegratedTesting/IntegratedTestingView';
import { FoundationsView } from './components/Foundations/FoundationsView';
import { AnalyticsView } from './components/Analytics/AnalyticsView';
import { AthletesView } from './components/Athletes/AthletesView';
import { MentalNeuralTrainingView } from './components/MentalNeuralTraining/MentalNeuralTrainingView';
import { BiomarkerView } from './components/Biomarker/BiomarkerView';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedModuleForContent, setSelectedModuleForContent] = useState<string | null>(null);
  const [selectedModuleForAssessment, setSelectedModuleForAssessment] = useState<string | null>(null);
  const [selectedTestProgramId, setSelectedTestProgramId] = useState<string | null>(null);
  const currentUser = mockUsers[0]; // Using Dr. Sarah Johnson as default user

  // Handle hash-based routing for Health-Related Fitness
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#foundations') {
        setActiveTab('foundations');
      }
      if (window.location.hash === '#health-related-fitness') {
        setActiveTab('health-related-fitness');
      }
      if (window.location.hash === '#skill-related-performance') {
        setActiveTab('skill-related-performance');
      }
      if (window.location.hash === '#integrated-testing') {
        setActiveTab('integrated-testing');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStartAssessment = (moduleId: string) => {
    setSelectedModuleForAssessment(moduleId);
    setActiveTab('assessment');
  };

  const handleNavigateToModuleContent = (moduleId: string) => {
    setSelectedModuleForContent(moduleId);
    setActiveTab('module-content-view');
  };

  const handleExecuteTestProgram = (testProgramId: string) => {
    setSelectedTestProgramId(testProgramId);
    setActiveTab('assessment');
  };

  const handleBackFromAssessment = () => {
    setSelectedModuleForAssessment(null);
    setSelectedTestProgramId(null);
    setActiveTab('modules');
  };

  const handleBackFromModuleContent = () => {
    setSelectedModuleForContent(null);
    setActiveTab('modules');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'modules':
        return <ModuleView onStartAssessment={handleStartAssessment} onNavigateToModuleContent={handleNavigateToModuleContent} />;
      case 'module-content-view':
        if (selectedModuleForContent === '5') {
          return <MentalNeuralTrainingView onBack={handleBackFromModuleContent} />;
        }
        return <div>Module content not found</div>;
        if (selectedModuleForContent === '5') {
          return <MentalNeuralTrainingView onBack={handleBackFromModuleContent} />;
        }
        return <div>Module content not found</div>;
      case 'schedule':
        return <ScheduleView />;
      case 'equipment':
        return <EquipmentView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'reports':
        return <ReportsView />;
      case 'test-programs':
        return <TestProgramView onExecuteProgram={handleExecuteTestProgram} />;
      case 'assessment':
        return (
          <AssessmentManager 
            moduleId={selectedModuleForAssessment || undefined}
            testProgramId={selectedTestProgramId || undefined}
            onBack={handleBackFromAssessment} 
          />
        );
      case 'foundations':
        return <FoundationsView onBack={() => setActiveTab('modules')} />;
      case 'health-related-fitness':
        return <HealthRelatedFitnessView onBack={() => setActiveTab('modules')} />;
      case 'skill-related-performance':
        return <SkillRelatedPerformanceView onBack={() => setActiveTab('modules')} />;
      case 'integrated-testing':
        return <IntegratedTestingView onBack={() => setActiveTab('modules')} />;
      case 'athletes':
        return <AthletesView />;
      case 'settings':
        return (
          // Placeholder for settings view
          // In a real app, this would be a dedicated component
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
            <p className="text-gray-600">Platform configuration and preferences coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
      case 'biomarkers':
        return <BiomarkerView onBack={() => setActiveTab('modules')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentUser={currentUser} />
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;