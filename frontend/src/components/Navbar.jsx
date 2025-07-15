import { Link } from 'react-router-dom'

function Navbar({ user, setUser }) {
  function handleLogout() {
    setUser(null);
  }

  return (
    <nav className='navbar-container'>
        <div className='inner-navbar-container'>
            <div className='logo-navbar'><h3>Node</h3>Mart</div>
        </div>
        <div className='inner-navbar-container'>
            <Link to="/"><div>Home</div></Link>
            <div>About Us</div>
            <div>Contact</div>
            <Link to="/AddProduct"><div>Add Product</div></Link>
        </div>
        <div className='inner-navbar-container'>
        {user ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div className='end-navbar'>Welcome, {user.username}</div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <div className='end-navbar'>Account</div>
          </div>
        )}
        </div>
    </nav>
  )
}

export default Navbar
