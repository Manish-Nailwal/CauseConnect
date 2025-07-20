import { Signup, Login  } from "../controller/AuthController.js";
import { addFav, dNotify, dNotifyAll, read, readAll, removeFav, unRead } from "../controller/UserController.js";
import { userVerification } from "../util/middleware.js";
import express from "express";
const router = express.Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/auth', userVerification);

router.patch("/addFav", addFav );
router.patch("/removeFav", removeFav);

router.patch("/read",read);
router.patch("/unread",unRead);
router.delete("/notify",dNotify);
router.delete("/notifyAll",dNotifyAll);
router.patch("/readAll", readAll);

export default router;