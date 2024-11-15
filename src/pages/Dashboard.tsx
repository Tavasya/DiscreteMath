import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, CheckCircle, XCircle, Circle, Lock, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const activityData = [
  { day: 'Mon', score: 85 },
  { day: 'Tue', score: 72 },
  { day: 'Wed', score: 90 },
  { day: 'Thu', score: 88 },
  { day: 'Fri', score: 85 },
  { day: 'Sat', score: 92 },
  { day: 'Sun', score: 88 },
];

const assignments = [
  {
    id: 1,
    title: 'Set Theory Basics',
    dueDate: '2024-03-20',
    time: '10:30 AM',
    status: 'todo',
    score: null
  },
  {
    id: 2,
    title: 'Logic Gates Practice',
    dueDate: '2024-03-21',
    time: '11:45 AM',
    status: 'todo',
    score: null
  },
  {
    id: 3,
    title: 'Graph Theory Introduction',
    dueDate: '2024-03-19',
    time: '09:15 AM',
    status: 'completed',
    score: 85
  },
  {
    id: 4,
    title: 'Probability Concepts',
    dueDate: '2024-03-18',
    time: '02:30 PM',
    status: 'completed',
    score: 92
  }
];

const topicTests = [
  {
    topic: 'Set Theory',
    status: 'locked',
    requiredScore: 80,
    prerequisites: ['Basic Set Operations', 'Venn Diagrams']
  },
  {
    topic: 'Logic',
    status: 'available',
    requiredScore: 80,
    prerequisites: []
  },
  {
    topic: 'Graph Theory',
    status: 'completed',
    score: 92,
    completedDate: '2024-03-15'
  },
  {
    topic: 'Counting & Probability',
    status: 'failed',
    lastAttemptScore: 65,
    requiredScore: 80,
    nextAttemptDate: '2024-03-25'
  }
];

const Dashboard = () => {
  const getTestStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'available':
        return <Brain className="h-5 w-5 text-blue-500" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-gray-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Here's your learning progress</p>
          </div>
          <Link
            to="/practice"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Start Learning
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Daily Assignments */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Daily Assignments</h2>
              </div>
              <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-12 rounded-full ${
                        assignment.status === 'completed' 
                          ? 'bg-green-500' 
                          : 'bg-blue-500'
                      }`} />
                      <div>
                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-500">
                          Due {assignment.dueDate} at {assignment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {assignment.status === 'completed' ? (
                        <span className="text-sm">
                          <span className="font-medium text-gray-900">{assignment.score}</span>
                          <span className="text-gray-500">/100</span>
                        </span>
                      ) : (
                        <Link
                          to="/practice"
                          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
                        >
                          Start
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Tests */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Topic Tests</h2>
                  <p className="text-sm text-gray-500 mt-1">Complete tests to unlock advanced topics</p>
                </div>
              </div>

              <div className="space-y-4">
                {topicTests.map((test, index) => (
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
                            {test.status === 'completed' ? (
                              <span className="text-sm text-gray-500">
                                Completed on {test.completedDate}
                              </span>
                            ) : test.status === 'failed' ? (
                              <span className="text-sm text-gray-500">
                                Next attempt available on {test.nextAttemptDate}
                              </span>
                            ) : test.status === 'locked' ? (
                              <span className="text-sm text-gray-500">
                                Complete prerequisites: {test.prerequisites.join(', ')}
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
                        {test.status === 'completed' ? (
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{test.score}</span>
                            <span className="text-gray-500">/100</span>
                          </div>
                        ) : test.status === 'failed' ? (
                          <div className="text-sm">
                            <span className="font-medium text-red-500">Last attempt: {test.lastAttemptScore}/100</span>
                          </div>
                        ) : null}
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
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Activity Chart */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">My Activity</h2>
                  <p className="text-sm text-gray-500 mt-1">Last 7 days performance</p>
                </div>
                <LineChart className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={activityData}>
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#111827"
                      strokeWidth={2}
                      dot={{ fill: '#111827', strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress Overview</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Set Theory</span>
                    <span className="text-gray-900">80%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gray-900 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Logic</span>
                    <span className="text-gray-900">65%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gray-900 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Graph Theory</span>
                    <span className="text-gray-900">45%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gray-900 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;