import '../styles/Input.css'

export function Input ({ icon, id, type, placeholder, ...props }) {

    return (
        <div className="input-component">
            {icon && <div className="icon-input-component">{icon}</div>}
            <input 
                type={type} 
                placeholder={placeholder}
                id={id}
                {...props}
            />
        </div>
    )
}