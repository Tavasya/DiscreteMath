import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Users, BookOpen, Plus, X, Check, Search, MoreVertical, Hash, Calendar, Clock, Lock, Unlock } from 'lucide-react';

const performanceData = [
  { date: '2024-03-01', students: 85 },
  { date: '2024-03-05', students: 92 },
  { date: '2024-03-10', students: 78 },
  { date: '2024-03-15', students: 88 },
  { date: '2024-03-20', students: 95 },
];

const mockStudents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', grade: 'A', progress: 85, status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: 'B+', progress: 78, status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', grade: 'A-', progress: 92, status: 'active' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', grade: 'B', progress: 71, status: 'inactive' },
  { id: 5, name: 'Tom Brown', email: 'tom@example.com', grade: 'A+', progress: 95, status: 'active' },
];

const topicTests = [
  {
    topic: 'Set Theory',
    sections: [
      { name: 'Basic Set Operations', isAvailable: true, timeLimit: 45, questions: 20 },
      { name: 'Venn Diagrams', isAvailable: false, timeLimit: 30, questions: 15 },
      { name: 'Set Builder Notation', isAvailable: true, timeLimit: 60, questions: 25 },
    ]
  },
  {
    topic: 'Logic',
    sections: [
      { name: 'Propositional Logic', isAvailable: true, timeLimit: 45, questions: 20 },
      { name: 'Truth Tables', isAvailable: false, timeLimit: 30, questions: 15 },
      { name: 'Karnaugh Maps', isAvailable: true, timeLimit: 60, questions: 25 },
    ]
  }
];

const dailyPractices = [
  {
    id: 1,
    topics: ['Set Theory - Basic Set Operations', 'Logic - Truth Tables'],
    questions: 15,
    dateAssigned: '2024-03-20',
    dateDue: '2024-03-22',
    studentsCompleted: 12,
    totalStudents: 25
  },
  {
    id: 2,
    topics: ['Set Theory - Venn Diagrams'],
    questions: 10,
    dateAssigned: '2024-03-21',
    dateDue: '2024-03-23',
    studentsCompleted: 5,
    totalStudents: 25
  }
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showDailyPracticeModal, setShowDailyPracticeModal] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [dueDate, setDueDate] = useState('');

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleCreateDailyPractice = () => {
    // Here you would typically make an API call to create the daily practice
    console.log({
      topics: selectedTopics,
      questionCount,
      dueDate
    });
    setShowDailyPracticeModal(false);
    setSelectedTopics([]);
    setQuestionCount(10);
    setDueDate('');
  };

  const handleToggleTestAvailability = (topicIndex: number, sectionIndex: number) => {
    // Here you would typically make an API call to update the test availability
    console.log(`Toggling availability for ${topicTests[topicIndex].topic} - ${topicTests[topicIndex].sections[sectionIndex].name}`);
  };

  const handleUpdateTimeLimit = (topicIndex: number, sectionIndex: number, newTime: number) => {
    // Here you would typically make an API call to update the time limit
    console.log(`Updating time limit for ${topicTests[topicIndex].topic} - ${topicTests[topicIndex].sections[sectionIndex].name} to ${newTime} minutes`);
  };

  const handleUpdateQuestions = (topicIndex: number, sectionIndex: number, newCount: number) => {
    // Here you would typically make an API call to update the question count
    console.log(`Updating question count for ${topicTests[topicIndex].topic} - ${topicTests[topicIndex].sections[sectionIndex].name} to ${newCount} questions`);
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage students and monitor progress</p>
          </div>
          <button
            onClick={() => setShowDailyPracticeModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <Plus className="h-5 w-5" />
            Create Daily Practice
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{mockStudents.length}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">B+</p>
              </div>
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockStudents.filter(s => s.status === 'active').length}
                </p>
              </div>
              <Check className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Test Management */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Management</h2>
          <div className="space-y-6">
            {topicTests.map((topic, topicIndex) => (
              <div key={topicIndex} className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{topic.topic}</h3>
                <div className="space-y-4">
                  {topic.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="flex items-center justify-between py-2 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggleTestAvailability(topicIndex, sectionIndex)}
                          className={`p-2 rounded-lg transition-colors ${
                            section.isAvailable
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {section.isAvailable ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                        </button>
                        <span className="font-medium text-gray-900">{section.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Hash className="h-5 w-5 text-gray-400" />
                          <input
                            type="number"
                            value={section.questions}
                            onChange={(e) => handleUpdateQuestions(topicIndex, sectionIndex, parseInt(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-gray-900"
                          />
                          <span className="text-gray-600">questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <input
                            type="number"
                            value={section.timeLimit}
                            onChange={(e) => handleUpdateTimeLimit(topicIndex, sectionIndex, parseInt(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-gray-900"
                          />
                          <span className="text-gray-600">min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Practices */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Daily Practices</h2>
          <div className="space-y-4">
            {dailyPractices.map((practice) => (
              <div
                key={practice.id}
                className="bg-white rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Due {new Date(practice.dateDue).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {practice.topics.map((topic, index) => (
                        <div key={index} className="text-gray-900 font-medium">{topic}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">{practice.questions}</span> questions
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">{practice.studentsCompleted}/{practice.totalStudents}</span> completed
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Students</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-4 text-sm font-medium text-gray-500">Name</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Grade</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Progress</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="py-4">
                      <Link 
                        to={`/admin/student/${student.id}`}
                        className="font-medium text-gray-900 hover:text-gray-700"
                      >
                        {student.name}
                      </Link>
                    </td>
                    <td className="py-4 text-gray-600">{student.email}</td>
                    <td className="py-4 font-medium text-gray-900">{student.grade}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-gray-900 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        student.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <Link 
                        to={`/admin/student/${student.id}`}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Daily Practice Modal */}
      {showDailyPracticeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create Daily Practice</h3>
              <button
                onClick={() => setShowDailyPracticeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Topics
                </label>
                <div className="space-y-2">
                  {topicTests.map((topic) => (
                    <div key={topic.topic}>
                      <div className="font-medium text-gray-900 mb-2">{topic.topic}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {topic.sections.map((section) => (
                          <button
                            key={section.name}
                            onClick={() => handleTopicToggle(`${topic.topic} - ${section.name}`)}
                            className={`p-2 rounded-lg text-sm text-left transition-colors ${
                              selectedTopics.includes(`${topic.topic} - ${section.name}`)
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                            }`}
                          >
                            {section.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                </label>
                <input
                  type="number"
                  min="1"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleCreateDailyPractice}
                disabled={selectedTopics.length === 0 || !dueDate}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Practice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;