import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
    createOrder,
    getAllOrders,
    deleteOrder,
    getOrderById,
    updateOrderStatus,
    orderPayment

} from "../controllers/order.controllers";

const router = Router();

router
    .route("/")
    .get(verifyJWT, getAllOrders)
    .post(verifyJWT, createOrder)

router
    .route("/:id")
    .get(verifyJWT, getOrderById)
    .put(verifyJWT, updateOrderStatus)
    .delete(verifyJWT, deleteOrder)

router
    .route("/:id/pay")
    .get(verifyJWT, orderPayment)

export default router
