import JWT from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../ustils/asyncHandler";
import { ApiError } from "../ustils/ApiError";
import db from "../db";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        fullname: string | null;
        phone: string | null;
        avatar: string;
        coverImage: string | null;
        role: string;
      };
    }
  }
}

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError("Unauthorized request", 401);
  }

  const decodedToken: JwtPayload = JWT.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;

  const user = await db.user.findFirst({
    where: { id: decodedToken.id as string },
    select: {
      id: true,
      email: true,
      username: true,
      fullname: true,
      phone: true,
      avatar: true,
      coverImage: true,
      role: true
    },
  });
  
  if (!user) {
    throw new ApiError("Invalid access token", 401);
  }
  req.user = user;
  next();
});
