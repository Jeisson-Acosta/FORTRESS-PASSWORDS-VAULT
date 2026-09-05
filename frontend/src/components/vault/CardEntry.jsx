import '../../styles/vault/CardEntry.css'
import { useShowPassword } from "../../hooks/vault/useShowPassword.js"

import { IconsEntries } from "../IconsEntries.jsx"
import { PencilSimpleIcon, TrashIcon, EyeIcon, CopyIcon } from "../Icons.jsx"

export function CardEntry({ entry, handleClickEditEntry, handleClickDeleteEntry, showPassword, setShowPassword, passwordToShow, setPasswordToShow }) {

    const { conid, catnom, connom, conusuario, conpwd, connom_icon } = entry
    const { handleClickShowPassword, handleClickCopyPassword } = useShowPassword(showPassword, setShowPassword, passwordToShow, setPasswordToShow)

    const Icon = IconsEntries[connom_icon]

    return (
        <div className='card-entry'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '14px'}}>
                <div className="name-category">
                    {catnom}
                </div>
                <div className="actions-card-entry">
                    <button
                        onClick={() => handleClickEditEntry(entry)}
                    >
                        <PencilSimpleIcon />
                    </button>
                    <button
                        onClick={() => handleClickDeleteEntry(conid)}
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>
            <header>
                <div className="icon-entry">
                    <Icon />
                </div>
                <div className='name-user-entry'>
                    <h4 className='name-entry'>
                        {connom}
                    </h4>
                    <p className='user-entry'>
                        {conusuario}
                    </p>
                </div>
            </header>
            <div className="container-input-pwd-entry">
                <input 
                    type="password" 
                    value={conpwd}
                />
                <div className="icons-actions-input-pwd">
                    <button className="icon-action-pwd" onClick={() => handleClickShowPassword(conid)}>
                        <EyeIcon />
                    </button>
                    <button 
                        className="icon-action-pwd"
                        onClick={() => handleClickCopyPassword(conid)}
                    >
                        <CopyIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}