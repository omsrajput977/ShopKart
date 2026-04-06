import { FiGithub, FiLinkedin, FiMail, FiCode, FiLayers, FiCpu } from 'react-icons/fi';

export default function Account() {
  return (
    <div className="w-full max-w-5xl mx-auto pb-16">
      
      {/* 1. Hero Header Section */}
      <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 mb-8 p-10 sm:p-16 text-center group transition-all duration-500 hover:shadow-xl">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-100 opacity-50 blur-3xl group-hover:bg-emerald-100 transition-colors duration-1000"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-emerald-100 opacity-50 blur-3xl group-hover:bg-blue-100 transition-colors duration-1000"></div>
        
        <div className="relative z-10">
          <div className="w-32 h-32 mx-auto bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <span className="text-5xl font-black text-white">OR</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Om Rajput
          </h1>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 font-bold mb-6">
            Full Stack JavaScript Developer
          </p>
          
          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed mb-8">
            Welcome to the developer portal of ShopKart! I architected this application to demonstrate advanced React system design. It features a complete Global Context architecture for Cart &amp; Wishlist management, seamlessly integrated Mathematical filtering engines, simulated Async Order Processing, and a thoroughly polished UI built entirely from scratch.
          </p>

          <div className="flex justify-center items-center gap-4">
            <a href="#" className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600 border border-gray-200">
              <FiGithub size={24} />
            </a>
            <a href="#" className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600 border border-gray-200">
              <FiLinkedin size={24} />
            </a>
            <a href="#" className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600 border border-gray-200">
              <FiMail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Architecture Details */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pl-2">System Architecture</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <FiCpu size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Global State</h3>
          <p className="text-sm text-gray-600">
            Engineered centralized React Contexts (CartContext &amp; WishlistContext) synchronized seamlessly with LocalStorage data persistence.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
            <FiLayers size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Math Engines</h3>
          <p className="text-sm text-gray-600">
            Constructed advanced filtering pipelines generating dynamic Sidebar checkbox states intersecting with live URL constraints.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
            <FiCode size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Premium UI Components</h3>
          <p className="text-sm text-gray-600">
            Designed responsive layouts with Tailwind CSS, utilizing flexbox/grid architecture, hover micro-animations, and pure utility styling.
          </p>
        </div>

      </div>

      {/* 3. Tech Stack Badge Board */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <h2 className="text-2xl font-bold text-white mb-8 relative z-10">Application Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <span className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default">React v18</span>
          <span className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default">Vite build tool</span>
          <span className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default">Tailwind CSS v3</span>
          <span className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default">DummyJSON REST API</span>
          <span className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default">React Router v6</span>
          <span className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default">Axios</span>
        </div>
      </div>
      
    </div>
  );
}
