import React, { useState, useEffect, useContext } from "react";
import {
  Wallet,
  DollarSign,
  TrendingUp,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Ban as Bank,
  Calendar,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { backendDomain } from "../../App";
const WalletPage = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [filter, setFilter] = useState("all");
  const [userTransactions, setUserTransactions] = useState([]);
  const [totalReceived, setTotalReceived] = useState(0);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const updateTransactions = async () => {
      if (user) {
        await axios
          .get(`${backendDomain}/transactions/${user._id}`, {
            params: { id: user._id, fund: "campaigns" },
          })
          .then((res) => {
            const allTransactions = [...res.data.recieveTransactions];
            setUserTransactions(allTransactions);
            setFilteredTransactions(
              allTransactions.filter((transaction) => {
                if (filter === "all") return true;
                if (filter === "recent") {
                  const transactionDate = new Date(transaction.date);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return transactionDate >= thirtyDaysAgo;
                }
                return true;
              })
            );
          });
      }
    };
    updateTransactions();
    loadWalletData();
  }, [user]);

  useEffect(() => {
    if (userTransactions.length > 0) {
      setTotalReceived(userTransactions.reduce((sum, t) => sum + t.amount, 0));
    }
  }, [userTransactions]);
  useEffect(() => {
    setWalletBalance(totalReceived - 0);
  }, [totalReceived]);

  const loadWalletData = () => {
    // Load withdrawal history
    const withdrawals = JSON.parse(
      localStorage.getItem("causeconnect_withdrawals") || "[]"
    );
    const userWithdrawals = withdrawals.filter((w) => w.userId === user?._id);

    // Calculate available balance (total received - total withdrawn)
    const totalWithdrawn = userWithdrawals
      .filter((w) => w.status === "completed")
      .reduce((sum, w) => sum + w.amount, 0);

    const pending = userWithdrawals
      .filter((w) => w.status === "pending")
      .reduce((sum, w) => sum + w.amount, 0);

    setTransactions(userTransactions);

    setPendingAmount(pending);
    setWithdrawalHistory(userWithdrawals);
  };

  const handleWithdrawal = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0 || amount > walletBalance || !bankAccount) {
      return;
    }

    const withdrawal = {
      id: `WTH_${Date.now()}`,
      userId: user._id,
      amount: amount,
      bankAccount: bankAccount,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      transactionId: `DVZ_WTH_${Date.now()}`,
      processingTime: "1-3 business days",
    };

    // Save withdrawal request
    const existingWithdrawals = JSON.parse(
      localStorage.getItem("causeconnect_withdrawals") || "[]"
    );
    existingWithdrawals.push(withdrawal);
    localStorage.setItem(
      "causeconnect_withdrawals",
      JSON.stringify(existingWithdrawals)
    );

    // Update state
    setPendingAmount((prev) => prev + amount);
    setWithdrawalHistory((prev) => [withdrawal, ...prev]);
    setShowWithdrawModal(false);
    setWithdrawAmount("");
    setBankAccount("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800";
      case "pending":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800";
      case "failed":
        return "text-red-600 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Wallet
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-300">
            Manage your donations and withdraw funds to your bank account.
          </p>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-300">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{walletBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-yellow-500 to-orange-600 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-300">
                  Pending Withdrawals
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{pendingAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-300">
                  Total Received
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹
                  {(
                    walletBalance +
                    pendingAmount +
                    withdrawalHistory
                      .filter((w) => w.status === "completed")
                      .reduce((sum, w) => sum + w.amount, 0)
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  disabled={walletBalance <= 0}
                  className="flex items-center justify-center space-x-2 bg-linear-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUpRight className="h-5 w-5" />
                  <span>Withdraw Funds</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 py-3 px-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>Download Statement</span>
                </button>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Donations
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400 dark:text-dark-500" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 dark:border-dark-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Time</option>
                    <option value="recent">Last 30 Days</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-hide">
                {filteredTransactions.slice().reverse().map((transaction, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                        <ArrowDownLeft className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {transaction.donor.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-dark-400">
                          {transaction.fund.title}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">
                        +₹{transaction.amount}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-dark-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-gray-400 dark:text-dark-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No donations yet
                  </h3>
                  <p className="text-gray-500 dark:text-dark-400">
                    Start promoting your campaigns to receive donations.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Withdrawal History */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Withdrawal History
              </h3>

              <div className="space-y-3">
                {withdrawalHistory.slice(0, 5).map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(withdrawal.status)}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          ₹{withdrawal.amount}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-dark-400">
                          {new Date(withdrawal.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        withdrawal.status
                      )}`}
                    >
                      {withdrawal.status}
                    </span>
                  </div>
                ))}
              </div>

              {withdrawalHistory.length === 0 && (
                <div className="text-center py-6">
                  <Bank className="h-8 w-8 text-gray-400 dark:text-dark-500 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-dark-400 text-sm">
                    No withdrawals yet
                  </p>
                </div>
              )}
            </div>

            {/* Bank Account Info */}
            <div className="bg-linear-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Withdrawal Info
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-dark-300">
                <p>• Minimum withdrawal: $10</p>
                <p>• Processing time: 1-3 business days</p>
                <p>• No withdrawal fees</p>
                <p>• Powered by DevezPay</p>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Withdraw Funds
                </h3>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-dark-400">
                      $
                    </span>
                    <input
                      type="number"
                      min="10"
                      max={walletBalance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-dark-400 mt-1">
                    Available: ${walletBalance.toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                    Bank Account
                  </label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="Account ending in 1234"
                  />
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">
                    Funds will be transferred to your bank account within 1-3
                    business days.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-dark-300 py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdrawal}
                    disabled={
                      !withdrawAmount ||
                      !bankAccount ||
                      parseFloat(withdrawAmount) > walletBalance
                    }
                    className="flex-1 bg-linear-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
