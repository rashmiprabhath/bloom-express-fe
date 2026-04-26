
import mimosaImg from '../assets/images/mimosa.webp';
import simplytekImg from '../assets/images/simplytek.webp';
import spaceylonImg from '../assets/images/spaceylon.webp';
import dominosImg from '../assets/images/dominos.webp';
import nikeImg from '../assets/images/nike.webp';
import nolimitImg from '../assets/images/nolimit.webp';

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
