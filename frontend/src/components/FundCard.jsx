import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, TrendingUp } from 'lucide-react';

const FundCard = ({ fund }) => {
  const progressPercentage = (fund.currentAmount / fund.targetAmount) * 100;
  const daysLeft = Math.ceil((new Date(fund.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-dark-700 group">
      <div className="relative overflow-hidden">
        <img
          src={fund.imageUrl}
          alt={fund.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-linear-to-r from-emerald-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {fund.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-xs rounded-full p-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {fund.title}
        </h3>
        
        <p className="text-gray-600 dark:text-dark-300 text-sm mb-4 line-clamp-3 leading-relaxed">
          {fund.description}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-dark-400">
            <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
            {fund.location}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-dark-400">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-emerald-400" />
              {fund.donors.length} donors
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-emerald-400" />
              {daysLeft > 0 && fund.status ? `${daysLeft} days left` : 'Ended'}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              ₹{fund.currentAmount.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 dark:text-dark-400">
              of ₹{fund.targetAmount.toLocaleString()}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-emerald-600 to-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          
          <div className="text-sm text-gray-500 dark:text-dark-400 mt-2 flex justify-between">
            <span>{progressPercentage.toFixed(1)}% funded</span>
            <span className="text-green-600 font-medium">
              ₹{(fund.targetAmount - fund.currentAmount).toLocaleString()} to go
            </span>
          </div>
        </div>
        
        <Link
          to={`/fund/${fund._id}`}
          className="w-full bg-linear-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-200 text-center block shadow-md hover:shadow-lg transform hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FundCard;