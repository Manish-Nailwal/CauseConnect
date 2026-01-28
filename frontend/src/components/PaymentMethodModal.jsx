import { X } from "lucide-react";

const PaymentMethodModal = ({ isOpen, onClose, onDevezPay, onRazorPay }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 w-full max-w-md shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Payment Method
        </h2>

        <div className="space-y-4">
          <button
            onClick={onDevezPay}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Pay with DevezPay
          </button>

          <button
            onClick={onRazorPay}
            className="w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700  transition"
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
