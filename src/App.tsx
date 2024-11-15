import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PracticeTest from './pages/PracticeTest';
import Study from './pages/Study';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentProfile from './pages/StudentProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin/student/:studentId" element={isAuthenticated ? <StudentProfile /> : <Navigate to="/login" />} />
          <Route path="/practice" element={isAuthenticated ? <PracticeTest /> : <Navigate to="/login" />} />
          <Route path="/test" element={<Navigate to="/practice" />} />
          <Route path="/study" element={isAuthenticated ? <Study /> : <Navigate to="/login" />} />
          <Route 
            path="/login" 
            element={<Login onLogin={() => setIsAuthenticated(true)} />} 
          />
          <Route 
            path="/signup" 
            element={<Signup onSignup={() => setIsAuthenticated(true)} />} 
          />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;