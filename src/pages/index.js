import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Textlockup from '../components/textlockup';
import SalesBoxes from '../components/salesboxes';
import Shoe from '../images/shoe.jpg';
import Bag from '../images/bag.jpg';
import FeaturedProducts from '../components/featuredproducts';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { renderAst } from '../components/render-ast';

const Tagline = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  background: none;
  min-width: 80vw;
`;

const Callout = styled.h4`
  font-weight: 400;
  padding-top: 20px;
  font-size: 1em;
  @media screen and (max-width: 1000px) {
    font-size: 1em;
  }
`;

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const home = data.home;

  return (
    <Layout
      location={location}
      title={siteTitle}
      description={data.site.siteMetadata?.description}
    >
      <SEO title="Home" />

      <Tagline>{home?.frontmatter?.tagline}</Tagline>

      <br />
      <br />
      <br />
      <br />
      <section className="main-heading">
        <Callout>{home?.frontmatter?.homequote}</Callout>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="article-body">
        <div itemProp="description">{renderAst(home.htmlAst)}</div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    home: markdownRemark(frontmatter: { templatekey: { eq: "index-page" } }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tagline
        homequote
        description
        featuredpost
      }
    }
  }
`;
