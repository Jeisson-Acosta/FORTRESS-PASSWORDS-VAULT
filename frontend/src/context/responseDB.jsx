import { createContext, useState } from "react"
// Importar Loader

export const ResponseDBContext = createContext()

export function ResponseDBProvider({ children }) {
    const [responseDB, setResponseDB] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    return (
        <ResponseDBContext.Provider value={{responseDB, setResponseDB, isLoading, setIsLoading, error, setError}}>
            {isLoading && <h1>Cargando...</h1>}
            {children}
        </ResponseDBContext.Provider>
    )
}