import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import MainContainer from '../components/MainContainer'
import CatalogList from '../components/CatalogList'
import CatalogFilter from '../components/CatalogFilter'

import styles from '../styles/catalog.module.scss'

const Catalog = ({ cars }) => {
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [currentCarModel, setCurrentCarModel] = useState([])
  const [carModelList, setCarModelList] = useState([])

  const router = useRouter()

  useEffect(() => {
    setCarModelList(cars.meta.filters.brand)
  }, [])

  useEffect(() => {
    setLoadingStatus(false)
  }, [cars])

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      search: `?${currentCarModel.map(car => `brand=${car}&`).join('')}`
    })
  }, [currentCarModel])

  const updateFilterList = (event) => {
    setLoadingStatus(true)
    if (event.target.checked) {
      setCurrentCarModel(cars => [...cars, event.target.parentNode.innerText])
    } else {
      setCurrentCarModel(cars => cars.filter(car => car !== event.target.parentNode.innerText))
    }
  }

  return (
    <MainContainer page_title="Каталог автомобилей" className={ styles.CatalogPage }>
      <CatalogFilter carModels={ carModelList } updateFilterList={ updateFilterList } />
      <CatalogList cars={ cars } loadingStatus={ loadingStatus } />
    </MainContainer>
  )
}

export default Catalog

export async function getServerSideProps(context) {
  const { brand } = context.query;
  const res = await fetch(`https://api.carmart.ru/cars/temp?page=1&perPage=10${brand ? Array.isArray(brand) ? brand.map(queryName => `&brand=${encodeURIComponent(queryName)}`).join('') : `&brand=${encodeURIComponent(brand)}` : ''}`);
  const cars = await res.json();

  return { props: { cars } };
}