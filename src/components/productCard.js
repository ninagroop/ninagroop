import React, { useState } from 'react';
import { Link } from 'gatsby';
import getStripe from '../utils/stripejs';
import AddToCart from './addToCart';
import { formatPrice } from '../helpers/currency-filter';

const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  padding: '1rem',
  marginBottom: '1rem',
  boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
  backgroundColor: '#fff',
  borderRadius: '6px',
  maxWidth: '300px',
};

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
