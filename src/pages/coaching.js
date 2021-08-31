import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Textlockup from '../components/textlockup';
import Shoe from '../images/shoe.jpg';
import Bag from '../images/bag.jpg';
import { graphql } from 'gatsby';
import { renderAst } from '../components/render-ast';

const CoachingPage = ({ data, ...rest }) => {
  const coaching = data.coaching;
  return (
    <Layout>
      <Seo title={coaching.frontmatter.title} />
      <header>
        <h1 className="main-heading" itemProp="headline">
          {coaching.frontmatter.title}
        </h1>
      </header>
      <div className="article-body">{renderAst(coaching.htmlAst)}</div>
    </Layout>
  );
};

export default CoachingPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    coaching: markdownRemark(frontmatter: { title: { eq: "Coaching" } }) {
      id
      htmlAst
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
