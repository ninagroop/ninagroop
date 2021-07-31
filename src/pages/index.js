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
import styled from 'styled-components';

export const Tagline = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.7em;
  color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  background: none;
  min-width: 80vw;
`;

export const Callout = styled.h4`
  font-weight: 400;
  padding-top: 20px;
  @media screen and (max-width: 1000px) {
    font-size: 1em;
  }
`;

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      {/* <Bio /> */}

      <Tagline>
        <>Guidance. Resilience. Hope.</>
      </Tagline>

      <br />
      <br />
      <br />
      <br />
      <section className="main-heading">
        <Callout>
          All of creation and your very own life are a sacred text that never
          stop speaking. The rhythms of the Earth and the arc of your story are
          an open invitation to listen. The wisdom you need is as close as your
          own heart, as unfailing as ocean waves.
        </Callout>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="article-body">
        <h2>An Important Section for Nina to Provide</h2>
        <p>
          An interesting section that inspires people to become a client beyond
          general motivational words of intrigue, but actual nuts and bolts
          about who she is with a link to "about" to learn more
        </p>
        <br />
        <br />
        <h2>
          Featured Blog Posts (selected with a checkbox, doesn't show all)
        </h2>
        <hr />
        <ol className="blogs-featured">
          {posts
            .filter(post => post?.frontmatter?.featuredpost)
            .map((post, idx) => {
              if (idx > 2) return null;
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
                      <Link to={post.fields.slug} itemProp="url">
                        <GatsbyImage
                          image={image}
                          alt={post.frontmatter.author}
                        />
                      </Link>
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
