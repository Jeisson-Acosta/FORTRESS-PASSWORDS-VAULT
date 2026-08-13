import '../styles/HeaderApp.css'
import { BellIcon, MenuIcon, UserCircleIcon } from './Icons.jsx'

import { useUserLogin } from '../hooks/useUserLogin.js'


export function HeaderApp({ showMenu, handlerShowMenu }) {

    const { userLogin } = useUserLogin()

    const handleClickIconMenu = () => handlerShowMenu(!showMenu)

    return (
        <header className='header-app'>
            <div 
                onClick={handleClickIconMenu}
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', cursor: 'pointer'}}
            >
                <MenuIcon />
            </div>
            <div className='header-app-info-user'>
                <div id='icon-notifications'>
                    <BellIcon />
                </div>
                <h4 style={{color: 'var(--subtitlesColor)'}}>
                    {userLogin.usunom}
                </h4>
                <button>
                    <UserCircleIcon />
                </button>
            </div>
        </header>
    )
}