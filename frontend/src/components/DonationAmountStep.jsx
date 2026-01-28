// components/DonationAmountStep.jsx
import React from "react";

const DonationAmountStep = ({
  amount,
  anonymous,
  onAmountChange,
  onAnonymousChange,
  onContinue,
}) => {
  const isValidAmount = () => {
    const val = parseFloat(amount);
    return val && val >= 5 && val <= 10000;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
          Donation Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-dark-400">
            ₹
          </span>
          <input
            type="number"
            min="5"
            max="10000"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            placeholder="0.00"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-dark-400 mt-1">
          Minimum ₹5 · Maximum ₹10,000
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[250, 500, 1000].map((amt) => (
          <button
            key={amt}
            onClick={() => onAmountChange(amt.toString())}
            className="py-2 px-4 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
          >
            ₹{amt}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => onAnonymousChange(e.target.checked)}
          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label className="text-sm text-gray-700 dark:text-dark-300">
          Make this donation anonymous
        </label>
      </div>

      <button
        onClick={onContinue}
        disabled={!isValidAmount()}
        className="w-full bg-linear-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default DonationAmountStep;
