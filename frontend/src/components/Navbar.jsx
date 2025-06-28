import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar-container'>
        <div className='inner-navbar-container'>
            <div className='logo-navbar'><h3>Node</h3>Mart</div>
        </div>
        <div className='inner-navbar-container'>
            <div>Home</div>
            <div>About Us</div>
            <div>Contact</div>
            <div>Add Product</div>
        </div>
        <div className='inner-navbar-container'>
            <div className='end-navbar'>Account</div>
        </div>
    </nav>
  )
}

export default Navbar