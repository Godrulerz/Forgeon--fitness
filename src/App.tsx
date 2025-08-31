import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Dumbbell, Trophy, Target, Sun, Moon } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ModuleView } from './components/ModuleView';
import { ScheduleView } from './components/ScheduleView';
import { EquipmentView } from './components/EquipmentView';
import { ReportsView } from './components/ReportsView';
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

type Theme = 'light' | 'dark';

// ------------------ Authentication Component ------------------ //
const AuthenticationView = ({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) => {
  const { signIn, signUp, loading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userRole, setUserRole] = useState<'athlete' | 'coach'>('athlete');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);

    const email = formDataObj.get('email') as string;
    const fullName = formDataObj.get('fullName') as string;
    const password = passwordValue;
    const confirmPassword = confirmPasswordValue;
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (authMode === 'signup') {
      if (!fullName || fullName.trim().length < 2) {
        setError('Please enter your full name');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    
    const handleAuth = async () => {
      console.log('🚀 Starting authentication:', { authMode, email, userRole });
      try {
        if (authMode === 'login') {
          console.log('🔐 Attempting login...');
          await signIn(email, password);
        } else {
          console.log('📝 Attempting signup...');
          await signUp({ email, password, fullName, role: userRole });
        }
      } catch (err) {
        console.error('❌ Authentication error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    handleAuth();
  };

  // ------------------ Input Field ------------------ //
  const InputField = ({ 
    icon: Icon, 
    type, 
    placeholder, 
    name,
    value, 
    onChange, 
    defaultValue = '',
    showToggle, 
    onToggle,
  }: {
    icon: any;
    type: string;
    placeholder: string;
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    defaultValue?: string;
    showToggle?: boolean;
    onToggle?: () => void;
  }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        {...(value !== undefined
          ? {
              value,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value),
              onBlur: (e: React.FocusEvent<HTMLInputElement>) => onChange && onChange(e.target.value),
            }
          : {
              defaultValue,
            })}
        className={`w-full pl-12 pr-12 py-4 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
          theme === 'light' 
            ? 'bg-white border border-gray-200 text-gray-800 placeholder-gray-400' 
            : 'bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400'
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          {type === 'password' ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );

  // ------------------ Render ------------------ //
  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-white to-orange-50' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4">
                <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              ForgeOn
            </h1>
            <p className={`text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Elite Performance Platform
            </p>
        </div>

          {/* Auth Card */}
          <div className={`rounded-2xl shadow-2xl border ${
            theme === 'light' 
              ? 'bg-white border-gray-200' 
              : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="p-8">
            {/* Auth Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
              <button
                  type="button"
                onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  authMode === 'login'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Sign In
              </button>
              <button
                  type="button"
                onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  authMode === 'signup'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <InputField
                    icon={User}
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    defaultValue=""
                  />
                )}

                <InputField
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  defaultValue=""
                />

                <InputField
                  icon={Lock}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={passwordValue}
                  onChange={setPasswordValue}
                  showToggle={true}
                  onToggle={() => setShowPassword(!showPassword)}
                />

                {authMode === 'signup' && (
                  <>
                  <InputField
                    icon={Lock}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPasswordValue}
                      onChange={setConfirmPasswordValue}
                    showToggle={true}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />

                    {/* Role Selection */}
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`}>
                        I am a:
                      </label>
                      <div className="flex space-x-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="role"
                            value="athlete"
                            checked={userRole === 'athlete'}
                            onChange={(e) => setUserRole(e.target.value as 'athlete' | 'coach')}
                            className="sr-only"
                          />
                          <div className={`flex items-center px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            userRole === 'athlete'
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}>
                            <User className={`h-4 w-4 mr-2 ${
                              userRole === 'athlete' ? 'text-orange-500' : 'text-gray-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              userRole === 'athlete' 
                                ? 'text-orange-700 dark:text-orange-300' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              Athlete
                            </span>
                          </div>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="role"
                            value="coach"
                            checked={userRole === 'coach'}
                            onChange={(e) => setUserRole(e.target.value as 'athlete' | 'coach')}
                            className="sr-only"
                          />
                          <div className={`flex items-center px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            userRole === 'coach'
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}>
                            <Trophy className={`h-4 w-4 mr-2 ${
                              userRole === 'coach' ? 'text-orange-500' : 'text-gray-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              userRole === 'coach' 
                                ? 'text-orange-700 dark:text-orange-300' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              Coach
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-500/30 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Theme Toggle */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === 'light' 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </button>
              </div>
              </div>
            </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className={`text-xs ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              © 2024 ForgeOn. Elite performance tracking and analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------ Main App Component ------------------ //
function App() {
  const { user, loading, signOut, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<Theme>('light');
  const [selectedModuleForContent, setSelectedModuleForContent] = useState<string | null>(null);
  const [selectedModuleForAssessment, setSelectedModuleForAssessment] = useState<string | null>(null);
  const [selectedTestProgramId, setSelectedTestProgramId] = useState<string | null>(null);

  // ✅ Navigate to dashboard after successful authentication
  React.useEffect(() => {
    if (isAuthenticated && user) {
      console.log('🚀 Navigating to dashboard after login');
      setActiveTab('dashboard');
    }
  }, [isAuthenticated, user]);

  // Handle hash-based routing
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#foundations') setActiveTab('foundations');
      if (window.location.hash === '#health-related-fitness') setActiveTab('health-related-fitness');
      if (window.location.hash === '#skill-related-performance') setActiveTab('skill-related-performance');
      if (window.location.hash === '#integrated-testing') setActiveTab('integrated-testing');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogout = () => {
    signOut();
    setActiveTab('dashboard');
  };

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // ------------------ Renderers ------------------ //
  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole={user?.role || 'athlete'} theme={theme} />;
      case 'modules':
        return (
          <ModuleView
            onStartAssessment={(id) => {
              setSelectedModuleForAssessment(id);
              setActiveTab('assessment');
            }}
            onNavigateToModuleContent={(id) => {
              setSelectedModuleForContent(id);
              setActiveTab('module-content-view');
            }}
          />
        );
      case 'module-content-view':
        if (selectedModuleForContent === '5') {
          return <MentalNeuralTrainingView onBack={() => setActiveTab('modules')} />;
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
        return <TestProgramView onExecuteProgram={(id) => {
          setSelectedTestProgramId(id);
          setActiveTab('assessment');
        }} />;
      case 'assessment':
        return (
          <AssessmentManager
            moduleId={selectedModuleForAssessment || undefined}
            testProgramId={selectedTestProgramId || undefined}
            onBack={() => {
              setSelectedModuleForAssessment(null);
              setSelectedTestProgramId(null);
              setActiveTab('modules');
            }}
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
      case 'biomarkers':
        return <BiomarkerView onBack={() => setActiveTab('modules')} />;
      case 'settings':
        return (
          <div className={`rounded-xl shadow-sm border p-6 ${
            theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              System Settings
            </h2>
            <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
              Platform configuration and preferences coming soon...
            </p>
          </div>
        );
      default:
        return <Dashboard userRole={user?.role || 'athlete'} theme={theme} />;
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
            Loading ForgeOn Platform...
          </p>
        </div>
      </div>
    );
  }

  // Debug authentication state
  console.log('🔍 App render - Auth state:', { isAuthenticated, user, loading });
  
  if (!isAuthenticated || !user) {
    console.log('🔒 Rendering authentication view');
    return <AuthenticationView theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <Header 
        currentUser={{
          id: user.id,
          name: user.full_name,
          email: user.email,
          role: user.role,
          avatar: user.avatar_url,
        }}
      />
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">{renderDashboardContent()}</main>
      </div>
    </div>
  );
}

export default App;
