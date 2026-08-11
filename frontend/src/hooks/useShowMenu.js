import { useState } from "react"
export function useShowMenu() {

    const [showMenu, setShowMenu] = useState(true)
    const handlerShowMenu = (show) => setShowMenu(show)

    return {
        showMenu,
        handlerShowMenu
    }

}