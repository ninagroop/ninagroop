import React, { useContext } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import StoreGrid from '../components/storegrid';
import { StoreContext } from '../context/store';

const Store = () => {
  const [store, updateStore, getStoreArray] = useContext(StoreContext); // eslint-disable-line no-unused-vars
  return (
    <Layout>
      <SEO title="Store" />
      <h1 className="main-heading">Store</h1>
      <div className="article-body">
        <StoreGrid products={getStoreArray()} />
      </div>
    </Layout>
  );
};

export default Store;
