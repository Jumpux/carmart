import { useState } from 'react'

import styles from '../styles/FilterSelect.module.scss'

const FilterSelect = ({ carModels, updateFilterList }) => {

  const [isSelected, updateSelected] = useState(false)

  return (
    <div className={ `${ styles.filterForm } ${ isSelected ? styles.open : '' }` }>
      <div className={ styles.mainBlock } onClick={ () => updateSelected(status => !status) }>Модель</div>
      <form>
        { carModels && carModels.length > 1 && carModels.map((car) => {
          return (
            <div className={ styles.carBlock } key={ car }>
              <input type="checkbox" id={ `car-filter-${ car }` } onChange={ e => updateFilterList(e) } />
              <label htmlFor={ `car-filter-${ car }` }>{ car }</label>
            </div>
          )
        }) }
      </form>
    </div>
  )
}

export default FilterSelect