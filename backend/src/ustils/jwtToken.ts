import jwt from 'jsonwebtoken'

export const generateRefreshToken = async function(userId  : string){
    return jwt.sign(
        {
            id : userId
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const generateAccessToken = async function(userId :string,email : string){
    return jwt.sign(
        {
            id: userId,
            email: email
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const generateAdminToken = async function(username : string){
    return await jwt.sign(
        {
            username: username
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}