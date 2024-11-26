import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { asyncHandler } from "../ustils/asyncHandler";
import { ApiResponse } from "../ustils/ApiResponse"

const getReviewById = asyncHandler(async (req,res)=>{
    const id = req.params.id

    const restaurantReview = await db.review.findFirst({
        where : { id, deleted : false, restaurant : { deleted : false} },
    })

    if(restaurantReview == null){
        throw new ApiError('Review not found',400)
    }

    res
        .status(200)
        .json(new ApiResponse(200,{restaurantReview, success: true },'Reviews fetched successfully'))
})
const updateReview = asyncHandler(async (req,res)=>{
    const { id } = req.params
    let { comment, rating } = req.body

    if(!rating){
        throw new ApiError('Rating is required',400)
    }

    rating = parseInt(rating)

    if(rating < 1 || rating > 5){
        throw new ApiError('Rating must be between 1 and 5',400)
    }

    const review = await db.review.update({
        where : { id,restaurant : { deleted : false}, userId : req.user?.id as string, deleted : false },
        data : {
            rating,
            comment
        }
    })

    if(review == null){
        throw new ApiError('Review not found',400)
    }

    res
        .status(200)
        .json(new ApiResponse(200,{review, success: true  },'Review updated successfully'))
})

const deleteReview = asyncHandler(async (req,res)=>{
    const { id } = req.params
    const review = await db.review.update({
        where : { id,restaurant : { deleted : false}, userId : req.user?.id as string, deleted : false },
        data : {
            deleted : true
        }
    }) 

    if(review == null){
        throw new ApiError('Unauthorized Request',400)
    }

    res
        .status(200)
        .json(new ApiResponse(200,{review, success: true  },'Review deleted successfully'))
})
export {
    getReviewById,
    updateReview,
    deleteReview
}