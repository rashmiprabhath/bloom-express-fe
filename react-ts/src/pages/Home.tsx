import { useState, useEffect } from 'react';
import mimosaImg from '../assets/images/mimosa.webp';
import simplytekImg from '../assets/images/simplytek.webp';
import spaceylonImg from '../assets/images/spaceylon.webp';
import dominosImg from '../assets/images/dominos.webp';
import nikeImg from '../assets/images/nike.webp';
import nolimitImg from '../assets/images/nolimit.webp';

interface Category {
  id: number;
  name: String;
}

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  const visibleCategories = categories.slice(0, 4);
  const otherCategories = categories.slice(4);

  return (
    <>
      <div className="action-container">
        <div className="category-container">
          <ul className="main-category">
            <li className="main-category-item"><a href="#all" onClick={(e) => e.preventDefault()}>All</a></li>
            {visibleCategories.map(cat => (
              <li key={cat.id} className="main-category-item">
                <a href={`#${cat.name}`} onClick={(e) => e.preventDefault()}>{cat.name}</a>
              </li>
            ))}
            {otherCategories.length > 0 && (
              <li className="category-dropdown">
                <span className="dropdown-trigger">Other</span>
                <div className="dropdown-content">
                  {otherCategories.map(cat => (
                    <a key={cat.id} href={`#${cat.name}`} onClick={(e) => e.preventDefault()}>{cat.name}</a>
                  ))}
                </div>
              </li>
            )}
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
