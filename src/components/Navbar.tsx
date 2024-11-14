import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, User, LogIn } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-400" />
            <span className="font-bold text-xl">Secret Math</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/practice" className="hover:text-indigo-300 px-3 py-2 rounded-md text-sm font-medium">
                  Practice
                </Link>
                <Link to="/study" className="hover:text-indigo-300 px-3 py-2 rounded-md text-sm font-medium">
                  Study
                </Link>
                <Link to="/profile" className="hover:text-indigo-300 p-2 rounded-full">
                  <User className="h-6 w-6" />
                </Link>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;