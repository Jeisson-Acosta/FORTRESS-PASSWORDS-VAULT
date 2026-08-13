import { useContext } from "react";
import { UserLoginContext } from "../context/userLogin.jsx";

export function useUserLogin() {
    const context = useContext(UserLoginContext)

    if (context === undefined) {
        throw new Error('The Context UserLogin must be use with a Provider')
    }

    return context
}