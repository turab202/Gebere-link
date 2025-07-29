import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';
import AccountCreation from './components/AccountCreation';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import Orders from './components/Orders';
import AddProduct from './components/AddProduct';
import MyProducts from './components/MyProducts';
import Cart from './components/Cart';
import Settings from './components/Settings';
import HomePage from './components/HomePage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (rememberMe) => {
    setIsLoggedIn(true);
    if (rememberMe) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      sessionStorage.setItem('isLoggedIn', 'true');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToCart = (product) => {
    const exists = cart.find(item => item._id === product._id);
    if (exists) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  return (
    <div className={`flex flex-col ${darkMode ? 'dark' : ''}`}>
      <Router>
        {isLoggedIn ? (
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-green-800'} min-h-screen`}>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-800'} min-h-screen mx-auto max-w-9xl rounded-lg shadow-lg`}>
              <div className="flex">
                {!isMobile && (
                  <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}></div>
                )}
                <div className="flex-1">
                  <Navbar 
                    darkMode={darkMode} 
                    setDarkMode={setDarkMode} 
                    onLogout={handleLogout}
                  />
                </div>
              </div>
              
              <div className="flex p-4 gap-6">
                {!isMobile && (
                  <div className={`rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
                    <Sidebar 
                      sidebarOpen={sidebarOpen} 
                      setSidebarOpen={setSidebarOpen}
                      darkMode={darkMode}  
                    />
                  </div>
                )}
                
                <main className={`${isMobile ? 'w-full' : 'flex-1'} rounded-lg overflow-hidden`}>
                  <div className={`h-full ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-4`}>
                    <Routes>
                      <Route path="/home" element={<HomePage darkMode={darkMode} addToCart={addToCart} />} />
                      <Route path="/orders" element={<Orders darkMode={darkMode} />} />
                      <Route path="/add-product" element={<AddProduct darkMode={darkMode} />} />
                      <Route path="/my-products" element={<MyProducts darkMode={darkMode} />} />
                      <Route path="/cart" element={<Cart darkMode={darkMode} cart={cart} setCart={setCart} removeFromCart={removeFromCart} />} />
                      <Route path="/settings" element={<Settings darkMode={darkMode} />} />
                      <Route path="/create-account" element={<AccountCreation darkMode={darkMode} />} />
                      <Route path="*" element={<Navigate to="/home" />} />
                    </Routes>
                  </div>
                </main>
              </div>

              {isMobile && isLoggedIn && (
                <MobileBottomNav darkMode={darkMode} cartCount={cart.length} />
              )}
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage darkMode={darkMode} />} />
            <Route 
              path="/login" 
              element={<AdminLogin darkMode={darkMode} onLogin={handleLogin} />} 
            />
            <Route 
              path="/create-account" 
              element={<AccountCreation darkMode={darkMode} />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;