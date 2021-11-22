import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Textlockup from '../components/textlockup';
import Shoe from '../images/shoe.jpg';
import Bag from '../images/bag.jpg';
import { graphql } from 'gatsby';
import { renderAst } from '../components/render-ast';
// import { InlineWidget } from 'react-calendly';
import { openPopupWidget } from 'react-calendly';

const CustomButton = ({ url, prefill, pageSettings, utm }) => {
  const onClick = () => openPopupWidget({ url, prefill, pageSettings, utm });

  return (
    <div style={{ clear: 'both', margin: '80px auto', width: 400 }}>
      <button className="primary fit" onClick={onClick}>
        Schedule Now
      </button>
    </div>
  );
};

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
      <div className="article-body">
        {renderAst(coaching.htmlAst)}
        <br />
        <br />
        <br />
        <br />

        <CustomButton url="https://calendly.com/ninagroop" />

        {/* <InlineWidget
          styles={{
            height: '700px',
          }}
          url="https://calendly.com/ninagroop"
        /> */}
      </div>
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
