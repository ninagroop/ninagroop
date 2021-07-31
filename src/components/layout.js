/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 */

import { graphql, useStaticQuery } from 'gatsby';
import 'normalize.css';
import PropTypes from 'prop-types';
import React from 'react';
import '../sass/main.scss';
import Footer from './footer';
import Header from './header';
import {
  StaticImage,
  GatsbyImage,
  getImage,
  getSrc,
  getSrcSet,
} from 'gatsby-plugin-image';
import styled from 'styled-components';

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//     // color: '#fff',
//   },
//   fullList: {
//     width: 'auto',
//   },
//   paper: {
//     // background: '#000',
//   },
//   icon: {},
//   appBar: {
//     background: '#fff',
//     color: '#000',
//     boxShadow: 'none',
//     // '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14)',
//   },
// mainbody: {
//   overflow: 'hidden',
//   position: 'relative',

// '&:before': {
//   content: ' ',
//   position: 'fixed',
//   height: '100%',
//   height: '100vh',
//   width: '100%',
//   width: '100vw',
//   top: 0,
//   left: 0,
//   willChange: 'transform',
//   background: `linear-gradient(
//       180deg,
//       rgba(255, 255, 255, 0) 0%,
//       rgba(255, 255, 255, 0.35) 60%,
//       rgba(255, 255, 255, 0.35) 100%
//     ),
//     url('${props => {
//       console.log('~props', props),
//       console.log('~getSrc', getSrc(props.featuredImage)),
//       return props.featuredImage
//         ? `${getSrc(props?.featuredImage)}`
//         : '/static/shifaaz-shamoon-okVXy9tG3KY-unsplash-2e1df69fe2d6abcf4c4ea83872ed0356.jpg',
//     }}')
//       no-repeat top center`,
//   backgroundSize: 'cover',
//   zIndex: -1,
// }
// }
// });

export const MainBody = styled.div`
  & {
    overflow: hidden;
    position: relative;
  }
  &:before {
    content: ' ';
    position: fixed;
    height: 100%;
    height: 100vh;
    width: 100%;
    width: 100vw;
    top: 0;
    left: 0;
    will-change: transform;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.35) 60%,
        rgba(255, 255, 255, 0.35) 100%
      ),
      url('${props => {
        console.log('~props', props);
        return props.featuredImage
          ? `${props.featuredImage}`
          : '/static/shifaaz-shamoon-okVXy9tG3KY-unsplash-2e1df69fe2d6abcf4c4ea83872ed0356.jpg';
      }}') no-repeat top center;
    background-size: cover;
    z-index: -1;
  }
`;

const Layout = ({ children, featuredImage }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          nav {
            title
            slug
            showCartIndicator
          }
        }
      }
    }
  `);
  const image = getSrc(featuredImage);
  const img = getImage(featuredImage);
  console.log('~image', image);
  return (
    <>
      <MainBody featuredImage={image}>
        {/* <div className="main-body"> */}
        <div id="page-wrapper">
          <Header
            nav={data.site.siteMetadata.nav}
            siteTitle={data.site.siteMetadata.title}
          />
          <main>
            {/* <SideBar fullMenu={fullMenu} /> */}
            {children}
            {/* <Footer /> */}
          </main>
        </div>
        {/* </div> */}
      </MainBody>

      {/* <main>{children}</main> */}
      <Footer />
      {/* <img src={image} /> */}

      <StaticImage image={img} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
