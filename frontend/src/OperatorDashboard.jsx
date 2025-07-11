import React from 'react';
import { useNavigate } from 'react-router-dom';

const OperatorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>Operator Dashboard</h2>
      <p>Welcome! Complete safety checks or report lift issues.</p>
      <button style={styles.button} onClick={handleLogout}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default OperatorDashboard;
