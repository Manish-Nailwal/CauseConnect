import mongoose, { SchemaType } from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  fund: { type: Schema.Types.ObjectId, ref: "Fund" },
  donor: { type: Schema.Types.ObjectId, ref: "User" },
  organizer: { type: Schema.Types.ObjectId, ref: "User"},
  amount: { type: Number },
  date: { type: String, default: new Date().toISOString().split("T")[0] },
  type: { type: String },
  status: { type: String },
  payMethod: { type: String },
  cardLast4: { type: Number },
  anonymous: { type: Boolean, default: false },
  thanked: {type: Boolean, default: false} 
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
