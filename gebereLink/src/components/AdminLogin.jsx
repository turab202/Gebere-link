import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ darkMode, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [faydaId, setFaydaId] = useState(''); // New state for Fayda ID
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Updated validation to include Fayda ID
    if (!username.trim() || !password.trim() || !faydaId.trim()) {
      setError('Please enter username, password, and Fayda ID');
      return;
    }

    // Simplified authentication for now - will be replaced with backend later
    if (username && password && faydaId) {  // Check that all fields aren't empty
      onLogin(rememberMe);
      navigate('/create-account');  // Redirect to account creation after login
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-cover bg-center ${darkMode ? 'bg-gray-900' : ''}`}
      style={{ 
        backgroundImage: darkMode 
          ? 'none' 
          : "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
      }}
    >
      <div className={`relative w-full max-w-md px-8 py-12 mx-4 rounded-lg shadow-xl z-10 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex flex-col items-center mb-8">
          <img src="/logo5.png" alt="Logo" className="w-30 h-30 mb-4" />
          <h2 className={`text-4xl font-extrabold ${
              darkMode ? 'text-white' : 'text-green-800'
          }`}>
              Admin Login
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className={`block text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500 focus:border-green-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500 focus:border-green-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label htmlFor="fayda-id" className={`block text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Fayda ID
            </label>
            <input
              id="fayda-id"
              name="fayda-id"
              type="text"
              value={faydaId}
              onChange={(e) => setFaydaId(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500 focus:border-green-500' 
                  : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
              }`}
              placeholder="Enter your Fayda ID"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`h-4 w-4 rounded ${
                  darkMode ? 'text-green-400 focus:ring-green-400 border-gray-500' : 'text-green-600 focus:ring-green-500 border-gray-300'
                }`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className={`font-medium ${
                darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'
              }`}>
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                darkMode ? 'focus:ring-green-500' : 'focus:ring-green-500'
              }`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;