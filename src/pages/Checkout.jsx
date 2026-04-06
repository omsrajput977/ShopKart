import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { FiCheckCircle } from 'react-icons/fi';

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Mathematical Calculation (Matching Cart.jsx with 8% tax)
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartTax = cartSubtotal * 0.08;
  const cartTotal = cartSubtotal + cartTax;

  // Form payload hook
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', 
    address: '', city: '', state: '', zip: '',
    cardNumber: '', cardExp: '', cardCvc: ''
  });

  // State flags
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [finalOrderTotal, setFinalOrderTotal] = useState(0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Stop page reload
    
    // Simulate server processing duration
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setFinalOrderTotal(cartTotal); // Snapshot the total mathematically BEFORE we destroy the array memory!
      setIsSuccess(true);
      clearCart(); // Nuke the global memory since item is "bought"!
    }, 1500);
  };

  // If order is successful, hijack the UI and show a giant receipt!
  if (isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto py-20 text-center px-4">
        <FiCheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you, {formData.firstName}! Your order of <strong>${finalOrderTotal.toFixed(2)}</strong> has been processed successfully. 
          We've sent a receipt to {formData.email}.
        </p>
        <Link to="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // If the cart is empty (and they haven't just placed an order), yell at them!
  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto py-20 text-center px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">You cannot checkout without any items.</p>
        <button onClick={() => navigate(-1)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Secure Checkout</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* We attach onSubmit to the wrapper form that encompasses EVERYTHING */}
        <form onSubmit={handlePlaceOrder}>
          
          {/* 1. Shipping Information Form */}
          <div className="p-8 sm:p-12 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Shipping Information</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" name="firstName" required
                    value={formData.firstName} onChange={handleInputChange}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" name="lastName" required
                    value={formData.lastName} onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" name="email" required
                  value={formData.email} onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                <input 
                  type="text" name="address" required
                  value={formData.address} onChange={handleInputChange}
                  placeholder="123 Main St, Apt 4B"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input 
                    type="text" name="city" required
                    value={formData.city} onChange={handleInputChange}
                    placeholder="New York"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  <input 
                    type="text" name="state" required
                    value={formData.state} onChange={handleInputChange}
                    placeholder="NY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                  <input 
                    type="text" name="zip" required
                    value={formData.zip} onChange={handleInputChange}
                    placeholder="10001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="p-8 sm:p-12 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Payment Method</h2>
            <div className="p-6 border-2 border-blue-500 bg-blue-50 rounded-xl flex items-center justify-between cursor-pointer mb-6">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border-4 border-blue-600 bg-white"></div>
                <span className="font-bold text-blue-900">Credit / Debit Card</span>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-gray-300 rounded shadow-sm"></div>
                <div className="w-10 h-6 bg-gray-300 rounded shadow-sm"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1 md:col-span-2">
                <input 
                  type="text" name="cardNumber" required
                  value={formData.cardNumber} onChange={handleInputChange}
                  placeholder="Card Number" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <input 
                type="text" name="cardExp" required
                value={formData.cardExp} onChange={handleInputChange}
                placeholder="MM/YY" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
              <input 
                type="text" name="cardCvc" required
                value={formData.cardCvc} onChange={handleInputChange}
                placeholder="CVC" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          {/* 3. Action / Order Summary Footer */}
          <div className="p-8 sm:p-12 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-auto text-center md:text-left text-sm text-gray-500">
              By clicking "Place Order", you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <Link to="/cart" className="w-full sm:w-auto text-gray-600 font-bold hover:text-gray-900 transition-colors py-3 text-center">
                Return to Cart
              </Link>
              
              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full sm:w-auto font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg text-lg ${
                  isProcessing ? 'bg-gray-400 text-gray-200 cursor-not-allowed shadow-none' : 'bg-green-600 hover:bg-green-700 text-white active:scale-95 shadow-green-600/20'
                }`}
              >
                {isProcessing ? 'Processing...' : `Place Order ($${cartTotal.toFixed(2)})`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
