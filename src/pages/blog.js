import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { PostGrid } from '../pages/index';
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const BlankTile = styled.div`
  @media screen and (max-width: 600px) {
    min-height: calc(100vw - 8vw);
  }

  @media screen and (max-width: 800px) {
    min-height: calc(50vw - 6vw);
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    content: ' ';
    background-color: ${props => props.bgColor};
    transition: opacity 0.3s;
    opacity: 0.4;
    &:hover {
      opacity: 0.25;
    }
  }
`;

const stringToColor = str => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;
  const home = data.home;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Blog" />
        <Bio />
        <p>No blog posts found.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Blog" />
      <Bio />
      <h1 className="main-heading">Blog</h1>

      <div className="article-body">
        <PostGrid>
          <ol className="blogs-featured">
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
                    <div className="featured-post-wrapper">
                      {image ? (
                        <Link to={post.fields.slug} itemProp="url">
                          <GatsbyImage image={image} alt={title} />
                        </Link>
                      ) : (
                        <BlankTile bgColor={stringToColor(post?.fields?.slug)}>
                          <Link
                            className="blank-tile"
                            to={post.fields.slug}
                            itemProp="url"
                          />
                        </BlankTile>
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

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    home: markdownRemark(frontmatter: { templatekey: { eq: "index-page" } }) {
      id
      frontmatter {
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
    allMarkdownRemark(
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
