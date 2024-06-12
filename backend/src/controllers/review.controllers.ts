import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { asyncHandler } from "../ustils/asyncHandler";
import { ApiResponse } from "../ustils/ApiResponse"

const getProductReviews = asyncHandler(async (req,res)=>{
    const productId = req.params.productId

    if(productId == null){
        throw new ApiError('Product id is required',400)
    }

    const productReviews = await db.productReview.findMany({
        where : { productId },
    })

    if(productReviews == null){
        throw new ApiError('Product not found',400)
    }

    res
        .status(200)
        .json(new ApiResponse(200,{productReviews},'Reviews fetched successfully'))
})
const addProductReview = asyncHandler(async (req,res)=>{
    const { productId } = req.params
    let { comment, rating } = req.body

    if(!rating){
        throw new ApiError('Rating is required',400)
    }

    rating = parseInt(rating)

    if(rating < 1 || rating > 5){
        throw new ApiError('Rating must be between 1 and 5',400)
    }

    const review = await db.productReview.findFirst({
        where : {productId, userId : req.user?.id as string,deleted:false},
    })

    if(review != null){
        throw new ApiError('Already reviewed',400)
    }

    const newReview = await db.productReview.create({
        data : {
            comment,
            rating,
            productId,
            userId : req.user?.id as string
        }
    })

    res
        .status(200)
        .json(new ApiResponse(200,{newReview },'Review added successfully'))
})

export {
    getProductReviews,
    addProductReview
}