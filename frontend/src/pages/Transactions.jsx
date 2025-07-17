import React, { useContext, useEffect, useState } from "react";
import {
  Calendar,
  Download,
  Filter,
  CreditCard,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { mockTransactions } from "../data/mockData";
import { AuthContext } from "../context/AuthContext";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { backendDomain } from "../App";
import axios from "axios";

const Transactions = () => {
  const { user } = useContext(AuthContext);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [userFunds, setUserFunds] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const updateFund = async () => {
      if (user) {
        await axios
          .get(`${backendDomain}/fund`, {
            params: { id: user._id, fund: "campaigns" },
          })
          .then((res) => {
            setUserFunds(res.data);
          });
      }
    };
    const updateTransactions = async () => {
      if (user) {
        await axios
          .get(`${backendDomain}/transactions/${user._id}`, {
            params: { id: user._id, fund: "campaigns" },
          })
          .then((res) => {
            const allTransactions = [
              ...res.data.recieveTransactions,
              ...res.data.donorTransactions,
            ];
            setTransactions(allTransactions);
          });
      }
    };
    updateTransactions();
    updateFund();
  }, []);

  // const uniqueDonors = {};
  useEffect(() => {
    if (transactions.length != 0 && user) {
      setUserTransactions(
        user?.role === "donator"
          ? transactions.filter((t) => t.donor._id === user._id)
          : transactions
      );

      // Raisers see all transactions for their campaigns
    }
  }, [transactions]);

  const filteredTransactions = userTransactions.filter((transaction) => {
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 dark:bg-dark-700 border-green-200 dark:border-dark-600";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const totalAmount = filteredTransactions
    .filter((t) => t.type === "donation" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-linear-to-br dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-200 mb-4">
            {user?.role === "donator" ? "My Donations" : "Transaction History"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-400">
            {user?.role === "donator"
              ? "Track all your donations and see the impact you've made."
              : "Monitor all transactions for your campaigns."}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-600">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  {user?.role === "donator"
                    ? "Total Donated"
                    : "Total Received"}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-dark-200">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 dark:border-dark-600 rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  This Month
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-dark-200">
                  <TfiLayoutLineSolid />
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 dark:border-dark-600 rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Transactions
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-dark-200">
                  {filteredTransactions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-800 dark:border-dark-600 rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-orange-500 to-red-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Success Rate
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-dark-200">
                  100%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white dark:bg-dark-800 dark:border-dark-600 rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400 dark:text-dark-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-dark-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Types</option>
                  <option value="donation">Donations</option>
                  <option value="refund">Refunds</option>
                </select>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-dark-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-dark-800 dark:border-dark-600 rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-600 ">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-200">
              Recent Transactions ({filteredTransactions.length})
            </h2>
          </div>

          <div className="overflow-x-auto overflow-y-hidden">
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-600">
                <thead className="bg-gray-50 dark:bg-dark-700 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    {user?.role === "raiser" && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Donor
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-600 ">
                  {filteredTransactions
                    .slice()
                    .reverse()
                    .map((transaction, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 dark:hover:bg-dark-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-dark-200">
                            {transaction.fund.title}
                          </div>
                        </td>
                        {user?.role === "raiser" && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-dark-200">
                              {transaction.donor.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-dark-400">
                              {transaction.donor.email}
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              transaction.type === "donation"
                                ? "bg-green-50 text-green-800 border-green-200 dark:bg-emerald-900/20 dark:border-dark-600 dark:text-green-600"
                                : "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:border-dark-600 dark:text-orange-600"
                            }`}
                          >
                            {transaction.type === "donation"
                              ? "Donation"
                              : "Refund"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-dark-400">
                          ₹{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1 capitalize">
                              {transaction.status}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-400 dark:text-dark-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-300 mb-2">
                No transactions found
              </h3>
              <p className="text-gray-500 dark:text-dark-400">
                {user?.role === "donator"
                  ? "Make your first donation to see transactions here."
                  : "No transactions match your current filters."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
