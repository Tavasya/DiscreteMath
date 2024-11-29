import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getHomeLink = () => {
    if (!isAuthenticated) return '/';
    return user?.role === 'admin' ? '/admin' : '/dashboard';
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={getHomeLink()} className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-gray-900" />
            <span className="font-bold text-xl text-gray-900">Secret Math</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/practice" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                  Practice
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 p-2 rounded-full">
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;