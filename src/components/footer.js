import React from 'react';
import styled from 'styled-components';
import { StaticImage, getSrc, getImage } from 'gatsby-plugin-image';
import CalendlyButton from './calendlyButton';

export const StyledFooter = styled.footer`
  background: white;
  font-size: 0.8em;
  .article-body {
    background: white;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2vw;
    img {
      width: 100%;
      max-width: 300px;
    }
    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
      grid-column-gap: 0;
      h5 {
        margin-top: 30px;
      }
      img {
        max-width: 100%;
      }
    }
  }
  .footer-icon-link {
    border-bottom: none;
    display: flex;
    align-items: flex-end;
    float: left;
    margin-right: 10px;
    clear: both;
    vertical-align: middle;
    margin-bottom: 10px;
    font-weight: bold;
    img {
      float: left;
      display: inline-block;
      width: 32px;
      padding: 0 7px 0 0;
    }
  }
`;

const Footer = ({
  siteTitle,
  footerImage,
  footerBioText,
  footerMeetText,
  socialLinks,
}) => {
  return (
    <StyledFooter>
      <div className="article-body">
        <div className="footer-grid">
          <div>
            <h5>About Nina</h5>
            <p>{footerBioText}</p>
            <img src={getSrc(footerImage)} />
          </div>
          <div className="footer-grid">
            <div>
              <h5>Connect</h5>
              {socialLinks.map((link, idx) => {
                let icon;
                if (link.url.match(/twitter/gi)) {
                  icon = 'twitter';
                } else if (link.url.match(/instagram/gi)) {
                  icon = 'instagram';
                } else if (link.url.match(/facebook/gi)) {
                  icon = 'facebook';
                } else if (link.url.match(/youtube/gi)) {
                  icon = 'youtube';
                } else {
                  icon = 'earth';
                }
                return (
                  <a key={idx} className="footer-icon-link" href={link.url}>
                    <img alt={link.title} src={`/images/${icon}.svg`} />
                    {link.title}
                  </a>
                );
              })}
            </div>
            <div>
              <h5>Meet Nina</h5>
              {footerMeetText}
              <CalendlyButton>Schedule Now</CalendlyButton>
              <br />
              <br />
              <br />© {new Date().getFullYear()} {siteTitle}
              {` | `}
              Built with <a href="https://www.gatsbyjs.com">Gatsby</a>
            </div>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
