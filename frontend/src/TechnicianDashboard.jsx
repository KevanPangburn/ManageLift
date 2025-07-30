import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TechnicianDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customerId = location.state?.customerId;

  const [lifts, setLifts] = useState([]);

  useEffect(() => {
    if (!customerId) return;

    fetch(`/api/forklifts`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(lift => lift.customer?.id === customerId);
        setLifts(filtered);
      })
      .catch(err => {
        console.error('Failed to fetch lifts:', err);
      });
  }, [customerId]);

  const handleLiftClick = (lift) => {
    navigate(`/maintenance-form/${lift.unitId}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1>Technician Dashboard</h1>
      <p>Welcome! Select a lift to view or perform maintenance.</p>
      {lifts.map((lift) => (
        <div
          key={lift.id}
          onClick={() => handleLiftClick(lift)}
          style={styles.liftItem}
        >
          {lift.unitId} – {lift.make} {lift.model}
        </div>
      ))}
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
  liftItem: {
    padding: '10px',
    backgroundColor: '#f8f8f8',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '1rem auto',
    maxWidth: '600px',
    cursor: 'pointer',
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
