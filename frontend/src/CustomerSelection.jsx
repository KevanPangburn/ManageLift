import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    console.log('CustomerSelection mounted, userId =', userId);

    if (!userId) {
      console.warn('No userId found in location.state');
      return;
    }

    fetch(`/api/users/${userId}/customers`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Fetched customers:', data);
        setCustomers(data);
      })
      .catch((err) => console.error('Failed to load customers', err));
  }, [userId]);

  const handleSelect = (customerId) => {
    navigate('/dashboard', { state: { customerId, userId } });
  };

  return (
    <div style={styles.container}>
      <h2>Select a Customer</h2>
      {customers.length === 0 ? (
        <p>No assigned customers found.</p>
      ) : (
        customers.map((c) => (
          <div
            key={c.id}
            onClick={() => handleSelect(c.id)}
            style={styles.customerBox}
          >
            {c.name}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  customerBox: {
    padding: '10px',
    margin: '1rem auto',
    backgroundColor: '#f2f2f2',
    border: '1px solid #ccc',
    borderRadius: '6px',
    maxWidth: '400px',
    cursor: 'pointer',
  },
};

export default CustomerSelection;
