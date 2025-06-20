import React from 'react';

const OperatorDashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Operator Dashboard</h1>
      <p>Welcome Operator! Here you can perform safety checks.</p>
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

export default OperatorDashboard;
