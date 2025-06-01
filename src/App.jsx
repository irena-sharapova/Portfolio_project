import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';
import Portraits from './pages/Portraits';
import Landscapes from './pages/Landscapes';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <MyNavbar />
      <div style={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portraits" element={<Portraits />} />
        <Route path="/landscapes" element={<Landscapes />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
