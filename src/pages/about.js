import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Textlockup from '../components/textlockup';
import Shoe from '../images/shoe.jpg';
import Bag from '../images/bag.jpg';
import { graphql } from 'gatsby';
import { renderAst } from '../components/render-ast';

const AboutPage = ({ data, location }) => {
  const about = data.about;
  return (
    <Layout location={location}>
      <Seo title={about.frontmatter.title} />
      <header>
        <h1 className="main-heading" itemProp="headline">
          {about.frontmatter.title}
        </h1>
      </header>
      <div className="article-body">{renderAst(about.htmlAst)}</div>
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
      htmlAst
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
