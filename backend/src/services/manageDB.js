import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const ENV =  process.env.NODE_ENV

const CONFIG_DB = {
    host: process.env[`DB_HOST_${ENV}`],
    user: process.env[`DB_USER_${ENV}`],
    password: process.env[`DB_PASSWORD_${ENV}`],
    database: process.env[`DB_NAME_${ENV}`],
    port: process.env[`DB_PORT_${ENV}`],
    connectionLimit: 10
}

export async function manageDB(nameSP, params, query = '', option = 'SP') {
    /* 
        nameSP -> Nombre del SP que se va a ejecutar.
        params -> Parametros que se van a pasar al SP.
        query -> Consulta SELECT que se va a ejecutar si option es 'SL'. EJ: 'SELECT * FROM tbl_name WHERE field = ?'
        option -> 'SP' o 'CO' -> Determina si se va a ejecutar un SP o una consulta.
    */

    const RESPONSE_DB = {
        ok: false, // true or false -> Determina si la peticiona la base de datos fue exitosa o no.
        data: null, // Contiene los datos retornados de la base de datos.
        message: '' // Mensaje que retorna si fue exitosa la peticion o no.
    }

    const connectionString = process.env.DATABASE_URL ?? CONFIG_DB
    const connectionPool = mysql.createPool(connectionString)

    try {
        if (option === 'SP') {
            const [response] = await connectionPool.query(`CALL ${nameSP}(${params.map(() => '?').join(',')})`, params)
            RESPONSE_DB.data = response[0]
        } else if (option === 'CO') {
            const [response] = await connectionPool.query(query, params)
            RESPONSE_DB.data = response
        }
        RESPONSE_DB.ok = true
        RESPONSE_DB.message = 'Peticion Exitosa'
    } catch(e) {
        RESPONSE_DB.message = `Error al ejecutar la peticion: ${e.message}`
    } finally {
        connectionPool.end()
    }

    return RESPONSE_DB
}