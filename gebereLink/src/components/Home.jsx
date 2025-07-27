import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const products = [
  { id: 1, name: "Teff", category: "Grains", price: 1200, per: "quintal", farmer: "John Doe", image: "/teff.jpg" },
  { id: 2, name: "Wheat", category: "Grains", price: 3500, per: "kg", farmer: "Jane Smith", image: "/wheat.png" },
  { id: 3, name: "Onion", category: "Vegetables", price: 45, per: "kg", farmer: "Mike Johnson", image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Maize", category: "Grains", price: 1100, per: "quintal", farmer: "Sarah Williams", image: "/corn.webp" },
  { id: 5, name: "Tomato", category: "Vegetables", price: 60, per: "kg", farmer: "David Brown", image: "tomato.jpeg" },
  { id: 6, name: "Barley", category: "Grains", price: 1300, per: "quintal", farmer: "Emily Davis", image: "/barley.jpg" },
  { id: 7, name: "Potato", category: "Vegetables", price: 30, per: "kg", farmer: "Robert Wilson", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Sorghum", category: "Grains", price: 1250, per: "quintal", farmer: "Lisa Taylor", image: "/sorghum.jpg" },
  { id: 9, name: "Carrot", category: "Vegetables", price: 50, per: "kg", farmer: "James Anderson", image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
];

const Home = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

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

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
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
            className={`border rounded-lg px-3 py-2 pr-10 appearance-none cursor-pointer ${
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
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Farmer: {product.farmer}</p>
              <div className="flex justify-between items-center mt-2">
                <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>ETB {product.price}/{product.per}</span>
                <button className="bg-green-600 text-white px-3 py-2 cursor-pointer text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;