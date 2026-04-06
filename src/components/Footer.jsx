import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiShoppingCart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-max">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/20 transform -rotate-3 transition-all duration-300 group-hover:rotate-0 group-hover:scale-105">
                <FiShoppingCart size={16} className="relative -left-[1px]" />
              </div>
              <span className="font-black text-xl tracking-tighter text-white">
                Shop<span className="text-emerald-400">Kart</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Your one-stop destination for premium electronics, fashion, and jewelry. Quality guaranteed with every purchase.
            </p>
            <div className="flex gap-3">
              <Link to="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                <FiFacebook size={16} />
              </Link>
              <Link to="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                <FiTwitter size={16} />
              </Link>
              <Link to="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                <FiInstagram size={16} />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-4">Shop Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=electronics" className="text-slate-400 hover:text-blue-400 transition-colors text-xs">Electronics & Audio</Link></li>
              <li><Link to="/products?category=clothing" className="text-slate-400 hover:text-blue-400 transition-colors text-xs">Men's & Women's Fashion</Link></li>
              <li><Link to="/products?category=home" className="text-slate-400 hover:text-blue-400 transition-colors text-xs">Home Appliances</Link></li>
              <li><Link to="/products" className="text-slate-400 hover:text-blue-400 transition-colors text-xs">View All Products</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-slate-400 hover:text-blue-400 transition-colors text-xs">Track Your Order</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-blue-400 transition-colors text-xs">Shipping & Delivery</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-blue-400 transition-colors text-xs">Returns & Exchanges</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-blue-400 transition-colors text-xs">FAQ & Help Center</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-4">Stay in the Loop</h3>
            <p className="text-slate-400 text-xs mb-3">Be the first to know about new arrivals and exclusive deals.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
              />
              <button 
                type="button" 
                className="bg-blue-600 text-white font-bold px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors text-xs active:scale-95 shadow-sm shadow-blue-600/30"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} ShopKart E-commerce. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
