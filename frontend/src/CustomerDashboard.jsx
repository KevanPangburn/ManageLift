import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForkliftForm from './AddForkliftForm';
import TechnicianManager from './TechnicianManager';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [forklifts, setForklifts] = useState([]);
  const [logsByForklift, setLogsByForklift] = useState({});
  const [visibleLogs, setVisibleLogs] = useState({});
  const customerId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    fetch(`/api/forklifts/customer/${customerId}`)
      .then(res => res.json())
      .then(data => setForklifts(data))
      .catch(err => {
        console.error('Failed to load forklifts', err);
        setForklifts([]);
      });
  }, [customerId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleForkliftAdded = newForklift => {
    setForklifts(prev => [...prev, newForklift]);
  };

  const handleRemove = id => {
    fetch(`/api/forklifts/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete forklift');
        setForklifts(prev => prev.filter(f => f.id !== id));
      })
      .catch(err => console.error(err));
  };

  const toggleLogs = forkliftId => {
    const isVisible = visibleLogs[forkliftId];
    setVisibleLogs(prev => ({ ...prev, [forkliftId]: !isVisible }));

    if (!logsByForklift[forkliftId]) {
      fetch(`/api/maintenance/forklift/${forkliftId}`)
        .then(res => res.json())
        .then(data => {
          setLogsByForklift(prev => ({ ...prev, [forkliftId]: data }));
        })
        .catch(err => console.error('Failed to fetch logs:', err));
    }
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {forklifts.map(f => (
                <React.Fragment key={f.id}>
                  <tr>
                    <td>{f.unitId}</td>
                    <td>{f.make}</td>
                    <td>{f.model}</td>
                    <td>{f.serialNumber}</td>
                    <td>
                      <button style={styles.removeButton} onClick={() => handleRemove(f.id)}>Remove</button>{' '}
                      <button style={styles.viewButton} onClick={() => toggleLogs(f.id)}>
                        {visibleLogs[f.id] ? 'Hide Logs' : 'View Logs'}
                      </button>
                    </td>
                  </tr>
                  {visibleLogs[f.id] && logsByForklift[f.id] && (
                    <tr>
                      <td colSpan="5">
                        <ul>
                          {logsByForklift[f.id].length === 0 ? (
                            <li>No logs found.</li>
                          ) : (
                            logsByForklift[f.id].map(log => (
                              <li key={log.id}>
                                {log.description} ({new Date(log.createdAt).toLocaleString()})
                              </li>
                            ))
                          )}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No forklifts found.</p>
        )}
      </div>

      <AddForkliftForm customerId={customerId} onForkliftAdded={handleForkliftAdded} />

      <div style={{ marginTop: '40px' }}>
        <h3>Manage Technicians</h3>
        {/* Center the technician section without changing its internals */}
        <div style={styles.centerWrap}>
          <TechnicianManager customerId={customerId} />
        </div>
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
  centerWrap: {
    display: 'inline-block',
    textAlign: 'left',
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
  removeButton: {
    padding: '6px 12px',
    marginRight: '6px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  viewButton: {
    padding: '6px 12px',
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default CustomerDashboard;
