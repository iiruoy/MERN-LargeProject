// src/pages/Register.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  //Google button – render once
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: '296701968453-40tdsvnu24j0n90qdlohgvk298pkj6nh.apps.googleusercontent.com',
        callback : handleGoogleResponse
      });

      google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        { theme: 'outline', size: 'large', width: 280 }
      );
    }
  }, []);

  /* called by Google */
  async function handleGoogleResponse(resp) {
    try {
      const r = await fetch('http://localhost:5000/api/users/google', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ idToken: resp.credential })
      });
      const data = await r.json();

      if (data.token) {
        login(data.user, data.token);
        navigate('/');
      } else {
        alert(data.message || 'Google login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  }

  /* traditional register */
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const r = await fetch('http://localhost:5000/api/users/register', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(formData)
      });
      const data = await r.json();

      if (r.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  }

  return (
    <div className="register-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={e => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>

      <div style={{ margin: '1rem 0', fontWeight: 600 }}>or</div>
      <div id="google-btn"></div>
    </div>
  );
}

export default Register;

