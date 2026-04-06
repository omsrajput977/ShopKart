import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import { useState, useEffect } from 'react';
import { CartContext } from './context/CartContext';
import { WishlistContext } from './context/WishlistContext';

function App() {
  // --- CART STATE ---
  // Lazily initialize from localStorage to survive page refreshes
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shopkart_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // --- WISHLIST STATE ---
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('shopkart_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // --- PERSISTENCE LOGIC ---
  // Automatically save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('shopkart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Automatically save to localStorage whenever wishlistItems changes
  useEffect(() => {
    localStorage.setItem('shopkart_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Wishlist Logic: Toggle items in and out
  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.find(item => item.id === product.id);
      if (exists) {
        // If it's already there, filter it out (unlike)
        return prevItems.filter(item => item.id !== product.id);
      }
      // If it isn't there, add the naked product object to the array
      return [...prevItems, product];
    });
  };

  // --- CART LOGIC ---
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        // Increase quantity if it exists
        return prevItems.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add as a new item
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  // 3. Remove an item entirely from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  };

  // 4. Update the quantity (+ or -)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) => prevItems.map(item => 
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // 5. Clear the cart entirely (used when a purchase succeeds)
  const clearCart = () => setCartItems([]);

  return (
    // Wrap the app in the Wishlist manager
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist }}>
      {/* Wrap the app in the Cart manager */}
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
        <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>

        <Footer />

        </div>
        </Router>
      </CartContext.Provider>
    </WishlistContext.Provider>
  );
}

export default App;
