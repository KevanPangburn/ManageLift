import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', customerId: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    try {
      const res = await fetch('/api/customer-users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          customerId: Number(form.customerId),
        }),
      });
      const data = await res.json();
      if (!res.ok) setMsg(data?.message ?? 'Sign up failed.');
      else setMsg('Customer user created!');
    } catch (err) {
      console.error(err);
      setMsg('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', background: '#fff', padding: '1.5rem', borderRadius: 8 }}>
      <h2>New Customer User</h2>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required />
        <input name="customerId" placeholder="Customer ID (temporary)" value={form.customerId} onChange={onChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
      </form>
      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      <button onClick={() => navigate('/signup')} style={{ marginTop: 12 }}>Back</button>
    </div>
  );
}
