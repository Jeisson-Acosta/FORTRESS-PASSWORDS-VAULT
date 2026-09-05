import '../../styles/Vault.css'
import { useUserLogin } from '../../hooks/useUserLogin.js'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { PlusIcon } from '../../components/Icons.jsx'
import { ButtonCategoryFilter } from '../../components/vault/ButtonCategoryFilter.jsx'
import { ModalCreateEntry } from '../../components/vault/ModalCreateEntry.jsx'
import { ModalShowPassword } from '../../components/vault/ModalShowPassword.jsx'
import { CardEntry } from '../../components/vault/CardEntry.jsx'

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

    const [showPassword, setShowPassword] = useState(false)
    const [passwordToShow, setPasswordToShow] = useState('')
    const [showModalCreateEntry, setShowModalCreateEntry] = useState(false)
    const [infoEntryToEdit, setInfoEntryToEdit] = useState({connom: '', conusuario: '', conpwd: '', connom_icon: '', catid: '', hasInfo: false})
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [infoVault, setInfoVault] = useState(null)
    const [infoVaultFiltered, setInfoVaultFiltered] = useState(null)

    const infoVaultToShow = infoVaultFiltered ? infoVaultFiltered : infoVault?.passwords_list

    const { userLogin } = useUserLogin()
    const { requestDB, isLoading } = useRequestDB()

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

    const handleClickEditEntry = async (entry) => {
        setInfoEntryToEdit({
            conid: entry.conid,
            connom: entry.connom,
            conusuario: entry.conusuario,
            conpwd: entry.conpwd,
            connom_icon: entry.connom_icon,
            catid: entry.catid,
            hasInfo: true
        })
        setShowModalCreateEntry(true)
    }

    const handleClickDeleteEntry = async (conid) => {

        const resultDB = await requestDB(`main/delete-app/${conid}`, 'DELETE')
        if (!resultDB.ok) {
            toast.error(resultDB.message)
            return
        }

        toast.success('¡Entrada eliminada correctamente!')
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
                    key={'Entradas Totales'}
                    title={'Entradas Totales'}
                    value={infoVault.total_entries}
                    colorValue={'acc4fd'}
                />

                <CardHeader 
                    key={'Categorias Totales'}
                    title={'Categorias Totales'}
                    value={infoVault.total_categories}
                    colorValue={'fcb2a9'}
                />
            </header>

            <div style={{padding: '20px'}}>

                <ButtonCategoryFilter 
                    categoryList={infoVault.category_list} 
                    listEntries={infoVault.passwords_list}
                    setInfoVaultFiltered={setInfoVaultFiltered}
                />

                {infoVault.passwords_list && 
                    <button 
                        onClick={() => setShowModalCreateEntry(true)}
                        style={{padding: '6px 20px', marginBottom: '14px'}}
                    >
                        <PlusIcon />
                        Nueva Entrada
                    </button>
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

                <ModalCreateEntry
                    showModalCreateEntry={showModalCreateEntry}
                    setShowModalCreateEntry={setShowModalCreateEntry}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categoryList={infoVault.category_list} 
                    getInfoVault={getInfoVault} 
                    setInfoEntryToEdit={setInfoEntryToEdit}
                    infoToEdit={infoEntryToEdit}
                />

                <ModalShowPassword 
                    showPassword={showPassword} 
                    passwordToShow={passwordToShow}
                />

                {infoVaultToShow && (
                    <section className='container-grid-entries'>
                        {infoVaultToShow.map(entry => 
                            <CardEntry 
                                key={entry.conid}
                                entry={entry}
                                handleClickEditEntry={handleClickEditEntry}
                                handleClickDeleteEntry={handleClickDeleteEntry}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                passwordToShow={passwordToShow}
                                setPasswordToShow={setPasswordToShow}
                            />
                        )}
                    </section>
                )}
                
            </div>
        </section>
    )
}