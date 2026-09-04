import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

/**
 * Encripta un texto
 */
export function encrypt(text) {

    // Generar un IV aleatorio
    const iv = crypto.randomBytes(12)

    // Crear cifrador
    const cipher = crypto.createCipheriv(
        ALGORITHM,
        ENCRYPTION_KEY,
        iv
    )

    // Encriptar
    const encrypted = Buffer.concat([
        cipher.update(text, 'utf8'),
        cipher.final()
    ])

    // Obtener tag de autenticación
    const authTag = cipher.getAuthTag()

    // Guardamos IV + AuthTag + Datos encriptados
    return [
        iv.toString('hex'),
        authTag.toString('hex'),
        encrypted.toString('hex')
    ].join(':')
}


/**
 * Desencripta un texto
 */
export function decrypt(encryptedData) {

    const [
        ivHex,
        authTagHex,
        encryptedHex
    ] = encryptedData.split(':')

    const iv = Buffer.from(ivHex, 'hex')

    const authTag = Buffer.from(
        authTagHex,
        'hex'
    )

    const encrypted = Buffer.from(
        encryptedHex,
        'hex'
    )

    // Crear descifrador
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        ENCRYPTION_KEY,
        iv
    )

    // Agregar tag de autenticación
    decipher.setAuthTag(authTag)

    // Desencriptar
    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final()
    ])

    return decrypted.toString('utf8')
}