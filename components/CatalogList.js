import CatalogItem from './CatalogItem'

import styles from '../styles/CatalogList.module.scss'

const CatalogList = ({ cars, loadingStatus }) => {

  return (
    <div className={ styles.CatalogList }>
      { cars && cars.list.map(car => {
        return <CatalogItem item={ car } key={ car['_id'] } />
      }) }
    </div>
  )
}

export default CatalogList