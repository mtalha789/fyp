import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ApiError } from "./ApiError";

export const asyncHandler = (fn : RequestHandler) => async (req:Request, res : Response,next : NextFunction)=>{
    try {
        await fn(req,res,next)
    } catch (error : ApiError | any) {
        console.log(error);
        
        res
            .status(error?.status || 500)
            .json({
                message:error?.message || 'Something went wrong',
                status:error.status
            })
    }
}