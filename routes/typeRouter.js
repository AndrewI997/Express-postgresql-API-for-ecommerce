import typeController from "../controllers/typeController";
import { Router } from "express";
const router = new Router()

router.post('/', typeController.create)
router.get('/', typeController.getAll)

export default router