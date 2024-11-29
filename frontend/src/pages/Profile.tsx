import React from 'react';
import { User, Award, Clock, BookOpen, Target, Trophy, GraduationCap, Brain, CheckCircle, Star } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const activityData = [
  { date: '2024-03-01', score: 85 },
  { date: '2024-03-05', score: 92 },
  { date: '2024-03-10', score: 78 },
  { date: '2024-03-15', score: 88 },
  { date: '2024-03-20', score: 95 },
];

const achievements = [
  { name: 'Perfect Score', count: 3, icon: Star },
  { name: 'Tests Completed', count: 15, icon: CheckCircle },
  { name: 'Study Hours', count: 24, icon: Clock },
  { name: 'Topics Mastered', count: 5, icon: Brain },
];

const topicProgress = [
  { topic: 'Set Theory', progress: 80, mastered: true },
  { topic: 'Logic', progress: 65, mastered: false },
  { topic: 'Graph Theory', progress: 45, mastered: false },
  { topic: 'Proofs', progress: 90, mastered: true },
  { topic: 'Counting', progress: 75, mastered: false },
  { topic: 'Probability', progress: 60, mastered: false },
];

const recentActivity = [
  { type: 'test', name: 'Set Theory Test', score: 95, date: '2024-03-20', time: '45:30' },
  { type: 'practice', name: 'Logic Practice', score: 88, date: '2024-03-19', time: '32:15' },
  { type: 'test', name: 'Graph Theory Test', score: 92, date: '2024-03-18', time: '58:20' },
  { type: 'practice', name: 'Proofs Practice', score: 85, date: '2024-03-17', time: '25:45' },
];

const Profile = () => {
  const overallProgress = Math.round(
    topicProgress.reduce((acc, curr) => acc + curr.progress, 0) / topicProgress.length
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="bg-white p-4 rounded-full">
              <User className="h-12 w-12 text-indigo-600" />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p className="text-indigo-100">john.doe@example.com</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8 mt-8">
            <div>
              <div className="flex items-center gap-2 mb-2 text-indigo-100">
                <Target className="h-5 w-5" />
                <span>Overall Progress</span>
              </div>
              <div className="text-3xl font-bold text-white">{overallProgress}%</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-indigo-100">
                <Trophy className="h-5 w-5" />
                <span>Average Score</span>
              </div>
              <div className="text-3xl font-bold text-white">88%</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-indigo-100">
                <GraduationCap className="h-5 w-5" />
                <span>Tests Completed</span>
              </div>
              <div className="text-3xl font-bold text-white">15</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-indigo-100">
                <Clock className="h-5 w-5" />
                <span>Study Time</span>
              </div>
              <div className="text-3xl font-bold text-white">24h</div>
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
                  <RechartsLineChart data={activityData}>
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
                      stroke="#6366F1"
                      strokeWidth={2}
                      dot={{ fill: '#6366F1', strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-12 rounded-full ${
                        activity.type === 'test' ? 'bg-purple-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{activity.date}</span>
                          <span>Time: {activity.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {activity.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Achievements */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg"
                    >
                      <Icon className="h-6 w-6 text-indigo-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{achievement.count}</div>
                      <div className="text-sm text-gray-600">{achievement.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Topic Progress */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Topic Progress</h2>
              <div className="space-y-6">
                {topicProgress.map((topic, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{topic.topic}</span>
                        {topic.mastered && (
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <span className="text-gray-900">{topic.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          topic.mastered
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        }`}
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;