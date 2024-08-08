import { Router } from "express"
import { authenticateAdmin } from "../controllers/admin.controller"

const router = Router()

router
    .post('/auth',authenticateAdmin)

export default router