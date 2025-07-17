import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  BarChart3,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Calendar,
  MapPin,
  IndianRupee,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { backendDomain } from "../../App";
import { useEffect } from "react";

const RaiserDashboard = () => {
  const { user } = useContext(AuthContext);

  // Filter funds created by current user (mock data)
  const [userFunds, setUserFunds] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    if (userFunds.length != 0) {
      setTotalDonors(
        userFunds.reduce((sum, fund) => sum + fund.donors.length, 0)
      );
    }
    if(userTransactions.length!=0){
      setTotalRaised(
        userTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      )
    }
  }, [userFunds,userTransactions]);

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
            setUserTransactions(res.data.recieveTransactions.slice().reverse());
          });
      }
    };

    updateFund();
    updateTransactions();
  }, []);

  useEffect(() => {
    setActiveCampaigns(userFunds.filter((fund) => fund.status === true).length);
  }, [userFunds]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-linear-to-br  dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-200 mb-2">
                Campaign Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-dark-400">
                Manage your fundraising campaigns and track your impact
              </p>
            </div>
            <Link
              to="/raiser/create"
              className="mt-4 sm:mt-0 bg-linear-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Campaign
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-900">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Total Raised
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-200">
                  ₹{totalRaised.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 dark:bg-dark-800 dark:border-dark-900">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Total Donors
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-200">
                  {totalDonors}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 dark:bg-dark-800 dark:border-dark-900">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-200">
                  {activeCampaigns}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 dark:bg-dark-800 dark:border-dark-900">
            <div className="flex items-center">
              <div className="p-3 bg-linear-to-br from-orange-500 to-red-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-dark-400">
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-200">
                  85%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Campaigns */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-900">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-dark-200">
                  My Campaigns
                </h2>
                <Link
                  to="/raiser/campaigns"
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {userFunds.slice().reverse().slice(0, 3).map((fund, idx) => {
                  const progressPercentage =
                    (fund.currentAmount / fund.targetAmount) * 100;
                  const daysLeft = Math.ceil(
                    (new Date(fund.endDate).getTime() - new Date().getTime()) /
                      (1000 * 3600 * 24)
                  );

                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 dark:border-dark-900 rounded-xl p-4 hover:border-emerald-300 dark:hover:bg-emerald-900/30  transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={fund.imageUrl}
                          alt={fund.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-dark-200 mb-1">
                                {fund.title}
                              </h3>
                              <div className="flex items-center text-sm text-gray-500 dark:text-dark-400 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                {fund.location}
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                fund.status
                                  ? "bg-green-400 text-green-800"
                                  : "bg-gray-400 text-gray-800"
                              }`}
                            >
                              {fund.status}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-bold text-emerald-600">
                              ₹{fund.currentAmount.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-dark-400">
                              of ₹{fund.targetAmount.toLocaleString()}
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 mb-2">
                            <div
                              className="bg-linear-to-r from-emerald-600 to-green-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min(progressPercentage, 100)}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-dark-400">
                            <span>{fund.donors.length} donors</span>

                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-emerald-400" />
                              {daysLeft > 0 && fund.status ? `${daysLeft} days left` : "Ended"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {userFunds.length === 0 && (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 dark:text-dark-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-dark-300 mb-2">
                    No campaigns yet
                  </h3>
                  <p className="text-gray-500 dark:text-dark-400 mb-4">
                    Create your first campaign to start raising funds
                  </p>
                  <Link
                    to="/raiser/create"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Create Campaign
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Donations */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-900">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-dark-200">
                  Recent Donations
                </h2>
                <Link
                  to="/raiser/donations"
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {userTransactions.slice(0, 3).map((transaction, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg border dark:border-dark-900"
                  >
                    <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {transaction.donor.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-dark-200 text-sm">
                        {transaction.donor.name.charAt(0).toUpperCase()+transaction.donor.name.slice(1)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-dark-400">
                        {transaction.fund.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        ₹{transaction.amount}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-dark-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {userTransactions.length === 0 && (
                <div className="text-center py-6">
                  <IndianRupee className="h-8 w-8 text-gray-400 dark:text-dark-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-dark-500 text-sm">
                    No donations yet
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-900 mt-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-dark-200 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/raiser/create"
                  className="w-full flex items-center justify-center py-2 px-4 border border-emerald-300 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Link>
                <Link
                  to="/raiser/campaigns"
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 dark:text-dark-400 hover:bg-gray-50 dark:hover:bg-dark-700/20  transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Campaigns
                </Link>
                <Link
                  to="/raiser/donations"
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 dark:text-dark-400 hover:bg-gray-50 dark:hover:bg-dark-700/20  transition-colors"
                >
                  <IndianRupee className="h-4 w-4 mr-2" />
                  View Donations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiserDashboard;
