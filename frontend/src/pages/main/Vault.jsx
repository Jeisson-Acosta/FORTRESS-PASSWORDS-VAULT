import '../../styles/Vault.css'
import { useUserLogin } from '../../hooks/useUserLogin.js'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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

    const [infoVault, setInfoVault] = useState(null)
    const [filterActive, setFilterActive] = useState('TOD')
    const { userLogin } = useUserLogin()
    const { requestDB, isLoading } = useRequestDB()

    useEffect(() => {

        const infoVault = async () => {
            const resultDB = await requestDB(`main/get-info-vault/${userLogin.usuid}`, 'GET')
            if (!resultDB.ok) {
                toast.error(resultDB.message)
                return
            }
            resultDB.data[0].log_list = resultDB.data[0].log_list ? JSON.parse(resultDB.data[0].log_list) : resultDB.data[0].log_list
            resultDB.data[0].category_list = resultDB.data[0].category_list ? JSON.parse(resultDB.data[0].category_list) : resultDB.data[0].category_list
            resultDB.data[0].passwords_list = resultDB.data[0].passwords_list ? JSON.parse(resultDB.data[0].passwords_list) : resultDB.data[0].passwords_list
            setInfoVault(resultDB.data[0])
        }
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
                
                {!infoVault.passwords_list && <h2 style={{color: 'var(--subtitlesColor)', textAlign: 'center'}}>Aún no tienes entradas. ¡Crea tu primera entrada ahora mismo!</h2>}
            </div>


        </section>
    )
}