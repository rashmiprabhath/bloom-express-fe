import './App.css';
import mimosaImg from './assets/images/mimosa.webp';
import simplytekImg from './assets/images/simplytek.webp';
import spaceylonImg from './assets/images/spaceylon.webp';
import dominosImg from './assets/images/dominos.webp';
import nikeImg from './assets/images/nike.webp';
import nolimitImg from './assets/images/nolimit.webp';

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">Bloom<span className="highlight">Express</span></h1>
          <ul className="menu-item-list">
            <li><a href="/shop">Shop</a></li>
            <li><a href="/home">About</a></li>
          </ul>
        </div>
      </nav>

      <div className="action-container">
        <div className="category-container">
          <ul className="main-category">
            <li className="main-category-item"><a href="#all">All</a></li>
            <li className="main-category-item"><a href="#features">Features</a></li>
            <li className="main-category-item"><a href="#men">Men</a></li>
            <li className="main-category-item"><a href="#women">Women</a></li>
            <li className="main-category-item"><a href="#dining">Dining and Restaurant</a></li>
          </ul>
        </div>
        <div className="searchbar-container">
          <input 
            type="text" 
            placeholder="Search for shops, brands and more..." 
            className="searchbar"
          />
        </div>
      </div>

      <div>
        <p className="category-title">Featured</p>
        <div className="main-grid-container">
          <ul className="shop-list">
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://mimosaforever.com/">
                <div className="shop-card">
                  <img className="shop-image" src={mimosaImg} alt="Mimosa"/> 
                  <p>Mimosa</p> 
                </div>
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://www.simplytek.lk/">
                <div className="shop-card">
                  <img className="shop-image" src={simplytekImg} alt="SimplyTek" />
                  <p>SimplyTek</p>
                </div>
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://lk.spaceylon.com/">
                <div className="shop-card">
                  <img className="shop-image" src={spaceylonImg} alt="Spaceylon" />
                  <p>Spaceylon</p>
                </div>
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://m.dominoslk.com/">
                <div className="shop-card">
                  <img className="shop-image" src={dominosImg} alt="Dominos" />
                  <p>Dominos</p>
                </div>
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://www.nike.com/lk/">
                <div className="shop-card">
                  <img className="shop-image" src={nikeImg} alt="Nike" />
                  <p>Nike</p>
                </div>
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://www.nolimit.com/">
                <div className="shop-card">
                  <img className="shop-image" src={nolimitImg} alt="Nolimit" />
                  <p>Nolimit</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

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
              <li><a href="/home">About Us</a></li>
              <li><a href="/contact">Contacts</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BloomExpress. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
