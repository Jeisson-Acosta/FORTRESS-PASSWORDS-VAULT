import bcrypt from 'bcrypt'
import { manageDB } from '../services/manageDB.js'

export class AuthModel {

    static async registerUserApp({ data }) {
        const {
            usunom,
            usuemail,
            usupwd
        } = data

        // Hashear la contra
        const usupwdHash = await bcrypt.hash(usupwd, 10)

        const resultDB = await manageDB('auth_register_user_app', [usunom, usuemail, usupwdHash])
        return resultDB
    }

    static async loginUserApp({ data }) {
        const { usuemail, usupwd } = data

        const existedUser = await manageDB(null, [usuemail], 'SELECT usuemail FROM tbl_usuario WHERE usuemail = ?', 'CO')
        if (existedUser.data.length === 0) {
            existedUser.ok = false
            existedUser.message = "Usuario no encontrado"
            return existedUser
        }

        const passwordInDB = await manageDB(null, [usuemail], 'SELECT usupwd FROM tbl_usuario WHERE usuemail = ?', 'CO')
        // Comparar la contra que escribio el usuario con la que esta en la DB
        const isPasswordValid = await bcrypt.compare(usupwd, passwordInDB.data[0].usupwd)
        if (!isPasswordValid) {
            passwordInDB.ok = false
            passwordInDB.data = null
            passwordInDB.message = 'Contraseñ incorrecta'
            return passwordInDB
        }

        // Mientras asi, luego un SP para traer la info principal
        const resultInfoUser = await manageDB(null, [usuemail], 'SELECT usunom, usuemail FROM tbl_usuario WHERE usuemail = ?', 'CO')
        return resultInfoUser
    }

}