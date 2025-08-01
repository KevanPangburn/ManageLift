import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [forklifts, setForklifts] = useState([]);
  const customerId = 2; // replace with actual ID from login/session later

  useEffect(() => {
    fetch(`/api/forklifts/customer/${customerId}`)
      .then(res => res.json())
      .then(data => setForklifts(data))
      .catch(err => {
        console.error('Failed to load forklifts', err);
        setForklifts([]); // prevent map error on fetch failure
      });
  }, [customerId]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>Customer Dashboard</h2>
      <p>Welcome! You can view lift status and reports here.</p>

      <div style={styles.listContainer}>
        <h3>Your Forklifts</h3>
        {Array.isArray(forklifts) && forklifts.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Unit ID</th>
                <th>Make</th>
                <th>Model</th>
                <th>Serial #</th>
              </tr>
            </thead>
            <tbody>
              {forklifts.map(f => (
                <tr key={f.id}>
                  <td>{f.unitId}</td>
                  <td>{f.make}</td>
                  <td>{f.model}</td>
                  <td>{f.serialNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No forklifts found.</p>
        )}
      </div>

      <button style={styles.button} onClick={handleLogout}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '40px',
  },
  listContainer: {
    marginTop: '30px',
    display: 'inline-block',
    textAlign: 'left',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  button: {
    marginTop: '40px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CustomerDashboard;
