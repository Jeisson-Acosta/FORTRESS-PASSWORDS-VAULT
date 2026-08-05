import '../../styles/auth/LoginForm.css'
import { LockSimpleIcon, MailboxIcon, ShieldIcon } from "../../components/Icons.jsx"

import { Input } from '../../components/Input.jsx'
import { useInput } from '../../hooks/useInput.js'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

export function LoginForm() {

    const { requestDB } = useRequestDB();
    const navigate = useNavigate()

    const email = useInput('')
    const password = useInput('')

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        if (!email.value || !password.value) {
            toast.error('El correo y la contraseña no pueden estar vacios')
            return
        }

        const responseDB = await requestDB('auth/login', 'POST', { usuemail: email.value, usupwd: password.value })
        if (!responseDB || !responseDB.ok) {
            toast.error(`${responseDB ? responseDB.message : 'UPS, algo salio mal, vuelve a intentarlo'}`)
            return
        }

        // Poner info en el contexto
        navigate('/boveda')
    }

    return (
        <section className="principal-container-login">
            <header className="header-form-login">
                <div className="container-principal-icon">
                    <ShieldIcon />
                </div>
                <div className="title-description">
                    <h1 style={{color: 'var(--principalTitleColor)', fontWeight: 'bold', fontSize: '40px', fontFamily: 'fontPrincipalTitle'}}>
                        Fortress Vault
                    </h1>
                    <p style={{color: 'var(--subtitlesColor)', marginTop: '12px', letterSpacing: '2px'}}>
                        Enterprise-Grade Security
                    </p>
                </div>
            </header>

            <form className="form-login" onSubmit={handleSubmitForm}>
                <header className="header-form-login">
                    <h4 style={{fontFamily: 'fontSubtitle'}}>
                        Welcome
                    </h4>
                    <p>
                        Sign in to access your secure vault
                    </p>
                </header>
                <label htmlFor="email-address">
                    Email
                    <Input 
                        icon={<MailboxIcon />}
                        id={'email-address'}
                        type={'email'}
                        placeholder='name@domain.com'
                        {...email}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <Input 
                        icon={<LockSimpleIcon />}
                        id={'password'}
                        type={'password'}
                        placeholder='●●●●●●●●●●'
                        {...password}
                    />
                </label>
                <button type='submit'>
                    Sign In
                </button>
            </form>

            <button style={{background: 'transparent', cursor: 'pointer', border: 'none', outline: 'none', color: 'var(--mainColor)', fontWeight: 'bold', marginTop: '-30px'}}>
                Don´t have an account?
                <span style={{color: 'var(--subtitlesColor)'}}>
                    {' '}
                    Register Now
                </span>
            </button>
        </section>
    )
}