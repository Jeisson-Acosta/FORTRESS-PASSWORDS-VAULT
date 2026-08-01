import '../../styles/auth/LoginForm.css'
import { ShieldIcon } from "../../components/Icons.jsx"

export function LoginForm() {
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
        </section>
    )
}