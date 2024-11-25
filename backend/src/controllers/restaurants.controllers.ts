import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";
import { deleteOnFirebase, uploadOnFirebase } from "../ustils/firebase";
import fs from 'fs/promises'

const createRestaurant = asyncHandler(async (req, res) => {
    const { name, phone, email, minOrderPrice } = req.body

    if (!name || !phone || !email || !Number(minOrderPrice)) {
        throw new ApiError("Please provide all values", 400)
    }

    const file = req.file

    if (!file) {
        throw new ApiError('Please provide profile image', 400)
        file?.path && await fs.unlink(file?.path as string)
    }

    const imageUrl = await uploadOnFirebase(file)
    const minimumOrderPrice = parseInt(minOrderPrice)

    if (isNaN(minimumOrderPrice)) {
        throw new ApiError('Please provide valid minimum order price', 400)
    }

    if(req.user?.role !== 'Seller'){
        const owner = await db.user.update({
            where: { id: req.user?.id as string },
            data: {
                role: 'Seller'
            }
        })
    
        if (owner == null) {
            throw new ApiError('User does not exist', 400)
            file?.path && await fs.unlink(file?.path as string)
        }
    }
    const restaurant = await db.restaurant.create({
        data: {
            name: name as string,
            phone: phone as string,
            owner_id: req.user?.id as string,
            corporateEmail: email as string,
            imageUrl,
            minimumOrderPrice,
        }
    })

    if (restaurant == null) {
        throw new ApiError('Error creating restaurant', 500)
        file?.path && await fs.unlink(file?.path as string)
    }

    res
        .status(200)
        .json(new ApiResponse(200, { restaurant }, 'Created Restaurant Successfully'))
})

const addTimeSlot = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { day, fromTime, toTime } = req.body

    if (!day || !fromTime || !toTime) {
        throw new ApiError('Please provide all values', 400)
    }

    if (fromTime >= toTime) {
        throw new ApiError('End time should be greater than start time', 400)
    }

    const dayOfWeek = parseInt(day)

    const timeSlot = await db.timeSlot.create({
        data: {
            dayOfWeek,
            startTime: fromTime,
            endTime: toTime,
            restaurantId: id
        }
    })
    if (timeSlot == null) {
        throw new ApiError('Error creating time slot', 500)
    }
    res
        .status(200)
        .json(new ApiResponse(200, { timeSlot }, 'Created Time Slot Successfully'))
})

const getAllRestaurants = asyncHandler(async (req, res) => {
    const { search, city } = req.query

    const restaurants = await db.restaurant.findMany({
        where: {
            deleted: false,
            approved: true,
            name: { contains: search as string, mode: 'insensitive' },
            address: { 
                some: { 
                city: { contains: city as string, mode: 'insensitive' } 
                }
            } 
        },
            select: {
                id: true,
                name: true,
                phone: true,
                corporateEmail: true,
                imageUrl: true,
                minimumOrderPrice: true,
                reviews: {
                    select: {
                        rating: true,
                        user: { select: { id: true, username: true } },
                        comment: true
                    }
                },
            },
        })
    if (restaurants == null) {
        throw new ApiError('Error getting restaurants', 500)
    }
    res
        .status(200)
        .json(new ApiResponse(200, { restaurants }, 'Fetched Restaurants Successfully'))
})

const getRestaurantById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const restaurant = await db.restaurant.findUnique({
        where: { id: id as string, deleted: false, approved: true },
        select: {
            id: true,
            name: true,
            phone: true,
            corporateEmail: true,
            imageUrl: true,
            minimumOrderPrice: true,
            timeSlots: {
                select: {
                    startTime: true,
                    endTime: true,
                    dayOfWeek: true
                }
            },
            reviews: {
                select: {
                    rating: true,
                    user: { select: { id: true, username: true, fullname: true, avatar: true } },
                    comment: true,
                    createdAt: true
                }
            },
            products: {
                where: { isAvailable: true, deleted: false },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    imagePath: true,
                    _count: {
                        select: { orderItems: true }
                    }
                }
            }
        },
    })
    if (restaurant == null) {
        throw new ApiError('Restaurant does not exists', 400)
    }
    res
        .status(200)
        .json(new ApiResponse(200, { restaurant }, 'Fetched Restaurant Successfully'))
})

const updateRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, phone, email } = req.body
    const updatedRestaurant = await db.restaurant.update({
        where: { id: id as string, deleted: false, owner_id: req.user?.id as string, approved: true },
        data: {
            name: name as string,
            phone: phone as string,
            corporateEmail: email as string
        }
    })
    if (updateRestaurant == null) {
        throw new ApiError('Restaurant does not exists or unauthorized request', 400)
    }
    res
        .status(200)
        .json(new ApiResponse(200, { updatedRestaurant }, 'Updated Restaurant Successfully'))
})

const deleteRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params

    const restaurant = await db.restaurant.update({
        where: { id: id as string, owner_id: req.user?.id as string, deleted: false, approved: true },
        data: {
            deleted: true
        }
    })
    if (restaurant == null) {
        throw new ApiError('Error Deleting restaurant', 500)
    }
    res
        .status(200)
        .json(new ApiResponse(200, {}, 'Deleted Restaurant Successfully'))
})

const addRestaurantMenuItem = asyncHandler(async (req, res) => {
    const { id } = req.params
    let { name, price, category_id } = req.body

    if (!name || !price || !category_id) {
        throw new ApiError("Please provide all values", 400)
        req.file?.path && await fs.unlink(req.file?.path as string)
    }

    if (!req.file) {
        throw new ApiError('Please provide product image', 400)
    }

    const imageUrl = await uploadOnFirebase(req.file)

    const restaurant = await db.restaurant.findUnique({
        where: {
            id: id as string,
            deleted: false,
            owner_id: req.user?.id as string,
            approved: true
        },
    })

    if (restaurant == null) {
        throw new ApiError('Unauthorized Request', 401)
    }

    price = parseInt(price)

    if (isNaN(price)) {
        throw new ApiError('Price must be a number', 400)
    }
    const newMenuItem = await db.product.create({
        data: {
            name: name as string,
            price: price as number,
            restaurant_id: id as string,
            category_id: String(category_id),
            imagePath: imageUrl as string,
            isAvailable: true,
        }
    })
    if (newMenuItem == null) {
        throw new ApiError('Error updating restaurant', 500)
    }
    res
        .status(200)
        .json(new ApiResponse(200, { newMenuItem }, 'Created Menu Item Successfully'))
})

const getRestaurantMenuItems = asyncHandler(async (req, res) => {
    const { id } = req.params
    const restaurantMenu = await db.product.findMany({
        where: {
            isAvailable: true,
            restaurant_id: id as string,
            deleted: false,
            restaurant: {
                deleted: false,
                approved: true
            }
        },
        select: {
            id: true,
            name: true,
            price: true,
            category: {
                select: {
                    id: true,
                    name: true
                }
            },
            description: true,
            imagePath: true,
        }
    })
    if (restaurantMenu == null || restaurantMenu.length == 0) {
        throw new ApiError('Restaurant menu not found', 404)
    }
    res
        .status(200)
        .json(new ApiResponse(200, { restaurantMenu }, 'Fetched Menu Items Successfully'))
})

const getRestaurantMenu = asyncHandler(async (req, res) => {
    const { id } = req.params
    const restaurantMenu = await db.product.findMany({
        where: {
            deleted: false,
            restaurant: {
                deleted: false,
                id: id as string,
                approved: true,
                owner_id: req.user?.id
            }
        },
        select: {
            id: true,
            name: true,
            price: true,
            category: {
                select: {
                    id: true,
                    name: true
                }
            },
            description: true,
            isAvailable: true,
            reviews: {
                select: {
                    rating: true,
                    createdAt: true
                }
            },
            imagePath: true,
        }
    })
})

const updateProfileImage = asyncHandler(async (req, res) => {
    const file = req.file
    const id = req.params.id

    if (!file) {
        throw new ApiError('Please provide profile image', 400)
    }

    const restaurant = await db.restaurant.findUnique({
        where: {
            id: id as string,
            owner_id: req.user?.id as string,
            deleted: false,
            approved: true
        },
    })

    if (restaurant == null) {
        throw new ApiError('Unauthorized Request', 401)
    }

    const imageUrl = await uploadOnFirebase(file)

    if (!imageUrl) {
        throw new ApiError('Error updating profile image', 500)
    }

    await deleteOnFirebase(restaurant.imageUrl as string)

    const updatedRestaurant = await db.restaurant.update({
        where: { id: id as string, owner_id: req.user?.id as string },
        data: {
            imageUrl: imageUrl as string
        }
    })
    res
        .status(200)
        .json(new ApiResponse(200, { updatedRestaurant, imageUrl }, 'Profile Image Updated Successfully'))
})


