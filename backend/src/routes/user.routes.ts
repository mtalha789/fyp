import { Router } from "express";
import {  changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refereshAccessToken, registerUser, updateAccountDetails, updateAvatar, updateCoverImage } from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router()

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name : "coverImage", maxCount: 1 }
    ]),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refereshAccessToken)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/change-password").patch(verifyJWT,changeCurrentPassword)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar);
router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateCoverImage);

router.route("/restaurants").get(verifyJWT,getCurrentUser)

export default router