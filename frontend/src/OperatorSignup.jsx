import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OperatorSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    customerId: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/operators/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          customerId: Number(form.customerId)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data?.message || 'Sign up failed.');
      } else {
        setMsg('Operator created!');
        // optional: route somewhere after success
        // navigate('/operator');
      }
    } catch (err) {
      setMsg('Network error.');
    } finally {
      setLoading(false);
    }
  };

  const card = {
    maxWidth: 420,
    margin: '80px auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'left'
  };

  return (
    <div style={card}>
      <h2>New Operator</h2>
      <p style={{ color: '#666' }}>
        Create an operator account associated with a customer.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full name"
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="name@example.com"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label>Customer ID</label>
          <input
            name="customerId"
            type="number"
            value={form.customerId}
            onChange={onChange}
            placeholder="e.g. 2"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create Operator'}
        </button>
      </form>

      {msg && <p style={{ marginTop: '1rem' }}>{msg}</p>}

      <button onClick={() => navigate('/signup')} style={{ marginTop: '1rem', width: '100%' }}>
        Back
      </button>
    </div>
  );
}
