import { Router } from "express";
import { getAllProducts, getProductById, setProductUnavailable, updateProduct } from "../controllers/product.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router
    .route("/")
    .get(getAllProducts)

router
    .route('/:id')
    .get(getProductById)
    .put(verifyJWT,updateProduct)
    .delete(verifyJWT,updateProduct)

router.route('/:id/unavailable').put(verifyJWT,setProductUnavailable)

export default router