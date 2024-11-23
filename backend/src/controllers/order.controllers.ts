import type { OrderItem, Product } from "@prisma/client";
import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";
import { sendEmail } from "../ustils/resend";
import { stripe } from "../ustils/stripe";

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
        data: { orderStatus : orderStatus == 'ACCEPTED' ? 'CONFIRMED' : orderStatus == 'DELIVERED' ? 'DELIVERED' : 'CANCELED' }
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

const getAllRestaurantOrders = asyncHandler(async (req, res) => {
    const restaurant_id = req.params.id
    
    if (restaurant_id == null) {
        throw new ApiError("Restaurant id is required", 400);
    }

    const restaurantOrders =await db.subOrder.findMany({
        where : {
            restaurantId: restaurant_id,
            restaurant: {
                owner_id : req.user?.id,
            },
            order: {
                deleted : false
            }
        }
    })

    if (restaurantOrders == null) {
        throw new ApiError("Orders not found", 404);
    }

    res
        .status(200)
        .json(new ApiResponse(200, restaurantOrders, "Orders fetched successfully"))

})

// Utility function to verify order ownership
const verifyOrderOwnership = async (orderId:string, userId:string) => {
    return db.subOrder.findUnique({
        where: {
            id: orderId,
            restaurant: {
                owner_id: userId
            }
        }
    });
};

// Utility function to update parent Order status based on subOrders status
const updateParentOrderStatus = async (parentOrderId:string) => {
    const subOrders = await db.subOrder.findMany({
        where: { orderId: parentOrderId },
        select: { status: true, orderItems: true }
    });

    const hasItems = subOrders.every(subOrder => subOrder.orderItems.length > 0);
    const allCanceled = subOrders.every(subOrder => subOrder.status === 'CANCELED');
    
    let newStatus;

    if (allCanceled) {
        newStatus = 'CANCELED';
    } else if (!hasItems) {
        newStatus = 'INCOMPLETE';
    } else {
        newStatus = 'PENDING';
    }

    // Update parent Order status if there's a change
    await db.order.update({
        where: { id: parentOrderId },
        data: { orderStatus: newStatus === 'PENDING' ? 'PENDING' : newStatus === 'INCOMPLETE' ? 'INCOMPLETE' : 'CANCELED' }
    });
};

// Function to edit an order's items
const editOrder = asyncHandler(async (req, res) => {
    const { id: orderId } = req.params;
    const { productIds } = req.body;

    // Verify the order exists and belongs to the user
    const order = await verifyOrderOwnership(orderId, req.user?.id as string);
    if (!order) {
        return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    // Update order by removing specified products
    const editedOrder = await db.subOrder.update({
        where: { id: orderId },
        data: {
            orderItems: {
                deleteMany: { productId: { in: productIds } }
            }
        }
    });

    // Update the parent Order status based on subOrders' new states
    await updateParentOrderStatus(order.orderId);

    return res.status(200).json({ message: 'Order updated', editedOrder });
});

// Function to cancel an order
const cancelOrder = asyncHandler(async (req, res) => {
    const { id: orderId } = req.params;

    // Verify the order exists and belongs to the user
    const order = await verifyOrderOwnership(orderId, req.user?.id as string);
    if (!order) {
        return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    // Update order status to 'CANCELED'
    const canceledOrder = await db.subOrder.update({
        where: { id: orderId },
        data: { status: 'CANCELED' }
    });

    // Update the parent Order status based on subOrders' new states
    await updateParentOrderStatus(order.orderId);

    return res.status(200).json({ message: 'Order canceled', canceledOrder });
});

const orderPayment = asyncHandler(async (req, res) => {
    const { id:orderId } = req.params;
    const { paymentMethod, amount } = req.body;

    if(paymentMethod == null || amount == null) {
        throw new ApiError('Missing required fields', 400)
    }

    if(paymentMethod?.toLowerCase() === 'card') {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseFloat(amount) * 100,
            currency: 'pkr',
            payment_method_types: ['card'],
        })

        if(paymentIntent == null) {
            throw new ApiError("Order not found", 404);
        }
        
        const payment = await db.payment.create({
            data: {
                amount: parseFloat(amount),
                orderId: orderId as string,
                paymentMethod: paymentMethod as string,
                paymentStatus: 'PENDING',
                stripePaymentId: paymentIntent.id,
                userId: req.user?.id as string
            }
        })

        res
            .status(200)
            .json(new ApiResponse(200, { clientSecret: paymentIntent.client_secret}, "Order payment intent created successfully"))
    }
    else if(paymentMethod?.toLowerCase() === 'cod') {
        const payment = await db.payment.create({
            data: {
                amount: parseFloat(amount),
                orderId: orderId as string,
                paymentMethod: 'COD',
                paymentStatus: 'PENDING',
                userId: req.user?.id as string
            }
        })

        res
            .status(200)
            .json(new ApiResponse(200, {}, "Order payment intent created successfully"))
    }
})  


export {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getAllRestaurantOrders,
    orderPayment,
    editOrder,
    cancelOrder
}