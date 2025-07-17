import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const userVerification = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.userId)
      if (user) return res.json({status: true,user })
      else return res.json({ status: false })
    }
  })
}