import React, { useContext } from 'react';
import { StoreContext } from '../context/store';
import { Featured } from './featuredproducts-styles';
import { FeatureGridStyled } from './postGrid';
import ProductCard from './productCard';

const FeaturedProducts = ({
  featured = true,
  count = 3,
  id = null,
  filter = null,
  heading = null,
}) => {
  const [store, updateStore, getStoreArray] = useContext(StoreContext); // eslint-disable-line no-unused-vars

  let pageProductId;
  if (typeof window !== 'undefined') {
    pageProductId = window?.location?.pathname?.split('/')?.[2];
  }

  // uses stripe metadata key `featured`
  const featuredData = getStoreArray()
    .filter(product => {
      // never show the current product
      if (pageProductId === product?.id) {
        return false;
      }
      if (featured && product?.metadata?.featured) {
        return true;
      }
      if (id && product.id === id) {
        return true;
      }
      if (filter) {
        let found = false;
        Object.keys(filter)?.forEach(filterKey => {
          if (product?.metadata?.[filterKey] === filter[filterKey]) {
            found = true;
          }
        });
        if (found) return true;
      }
    })
    ?.slice(0, count);
  return (
    <>
      {heading}
      <FeatureGridStyled count={id ? 1 : count}>
        <ol className="featured-block">
          {featuredData.map(product => (
            <ProductCard
              key={product?.id}
              showPriceDropdown
              product={product}
            />
          ))}
        </ol>
      </FeatureGridStyled>
    </>
  );
};

export default FeaturedProducts;
