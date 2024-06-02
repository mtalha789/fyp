import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";


const getAllProducts = asyncHandler(async (req, res) => {
    const products = await db.product.findMany({
        where : {status : 'AVAILABLE', deleted : false},
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
    .json(new ApiResponse(200, product, "Product retrieved successfully"));
})


const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, price, description , category_id } = req.body;

    if (!name || !price || !category_id) {
        throw new ApiError("All fields are required", 400);
    }
    const updatedProduct = await db.product.update({
        where : {
            id,
            restaurant : {owner_id : req.user?.id}
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

const setProductUnavailable = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const unavailableProduct = await db.product.update({
        where : {
            id,
            restaurant : {owner_id : req.user?.id}
        },
        data : {
            status : 'UNAVAILABLE'
        }
    })
    if (unavailableProduct == null) {
        throw new ApiError('Product not found', 404);
    }
    res
        .status(200)
        .json(new ApiResponse(200, unavailableProduct, "Product set unavailable successfully"));
})

export {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    setProductUnavailable
}