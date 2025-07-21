import { useState, useContext } from 'react';
import { useNavigate }         from 'react-router-dom';
import '../css/Login.css';

import { AuthContext } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const r = await fetch('http://localhost:5000/api/users/login', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(formData)
      });
      const data = await r.json();

      if (r.ok) {
        login(data.user, data.token);     //stores token & user
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

