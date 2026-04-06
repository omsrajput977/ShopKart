import { FiStar, FiHeart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  // We provide a fallback dummy product so we can preview the 
  // design before we actually fetch real data!
  const item = product || {
    id: 1,
    title: 'Wireless Noise Cancelling Headphones - Premium Quality',
    price: 349.99,
    rating: { rate: 4.7, count: 245 },
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
  };

  // --- CART LOGIC ---
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  // --- WISHLIST LOGIC ---
  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);
  const isWishlisted = wishlistItems.some(savedItem => savedItem.id === item.id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Stop the browser from triggering any links on click
    addToCart(item); // Send to global memory
    
    // Show confirmation UI on the button instead of navigating!
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // 2 seconds later, revert to normal
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      
      {/* 1. Product Image Area */}
      <div className="relative pt-[100%] bg-gray-50 flex-shrink-0 block">
        <Link to={`/products/${item.id}`} className="absolute inset-0 block cursor-pointer">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Floating Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(item);
          }}
          className={`absolute top-3 right-3 p-2.5 bg-white rounded-full shadow-sm hover:scale-110 transition-all z-10 hover:shadow-md ${
            isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <FiHeart size={18} className={isWishlisted ? 'fill-current' : 'fill-transparent'} />
        </button>
      </div>

      {/* 2. Product Details */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Title: Clickable to details page */}
        <Link to={`/products/${item.id}`} className="text-gray-900 font-medium text-base line-clamp-2 h-12 mb-2 hover:text-blue-600 transition-colors">
          <h3 title={item.title}>{item.title}</h3>
        </Link>
        
        {/* Rating Stars */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-500 text-sm">
            {[1, 2, 3, 4, 5].map((star) => (
               <span key={star}>
                {star <= Math.round(item.rating?.rate || 0) ? <FaStar /> : <FiStar className="text-gray-300" />}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {item.rating?.rate} ({item.rating?.count})
          </span>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-auto flex flex-col gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>

          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full font-medium py-2.5 px-4 rounded-lg transition-colors active:scale-95 duration-200 ${
              isAdded 
                ? 'bg-green-600 text-white cursor-default' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isAdded ? 'Added to Cart! ✓' : 'Add to Cart'}
          </button>
        </div>
        
      </div>
    </div>
  );
}
