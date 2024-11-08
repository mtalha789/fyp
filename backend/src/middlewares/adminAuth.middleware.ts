import { verify, type JwtPayload } from "jsonwebtoken";
import { ApiError } from "../ustils/ApiError";
import { asyncHandler } from "../ustils/asyncHandler";

export const verifyAdmin = asyncHandler(async (req,_,next) => {
    const token = req.cookies?.adminToken || req.header("AdminAuthorization")?.replace("Bearer ", "");

    const decodedToken = verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET as string) as JwtPayload;
    const { username } = decodedToken;
    if(username !== process.env.ADMIN_USERNAME){
        throw new ApiError("Unauthorized",401)
    }

    next()
})