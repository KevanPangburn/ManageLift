import React from 'react';

const TechnicianDashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Technician Dashboard</h1>
      <p>Welcome! Select a lift to view or perform maintenance.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  }
};

export default TechnicianDashboard;
