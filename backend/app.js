import dotenv from "dotenv";
dotenv.config();
const DB_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import fundRoute from "./routes/fundRoute.js";

const app = express();
app.use(
  // cors({
  //   origin: process.env.FRONTEND_URL,
  //   methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  //   credentials: true,
  // })
  cors()
);
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", authRoute);
app.use("/", transactionRoute);
app.use("/", fundRoute);
app.use("/api/payment", paymentRoute);

// Route that will be used for self-ping
app.get("/api/keep-alive", (req, res) => {
  console.log("🔁 Self-ping received at", new Date().toLocaleTimeString());
  res.status(200).send("pong");
});

/* ------------------ SELF PING LOGIC ------------------ */

const SELF_URL =
  process.env.SELF_URL || `http://localhost:${PORT}`;

// Ping every 10 minutes (safe value)
const INTERVAL = 10 * 60 * 1000;

setInterval(async () => {
  try {
    const res = await fetch(`${SELF_URL}/api/keep-alive`);
    console.log("✅ Self-ping status:", res.status);
  } catch (error) {
    console.error("❌ Self-ping failed:", error.message);
  }
}, INTERVAL);


// Start the server
app.listen(PORT, () => {
  console.log("listening at port: " + PORT);
  console.log("http://localhost:" + PORT);
  console.log(process.env.FRONTEND_URL);
});
