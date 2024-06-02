import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";

const getAllCategories = asyncHandler( async (req,res) => {
    const categories =  await db.category.findMany({
        select : {
            id : true,
            name : true,
        }
    })

    res
        .status(200)
        .json(new ApiResponse(200,categories,'categories retrieved successfully'))
})

const createCategory = asyncHandler( async (req,res) => {
    const { name } = req.body
    
    const category = await db.category.create({
        data : {
            name
        }
    })

    res
        .status(201)
        .json(new ApiResponse(200,category,'category created successfully'))
})

const getProductsByCategory = asyncHandler( async (req,res) => {
    const products = await db.product.findMany({
        where : {
            category_id : req.params.id
        }
    })

    if (products == null) {
        throw new ApiError("category not found",404)
    }

    res
        .status(200)
        .json(new ApiResponse(200,products,'products retrieved successfully'))
})

export { 
    getAllCategories,
    createCategory,
    getProductsByCategory
}