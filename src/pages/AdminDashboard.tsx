import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Users, BookOpen, Plus, X, Check, Search, MoreVertical } from 'lucide-react';

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
  { id: 6, name: 'Emily Davis', email: 'emily@example.com', grade: 'B-', progress: 68, status: 'active' },
  { id: 7, name: 'David Miller', email: 'david@example.com', grade: 'A', progress: 88, status: 'active' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', grade: 'C+', progress: 62, status: 'inactive' },
  { id: 9, name: 'James Taylor', email: 'james@example.com', grade: 'B+', progress: 82, status: 'active' },
  { id: 10, name: 'Amy Wilson', email: 'amy@example.com', grade: 'A-', progress: 89, status: 'active' },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

        {/* Performance Chart */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Performance</h2>
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
                  dataKey="students"
                  stroke="#111827"
                  strokeWidth={2}
                  dot={{ fill: '#111827', strokeWidth: 2 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
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
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(student.status)}`}>
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
    </div>
  );
};

export default AdminDashboard;