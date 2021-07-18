import React, { useContext, useState } from 'react';
import getStripe from '../utils/stripejs';
import { Link } from 'gatsby';
import { formatPrice } from '../helpers/currency-filter';
import { CartContext } from '../context/cart';
import {
  Table,
  TR,
  TH,
  TD,
  ProductName,
  ProductImg,
  Payment,
} from './cartdisplay-styles';
import { CartTotal } from '../helpers/cart-total';
import { StoreContext } from '../context/store';

const VariantRows = ({ variants, removeFromCart }) =>
  variants.map(variant => {
    if (variant.quantity < 1) return null;
    return (
      <TR key={variant.id}>
        <TD className="variant">{variant?.nickname}</TD>
        <TD>
          <h4 className="price">{formatPrice(variant?.unit_amount)}</h4>
        </TD>
        <TD>
          <strong>{variant.quantity}</strong>
        </TD>
        <TD>{formatPrice(variant?.unit_amount)}</TD>
        <TD
          className="remove"
          onClick={e => {
            removeFromCart(variant.id);
          }}
        >
          {' '}
          Remove
        </TD>
      </TR>
    );
  });

export const getSubtotalOfAllVariants = ({ cart }) => {
  let subtotal = 0;
  cart.forEach(item => {
    item.prices.forEach(price => {
      if (price.quantity >= 1) {
        subtotal += price.unit_amount * price.quantity;
      }
    });
  });
  return subtotal;
};

const getMappedCart = ({ cart }) => {
  let mappedCart = [];
  cart.forEach(item => {
    item.prices.forEach(price => {
      if (price.quantity > 0) {
        mappedCart.push({ price: price.id, quantity: price.quantity });
      }
    });
  });
  return mappedCart;
};

const CartDisplay = () => {
  const [cart, updateCart] = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [store, updateStore] = useContext(StoreContext);

  const removeFromCart = id => {
    // in stripe's products API, we have prod_ for products
    let _cart = [].concat(cart);
    if (id.match('prod_')?.length > 0) {
      _cart = cart.filter(item => item.id !== id);
      // ... and price_ for price variants, here we remove only the variant
    } else {
      _cart.forEach((item, index, array) => {
        item.prices.forEach((price, priceIndex, priceArray) => {
          if (id === price.id) {
            price.quantity = 0;
          }
        });
        if (item.prices?.length === 0) {
          array.splice(index, 1);
        }
      });
    }
    updateCart(_cart);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: getMappedCart({ cart }),
      successUrl: `${window.location.origin}/cart?checkout=success`,
      cancelUrl: `${window.location.origin}/cart`,
    });

    if (error) {
      console.warn('Error:', error);
      setLoading(false);
    }
  };

  if (getSubtotalOfAllVariants({ cart }) === 0) {
    return (
      <section className="center">
        <p>Your cart is empty, fill it up!</p>
        <button className="pay-with-stripe">
          <Link style={{ color: 'white' }} to="/">
            Back Home
          </Link>
        </button>
      </section>
    );
  }

  return (
    <>
      <Table>
        <tbody>
          <TR>
            <TH>Product</TH>
            <TH>Price</TH>
            <TH>Quantity</TH>
            <TH>Total</TH>
            <TH></TH>
          </TR>
          {cart.map(item => {
            // for each cart item return null if subtotal 0,
            // variant rows if multiple prices, or a single row
            let subtotal = 0;
            item.prices.forEach(price => {
              if (price.quantity > 0) {
                subtotal += price.quantity;
              }
            });
            if (subtotal < 1) {
              return null;
            }
            // there are multiple price variants
            if (item?.prices?.length > 1) {
              return (
                <React.Fragment key={item.id}>
                  <TR>
                    <TD>
                      <ProductImg src={item.images[0]} alt={item.name} />
                      <ProductName>{item.name}</ProductName>
                    </TD>
                    <TD></TD>
                    <TD></TD>
                    <TD></TD>
                    <TD></TD>
                  </TR>
                  <VariantRows
                    removeFromCart={removeFromCart}
                    variants={item.prices}
                  />
                </React.Fragment>
              );
              // there is one price variant
            } else {
              return (
                <>
                  <TR key={item.id}>
                    <TD>
                      <ProductImg src={item.images[0]} alt={item.name} />
                      <ProductName>{item.name}</ProductName>
                    </TD>
                    <TD>
                      <h4 className="price">
                        {formatPrice(item.prices[0]?.unit_amount)}
                      </h4>
                    </TD>
                    <TD>
                      <strong>{subtotal}</strong>
                    </TD>
                    <TD>
                      {formatPrice(subtotal * item.prices[0]?.unit_amount)}
                    </TD>
                    <TD
                      className="remove"
                      onClick={e => {
                        removeFromCart(item.id);
                      }}
                    >
                      Remove
                    </TD>
                  </TR>
                </>
              );
            }
          })}
        </tbody>
      </Table>

      <Payment>
        {/* first div is a grid column shim */}
        <div></div>
        <div className="total">
          <div className="caption">
            <p>
              <strong>Subtotal</strong>
            </p>
            <p>Shipping</p>
            <p className="emph">Total</p>
          </div>
          <div className="num">
            <p>
              <strong>{formatPrice(getSubtotalOfAllVariants({ cart }))}</strong>
            </p>
            <p>Free Shipping</p>
            <p className="emph">
              {formatPrice(getSubtotalOfAllVariants({ cart }))}
            </p>
          </div>
        </div>
        <div></div>
        <div className="checkout">
          {getSubtotalOfAllVariants({ cart }) > 0 && (
            <form onSubmit={handleSubmit}>
              <button className="pay-with-stripe checkout" type="submit">
                Checkout
              </button>
            </form>
          )}
        </div>
      </Payment>
    </>
  );
};

export default CartDisplay;
