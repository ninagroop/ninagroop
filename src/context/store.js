import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { reactLocalStorage } from 'reactjs-localstorage'

const StoreContext = React.createContext({})

const StoreProvider = ({ children }) => {
  const [store, _updateStore] = useState([])

  const data = useStaticQuery(graphql`
    query ProductPrices {
      prices: allStripePrice(
        filter: { active: { eq: true } }
        sort: { fields: [unit_amount] }
      ) {
        edges {
          node {
            id
            active
            currency
            unit_amount
            nickname
            product {
              id
              name
              description
              metadata {
                # @TODO: call out explicit key enums in README
                gender
                color
                featured
              }
              images
            }
          }
        }
      }
    }
  `)

  // Group prices by product
  const products = {}
  for (const { node: price } of data.prices.edges) {
    const product = price.product
    if (!products[product.id]) {
      products[product.id] = Object.assign({}, product)
      products[product.id].prices = []
    }
    products[product.id].prices.push(Object.assign({}, price))
  }

  useEffect(() => {
    updateStore(products)
  }, [data])

  const updateStore = val => {
    _updateStore(val)
    reactLocalStorage.setObject('store', val)
  }

  const getStoreArray = () => {
    return Object.keys(store)?.map(productId => {
      return {
        id: productId,
        ...store[productId],
      }
    })
  }

  return (
    <StoreContext.Provider value={[store, updateStore, getStoreArray]}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
