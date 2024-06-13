import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { deleteReview, getReviewById, updateReview } from "../controllers/productReview.controller";

const router = Router()

router
    .route('/:id')
    .get(getReviewById)
    .put(verifyJWT, updateReview)
    .delete(verifyJWT, deleteReview)


export default router