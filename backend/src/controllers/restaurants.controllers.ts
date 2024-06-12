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

const getAllRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await db.restaurant.findMany({
        where: { deleted: false },
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
            }
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
        where: { id: id as string, deleted: false },
        select: {
            id: true,
            name: true,
            phone: true,
            corporateEmail: true,
            reviews: {
                select: {
                    rating: true,
                    user: { select: { id: true, username: true } },
                    comment: true
                }
            },
            products: {
                where: { status: 'AVAILABLE' },
                select: {
                    id: true,
                    name: true,
                    price: true,
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
        where: { id: id as string, deleted: false, owner_id: req.user?.id as string },
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
        where: { id: id as string, owner_id: req.user?.id as string },
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
            owner_id: req.user?.id as string
        },
    })

    if (restaurant == null) {
        throw new ApiError('Unauthorized Request', 401)
    }

    price = parseInt(price)

    if(isNaN(price)) {
        throw new ApiError('Price must be a number', 400)
    }
    const newMenuItem = await db.product.create({
        data: {
            name: name as string,
            price: price as number,
            restaurant_id: id as string,
            category_id: String(category_id),
            imagePath: imageUrl as string,
            status: 'AVAILABLE', //TODO : add imageUrl
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
            status: 'AVAILABLE',
            restaurant_id: id as string,
            deleted: false,
            restaurant: {
                deleted: false
            }
        },
        select: {
            id: true,
            name: true,
            price: true,
            category: true,
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
            deleted: false
        },
    })

    if (restaurant == null) {
        throw new ApiError('Unauthorized Request', 401)
    }

    const imageUrl = await uploadOnFirebase(file)

    if(!imageUrl) {
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

export {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    addRestaurantMenuItem,
    getRestaurantMenuItems,
    updateProfileImage
}