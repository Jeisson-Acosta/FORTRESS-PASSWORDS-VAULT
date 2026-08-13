import '../styles/MenuApp.css'
import { Outlet } from 'react-router-dom'
import { MenuApp } from './MenuApp.jsx'
import { HeaderApp } from './HeaderApp.jsx'

import { useShowMenu } from '../hooks/useShowMenu.js'

export function Layout() {

    const { showMenu, handlerShowMenu } = useShowMenu()

    return (
        <section style={{display: 'flex'}}>
            <div>
                <MenuApp
                    showMenu={showMenu}
                    handlerShowMenu={handlerShowMenu}
                 />
            </div>
            <div style={{width: '100%'}}>
                <HeaderApp 
                    showMenu={showMenu}
                    handlerShowMenu={handlerShowMenu}
                />
                <Outlet />
            </div>
        </section>
    )
}