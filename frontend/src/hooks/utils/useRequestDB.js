import { useResponseDB } from "./useResponseDB.js"
import { useCallback } from "react"

const API = import.meta.env.VITE_API_URL

export const useRequestDB = () => {
    const { setResponseDB, isLoading, setIsLoading, setError } = useResponseDB()

    const requestDB = useCallback(async (url, method, body) => {
        try {
            setIsLoading(true)
            setError(null)

            const isFormData = body instanceof FormData

            const responseDB = await fetch(`${API}/${url}`, {
                method: method,
                headers: isFormData ? undefined : { 'Content-Type': "application/json" },
                credentials: 'include',
                body: method !== 'GET' ? (isFormData ? body : JSON.stringify(body)) : undefined
            })

            if (!responseDB.ok) {
                setError(responseDB.message)
                return
            }

            const data = await responseDB.json()
            setResponseDB(data)
            return data
        } catch (e) {
            setError(`Error al hacer peticion al backend: ${e.message}`)
            return {
                ok: false,
                message: `Error al hacer peticion al backend: ${e.message}`
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    return { requestDB, isLoading }
}