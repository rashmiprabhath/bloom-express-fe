import { useState, useEffect } from 'react';
import mimosaImg from '../assets/images/mimosa.webp';

interface Category {
  id: number;
  name: string;
}

interface Shop {
  id: number;
  name: string;
  imageUrl: string;
  pageLink: string;
}

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  useEffect(() => {
    const url = selectedCategory 
      ? `/api/shops?categoryId=${selectedCategory.id}` 
      : '/api/shops';
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setShops(data.content || []);
      })
      .catch(err => console.error('Failed to fetch shops:', err));
  }, [selectedCategory]);

  const visibleCategories = categories.slice(0, 4);
  const otherCategories = categories.slice(4);

  const handleCategoryClick = (category: Category | null) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="action-container">
        <div className="category-container">
          <ul className="main-category">
            <li className="main-category-item">
              <a 
                href="#all" 
                className={selectedCategory === null ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleCategoryClick(null); }}
              >
                All
              </a>
            </li>
            {visibleCategories.map(cat => (
              <li key={cat.id} className="main-category-item">
                <a 
                  href={`#${cat.name}`} 
                  className={selectedCategory?.id === cat.id ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleCategoryClick(cat); }}
                >
                  {cat.name}
                </a>
              </li>
            ))}
            {otherCategories.length > 0 && (
              <li className="category-dropdown">
                <span className="dropdown-trigger">Other</span>
                <div className="dropdown-content">
                  {otherCategories.map(cat => (
                    <a 
                      key={cat.id} 
                      href={`#${cat.name}`} 
                      className={selectedCategory?.id === cat.id ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); handleCategoryClick(cat); }}
                    >
                      {cat.name}
                    </a>
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
        <p className="category-title">{selectedCategory ? selectedCategory.name : 'All'}</p>
        <div className="main-grid-container">
          <ul className="shop-list">
            {shops.length > 0 ? (
              shops.map(shop => (
                <li key={shop.id}>
                  <a target="_blank" rel="noopener noreferrer" href={shop.pageLink}>
                    <div className="shop-card">
                      <img 
                        className="shop-image" 
                        src={shop.imageUrl.startsWith('http') ? shop.imageUrl : `/src/assets/images/${shop.imageUrl}`} 
                        alt={shop.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = mimosaImg;
                        }}
                      /> 
                      <p>{shop.name}</p> 
                    </div>
                  </a>
                </li>
              ))
            ) : (
              <p>No shops found in this category.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
