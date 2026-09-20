import { LogModel } from "../models/logModel.js"
import { validateDataGetLogs } from "../schemas/log.js"

export class LogController {

    static async getLogs(req, res) {
        const responseValidateData = validateDataGetLogs(req.params)
        if (!responseValidateData.success) { return res.status(400).json({ error: JSON.parse(responseValidateData.error.message) }) }

        const responseModel = await LogModel.getLogs({ usuid: responseValidateData.data.usuid })
        if (!responseModel.ok) { return res.status(500).json(responseModel) }

        return res.json(responseModel)
    }

}
