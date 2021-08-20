import React, { useContext } from 'react';
import { StoreContext } from '../context/store';
import { Featured } from './featuredproducts-styles';
import { FeatureGridStyled } from './postGrid';
import ProductCard from './productCard';

const FeaturedProducts = ({ featured = true, count = 3, id = null }) => {
  const [store, updateStore, getStoreArray] = useContext(StoreContext); // eslint-disable-line no-unused-vars
  // uses stripe metadata key `featured`
  const featuredData = getStoreArray()
    .filter(product => {
      if (featured && product?.metadata?.featured) {
        return true;
      }
      if (id && product.id === id) {
        return true;
      }
      return false;
    })
    ?.slice(0, count);
  return (
    <FeatureGridStyled count={id ? 1 : count}>
      <ol className="featured-block">
        {featuredData.map(product => (
          <ProductCard key={product?.id} showPriceDropdown product={product} />
        ))}
      </ol>
    </FeatureGridStyled>
  );
};

export default FeaturedProducts;
