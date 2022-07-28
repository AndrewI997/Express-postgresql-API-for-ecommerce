import deviceController from "../controllers/deviceController";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware";
import { Router } from "express";
const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'),  deviceController.cerate)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/', checkRoleMiddleware('ADMIN'),  deviceController.deleteOne)

export default router