import '../styles/MenuApp.css'
import { Outlet } from 'react-router-dom'
import { MenuApp } from './MenuApp.jsx'
import { HeaderApp } from './HeaderApp.jsx'

export function Layout() {
    return (
        <section style={{display: 'flex'}}>
            <div>
                <MenuApp />
            </div>
            <div>
                <HeaderApp />
                <Outlet />
            </div>
        </section>
    )
}