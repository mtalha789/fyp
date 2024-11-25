import { Router } from "express"
import { approveRestaurant, authenticateAdmin, deleteUser, getOrders, getRiders, getUnApprovedRestaurants, getUsers, rejectRestaurant } from "../controllers/admin.controllers"
import { verifyAdmin } from "../middlewares/adminAuth.middleware"

const router = Router()

router
    .route('/restaurants/unapproved')
    .get(verifyAdmin, getUnApprovedRestaurants)

router
    .route('/users')
    .get(verifyAdmin, getUsers)

router
    .route('/orders')
    .get(verifyAdmin, getOrders)

router
    .route('/user/:id')
    .delete(verifyAdmin, deleteUser)

router
    .route('/restaurant/:id/approve')
    .put(verifyAdmin, approveRestaurant)

router
    .route('/restaurant/:id/reject')
    .put(verifyAdmin, rejectRestaurant)

router
    .route('/riders')
    .get(verifyAdmin, getRiders)

router
    .route('/auth')
    .post(authenticateAdmin)


export default router