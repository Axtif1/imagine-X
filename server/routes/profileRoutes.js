import express from "express"
import profileController from "../controllers/profileController.js"
import protect from "../middleware/authMiddleware.js"


const router = express.Router()

router.get("/suggested", protect.forUser, profileController.getSuggestedUsers)
router.get("/followers", protect.forUser, profileController.getMyFollowers)
router.get("/followings", protect.forUser, profileController.getMyFollowings)
router.get("/:name", profileController.getProfile)

export default router