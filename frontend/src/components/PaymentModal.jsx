import React, { useContext, useState } from "react";
import {
  X,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { backendDomain } from "../App";
import { FundContext } from "../context/FundContext";

const PaymentModal = ({ isOpen, onClose, fund }) => {
  const {updateFunds} = useContext(FundContext);
  const { user, verifyUser } = useContext(AuthContext);
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment Details, 3: Processing, 4: Success
  const [paymentData, setPaymentData] = useState({
    amount: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: user?.email || "",
    phone: user?.phone || "",
    anonymous: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    if(field=="amount" && value>10000){
      value = 10000
    }
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validateStep1 = () => {
    const amount = parseFloat(paymentData.amount);
    return amount && amount >= 5 && amount <= 10000;
  };

  const validateStep2 = () => {
    return (
      paymentData.cardNumber.replace(/\s/g, "").length === 16 &&
      paymentData.expiryDate.length === 5 &&
      paymentData.cvv.length === 3 &&
      paymentData.cardholderName.trim().length > 0
    );
  };

  const processPayment = async () => {
    setIsProcessing(true);
    setStep(3);
    if(fund.targetAmount-fund.currentAmount < parseFloat(paymentData.amount)){
      setError(`Payment failed. Donation amount exceeds the remaining goal of ₹${fund.targetAmount - fund.currentAmount}.`);
      setStep(2);
    }

    try {
      // Create transaction record
      const transaction = {
        fundId: fund._id,
        donorId: user._id,
        amount: parseFloat(paymentData.amount),
        date: new Date().toISOString().split("T")[0],
        type: "donation",
        status: "completed",
        payMethod: "DevezPay",
        cardLast4: paymentData.cardNumber.slice(-4),
        anonymous: paymentData.anonymous,
      };
      await axios
        .post(`${backendDomain}/transactions`, transaction)
        .then((res) => {
          if(!res.data.success){
            toast.error(res.data.message);
            return;
          }
          verifyUser();
        });

        updateFunds();
      // Simulate DevezPay API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setStep(4);
    } catch (err) {
      setError("Payment failed. Please try again.");
      setStep(2);
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      processPayment();
    }
  };

  const prevStep = () => {
    if (step > 1 && step < 3) {
      setStep(step - 1);
    }
  };

  const handleClose = ()=>{
    setPaymentData({
        amount: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
        email: user?.email || "",
        phone: user?.phone || "",
        anonymous: false,
      });
      setStep(1);
      onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-600">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-linear-to-r from-emerald-500 to-green-600 rounded-lg">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Donate with DevezPay
              </h3>
              <p className="text-sm text-gray-500 dark:text-dark-400">
                Secure payment processing
              </p>
            </div>
          </div>
          {step < 3 && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Campaign Info */}
        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-dark-600">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            {fund.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-dark-300">
            by {fund.organizer.name}
          </p>
        </div>

        {/* Step 1: Amount */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                Donation Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-dark-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="5"
                  max="10000"
                  value={paymentData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-dark-400 mt-1">
                Minimum ₹5 Maximum ₹10,000
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[250, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleInputChange("amount", amount.toString())}
                  className="py-2 px-4 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={paymentData.anonymous}
                onChange={(e) =>
                  handleInputChange("anonymous", e.target.checked)
                }
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="anonymous"
                className="text-sm text-gray-700 dark:text-dark-300"
              >
                Make this donation anonymous
              </label>
            </div>

            <button
              onClick={nextStep}
              disabled={!validateStep1()}
              className="w-full bg-linear-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* Step 2: Payment Details */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-emerald-600" />
              <span className="text-sm text-gray-600 dark:text-dark-300">
                Secured by DevezPay
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={paymentData.cardNumber}
                onChange={(e) =>
                  handleInputChange(
                    "cardNumber",
                    formatCardNumber(e.target.value)
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={paymentData.expiryDate}
                  onChange={(e) =>
                    handleInputChange(
                      "expiryDate",
                      formatExpiryDate(e.target.value)
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={paymentData.cvv}
                  onChange={(e) =>
                    handleInputChange("cvv", e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={paymentData.cardholderName}
                onChange={(e) =>
                  handleInputChange("cardholderName", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={prevStep}
                className="flex-1 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-dark-300 py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!validateStep2()}
                className="flex-1 bg-linear-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Pay ₹{paymentData.amount}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 3 && (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-6"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Processing Payment
            </h3>
            <p className="text-gray-600 dark:text-dark-300">
              Please wait while we process your donation...
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-dark-400">
              <Lock className="h-4 w-4" />
              <span>Secured by DevezPay</span>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 dark:text-dark-300 mb-6">
              Your donation of ₹{paymentData.amount} has been successfully
              processed.
            </p>
            <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-dark-300">
                You'll receive a confirmation email shortly with your donation
                receipt.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full bg-linear-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
