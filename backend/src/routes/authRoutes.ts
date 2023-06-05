import express from "express"
const router = express.Router()
import authController from "../controllers/authController"
import { authenticateUser } from "../middleware/authentication"

export interface CustomRequest extends Request {
    user: string
  }

router.post('/',authController.registerUser)
router.put('/verify-email', authController.verifyEmail)
router.post('/login', authController.loginUser)
router.get('/showCurrentUser',authenticateUser, authController.showCurrentUser)
router.delete('/logout',authenticateUser, authController.logout);
router.post('/forgot-password', authController.forgotPassword)
router.put('/reset-password', authController.resetPassword)
router.get('/profile/:id', authController.getProfilePage)
router.get('/profile/favorite-blocks', authController.getFavoriteBlocks)
router.get('/profile/rated-blocks', authController.getRatedBlocks)
router.get('/profile/created-blocks', authController.getCreatedBlocks)

 export default router