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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.append('categoryId', selectedCategory.id.toString());
    if (searchTerm) params.append('searchTerm', searchTerm);
    
    const url = `/api/shops?${params.toString()}`;
    
    const handler = setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setShops(data.content || []);
        })
        .catch(err => console.error('Failed to fetch shops:', err));
    }, 300); // Debounce for 300ms

    return () => clearTimeout(handler);
  }, [selectedCategory, searchTerm]);

  const visibleCategories = categories.slice(0, 4);
  const otherCategories = categories.slice(4);

  const handleCategoryClick = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const handleShopClick = (shopId: number) => {
    fetch(`/api/shops/${shopId}/click`, { method: 'POST' })
      .catch(err => console.error('Failed to log click:', err));
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="category-title">
          {searchTerm ? `Results for "${searchTerm}"` : (selectedCategory ? selectedCategory.name : 'All')}
        </p>
        <div className="main-grid-container">
          <ul className="shop-list">
            {shops.length > 0 ? (
              shops.map(shop => (
                <li key={shop.id}>
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    href={shop.pageLink}
                    onClick={() => handleShopClick(shop.id)}
                  >
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
              <p className="empty-state" style={{gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--muted-text)'}}>
                No shops found matching your criteria.
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
