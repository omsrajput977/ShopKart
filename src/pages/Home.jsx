import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export default function Home() {
  const { products } = useProducts();
  
  // Real-time "Trending" Logic: 
  // We sort all 200 products to find the highest rated items first, then pick the top 4!
  const featuredProducts = products?.length 
    ? [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4)
    : [];

  return (
    <div className="w-full space-y-16 pb-12">
      {/* 0. Super Banner - All Categories */}
      <Link to="/products" className="relative w-full bg-slate-100 rounded-[2.5rem] p-8 sm:p-12 mb-6 flex flex-col md:flex-row items-center justify-between overflow-hidden group block cursor-pointer transition-all hover:bg-slate-200 border border-slate-200">
        <div className="relative z-10 max-w-lg mb-8 md:mb-0">
          <span className="inline-flex items-center gap-2 py-1 pr-4 pl-3 rounded-full bg-white text-slate-800 text-xs font-bold mb-4 tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Endless Options
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight text-slate-900">
            Discover Our <br /> Entire Collection.
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-sm">
            From cutting-edge tech to premium fashion. Find exactly what you need today.
          </p>
          <span className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-full group-hover:scale-105 transition-all shadow-lg active:scale-95">
            View All Categories <span className="text-xl">→</span>
          </span>
        </div>

        {/* Abstract / Minimal Collage for All Categories */}
        <div className="relative w-full md:w-1/2 h-64 md:h-full mt-8 md:mt-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="absolute w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 right-0 bottom-0 group-hover:scale-110 transition-transform duration-700"></div>

          <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" alt="Clothing" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl bg-white p-2 shadow-2xl relative z-10 -mr-6 -mt-10 rotate-[10deg] group-hover:rotate-[0deg] transition-transform duration-500" />
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" alt="Headphones" className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl bg-white p-2 shadow-2xl relative z-20 -mr-6 mt-10 -rotate-[5deg] group-hover:rotate-[0deg] group-hover:scale-110 transition-transform duration-500" />
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" alt="Watch" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl bg-white p-2 shadow-xl relative z-30 -mt-16 rotate-[15deg] group-hover:rotate-[0deg] transition-transform duration-500" />
        </div>
      </Link>

      {/* 1. Bento Box Hero Section for Specific Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">

        {/* Main large banner - Electronics */}
        <Link to="/products?category=electronics" className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 sm:p-10 md:p-12 flex flex-col justify-center relative overflow-hidden group min-h-[320px] md:min-h-[360px] block cursor-pointer">
          <div className="relative z-10 max-w-lg">
            <span className="inline-block py-1 pr-3 pl-2.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold mb-4 tracking-widest uppercase flex w-max items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Tech Revolution
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Audio</span> Is Here.
            </h1>
            <p className="text-slate-400 text-base mb-6 max-w-sm">
              Experience unparalleled sound quality with our new spatial audio collection. Free shipping worldwide.
            </p>
            <span className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-full group-hover:bg-gray-100 group-hover:scale-105 transition-all shadow-lg active:scale-95 text-sm">
              Explore Electronics <span className="text-lg">→</span>
            </span>
          </div>

          {/* Aesthetic Floating Image */}
          <img
            src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"
            alt="Hero Headphones"
            className="absolute right-[-10%] sm:right-0 top-1/2 -translate-y-1/2 w-[90%] sm:w-3/5 max-w-[400px] object-contain opacity-40 md:opacity-90 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-700"
          />
          {/* subtle glow behind image */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        </Link>

        {/* Right side small banners */}
        <div className="flex flex-col gap-4">
          {/* Mini Banner 1 - Home Appliances */}
          <Link to="/products?category=home" className="bg-[#fff3e0] rounded-2xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden group block cursor-pointer">
            <div className="relative z-10 max-w-[55%]">
              <span className="text-orange-600 font-bold text-[10px] tracking-widest uppercase mb-1.5 block">Premium</span>
              <h3 className="text-xl sm:text-2xl font-black text-orange-950 mb-1 leading-tight">Home<br />Appliances</h3>
              <p className="text-orange-800/80 font-medium text-xs mt-1 mb-3">Up to 40% off</p>
              <div>
                <span className="inline-flex items-center gap-1 text-orange-900 font-bold text-xs bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm group-hover:bg-white transition-colors">
                  Shop Home <span>→</span>
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80"
              alt="Home Appliances"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-xl shadow-lg group-hover:-rotate-3 group-hover:scale-110 transition-all duration-500 border-4 border-white"
            />
          </Link>

          {/* Mini Banner 2 - Clothing */}
          <Link to="/products?category=clothing" className="bg-[#f0f4ff] rounded-2xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden group block cursor-pointer">
            <div className="relative z-10 max-w-[55%]">
              <span className="text-blue-600 font-bold text-[10px] tracking-widest uppercase mb-1.5 block">Apparel</span>
              <h3 className="text-xl sm:text-2xl font-black text-blue-950 mb-1 leading-tight">Latest<br />Clothing</h3>
              <p className="text-blue-800/80 font-medium text-xs mt-1 mb-3">Summer Fits</p>
              <div>
                <span className="inline-flex items-center gap-1 text-blue-900 font-bold text-xs bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm group-hover:bg-white transition-colors">
                  Shop Clothing <span>→</span>
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80"
              alt="Clothing"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-xl shadow-lg group-hover:rotate-3 group-hover:scale-110 transition-all duration-500 border-4 border-white"
            />
          </Link>
        </div>

      </div>

      {/* 2. Featured Products Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
            <p className="text-gray-500">Our most popular products this week.</p>
          </div>
          <Link to="/products" className="group flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
            View All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Reusing the ProductCard component! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
