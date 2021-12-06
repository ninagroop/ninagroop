import React from 'react';
import { useStaticQuery } from 'gatsby';

const useHomeTileImages = () => {
  // const { site } = useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `
  // )

  const data = useStaticQuery(graphql`
    query {
      home: markdownRemark(frontmatter: { templatekey: { eq: "index-page" } }) {
        id
        frontmatter {
          firstsectionimage {
            childImageSharp {
              gatsbyImageData(
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          secondsectionimage {
            childImageSharp {
              gatsbyImageData(
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          thirdsectionimage {
            childImageSharp {
              gatsbyImageData(
                width: 500
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  `);

  return data;
};

export default useHomeTileImages;
