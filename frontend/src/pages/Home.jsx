import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Globe,
  ArrowRight,
  TrendingUp,
  Award,
  Shield,
  IndianRupee,
} from "lucide-react";
import FundCard from "../components/FundCard";
import { AuthContext } from "../context/AuthContext";
import { FundContext } from "../context/FundContext";

const Home = () => {
  const {isAuthenticated, user } = useContext(AuthContext);
  const { funds } = useContext(FundContext);
  const featuredFunds = funds.slice(0, 3);
  const totalRaised = funds.reduce((sum, fund) => sum + fund.currentAmount, 0);
  const totalDonors = funds.reduce((sum, fund) => sum + fund.donors.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-emerald-600 via-green-600 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-linear-to-r from-emerald-600/30 to-green-600/30"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Making a Difference
              <span className="block bg-linear-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-emerald-100 leading-relaxed">
              Join our global community of changemakers. Support causes you care
              about and create lasting impact around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="./funds"
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Explore Causes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {isAuthenticated && user?.role === "raiser" ? (
                <Link
                  to="./raiser/create"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Campaign
                </Link>
              ) : isAuthenticated ? (
                <></>
              ) : (
                <Link
                  to="./signup"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Join Community
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-dark-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800">
              <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <IndianRupee className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ₹{totalRaised.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-dark-300 font-medium">
                Total Raised
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border border-blue-100 dark:border-blue-800">
              <div className="bg-linear-to-br from-blue-500 to-emerald-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {totalDonors.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-dark-300 font-medium">
                Active Donors
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-100 dark:border-emerald-800">
              <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {funds.length}
              </div>
              <div className="text-gray-600 dark:text-dark-300 font-medium">
                Active Campaigns
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-linear-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border border-blue-100 dark:border-blue-800">
              <div className="bg-linear-to-br from-blue-500 to-emerald-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                25+
              </div>
              <div className="text-gray-600 dark:text-dark-300 font-medium">
                Countries
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Campaigns
            </h2>
            <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
              Discover impactful causes that are making a real difference in
              communities around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFunds.map((fund, idx) => (
              <FundCard key={idx} fund={fund} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="./funds"
              className="bg-linear-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View All Campaigns
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-dark-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-dark-300">
              Simple steps to make a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-linear-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-100 dark:border-emerald-800">
              <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Discover Causes
              </h3>
              <p className="text-gray-600 dark:text-dark-300">
                Browse through verified campaigns and find causes that resonate
                with your values.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800">
              <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Make an Impact
              </h3>
              <p className="text-gray-600 dark:text-dark-300">
                Donate securely and watch your contribution make a real
                difference in people's lives.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-linear-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border border-blue-100 dark:border-blue-800">
              <div className="bg-linear-to-br from-blue-500 to-emerald-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Track Progress
              </h3>
              <p className="text-gray-600 dark:text-dark-300">
                Receive updates on how your donation is being used and see the
                impact you've created.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16 bg-linear-to-br from-gray-50 to-emerald-50 dark:from-dark-900 dark:to-emerald-900/20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CauseConnect?
            </h2>
            <p className="text-lg text-gray-600 dark:text-dark-300">
              Trusted by thousands of donors and fundraisers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Trusted
              </h3>
              <p className="text-gray-600 dark:text-dark-300">
                Bank-level security with verified campaigns and transparent fund
                tracking.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-linear-to-br from-blue-500 to-emerald-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Real Impact
              </h3>
              <p className="text-gray-600 dark:text-dark-300">
                See exactly how your donations are used with regular updates and
                progress reports.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Award Winning
              </h3>
              <p className="text-gray-600 dark:text-dark-300">
                Recognized platform with the highest success rate for
                fundraising campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
