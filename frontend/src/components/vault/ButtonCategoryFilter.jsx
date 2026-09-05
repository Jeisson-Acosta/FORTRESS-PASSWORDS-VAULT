import '../../styles/vault/ButtonCategoryFilter.css'
import { useState } from "react"

export function ButtonCategoryFilter({ categoryList, listEntries, setInfoVaultFiltered }) {

    
    const [filterActive, setFilterActive] = useState('TOD')
    
    const handleClickFilterBtn = (catcod) => {
        setFilterActive(catcod)

        if (catcod === 'TOD') {
            setInfoVaultFiltered(listEntries)
        } else {
            setInfoVaultFiltered(listEntries.filter(entry => entry.catcod === catcod))
        }
    }

    if (!categoryList) return

    return (
        <div className='list-categories'>
            <button 
                className={`bt-category ${filterActive === 'TOD' ? 'active' : ''}`}
                onClick={() => handleClickFilterBtn('TOD')}
            >
                Todas
            </button>
            {categoryList.map(category => (
                <button 
                    className={`bt-category ${filterActive === category.catcod ? 'active' : ''}`} 
                    key={category.catid}
                    onClick={() => handleClickFilterBtn(category.catcod)}
                >
                    {category.catnom}
                </button>
            ))}
        </div>
    )
}
