import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export const FeatureGridStyled = styled.div`
  .featured-block {
    list-style: none;
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(
      ${props => {
        return parseInt(props?.count) || 3;
      }},
      1fr
    );
    grid-auto-rows: auto;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    &.vertical-tiles {
      list-style: none;
      padding-left: 0;
      display: grid;
      grid-template-columns: initial;
      grid-template-rows: 3;
      grid-auto-rows: auto;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      width: 100%;
      .featured-post-wrapper {
        min-width: 100%;
        height: 220px;
        @media screen and (max-width: 800px) {
          height: 160px;
        }
        @media screen and (max-width: 599px) {
          height: 300px;
        }
        a {
          padding: 15px;
          display: block;
          width: 100%;
          height: 100%;
          border: none;
        }
      }
      li:nth-child(1) .featured-post-wrapper {
        background: linear-gradient(45deg, transparent, #63a9b6);
      }
      li:nth-child(2) .featured-post-wrapper {
        background: linear-gradient(45deg, transparent, #dfc9a0);
      }
      li:nth-child(3) .featured-post-wrapper {
        background: linear-gradient(45deg, transparent, #c97e9a);
      }
    }
  }
  li {
    position: relative;
    padding-left: 0;
  }
  .blank-tile-item,
  .featured-post-wrapper {
    position: relative;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
  .featured-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.55) 0%,
      rgba(255, 255, 255, 0.85) 60%,
      rgba(255, 255, 255, 0.9) 100%
    );
    padding: 10px;
    h4 {
      margin: 0;
      font-size: 1em;
      a {
        letter-spacing: 0;
        -webkit-line-clamp: 1;
        color: #000;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .featured-footer {
      padding: 50px 10px;
      h4 {
        font-size: 1.5em;
      }
    }
  }

  .featured-description {
    display: block;
    height: 1px;
    overflow: hidden;
  }
  select {
    margin: 20px 0 0;
  }
  .footer-actions {
    margin-top: 20px;
    display: flex;
    & > a,
    & > button {
      flex: 1 1;
      margin: 5px;
    }
    a > button {
      width: 100%;
    }
  }
  @media screen and (max-width: 800px) {
    .featured-block {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (max-width: 600px) {
    .featured-block {
      grid-template-columns: 1fr;
    }
    .blank-tile-wrapper {
      min-height: calc(100vw - 4vw);
    }
  }
`;

export const Tile = styled.li`
  position: relative;
  padding-left: 0;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
  }
  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    opacity: 0.6;
    background-color: ${props => props?.backgroundColor ?? 'none'};
  }
  & > a {
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    display: block;
    border-bottom: none;
    position: ${props => (props?.backgroundColor ? 'absolute' : 'inherit')};
  }
`;

const PostGrid = ({ count = 3, featured = true, slug }) => {
  const data = useStaticQuery(graphql`
    query {
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
  `);
  const posts = data.posts.nodes;

  return (
    <FeatureGridStyled count={count}>
      <ol className="featured-block">
        {posts
          .filter(
            post =>
              post?.frontmatter?.featuredpost &&
              post?.frontmatter?.featuredimage
          )
          .map((post, idx) => {
            if (idx > count - 1) return null;
            const image = getImage(post?.frontmatter?.featuredimage);
            const title = post.frontmatter.title || post.fields.slug;
            if (!image) {
              return null;
            }
            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <div className="featured-post-wrapper">
                    <Link to={post.fields.slug} itemProp="url">
                      <GatsbyImage image={image} alt={title} />
                      <div className="featured-footer">
                        <header>
                          <h4>
                            <span itemProp="headline">{title}</span>
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
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
      </ol>
    </FeatureGridStyled>
  );
};

export const VerticalTilesGrid = ({ children }) => (
  <FeatureGridStyled>
    <ol class="featured-block vertical-tiles">
      {children.map(item => {
        if (item === '\n') return null;
        return (
          <li>
            <article class="post-list-item">
              <div class="featured-post-wrapper">
                <a class="" href={item?.props?.href}>
                  {item?.props?.children}
                </a>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  </FeatureGridStyled>
);

export default PostGrid;
