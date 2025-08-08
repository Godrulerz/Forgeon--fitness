import React from 'react';
import { 
  FileText, 
  Download, 
  Share2, 
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  Calendar
} from 'lucide-react';

const ReportCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  lastGenerated: string;
  onGenerate: () => void;
}> = ({ title, description, icon, lastGenerated, onGenerate }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Last Generated: {lastGenerated}</p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onGenerate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <FileText className="w-4 h-4" />
          <span>Generate</span>
        </button>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ReportsView: React.FC = () => {
  const handleGenerateReport = (reportType: string) => {
    console.log('Generating report:', reportType);
  };

  const reports = [
    {
      title: 'Individual Assessment Report',
      description: 'Comprehensive athlete profile with normative comparisons',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      lastGenerated: '2 days ago'
    },
    {
      title: 'Module Performance Analysis',
      description: 'Performance metrics across all six assessment modules',
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      lastGenerated: '1 week ago'
    },
    {
      title: 'Equipment Utilization Report',
      description: 'Usage statistics and maintenance schedules',
      icon: <PieChart className="w-6 h-6 text-blue-600" />,
      lastGenerated: '3 days ago'
    },
    {
      title: 'Training Prescription Export',
      description: 'FITT parameters and exercise recommendations',
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      lastGenerated: '5 days ago'
    },
    {
      title: 'Longitudinal Progress Report',
      description: 'Trend analysis and periodization insights',
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      lastGenerated: '1 week ago'
    },
    {
      title: 'Stakeholder Presentation',
      description: 'Executive summary for management and coaches',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      lastGenerated: '2 weeks ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Generate comprehensive assessment reports and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Custom Report
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Report Templates
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900">247</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">32</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Generation Time</p>
              <p className="text-2xl font-bold text-gray-900">2.3min</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">99.8%</p>
            </div>
            <PieChart className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <ReportCard
            key={index}
            title={report.title}
            description={report.description}
            icon={report.icon}
            lastGenerated={report.lastGenerated}
            onGenerate={() => handleGenerateReport(report.title)}
          />
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { name: 'Alex Rodriguez - Q4 Assessment', type: 'Individual Report', date: '2 hours ago', size: '2.4 MB' },
            { name: 'Module 2 Performance Analysis', type: 'Module Report', date: '1 day ago', size: '1.8 MB' },
            { name: 'Equipment Usage - December', type: 'Utilization Report', date: '3 days ago', size: '892 KB' },
            { name: 'Training Prescriptions Batch', type: 'Prescription Export', date: '5 days ago', size: '3.2 MB' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <p className="text-sm text-gray-600">{report.type} • {report.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{report.date}</span>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};