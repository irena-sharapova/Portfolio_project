import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border border-black shadow p-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/portraits">Portraits</Link>
      <Link to="/landscapes">Landscapes</Link>
      <Link to="/products">Products</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}