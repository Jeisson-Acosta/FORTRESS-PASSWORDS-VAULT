import { CategoryModel } from "../models/categoryModel.js"
import { validateDataCreateCategory, validateDataDeleteCategory, validateDataUpdateCategory } from "../schemas/category.js"

export class CategoryController {

    static async createCategory(req, res) {
        const responseValidateData = validateDataCreateCategory(req.body)
        if (!responseValidateData.success) { return res.status(400).json({ error: JSON.parse(responseValidateData.error.message) }) }

        const responseModel = await CategoryModel.createCategory({ data: responseValidateData.data })
        if (!responseModel.ok) { return res.status(500).json(responseModel) }

        return res.status(201).json(responseModel)
    }

    static async updateCategory(req, res) {
        const resultValidateData = validateDataUpdateCategory(req.body)
        if (!resultValidateData.success) { return res.status(400).json({ error: JSON.parse(resultValidateData.error.message) }) }

        const responseModel = await CategoryModel.updateCategory({ data: resultValidateData.data })
        if (!responseModel.ok) { return res.status(500).json(responseModel) }

        return res.json(responseModel)
    }

    static async deleteCategory(req, res) {
        const resultValidateData = validateDataDeleteCategory(req.params)
        if (!resultValidateData.success) { return res.status(400).json({ error: resultValidateData.error.message }) }

        const responseModel = await CategoryModel.deleteCategory({ data: resultValidateData.data })
        if (!responseModel.ok) { return res.status(500).json(responseModel) }

        return res.json(responseModel)
    }

}