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
import { getImage, getSrc } from 'gatsby-plugin-image';
import styled from 'styled-components';

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
      url('${props => `${props.featuredImage}`}') no-repeat top center;
    background-size: cover;
    z-index: -1;
  }
`;

const Layout = ({ children, featuredImage, location, ...rest }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          nav {
            title
            slug
            showCartIndicator
          }
        }
      }
      home: markdownRemark(frontmatter: { templatekey: { eq: "index-page" } }) {
        id
        frontmatter {
          featuredimage {
            childImageSharp {
              gatsbyImageData(
                width: 1400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          footerbioimage {
            childImageSharp {
              gatsbyImageData(
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          footerbiotext
          navigation {
            title
            slug
            showcartindicator
          }
          sociallinks {
            title
            url
          }
          footermeettext
          footercredits {
            text
            linktext
            url
          }
        }
      }
    }
  `);

  const homeImage = getImage(data?.home?.frontmatter?.featuredimage);
  const image = getSrc(featuredImage || homeImage);

  return (
    <>
      <MainBody featuredImage={image}>
        <div id="page-wrapper">
          <Header
            nav={data?.home?.frontmatter?.navigation}
            siteTitle={data.site.siteMetadata.title}
            siteDescription={data.site.siteMetadata.description}
            location={location}
          />
          <main>{children}</main>
        </div>
      </MainBody>

      <Footer
        footerImage={data?.home?.frontmatter?.footerbioimage}
        siteTitle={data.site.siteMetadata.title}
        footerBioText={data?.home?.frontmatter?.footerbiotext}
        socialLinks={data?.home?.frontmatter?.sociallinks}
        footerMeetText={data?.home?.frontmatter?.footermeettext}
        footerCredits={data?.home?.frontmatter?.footercredits}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
