import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { renderAst } from '../components/render-ast';

const PageTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const featuredImage =
    post?.frontmatter?.featuredimage || data?.home?.frontmatter?.featuredImage;
  return (
    <Layout location={location} title={siteTitle} featuredImage={featuredImage}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        featuredImage={featuredImage}
      />

      <article className="page" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 className="main-heading" itemProp="headline">
            {post.frontmatter.title}
          </h1>
        </header>
        <section className="article-body" itemProp="articleBody">
          {renderAst(post.htmlAst)}
        </section>
      </article>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      frontmatter: { templatekey: { eq: "page" } }
      id: { eq: $id }
    ) {
      id
      excerpt(pruneLength: 160)
      html
      htmlAst
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredpost
        featuredimage {
          childImageSharp {
            gatsbyImageData(
              width: 1400
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;
