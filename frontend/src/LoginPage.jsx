import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const userId = result.id;
      const userRole = result.role;

      if (response.ok && userId && userRole) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('userRole', userRole);

        alert('✅ ' + result.message);
        switch (userRole) {
          case 'Technician':
            navigate('/select-customer', { state: { userId } });
            break;
          case 'Operator':
            navigate('/operator');
            break;
          case 'Customer':
            navigate('/customer');
            break;
          default:
            alert('Unknown role: ' + userRole);
        }
      } else {
        alert('❌ ' + result.message);
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login request failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>ManageLift Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>

        {/* Sign up button */}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          style={{ ...styles.button, backgroundColor: '#6c757d', marginTop: 8 }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  form: { display: 'flex', flexDirection: 'column' },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
};

export default LoginPage;
