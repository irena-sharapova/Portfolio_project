import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Overview from './pages/Overview';
import AboutMe from './pages/AboutMe';
import People from './pages/People';
import Nature from './pages/Nature';
import Things from './pages/Things';
import Contact from './pages/Contact';
import Footer from './components/Footer';



function App() {
  return (
    <Router>
      <MyNavbar />
      <div style={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/people" element={<People />} />
        <Route path="/nature" element={<Nature />} />
        <Route path="/things" element={<Things />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
