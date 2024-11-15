import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { date: '2024-03-01', score: 85 },
  { date: '2024-03-05', score: 92 },
  { date: '2024-03-10', score: 78 },
  { date: '2024-03-15', score: 88 },
  { date: '2024-03-20', score: 95 },
];

const assignments = [
  {
    id: 1,
    title: 'Set Theory Basics',
    type: 'homework',
    status: 'completed',
    grade: 92,
    timeSpent: '45:30',
    dueDate: '2024-03-15',
    submittedDate: '2024-03-14',
  },
  {
    id: 2,
    title: 'Logic Gates Practice',
    type: 'homework',
    status: 'completed',
    grade: 88,
    timeSpent: '32:15',
    dueDate: '2024-03-18',
    submittedDate: '2024-03-17',
  },
  {
    id: 3,
    title: 'Graph Theory Test',
    type: 'test',
    status: 'completed',
    grade: 95,
    timeSpent: '58:20',
    dueDate: '2024-03-20',
    submittedDate: '2024-03-20',
  },
  {
    id: 4,
    title: 'Probability Concepts',
    type: 'homework',
    status: 'pending',
    dueDate: '2024-03-25',
  },
  {
    id: 5,
    title: 'Algorithm Analysis',
    type: 'homework',
    status: 'overdue',
    dueDate: '2024-03-19',
  }
];

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch student data based on studentId
  const student = {
    id: studentId,
    name: 'John Doe',
    email: 'john@example.com',
    grade: 'A',
    progress: 85,
    status: 'active',
    averageTime: '42:15',
    completionRate: 92,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Overall Grade</h3>
            <p className="text-3xl font-bold text-gray-900">{student.grade}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Progress</h3>
            <p className="text-3xl font-bold text-gray-900">{student.progress}%</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Average Time per Assignment</h3>
            <p className="text-3xl font-bold text-gray-900">{student.averageTime}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-gray-900">{student.completionRate}%</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance History</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={performanceData}>
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                />
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

        {/* Assignments List */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Assignments</h2>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(assignment.status)}
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        assignment.type === 'test' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {assignment.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      {assignment.status === 'completed' && (
                        <>
                          <span className="text-sm text-gray-600">
                            Submitted: {new Date(assignment.submittedDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{assignment.timeSpent}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                  {assignment.status === 'completed' && (
                    <div className="text-lg font-semibold text-gray-900">
                      {assignment.grade}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;