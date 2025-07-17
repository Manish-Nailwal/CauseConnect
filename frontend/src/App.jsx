import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllFunds from "./pages/AllFunds";
import FundDetail from "./pages/FundDetail";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";
import RaiserDashboard from "./pages/raiser/RaiserDashboard";
import ReceivedDonations from "./pages/raiser/ReceivedDonations";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import CreateCampaign from "./pages/raiser/CreateCampaign";
import AuthProvider from "./context/AuthContext";
import FundProvider from "./context/FundContext";
import CampaignUpdates from "./pages/raiser/CampaignUpdates";
import WalletPage from "./pages/raiser/Wallet";

export const backendDomain =
  import.meta.env.VITE_BACK_END || `http://localhost:4000`;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FundProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/funds" element={<AllFunds />} />
                <Route path="/fund/:id" element={<FundDetail />} />
                <Route path="/update/:id" element= {<CampaignUpdates/>} />

                <Route path="/raiser/wallet" element= {<WalletPage />} />

                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/transactions"
                  element={
                    <ProtectedRoute>
                      <Transactions />
                    </ProtectedRoute>
                  }
                />

                {/* Raiser Routes */}
                <Route
                  path="/raiser/campaigns"
                  element={
                    <ProtectedRoute requiredRole="raiser">
                      <RaiserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/raiser/donations"
                  element={
                    <ProtectedRoute requiredRole="raiser">
                      <ReceivedDonations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/raiser/create"
                  element={
                    <ProtectedRoute requiredRole="raiser">
                      <CreateCampaign />
                    </ProtectedRoute>
                  }
                />

                {/* Placeholder Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <ToastContainer />
            </div>
          </BrowserRouter>
        </FundProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
