import {
  newTransaction,
  transactionInfo,
} from "../controller/TransactionController.js";

import express from "express";
const router = express.Router();
router.get("/transactions/:id", transactionInfo);

router.post("/transactions", newTransaction);

export default router;
