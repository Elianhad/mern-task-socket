import express from 'express'
import { createdNewUser, login, confirmAccount, resetPassword, resetPasswordWithToken, setNewPassword, getProfile } from '../controllers/UserController.js'
import auth from '../middleware/Auth.js'
const router = express.Router()

router.post('/newaccount', createdNewUser)
router.post('/login', login)
router.get('/validaccount/:token', confirmAccount)
router.post('/resetpassword', resetPassword)
router.route('/resetpassword/:token').get(resetPasswordWithToken).post(setNewPassword)
router.get('/profile', auth, getProfile)
export default router
