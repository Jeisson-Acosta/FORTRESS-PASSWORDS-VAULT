import { Router } from "express"
import { CategoryController } from "../controllers/categoryController.js"

export const categoryRouter = Router()

categoryRouter.post('/create', CategoryController.createCategory)
categoryRouter.patch('/update', CategoryController.updateCategory)
categoryRouter.delete('/delete/:catid', CategoryController.deleteCategory)