import React from 'react';

const CustomerDashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Customer Dashboard</h1>
      <p>Welcome Customer! View maintenance logs and reports here.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
};

export default CustomerDashboard;
