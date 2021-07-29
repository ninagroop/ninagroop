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
      <br />
      <br />

      <h4
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: '1.7em',
          // color: 'rgba(255,255,255,0.8)',
          color: 'rgba(0,0,0,0.8)',
          paddingTop: '20px',
          background: 'none',
          // textShadow: '0 0 30px black, 0 0 5px rgba(0,0,0,0.85)',
          minWidth: '80vw',
        }}
      >
        Guidance. Resilience. Hope.
      </h4>
      <br />
      <br />
      <br />
      <br />
      <section className="main-heading">
        <h4
          style={{
            fontSize: '1.1em',
            // background: 'rgba(255,255,255,0.8)',
            color: 'rgba(0,0,0,0.8)',
            paddingTop: '20px',
          }}
        >
          Every day the sun rises and sets and every night the moon offers its
          changed face while the stars sing... All of creation and your very own
          life are a sacred text that never stops speaking. The first lesson it
          teaches is to listen. The wisdom you need is as close as your own
          heart, as unfailing as ocean waves.
        </h4>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
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
                        <span itemProp="headline">{title}</span>
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
