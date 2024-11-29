import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertTriangle, Brain, Lock, Trophy, Target, BookOpen, GraduationCap } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { date: '2024-03-01', score: 85 },
  { date: '2024-03-05', score: 92 },
  { date: '2024-03-10', score: 78 },
  { date: '2024-03-15', score: 88 },
  { date: '2024-03-20', score: 95 },
];

const studentTests = [
  {
    topic: 'Set Theory',
    sections: [
      {
        name: 'Basic Set Operations',
        status: 'completed',
        score: 95,
        completedDate: '2024-03-15',
        timeSpent: '45:30',
        correctAnswers: 19,
        totalQuestions: 20
      },
      {
        name: 'Venn Diagrams',
        status: 'completed',
        score: 88,
        completedDate: '2024-03-18',
        timeSpent: '38:15',
        correctAnswers: 22,
        totalQuestions: 25
      },
      {
        name: 'Set Builder Notation',
        status: 'pending',
        dueDate: '2024-03-25'
      }
    ]
  },
  {
    topic: 'Logic',
    sections: [
      {
        name: 'Propositional Logic',
        status: 'completed',
        score: 100,
        completedDate: '2024-03-10',
        timeSpent: '42:00',
        correctAnswers: 15,
        totalQuestions: 15
      },
      {
        name: 'Truth Tables',
        status: 'failed',
        score: 65,
        completedDate: '2024-03-12',
        timeSpent: '35:45',
        correctAnswers: 13,
        totalQuestions: 20
      }
    ]
  }
];

const assignments = [
  {
    id: 1,
    title: 'Daily Practice - March 15',
    status: 'completed',
    dueDate: '2024-03-15',
    submittedDate: '2024-03-15',
    timeSpent: '45:30',
    completedProblems: 20,
    totalProblems: 20
  },
  {
    id: 2,
    title: 'Daily Practice - March 20',
    status: 'pending',
    dueDate: '2024-03-20',
    completedProblems: 5,
    totalProblems: 15
  }
];

const student = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  overallProgress: 78,
  totalCompletedTests: 15,
  averageScore: 88,
  studyTime: '24h'
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
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
    case 'failed':
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return null;
  }
};

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

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

        {/* Progress Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 mb-8">
          <div className="grid grid-cols-4 gap-8">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5" />
                <span className="text-sm opacity-90">Overall Progress</span>
              </div>
              <div className="text-3xl font-bold">{student.overallProgress}%</div>
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm opacity-90">Tests Completed</span>
              </div>
              <div className="text-3xl font-bold">{student.totalCompletedTests}</div>
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5" />
                <span className="text-sm opacity-90">Average Score</span>
              </div>
              <div className="text-3xl font-bold">{student.averageScore}%</div>
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm opacity-90">Total Study Time</span>
              </div>
              <div className="text-3xl font-bold">{student.studyTime}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Performance Chart */}
            <div className="bg-gray-50 rounded-xl p-6">
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

            {/* Topic Tests */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Topic Tests</h2>
              <div className="space-y-6">
                {studentTests.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{topic.topic}</h3>
                    <div className="space-y-4">
                      {topic.sections.map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-center gap-4">
                            {getStatusIcon(section.status)}
                            <div>
                              <h4 className="font-medium text-gray-900">{section.name}</h4>
                              {section.status === 'completed' && (
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                  <span>Score: {section.score}%</span>
                                  <span>Time: {section.timeSpent}</span>
                                  <span>
                                    {section.correctAnswers}/{section.totalQuestions} correct
                                  </span>
                                </div>
                              )}
                              {section.status === 'pending' && (
                                <p className="mt-1 text-sm text-gray-500">
                                  Due: {section.dueDate}
                                </p>
                              )}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(section.status)}`}>
                            {section.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Assignments */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Daily Assignments</h2>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(assignment.status)}
                      <div>
                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>Due: {assignment.dueDate}</span>
                          {assignment.status === 'completed' && (
                            <>
                              <span>Submitted: {assignment.submittedDate}</span>
                              <span>Time: {assignment.timeSpent}</span>
                            </>
                          )}
                          <span>
                            {assignment.completedProblems}/{assignment.totalProblems} completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Topic Progress */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="h-5 w-5 text-gray-900" />
                <h2 className="text-xl font-semibold text-gray-900">Topic Progress</h2>
              </div>
              <div className="space-y-6">
                {studentTests.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-900">{topic.topic}</span>
                      <span className="text-gray-600">
                        {topic.sections.filter(s => s.status === 'completed').length}/
                        {topic.sections.length} completed
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{
                          width: `${(topic.sections.filter(s => s.status === 'completed').length / topic.sections.length) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="h-5 w-5 text-gray-900" />
                <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Perfect Scores</span>
                  <span className="font-medium text-gray-900">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tests Completed</span>
                  <span className="font-medium text-gray-900">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Practice Sessions</span>
                  <span className="font-medium text-gray-900">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Study Streak</span>
                  <span className="font-medium text-gray-900">7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;