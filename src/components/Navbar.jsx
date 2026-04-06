import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Categories', path: '/products' },
    { name: 'Electronics', path: '/products?category=electronics' },
    { name: 'Clothing', path: '/products?category=clothing' },
    { name: 'Home Appliances', path: '/products?category=home' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* 1. Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transform -rotate-3 transition-all duration-300 group-hover:rotate-0 group-hover:scale-105">
              <FiShoppingCart size={22} className="relative -left-[1px]" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 hidden sm:block">
              Shop<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Kart</span>
            </span>
          </Link>

          {/* 2. Main Search Bar (Hidden on very small screens) */}
          <div className="flex-1 max-w-2xl mx-auto hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-blue-600 rounded-r-full">
                <FiSearch size={20} />
              </button>
            </div>
          </div>

          {/* 3. Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/account" className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700">
              <FiUser size={20} />
              <span className="hidden lg:inline text-sm font-medium">Account</span>
            </Link>
            
            <Link to="/wishlist" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 relative">
              <FiHeart size={20} />
              {/* Dynamic Wishlist Badge */}
              {wishlistItems?.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 relative group">
              <FiShoppingCart size={20} className="group-hover:text-blue-600 transition-colors" />
              
              {/* Dynamic Badge */}
              {totalItemCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {totalItemCount}
                </span>
              )}
              
              <div className="hidden lg:flex flex-col items-start ml-1 leading-none">
                <span className="text-xs text-gray-500 font-medium">Cart</span>
                <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Search Bar (Only visible on small screens) */}
      <div className="md:hidden px-4 pb-3 pt-3">
        <div className="relative w-full shadow-sm">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
          <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-blue-600 rounded-r-xl">
            <FiSearch size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Category Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <nav className="flex space-x-6 overflow-x-auto py-3 no-scrollbar">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="whitespace-nowrap text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
