import React, { useContext } from 'react';
import { CartContext } from '../context/cart';
import { CartUIContext } from '../context/cartUI';
import { Section, h2, h4 } from './cartsteps-styles';

const CartSteps = () => {
  const [cartUIStatus] = useContext(CartUIContext);
  const [cart, updateCart, getTotalCount] = useContext(CartContext); // eslint-disable-line no-unused-vars
  return (
    <Section>
      <div className="shopping">
        <h2
          className={
            cartUIStatus === 'idle' && getTotalCount() === 0
              ? 'active checkout-circle'
              : 'checkout-circle'
          }
        >
          01
        </h2>
        <h4 className="checkout-title">Shopping Cart</h4>
      </div>
      <div className="checkout">
        <h2
          className={
            cartUIStatus === 'idle' && getTotalCount() > 0
              ? 'active checkout-circle'
              : 'checkout-circle'
          }
        >
          02
        </h2>
        <h4 className="checkout-title">Check out</h4>
      </div>
      <div className="order">
        <h2
          className={
            cartUIStatus === 'success'
              ? 'active checkout-circle'
              : 'checkout-circle'
          }
        >
          03
        </h2>
        <h4 className="checkout-title">Order Complete</h4>
      </div>
    </Section>
  );
};

export default CartSteps;
