import brandController from "../controllers/brandController";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware";
import { Router } from "express";
const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
router.get('/', brandController.getAll)
router.delete('/', checkRoleMiddleware('ADMIN'), brandController.deleteOne)

export default router