import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import CartSteps from '../components/cartsteps';
import CartDisplay from '../components/cartdisplay';
import { CartUIContext, CartUIProvider } from '../context/cartUI';
import SalesBoxes from '../components/salesboxes';
import { CartContext } from '../context/cart';

const Success = styled.section`
  text-align: center;
`;

const Page = ({ location }) => {
  const [cartUIStatus, updateCartUI] = useContext(CartUIContext);
  const [cart, updateCart] = useContext(CartContext); // eslint-disable-line no-unused-vars

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location?.search);
    const params = Object.fromEntries(urlSearchParams?.entries());
    if (params?.checkout === 'success') {
      updateCartUI('success');
      updateCart([]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <CartSteps />
      <hr />
      <h1 className="center">Your Cart</h1>

      {cartUIStatus === 'idle' ? <CartDisplay /> : null}

      {cartUIStatus === 'success' ? (
        <Success>
          <h2>Success!</h2>
          <p>
            Thank you for your purchase. You'll be receiving your items in 4
            business days.
          </p>
          <p>Forgot something?</p>
          <button className="pay-with-stripe">
            <Link style={{ color: 'white' }} to="/">
              Back to Home
            </Link>
          </button>
        </Success>
      ) : null}

      {cartUIStatus === 'failure' ? (
        <section>
          <p>
            Oops, something went wrong. Redirecting you to your cart to try
            again.
          </p>
        </section>
      ) : null}

      <SalesBoxes />
    </>
  );
};

const Cart = ({ location }) => {
  return (
    <Layout>
      <SEO title="Cart" />
      <CartUIProvider>
        <Page location={location} />
      </CartUIProvider>
    </Layout>
  );
};

export default Cart;
