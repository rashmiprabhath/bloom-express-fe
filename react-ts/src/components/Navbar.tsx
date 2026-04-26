
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">
          <Link to="/">Bloom<span className="highlight">Express</span></Link>
        </h1>
        <ul className="menu-item-list">
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/home">About</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
