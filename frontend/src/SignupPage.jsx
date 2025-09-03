import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const card = {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: '1rem',
    minWidth: 220,
    textAlign: 'center',
    cursor: 'pointer',
    background: '#fff',
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '80px auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <h2>Create an account</h2>
      <p style={{ marginTop: 8, color: '#666' }}>
        Technician, Operator, and Customer User sign-up are enabled right now.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginTop: '1rem',
          justifyContent: 'center',
        }}
      >
        {}
        <div
          style={card}
          onClick={() => navigate('/signup/technician')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && navigate('/signup/technician')
          }
        >
          <h3>New Technician</h3>
          <p>Set up a technician login</p>
        </div>

        {}
        <div
          style={card}
          onClick={() => navigate('/signup/operator')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && navigate('/signup/operator')
          }
        >
          <h3>New Operator</h3>
          <p>Set up an operator login</p>
        </div>

        {}
        <div
          style={card}
          onClick={() => navigate('/signup/customer')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && navigate('/signup/customer')
          }
        >
          <h3>New Customer User</h3>
          <p>Create a login for your company</p>
        </div>
      </div>

      <button onClick={() => navigate('/')} style={{ marginTop: '1rem', width: '100%' }}>
        Back to Login
      </button>
    </div>
  );
};

export default SignupPage;
