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
import fundRoute from "./routes/fundRoute.js";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
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

// Start the server
app.listen(PORT, () => {
  console.log("listening at port: " + PORT);
  console.log("http://localhost:" + PORT);
  console.log(process.env.FRONTEND_URL);
});
