import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white">
      <div className="max-w-md w-full mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <Brain className="h-16 w-16 text-gray-900 mx-auto mb-8" />
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Secret Math
        </h1>
        
        <p className="text-lg text-gray-600 mb-12">
          Master discrete mathematics through interactive learning
        </p>

        <div className="space-y-4">
          <Link
            to="/signup"
            className="block w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </Link>
          
          <Link
            to="/login"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;