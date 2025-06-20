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
        <Route path="/operator" element={<h2>Operator Dashboard</h2>} />
        <Route path="/customer" element={<h2>Customer Dashboard</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
