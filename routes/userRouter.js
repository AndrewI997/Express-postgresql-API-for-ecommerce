import UserController from '../controllers/userController'
import { Router } from 'express'
const router = new Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', UserController.check)

export default router