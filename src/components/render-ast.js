import React, { createElement } from 'react';
import rehypeReact from 'rehype-react';
import FeaturedProducts from '../components/featuredproducts';
import PostGrid from '../components/postGrid';
import CalendlyButton from '../components/calendlyButton';

export const renderAst = new rehypeReact({
  createElement,
  components: {
    'featured-products': props => {
      const count = parseInt(props.count) > 0 ? parseInt(props.count) : 3;
      const featured = props.featured === 'true' || false;
      const id = props.id !== '' ? props.id : undefined;
      return (
        <FeaturedProducts
          count={count}
          featured={featured}
          id={id}
        ></FeaturedProducts>
      );
    },
    'post-grid': props => {
      const count = parseInt(props.count) > 0 ? parseInt(props.count) : 3;
      const featured = props.featured === 'true' || false;
      const slug = props.slug !== '' ? props.slug : undefined;
      return (
        <PostGrid count={count} featured={featured} slug={slug}></PostGrid>
      );
    },
    'calendly-button': ({ children, ...rest }) => {
      return <CalendlyButton {...rest}>{children}</CalendlyButton>;
    },
  },
}).Compiler;
