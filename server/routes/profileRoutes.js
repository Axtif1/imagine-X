import express from "express"
import profileController from "../controllers/profileController.js"
import protect from "../middleware/authMiddleware.js"


const router = express.Router()

router.get("/:name"  , profileController.getProfile)
router.get("/followers" , protect.forUser , profileController.getMyFollowers)
router.get("/followings" , protect.forUser , profileController.getMyFollowings)


export default router