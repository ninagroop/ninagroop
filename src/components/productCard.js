import React, { useState } from 'react';
import { Link } from 'gatsby';
import AddToCart from './addToCart';
import { formatPrice } from '../helpers/currency-filter';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FeatureGridStyled } from './postGrid';

const ProductCard = ({ product, showPriceDropdown }) => {
  const [dropdownItem, updateDropdownItem] = useState(product.prices[0].id);

  const onSelectChange = e => {
    updateDropdownItem(e.target.value);
  };
  const image = getImage(product?.localFiles?.[0]);

  return (
    <li key={product.id}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="featured-post-wrapper">
          <Link itemProp="url" to={`/product/${product.id}`}>
            <GatsbyImage
              image={image}
              alt={`Product image for ${product.name}`}
            />
            <div className="featured-footer">
              <header>
                <h4>
                  <span itemProp="headline">{product.name}</span>
                </h4>
              </header>
            </div>
          </Link>
        </div>

        <br />

        {product?.prices?.length === 1 && (
          <h4>
            {formatPrice(
              product?.prices[0].unit_amount,
              product?.prices[0].currency
            )}
          </h4>
        )}

        {showPriceDropdown && product?.prices?.length > 1 && (
          // eslint-disable-next-line jsx-a11y/no-onchange
          <select
            value={dropdownItem}
            onChange={onSelectChange}
            name="priceSelect"
          >
            {product.prices.map(price => (
              <option key={price.id} value={price.id}>
                {formatPrice(price.unit_amount, price.currency)}{' '}
                {price.nickname}
              </option>
            ))}
          </select>
        )}

        <Link className="btn" to={`/product/${product.id}`}>
          <button className="multi-item">View Item</button>
        </Link>
        <AddToCart selectedId={dropdownItem} product={product} __quantity={1} />
      </article>
    </li>
  );
};

export default ProductCard;
