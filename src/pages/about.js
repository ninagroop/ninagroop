import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Textlockup from '../components/textlockup';
import Shoe from '../images/shoe.jpg';
import Bag from '../images/bag.jpg';
import FeaturedProducts from '../components/featuredproducts';
import { graphql } from 'gatsby';

const AboutPage = ({ data, ...rest }) => {
  const about = data.about;
  return (
    <Layout>
      <Seo title={about.frontmatter.title} />
      <header>
        <h1 className="main-heading" itemProp="headline">
          {about.frontmatter.title}
        </h1>
      </header>
      <div className="article-body">
        <div
          dangerouslySetInnerHTML={{
            __html: about.html,
          }}
        />
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
