import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MagazineSection from './components/MagazineSection';
import Home from './components/Home';
import Orders from './components/Orders';
import AddProduct from './components/AddProduct';
import MyProducts from './components/MyProducts';
import Cart from './components/Cart';
import Settings from './components/Settings';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className={`flex flex-col ${darkMode ? 'dark' : ''}`}>
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-green-800'} min-h-screen`}>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-800'} min-h-screen mx-auto max-w-9xl rounded-lg shadow-lg`}>
            {/* Navbar section */}
            <div className="flex">
              <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}></div>
              <div className="flex-1">
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>
              <div className="w-64"></div>
            </div>
            
            {/* Main content section */}
            <div className="flex flex-1 p-4 gap-6">
              <div className={`rounded-lg  ${darkMode ? 'bg-gray-700' : 'bg-white'} ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
                <Sidebar 
                  sidebarOpen={sidebarOpen} 
                  setSidebarOpen={setSidebarOpen}
                  darkMode={darkMode}  
                />
              </div>
              
              <main className="flex-1 rounded-lg overflow-hidden">
                <div className={`h-full ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-4`}>
                  <Routes>
                    <Route path="/" element={<Home darkMode={darkMode} />} />
                    <Route path="/orders" element={<Orders darkMode={darkMode} />} />
                    <Route path="/add-product" element={<AddProduct darkMode={darkMode} />} />
                    <Route path="/my-products" element={<MyProducts darkMode={darkMode} />} />
                    <Route path="/cart" element={<Cart darkMode={darkMode} />} />
                    <Route path="/settings" element={<Settings darkMode={darkMode} />} />
                  </Routes>
                </div>
              </main>
              
              <div className="w-64 rounded-lg overflow-hidden">
                <MagazineSection darkMode={darkMode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;