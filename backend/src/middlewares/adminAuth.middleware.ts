import { ApiError } from "../ustils/ApiError";
import { asyncHandler } from "../ustils/asyncHandler";
import { comparePasswords } from "../ustils/passEncryption";

export const verifyAdmin = asyncHandler(async (req,res,next) => {
    const { username , adminPassword } =req.body

    if(!username || !adminPassword){
        throw new ApiError("Please provide username and password",400)
    }
    if(username !== process.env.ADMIN_USERNAME && await comparePasswords(adminPassword,process.env.ADMIN_PASSWORD as string) === false){
        throw new ApiError("Unauthorized",401)
    }

    next()
})