import { AuthModel } from "../models/authModel.js"
import { validateDataLoginUserApp, validateDataRegisterUserApp } from "../schemas/auth.js"

export class AuthController {

    static async registerUserApp(req, res) {
        const resultValidateData = validateDataRegisterUserApp(req.body)
        if (!resultValidateData.success) { return res.status(400).json({ error: JSON.parse(resultValidateData.error.message) }) }

        const resultModel = await AuthModel.registerUserApp({ data: resultValidateData.data })
        if (!resultModel.ok) { return res.status(500).json(resultModel) }

        res.status(201).json(resultModel)
    }

    static async loginUserApp(req, res) {
        const resultValidateData = validateDataLoginUserApp(req.body)
        if (!resultValidateData.success) { return res.status(400).json({ error: JSON.parse(resultValidateData.error.message) }) }

        const resultModel = await AuthModel.loginUserApp({ data: resultValidateData.data })
        if (!resultModel.ok) { return res.status(500).json(resultModel) }

        res.json(resultModel)
    }

}