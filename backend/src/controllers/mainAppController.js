import { MainAppModel } from "../models/mainAppModel.js"
import { validateDataCreateApp, validateDataUpdateApp } from "../schemas/mainApp.js"

export class MainAppController {

    static async createApp(req, res) {
        const resultValidateData = validateDataCreateApp(req.body)
        if (!resultValidateData.success) { return res.status(400).json({ error: JSON.parse(resultValidateData.data.error) }) }

        const resultModel = await MainAppModel.createApp({ data: resultValidateData.data })
        if (!resultModel.ok) { return res.status(500).json(resultModel) }

        res.status(201).json(resultModel)
    }

    static async updateApp(req, res) {
        const resultValidateData = validateDataUpdateApp(req.body)
        if (!resultValidateData.success) { return res.status(400).json({ error: JSON.parse(resultValidateData.error.message) }) }

        const resultModel = await MainAppModel.updateApp({ data: resultValidateData.data })
        if (!resultModel.ok) { return res.status(500).json(resultModel) }
        
        res.json(resultModel)
    }

}