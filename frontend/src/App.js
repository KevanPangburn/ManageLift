import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import TechnicianDashboard from './TechnicianDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<TechnicianDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
