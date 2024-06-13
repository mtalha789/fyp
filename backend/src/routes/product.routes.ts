import { Router } from "express";
import { addProductReview, deleteProduct, getAllProducts, getProductById, getProductReviews, toggleProductUnavailability, updateProduct, updateProductImage } from "../controllers/product.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router()

router
    .route("/")
    .get(getAllProducts)

router
    .route('/:id')
    .get(getProductById)
    .put(verifyJWT,updateProduct)
    .delete(verifyJWT,deleteProduct)

router.route('/:id/toggle-unavailable').put(verifyJWT,toggleProductUnavailability)
router.route('/:id/product-image').put(verifyJWT,upload.single('image'),updateProductImage)

router
    .route('/:id/review')
    .get(getProductReviews)
    .post(verifyJWT,addProductReview)

export default router