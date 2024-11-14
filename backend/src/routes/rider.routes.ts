import { Router } from "express";
import { verifyAdmin } from "../middlewares/adminAuth.middleware";
import { addRider, applyAsRider, getRiderStats, getRiders } from "../controllers/rider.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router
    .route('/')
    .get(verifyAdmin, getRiders)
    .post(verifyJWT, applyAsRider)

router
    .route('/stats')
    .get(verifyJWT, getRiderStats)

router
    .route('/:id')
    .get(verifyAdmin, getRiderStats)
    .post(verifyAdmin, addRider)


export default router