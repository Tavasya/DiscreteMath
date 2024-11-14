import React from 'react';
import { User, Award, Clock, BookOpen } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full">
              <User className="h-12 w-12 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">John Doe</h1>
              <p className="text-indigo-100">john.doe@example.com</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 p-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <Award className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Set Theory</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-emerald-500 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Logic</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-emerald-500 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <Clock className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="text-sm text-gray-600">Completed Set Theory Test</li>
              <li className="text-sm text-gray-600">Practiced Logic Problems</li>
              <li className="text-sm text-gray-600">Studied Graph Theory</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <BookOpen className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Problems Solved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-600">Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Tests Taken</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24h</p>
                <p className="text-sm text-gray-600">Study Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;