import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & compenets
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart'
import Succses from './components/Succses'
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import ListProducts from './components/ListProducts';
import AllProductsPage from './components/AllProductsPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/ListProduct' element={<AllProductsPage />} />
            <Route path='/AddProduct' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Succses />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
