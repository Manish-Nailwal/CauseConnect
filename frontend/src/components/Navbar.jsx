import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  X,
  User,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Plus,
  BarChart3,
  Moon,
  Sun,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "All Campaigns", href: "/funds" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const donatorItems = [
    { name: "View Profile", href: "/profile", icon: User },
    { name: "My Donations", href: "/transactions", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ];

  const raiserItems = [
    { name: "View Profile", href: "/profile", icon: User },
    { name: "Wallet", href: "/raiser/wallet", icon: CreditCard },
    { name: "My Campaigns", href: "/raiser/campaigns", icon: BarChart3 },
    { name: "Received Donations", href: "/raiser/donations", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ];

  const profileItems = user?.role === "raiser" ? raiserItems : donatorItems;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-dark-800 shadow-lg sticky top-0 z-50 border-b border-gray-100 dark:border-dark-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="shrink-0 flex items-center group">
              <div className="p-2 bg-linear-to-br from-emerald-500 to-green-600 rounded-lg group-hover:from-emerald-600 group-hover:to-green-700 transition-all duration-200">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                CauseConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 shadow-xs"
                    : "text-gray-700 dark:text-dark-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-dark-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 text-sm rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 p-2 hover:bg-gray-50 dark:hover:bg-dark-700 transition-all duration-200"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-100 dark:ring-emerald-800"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div className="text-left">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user.name}
                    </p>
                    <p className="text-xs text-emerald-600 capitalize">
                      {user.role}
                    </p>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl shadow-lg bg-white dark:bg-dark-800 ring-1 ring-black ring-opacity-5 focus:outline-hidden border border-gray-100 dark:border-dark-700">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-700 bg-linear-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-dark-400">
                          {user.email}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 px-2 py-1 rounded-full capitalize">
                            {user.role}
                          </span>
                          {user.role === "donator" && (
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                              ₹{user.totalDonated?.toLocaleString() || 0}{" "}
                              donated
                            </span>
                          )}
                          {user.role === "raiser" && (
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                              ₹{user.totalRaised?.toLocaleString() || 0} raised
                            </span>
                          )}
                        </div>
                      </div>
                      {profileItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsProfileOpen(false)}
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200"
                        >
                          <item.icon className="mr-3 h-4 w-4 text-gray-400 dark:text-dark-500 group-hover:text-emerald-500" />
                          {item.name}
                          {item.name === "Notifications" &&
                            user.notifications.filter((n) => !n.read).length >
                              0 && (
                              <span className="ml-2 w-2 h-2 bg-emerald-600 dark:bg-green-600 rounded-full inline-block"></span>
                            )}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 dark:border-dark-700 mt-2">
                        <button
                          onClick={handleLogout}
                          className="group flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                        >
                          <LogOut className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-500" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-dark-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-linear-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-dark-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-dark-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-dark-700 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-dark-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-dark-800">
            {/* Show navigation items only when profile is not expanded */}
            {!showMobileProfile && (
              <>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                        : "text-gray-700 dark:text-dark-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            )}

            {isAuthenticated ? (
              <div className="border-t border-gray-200 dark:border-dark-600 pt-4 mt-4">
                <button
                  onClick={() => setShowMobileProfile(!showMobileProfile)}
                  className="flex items-center w-full px-3 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-dark-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`transform transition-transform ${
                        showMobileProfile ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                </button>

                {/* Profile menu items - only show when expanded */}
                {showMobileProfile && (
                  <div className="mt-2 space-y-1">
                    {profileItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setShowMobileProfile(false);
                        }}
                        className="flex items-center px-6 py-2 text-base font-medium text-gray-600 dark:text-dark-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                      >
                        <item.icon className="mr-3 h-5 w-5 text-gray-400 dark:text-dark-500" />
                        {item.name}
                        {item.name === "Notifications" &&
                          user.notifications.filter((n) => !n.read).length >
                            0 && (
                            <span className="ml-2 w-2 h-2 bg-emerald-600 dark:bg-green-600 rounded-full inline-block"></span>
                          )}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMobileProfile(false);
                      }}
                      className="flex items-center w-full px-6 py-2 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="mr-3 h-5 w-5 text-red-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`border-t border-gray-200 dark:border-dark-600 pt-4 mt-4 space-y-2 ${
                  showMobileProfile ? "hidden" : ""
                }`}
              >
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-dark-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
