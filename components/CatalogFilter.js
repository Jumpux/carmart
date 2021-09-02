import FilterSelect from './FilterSelect'

import styles from '../styles/CatalogFilter.module.scss'

const CatalogFilter = ({ carModels, carList, updateFilterList }) => {
  return (
    <div className={styles.mainBlock}>
      <FilterSelect carModels={carModels} carList={carList} updateFilterList={updateFilterList}/>
    </div>
  )
}

export default CatalogFilter