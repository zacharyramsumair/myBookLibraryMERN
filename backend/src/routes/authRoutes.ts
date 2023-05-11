import express from "express"
const router = express.Router()
import authController from "../controllers/authController"
import { authenticateUser } from "../middleware/authentication"

export interface CustomRequest extends Request {
    user: string
  }

router.post('/',authController.registerUser)


router.post('/verify-email', authController.verifyEmail)
router.post('/login', authController.loginUser)
router.get('/showCurrentUser',authenticateUser, authController.showCurrentUser)
router.delete('/logout',authenticateUser, authController.logout);

 export default router