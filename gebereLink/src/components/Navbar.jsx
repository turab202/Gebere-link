import { FiSearch, FiBell, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div className={`flex items-center justify-between mt-6 mb-2 p-4 mx-10 border-b ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'} rounded-t-lg rounded-b-lg`}>
      {/* Search bar moved to the left */}
      <div className="flex items-center space-x-4">
        <div className={`relative ${darkMode ? 'bg-gray-600' : 'bg-gray-100'} rounded-lg px-4 py-2`}>
          <FiSearch className={`absolute left-3 top-3 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          <input 
            type="text" 
            placeholder="Search..." 
            className={`pl-8 bg-transparent outline-none w-94 ${darkMode ? 'text-white placeholder-gray-300' : 'text-gray-800 placeholder-gray-500'}`}
          />
        </div>
      </div>
      
      {/* User controls on the right */}
      <div className="flex items-center space-x-4">

        {/* User profile */}
        <div className={`flex items-center space-x-2 p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} cursor-pointer`}>
          <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-300'} flex items-center justify-center`}>
            <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>A</span>
          </div>
          <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Abebe kebede</span>
        </div>

        <button className={`p-3 rounded-full cursor-pointer ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}>
          <FiBell className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        
        {/* Dark mode toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full cursor-pointer ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
        >
          {darkMode ? (
            <FiSun className="text-lg text-yellow-300" />
          ) : (
            <FiMoon className="text-lg text-gray-600" />
          )}
        </button>

      </div>
    </div>
  );
};

export default Navbar;