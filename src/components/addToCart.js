import React, { useContext, useEffect, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import getStripe from '../utils/stripejs';
import { CartContext } from '../context/cart';
import { StoreContext } from '../context/store';

const AddToCart = ({ product, selectedId, onClick, __quantity }) => {
  const [store] = useContext(StoreContext);
  const [cart, updateCart] = useContext(CartContext);
  const [quantity, updateQuantity] = useState(__quantity || 1);
  const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars

  useEffect(() => {
    updateQuantity(__quantity);
  }, [__quantity]);

  const hasRecurrence = () => {
    return (
      product?.prices?.map(price => price?.recurring !== null)?.indexOf(true) >
      -1
    );
  };

  const addToCart = async () => {
    const tempCart = [...cart];
    let itemFound = false;

    // product is recurring, must immediately check out
    if (hasRecurrence()) {
      setLoading(true);

      const stripe = await getStripe();
      const payload = [
        {
          price: product?.prices?.filter(price => price?.id === selectedId)?.[0]
            ?.id,
          quantity: parseInt(quantity),
        },
      ];

      const { recurringError } = await stripe.redirectToCheckout({
        mode: 'subscription',
        lineItems: payload,
        successUrl: `${window.location.origin}/cart?checkout=success`,
        cancelUrl: `${window.location.origin}/cart`,
      });

      if (recurringError) {
        console.warn('Error:', recurringError);
        setLoading(false);
      }

      return;
    }

    tempCart.forEach(el => {
      el.prices &&
        el.prices.forEach(price => {
          if (price.id === selectedId) {
            if (price.quantity) {
              price.quantity += quantity;
            } else {
              price.quantity = quantity;
            }
            itemFound = true;
          }
        });
    });
    if (!itemFound) {
      // Item doesn't exist in the cart yet, so add it
      const tempItem = store[product.id];

      tempItem.prices.forEach(price => {
        if (selectedId === price.id) {
          price.quantity = quantity;
        }
      });
      tempCart.push(tempItem);
    }
    updateCart(tempCart);
    reactLocalStorage.setObject('cart', tempCart);
  };

  return (
    <>
      <button
        disabled={loading}
        className="button purchase"
        onClick={() => {
          addToCart();
          if (onClick) onClick();
        }}
      >
        {hasRecurrence() ? <>Buy Now</> : <>Add to Cart</>}
      </button>
    </>
  );
};

export default AddToCart;
