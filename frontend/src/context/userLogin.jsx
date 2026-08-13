import { createContext, useState } from "react";

export const UserLoginContext = createContext()

export function UserLoginProvider({ children }) {
    const [userLogin, setUserLogin] = useState(null)

    return (
        <UserLoginContext.Provider value={{ userLogin, setUserLogin }}>
            {children}
        </UserLoginContext.Provider>
    )
}