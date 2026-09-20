import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { useUserLogin } from "../../hooks/useUserLogin.js"
import toast from "react-hot-toast"

import '../../styles/Categories.css'
import { FoldersIcon, ChartLineUpIcon, LockSimpleIcon, PlusIcon, PencilSimpleIcon } from "../../components/Icons.jsx"
import { ModalCreateCategory } from "../../components/vault/ModalCreateCategory.jsx"

function CardHeaderCategories({ title, value, label, icon }) {
    return (
        <div className="card-header-categories">
            <div className="info-card-header-categories">
                <h3>{title}</h3>
                <span className="value-card-header-categories">{value}</span>
                {label && <span className="label-card-header-categories">{label}</span>}
            </div>
            <div className="icon-card-header-categories">
                {icon}
            </div>
        </div>
    )
}

export function Categories() {

    const [totalCategories, setTotalCategories] = useState(0)
    const [catnomMoreFrecuency, setCatnomMoreFrecuency] = useState(null)
    const [listCategories, setListCategories] = useState(null)
    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false)
    const [categoryToEdit, setCategoryToEdit] = useState({ catid: '', catcod: '', catnom: '', hasInfo: false })

    const { requestDB, isLoading } = useRequestDB()
    const { userLogin } = useUserLogin()
    const navigate = useNavigate()

    const getAllCategories = async () => {
        const resultDB = await requestDB(`category/${userLogin.usuid}`, 'GET')
        if (!resultDB.ok) {
            toast.error(resultDB.message)
            return
        }

        const infoCategories = resultDB.data[0]
        infoCategories.list_categories = infoCategories.list_categories ? infoCategories.list_categories : null

        setTotalCategories(infoCategories.total_categories)
        setCatnomMoreFrecuency(infoCategories.catnom_more_frecuency)
        setListCategories(infoCategories.list_categories)
    }

    const handleClickViewCategory = (catcod) => {
        navigate('/boveda', { state: { filterCatcod: catcod } })
    }

    const handleClickEditCategory = (category) => {
        setCategoryToEdit({
            catid: category.catid,
            catcod: category.catcod,
            catnom: category.catnom,
            hasInfo: true
        })
        setShowModalCreateCategory(true)
    }

    useEffect(() => {

        const categoriesList = async () => getAllCategories()
        categoriesList()

    }, [])

    if (isLoading) return

    return (
        <section style={{marginTop: '30px'}}>
            <header className="header-categories">
                <CardHeaderCategories
                    title={'Total Categorías'}
                    value={totalCategories}
                    label={'Activas'}
                    icon={<FoldersIcon />}
                />

                <CardHeaderCategories
                    title={'Mayor Frecuencia'}
                    value={catnomMoreFrecuency || 'Sin datos'}
                    icon={<ChartLineUpIcon />}
                />
            </header>

            <div style={{padding: '20px'}}>

                {listCategories && listCategories.length > 0 && (
                    <section className="container-grid-categories">
                        {listCategories.map(category => (
                            <div className="card-category" key={category.catid}>
                                <div className="header-card-category">
                                    <div className="icon-card-category">
                                        <FoldersIcon />
                                    </div>
                                    <button
                                        className="bt-edit-category"
                                        onClick={() => handleClickEditCategory(category)}
                                    >
                                        <PencilSimpleIcon />
                                    </button>
                                </div>
                                <h3 className="title-card-category">
                                    {category.catnom}
                                </h3>
                                <div className="footer-card-category">
                                    <LockSimpleIcon />
                                    <span>{category.cattotal ?? 0} credenciales</span>
                                </div>
                                <button
                                    className="bt-view-category"
                                    onClick={() => handleClickViewCategory(category.catcod)}
                                >
                                    Ver contraseñas →
                                </button>
                            </div>
                        ))}
                    </section>
                )}

                {(!listCategories || listCategories.length === 0) && (
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px'}}>
                        <h2 style={{color: 'var(--subtitlesColor)', textAlign: 'center'}}>Aún no tienes categorías creadas.</h2>
                        <button onClick={() => setShowModalCreateCategory(true)}>
                            <PlusIcon />
                            Crear Categoría
                        </button>
                    </div>
                )}

                <ModalCreateCategory
                    showModalCreateCategory={showModalCreateCategory}
                    setShowModalCreateCategory={setShowModalCreateCategory}
                    getAllCategories={getAllCategories}
                    categoryToEdit={categoryToEdit}
                    setCategoryToEdit={setCategoryToEdit}
                />

            </div>
        </section>
    )

}
