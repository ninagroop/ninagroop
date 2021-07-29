import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Head, Nav, CartTotal } from './header-styles';
import { CartContext } from '../context/cart';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: 250,
    color: '#fff',
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    background: '#000',
  },
});

const SwipeableTemporaryDrawer = () => {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDrawer = override => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSidebarOpen(!sidebarOpen);
  };

  const list = anchor => (
    <div
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
      className={classes.list}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer()}>Toggle Sidebar</Button>
      <SwipeableDrawer
        classes={{ paper: classes.paper }}
        anchor={'right'}
        open={sidebarOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </div>
  );
};

const Header = ({ siteTitle }) => {
  const [cart, updateCart, getTotalCount] = useContext(CartContext); // eslint-disable-line no-unused-vars
  const [cartCount, updateCartCount] = useState(0); // eslint-disable-line no-unused-vars

  useEffect(() => {
    updateCartCount(cart.reduce((acc, next) => acc + next.quantity, 0));
  }, [cart]);

  return (
    <>
      <SwipeableTemporaryDrawer />
      <Head>
        <h1>{siteTitle}</h1>
        <Nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
            <Link to="/all">All</Link>
          </li>
          <li>
            <Link to="/women">Women</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li> */}
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
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
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

export default Header;
