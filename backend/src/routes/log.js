import { Router } from "express"
import { LogController } from "../controllers/logController.js"

export const logRouter = Router()

logRouter.get('/:usuid', LogController.getLogs)
