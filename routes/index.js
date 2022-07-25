import userRouter from './userRouter'
import { Router } from 'express'
const router = new Router()

router.use('/api', userRouter)

export default router