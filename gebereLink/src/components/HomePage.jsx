import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: "Teff", category: "Grains", price: 1200, per: "quintal", quantity: 15, image: "/teff.jpg" },
  { id: 2, name: "Wheat", category: "Grains", price: 3500, per: "kg", quantity: 42, image: "/wheat.png" },
  { id: 3, name: "Onion", category: "Vegetables", price: 45, per: "kg", quantity: 120, image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Maize", category: "Grains", price: 1100, per: "quintal", quantity: 8, image: "/corn.webp" },
  { id: 5, name: "Tomato", category: "Vegetables", price: 60, per: "kg", quantity: 75, image: "tomato.jpeg" },
  { id: 6, name: "Barley", category: "Grains", price: 1300, per: "quintal", quantity: 22, image: "/barley.jpg" },
  { id: 7, name: "Potato", category: "Vegetables", price: 30, per: "kg", quantity: 200, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Sorghum", category: "Grains", price: 1250, per: "quintal", quantity: 18, image: "/sorghum.jpg" },
  { id: 9, name: "Carrot", category: "Vegetables", price: 50, per: "kg", quantity: 90, image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
];

const HomePage = ({ darkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [addedItems, setAddedItems] = useState([]);
  const navigate = useNavigate();

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
      if (sortOrder === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  const categories = ["All", ...new Set(products.map(product => product.category))];

  const handleAddToCart = (productId) => {
    setAddedItems([...addedItems, productId]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white-100 text-gray-900'}`}>
      <main className="container mx-auto p-4">
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="relative mb-4 md:mb-0">
              <FiSearch className={`absolute left-3 top-3 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search products..."
                className={`pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-white text-gray-900 border-gray-300'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="relative flex items-center">
                <select 
                  className={`border rounded-lg px-3 py-2 pr-10 appearance-none cursor-pointer ${
                    darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-white text-gray-900 border-gray-300'
                  }`}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute right-3 pointer-events-none">
                  <svg 
                    className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select 
                  className={`border rounded-lg px-3 py-2 pr-8 appearance-none cursor-pointer max-w-[120px] sm:max-w-none ${
                    darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-white text-gray-900 border-gray-300'
                  }`}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg 
                    className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'}`}
              >
                <div className={`h-48 ${darkMode ? 'bg-gray-500' : 'bg-gray-100'} flex items-center justify-center overflow-hidden`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/500x300?text=Product+Image";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{product.name}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Available: {product.quantity} {product.per}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>ETB {product.price}/{product.per}</span>
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className={`px-3 py-2 cursor-pointer text-sm font-semibold rounded-lg transition-colors ${
                        addedItems.includes(product.id) 
                          ? 'bg-gray-400 text-gray-800' 
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                      disabled={addedItems.includes(product.id)}
                    >
                      {addedItems.includes(product.id) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;