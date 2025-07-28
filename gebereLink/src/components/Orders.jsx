import { useState, useEffect } from 'react';
import { FiClock, FiCheck, FiX, FiShoppingBag } from 'react-icons/fi';
import axios from 'axios';

const Orders = ({ darkMode }) => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3000/api/orders');
        setOrders(res.data);
        setError("");
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "accepted":
        return <FiCheck className="text-green-500" />;
      case "cancelled":
        return <FiX className="text-red-500" />;
      default:
        return <FiShoppingBag className="text-gray-500" />;
    }
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Orders</h2>

      {/* Tabs */}
      <div className={`flex border-b mb-6 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
        {["all", "pending", "accepted", "cancelled"].map(status => (
          <button
            key={status}
            className={`px-4 py-2 font-semibold cursor-pointer ${
              activeTab === status
                ? `border-b-2 border-green-500 ${darkMode ? 'text-green-400' : 'text-green-600'}`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
            onClick={() => setActiveTab(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Loader/Error */}
      {loading ? (
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className={`${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
              <tr>
                {["Order ID", "Product", "Quantity", "Price", "Date", "Status"].map(header => (
                  <th key={header} className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-600 bg-gray-700' : 'divide-gray-200 bg-white'}`}>
              {filteredOrders.map(order => (
                <tr key={order._id} className={`${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'}`}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>#{order._id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.product}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{order.quantity}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>ETB {order.price}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{new Date(order.date).toLocaleDateString()}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
