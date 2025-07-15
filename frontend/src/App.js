import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; //logged in or not


// pages & compenets
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  const [user, setUser] = useState(null); // track login status

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} /> {}
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AddProduct' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
