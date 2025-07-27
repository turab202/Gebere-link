import { useState } from 'react';
import { FiClock, FiCheck, FiX, FiShoppingBag } from 'react-icons/fi';

const orders = [
  { id: 1, product: "Wheat", quantity: 2, price: 2400, status: "pending", date: "2023-05-15" },
  { id: 2, product: "Teff", quantity: 5, price: 17500, status: "accepted", date: "2023-05-10" },
  { id: 3, product: "Onion", quantity: 10, price: 450, status: "cancelled", date: "2023-05-05" },
  { id: 4, product: "Maize", quantity: 1, price: 1100, status: "pending", date: "2023-05-18" },
  { id: 5, product: "Tomato", quantity: 3, price: 180, status: "accepted", date: "2023-05-12" },
];

const Orders = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("all");

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
      
      <div className={`flex border-b mb-6 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
        <button
          className={`px-4 py-2 font-semibold cursor-pointer ${
            activeTab === "all" 
              ? `border-b-2 border-green-500 ${darkMode ? 'text-green-400' : 'text-green-600'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Orders
        </button>
        <button
          className={`px-4 py-2 font-semibold cursor-pointer ${
            activeTab === "pending" 
              ? `border-b-2 border-green-500 ${darkMode ? 'text-green-400' : 'text-green-600'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 font-semibold cursor-pointer ${
            activeTab === "accepted" 
              ? `border-b-2 border-green-500 ${darkMode ? 'text-green-400' : 'text-green-600'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          onClick={() => setActiveTab("accepted")}
        >
          Accepted
        </button>
        <button
          className={`px-4 py-2 font-semibold cursor-pointer ${
            activeTab === "cancelled" 
              ? `border-b-2 border-green-500 ${darkMode ? 'text-green-400' : 'text-green-600'}` 
              : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className={`${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Order ID
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Product
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Quantity
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Price
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Date
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-600 bg-gray-700' : 'divide-gray-200 bg-white'}`}>
            {filteredOrders.map(order => (
              <tr 
                key={order.id} 
                className={`${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'}`}
              >
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  #{order.id}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {order.product}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {order.quantity}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ETB {order.price}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {order.date}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1 capitalize">{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;