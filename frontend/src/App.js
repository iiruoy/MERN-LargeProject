import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & compenets
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Product from './pages/Product';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AddProduct' element={<Product />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
