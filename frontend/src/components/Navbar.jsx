import { Link } from 'react-router-dom'
import '../css/navbar.css'
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className='navbar-container'>
      <div className='inner-navbar-container'>
        <div className='logo-navbar'><h3>Node</h3>Mart</div>
      </div>

      <div className='inner-navbar-container'>
        <Link to="/"><div>Home</div></Link>
        <Link to="/about"><div>About Us</div></Link>
        <Link to="/Contact"><div>Contact Us</div></Link>
        <Link to="/AddProduct"><div>Add Product</div></Link>
        <Link to="/ListProduct"><div>List Prodcut</div></Link>
      </div>

      <div className='inner-navbar-container'>
        {user ? (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="end-navbar">Welcome, {user.username}</div>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <div className="end-navbar">Account</div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
