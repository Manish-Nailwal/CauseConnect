import { useContext, useEffect, useState } from "react";
import {
  Edit,
  MapPin,
  Calendar,
  Heart,
  Award,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import axios from "axios";
import { backendDomain } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { FundContext } from "../context/FundContext";
import { FaExternalLinkAlt } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate()
  const [achieve, setAchieve] = useState(false); // Achievements Status
  const { user } = useContext(AuthContext);
  const [userFunds, setUserFunds] = useState([]);
  const [supportedFunds, setSupportedFunds] = useState([]); // User's supported campaigns
  const [favFund, setFavFund] = useState([]);
  const { funds } = useContext(FundContext);

  if (!user) {
    return <div>Loading...</div>;
  }
  const api = async () => {
    if (user) {
      const fund = user.role == "donator" ? "supported" : "campaigns";
      await axios
        .get(`${backendDomain}/fund`, {
          params: { id: user._id, fund },
        })
        .then((res) => {
          setUserFunds(res.data);
        });
      await axios
        .get(`${backendDomain}/fund`, {
          params: { id: user._id, fund: "favorites" },
        })
        .then((res) => {
          setFavFund(res.data);
        });
    }
  };
  useEffect(() => {
    api();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role == "donator") {
      setSupportedFunds(favFund.slice().reverse());
    } else {
      setSupportedFunds(userFunds.slice().reverse());
    }
  }, [favFund, userFunds]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-linear-to-br dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md overflow-hidden mb-8 border border-gray-100 dark:border-dark-900">
          <div className="bg-linear-to-r from-emerald-600 to-green-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              <div className="relative -mt-16 mb-4 sm:mb-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white  dark:border-dark-600 shadow-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </h1>
                    <p className="text-gray-600 dark:text-dark-200">
                      {user.email}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-dark-400 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Member since{" "}
                      {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/50 border dark:border-emerald-900 text-emerald-800 dark:text-emerald-500 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center cursor-not-allowed">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Impact Statistics */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-200 mb-6">
                Your Impact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {user.role === "donator" ? (
                  <>
                    <div className="text-center p-4  bg-emerald-50 dark:bg-dark-700 rounded-xl border border-green-100 dark:border-dark-600">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ₹{user.totalDonated?.toLocaleString() || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-200">
                        Total Donated
                      </div>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-xl border border-blue-100 dark:bg-dark-700 dark:border-dark-600">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {user.supported.length || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-200">
                        Campaigns Supported
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-xl border border-orange-100 dark:bg-dark-700 dark:border-dark-600">
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        2.5K
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-200">
                        Lives Impacted
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center p-4 bg-emerald-50 rounded-xl border border-green-100 dark:bg-dark-700 dark:border-dark-600">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ₹{user.totalRaised?.toLocaleString() || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-200">
                        Total Raised
                      </div>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-xl border border-blue-100 dark:bg-dark-700 dark:border-dark-600">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {user.campaigns.length || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-200">
                        Campaigns Created
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-xl border border-orange-100 dark:bg-dark-700 dark:border-dark-600">
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        85%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-200">
                        Success Rate
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Supported/Created Campaigns */}
            <div className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-900 max-h-full overflow-auto ">
              <div className="sticky top-0 z-10 bg-white dark:bg-dark-800 pb-0.5">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-200 mb-6">
                  {user.role === "donator"
                    ? "Your Favorite Campaigns"
                    : "Your Campaigns"}
                </h2>
              </div>
              <div className="space-y-4 max-h-56 overflow-y-auto">
                {supportedFunds.length > 0 ? (
                  supportedFunds.map((fund, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-dark-600 rounded-xl hover:border-emerald-300 transition-colors"
                    >
                      <img
                        src={fund.imageUrl}
                        alt={fund.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-dark-200">
                          {fund.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-dark-400">
                          {fund.organizer.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="w-32 bg-gray-200 dark:bg-dark-700 rounded-full h-2 mr-3">
                            <div
                              className="bg-linear-to-r from-emerald-600 to-green-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  (fund.currentAmount / fund.targetAmount) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-dark-400">
                            {(
                              (fund.currentAmount / fund.targetAmount) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-emerald-600">
                          {user.role === "donator"
                            ? (<button onClick={()=>{navigate(`/fund/${fund._id}`)}}><FaExternalLinkAlt/></button>)
                            : `₹${fund.currentAmount.toLocaleString()}`}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-dark-400">
                          {user.role === "donator" ? "" : "Raised"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="text-center py-8">
                      <BarChart3 className="h-12 w-12 text-gray-400 dark:text-dark-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-300 mb-2">
                        No campaigns yet
                      </h3>
                      <p className="text-gray-500 dark:text-dark-400 mb-4">
                        {user.role == "donator"
                          ? "No favorites yet—start tracking the causes you care about."
                          : "Create your first campaign to start raising funds"}
                      </p>
                      <Link
                        to={
                          user.role == "donator" ? "/funds" : "/raiser/create"
                        }
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        {user.role == "donator"
                          ? "Find Causes"
                          : "Create Campaign"}
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100  dark:border-dark-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-200 mb-6">
                Achievements
              </h2>
              {achieve ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-dark-700 rounded-xl border border-yellow-100  dark:border-dark-600">
                      <Award className="h-8 w-8 text-yellow-600" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-dark-200">
                          First{" "}
                          {user.role === "donator" ? "Donation" : "Campaign"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-dark-400">
                          {user.role === "donator"
                            ? "Made your first donation"
                            : "Created your first campaign"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-100 dark:bg-dark-700 dark:border-dark-600">
                      <Heart className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-dark-200">
                          Generous Heart
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.role === "donator"
                            ? "Donated to 10+ campaigns"
                            : "Helped 100+ people"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-100 dark:bg-dark-700 dark:border-dark-600">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-dark-200">
                          Rising Star
                        </div>
                        <div className="text-sm text-gray-600 dark:text-dark-400">
                          {user.role === "donator"
                            ? "₹1000+ total donations"
                            : "₹10K+ raised"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 dark:bg-dark-800 dark:border-dark-600">
                      <Award className="h-8 w-8 text-gray-400" />
                      <div>
                        <div className="font-semibold text-gray-500 dark:text-dark-200">
                          Champion
                        </div>
                        <div className="text-sm text-gray-400 dark:text-dark-400">
                          {user.role === "donator"
                            ? "Donate ₹5000+ to unlock"
                            : "Raise ₹50K+ to unlock"}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-8 text-center border border-gray-700 bg-gray-50 dark:bg-dark-800 dark:border-dark-600 rounded-lg">
                    <h2 className="text-xl text-gray-600 dark:text-dark-400">
                      Coming Soon
                    </h2>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 dark:bg-dark-800 dark:border-dark-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-200 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-dark-400">
                    {user.role === "donator"
                      ? "Average Donation"
                      : "Average Campaign"}
                  </span>
                  <span className="font-semibold dark:text-emerald-300">
                    <TfiLayoutLineSolid />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-dark-400">
                    Favorite Category
                  </span>
                  <span className="font-semibold dark:text-dark-300">
                    <TfiLayoutLineSolid />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-dark-400">
                    {user.role === "donator"
                      ? "Last Donation"
                      : "Last Campaign"}
                  </span>
                  <span className="font-semibold dark:text-emerald-300">
                    <TfiLayoutLineSolid />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-dark-400">
                    Profile Views
                  </span>
                  <span className="font-semibold dark:text-dark-300">
                    <TfiLayoutLineSolid />
                  </span>
                </div>
              </div>
            </div>

            {/* Recommended Campaigns */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-900 max-h-full overflow-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-200 mb-4">
                {user.role === "donator"
                  ? "Recommended for You"
                  : "Trending Campaigns"}
              </h3>
              <div className="space-y-4">
                {funds.slice(2, 4).map((fund, idx) => (
                  <div
                    key={idx}
                    onClick={()=>{navigate(`/fund/${fund._id}`)}}
                    className="border border-gray-200 dark:border-dark-600 rounded-xl p-3 hover:border-emerald-300 transition-colors"
                  >
                    <img
                      src={fund.imageUrl}
                      alt={fund.title}
                      className="w-full h-24 rounded-sm object-cover mb-2"
                    />
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-dark-200 mb-1 line-clamp-2">
                      {fund.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-dark-400">
                      <span>{fund.category}</span>
                      <span>
                        {(
                          (fund.currentAmount / fund.targetAmount) *
                          100
                        ).toFixed(0)}
                        % funded
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
