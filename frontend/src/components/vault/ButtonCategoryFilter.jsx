import '../../styles/vault/ButtonCategoryFilter.css'
import { useState } from "react"

export function ButtonCategoryFilter({ categoryList }) {

    const [filterActive, setFilterActive] = useState('TOD')

    if (!categoryList) return

    return (
        <div className='list-categories'>
            <button 
                className={`bt-category ${filterActive === 'TOD' ? 'active' : ''}`}
                onClick={() => setFilterActive('TOD')}
            >
                Todas
            </button>
            {categoryList.map(category => (
                <button 
                    className={`bt-category ${filterActive === category.catcod ? 'active' : ''}`} 
                    key={category.catid}
                    onClick={() => setFilterActive(category.catcod)}
                >
                    {category.catnom}
                </button>
            ))}
        </div>
    )
}
