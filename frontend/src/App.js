import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import TechnicianDashboard from './TechnicianDashboard';
import OperatorDashboard from './OperatorDashboard';
import CustomerDashboard from './CustomerDashboard';
import MaintenanceForm from './MaintenanceForm';
import CustomerSelection from './CustomerSelection';

import SignupPage from './SignupPage';
import TechnicianSignup from './TechnicianSignup';
import OperatorSignup from './OperatorSignup';
import CustomerSignup from './CustomerSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/technician" element={<TechnicianSignup />} />
        <Route path="/signup/operator" element={<OperatorSignup />} />
        <Route path="/signup/customer" element={<CustomerSignup />} /> {}
        <Route path="/select-customer" element={<CustomerSelection />} />
        <Route path="/dashboard" element={<TechnicianDashboard />} />
        <Route path="/operator" element={<OperatorDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/maintenance-form/:unitId" element={<MaintenanceForm />} />
      </Routes>
    </Router>
  );
}

export default App;
