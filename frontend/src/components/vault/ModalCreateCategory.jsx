import '../../styles/vault/ModalCreateCategory.css'
import { useEffect } from 'react'
import { useUserLogin } from '../../hooks/useUserLogin.js'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useInput } from '../../hooks/useInput.js'
import toast from 'react-hot-toast'

import { Input } from '../Input.jsx'
import { FoldersIcon, CloseIcon } from '../Icons.jsx'

// El codigo se calcula automaticamente a partir del nombre de la categoria:
// se toman sus 3 primeras letras (sin tildes ni espacios) en mayuscula.
const generateCatCod = (catnom) => {
    return catnom
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-zA-Z]/g, '')
        .toUpperCase()
        .slice(0, 3)
}

export function ModalCreateCategory({ showModalCreateCategory, setShowModalCreateCategory, getAllCategories, categoryToEdit, setCategoryToEdit }) {

    const { userLogin } = useUserLogin()
    const { requestDB } = useRequestDB()

    const nameCategory = useInput('')
    const catcodPreview = generateCatCod(nameCategory.value)

    const isEditing = Boolean(categoryToEdit?.hasInfo)

    useEffect(() => {

        if (categoryToEdit?.hasInfo) {
            nameCategory.onChange({ target: { value: categoryToEdit.catnom } })
        } else {
            nameCategory.onChange({ target: { value: '' } })
        }

    }, [categoryToEdit])

    const resetAndClose = () => {
        nameCategory.onChange({ target: { value: '' } })
        setCategoryToEdit?.({ catid: '', catcod: '', catnom: '', hasInfo: false })
        setShowModalCreateCategory(false)
    }

    const handleClickCloseModal = () => {
        resetAndClose()
    }

    const handleClickSaveCategory = async () => {

        if (!nameCategory.value) {
            toast.error('El nombre de la categoría es obligatorio')
            return
        }

        if (isEditing) {

            const infoToUpdate = {
                catid: categoryToEdit.catid,
                catcod: catcodPreview,
                catnom: nameCategory.value
            }

            const resultDB = await requestDB('category/update', 'PATCH', infoToUpdate)
            if (!resultDB.ok) {
                toast.error(resultDB.message)
                return
            }

            toast.success('¡Categoría actualizada correctamente!')

        } else {

            const infoToSave = {
                catcod: catcodPreview,
                catnom: nameCategory.value,
                usuid: userLogin.usuid
            }

            const resultDB = await requestDB('category/create', 'POST', infoToSave)
            if (!resultDB.ok) {
                toast.error(resultDB.message)
                return
            }

            toast.success('¡Categoría creada correctamente!')

        }

        resetAndClose()
        getAllCategories()

    }

    if (!showModalCreateCategory) return

    return (
        <aside className='modal-create-category'>
            <section className='container-fields-modal'>
                <header>
                    <div className='title-modal-category'>
                        <div className='icon-title-modal-category'>
                            <FoldersIcon />
                        </div>
                        <div>
                            <h2 style={{color: 'var(--principalTitleColor)'}}>
                                {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
                            </h2>
                            <p>
                                {isEditing ? 'Actualiza el nombre de tu categoría' : 'Crea una categoría para tus contraseñas'}
                            </p>
                        </div>
                    </div>
                    <button className='bt-close-modal-category' onClick={handleClickCloseModal}>
                        <CloseIcon />
                    </button>
                </header>

                <div className='container-all-fields'>
                    <label htmlFor="category-name">
                        Nombre de la Categoría
                        <Input
                            id={'category-name'}
                            type={'text'}
                            placeholder={'EJ: Trabajo, Personal, Finanzas...'}
                            {...nameCategory}
                        />
                    </label>
                    <label htmlFor="category-code">
                        Código de la Categoría
                        <Input
                            id={'category-code'}
                            type={'text'}
                            placeholder={'Se genera automáticamente'}
                            value={catcodPreview}
                            disabled
                            onChange={() => {}}
                        />
                    </label>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px'}}>
                        <button
                            style={{width: '100%', backgroundColor: 'transparent', color: 'var(--mainColor)', border: '1px solid #252b3a'}}
                            onClick={handleClickCloseModal}
                        >
                            Cancelar
                        </button>
                        <button style={{width: '100%'}} onClick={handleClickSaveCategory}>
                            {isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
                        </button>
                    </div>
                </div>
            </section>
        </aside>
    )
}
