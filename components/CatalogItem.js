import Slider from 'react-slick'

import styles from '../styles/CatalogItem.module.scss'

const CustomSlide = ({ link }, props) => {
  return (
    <div { ...props }>
      <img src={ `${ link }` } alt="" />
    </div>
  )
}

const CatalogItem = ({ item }) => {

  const formatPrice = (price) => {
    const str = String(Math.floor(price))
    const s = str.length
    const chars = str.split('')
    const strWithSpaces = chars.reduceRight((acc, char, i) => {
      const spaceOrNothing = ((((s - i) % 3) === 0) ? ' ' : '')
      return (spaceOrNothing + char + acc)
    }, '')

    return ((strWithSpaces[0] === ' ') ? strWithSpaces.slice(1) : strWithSpaces)
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: `${ styles.catalogSlider }`,
    lazyLoad: 'progressive',

  }

  return (
    <div className={ styles.carCard }>
      <div className={ styles.cardBody }>
        <h2 className={ styles.carTitle }>{ item.feedData.modelName }
          <span
            className={ styles.carYear }>{ item.feedData.productionDate && item.feedData.productionDate.split('-')[0] }</span>
        </h2>
        <p className={ styles.vin }>{ item.feedData.vin }</p>
        <div className={ styles.carGallery }>
          { item.feedData.photo ?
            (
              <Slider className={ styles.catalogSlider } { ...settings }>
                {item.feedData.photo.map((img, index) => <CustomSlide key={index} link={ img.link } index={ index } />)}
              </Slider>
            )
            :
            <img src="https://photobank.carmart.ru/photo/stock-default.jpg" className={ styles.noPhoto } alt="" /> }
        </div>
        <div className={ `${ styles.subBlock } ${ styles.withPrice }` }>
          <div>
            <h5>Двигатель</h5>
            <p>
              { `${ Math.ceil((item.feedData.engineCapacity ? item.feedData.engineCapacity : item.feedData.engine.engineCapacity) / 100) }`.split('').join(',') }
              <span>/</span>
              { Math.ceil(item.feedData.enginePower ? item.feedData.enginePower : item.feedData.engine.enginePower) }
              <span>/</span>
              { (item.feedData.engineType ? item.feedData.engineType : item.feedData.equipmentVariantFuelType) }
            </p>
          </div>
          <div className={ styles.carPrice }>{ formatPrice(item.feedData.autoPrice) } <span>₽</span></div>
        </div>
        <div className={ styles.subBlock }>
          <h5>Кпп</h5>

          <p>{ item.feedData.transmission ? item.feedData.transmission : item.feedData.equipmentVariantTransmissionType }</p>

        </div>
        <div className={ `${ styles.subBlock } ${ styles.withBtn }` }>
          <div>
            <h5>Пробег</h5>
            <p>{ item.feedData.autoProbeg }</p>
          </div>
          <button>Купить</button>
        </div>
      </div>
    </div>
  )
}


export default CatalogItem