import React from 'react';
import { useNavigate } from 'react-router-dom';

const TechnicianDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Future: clear auth state or token
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1>Technician Dashboard</h1>
      <p>Welcome! Select a lift to view or perform maintenance.</p>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TechnicianDashboard;
