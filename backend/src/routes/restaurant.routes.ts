import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addRestaurantMenuItem, createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, getRestaurantMenuItems, updateProfileImage, updateRestaurant } from "../controllers/restaurants.controllers";
import { upload } from "../middlewares/multer.middleware";

const router = Router()

router
    .route('/')
    .post(verifyJWT,upload.single('profileImage'),createRestaurant)
    .get(getAllRestaurants)

router
    .route('/:id')
    .get(getRestaurantById)
    .put(verifyJWT,updateRestaurant)
    .delete(verifyJWT,deleteRestaurant)

router
    .route('/:id/profileimage')
    .patch(verifyJWT,upload.single('profileImage'),updateProfileImage)

router
    .route('/:id/menu')
    .post(verifyJWT,upload.single('productImage'),addRestaurantMenuItem)
    .get(getRestaurantMenuItems)
export default router