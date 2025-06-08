
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Framework } from '@/data/enhancedMockData';

interface FrameworksStatusProps {
  frameworks: Framework[];
}

const FrameworksStatus: React.FC<FrameworksStatusProps> = ({ frameworks }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Planned':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Implemented') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Frameworks & Standards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworks.map((framework, index) => (
          <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-25 to-white rounded-lg border border-green-100">
            <div className="flex-shrink-0">
              {getStatusIcon(framework.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">{framework.name}</div>
              {framework.score && (
                <div className="text-xs text-gray-500">Score: {framework.score}</div>
              )}
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(framework.status)}`}>
              {framework.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrameworksStatus;
