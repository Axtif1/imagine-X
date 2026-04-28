import express from "express"
import authController from "../controllers/authControllers.js"
import protect from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/register" , authController.registerUser)
router.post("/login" , authController.loginUser)
router.post("/private" , protect.forUser , authController.privateController)

// Email Authentication Routes
router.post("/verify-email", authController.verifyEmail)
router.post("/resend-otp", authController.resendOtp)
router.post("/forgot-password", authController.forgotPassword)
router.post("/verify-reset-otp", authController.verifyResetOtp)
router.post("/reset-password", authController.resetPassword)

export default router