import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";

const createPayment = asyncHandler(async (req, res) => {
    const { amount, orderId, paymentMethod } = req.body

    if (!isNaN(parseFloat(amount)) || !orderId || !paymentMethod) {
        throw new ApiError('Missing required fields', 400)
    }

    const payment = await db.payment.create({
        data: {
            amount: parseFloat(amount),
            orderId: orderId as string,
            paymentMethod: paymentMethod as string,
            paymentStatus: 'SUCCEEDED',
            userId: req.user?.id as string
        }
    })

    res.status(201).json(new ApiResponse(201, { payment, success: true  }, 'Payment created successfully'))
})

const getPayments = asyncHandler(async (req, res) => {
    const payments = await db.payment.findMany()

    res.status(200).json(new ApiResponse(200, { payments, success: true  }, 'Payments retrieved successfully'))
})

const getPaymentById = asyncHandler(async (req, res) => {
    const payment = await db.payment.findUnique({
        where: {
            id: req.params.id
        }
    })

    if (!payment) {
        throw new ApiError('Payment not found', 404)
    }

    res.status(200).json(new ApiResponse(200, { payment, success: true  }, 'Payment retrieved successfully'))
})

const refundPayment = asyncHandler(async (req, res) => {
    const refundedPayment = await db.payment.update({
        where: {
            id: req.params.id
        },
        data: {
            paymentStatus: 'REFUNDED'
        }
    })

    if (!refundedPayment) {
        throw new ApiError('Payment not found', 404)
    }

    res.status(200).json(new ApiResponse(200, { refundedPayment, success: true  }, 'Payment refunded successfully'))
})

const updatePayment = asyncHandler(async (req, res) => {
    const id = req.params.id

    const payment = await db.payment.update({
        where: {
            id,
            userId: req.user?.id
        },
        data: req.body
    })

    res.status(200).json(new ApiResponse(200, { payment, success: true  }, 'Payment updated successfully'))
})

export {
    createPayment,
    getPayments,
    getPaymentById,
    refundPayment,
    updatePayment
}