const getRestaurantReviews = asyncHandler(async (req, res) => {
    const restaurantId = req.params.id

    console.log(restaurantId);

    if (restaurantId == null) {
        throw new ApiError('Restaurant id is required', 400)
    }

    const restaurantReviews = await db.review.findMany({
        where: { restaurantId, deleted: false, restaurant: { deleted: false, approved: true } },
    })
    console.log(restaurantReviews);


    if (restaurantReviews == null) {
        throw new ApiError('Product not found', 400)
    }

    const totalRating = restaurantReviews.reduce((acc, review) => {
        return acc + review.rating
    }, 0) / restaurantReviews.length

    res
        .status(200)
        .json(new ApiResponse(200, { totalRating, restaurantReviews }, 'Reviews fetched successfully'))
})

const addRestaurantReview = asyncHandler(async (req, res) => {
    const { id: restaurantId } = req.params
    let { comment, rating } = req.body

    if (!rating) {
        throw new ApiError('Rating is required', 400)
    }

    rating = parseInt(rating)

    if (rating < 1 || rating > 5) {
        throw new ApiError('Rating must be between 1 and 5', 400)
    }

    const review = await db.review.findFirst({
        where: { restaurantId, userId: req.user?.id as string, deleted: false },
    })

    if (review != null) {
        throw new ApiError('Already reviewed', 400)
    }

    const newReview = await db.review.create({
        data: {
            comment,
            rating,
            restaurantId,
            userId: req.user?.id as string
        }
    })
    res
        .status(200)
        .json(new ApiResponse(200, { newReview }, 'Review added successfully'))
})

const addRestaurantAddress = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { city, state, zipCode, street } = req.body

    if (!city || !state || !zipCode || !street) {
        throw new ApiError('All fields are required', 400)
    }
    const restaurant = await db.restaurant.findUnique({
        where: {
            id: id as string,
            deleted: false,
            owner_id: req.user?.id as string
        },
    })

    if (restaurant == null) {
        throw new ApiError('Unauthorized Request', 401)
    }

    const updatedRestaurant = await db.restaurantAddress.create({
        data: {
            city,
            state,
            zipCode,
            restaurantId: id,
            street
        }
    })
    if (updatedRestaurant == null) {
        throw new ApiError('Error updating restaurant', 500)
    }
    res
        .status(200)
        .json(new ApiResponse(200, { updatedRestaurant }, 'Updated Restaurant Successfully'))
})

const restaurantSalesReport = asyncHandler(async (req, res) => {
    const { id } = req.params

    const orderStats = await db.subOrder.aggregate({
        where: {
            restaurantId: id,
            restaurant: {
                owner_id: req.user?.id,
                orders: {
                    some: {status: 'DELIVERED'}
                }
            }
        },
        _count: true,
        _sum: {
            amount: true
        },
    })

    res
        .status(200)
        .json(new ApiResponse(200, { totalOrders: orderStats._count,totalAmount: orderStats._sum.amount }, 'Sales report fetched successfully'))
})

const getRestaurantOrders = asyncHandler(async (req, res) => {
    const { id } = req.params

    const orders = await db.subOrder.findMany({
        where: {
            restaurantId: id,
            restaurant: {
                owner_id: req.user?.id
            }
        },
        select: {
            id: true,
            amount: true,
            orderItems: true,
            createdAt: true,
            order: {
                select: {
                    id: true,
                    orderStatus: true
                },
                include: {
                    user: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res
        .status(200)
        .json(new ApiResponse(200, { orders }, 'Orders fetched successfully'))
})
export {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    addRestaurantMenuItem,
    getRestaurantMenuItems,
    updateProfileImage,
    getRestaurantReviews,
    addRestaurantReview,
    addRestaurantAddress,
    restaurantSalesReport,
    getRestaurantOrders,
    addTimeSlot,
    getRestaurantMenu
}