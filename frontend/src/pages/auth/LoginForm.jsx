import '../../styles/auth/LoginForm.css'
import { LockSimpleIcon, MailboxIcon, ShieldIcon } from "../../components/Icons.jsx"

import { Input } from '../../components/Input.jsx'
import { useInput } from '../../hooks/useInput.js'

export function LoginForm() {

    const email = useInput('')
    const password = useInput('')

    const handleSubmitForm = (e) => {
        e.preventDefault()
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
        </section>
    )
}