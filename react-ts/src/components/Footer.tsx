
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Bloom<span className="highlight-footer">Express</span></h2>
          <p>Your one-stop destination for discovering the best shops and brands near you.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@bloomexpress.com</p>
          <p>Phone: +1 234 567 8900</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contacts</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BloomExpress. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
