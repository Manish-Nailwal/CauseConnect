import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto"
import { newTransaction } from "./TransactionController.js";
dotenv.config();

export const orderAPI = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Order creation failed" });
    }

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyAPI = async(req,res)=>{
  const inp = req.body;
  
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
  sha.update(`${inp.razorpayOrderId}|${inp.razorpayPaymentId}`);

  const digest = sha.digest("hex");
  if(digest!=inp.razorpaySignature){
    return res.status(400).send({
      message: "Transaction is not legit!"
    })
  }
  newTransaction(req,res);
}