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

export const PostGrid = styled.div`
  .blogs-featured {
    list-style: none;
    padding-left: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  li {
    position: relative;
    padding-left: 0;
  }
  .featured-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0.7) 60%,
      rgba(255, 255, 255, 0.7) 100%
    );
    padding: 10px;
    h4 a {
      letter-spacing: 0;
      -webkit-line-clamp: 1;
      color: #000;
    }
  }
  .featured-description {
    display: block;
    height: 1px;
    overflow: hidden;
  }
  picture {
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
  @media screen and (max-width: 800px) {
    .blogs-featured {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (max-width: 600px) {
    .blogs-featured {
      grid-template-columns: 1fr;
    }
  }
`;

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.posts.nodes;
  const home = data.home;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      {/* <Bio /> */}

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
        <div
          dangerouslySetInnerHTML={{
            __html: home?.html,
          }}
          itemProp="description"
        />

        <hr />
        <PostGrid>
          <ol className="blogs-featured">
            {posts
              .filter(
                post =>
                  post?.frontmatter?.featuredpost &&
                  post?.frontmatter?.featuredimage
              )
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
                      <div className="featured-post-wrapper">
                        {image && (
                          <Link to={post.fields.slug} itemProp="url">
                            <GatsbyImage
                              image={image}
                              alt={post.frontmatter.author}
                            />
                          </Link>
                        )}
                        <div className="featured-footer">
                          <header>
                            <h4>
                              <Link to={post.fields.slug} itemProp="url">
                                <span itemProp="headline">{title}</span>
                              </Link>
                            </h4>
                          </header>
                          <section className="featured-description">
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  post.frontmatter.description || post.excerpt,
                              }}
                              itemProp="description"
                            />
                          </section>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
          </ol>
        </PostGrid>
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
    home: markdownRemark(frontmatter: { templatekey: { eq: "index-page" } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tagline
        homequote
        description
        featuredpost
      }
    }
    posts: allMarkdownRemark(
      filter: { frontmatter: { templatekey: { eq: "blog-post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
                aspectRatio: 1
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
