import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";
import { generateAdminToken } from "../ustils/jwtToken";
import { comparePasswords } from "../ustils/passEncryption";

const authenticateAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (username !== process.env.ADMIN_USERNAME || await comparePasswords(password,process.env.ADMIN_PASSWORD as string) === false) {
        throw new ApiError('Invalid credentials', 401)
    }
    const adminToken = generateAdminToken(username)
    res
    .status(200)
    .json(new ApiResponse(200, {token: adminToken}, 'success'))
    .cookie('adminToken', adminToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
    })
})

const getUnApprovedRestaurants = asyncHandler(async (req, res) => {
    const unApprovedRestaurants = await db.restaurant.findMany(
        {where: {approved: false}, include: {owner: true, address: true}},
    )
    
    res
    .status(200)
    .json(new ApiResponse(200, unApprovedRestaurants, 'success'))
})

const approveRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params

    const approvedRestaurant = await db.restaurant.update({
        where: {id},
        data: {approved: true}
    })
    
    if (!approvedRestaurant) {
        throw new ApiError('Restaurant not found', 404)
    }

    res
    .status(200)
    .json(new ApiResponse(200, approvedRestaurant, 'Restaurant approved'))
})

const rejectRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params

    const rejectedRestaurant = await db.restaurant.update({
        where: {id},
        data: {approved: false}
    })
    
    if (!rejectedRestaurant) {
        throw new ApiError('Restaurant not found', 404)
    }

    res
    .status(200)
    .json(new ApiResponse(200, rejectedRestaurant, 'Restaurant rejected'))
})

export {
    authenticateAdmin,
    getUnApprovedRestaurants,
    approveRestaurant,
    rejectRestaurant
}