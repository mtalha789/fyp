import { Router } from "express";
import { verifyAdmin } from "../middlewares/adminAuth.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addDelivery, updateDeliveryStatus } from "../controllers/delivery.controllers";

const router = Router()

router
    .route('/')
    .get()
    .post(verifyJWT,addDelivery)

router.route('/:id').put(verifyJWT,updateDeliveryStatus)

export default router