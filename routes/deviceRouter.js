import deviceController from "../controllers/deviceController";
import { Router } from "express";
const router = new Router()

router.post('/', deviceController.cerate)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

export default router