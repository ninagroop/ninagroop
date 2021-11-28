import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

// https://github.com/gatsbyjs/gatsby/issues/5329#issuecomment-484741119
const browser = typeof window !== 'undefined' && window;

const NotFoundPage = ({ location }) => {
  return (
    browser && (
      <Layout location={location}>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>This page doesn&#39;t exist.</p>
      </Layout>
    )
  );
};

export default NotFoundPage;
