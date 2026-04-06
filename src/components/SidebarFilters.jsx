import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function SidebarFilters({ 
  priceMax, 
  setPriceMax, 
  sidebarCategories, 
  setSidebarCategories, 
  uniqueCategories 
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  // We deleted the hardcoded categories!

  return (
    <div className="w-full bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button 
          onClick={() => {
            setSidebarCategories([]);
            setPriceMax(50000); // Reset to mathematical max to show all items
          }}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* 1. Categories Section */}
      <div className="border-b border-gray-100 pb-6 mb-6">
        <button 
          onClick={() => setCategoriesOpen(!categoriesOpen)}
          className="flex items-center justify-between w-full focus:outline-none group"
        >
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Categories</h3>
          {categoriesOpen ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
        </button>
        
        {categoriesOpen && (
          <div className="space-y-3 mt-4">
            {uniqueCategories?.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={sidebarCategories.includes(cat)}
                  onChange={() => {
                    // Toggle Logic
                    if (sidebarCategories.includes(cat)) {
                      setSidebarCategories(sidebarCategories.filter(c => c !== cat));
                    } else {
                      setSidebarCategories([...sidebarCategories, cat]);
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                {/* Dynamically capitalize the first letter */}
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : ''}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 2. Price Range Section */}
      <div className="pb-2">
        <button 
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex items-center justify-between w-full focus:outline-none group"
        >
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Price Range</h3>
          {priceOpen ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
        </button>

        {priceOpen && (
          <div className="mt-6 px-1">
            <input 
              type="range" 
              min="0" 
              max="50000" 
              step="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-bold text-gray-900">$0</span>
              <span className="text-sm font-medium text-gray-500">$0 - ${priceMax.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
