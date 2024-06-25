import { Router } from "express";
import { verifyAdmin } from "../middlewares/adminAuth.middleware";
import { addRider, getRiderStats, getRiders } from "../controllers/rider.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router
    .route('/')
    .get(verifyAdmin,getRiders)
    .post(verifyAdmin,addRider)
    .get(verifyJWT,getRiderStats)

router
    .route('/:id')
    .get(verifyAdmin,getRiderStats)
export default router