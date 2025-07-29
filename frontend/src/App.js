import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import TechnicianDashboard from './TechnicianDashboard';
import OperatorDashboard from './OperatorDashboard';
import CustomerDashboard from './CustomerDashboard';
import MaintenanceForm from './MaintenanceForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<TechnicianDashboard />} />
        <Route path="/operator" element={<OperatorDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/maintenance-form/:unitId" element={<MaintenanceForm />} /> {/* Updated */}
      </Routes>
    </Router>
  );
}

export default App;
