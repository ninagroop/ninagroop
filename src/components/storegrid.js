import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers/currency-filter';
import { StyledGroup, Item, Aside } from './storegrid-styles';
import PropTypes from 'prop-types';

const StoreGrid = ({ products }) => {
  const min = 0;
  const max = 150;
  const [filteredProducts, updateFilteredProducts] = useState(products);
  const [priceRange, updatePriceRange] = useState(max);

  useEffect(() => {
    updateFilteredProducts(products);
  }, [products]);

  const updateProducts = newPrice => {
    updatePriceRange(newPrice);
    updateFilteredProducts(
      products.filter(item => {
        return item?.prices?.[0]?.unit_amount < parseFloat(newPrice) * 100;
      })
    );
  };

  return (
    <div className="storegrid">
      <StyledGroup className="content">
        {filteredProducts?.map(item => (
          <CSSTransition key={item.id} timeout={100} classNames="items">
            <Item>
              <div className="img-contain">
                <a href={`product/${item.id}`}>
                  <img src={item?.images?.[0]} alt=""></img>
                </a>
              </div>
              <h3>{item.name}</h3>
              <h4 className="price">
                {formatPrice(item?.prices?.[0]?.unit_amount)}
              </h4>
              <a href={`product/${item.id}`}>
                <button className="multi-item">View Item</button>
              </a>
            </Item>
          </CSSTransition>
        ))}
      </StyledGroup>
      <Aside>
        <h3>Special Sale</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam libero
          iusto nemo laboriosam perferendis voluptas ullam officiis, quibusdam
          quas quam eveniet est fugit delectus corporis incidunt nam esse
          suscipit itaque?
        </p>
        <h3>Filter by Price:</h3>
        <p style={{ marginTop: '5px' }}>
          Max Price <strong>${priceRange}</strong>
        </p>
        <input
          className="slider"
          type="range"
          min={min}
          max={max}
          step={0.1}
          value={priceRange}
          onChange={event => updateProducts(event.target.value)}
        ></input>
        <span className="min">${min}</span>
        <span className="max">${max}</span>
      </Aside>
    </div>
  );
};

StoreGrid.propTypes = {
  products: PropTypes.array,
};

export default StoreGrid;
