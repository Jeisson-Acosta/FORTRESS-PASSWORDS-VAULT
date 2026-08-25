import '../../styles/Vault.css'
import { useUserLogin } from '../../hooks/useUserLogin.js'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GlobeIcon, LockSimpleIcon, PlusIcon, UserCircleIcon } from '../../components/Icons.jsx'
import { IconsEntries } from '../../components/IconsEntries.jsx'
import { Input } from '../../components/Input.jsx'

import { useInput } from '../../hooks/useInput.js'

function CardHeader({ title, value, colorValue }) {
    return (
        <div className="card-header-vault">
            <h3 style={{fontSize: '13px', marginBottom: '6px'}}>
                {title}
            </h3>
            <span style={{color: `#${colorValue}`, fontFamily: 'fontSubtitle', fontWeight: 'bold', fontSize: '14px'}}>{value}</span>
        </div>  
    )
}

export function Vault() {

    const [showModalCreateEntry, setShowModalCreateEntry] = useState(false)
    const [activeIconEntry, setActiveIconEntry] = useState('LockSimpleIcon')
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [infoVault, setInfoVault] = useState(null)
    const [filterActive, setFilterActive] = useState('TOD')
    const { userLogin } = useUserLogin()
    const { requestDB, isLoading } = useRequestDB()

    const nameServiceEntry = useInput('')
    const userEntry = useInput('')
    const passwordEntry = useInput('')

    const getInfoVault = async () => {
        const resultDB = await requestDB(`main/get-info-vault/${userLogin.usuid}`, 'GET')
        if (!resultDB.ok) {
            toast.error(resultDB.message)
            return
        }
        resultDB.data[0].log_list = resultDB.data[0].log_list ? JSON.parse(resultDB.data[0].log_list) : resultDB.data[0].log_list
        resultDB.data[0].category_list = resultDB.data[0].category_list ? JSON.parse(resultDB.data[0].category_list) : resultDB.data[0].category_list
        resultDB.data[0].passwords_list = resultDB.data[0].passwords_list ? JSON.parse(resultDB.data[0].passwords_list) : resultDB.data[0].passwords_list
        setInfoVault(resultDB.data[0])
        setSelectedCategory(resultDB.data[0].category_list.find(cat => cat.catcod === 'PER').catid)
    }


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
            catid: selectedCategory,
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

    useEffect(() => {
        const infoVault = async () => getInfoVault()

        infoVault()
    }, [])

    if (isLoading || !infoVault) return

    return (
        <section style={{marginTop: '30px'}}>
            <header className="header-vault">
                <CardHeader 
                    title={'Entradas Totales'}
                    value={infoVault.total_entries}
                    colorValue={'acc4fd'}
                />

                <CardHeader 
                    title={'Categorias Totales'}
                    value={infoVault.total_categories}
                    colorValue={'fcb2a9'}
                />
            </header>

            <div style={{padding: '20px'}}>
                {infoVault.category_list && 
                    <div className='list-categories'>
                        <button 
                            className={`bt-category ${filterActive === 'TOD' ? 'active' : ''}`}
                            onClick={() => setFilterActive('TOD')}
                        >
                            Todas
                        </button>
                        {infoVault.category_list.map(category => (
                            <button 
                                className={`bt-category ${filterActive === category.catcod ? 'active' : ''}`} 
                                key={category.catid}
                                onClick={() => setFilterActive(category.catcod)}
                            >
                                {category.catnom}
                            </button>
                        ))}
                    </div>
                }
                
                {!infoVault.passwords_list 
                    && (
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                            <h2 style={{color: 'var(--subtitlesColor)', textAlign: 'center'}}>Aún no tienes entradas. ¡Crea tu primera entrada ahora mismo!</h2>                            
                            <button onClick={() => setShowModalCreateEntry(true)}>
                                <PlusIcon />
                                Nueva Entrada
                            </button>
                        </div>
                    )
                }

                {
                    showModalCreateEntry && (
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
                                            {infoVault.category_list.map(category => (
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
            </div>


        </section>
    )
}