import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res, next) => {
  try {
    const { name, email, role, phone, password, joinDate } = req.body;
    const mail = email.toLowerCase();
    const existingUser = await User.findOne({ email: mail });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    let user = {};
    if (phone > 0) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        role,
        password,
        phone,
        joinDate,
      });
    } else {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        role,
        password,
        joinDate,
      });
    }
    const token = await user.generateToken();
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
      token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const mail = email.toLowerCase();
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ message: "Invalid Credential" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = await user.generateToken();
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user,
      token,
      userId: user._id.toString(),
    });
    next();
  } catch (error) {
    console.error(error);
  }
};
