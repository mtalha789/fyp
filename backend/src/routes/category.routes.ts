import { Router } from "express";
import { createCategory, getAllCategories, getProductsByCategory } from "../controllers/category.controllers";
// import { verifyAdmin } from "../middlewares/adminAuth.middleware";
import { verifyUser } from "../middlewares/authSocket.middleware";

const router = Router();

router
    .route("/")
    .get(getAllCategories)
    .post(verifyUser,createCategory)

router
    .route("/:id/products")
    .get(getProductsByCategory)

export default router;