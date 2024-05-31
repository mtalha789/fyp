import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { addRestaurantMenuItem, createRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById, getRestaurantMenuItems, updateRestaurant } from "../controllers/restaurants.controllers";

const router = Router()

router
    .route('/')
    .post(verifyJWT,createRestaurant)
    .get(getAllRestaurants)

router
    .route('/:id')
    .get(getRestaurantById)
    .put(verifyJWT,updateRestaurant)
    .delete(verifyJWT,deleteRestaurant)

router
    .route('/:id/menu')
    .post(verifyJWT,addRestaurantMenuItem)
    .get(getRestaurantMenuItems)
export default router