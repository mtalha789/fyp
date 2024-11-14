import type { OrderItem, Product } from "@prisma/client";
import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";
import { sendEmail } from "../ustils/resend";

interface OrderItems {
    productId: string;
    quantity: number;
    restaurantId: string;
    priceAtOrder: number;
    totalAmount: number;
}
const getAllOrders = asyncHandler(async (req, res) => {
    const user = req.user;

    const orders = await db.order.findMany({
        where: { userId: user?.id as string },
        include: { _count: { select: { subOrder: true } },subOrder: true },
    })

    if (orders == null) {
        throw new ApiError("Orders not found", 404);
    }

    res
        .status(200)
        .json(new ApiResponse(200, orders, "Orders fetched successfully"))
})

const createOrder = asyncHandler(async (req, res) => {
    const { items } = req.body;

    if (!items || items.length === 0) {
        throw new ApiError("All fields are required", 400);
    }

    const productIds = items.map((item: any) => item.productId);

    const products = await db.product.findMany({
        where: { id: { in: productIds }, deleted: false },
    })

    if (products.length !== items.length) {
        throw new ApiError("Some Products not found", 404);
    }

    const orderItems: OrderItems[] = items.map((item: OrderItems) => {
        const product = products.find((p: Product) => p.id === item.productId);
        if (!product) {
            throw new ApiError(`Product with id ${item.productId} not found`, 404);
        }
        return {
            productId: item.productId,
            priceAtOrder: product.price,
            quantity: item.quantity,
            totalAmount: item.quantity * Number(product.price),
            restaurantId: product.restaurant_id
        }
    })

    const restaurantIds = [...new Set(products.map((product) => product.restaurant_id))];

    const restaurants = await db.restaurant.findMany({
        where: { id: { in: restaurantIds } }
    })

    let subOrders: {
        restaurantId: string,
        orderItems: any[]
    }[] = []
    restaurantIds.forEach((restaurant) => {
        const restaurantOrder = orderItems.filter(item => item.restaurantId === restaurant).map(order => ({
            productId: order.productId,
            quantity: order.quantity,
            totalAmount: order.totalAmount,
            priceAtOrder: order.priceAtOrder
        }))
        subOrders.push({
            restaurantId: restaurant,
            orderItems: restaurantOrder
        })

    })

    const newOrder = await db.order.create({
        data: {
            userId: req.user?.id as string,
            totalAmount: orderItems.reduce((acc, item) => acc + item.totalAmount, 0),
            subOrder: {
                create: subOrders.map((subOrder:any) => ({
                    orderItems: {
                        create: subOrder?.orderItems
                    },
                    restaurantId: subOrder.restaurantId,
                    totalAmount: subOrder.orderItems.reduce((acc: number, item:OrderItems) => acc + item.totalAmount, 0),
                }))
            },
            orderStatus: "PENDING"
        }
    })
    
    if (newOrder == null) {
        throw new ApiError("Error while creating order", 500);
    }

    subOrders.forEach(async(subOrder) => {
        const restaurantEmail = restaurants.find(restaurant => restaurant.id == subOrder.restaurantId)?.corporateEmail

        await sendEmail(restaurantEmail as string,'New Order','Goto restaurant portal for new orders' )
    })

    res
        .status(201)
        .json(new ApiResponse(201, newOrder, "Order created successfully"))
})

const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await db.order.findUnique({
        where: { id, userId: req.user?.id as string, deleted: false, },
        include: { subOrder: true }
    })
    if (order == null) {
        throw new ApiError("Order not found", 404);
    }
    res
        .status(200)
        .json(new ApiResponse(200, order, "Order fetched successfully"))
})

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const orderStatus = req.body?.orderStatus?.toUpperCase();

    if (orderStatus !== "ACCEPTED" && orderStatus !== 'DELIVERED' && orderStatus !== "CANCELED" && orderStatus !== "PENDING") {
        throw new ApiError("Order status can only be ACCEPTED or REJECTED", 400);
    }
    const order = await db.order.update({
        where: { id, userId: req.user?.id as string, deleted: false, },
        data: { orderStatus : orderStatus == 'ACCEPTED' ? 'CONFIRMED' : 'CANCELED' }
    })
    if (order == null) {
        throw new ApiError("Order not found", 404);
    }
    res
        .status(200)
        .json(new ApiResponse(200, order, "Order updated successfully"))
})

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await db.order.update({
        where: { id, userId: req.user?.id as string, deleted: false, },
        data: { deleted: true }
    })
    if (order == null) {
        throw new ApiError("Order not found", 404);
    }
    res
        .status(200)
        .json(new ApiResponse(200, order, "Order deleted successfully"))
})

export {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder
}