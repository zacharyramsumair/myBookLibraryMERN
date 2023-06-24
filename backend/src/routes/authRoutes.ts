import express from "express"
const router = express.Router()
import authController from "../controllers/authController"
import { authenticateUser } from "../middleware/authentication"

export interface CustomRequest extends Request {
    user: string
  }

router.use(authenticateUser)

router.post('/',authController.registerUser)
router.put('/verify-email', authController.verifyEmail)
router.post('/login', authController.loginUser)
router.get('/showCurrentUser', authController.showCurrentUser)
router.delete('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword)
router.put('/reset-password', authController.resetPassword)
router.put('/profile', authController.editProfile)
router.get('/userprofile', authController.getMyProfilePageForEditing)
router.get('/profile/favorite-blocks', authController.getFavoriteBlocks)
router.get('/profile/rated-blocks', authController.getRatedBlocks)
router.get('/profile/created-blocks', authController.getCreatedBlocks)
router.get('/profile/money-earned', authController.getMoneyEarned)
router.get('/profile/:id', authController.getProfilePage)

 export default router