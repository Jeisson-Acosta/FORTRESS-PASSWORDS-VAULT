import '../../styles/vault/ModalCreateEntry.css'
import { useState } from 'react'
import { useUserLogin } from '../../hooks/useUserLogin.js'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useInput } from '../../hooks/useInput.js'
import toast from 'react-hot-toast'

import { Input } from '../Input.jsx'
import { IconsEntries } from '../IconsEntries.jsx'
import { GlobeIcon, UserCircleIcon, LockSimpleIcon } from '../Icons.jsx'

export function ModalCreateEntry({ showModalCreateEntry, setShowModalCreateEntry, selectedCategory, setSelectedCategory, categoryList, getInfoVault, infoToEdit = null }) {

    console.log(infoToEdit)

    const [activeIconEntry, setActiveIconEntry] = useState(infoToEdit ? infoToEdit.connom_icon : 'LockSimpleIcon')

    console.log(activeIconEntry)

    const { userLogin } = useUserLogin()
    const { requestDB } = useRequestDB()

    const nameServiceEntry = useInput(infoToEdit ? infoToEdit.connom : '')
    const userEntry = useInput(infoToEdit ? infoToEdit.conusuario : '')
    const passwordEntry = useInput(infoToEdit ? infoToEdit.conpwd : '')

    const handleClickSaveEntry = async () => {

        if (!nameServiceEntry.value || !userEntry.value || !passwordEntry.value) {
            toast.error('Todos los campos deben de estar diligenciados')
            return
        }

        const infoToSave = {
            connom: nameServiceEntry.value,
            conusuario: userEntry.value,
            conpwd: passwordEntry.value,
            connom_icon: activeIconEntry,
            usuid: userLogin.usuid,
            catid: Number(selectedCategory),
        }

        const resultDB = await requestDB('main/create-app', 'POST', infoToSave)
        if (!resultDB.ok) {
            toast.error(resultDB.message)
            return
        }

        toast.success('¡Entrada creada correctamente!')
        setShowModalCreateEntry(false)
        setActiveIconEntry('LockSimpleIcon')
        setSelectedCategory(null)

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
                            onClick={() => setShowModalCreateEntry(false)}
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
