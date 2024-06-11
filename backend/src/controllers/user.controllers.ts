import type { Request, Response } from "express";
import db from "../db";
import { ApiError } from "../ustils/ApiError";
import { ApiResponse } from "../ustils/ApiResponse";
import { asyncHandler } from "../ustils/asyncHandler";
import { comparePasswords, hashPassword } from "../ustils/passEncryption";
import { generateAccessToken, generateRefreshToken } from "../ustils/jwtToken";
import JWT, { type JwtPayload } from 'jsonwebtoken'
import { deletedOnFirebase, uploadOnFirebase } from "../ustils/firebase";


const cookieOptions = {
    httpOnly : true,
    secured : true
}
const generateRefreshAccessToken = async (userid:string) => {
    try {
        const user = await db.user.findUnique({where:{id:userid}});

        if(!user){
            throw new ApiError('Something went wrong',500)
        }
        const refreshToken = await generateRefreshToken(user.id,);
        const accessToken = await generateAccessToken(user.id,user.email);

        await db.user.update({where:{id:user.id},data:{refreshToken , accessToken}})

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError("Something went wrong while generating referesh and access token" , 500)
    }
};

const registerUser = asyncHandler(async(req : Request,res : Response)=>{
    const { username , password , email , fullname, phone } = req.body

    debugger
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    if([username ,password ,email ].some((x)=>x==null)){
        throw new ApiError('All fields are required!' , 400)
    }

    const user = await db.user.findFirst({
        where : {
            OR:[ {username} , {email} ]
        }
    })

    if (user) {
        throw new ApiError('User with this username or email already exists' , 400)
    }
    
    if(!files || !files?.avatar || !files?.avatar.length) {
        throw new ApiError('Avaatar is required!' , 400)
    }
    console.log(files);
    debugger
    const avatar = await uploadOnFirebase(files.avatar[0])

    let coverImage

    if(files?.coverImage && files?.coverImage.length) {
        coverImage = await uploadOnFirebase(files.coverImage[0])
    }
    const hashedPass = await hashPassword(password);
    const newUser = await db.user.create({
        data : {
            username : username as string,
            password : hashedPass as string,
            email : email as string,
            fullname : fullname as string,
            phone : phone as string,
            avatar : avatar as string,
            coverImage : coverImage? coverImage : null
        }
    })
    
    if (!newUser) {
        throw new ApiError('Error creating user' , 400)
    }

    return res.status(201).json(new ApiResponse(201 , {user : newUser} ,'User created successfully' ))
})

const loginUser = asyncHandler(async (req : Request, res : Response) => {
    const { email, username, password } = req.body;

    if (!email && !username) {
        throw new ApiError("Username or email is required", 400);
    }

    const user = await db.user.findFirst({
        where:{
            OR: [ {email}, { username }],
        }
    });

    if (!user) {
        throw new ApiError("User do not exist", 404);
    }

    const isPasswordCorrect = await comparePasswords(password,user.password)

    if (!isPasswordCorrect) {
        throw new ApiError("Invalid user credentials", 401);
    }

    const { refreshToken, accessToken } = await generateRefreshAccessToken(user.id);

    const loggedInUser = await db.user.findFirst({
        where:{id:user.id},
        select : { id : true , username : true , email : true , fullname : true , phone : true}
    });

    res
    .status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, refreshToken, accessToken},
                "User Logged In Successfully"
            )
        )
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = req?.user
    await db.user.update(
        {where: { id: user?.id },
        data:{
        accessToken : null,
        refreshToken : null
        }
    })
    

    res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "Logged out successfully"
            )
        )
})

const refereshAccessToken = asyncHandler(async (req, res) => {
    const reqRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!reqRefreshToken) {
        throw new ApiError("unauthorized request",401)
    }

    const decodedToken = JWT.verify(reqRefreshToken,process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload

    const user = await db.user.findFirst({where : { id : decodedToken?.id}})

    if (!user) {
        throw new ApiError("Invalid Refresh Token", 401)
    }

    if (user.refreshToken !== reqRefreshToken) {
        throw new ApiError("Refresh token is expired or used", 401)
    }

    const { accessToken, refreshToken } = await generateRefreshAccessToken(user.id)

    res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                { refreshToken },
                "Refreshed Access Token Successfully"
            )
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                user: req.user
            },
            "current user fetched"
        )
    )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPass, newPass } = req.body

    const user = await db.user.findFirst({where : {id : req.user?.id}})

    if (user == null) {
        throw new ApiError("User not found", 404)
    }
    const isPasswordCorrect = await comparePasswords(oldPass, user.password as string)

    if (!isPasswordCorrect) {
        throw new ApiError("Invalid old password", 400)
    }

    await db.user.update({where : {id : user.id}, data : {password : await hashPassword(newPass)}})

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "password changed successfully"
            )
        )
})

const updateAvatar = asyncHandler(async (req, res) => {
    const file = req.file

    if (!file) {
        throw new ApiError("Avatar is required", 400);
    }
    const avatar = await uploadOnFirebase(file);

    if (!avatar) {
        throw new ApiError("Error while uploading avatar", 500);
    }

    await deletedOnFirebase(req.user?.avatar as string)
    const updatedUser = await db.user.update({
        where: { id: req.user?.id },
        data : {
            avatar
        },
        select : {
            id : true , username : true , email : true , fullname : true , phone : true , avatar : true
        }
    })

    res.status(200).json(new ApiResponse(200, updatedUser, "Avatar updated successfully"));
});

const updateCoverImage = asyncHandler(async (req, res) => {

    const file = req.file

    if (!file) {
        throw new ApiError("Cover image is missing", 400);
    }

    const coverImage = await uploadOnFirebase(file);

    if (!coverImage) {
        throw new ApiError("Error while uploading cover image");
    }

    if(req.user?.coverImage){
        await deletedOnFirebase(req.user?.coverImage)
    }

    const user = await db.user.update({
        where: { id: req.user?.id },
        data : {
            coverImage
        },
        select : { id : true , username : true , email : true , fullname : true , phone : true , avatar : true , coverImage : true}
    })

    res.status(200).json(new ApiResponse(200, user, "Cover image updated successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError("All fields are required",400)
    }

    const user = await db.user.update({
        where  : {id : req.user?.id} ,
        data : { fullname : fullName , email}
    })

    res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
});




export {
    registerUser,
    loginUser,
    logoutUser,
    refereshAccessToken,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
    getCurrentUser,
    changeCurrentPassword,
};
