import express from 'express'
import { orderAPI, verifyAPI } from '../controller/PaymentController.js';
const router = express.Router()

router.post('/order',orderAPI)
router.post('/verify',verifyAPI)



export default router;