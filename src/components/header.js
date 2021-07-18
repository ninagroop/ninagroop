import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Head, Nav, CartTotal } from './header-styles';
import { CartContext } from '../context/cart';
import { StoreContext } from '../context/store';

const Header = ({ siteTitle }) => {
  const [cart, updateCart, getTotalCount] = useContext(CartContext);
  const [store, updateStore] = useContext(StoreContext);
  const [cartCount, updateCartCount] = useState(0);

  useEffect(() => {
    updateCartCount(cart.reduce((acc, next) => acc + next.quantity, 0));
  }, [cart]);

  return (
    <Head>
      <h1>{siteTitle}</h1>
      <Nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all">All</Link>
          </li>
          <li>
            <Link to="/women">Women</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li>
          <li>
            {getTotalCount() > 0 ? (
              <CartTotal>{getTotalCount()}</CartTotal>
            ) : null}
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </Nav>
    </Head>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

export default Header;
