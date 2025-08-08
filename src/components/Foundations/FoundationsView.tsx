import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Play,
  CheckCircle,
  AlertTriangle,
  FileText,
  Award,
  Brain,
  Target,
  Users,
  Settings,
  Info,
  Activity,
  TrendingUp,
  Shield,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { foundationsModule } from '../../data/foundations';
import { SubModule, Topic, Question } from '../../types/foundations';
import { Breadcrumb } from '../Breadcrumb';
import { ProgressIndicator } from '../ProgressIndicator';
import { StatusIndicator } from '../StatusIndicator';
import { Tooltip } from '../Tooltip';

interface FoundationsViewProps {
  onBack: () => void;
}

const SubModuleCard: React.FC<{
  subModule: SubModule;
  onSelect: () => void;
}> = ({ subModule, onSelect }) => {
  const getSubModuleImage = (id: string) => {
    const images = {
      'sub-1-1': 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      'sub-1-2': 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    return images[id as keyof typeof images] || images['sub-1-1'];
  };

  const getSubModuleGradient = (id: string) => {
    const gradients = {
      'sub-1-1': 'from-blue-500 to-indigo-600',
      'sub-1-2': 'from-green-500 to-teal-600'
    };
    return gradients[id as keyof typeof gradients] || gradients['sub-1-1'];
  };

  const getSubModuleIcon = (id: string) => {
    const icons = {
      'sub-1-1': Brain,
      'sub-1-2': Shield
    };
    const IconComponent = icons[id as keyof typeof icons] || Brain;
    return <IconComponent className="w-6 h-6" />;
  };

  const estimatedTime = subModule.topics.reduce((total, topic) => total + topic.estimatedDuration, 0);
  const totalTopics = subModule.topics.length;
  const hasQuizzes = subModule.topics.some(t => t.quiz);
  const hasPractical = subModule.topics.some(t => t.practicalAssessment);
  const theoryTopics = subModule.topics.filter(t => t.type === 'theory').length;
  const practicalTopics = subModule.topics.filter(t => t.type === 'practical').length;

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      {/* Hero Image Section */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={getSubModuleImage(subModule.id)} 
          alt={subModule.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${getSubModuleGradient(subModule.id)} opacity-80`}></div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {totalTopics} Topics
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-2 text-white">
            {getSubModuleIcon(subModule.id)}
            <div>
              <h3 className="text-lg font-bold leading-tight">{subModule.name}</h3>
              <p className="text-xs opacity-90">{estimatedTime} min total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {subModule.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {theoryTopics > 0 && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              <BookOpen className="w-3 h-3" />
              <span>{theoryTopics} Theory</span>
            </span>
          )}
          {practicalTopics > 0 && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              <Settings className="w-3 h-3" />
              <span>{practicalTopics} Practical</span>
            </span>
          )}
          {hasQuizzes && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              <Brain className="w-3 h-3" />
              <span>Quizzes</span>
            </span>
          )}
          {hasPractical && (
            <span className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
              <Target className="w-3 h-3" />
              <span>Assessments</span>
            </span>
          )}
        </div>

        {/* Topic Preview */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Included Topics</h4>
          <div className="space-y-1">
            {subModule.topics.slice(0, 3).map((topic, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{topic.name}</span>
                <span className="text-gray-500">{topic.estimatedDuration}min</span>
              </div>
            ))}
            {subModule.topics.length > 3 && (
              <div className="text-xs text-blue-600">+{subModule.topics.length - 3} more topics...</div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button className={`w-full px-4 py-3 bg-gradient-to-r ${getSubModuleGradient(subModule.id)} text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold`}>
          <Play className="w-4 h-4" />
          <span>Enter Sub-Module</span>
        </button>
      </div>
    </div>
  );
};

const TopicCard: React.FC<{
  topic: Topic;
  onSelect: () => void;
}> = ({ topic, onSelect }) => {
  const getTopicColor = (type: string) => {
    const colors = {
      theory: 'from-blue-500 to-indigo-600',
      practical: 'from-green-500 to-teal-600'
    };
    return colors[type as keyof typeof colors] || colors.theory;
  };

  const getTopicIcon = (type: string) => {
    const icons = {
      theory: BookOpen,
      practical: Settings
    };
    const IconComponent = icons[type as keyof typeof icons] || BookOpen;
    return <IconComponent className="w-5 h-5" />;
  };

  const getDifficultyLevel = (duration: number) => {
    if (duration <= 15) return { level: 'Quick', color: 'text-green-600', bg: 'bg-green-100' };
    if (duration <= 30) return { level: 'Standard', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Extended', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const difficulty = getDifficultyLevel(topic.estimatedDuration);

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getTopicColor(topic.type)}`}>
            {getTopicIcon(topic.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {topic.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficulty.bg} ${difficulty.color}`}>
              {difficulty.level}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {topic.quiz && <Brain className="w-4 h-4 text-purple-500" />}
          {topic.practicalAssessment && <Target className="w-4 h-4 text-orange-500" />}
          {topic.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{topic.description}</p>

      {/* Topic Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{topic.estimatedDuration} min</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 capitalize">{topic.type}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{topic.content.keyDefinitions.length} concepts</span>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{topic.completed ? 'Completed' : 'Pending'}</span>
        </div>
      </div>

      {/* Key Concepts Preview */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Concepts</h4>
        <div className="flex flex-wrap gap-1">
          {topic.content.keyDefinitions.slice(0, 3).map((def, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {def.term}
            </span>
          ))}
          {topic.content.keyDefinitions.length > 3 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
              +{topic.content.keyDefinitions.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Assessment Indicators */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {topic.quiz && (
            <div className="flex items-center space-x-1 text-xs text-purple-600">
              <Brain className="w-3 h-3" />
              <span>Quiz Available</span>
            </div>
          )}
          {topic.practicalAssessment && (
            <div className="flex items-center space-x-1 text-xs text-orange-600">
              <Target className="w-3 h-3" />
              <span>Practical Assessment</span>
            </div>
          )}
        </div>
        {topic.completed && (
          <div className="flex items-center space-x-1 text-xs text-green-600">
            <CheckCircle className="w-3 h-3" />
            <span>Completed</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button className={`w-full px-4 py-2 bg-gradient-to-r ${getTopicColor(topic.type)} text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium`}>
        <Play className="w-4 h-4" />
        <span>Start Topic</span>
      </button>
    </div>
  );
};
export const FoundationsView: React.FC<FoundationsViewProps> = ({ onBack }) => {
  const [selectedSubModule, setSelectedSubModule] = useState<SubModule | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPractical, setShowPractical] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleSubModuleSelect = (subModule: SubModule) => {
    setSelectedSubModule(subModule);
    setSelectedTopic(null);
    setShowQuiz(false);
    setShowPractical(false);
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setShowQuiz(false);
    setShowPractical(false);
  };

  const handleBackToModule = () => {
    setSelectedSubModule(null);
    setSelectedTopic(null);
    setShowQuiz(false);
    setShowPractical(false);
  };

  const handleBackToSubModule = () => {
    setSelectedTopic(null);
    setShowQuiz(false);
    setShowPractical(false);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
  };

  const handleStartPractical = () => {
    setShowPractical(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedTopic?.quiz && currentQuestionIndex < selectedTopic.quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score and complete quiz
      if (selectedTopic?.quiz) {
        let correct = 0;
        selectedTopic.quiz.questions.forEach((question, index) => {
          if (selectedAnswers[index] === question.correctAnswer) {
            correct++;
          }
        });
        const score = (correct / selectedTopic.quiz.questions.length) * 100;
        setQuizScore(score);
        setQuizCompleted(true);
      }
    }
  };

  const handleMarkComplete = () => {
    // Mark topic as completed
    console.log('Topic marked as complete:', selectedTopic?.id);
    handleBackToSubModule();
  };

  // Quiz View
  if (showQuiz && selectedTopic?.quiz && !quizCompleted) {
    const currentQuestion = selectedTopic.quiz.questions[currentQuestionIndex];
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowQuiz(false)}
                className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Quiz: {selectedTopic.name}</h2>
                </div>
                <p className="text-gray-700">Question {currentQuestionIndex + 1} of {selectedTopic.quiz.questions.length}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / selectedTopic.quiz.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <div className="bg-white px-3 py-1 rounded-full">
                Time Limit: {selectedTopic.quiz.timeLimit || 'No limit'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {currentQuestionIndex + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{currentQuestion.prompt}</h3>
            </div>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={index}
                    checked={selectedAnswers[currentQuestionIndex] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="mr-3 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Points: {currentQuestion.points}
              </div>
              <div className="text-sm text-gray-500">
                Type: {currentQuestion.type.replace('_', ' ')}
              </div>
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex < selectedTopic.quiz.questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Results View
  if (quizCompleted && selectedTopic?.quiz) {
    const passed = quizScore >= selectedTopic.quiz.passingScore;
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuizCompleted(false)}
                className="p-2 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Award className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Quiz Results</h2>
                </div>
                <p className="text-gray-700">{selectedTopic.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <CheckCircle className="w-10 h-10 text-green-600" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-red-600" />
            )}
          </div>
          
          <h3 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {passed ? 'Congratulations!' : 'Try Again'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            You scored {quizScore.toFixed(0)}% ({passed ? 'Passed' : 'Failed'})
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>{quizScore.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Your Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{selectedTopic.quiz.passingScore}%</div>
              <div className="text-sm text-gray-600">Passing Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{selectedTopic.quiz.questions.length}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            {!passed && (
              <button
                onClick={handleStartQuiz}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Retake Quiz
              </button>
            )}
            <button
              onClick={handleBackToSubModule}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Practical Assessment View
  if (showPractical && selectedTopic?.practicalAssessment) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPractical(false)}
                className="p-2 text-orange-600 hover:text-orange-900 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTopic.practicalAssessment.name}</h2>
                </div>
                <p className="text-gray-700">{selectedTopic.practicalAssessment.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-6 h-6 text-orange-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">How to Test: Assessment Steps</h3>
              <p className="text-gray-600">Follow these steps to complete the practical assessment</p>
            </div>
          </div>
          <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-500">
            <h4 className="text-md font-semibold text-orange-900 mb-2 flex items-center">
              <Play className="w-4 h-4 mr-2" />
              Assessment Protocol
            </h4>
            <p className="text-sm text-orange-800 leading-relaxed font-medium">{selectedTopic.practicalAssessment.description}</p>
          </div>
          <div className="space-y-4">
            {selectedTopic.practicalAssessment.steps.map((step) => (
              <div key={step.id} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                  step.criticalPoint ? 'bg-red-500' : 'bg-blue-500'
                }`}>
                  {step.order}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{step.instruction}</h4>
                  <p className="text-sm text-gray-600 mt-1">{step.expectedAction}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">Points: {step.points}</span>
                    {step.criticalPoint && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">Critical Point</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Assessment Information</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Maximum Score:</span>
                <p className="font-medium text-blue-900">{selectedTopic.practicalAssessment.maxScore} points</p>
              </div>
              <div>
                <span className="text-blue-700">Evaluation:</span>
                <p className="font-medium text-blue-900">Qualified Instructor Required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Topic Detail View
  if (selectedTopic) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToSubModule}
                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  {selectedTopic.type === 'theory' ? (
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Settings className="w-6 h-6 text-green-600" />
                  )}
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTopic.name}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full capitalize">
                    {selectedTopic.type}
                  </span>
                </div>
                <p className="text-gray-700">{selectedTopic.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white px-3 py-1 rounded-full flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{selectedTopic.estimatedDuration} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-lg font-bold text-gray-900">{selectedTopic.estimatedDuration} min</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lightbulb className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Key Concepts</p>
                <p className="text-lg font-bold text-gray-900">{selectedTopic.content.keyDefinitions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Quiz</p>
                <p className="text-lg font-bold text-gray-900">{selectedTopic.quiz ? 'Available' : 'None'}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Assessment</p>
                <p className="text-lg font-bold text-gray-900">{selectedTopic.practicalAssessment ? 'Required' : 'None'}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Topic Content */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
          </div>
          <p className="text-gray-700 mb-6">{selectedTopic.content.overview}</p>

          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Key Definitions</h3>
          </div>
          <div className="space-y-4 mb-6">
            {selectedTopic.content.keyDefinitions.map((def, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h4 className="font-medium text-gray-900">{def.term}</h4>
                <p className="text-gray-700 text-sm mt-1">{def.definition}</p>
                {def.example && (
                  <div className="mt-2 p-2 bg-blue-100 rounded text-sm">
                    <span className="font-medium text-blue-800">Example:</span>
                    <span className="text-blue-700 ml-1">{def.example}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedTopic.content.examples && selectedTopic.content.examples.length > 0 && (
            <>
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Practical Examples</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {selectedTopic.content.examples.map((example, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{example}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <button
              onClick={handleMarkComplete}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark as Reviewed</span>
            </button>
            
            <div className="flex items-center space-x-3">
              {selectedTopic.quiz && (
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
                >
                  <Brain className="w-4 h-4" />
                  <span>Take Quiz</span>
                </button>
              )}
              
              {selectedTopic.practicalAssessment && (
                <button
                  onClick={handleStartPractical}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
                >
                  <Target className="w-4 h-4" />
                  <span>Practical Assessment</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sub-Module View
  if (selectedSubModule) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToModule}
                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSubModule.name}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {selectedSubModule.topics.length} Topics
                  </span>
                </div>
                <p className="text-gray-700">{selectedSubModule.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedSubModule.topics.reduce((total, topic) => total + topic.estimatedDuration, 0)} min total</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Lightbulb className="w-4 h-4" />
                    <span>{selectedSubModule.topics.reduce((total, topic) => total + topic.content.keyDefinitions.length, 0)} concepts</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Module Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Topics</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.topics.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.topics.reduce((total, topic) => total + topic.estimatedDuration, 0)} min</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">With Quizzes</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.topics.filter(t => t.quiz).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Assessments</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubModule.topics.filter(t => t.practicalAssessment).length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedSubModule.topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onSelect={() => handleTopicSelect(topic)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Main Module View
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Assessment Modules', onClick: onBack },
          { label: foundationsModule.name, current: true }
        ]}
        onNavigate={(item) => {
          if (item.label === 'Home') {
            onBack();
          }
        }}
      />

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-gray-900">{foundationsModule.name}</h2>
                  <Tooltip content="Essential knowledge base covering exercise physiology principles and testing methodologies" />
                </div>
                <StatusIndicator
                  status="active"
                  label="Module 1"
                  size="sm"
                />
              </div>
              <p className="text-gray-700 text-lg">{foundationsModule.description}</p>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{foundationsModule.subModules.length} Sub-Modules</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>{foundationsModule.subModules.reduce((total, sm) => total + sm.topics.length, 0)} Total Topics</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{foundationsModule.subModules.reduce((total, sm) => total + sm.topics.reduce((topicTotal, topic) => topicTotal + topic.estimatedDuration, 0), 0)} min</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Module Progress</h3>
          <Tooltip content="Track your progress through the foundations module topics and assessments" />
        </div>
        <ProgressIndicator
          steps={[
            { id: 'theory', label: 'Theory', status: 'completed' },
            { id: 'practical', label: 'Practical', status: 'current' },
            { id: 'assessment', label: 'Assessment', status: 'upcoming' },
            { id: 'certification', label: 'Certification', status: 'upcoming' }
          ]}
          currentStep={1}
        />
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Topics</p>
                <Tooltip content="Total number of learning topics in this module" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{foundationsModule.subModules.reduce((total, sm) => total + sm.topics.length, 0)}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <Tooltip content="Number of topics you have successfully completed" />
              </div>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Quizzes</p>
                <Tooltip content="Number of knowledge assessment quizzes available" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{foundationsModule.subModules.reduce((total, sm) => total + sm.topics.filter(t => t.quiz).length, 0)}</p>
            </div>
            <Brain className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <Tooltip content="Overall completion percentage for this module" />
              </div>
              <p className="text-2xl font-bold text-gray-900">25%</p>
            </div>
            <Award className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Sub-Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {foundationsModule.subModules.map((subModule) => (
          <SubModuleCard
            key={subModule.id}
            subModule={subModule}
            onSelect={() => handleSubModuleSelect(subModule)}
          />
        ))}
      </div>
    </div>
  );
};