import React, { useEffect, useState } from 'react';

const TechnicianManager = ({ customerId }) => {
  const [technicians, setTechnicians] = useState([]);
  const [techPicklist, setTechPicklist] = useState([]);
  const [selectedTechId, setSelectedTechId] = useState('');

  useEffect(() => {
    fetch(`/api/customers/${customerId}/technicians`)
      .then(res => res.json())
      .then(setTechnicians)
      .catch(err => console.error('Failed to load technicians:', err));
  }, [customerId]);

  useEffect(() => {
    fetch(`/api/technicians/picklist`)
      .then(res => res.json())
      .then(setTechPicklist)
      .catch(err => console.error('Failed to load tech picklist:', err));
  }, []);

  const userIdToTechnicianId = (userId) => {
    const match = techPicklist.find(p => p.userId === userId);
    return match ? match.technicianId : null;
  };

  const handleRemove = (userId) => {
    const techId = userIdToTechnicianId(userId);
    if (!techId) {
      alert('Unable to resolve technician id for this user.');
      return;
    }
    fetch(`/api/customers/${customerId}/technicians/${techId}`, { method: 'DELETE' })
      .then(() => setTechnicians(prev => prev.filter(t => t.id !== userId)))
      .catch(err => console.error('Failed to remove tech:', err));
  };

  const handleAdd = () => {
    if (!selectedTechId) {
      alert('Select a technician to add.');
      return;
    }
    fetch(`/api/customers/${customerId}/technicians/${selectedTechId}`, { method: 'POST' })
      .then(response => {
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        return fetch(`/api/customers/${customerId}/technicians`);
      })
      .then(res => res.json())
      .then(data => {
        setTechnicians(data);
        setSelectedTechId('');
      })
      .catch(err => {
        console.error('Failed to add tech:', err);
        alert('Failed to add technician. Check the selection and try again.');
      });
  };

  const assignedUserIds = new Set(technicians.map(t => t.id));
  const availableOptions = techPicklist.filter(p => !assignedUserIds.has(p.userId));

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
        <select
          value={selectedTechId}
          onChange={e => setSelectedTechId(e.target.value)}
          style={styles.select}
        >
          <option value="">Select technician…</option>
          {availableOptions.map(p => (
            <option key={p.technicianId} value={p.technicianId}>
              {p.name} — {p.email}
            </option>
          ))}
        </select>
        <button style={styles.addBtn} onClick={handleAdd}>Add Technician</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '30px',
    textAlign: 'left',   // keep inner content left-aligned
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
  select: {
    width: 'auto',
    minWidth: '220px',
  },
  addBtn: {
    padding: '4px 8px',
  },
};

export default TechnicianManager;
