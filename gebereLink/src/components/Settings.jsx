const Settings = ({ darkMode }) => {
  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Settings</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Account Information Section */}
        <div className={`flex-1 p-4 rounded-lg shadow ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
              <input
                type="text"
                defaultValue="John"
                className={`w-full rounded-lg px-3 py-2 border ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
              <input
                type="text"
                defaultValue="Doe"
                className={`w-full rounded-lg px-3 py-2 border ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                }`}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className={`w-full rounded-lg px-3 py-2 border ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
              }`}
            />
          </div>
          
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
            <input
              type="tel"
              defaultValue="+251912345678"
              className={`w-full rounded-lg px-3 py-2 border ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
              }`}
            />
          </div>
          
          <button className="bg-green-600  cursor-pointer font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Update Profile
          </button>
        </div>
        
        {/* Change Password Section */}
        <div className={`flex-1 p-4 rounded-lg shadow ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Change Password</h3>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
            <input
              type="password"
              className={`w-full rounded-lg px-3 py-2 border ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
              }`}
            />
          </div>
          
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
            <input
              type="password"
              className={`w-full rounded-lg px-3 py-2 border ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
              }`}
            />
          </div>
          
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
            <input
              type="password"
              className={`w-full rounded-lg px-3 py-2 border ${
                darkMode 
                  ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
              }`}
            />
          </div>
          
          <button className="bg-green-600 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;