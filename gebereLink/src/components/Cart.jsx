import { useState } from 'react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

const initialCartItems = [
  { id: 1, name: "Wheat", price: 1200, per: "quintal", farmer: "John Doe", quantity: 2, image: null },
  { id: 2, name: "Teff", price: 3500, per: "kg", farmer: "Jane Smith", quantity: 1, image: null },
  { id: 3, name: "Onion", price: 45, per: "kg", farmer: "Mike Johnson", quantity: 5, image: null },
];

const Cart = ({ darkMode }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Your Cart</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {cartItems.map(item => (
            <div 
              key={item.id} 
              className={`flex items-center py-4 ${darkMode ? 'border-b border-gray-600' : 'border-b border-gray-200'}`}
            >
              <div className={`w-24 h-24 flex items-center justify-center rounded-lg mr-4 ${
                darkMode ? 'bg-gray-600' : 'bg-gray-100'
              }`}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No Image</span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.name}</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Farmer: {item.farmer}</p>
                <p className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>ETB {item.price}/{item.per}</p>
              </div>
              
              <div className="flex items-center">
                <button 
                  onClick={() => decreaseQuantity(item.id)}
                  className={`p-1 rounded-full ${darkMode ? 'cursor-pointer hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <FiMinus />
                </button>
                <span className={`mx-2 w-8 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.quantity}
                </span>
                <button 
                  onClick={() => increaseQuantity(item.id)}
                  className={`p-1 rounded-full ${darkMode ? 'cursor-pointer hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <FiPlus />
                </button>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  className={`ml-4 ${darkMode ? 'cursor-pointer text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="md:w-80">
          <div className={`border rounded-lg p-4 ${darkMode ? 'border-gray-600 bg-gray-600' : 'border-gray-200 bg-white'}`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Order Summary</h3>
            
            <div className={`space-y-2 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>ETB {totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>ETB 150</span>
              </div>
              <div className={`flex justify-between font-bold text-lg pt-2 ${
                darkMode ? 'border-t border-gray-500 text-gray-200' : 'border-t border-gray-200 text-gray-800'
              }`}>
                <span>Total</span>
                <span>ETB {totalPrice + 150}</span>
              </div>
            </div>
            
            <button className="w-full bg-green-600 cursor-pointer text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;