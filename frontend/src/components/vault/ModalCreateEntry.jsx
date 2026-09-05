import '../../styles/vault/ModalCreateEntry.css'
import { useEffect, useState } from 'react'
import { useUserLogin } from '../../hooks/useUserLogin.js'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useInput } from '../../hooks/useInput.js'
import toast from 'react-hot-toast'

import { Input } from '../Input.jsx'
import { IconsEntries } from '../IconsEntries.jsx'
import { GlobeIcon, UserCircleIcon, LockSimpleIcon } from '../Icons.jsx'

export function ModalCreateEntry({ showModalCreateEntry, setShowModalCreateEntry, selectedCategory, setSelectedCategory, categoryList, getInfoVault, setInfoEntryToEdit, infoToEdit = null }) {


    const [activeIconEntry, setActiveIconEntry] = useState('LockSimpleIcon')
    const { userLogin } = useUserLogin()
    const { requestDB } = useRequestDB()

    const nameServiceEntry = useInput('')
    const userEntry = useInput('')
    const passwordEntry = useInput('')

    useEffect(() => {

        if (infoToEdit.hasInfo) {

            setActiveIconEntry(infoToEdit.connom_icon)
            nameServiceEntry.onChange({ target: { value: infoToEdit.connom } })
            userEntry.onChange({ target: { value: infoToEdit.conusuario } })
            passwordEntry.onChange({ target: { value: infoToEdit.conpwd } })

        } else {
            nameServiceEntry.onChange({ target: { value: '' } })
            userEntry.onChange({ target: { value: '' } })
            passwordEntry.onChange({ target: { value: '' } })
        }

    }, [infoToEdit])

    const handleClickCancelEntry = () => {

        setInfoEntryToEdit({connom: '', conusuario: '', conpwd: '', connom_icon: '', catid: '', hasInfo: false})
        setShowModalCreateEntry(false)
    }


    const handleClickSaveEntry = async () => {

        if (!nameServiceEntry.value || !userEntry.value || !passwordEntry.value) {
            toast.error('Todos los campos deben de estar diligenciados')
            return
        }

        const infoToSave = {
            conid: infoToEdit.hasInfo ? infoToEdit.conid : null,
            connom: nameServiceEntry.value,
            conusuario: userEntry.value,
            conpwd: passwordEntry.value,
            connom_icon: activeIconEntry,
            usuid: userLogin.usuid,
            catid: Number(selectedCategory),
        }

        const URL = infoToEdit.hasInfo ? 'main/update-app' : 'main/create-app'

        const resultDB = await requestDB(URL, infoToEdit.hasInfo ? 'PATCH' : 'POST', infoToSave)
        if (!resultDB.ok) {
            toast.error(resultDB.message)
            return
        }

        toast.success(!infoToEdit.hasInfo ? '¡Entrada creada correctamente!' : '¡Entrada actualizada correctamente!')
        setShowModalCreateEntry(false)
        setActiveIconEntry('LockSimpleIcon')
        setSelectedCategory(null)
        setInfoEntryToEdit({connom: '', conusuario: '', conpwd: '', connom_icon: '', catid: '', hasInfo: false})

        getInfoVault()

    }

    if (!showModalCreateEntry) return


    return (
        <aside className='modal-create-entry'>
            <section className='container-fields-modal'>
                <header>
                    <h2 style={{color: 'var(--principalTitleColor)'}}>
                        Crear entrada
                    </h2>
                    <p>
                        Añade un nuevo servicio para tu lista de entradas
                    </p>
                </header>

                <div className='container-all-fields'>
                    <div style={{marginBottom: '12px'}}>
                        <h5 style={{fontFamily: 'fontSubtitle', fontSize: '13px', color: 'var(--subtitlesColor)', fontWeight: 'normal', marginBottom: '8px'}}>
                            Icono del servicio
                        </h5>
                        <div className='container-icons-service'>
                            {Object.keys(IconsEntries).map(icon => {

                                const Icon = IconsEntries[icon]

                                return (
                                    <div 
                                        key={icon}
                                        className={`icon-service ${icon === activeIconEntry ? 'active' : ''}`}
                                        onClick={() => setActiveIconEntry(icon)}
                                    >
                                        <Icon />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <label htmlFor="service-name">
                        Nombre del Servicio
                        <Input 
                            icon={<GlobeIcon />}  
                            id={'service-name'}
                            type={'text'}
                            placeholder={'EJ: Github, Netflix, Gmail...'}
                            {...nameServiceEntry}
                        />
                    </label>
                    <label htmlFor="category">
                        Categoría
                        <select id="category" onChange={(e) => setSelectedCategory(e.target.value)}>
                            {categoryList.map(category => (
                                <option value={category.catid}>
                                    {category.catnom}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="username">                                        
                        Usuario o Correo
                        <Input 
                            icon={<UserCircleIcon />}  
                            id={'username'}
                            type={'text'}
                            placeholder={'nombre@dominio.com'}
                            {...userEntry}
                        />                                        
                    </label>
                    <label htmlFor="password">                                        
                        Contraseña
                        <Input 
                            icon={<LockSimpleIcon />}  
                            id={'password'}
                            type={'password'}
                            placeholder={'●●●●●●●●●●'}
                            {...passwordEntry}
                        />                                        
                    </label>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px'}}>
                        <button 
                            style={{width: '100%', backgroundColor: 'transparent', color: 'var(--mainColor)', border: '1px solid #252b3a'}}
                            onClick={handleClickCancelEntry}
                        >
                            Cancelar
                        </button>
                        <button style={{width: '100%'}} onClick={handleClickSaveEntry}>
                            Guardar Entrada
                        </button>
                    </div>
                </div>

            </section>
        </aside>

    )
}
