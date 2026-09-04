import bcrypt from 'bcrypt'
import { manageDB } from '../services/manageDB.js'
import { decrypt, encrypt } from '../utils/encryption.js'
export class MainAppModel {

    static async createApp({ data }) {
        const {
            connom,
            conusuario,
            conpwd,
            connom_icon,
            usuid,
            catid
        } = data

        // Encriptar contraseña
        const passwordEncrypted = encrypt(conpwd)

        const resultDB = await manageDB('main_app_create_app', [null, connom, conusuario, passwordEncrypted, connom_icon, usuid, catid, 'INS'])
        return resultDB
    }

    static async updateApp({ data }) {
        const {
            conid,
            connom,
            conusuario,
            conpwd,
            connom_icon,
            usuid,
            catid
        } = data

        const existedAppInDB = await manageDB(null, [conid], 'SELECT COUNT(*) AS count FROM tbl_contras WHERE conid = ?', 'CO')
        if (existedAppInDB.data[0].count === 0) {
            existedAppInDB.ok = false
            existedAppInDB.message = "Aplicacion no encontrada"
            return existedAppInDB
        }

        // Encriptar Contraseña
        const passwordEncrypted = encrypt(conpwd)

        const resultDB = await manageDB('main_app_create_app', [conid, connom, conusuario, passwordEncrypted, connom_icon, usuid, catid, 'UPD'])
        return resultDB
    }

    static async deleteApp({ data }) {
        const { conid } = data

        const existedAppInDB = await manageDB(null, [conid], 'SELECT COUNT(*) AS count FROM tbl_contras WHERE conid = ?', 'CO')
        if (existedAppInDB.data[0].count === 0) {
            existedAppInDB.ok = false
            existedAppInDB.data = null
            existedAppInDB.message = "Aplicacion no encontrada"
            return existedAppInDB
        }

        const resultDB = await manageDB('main_app_create_app', [conid, null, null, null, null, null, null, 'DEL'])
        resultDB.ok = true
        resultDB.message = "Aplicacion eliminada correctamente"

        return resultDB
    }

    static async getInfoVaultOption({ data }) {
        const { usuid } = data

        const resultDB = await manageDB('load_info_option_vault', [usuid])
        return resultDB
    }

    static async getPasswordApp({ data }) {
        const { conid, usuid } = data

        const resultDB = await manageDB(null, [conid, usuid], 'SELECT conpwd FROM tbl_contras WHERE conid = ? AND usuid = ?', 'CO')

        const passwordDecrypted = decrypt(resultDB.data[0].conpwd)
        resultDB.data[0].conpwd = passwordDecrypted
        
        return resultDB
    }

}