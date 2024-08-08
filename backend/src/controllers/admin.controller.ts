import { ApiError } from "../ustils/ApiError";
import { asyncHandler } from "../ustils/asyncHandler";
import { generateAdminToken } from "../ustils/jwtToken";
import { comparePasswords } from "../ustils/passEncryption";

const authenticateAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (username !== process.env.ADMIN_USERNAME || await comparePasswords(password,process.env.ADMIN_PASSWORD as string) === false) {
        throw new ApiError('Invalid credentials', 401)
    }
    const adminToken = generateAdminToken(username)
    res
    .status(200)
    .json({
        token: adminToken
    })
    .cookie('adminToken', adminToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
    })
})

export {
    authenticateAdmin
}