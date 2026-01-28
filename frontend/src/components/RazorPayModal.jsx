import React, { useState, useContext } from "react";
import { X, CreditCard, Heart } from "lucide-react";
import axios from "axios";
import { nanoid } from "nanoid";
import DonationAmountStep from "./DonationAmountStep";
import { AuthContext } from "../context/AuthContext";
import { FundContext } from "../context/FundContext";

const RazorpayModal = ({
  isOpen,
  onClose,
  fund,
  backendDomain,
  razorpayKey,
}) => {
  const { user, verifyUser } = useContext(AuthContext);
  const { updateFunds } = useContext(FundContext);
  const [amount, setAmount] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const startRazorpayPayment = async () => {
    try {
      setLoading(true);

      const orderRes = await axios.post(`${backendDomain}/api/payment/order`, {
        amount: Number(amount) * 100,
        currency: "INR",
        receipt: `DN_${nanoid(8).toUpperCase()}`,
      });


      const options = {
        key: razorpayKey,
        amount: orderRes.data.amount,
        currency: "INR",
        name: "ConnectCauses",
        description: fund.title,
        image: Heart,
        order_id: orderRes.data.id,

        handler: async function (response) {
          // 🔐 Always verify on backend
          await axios
            .post(`${backendDomain}/api/payment/verify`, {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              fundId: fund._id,
              donorId: user._id,
              amount,
              date: new Date().toISOString().split("T")[0],
              anonymous,
              type: "donation",
              status: "completed",
              payMethod: "RazorPay",
            })
            .then((res) => {
              if (!res.data.success) {
                toast.error(res.data.message);
                return;
              }
              verifyUser();
            });

          updateFunds();
          onClose();
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },

        notes: {
          fundTitle: fund.title,
        },

        theme: {
          color: "#00ff7f",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed", response.error);
        alert(response.error.description);
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Unable to start payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Donate via Razorpay</h3>
              <p className="text-sm text-gray-500">Secure checkout</p>
            </div>
          </div>

          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Campaign Info */}
        <div className="p-6 bg-emerald-50 border-b">
          <h4 className="font-semibold">{fund.title}</h4>
          <p className="text-sm text-gray-600">by {fund.organizer.name}</p>
        </div>

        {/* Amount Selection */}
        <DonationAmountStep
          amount={amount}
          anonymous={anonymous}
          onAmountChange={setAmount}
          onAnonymousChange={setAnonymous}
          onContinue={startRazorpayPayment}
        />

        {loading && (
          <div className="p-4 text-center text-sm text-gray-500">
            Initializing Razorpay…
          </div>
        )}
      </div>
    </div>
  );
};

export default RazorpayModal;
