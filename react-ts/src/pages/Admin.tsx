import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Category {
  id: number;
  name: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'shops'>('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCatName, setNewCatName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Shop management states
  const [isAddingShop, setIsAddingShop] = useState(false);
  const [shopForm, setShopForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    description: '',
    pageLink: '',
    address: '',
    country: '',
    imageUrl: '',
    categoryIds: [] as number[],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName }),
      });

      if (res.ok) {
        const saved = await res.json();
        setCategories([...categories, saved]);
        setNewCatName('');
        setIsAdding(false);
        toast.success('Category created successfully!');
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData.message || 'Failed to create category');
      }
    } catch (err) {
      toast.error('Connection error with the server');
    }
  };

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopForm.name || !shopForm.email) {
      toast.error('Name and Email are required');
      return;
    }

    try {
      const res = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shopForm),
      });

      if (res.ok) {
        toast.success('Shop created successfully!');
        setIsAddingShop(false);
        setShopForm({
          name: '',
          email: '',
          phoneNumber: '',
          description: '',
          pageLink: '',
          address: '',
          country: '',
          imageUrl: '',
          categoryIds: [],
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData.message || 'Failed to create shop');
      }
    } catch (err) {
      toast.error('Connection error with the server');
    }
  };

  const handleCategorySelection = (id: number) => {
    setShopForm(prev => {
      const exists = prev.categoryIds.includes(id);
      if (exists) {
        return { ...prev, categoryIds: prev.categoryIds.filter(catId => catId !== id) };
      } else {
        return { ...prev, categoryIds: [...prev.categoryIds, id] };
      }
    });
  };

  return (
    <div className="admin-container">
      <Toaster position="top-right" />
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shops' ? 'active' : ''}`}
          onClick={() => setActiveTab('shops')}
        >
          Shops
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'categories' && (
          <div className="category-mgmt">
            <div className="admin-header">
              <h3>Management categories</h3>
              <button className="btn-primary" onClick={() => setIsAdding(!isAdding)}>
                {isAdding ? 'Cancel' : 'Add Category'}
              </button>
            </div>

            {isAdding && (
              <form className="admin-form" onSubmit={handleCreateCategory}>
                <div className="form-group">
                  <label>Category Name</label>
                  <input 
                    type="text" 
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Enter category name..."
                  />
                </div>
                <button type="submit" className="btn-primary">Create Category</button>
              </form>
            )}

            <div className="admin-list">
              {categories.length > 0 ? (
                categories.map(cat => (
                  <div key={cat.id} className="admin-list-item">
                    <span>{cat.name}</span>
                    <small>ID: {cat.id}</small>
                  </div>
                ))
              ) : (
                <p className="empty-state">No categories found.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'shops' && (
          <div className="shop-mgmt">
            <div className="admin-header">
              <h3>Management shops</h3>
              <button className="btn-primary" onClick={() => setIsAddingShop(!isAddingShop)}>
                {isAddingShop ? 'Cancel' : 'Add Shop'}
              </button>
            </div>

            {isAddingShop && (
              <form className="admin-form" onSubmit={handleCreateShop}>
                <div className="form-group">
                  <label>Shop Name *</label>
                  <input type="text" value={shopForm.name} onChange={e => setShopForm({...shopForm, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" value={shopForm.email} onChange={e => setShopForm({...shopForm, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Logo URL</label>
                  <input type="text" value={shopForm.imageUrl} onChange={e => setShopForm({...shopForm, imageUrl: e.target.value})} placeholder="e.g. mimosa.webp" />
                </div>
                <div className="form-group">
                  <label>Official Site Link</label>
                  <input type="text" value={shopForm.pageLink} onChange={e => setShopForm({...shopForm, pageLink: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label>Categories (Select at least one)</label>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px'}}>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        className={`tab-btn ${shopForm.categoryIds.includes(cat.id) ? 'active' : ''}`}
                        style={{fontSize: '12px', padding: '5px 10px'}}
                        onClick={() => handleCategorySelection(cat.id)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn-primary">Create Shop</button>
              </form>
            )}
            <p className="empty-state">Select "Add Shop" to register a new vendor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
