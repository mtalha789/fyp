import type { Server, Socket } from "socket.io";
import db from "../db";
import { ApiError } from "../ustils/ApiError";
import type { Product, SubOrder } from "@prisma/client";
import type { CustomSocket } from "../middlewares/authSocket.middleware";


interface OrderData {
    orderItems: {
        productId: string;
        quantity: number;
        restaurantId: string;
    }[];
}

interface SubOrderData {
    id: string;
    status: string;
    customerId: string;
}


const initializeSocketIo = (io: Server) => {
    return io.on('connection', (socket: CustomSocket) => {
        console.log('a user connected');

        socket.on('newOrder', async (orderData: OrderData) => {

            try {
                console.log(socket.id,'newOrder');
                
                console.log(orderData);
                
                const productIds= orderData.orderItems.map(item=>item.productId)

                const products = await db.product.findMany({
                    where: { id: { in: productIds }, deleted: false }
                })

                if (products.length !== orderData.orderItems.length) {
                    throw new ApiError("Some Products not found", 400);
                }

                const orderItems = orderData.orderItems.map((item: any) => {
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

                const restaurants = [...new Set(products.map((product) => product.restaurant_id))];

                let subOrders: any = []
                restaurants.forEach((restaurant) => {
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

                const order = await db.order.create({
                    data: {
                        userId: socket.user?.id as string,
                        totalAmount: orderItems.reduce((acc, item) => acc + item.totalAmount, 0),
                        // subOrder : subOrders.forEach(subOrder=>{})
                        subOrder: {
                            create: subOrders.map((subOrder: any) => ({
                            orderItems : {
                                create  : subOrder.orderItems
                            },
                            restaurantId : subOrder.restaurantId
                        })),
                        },
                        orderStatus: "PENDING"
                    }
                })

                if (!order) {
                    throw new ApiError("Something went wrong", 500);
                }
                restaurants.forEach((restaurant) => {
                    const restaurantSocket = io.to(restaurant);

                    const restaurantOrder = {
                        orderItems: orderData.orderItems.filter((orderItem) => orderItem.restaurantId === restaurant),
                        cutomerId : socket.user?.id
                    }

                    restaurantSocket.emit('acceptOrder', restaurantOrder);
                })
            } catch (error) {
                console.log(error);
            }
        })

        //event to check response of restaurnt
        socket.on('updateSubOrder', async (subOrderData: SubOrderData) => {
            try {
                const restaurantOrder = await db.subOrder.update({
                    where: {
                        id: subOrderData.id as string,
                        restaurant: {
                            owner_id: socket.user?.id,
                        }
                    },
                    data: {
                        status: subOrderData.status == 'accepted' ? 'CONFIRMED' : 'CANCELED',
                    }
                })

                const userSocket = socket.to(subOrderData.customerId)
                userSocket.emit('restaurantResponse', restaurantOrder)
            } catch (error) {
                console.log(error);
            }
        })

        //TODO:Write event to check 

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}

export {
    initializeSocketIo
}