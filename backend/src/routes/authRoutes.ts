import express from "express"
const router = express.Router()
import authController from "../controllers/authController"

router.post('/', authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/me', authController.getMe)

 export default router