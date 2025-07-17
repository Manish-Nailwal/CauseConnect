import { Signup, Login  } from "../controller/AuthController.js";
import { addFav, removeFav } from "../controller/UserController.js";
import { userVerification } from "../util/middleware.js";
import express from "express";
const router = express.Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/auth', userVerification);

router.patch("/addFav", addFav );
router.patch("/removeFav", removeFav)

export default router;