import { manageDB } from "../services/manageDB.js"

export class LogModel {

    static async getLogs({ usuid }) {
        const resultDB = await manageDB('log_get_list_x_user', [usuid])
        return resultDB
    }

}
