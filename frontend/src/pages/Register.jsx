import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  /* Google button: initialise & render once */
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: '296701968453-40tdsvnu24j0n90qdlohgvk298pkj6nh.apps.googleusercontent.com',
        callback: (resp) => {
          console.log('Google JWT:', resp.credential);
          // TODO: send resp.credential to backend
          navigate('/');       // temporary success action
        }
      });

      google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        { theme: 'outline', size: 'large', width: 280 }
      );
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful!');
        navigate('/');
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      <div style={{ margin: '1rem 0', fontWeight: 600 }}>or</div>

      {/* Google button mounts here */}
      <div id="google-btn"></div>
    </div>
  );
}

export default Register;

