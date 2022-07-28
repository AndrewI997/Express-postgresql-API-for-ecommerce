import UserController from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'
import checkRoleMiddleware from '../middlewares/checkRoleMiddleware'
import { Router } from 'express'
const router = new Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)
router.delete('/delete', checkRoleMiddleware('ADMIN'), UserController.deleteOne)

export default router