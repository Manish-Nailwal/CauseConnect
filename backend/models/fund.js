import mongoose from "mongoose";
const Schema = mongoose.Schema;

const updatesSchema = new Schema({
  title: { type: String },
  content: { type: String },
  date: { type: Date, default: Date.now },
});

const fundSchema = new Schema({
  title: { type: String },
  description: { type: String },
  category: { type: String },
  targetAmount: { type: Number },
  currentAmount: { type: Number, default: 0 },
  imageUrl: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  endDate: { type: Date },
  status: { type: Boolean, default: true },
  story: { type: String },
  updates: [updatesSchema],
  beneficiaryInfo: { type: String },
  expectedImpact: { type: String },
  fundUsage: { type: String },
  tags: [{ type: String }],
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  donors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

fundSchema.methods.checkStatus = async function () {
  const now = new Date();
  if (now > this.endDate || this.currentAmount >= this.targetAmount) {
    this.status = false;
    await this.save();
  }
};

const Fund = mongoose.model("Fund", fundSchema);
export default Fund;
