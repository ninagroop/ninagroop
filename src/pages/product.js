import React, { useEffect, useState, useContext } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { StoreContext } from '../context/store';
import {
  ItemContain,
  QuantityInput,
  UpdateNumButton,
} from '../components/product-styles';
import { formatPrice } from '../helpers/currency-filter';
import FeaturedProducts from '../components/featuredproducts';
import AddToCart from '../components/addToCart';

const Product = ({ location }) => {
  const [item, updateItem] = useState({});
  const [store] = useContext(StoreContext);
  const [quantity, updateQuantity] = useState(1);
  const [dropdownItem, updateDropdownItem] = useState(item?.prices?.[0]?.id);

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    updateItem(store[id]);
    updateDropdownItem(store[id]?.prices?.[0]?.id);
  }, [store]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelectChange = e => {
    updateDropdownItem(e.target.value);
  };

  if (!item?.id) {
    return (
      <Layout>
        <h2>Item not found!</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Product" />
      <div className="article-body">
        <ItemContain>
          <section className="img">
            <GatsbyImage image={getImage(item.localFiles[0])} alt={item.name} />
          </section>
          <section className="product-info">
            <h1>{item.name}</h1>
            {item?.prices?.[0]?.length > 1 ? (
              <h4 className="price">
                {formatPrice(item?.prices[0].unit_amount)}
              </h4>
            ) : (
              <>
                {item?.prices?.length > 1 && (
                  // eslint-disable-next-line jsx-a11y/no-onchange
                  <select
                    value={dropdownItem}
                    onChange={onSelectChange}
                    name="priceSelect"
                  >
                    {item.prices.map(price => (
                      <option key={price.id} value={price.id}>
                        {formatPrice(price.unit_amount, price.currency)}{' '}
                        {price.nickname}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
            <p>{item.description}</p>
            <p style={{ display: 'flex' }}>
              <UpdateNumButton onClick={() => updateQuantity(quantity - 1)}>
                -
              </UpdateNumButton>
              <QuantityInput
                type="number"
                value={quantity}
                // eslint-disable-next-line jsx-a11y/no-onchange
                onChange={event => updateQuantity(event.target.value)}
              />
              <UpdateNumButton onClick={() => updateQuantity(quantity + 1)}>
                +
              </UpdateNumButton>
            </p>

            <br />
            <AddToCart
              selectedId={dropdownItem}
              product={item}
              quantity={quantity}
            />
          </section>
        </ItemContain>
        <hr />
        <FeaturedProducts />
      </div>
    </Layout>
  );
};

export default Product;
