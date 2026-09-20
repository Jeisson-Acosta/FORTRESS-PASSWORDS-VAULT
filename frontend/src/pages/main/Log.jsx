import { useState, useEffect } from "react"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { useUserLogin } from "../../hooks/useUserLogin.js"
import toast from "react-hot-toast"

import '../../styles/Log.css'

const LOG_TYPE_INFO = {
    INS: { label: 'Creación', className: 'log-type-ins' },
    UPD: { label: 'Actualización', className: 'log-type-upd' },
    DEL: { label: 'Eliminación', className: 'log-type-del' }
}

function formatLogDate(logfec) {
    if (!logfec) return '-'

    const date = new Date(logfec)
    return date.toLocaleString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function getAffectedName(log) {
    if (log.connom) return `Entrada: ${log.connom}`
    if (log.catnom) return `Categoría: ${log.catnom}`
    return 'Elemento eliminado'
}

export function Log() {

    const [listLogs, setListLogs] = useState(null)

    const { requestDB, isLoading } = useRequestDB()
    const { userLogin } = useUserLogin()

    const getAllLogs = async () => {
        const resultDB = await requestDB(`log/${userLogin.usuid}`, 'GET')
        if (!resultDB.ok) {
            toast.error(resultDB.message)
            return
        }

        setListLogs(resultDB.data)
    }

    useEffect(() => {

        const logsList = async () => getAllLogs()
        logsList()

    }, [])

    if (isLoading) return

    return (
        <section style={{marginTop: '30px', padding: '20px'}}>

            {listLogs && listLogs.length > 0 && (
                <div className="container-table-log">
                    <table className="table-log">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo de Acción</th>
                                <th>Categoría / Entrada Afectada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listLogs.map(log => {
                                const typeInfo = LOG_TYPE_INFO[log.logtip] ?? { label: log.logtip, className: '' }

                                return (
                                    <tr key={log.logid}>
                                        <td>{formatLogDate(log.logfec)}</td>
                                        <td>
                                            <span className={`badge-log-type ${typeInfo.className}`}>
                                                {typeInfo.label}
                                            </span>
                                        </td>
                                        <td>{getAffectedName(log)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {(!listLogs || listLogs.length === 0) && (
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px'}}>
                    <h2 style={{color: 'var(--subtitlesColor)', textAlign: 'center'}}>Aún no hay actividad registrada.</h2>
                </div>
            )}

        </section>
    )
}
