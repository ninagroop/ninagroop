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
import { Link } from 'gatsby';

const Product = ({ location }) => {
  const [item, updateItem] = useState({});
  const [store] = useContext(StoreContext);
  const [quantity, updateQuantity] = useState(1);
  const [dropdownItem, updateDropdownItem] = useState(item?.prices?.[0]?.id);
  const [showCheckoutLink, updateShowCheckoutLink] = useState(false);

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
            {item?.metadata?.category === 'coaching' && (
              <>
                (Text from Nina about encouraging folks to sign up for a free
                consult)
                <br />
                [[ link to calend.ly ]]
              </>
            )}
            <br />
            <br />
            <p>{item.description}</p>
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
                    {item.prices.map(price => {
                      return (
                        <option key={price.id} value={price.id}>
                          {price.nickname ? price.nickname + ' - ' : ''}
                          {formatPrice(price.unit_amount, price.currency)}{' '}
                        </option>
                      );
                    })}
                  </select>
                )}
              </>
            )}
            <br />
            {item?.metadata?.hidequantity !== 'true' && (
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
            )}

            {showCheckoutLink && (
              <>
                <Link className="btn" to={`/cart`}>
                  Added to cart. Checkout now? &rarr;
                </Link>
                <br />
                <br />
              </>
            )}

            <AddToCart
              onClick={() => updateShowCheckoutLink(true)}
              selectedId={dropdownItem}
              product={item}
              __quantity={quantity}
            />
          </section>
        </ItemContain>

        <hr />

        <FeaturedProducts
          heading={<h3>Related Products</h3>}
          featured={false}
          filter={{ category: item?.metadata?.category }}
        />
      </div>
    </Layout>
  );
};

export default Product;
