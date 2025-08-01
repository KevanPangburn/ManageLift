import React, { useEffect, useState } from 'react';

const TechnicianManager = ({ customerId }) => {
  const [technicians, setTechnicians] = useState([]);
  const [newTechId, setNewTechId] = useState('');

  useEffect(() => {
    fetch(`/api/customers/${customerId}/technicians`)
      .then(res => res.json())
      .then(data => setTechnicians(data))
      .catch(err => console.error('Failed to load technicians:', err));
  }, [customerId]);

  const handleRemove = (techId) => {
    fetch(`/api/customers/${customerId}/technicians/${techId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTechnicians(prev => prev.filter(t => t.id !== techId));
      })
      .catch(err => console.error('Failed to remove tech:', err));
  };

  const handleAdd = () => {
    const parsedId = parseInt(newTechId, 10);
    if (isNaN(parsedId)) {
      alert('Please enter a valid technician ID.');
      return;
    }

    fetch(`/api/customers/${customerId}/technicians/${parsedId}`, {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        return fetch(`/api/customers/${customerId}/technicians`);
      })
      .then(res => res.json())
      .then(data => {
        setTechnicians(data);
        setNewTechId('');
      })
      .catch(err => {
        console.error('Failed to add tech:', err);
        alert('Failed to add technician. Check the ID and try again.');
      });
  };

  return (
    <div style={styles.container}>
      <h3>Assigned Technicians</h3>
      {technicians.length === 0 ? (
        <p>No technicians assigned.</p>
      ) : (
        <ul>
          {technicians.map(t => (
            <li key={t.id}>
              {t.name} ({t.email})
              <button style={styles.removeBtn} onClick={() => handleRemove(t.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div style={styles.addContainer}>
        <input
          type="text"
          placeholder="Tech ID to add"
          value={newTechId}
          onChange={e => setNewTechId(e.target.value)}
        />
        <button onClick={handleAdd}>Add Technician</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '30px',
    textAlign: 'left',
  },
  removeBtn: {
    marginLeft: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '4px 8px',
    cursor: 'pointer',
  },
  addContainer: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
};

export default TechnicianManager;
