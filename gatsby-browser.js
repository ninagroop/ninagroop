const React = require('react');
const { CartProvider } = require('./src/context/cart');
const { StoreProvider } = require('./src/context/store');

const RootLayout = ({ children }) => {
  return (
    <>
      <CartProvider>
        <StoreProvider>{children}</StoreProvider>
      </CartProvider>
    </>
  );
};

exports.wrapRootElement = ({ element }) => {
  return <RootLayout>{element}</RootLayout>;
};
