import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Heart,
  Mail,
  Lock,
  User,
  Phone,
  Loader,
  UserCheck,
  Briefcase,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { UserRole } from "../types/index.js";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: UserRole.DONATOR,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const phoneValue = e.target.value;
      if (!/^\d{0,10}$/.test(phoneValue)) {
        return; 
      }
    }
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.warn("Passwords do not match")
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.warn("Password must be at least 6 characters")
      setIsLoading(false);
      return;
    }

    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      setError(err);
      setIsLoading(false);
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
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-green-50 dark:bg-linear-to-br dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-dark-900 transition-colors">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-linear-to-br from-emerald-600 to-green-600 rounded-2xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Join CauseConnect
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-200 ">
            Create your account and start making a difference
          </p>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-dark-900">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-400/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-3">
                Choose your role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: UserRole.DONATOR })
                  }
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === UserRole.DONATOR
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500"
                      : "border-gray-200 dark:border-dark-700 hover:border-emerald-300 text-gray-600 dark:text-dark-200"
                  }`}
                >
                  <UserCheck className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Donator</div>
                  <div className="text-xs text-gray-500 dark:text-dark-200">
                    Support causes
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: UserRole.RAISER })
                  }
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === UserRole.RAISER
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500"
                      : "border-gray-200 dark:border-dark-700 hover:border-emerald-300 text-gray-600 dark:text-dark-200"
                  }`}
                >
                  <Briefcase className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Raiser</div>
                  <div className="text-xs text-gray-500 dark:text-dark-200">
                    Create campaigns
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 rounded-xl focus:ring-2 dark:text-dark-200 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-dark-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-dark-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter your phone number"
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
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-dark-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-dark-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-dark-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-dark-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-dark-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-dark-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded-sm dark:bg-dark-700"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700 dark:text-dark-400"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-emerald-600 hover:text-emerald-500 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-emerald-600 hover:text-emerald-500 font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-dark-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-800 text-gray-500 dark:teext-dark-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-emerald-300 rounded-xl shadow-xs text-sm font-medium text-emerald-600 bg-white dark:bg-emerald-900/20 dark:hover:bg-emerald-900/50 hover:bg-emerald-50 transition-colors"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
