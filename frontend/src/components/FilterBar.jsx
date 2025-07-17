import React from 'react';
import { categories } from '../data/mockData';

const FilterBar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-md mb-8 border border-gray-100 dark:border-dark-700 transition-colors">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
              selectedCategory === category
                ? 'bg-linear-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 border border-gray-200 dark:border-dark-600 hover:border-emerald-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;