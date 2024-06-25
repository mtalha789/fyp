import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";

const addRider = asyncHandler(async (req, res) => {
    const { phone, vehicle } = req.body

    if([phone, vehicle].some(val=>val==null)){
        throw new ApiError("All fields are required")
    }

    const rider = await db.user.update({
        where: {id : req?.user?.id},
        data: {
            phone,
            riderVehicle: vehicle,
            role: 'Rider',
        }
    })

    res
        .status(201)
        .json(new ApiResponse(201, rider, "Rider added successfully"))
})

const assignArea = asyncHandler(async (req, res) => {
    const riderId = req.params.id
    const { city, state, zipCode } = req.body

    if(![riderId, city, state, zipCode].every(val=>val!=null)){
        throw new ApiError("All fields are required",400)
    }

    const area = await db.address.create({
        data: {
            city: city as string,
            state: state as string,
            zipCode: zipCode as string,
            userId: riderId
        }
    })
})

const getRiders = asyncHandler(async (req, res) => {
    const { state, city, riderVehicle } = req.query
    const riders = await db.user.findMany({
        where: {
            role: 'Rider',
            addresses: {some : {state: state as string, city: city as string}},
            riderVehicle: {contains: riderVehicle as string} || riderVehicle as string
        }
    })
    res
        .status(200)
        .json(new ApiResponse(200, riders, "Riders fetched successfully"))
})

const getRiderStats = asyncHandler(async (req, res) => {
    const id = req.params.id
    const riders = await db.user.findMany({
        where: {
            role: 'Rider',
            id: id || req?.user?.id
        },
        select: {
            id: true,
            fullname: true,
            phone: true,
            riderVehicle: true,
            avatar: true,
            deliveries: true
        },
    })

    if(!riders.length){
        throw new ApiError("Rider not found", 404)
    }
    res
        .status(200)
        .json(new ApiResponse(200, riders, "Riders fetched successfully"))
})

export {
    addRider,
    assignArea,
    getRiders,
    getRiderStats
}