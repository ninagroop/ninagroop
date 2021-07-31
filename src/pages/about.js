import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Textlockup from '../components/textlockup';
import Shoe from '../images/shoe.jpg';
import Bag from '../images/bag.jpg';
import FeaturedProducts from '../components/featuredproducts';

const AboutPage = () => (
  <Layout>
    <SEO title="Home" />
    <header>
      <h1 className="main-heading" itemProp="headline">
        About
      </h1>
    </header>
    <div className="article-body">
      <p>
        Nina's self-promotional text that she loathes but is required to
        provide.
      </p>
      <p>
        But we'll get it in there... with her kicking and screaming every step
        of the way.
      </p>
      <FeaturedProducts />
    </div>
  </Layout>
);

export default AboutPage;
