import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";
import { deleteOnFirebase, uploadOnFirebase } from "../ustils/firebase";


const getAllProducts = asyncHandler(async (req, res) => {
    const products = await db.product.findMany({
        where : {isAvailable : true, deleted : false},
        select : {
            id : true,
            name : true,
            price : true,
            description : true,
            imagePath : true
        }
    });

    if (products == null) {
        throw new ApiError("Products not found", 404);
    }

    res
        .status(200)
        .json(new ApiResponse(200, products ,"Products retrieved successfully"));
})

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await db.product.findUnique({
        where : {
            id
        },
        select : {
            id : true,
            name : true,
            price : true,
            description : true,
            imagePath : true,
            reviews : {
                select :{ 
                    id : true,
                    comment : true, 
                    rating : true, 
                    user : { select : { id : true, fullname : true } } 
                }
            },
        }
    })

    if (product == null) {
        throw new ApiError('Product not found', 404);
    }
    res
    .status(200)
    .json(new ApiResponse(200, {product}, "Product retrieved successfully"));
})


const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let { name, price, description , category_id } = req.body;

    if (!name || !price) {
        throw new ApiError("All fields are required", 400);
    }
    
    price = parseFloat(price)

    if (isNaN(price)) {
        throw new ApiError("Price must be a number", 400);
    }

    const updatedProduct = await db.product.update({
        where : {
            id,
            deleted : false,
            restaurant : {
                deleted : false,
                owner_id : req.user?.id
            }
        },
        data : {
            name,
            price,
            category_id,
            description
        }
    })

    if (updatedProduct == null) {
        throw new ApiError('Product not found', 404);
    }
    
    res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await db.product.update({
        where : {
            id,
            restaurant : {owner_id : req.user?.id}
        },
        data : {
            deleted : true
        }
    })
    if (deletedProduct == null) {
        throw new ApiError('Product not found', 404);
    }
    res
        .status(200)
        .json(new ApiResponse(200, deletedProduct, "Product deleted successfully"));
})

const toggleProductUnavailability = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await db.product.findUnique({
        where : {
            id,
            deleted : false,
            restaurant : {
                owner_id : req.user?.id,
                deleted : false
            }
        },
        select : {
            isAvailable : true
        }
    })

    if (!product) {
        throw new ApiError('Unauthorized Request',401)
    }
    const unavailableProduct = await db.product.update({
        where : {
            id,
            restaurant : {owner_id : req.user?.id}
        },
        data : {
            isAvailable : !product.isAvailable
        }
    })
    if (unavailableProduct == null) {
        throw new ApiError('Product not found', 404);
    }
    res
        .status(200)
        .json(new ApiResponse(200, unavailableProduct, product.isAvailable?"Product set unavailable successfully":'Product set available successfully'));
})

const updateProductImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (req.file == null) {
        throw new ApiError("Image is required", 400);
    }

    const product = await db.product.findUnique({
        where : {
            id,
            restaurant : {
                deleted : false,
                owner_id : req.user?.id
            }
        }
    })

    if (product == null) {
        throw new ApiError('Unauthrized Request', 401);
    }

    const newImage = await uploadOnFirebase(req.file)
    
    product.imagePath && await deleteOnFirebase(product.imagePath as string)

    const updatedProduct = await db.product.update({
        where : {
            id
        },
        data : {
            imagePath : newImage
        }
    })  

    res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product image updated successfully"));
})


const getProductReviews = asyncHandler(async (req,res)=>{
    const productId = req.params.id

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
    const { id : productId } = req.params
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
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    toggleProductUnavailability,
    updateProductImage,
    getProductReviews,
    addProductReview
}