import React, { useState, useMemo, useContext } from "react";
import { Search } from "lucide-react";
import FundCard from "../components/FundCard";
import FilterBar from "../components/FilterBar";
import { FundContext } from "../context/FundContext";
const AllFunds = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const {funds} = useContext(FundContext);
  
  const filteredFunds = useMemo(() => {
    return funds.filter((fund) => {
      const matchesCategory =
        selectedCategory === "All" || fund.category === selectedCategory;
      const matchesSearch =
        fund.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fund.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm,funds]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            All Campaigns
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-300">
            Discover and support causes that matter to you. Every donation makes
            a difference.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-md mb-8 border border-gray-100 dark:border-dark-700 transition-colors">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-dark-300">
            Showing {filteredFunds.length} campaign
            {filteredFunds.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Funds Grid */}
        {filteredFunds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFunds.map((fund, idx) => (
              <FundCard key={idx} fund={fund} />
              
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-dark-500 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-600 dark:text-dark-300">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFunds;
