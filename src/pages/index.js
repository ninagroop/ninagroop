import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Textlockup from '../components/textlockup';
import SalesBoxes from '../components/salesboxes';
import Shoe from '../images/shoe.jpg';
import Bag from '../images/bag.jpg';
import FeaturedProducts from '../components/featuredproducts';
import Bio from '../components/bio';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="Home" />
        <Bio />
        <p>No blog posts found.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio />
      <div className="article-body">
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const image = getImage(post?.frontmatter?.featuredimage);
            const title = post.frontmatter.title || post.fields.slug;

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span className="main-heading" itemProp="headline">
                          {title}
                        </span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                  {image && (
                    <GatsbyImage image={image} alt={post.frontmatter.author} />
                  )}
                </article>
              </li>
            );
          })}
        </ol>
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
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredpost
          featuredimage {
            childImageSharp {
              gatsbyImageData(
                width: 600
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
