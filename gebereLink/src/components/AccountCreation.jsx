import { useState } from 'react';
import { FaEye, FaEyeSlash, FaUpload, FaUser, FaUserTie, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AccountCreation = ({ darkMode, setUserData }) => {
  const [activeTab, setActiveTab] = useState('consumer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    faydaId: '',
    traderPermission: null,
    title: '',
    document: null,
    farmingPractice: '',
    description: '',
    email: '',
    phone: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document' || name === 'profileImage' || name === 'traderPermission') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create user object based on form data
    const newUser = {
      username: formData.username,
      firstName: formData.name.split(' ')[0] || '',
      lastName: formData.name.split(' ')[1] || '',
      email: formData.email,
      phone: formData.phone,
      role: activeTab,
      farmingPractice: formData.farmingPractice,
      description: formData.description,
      avatar: profileImage ? URL.createObjectURL(profileImage) : null,
      faydaId: formData.faydaId
    };
    
    // Set the user data (in a real app, this would be an API call)
    setUserData(newUser);
    
    // Navigate to home or dashboard
    navigate('/home');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
      }}
    >
      <div className={`relative w-full max-w-md px-8 py-8 mx-4 rounded-lg shadow-xl z-10 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h1 className={`text-2xl font-bold text-center mb-6 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>Create Account</h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab('consumer')}
            className={`px-6 py-2 rounded-l-lg font-medium flex items-center ${
              activeTab === 'consumer'
                ? darkMode
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-700'
            }`}
          >
            <FaUsers className="mr-2" /> Consumer
          </button>
          <button
            onClick={() => setActiveTab('farmer')}
            className={`px-6 py-2 rounded-r-lg font-medium flex items-center ${
              activeTab === 'farmer'
                ? darkMode
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-700'
            }`}
          >
            <FaUserTie className="mr-2" /> Farmer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full overflow-hidden border-2 ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              } flex items-center justify-center`}>
                {profileImage ? (
                  <img 
                    src={URL.createObjectURL(profileImage)} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`text-4xl ${
                    darkMode ? 'text-gray-400' : 'text-gray-300'
                  }`}>
                    <FaUser />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full cursor-pointer">
                <FaUpload />
                <input
                  type="file"
                  name="profileImage"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          {/* Common Fields */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          {activeTab === 'farmer' && (
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              />
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Confirm Password *</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Fayda ID for both consumer and farmer */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>Fayda ID *</label>
            <input
              type="text"
              name="faydaId"
              value={formData.faydaId}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
              placeholder="Enter your Fayda identification number"
            />
          </div>

          {/* Consumer Specific Fields */}
          {activeTab === 'consumer' && (
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Trader Permission Permit *</label>
              <label className={`flex items-center justify-center px-3 py-2 border rounded-md cursor-pointer ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <FaUpload className="mr-2" />
                {formData.traderPermission ? formData.traderPermission.name : 'Upload Permission Document'}
                <input
                  type="file"
                  name="traderPermission"
                  onChange={handleChange}
                  className="hidden"
                  required
                />
              </label>
            </div>
          )}

          {/* Farmer Specific Fields */}
          {activeTab === 'farmer' && (
            <>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  placeholder="e.g. Coffee Farmer, Dairy Producer"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Attach Farm Mentorship Document *</label>
                <label className={`flex items-center justify-center px-3 py-2 border rounded-md cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}>
                  <FaUpload className="mr-2" />
                  {formData.document ? formData.document.name : 'Upload Document'}
                  <input
                    type="file"
                    name="document"
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Farming Practice *</label>
                <input
                  type="text"
                  name="farmingPractice"
                  value={formData.farmingPractice}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  placeholder="e.g. Organic Farming, Poultry"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your farming experience..."
                ></textarea>
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-medium ${
              darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            Register
          </button>

          <div className={`text-center text-sm ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Already have an account?{' '}
            <button
              type="button"
              className={`font-medium ${
                darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'
              }`}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountCreation;