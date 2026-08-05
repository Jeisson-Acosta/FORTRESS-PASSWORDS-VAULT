import { ClockLogIcon, FoldersIcon, LockSimpleIcon, PlusIcon, SignOutIcon } from "./Icons.jsx"
import { NavLink } from "react-router-dom"

export function MenuApp() {
    return (
        <section className="container-menu-app">
            <header>
                <div>
                    <h3>
                        Fortress Vault
                    </h3>
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
            <footer className="footer-menu-app">
                <button>
                    <SignOutIcon />
                    Cerrar Sesión
                </button>
            </footer>
        </section>
    )
}