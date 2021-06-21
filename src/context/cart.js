import React, { useState, useEffect } from "react"
import { reactLocalStorage } from "reactjs-localstorage"

const CartContext = React.createContext()

const CartProvider = props => {
  const [cart, _updateCart] = useState([])

  const updateCart = val => {
    reactLocalStorage.setObject("cart", val)
    _updateCart(val)
  }

  const getTotalCount = () => {
    let total = 0
    cart.forEach(item => {
      item.prices.forEach(price => {
        if (price.quantity) {
          total += price.quantity
        }
      })
    })
    return total
  }

  useEffect(() => {
    let storedCart = reactLocalStorage.getObject("cart")

    // Check if there are no entries, if so change the empty object to an empty array
    if (Object.entries(storedCart).length === 0) {
      storedCart = []
    }
    updateCart(storedCart)
  }, [])

  return (
    <CartContext.Provider value={[cart, updateCart, getTotalCount]}>
      {props.children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
