import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Lock, XCircle, Check } from 'lucide-react';

interface TopicTest {
  topic: string;
  status: string;
  requiredScore: number;
  prerequisites?: string[];
  lastAttemptScore?: number;
  nextAttemptDate?: string;
}

interface TopicTestsProps {
  tests: TopicTest[];
}

const getTestStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <Check className="h-5 w-5 text-green-500" />;
    case 'available':
      return <Brain className="h-5 w-5 text-blue-500" />;
    case 'locked':
      return <Lock className="h-5 w-5 text-gray-500" />;
    case 'failed':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const TopicTests: React.FC<TopicTestsProps> = ({ tests }) => {
  if (tests.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Topic Tests</h2>
          <p className="text-sm text-gray-500 mt-1">Complete tests to unlock advanced topics</p>
        </div>
      </div>

      <div className="space-y-4">
        {tests.map((test, index) => (
          <div 
            key={index}
            className="bg-white p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getTestStatusIcon(test.status)}
                <div>
                  <h3 className="font-medium text-gray-900">{test.topic} Test</h3>
                  <div className="flex items-center gap-4 mt-1">
                    {test.status === 'failed' ? (
                      <span className="text-sm text-gray-500">
                        Next attempt available on {test.nextAttemptDate}
                      </span>
                    ) : test.status === 'locked' ? (
                      <span className="text-sm text-gray-500">
                        Complete prerequisites: {test.prerequisites?.join(', ')}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Required score: {test.requiredScore}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {test.status === 'failed' && (
                  <div className="text-sm">
                    <span className="font-medium text-red-500">Last attempt: {test.lastAttemptScore}/100</span>
                  </div>
                )}
                {(test.status === 'available' || test.status === 'failed') && (
                  <Link
                    to="/practice"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
                  >
                    {test.status === 'failed' ? 'Retry Test' : 'Start Test'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicTests;