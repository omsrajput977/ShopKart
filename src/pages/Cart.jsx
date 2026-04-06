import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  // Download the global data from App.jsx!
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  // Dynamic Calculations using the real global state
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Side: Cart Items List */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            {cartItems.length === 0 ? (
              <div className="p-16 text-center text-gray-500 font-medium">Your cart is entirely empty. Go add some products!</div>
            ) : (
              cartItems.map((item, index) => (
                <div 
                  key={item.product.id} 
                  className={`flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  {/* Item Image */}
                  <div className="w-32 h-32 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center p-3 relative group">
                    <img src={item.product.image} alt={item.product.title} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div className="mb-4">
                      <Link to={`/products/${item.product.id}`} className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {item.product.title}
                      </Link>
                      <p className="text-gray-500 font-medium mt-1">
                        ${item.product.price.toFixed(2)} <span className="text-sm font-normal">each</span>
                      </p>
                    </div>
                    
                    {/* Item Actions (Quantity & Remove) */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border-2 border-gray-100 rounded-lg bg-gray-50 overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                        >
                          <FiMinus size={18} />
                        </button>
                        <span className="w-12 text-center py-2 text-sm font-bold text-gray-900 bg-white border-x-2 border-gray-100">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                        >
                          <FiPlus size={18} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 flex items-center gap-2 text-sm font-bold transition-colors"
                      >
                        <FiTrash2 size={18} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Individual Item Total */}
                  <div className="hidden sm:flex flex-col items-end self-start">
                    <span className="text-sm text-gray-500 mb-1">Total</span>
                    <span className="text-2xl font-black text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}


          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8 text-gray-600">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span className="font-medium">Shipping</span>
                <span className="font-bold">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Tax</span>
                <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t-2 border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-4xl font-black text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-transform active:scale-95 duration-200 shadow-lg shadow-blue-600/20 text-lg">
              Proceed to Checkout
            </Link>
            
            <div className="mt-6 text-center">
              <Link to="/products" className="text-sm font-medium text-blue-600 hover:underline">
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
