import type { Socket } from "socket.io";
import cookieParser from "cookie-parser";
import { verify, type JwtPayload } from "jsonwebtoken";
import { ApiError } from "../ustils/ApiError";
import db from "../db";


export interface CustomSocket extends Socket{
  user?: {
    id: string;
    email: string;
    username: string;
    fullname: string | null;
    phone: string | null;
  };
}


export const verifyUser = async (socket: CustomSocket, next: any) => {
  try {
    console.log('verifying user');
    
    const cookies : any = cookieParser(socket.handshake.headers.cookie || "");

    let accessToken : string |undefined;

    if (cookies && cookies?.accessToken) {
      accessToken = cookies.accessToken;
    }
    if (!accessToken) {
      accessToken = socket.handshake.auth.accessToken;
    }

    if (!accessToken) {
      throw new ApiError("Unauthorized request", 401);
    }

    const decodedToken: JwtPayload = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

    const user = await db.user.findFirst({
      where: { id: decodedToken.id as string },
      select :{
        email : true,
        username : true,
        fullname : true,
        phone : true,
        id : true
      }
    });
    if(user === null){
      throw new ApiError("Unauthorized request", 401);
    }

    socket.user = user;
  } catch (error) {
    // Handle error
  }
};