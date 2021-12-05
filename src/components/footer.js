import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export const StyledFooter = styled.footer`
  background: white;
  .article-body {
    background: white;
    padding: 70px 20vw;
  }
  .footer-block {
    float: left;
    width: 50%;
  }
`;

const Footer = ({ siteTitle, footerImage, footerBioText }) => {
  return (
    <StyledFooter>
      <div className="article-body">
        <div class="footer-block">
          <h5>About Nina</h5>
          <p>{footerBioText}</p>
          <GatsbyImage
            image={getImage(footerImage)}
            alt="Nina Groop Bio Image"
          />
        </div>
        <div class="footer-block">
          TODO: Brian has a bunch todo here
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />© {new Date().getFullYear()} {siteTitle}
          {` | `}
          Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
