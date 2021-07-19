import React, { useContext } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import StoreGrid from '../components/storegrid';
import { StoreContext } from '../context/store';
import { filterProducts } from '../helpers/product-filter';

const Women = () => {
  const [store, updateStore, getStoreArray] = useContext(StoreContext); // eslint-disable-line no-unused-vars

  return (
    <Layout>
      <SEO title="Women" />
      <StoreGrid
        products={filterProducts({ gender: 'Female' }, getStoreArray())}
      />
    </Layout>
  );
};

export default Women;
