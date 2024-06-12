import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addProductReview, getProductReviews } from "../controllers/review.controllers";

const router = Router()

router
    .route('/:productId')
    .get(getProductReviews)
    .post(verifyJWT,addProductReview)

export default router