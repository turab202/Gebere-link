import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaUsers, FaUserTie } from 'react-icons/fa';

const Settings = ({ darkMode, userData, setUserData }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    farmingPractice: userData?.farmingPractice || '',
    description: userData?.description || ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        farmingPractice: userData.farmingPractice || '',
        description: userData.description || ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...userData,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      farmingPractice: formData.farmingPractice,
      description: formData.description
    };
    setUserData(updatedUser);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert('Password changed successfully!');
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className={`p-4 sm:p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Settings
      </h2>
      
      {/* Navigation Tabs - Made responsive */}
      <div className="flex overflow-x-auto pb-2 mb-4 sm:mb-6 border-b scrollbar-hide">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 text-sm sm:text-base sm:px-4 font-medium flex items-center whitespace-nowrap ${activeTab === 'profile' ? 
              darkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600' : 
              darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <FaUser className="mr-1 sm:mr-2" /> <span className="text-xs sm:text-sm">Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-3 py-2 text-sm sm:text-base sm:px-4 font-medium flex items-center whitespace-nowrap ${activeTab === 'password' ? 
              darkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600' : 
              darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <FaEye className="mr-1 sm:mr-2" /> <span className="text-xs sm:text-sm">Password</span>
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`px-3 py-2 text-sm sm:text-base sm:px-4 font-medium flex items-center whitespace-nowrap ${activeTab === 'farmers' ? 
              darkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600' : 
              darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <FaUserTie className="mr-1 sm:mr-2" /> <span className="text-xs sm:text-sm">Farmers</span>
          </button>
          <button
            onClick={() => setActiveTab('consumers')}
            className={`px-3 py-2 text-sm sm:text-base sm:px-4 font-medium flex items-center whitespace-nowrap ${activeTab === 'consumers' ? 
              darkMode ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600' : 
              darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <FaUsers className="mr-1 sm:mr-2" /> <span className="text-xs sm:text-sm">Consumers</span>
          </button>
        </div>
      </div>
      
      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className={`p-3 sm:p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-md sm:text-lg font-medium mb-3 sm:mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Account Information
          </h3>
          
          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
              </div>
            </div>
            
            <div className="mb-3 sm:mb-4">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                }`}
              />
            </div>
            
            <div className="mb-3 sm:mb-4">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                }`}
              />
            </div>

            {userData?.role === 'farmer' && (
              <>
                <div className="mb-3 sm:mb-4">
                  <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Farming Practice
                  </label>
                  <input
                    type="text"
                    name="farmingPractice"
                    value={formData.farmingPractice}
                    onChange={handleChange}
                    className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                        : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                    }`}
                  />
                </div>

                <div className="mb-4 sm:mb-6">
                  <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                        : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                    }`}
                  ></textarea>
                </div>
              </>
            )}
            
            <button 
              type="submit"
              className="w-full sm:w-auto bg-green-600 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm sm:text-base"
            >
              Update Profile
            </button>
          </form>
        </div>
      )}
      
      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className={`p-3 sm:p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-md sm:text-lg font-medium mb-3 sm:mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Change Password
          </h3>
          
          <form onSubmit={handlePasswordChange}>
            <div className="mb-3 sm:mb-4">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            
            <div className="mb-3 sm:mb-4">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg px-3 py-2 text-sm sm:text-base border ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full sm:w-auto bg-green-600 cursor-pointer font-semibold text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm sm:text-base"
            >
              Change Password
            </button>
          </form>
        </div>
      )}
      
      {/* Farmers List Tab */}
      {activeTab === 'farmers' && (
        <div className={`p-3 sm:p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-md sm:text-lg font-medium mb-3 sm:mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Farmers List
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={darkMode ? 'bg-gray-600' : 'bg-gray-100'}>
                <tr>
                  <th scope="col" className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </th>
                  <th scope="col" className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Practice
                  </th>
                  <th scope="col" className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Contact
                  </th>
                  <th scope="col" className={`px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-600 bg-gray-700' : 'divide-gray-200 bg-white'}`}>
                {farmersData.map((farmer, index) => (
                  <tr key={index}>
                    <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <img className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" src={farmer.avatar} alt="" />
                        </div>
                        <div className="ml-2 sm:ml-4">
                          <div className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            {farmer.name}
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {farmer.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      <div className="text-xs sm:text-sm">{farmer.farmingPractice}</div>
                    </td>
                    <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      <div className="text-xs sm:text-sm">{farmer.phone}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {farmer.email}
                      </div>
                    </td>
                    <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      <button className="text-green-600 hover:text-green-900 mr-2 sm:mr-3">
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Consumers List Tab */}
      {activeTab === 'consumers' && (
        <div className={`p-3 sm:p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-md sm:text-lg font-medium mb-3 sm:mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Consumers List
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {consumersData.map((consumer, index) => (
              <div key={index} className={`rounded-lg overflow-hidden shadow ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="p-3 sm:p-4">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <img className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-2 sm:mr-3" src={consumer.avatar} alt={consumer.name} />
                    <div>
                      <h4 className={`text-sm sm:text-base font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {consumer.name}
                      </h4>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {consumer.location}
                      </p>
                    </div>
                  </div>
                  <div className={`text-xs sm:text-sm mb-2 sm:mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p className="truncate">{consumer.email}</p>
                    <p>{consumer.phone}</p>
                  </div>
                  <div className="flex justify-between">
                    <button className={`px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium ${
                      darkMode 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}>
                      View
                    </button>
                    <button className={`px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium ${
                      darkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}>
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data for farmers
const farmersData = [
  {
    id: 1,
    name: 'Abebe Kebede',
    title: 'Organic Farmer',
    farmingPractice: 'Organic Vegetables',
    phone: '+251912345678',
    email: 'abebe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Mekdes Hailu',
    title: 'Dairy Farmer',
    farmingPractice: 'Dairy Production',
    phone: '+251987654321',
    email: 'mekdes@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 3,
    name: 'Tesfaye Lemma',
    title: 'Coffee Farmer',
    farmingPractice: 'Coffee Plantation',
    phone: '+251923456789',
    email: 'tesfaye@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: 4,
    name: 'Selamawit Assefa',
    title: 'Poultry Farmer',
    farmingPractice: 'Egg Production',
    phone: '+251934567890',
    email: 'selam@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  }
];

// Mock data for consumers
const consumersData = [
  {
    id: 1,
    name: 'Yohannes Girma',
    location: 'Addis Ababa',
    phone: '+251911223344',
    email: 'yohannes@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 2,
    name: 'Hirut Abebe',
    location: 'Dire Dawa',
    phone: '+251944556677',
    email: 'hirut@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    id: 3,
    name: 'Dawit Mekonnen',
    location: 'Bahir Dar',
    phone: '+251977889900',
    email: 'dawit@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    id: 4,
    name: 'Alemitu Teshome',
    location: 'Hawassa',
    phone: '+251988990011',
    email: 'alemitu@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 5,
    name: 'Elias Worku',
    location: 'Gondar',
    phone: '+251922334455',
    email: 'elias@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: 6,
    name: 'Birtukan Solomon',
    location: 'Mekele',
    phone: '+251955667788',
    email: 'birtukan@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
  }
];

export default Settings;