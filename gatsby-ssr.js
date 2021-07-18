const React = require('react')
const { CartProvider } = require('./src/context/cart')
const { StoreProvider } = require('./src/context/store')

exports.wrapRootElement = ({ element }) => {
  return (
    <CartProvider>
      <StoreProvider>{element}</StoreProvider>
    </CartProvider>
  )
}
