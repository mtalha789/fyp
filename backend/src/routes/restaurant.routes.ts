import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
    addRestaurantAddress,
    addRestaurantMenuItem,
    addRestaurantReview,
    addTimeSlot,
    createRestaurant,
    deleteRestaurant,
    getAllRestaurants,
    getRestaurantById,
    getRestaurantMenuItems,
    getRestaurantOrders,
    getRestaurantReviews,
    restaurantSalesReport,
    updateProfileImage,
    updateRestaurant
} from "../controllers/restaurants.controllers";
import { upload } from "../middlewares/multer.middleware";

const router = Router()

router
    .route('/')
    .post(verifyJWT, upload.single('profileImage'), createRestaurant)
    .get(getAllRestaurants)

router
    .route('/:id')
    .get(getRestaurantById)
    .put(verifyJWT, updateRestaurant)
    .delete(verifyJWT, deleteRestaurant)

router
    .route('/:id/profileimage')
    .patch(verifyJWT, upload.single('profileImage'), updateProfileImage)

router
    .route('/:id/menu')
    .post(verifyJWT, upload.single('productImage'), addRestaurantMenuItem)
    .get(getRestaurantMenuItems)

router
    .route('/:id/reviews')
    .get(getRestaurantReviews)
    .post(verifyJWT, addRestaurantReview)

router
    .route('/:id/address')
    .post(verifyJWT, addRestaurantAddress)
// .get(getRes)

router
    .route('/:id/sales')
    .get(verifyJWT, restaurantSalesReport)

router
    .route('/:id/orders')
    .get(verifyJWT, getRestaurantOrders)

router
    .route('/:id/timeslots')
    .post(verifyJWT, addTimeSlot)


export default router