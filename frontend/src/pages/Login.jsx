import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart, Mail, Lock, Loader } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("causeconnect_user")) {
      navigate("/");
      toast.info("You are already logged in.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br dark:bg-linear-to-br from-emerald-50 via-white to-green-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-linear-to-br from-emerald-600 to-green-600 rounded-2xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-200">
            Sign in to your CauseConnect account
          </p>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-dark-700 transition-colors">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-dark-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-600  rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-dark-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white  transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 dark:text-dark-500 hover:text-gray-600 dark:hover:text-dark-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 dark:text-dark-500 hover:text-gray-600 dark:hover:text-dark-300" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300  dark:border-dark-600 rounded-sm bg-white dark:bg-dark-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-dark-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-emerald-600 hover:text-emerald-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-800 text-gray-500 dark:text-dark-400">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full flex justify-center py-3 px-4 border border-emerald-300 dark:border-emerald-700 rounded-xl shadow-xs text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-white dark:bg-dark-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
