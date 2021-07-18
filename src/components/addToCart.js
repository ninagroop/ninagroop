import React, { useContext } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { CartContext } from '../context/cart';
import { StoreContext } from '../context/store';

const AddToCart = ({ product, selectedId, quantity }) => {
  const [cart, updateCart] = useContext(CartContext);
  const [store] = useContext(StoreContext);

  const addToCart = () => {
    const tempCart = [...cart];
    let itemFound = false;

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
    <button className="button purchase" onClick={addToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
