import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { StoreContext } from '../context/store'
import { Featured } from './featuredproducts-styles'
import { formatPrice } from '../helpers/currency-filter'
import ProductCard from './productCard'

const FeaturedProducts = () => {
  const [store, updateStore, getStoreArray] = useContext(StoreContext)
  // uses stripe metadata key `featured`
  const featuredData = getStoreArray()
    .filter(product => product?.metadata?.featured)
    ?.slice(0, 3)
  return (
    <Featured>
      <h2>
        <span>Featured Products</span>
      </h2>
      <div className="featureditems">
        {featuredData.map(product => (
          <ProductCard key={product?.id} showPriceDropdown product={product} />
        ))}
      </div>
    </Featured>
  )
}

export default FeaturedProducts
