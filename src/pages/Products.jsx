import SidebarFilters from '../components/SidebarFilters';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useState, useEffect } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

export default function Products() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  const [sortType, setSortType] = useState('Recommended');

  // Mobile Filter Modal State
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sidebar Filter States
  const [priceMax, setPriceMax] = useState(50000);
  const [sidebarCategories, setSidebarCategories] = useState([]);

  // RESET LOGIC: If the user changes Navbar categories, clear the old sidebar filters instantly!
  useEffect(() => {
    setSidebarCategories([]);
    setPriceMax(50000);
  }, [selectedCategory]);

  // Prevent background scrolling when mobile filter drawer is open
  useEffect(() => {
    if (isMobileFiltersOpen) {
       document.body.style.overflow = 'hidden';
    } else {
       document.body.style.overflow = 'auto';
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileFiltersOpen]);

  // 1. Call your custom hook to get the actual array of live products!
  const { products } = useProducts();
  
  // 2. Map our main categories to DummyJSON's detailed subcategories
  const categoryMap = {
    electronics: ['smartphones', 'laptops', 'tablets', 'mobile-accessories', 'mens-watches', 'womens-watches'],
    clothing: ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes', 'tops'],
    home: ['furniture', 'home-decoration', 'kitchen-accessories', 'groceries']
  };

  // 3. Filter based on the selectedCategory in the URL FIRST
  let displayedProducts = selectedCategory 
    ? products.filter(p => {
        const subcategories = categoryMap[selectedCategory.toLowerCase()];
        if (subcategories) {
          // If we mapped it, check if the product's category is inside our mapped array
          return subcategories.includes(p.category.toLowerCase());
        }
        // Fallback safety check
        return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      }) 
    : products;

  // Compute exactly what categories exist on this specific page AFTER the URL filter!
  const uniqueCategories = [...new Set(displayedProducts.map(p => p.category))];

  // 4. Then apply your massive Mathematical Sidebar Filters!
  displayedProducts = displayedProducts.filter(p => {
    // A. Filter by Price Slider
    if (p.price > priceMax) return false;
    
    // B. Filter by Checkboxes (if the user actually checked any!)
    if (sidebarCategories.length > 0 && !sidebarCategories.includes(p.category)) {
      return false;
    }
    
    return true; // If it survives, it renders!
  });

  // Formatting the title to be dynamic
  const pageTitle = selectedCategory 
    ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
    : 'All Products';

  // 4. Sort the filtered products mathematically before rendering
  const sortedProducts = [...displayedProducts].sort((a, b) => {
    switch (sortType) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Highest Rated':
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      case 'Newest Arrivals':
        return b.id - a.id; // Pretending higher ID means it was added to database recently
      default:
        return 0; // Keep the original order
    }
  });

  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      
      {/* 1. Sidebar Filters (Mobile Drawer Overlay) */}
      {isMobileFiltersOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 md:hidden flex justify-start backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div 
            className="w-4/5 max-w-[320px] h-full bg-gray-50 overflow-y-auto shadow-2xl flex flex-col transform transition-transform"
            onClick={(e) => e.stopPropagation()} // Stop clicking inside drawer from closing it
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold flex items-center gap-2"><FiFilter /> Filters</h2>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)} 
                className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            {/* Inject the exact same UI component! */}
            <div className="p-4 flex-1">
              <SidebarFilters 
                priceMax={priceMax} 
                setPriceMax={setPriceMax}
                sidebarCategories={sidebarCategories}
                setSidebarCategories={setSidebarCategories}
                uniqueCategories={uniqueCategories}
              />
            </div>
            
            {/* Massive action button for mobile users */}
            <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-colors"
              >
                Apply Filters ({displayedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sidebar Filters (Desktop explicitly visible inline Aside) */}
      <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 hidden md:block">
        <div>
          <SidebarFilters 
            priceMax={priceMax} 
            setPriceMax={setPriceMax}
            sidebarCategories={sidebarCategories}
            setSidebarCategories={setSidebarCategories}
            uniqueCategories={uniqueCategories}
          />
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 w-full">
        
        {/* Page Header & Sorting Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-sm text-gray-500 mt-1">Showing {displayedProducts.length} items</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
            >
              <FiFilter size={16} /> Filters
            </button>
            <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
            <select 
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 py-2 pl-3 pr-8 bg-white outline-none"
            >
              <option value="Recommended">Recommended</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Highest Rated">Highest Rated</option>
              <option value="Newest Arrivals">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* 3. The Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 font-medium">No products found in this category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
