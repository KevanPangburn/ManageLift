import React, { useState } from 'react';

const AddForkliftForm = ({ customerId, onForkliftAdded }) => {
  const [formData, setFormData] = useState({
    unitId: '',
    make: '',
    model: '',
    serialNumber: '',
    hourMeter: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      ...formData,
      customer: { id: customerId }
    };

    fetch('/api/forklifts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add forklift');
        return res.json();
      })
      .then(data => {
        onForkliftAdded(data);
        setFormData({ unitId: '', make: '', model: '', serialNumber: '', hourMeter: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h4 style={{ textAlign: 'center', margin: 0 }}>Add Forklift</h4>
      <input
        name="unitId"
        placeholder="Unit ID"
        value={formData.unitId}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name="make"
        placeholder="Make"
        value={formData.make}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="serialNumber"
        placeholder="Serial Number"
        value={formData.serialNumber}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        name="hourMeter"
        placeholder="Hour Meter"
        value={formData.hourMeter}
        onChange={handleChange}
        style={styles.input}
      />
      <button type="submit" style={styles.submit}>Add Forklift</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px'
  },
  input: {
    width: '240px'
  },
  submit: {
    width: '240px',
    padding: '6px 10px',
    cursor: 'pointer'
  }
};

export default AddForkliftForm;