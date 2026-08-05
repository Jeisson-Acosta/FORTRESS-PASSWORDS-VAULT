import '../styles/MenuApp.css'
import { Outlet } from 'react-router-dom'
import { MenuApp } from './MenuApp.jsx'
import { HeaderApp } from './HeaderApp.jsx'

export function Layout() {
    return (
        <section>
            <MenuApp />
            <HeaderApp />
            <Outlet />
        </section>
    )
}