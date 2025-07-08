import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & compenets
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AddProduct' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
