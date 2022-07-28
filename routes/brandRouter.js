import brandController from "../controllers/brandController";
import { Router } from "express";
const router = new Router()

router.post('/', brandController.create)
router.get('/', brandController.getAll)

export default router