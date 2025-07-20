import {
  newTransaction,
  sentThank,
  transactionInfo,
} from "../controller/TransactionController.js";

import express from "express";
const router = express.Router();
router.get("/transactions/:id", transactionInfo);

router.post("/transactions", newTransaction);
router.patch("/thank", sentThank)

export default router;
