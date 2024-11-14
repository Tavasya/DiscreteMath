import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, GraduationCap, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Master <span className="text-indigo-400">Discrete Mathematics</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              An interactive platform designed for college students to practice, test, and study discrete mathematics concepts.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Interactive Practice</h3>
            <p className="text-gray-300 mb-4">
              Practice problems at your own pace with instant feedback and detailed explanations.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Tests</h3>
            <p className="text-gray-300 mb-4">
              Challenge yourself with timed assessments covering multiple topics.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Study Materials</h3>
            <p className="text-gray-300 mb-4">
              Access comprehensive study guides and video lectures.
            </p>
          </div>
        </div>
      </div>

      {/* Topics Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">What You'll Learn</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Set Theory',
            'Logic',
            'Proofs',
            'Algorithms',
            'Graph Theory',
            'Counting & Probability',
          ].map((topic) => (
            <div key={topic} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-750 transition-colors">
              <span className="text-gray-100 font-medium">{topic}</span>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Begin?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students mastering discrete mathematics through interactive learning.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;