import { Router } from "express";
import { createCategory, getAllCategories, getProductsByCategory } from "../controllers/category.controllers";
import { verifyAdmin } from "../middlewares/adminAuth.middleware";

const router = Router();

router
    .route("/")
    .get(getAllCategories)
    .post(verifyAdmin,createCategory)

router
    .route("/:id/products")
    .get(getProductsByCategory)

export default router;