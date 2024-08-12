import { Router } from "express"
import { approveRestaurant, authenticateAdmin, getUnApprovedRestaurants, rejectRestaurant } from "../controllers/admin.controller"
import { verifyAdmin } from "../middlewares/adminAuth.middleware"

const router = Router()

router.use(verifyAdmin)

router
    .route('/restaurants/unapproved')
    .get(getUnApprovedRestaurants)

router
    .route('/restaurant/:id/approve')
    .put(approveRestaurant)

router
    .route('/restaurant/:id/reject')
    .put(rejectRestaurant)


router
    .route('/auth')
    .post(authenticateAdmin)


export default router