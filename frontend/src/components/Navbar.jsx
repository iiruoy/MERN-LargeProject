import { Link } from 'react-router-dom'
import '../css/navbar.css'

function Navbar() {
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
            <div className='end-navbar'>Account</div>
        </div>
    </nav>
  )
}

export default Navbar