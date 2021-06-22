import React, { useContext, useState, useEffect } from "react"
import { graphql, useStaticQuery, StaticQuery } from "gatsby"
import ProductCard from "./ProductCard"
import { StoreContext } from "../../context/store"

const containerStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "1rem 0 1rem 0",
}

const Products = ({ filter }) => {
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
            product {
              id
              name
              metadata {
                # @TODO: call out explicit key enums in README
                gender
                color
              }
              images
            }
          }
        }
      }
    }
  `)

  const [store, updateStore] = useContext(StoreContext)

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
  }, [])

  return (
    <div style={containerStyles}>
      {Object.keys(products).map(key => {
        if (filter && products[key]?.metadata?.[filter?.key] !== filter.value) {
          return null
        }
        return <ProductCard key={products[key].id} product={products[key]} />
      })}
    </div>
  )
}

export default Products
