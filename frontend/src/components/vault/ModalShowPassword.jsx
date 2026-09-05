import '../../styles/vault/ModalShowPassword.css'

export function ModalShowPassword({ showPassword, passwordToShow }) {

    if (!showPassword) return

    return (
        <aside className="modal-view-password">
            <section className="container-fields-modal">
                <h4>
                    {passwordToShow}
                </h4>
            </section>
        </aside>
    )
}