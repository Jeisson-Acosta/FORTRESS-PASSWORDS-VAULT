import { manageDB } from "../services/manageDB.js"

export class CategoryModel {

    static async createCategory ({ data }) {

        const { catcod, catnom, usuid } = data

        const existAlreadyCategory = await manageDB(null, [usuid, catcod], 'SELECT COUNT(*) AS count FROM tbl_categorias WHERE usuid = ? AND catcod = ?', 'CO')
        if (existAlreadyCategory.data[0].count > 0) {
            existAlreadyCategory.ok = false
            existAlreadyCategory.data = null
            existAlreadyCategory.message = 'Ya existe una categoria con el codigo digitado'
            return existAlreadyCategory
        }

        const resultDB = await manageDB('category_manage', [null, catcod, catnom, usuid, 'INS'])
        return resultDB

    }

    static async updateCategory({ data }) {

        const { catid, catcod, catnom } = data

        const existCategoryInDB = await manageDB(null, [catid], 'SELECT COUNT(*) AS count FROM tbl_categorias WHERE catid = ?', 'CO')
        if (existCategoryInDB.data[0].count === 0) {
            existCategoryInDB.ok = false
            existCategoryInDB.data = null
            existCategoryInDB.message = 'No existe la categoria a actualizar'
            return existCategoryInDB
        }

        const resultDB = await manageDB('category_manage', [catid, catcod, catnom, null, 'UPD'])
        return resultDB

    }

    static async deleteCategory ({ data }) {

        const { catid } = data

        const existCategoryInDB = await manageDB(null, [catid], 'SELECT COUNT(*) AS count FROM tbl_categorias WHERE catid = ?', 'CO')
        if (existCategoryInDB.data[0].count === 0) {
            existCategoryInDB.ok = false
            existCategoryInDB.data = null
            existCategoryInDB.message = 'No existe la categoria a eliminar'
            return existCategoryInDB
        }

        const resultDB = await manageDB('category_manage', [catid, null, null, null, 'DEL'])
        resultDB.message = 'Categoria eliminada correctamente'
        
        return resultDB
    }

}