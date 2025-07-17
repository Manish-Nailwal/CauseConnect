import {
  AllFunds,
  CreateFund,
  FundInfo,
  getFunds,
} from "../controller/FundController.js";
import express from "express";
const router = express.Router();
import cloudinary from "../util/cloudConfig.js";
import multer from "multer";

import { CloudinaryStorage } from "multer-storage-cloudinary";
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "CauseConnect",
    allowedFormat: ["jpeg", "jpg", "png", "pdf"],
  },
});

const upload = multer({ storage });

// Route to list a new fund
router.post("/create/:id", upload.single("image"), CreateFund);

// Route to get all funds
router.get("/campaign", AllFunds);

// Route to get fund info by ID
router.get("/campaignInfo/:id", FundInfo);

router.get("/fund", getFunds);

export default router;
