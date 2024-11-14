import { Router } from "express";
import { createPayment, getPayments, getPaymentById, refundPayment, updatePayment } from "../controllers/payment.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyAdmin } from "../middlewares/adminAuth.middleware";

const router = Router()

router
    .route('/')
    .get(verifyAdmin, getPayments)
    .post(verifyJWT, createPayment)

router
    .route('/:id')
    .get(verifyJWT, getPaymentById)
    .post(verifyJWT, updatePayment)

router
    .route('/:id/refund')
    .post(verifyAdmin, refundPayment)

export default router