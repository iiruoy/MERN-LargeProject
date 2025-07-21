import { Routes, Route } from 'react-router-dom';

import Navbar        from './components/Navbar';
import Home          from './pages/Home';
import Product       from './pages/Product';
import ProductDetail from './components/ProductDetail';
import Cart          from './components/Cart';
import Register      from './pages/Register';
import Login         from './pages/Login';

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="pages">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/AddProduct"  element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart"        element={<Cart />} />
          <Route path="/register"    element={<Register />} />
          <Route path="/login"       element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
