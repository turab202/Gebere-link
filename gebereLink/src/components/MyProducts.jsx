import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const MyProducts = ({ darkMode }) => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    available: "",
    price: "",
    per: "kg",
    description: "",
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditForm({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/products/${editingId}`, editForm);
      setProducts(products.map(p => (p._id === editingId ? res.data : p)));
      setEditingId(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };


  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>My Products</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className={`${darkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Product
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Category
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Available
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Price
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-600 bg-gray-700' : 'divide-gray-200 bg-white font-semibold'}`}>
            {products.map(product => (
              <tr key={product._id} className={`${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'}`}>
                {editingId === product._id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className={`border rounded px-2 py-1 w-full ${
                          darkMode 
                            ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                            : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                        }`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className={`border rounded cursor-pointer px-2 py-1 w-full appearance-none ${
                          darkMode 
                            ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                            : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                        }`}
                      >
                        <option value="Grains">Grains</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Other">Other</option>
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
                  </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="available"
                        value={editForm.available}
                        onChange={handleEditChange}
                        className={`border rounded px-2 py-1 w-full ${
                          darkMode 
                            ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                            : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                        }`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        className={`border rounded px-2 py-1 w-3/5 ${
                          darkMode 
                            ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                            : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                        }`}
                      />
                      <div className="relative w-2/5 ml-1">
                        <select
                          name="per"
                          value={editForm.per}
                          onChange={handleEditChange}
                          className={`border rounded cursor-pointer px-2 py-1 w-full appearance-none ${
                            darkMode 
                              ? 'bg-gray-600 border-gray-500 text-gray-100 focus:ring-green-400 focus:border-green-400' 
                              : 'bg-white border-gray-300 text-gray-700 focus:ring-green-500 focus:border-green-500'
                          }`}
                        >
                          <option value="kg">kg</option>
                          <option value="quintal">quintal</option>
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
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <button
                        onClick={handleEditSubmit}
                        className={`${darkMode ? 'cursor-pointer text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'} cursor-pointer mr-2`}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className={`${darkMode ? 'text-gray-300  hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} cursor-pointer`}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{product.name}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{product.description}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {product.category}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {product.available}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      ETB {product.price}/{product.per}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md font-semibold">
                      <button
                        onClick={() => handleEdit(product)}
                        className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} cursor-pointer mr-3`}
                      >
                        <FiEdit className="inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} cursor-pointer`}
                      >
                        <FiTrash2 className="inline" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;