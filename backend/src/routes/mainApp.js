import { Router } from "express"
import { MainAppController } from "../controllers/mainAppController.js"

export const mainAppRouter = Router()

mainAppRouter.post('/create-app', MainAppController.createApp)
mainAppRouter.patch('/update-app', MainAppController.updateApp)