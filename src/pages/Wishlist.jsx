import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';

export default function Wishlist() {
  // Pull the live global list of favorite items
  const { wishlistItems } = useContext(WishlistContext);


  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Wishlist</h1>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {wishlistItems.length} Items Saved
        </span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* We reuse the ProductCard component so we have a consistent look! */}
          {wishlistItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">❤️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6 max-w-sm">
            Save items you love here so you can easily find them later and add them to your cart.
          </p>
          <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-transform active:scale-95 duration-200 shadow-lg shadow-blue-600/20">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}
