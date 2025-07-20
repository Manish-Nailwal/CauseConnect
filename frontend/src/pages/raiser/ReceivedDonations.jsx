import React, { useContext, useEffect, useState } from "react";
import {
  Download,
  Filter,
  Search,
  Calendar,
  User,
  Phone,
  Mail,
  Eye,
  IndianRupee,
  Check,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { backendDomain } from "../../App";
import { toast } from "react-toastify";
import { TfiLayoutLineSolid } from "react-icons/tfi";

const ReceivedDonations = () => {
  const { user, verifyUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFund, setFilterFund] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [userFunds, setUserFunds] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [totalReceived, setTotalReceived] = useState(0);

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
            setUserTransactions(res.data.recieveTransactions);
          });
      }
    };
    updateTransactions();
    updateFund();
  }, [user]);

  // const uniqueDonors = {};
  useEffect(() => {
    if (userTransactions.length != 0) {
      setTotalReceived(
        userTransactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        )
      );
    }
  }, [userTransactions]);

  const filteredTransactions = userTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.fund.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFund =
      filterFund === "all" || transaction.fund._id === filterFund;
    return matchesSearch && matchesFund;
  });
  const uniqueDonors = new Set(filteredTransactions.map((t) => t.donor._id))
    .size;

  const handleThanks = async () => {
    await axios
      .patch(`${backendDomain}/thank`, {
        tId: selectedDonation._id,
        oId: user._id,
      })
      .then((res) => {
        if (res.data.success) {
          const updatedTxn = { ...selectedDonation, thanked: true };
          setSelectedDonation(updatedTxn);
          verifyUser();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-linear-to-br dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-200 mb-4">
            Received Donations
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-400">
            Track all donations received for your campaigns and manage donor
            information.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-600">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Total Received
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-dark-200">
                  ₹{totalReceived.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 dark:bg-dark-800 dark:border-dark-600">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Unique Donors
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-dark-200">
                  {uniqueDonors}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 dark:bg-dark-800 dark:border-dark-600">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl">
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

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 dark:bg-dark-800 dark:border-dark-600">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-orange-500 to-red-600 rounded-xl">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Avg. Donation
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-dark-200">
                  ₹
                  {filteredTransactions.length > 0
                    ? Math.round(totalReceived / filteredTransactions.length)
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:bg-dark-800 dark:border-dark-600">
          <div className="flex flex-col flex-wrap sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-200 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search donors or campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border md:w-64 w-full  border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-dark-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-700 dark:focus:border-emerald-700  text-sm"
                />
              </div>

              <div className="flex items-center space-x-2 mt-1">
                <Filter className="h-4 w-4 text-gray-400 dark:text-dark-400" />
                <select
                  value={filterFund}
                  onChange={(e) => setFilterFund(e.target.value)}
                  className="border w-full border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-dark-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Campaigns</option>
                  {userFunds.map((fund, idx) => (
                    <option key={idx} value={fund._id}>
                      {fund.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="flex items-center mt-1 space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:bg-dark-800 dark:border-dark-600">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-600">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-200">
              Donation History ({filteredTransactions.length})
            </h2>
          </div>

          <div className="overflow-x-auto overflow-y-hidden">
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-400 dark:text-dark-400">
                <thead className="sticky bg-gray-50 dark:bg-dark-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white  dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-400">
                  {filteredTransactions
                    .slice()
                    .reverse()
                    .map((transaction, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 dark:hover:bg-dark-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {transaction.donor.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-dark-300">
                                {transaction.donor.name
                                  .charAt(0)
                                  .toUpperCase() +
                                  transaction.donor.name.slice(1)}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-dark-400">
                                ID: {transaction.donor._id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-dark-400">
                            {transaction.fund.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-green-600">
                            ₹{transaction.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-dark-800 dark:border-dark-600 dark:text-green-600 text-blue-800">
                            {transaction.payMethod}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setSelectedDonation(transaction);
                            }}
                            className="text-emerald-600 hover:text-emerald-900 dark:hover:text-green-400 flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <IndianRupee className="h-12 w-12 text-gray-400 dark:text-dark-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-300 mb-2">
                No donations found
              </h3>
              <p className="text-gray-500 dark:text-dark-400">
                No donations match your current filters. Try adjusting your
                search criteria.
              </p>
            </div>
          )}
        </div>

        {/* Donation Detail Modal */}
        {selectedDonation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 dark:border-dark-600">
            <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-200">
                  Donation Details
                </h3>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-dark-200"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {selectedDonation.donor.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-dark-200">
                      {selectedDonation.donor.name.charAt(0).toUpperCase() +
                        selectedDonation.donor.name.slice(1)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-dark-400">
                      Donor ID: {selectedDonation.donor._id}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-600 pt-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400 dark:text-dark-400" />
                    <span className="text-sm text-gray-600 dark:text-dark-400">
                      {selectedDonation.donor.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400 dark:text-dark-400" />
                    <span className="text-sm text-gray-600 dark:text-dark-400">
                      {selectedDonation.donor.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-4 w-4 text-gray-400 dark:text-dark-400" />
                    <span className="text-sm text-gray-600 dark:text-dark-400">
                      ₹{selectedDonation.amount} via{" "}
                      {selectedDonation.payMethod}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-dark-400" />
                    <span className="text-sm text-gray-600 dark:text-dark-400">
                      {new Date(selectedDonation.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 dark:border-dark-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-dark-200 mb-1">
                    Campaign
                  </p>
                  <p className="text-sm text-gray-600 dark:text-dark-400">
                    {selectedDonation.fund.title}
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-600 pt-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-dark-200 mb-1">
                    Transaction ID
                  </p>
                  <p className="text-sm text-gray-600 font-mono dark:text-dark-400">
                    {selectedDonation._id}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="flex-1 bg-gray-100 dark:bg-dark-700 dark:text-dark-200 dark:hover:text-dark-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                {!selectedDonation.thanked ? (
                  <button
                    onClick={async () => {
                      handleThanks(selectedDonation);
                    }}
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Send Thank You
                  </button>
                ) : (
                  <button
                    onClick={async () => {}}
                    className="flex-1 flex flex-row items-center justify-center border border-dark-600 cursor-not-allowed text-white py-2 px-4 rounded-lg "
                  >
                    Thanks delivered.
                    <div className=" ml-2 p-1 text-emerald-600 ] bg-emerald-100 dark:bg-dark-700 rounded-lg transition-colors">
                      <Check className="h-4 w-4" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceivedDonations;
