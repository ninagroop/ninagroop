import React, { useContext } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import StoreGrid from '../components/storegrid';
import { StoreContext } from '../context/store';
import { filterProducts } from '../helpers/product-filter';

const Men = ({ location }) => {
  const [store, updateStore, getStoreArray] = useContext(StoreContext); // eslint-disable-line no-unused-vars

  return (
    <Layout location={location}>
      <SEO title="Men" />
      <StoreGrid
        products={filterProducts({ gender: 'Male' }, getStoreArray())}
      />
    </Layout>
  );
};

export default Men;
