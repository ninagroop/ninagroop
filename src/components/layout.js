/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 */

import { graphql, useStaticQuery } from 'gatsby';
import 'normalize.css';
import PropTypes from 'prop-types';
import React from 'react';
// import "./layout.scss"
import '../sass/main.scss';
import Footer from './footer';
import Header from './header';
import './layout.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <div className={'main-body'}>
        <div id="page-wrapper">
          <Header siteTitle={data.site.siteMetadata.title} />
          <main>
            {/* <SideBar fullMenu={fullMenu} /> */}
            {children}
            {/* <Footer /> */}
          </main>
        </div>
      </div>

      {/* <main>{children}</main> */}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
