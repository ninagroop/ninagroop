import React, { useState } from 'react';
import { Link } from 'gatsby';
import AddToCart from './addToCart';
import { formatPrice } from '../helpers/currency-filter';

const ProductCard = ({ product, showPriceDropdown }) => {
  const [dropdownItem, updateDropdownItem] = useState(product.prices[0].id);

  const onSelectChange = e => {
    updateDropdownItem(e.target.value);
  };

  return (
    <div className="item" key={product.id}>
      <img src={product?.images[0]} alt=""></img>
      <h3>{product.name}</h3>
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
              {formatPrice(price.unit_amount, price.currency)} {price.nickname}
            </option>
          ))}
        </select>
      )}
      <br />
      <Link to={`/product/${product.id}`}>
        <button className="multi-item">View Item</button>
      </Link>
      <AddToCart selectedId={dropdownItem} product={product} quantity={1} />
    </div>
  );
};

export default ProductCard;
