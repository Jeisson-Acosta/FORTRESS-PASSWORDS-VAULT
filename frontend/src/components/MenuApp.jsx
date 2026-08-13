import { ClockLogIcon, FoldersIcon, LockSimpleIcon, PlusIcon, SignOutIcon } from "./Icons.jsx"
import { NavLink } from "react-router-dom"

import { useEffect } from "react"

export function MenuApp({ showMenu, handlerShowMenu }) {

    useEffect(() => {
        handlerShowMenu(true)
    }, [])

    return (
        <section className="container-menu-app" style={{transform: showMenu ? 'translateX(0%)' : 'translateX(-100%)'}}>
            <div style={{width: '100%', marginTop: '56px'}}>
                <header className="header-menu-app">
                    <div style={{width: '100%'}}>
                        <h4 style={{ color: 'var(--principalTitleColor)' }}>
                            Fortress Vault
                        </h4>
                        <h5>
                            Enterprise Secure
                        </h5>
                    </div>
                    <button>
                        <PlusIcon />
                        Nueva Entrada
                    </button>
                </header>
                <nav className="options-menu-app">
                    <ul>
                        <NavLink to={'/boveda'}>
                            <li className="vault-option-menu">
                                <LockSimpleIcon />
                                <span className="text-module">
                                    Boveda
                                </span>
                            </li>
                        </NavLink>
                        <NavLink to={'/categorias'}>
                            <li className="categories-option-menu">
                                <FoldersIcon />
                                <span className="text-module">
                                    Categorias
                                </span>
                            </li>
                        </NavLink>
                        <NavLink to={'/log'}>
                            <li className="log-option-menu">
                                <ClockLogIcon />
                                <span className="text-module">
                                    Log
                                </span>
                            </li>
                        </NavLink>
                    </ul>
                </nav>
            </div>
            <footer className="footer-menu-app">
                <button>
                    <SignOutIcon />
                    Cerrar Sesión
                </button>
            </footer>
        </section>
    )
}