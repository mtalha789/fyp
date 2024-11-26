import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";

const addDelivery = asyncHandler(async (req, res) => {
    const { orderId, riderId } = req.body

    if (!orderId || !riderId) {
        throw new ApiError("Invalid request", 400)
    }
    const delivery = await db.delivery.create({
        data: {
            orderId,
            deliveryPersonId: riderId
        }
    })
    res
        .status(201)
        .json(new ApiResponse(201, {delivery, success: true }, "Delivery created successfully"))
})

const updateDeliveryStatus = asyncHandler(async (req, res) => {
    const { id:deliveryId } = req.params
    const status = req.body?.status?.toUpperCase()

    if(status !== "COMPLETED" || status !== "CANCELLED" || status !== "IN_PROGRESS") {
        throw new ApiError("Invalid request", 400)
    }
    const delivery = await db.delivery.update({
        where: {
            id: deliveryId
        },
        data: {
            status: "COMPLETED"
        }
    })
    res
        .status(201)
        .json(new ApiResponse(201, {delivery, success: true }, "Delivery fulfilled successfully"))
})

export {
    addDelivery,
    updateDeliveryStatus,
}