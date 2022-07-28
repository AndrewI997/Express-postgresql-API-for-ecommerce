import typeController from "../controllers/typeController";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware";
import { Router } from "express";
const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
router.delete('/', checkRoleMiddleware('ADMIN'), typeController.deleteOne)

export default router