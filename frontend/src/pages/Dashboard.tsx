import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Check, Clock, Trophy, Target, LineChart as LucideLineChart, Lock, XCircle } from 'lucide-react';
import CompletedSection from '../components/CompletedSection';
import { activityData, assignments, topicTests, completedItems } from '../data/dashboardData';

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

const Dashboard = () => {
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
            {assignments.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Daily Assignments</h2>
                </div>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between bg-white p-4 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-12 rounded-full bg-blue-500" />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Daily Practice - Due {new Date(assignment.dateDue).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>Topics: {assignment.topics.join(', ')}</span>
                            <span>{assignment.questions} questions</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/practice"
                        className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
                      >
                        Start
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Topic Tests */}
            {topicTests.length > 0 && (
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
                              {test.status === 'failed' ? (
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
            )}

            {/* Completed Items */}
            <CompletedSection items={completedItems} />
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
                <LucideLineChart className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={activityData}>
                    <XAxis dataKey="date" stroke="#9CA3AF" />
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