import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TechnicianSignup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone]       = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/technicians/signup', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ name: fullName, email, password, phone })
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ ' + (data.message || 'Technician created'));
        navigate('/');
      } else {
        alert('❌ ' + (data.message || 'Signup failed'));
      }
    } catch (err) {
      alert('Request failed');
      console.error(err);
    }
  };

  const wrap = {maxWidth: 480, margin:'80px auto', padding:'2rem',
                background:'#fff', borderRadius:8, boxShadow:'0 0 10px rgba(0,0,0,0.1)'};

  return (
    <div style={wrap}>
      <h2>New Technician</h2>
      <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
        <input placeholder="Full name" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <input placeholder="Phone (optional)" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        <button type="submit">Create Technician</button>
        <button type="button" onClick={()=>navigate('/signup')} style={{background:'#6c757d'}}>Back</button>
      </form>
    </div>
  );
};

export default TechnicianSignup;
