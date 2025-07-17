import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Your Name is required"],
  },
  totalDonated: {type: Number, default: 0},
  totalRaised: {type: Number, default: 0},
  email: {
    type: String,
    required: [true, "Your mail-id is required"],
    unique: true,
  },
  role: {
    type: String,
    required: [true, "Your role is required"],
  },
  phone: { type: Number },
  avatar: {
    type: String,
    default:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  joinDate: { type: String },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  transaction: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Fund",
    },
  ],
  supported: [
    {
      type: Schema.Types.ObjectId,
      ref: "Fund",
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Fund",
    },
  ],
  totalDonated: { type: Number, default: 0 },
  totalRaised: { type: Number, default: 0 },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model("User", userSchema);

export default User;
