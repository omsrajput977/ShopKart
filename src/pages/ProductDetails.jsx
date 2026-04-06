import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiStar, FiHeart, FiShoppingCart, FiTruck, FiShield } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useProduct } from '../hooks/useProducts';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

export default function ProductDetails() {
  // 1. Grab the dynamic ID from the URL (e.g. /products/5)
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Feed that ID into your specific new hook
  const { product: p } = useProduct(id);

  // 3. Download the global Cart & Wishlist capabilities
  const { addToCart } = useContext(CartContext);
  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);
  
  // Calculate if this specific product is already in the wishlist (safe check if p is null)
  const isWishlisted = p ? wishlistItems.some(item => item.id === p.id) : false;
  
  const [isAdded, setIsAdded] = useState(false); // Track button animation

  const handleAddToCart = () => {
    addToCart(p); // 1. Save it to global memory instantly
    setIsAdded(true); // 2. Turn the button green
    
    // 3. Wait for 2 seconds to let the user see the success, then naturally transport them to Cart
    setTimeout(() => {
      navigate('/cart');
    }, 2000);
  };

  // 3. Fallback: If 'p' is null (still loading), show a blank screen instead of crashing
  if (!p) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full pb-12">
      
      {/* 1. Breadcrumbs */}
      <nav className="text-sm mb-6 flex items-center gap-2 text-gray-500">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-blue-600 capitalize transition-colors">
          All Categories
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate w-48 font-medium">{p.title}</span>
      </nav>

      {/* 2. Main Product Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Product Image Display */}
        <div className="w-full lg:w-1/2 p-8 sm:p-16 lg:border-r border-gray-100 flex items-center justify-center bg-gray-50 relative group">
          <img 
            src={p.image} 
            alt={p.title} 
            className="w-full max-w-md h-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Right Side: Product Information */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col">
          
          {/* Category Tag */}
          <div className="mb-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              {p.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {p.title}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-3 mb-6 text-sm">
            <div className="flex text-yellow-500 text-base">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= Math.round(p.rating?.rate || 0) ? <FaStar /> : <FiStar className="text-gray-300" />}
                </span>
              ))}
            </div>
            <span className="font-bold text-gray-900 text-base">{p.rating?.rate}</span>
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors">
              ({p.rating?.count} verified reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-4xl font-extrabold text-gray-900">${p.price.toFixed(2)}</span>
            <p className="text-sm text-green-600 mt-2 font-medium">In Stock & Ready to Ship</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            {p.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 duration-200 shadow-lg ${
                  isAdded 
                    ? 'bg-green-600 text-white shadow-green-600/20 cursor-default' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                }`}
              >
                {isAdded ? (
                  'Added to Cart! ✓'
                ) : (
                  <><FiShoppingCart size={22} /> Add to Cart</>
                )}
              </button>
              <button 
                onClick={() => toggleWishlist(p)}
                className={`sm:w-auto w-full border-2 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors ${
                  isWishlisted 
                    ? 'border-red-500 text-red-500 hover:bg-red-50' 
                    : 'border-gray-200 hover:border-red-500 hover:text-red-500 text-gray-700'
                }`}
              >
                <FiHeart size={22} className={isWishlisted ? 'fill-current' : 'fill-transparent'} />
                {isWishlisted ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 mt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <FiTruck size={20} />
                </div>
                <span>Free Next-Day Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <FiShield size={20} />
                </div>
                <span>1 Year Warranty</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
