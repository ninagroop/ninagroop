import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Textlockup from '../components/textlockup';
import Shoe from '../images/shoe.jpg';
import Bag from '../images/bag.jpg';
import FeaturedProducts from '../components/featuredproducts';
import { graphql } from 'gatsby';

const AboutPage = ({ data, ...rest }) => {
  console.log('~data', data);
  console.log('~rest', rest);
  return (
    <Layout>
      <Seo title="Home" />
      <header>
        <h1 className="main-heading" itemProp="headline">
          About
        </h1>
      </header>
      <div className="article-body">
        <p>
          Nina's self-promotional text that she loathes but is required to
          provide.
        </p>
        <p>
          But we'll get it in there... with her kicking and screaming every step
          of the way.
        </p>
        <FeaturedProducts />
      </div>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    about: markdownRemark(frontmatter: { title: { eq: "About" } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
