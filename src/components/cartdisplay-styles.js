import styled from 'styled-components';

export const ProductImg = styled.img`
  float: left;
  margin-right: 15px;
  height: 50px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;
`;

export const TR = styled.tr`
  text-align: center;
`;

export const TH = styled.th`
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

export const TD = styled.td`
  border-bottom: 1px solid #ccc;
  &.variant {
    text-align: left;
    padding-left: 66px;
  }
`;

export const ProductName = styled.h3`
  padding-top: 12px;
  text-align: left;
`;

export const Payment = styled.section`
  .total {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 100px;
  }

  .emph {
    font-weight: bold;
    padding: 10px;
  }

  .num {
    text-align: right;
  }

  .pay-with-stripe {
    float: right;
  }

  @media screen and (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 100px;
  }

  @media screen and (max-width: 699px) {
    width: 94%;
    margin-left: 2%;
  }

  .total {
    width: 90%;
  }

  .checkout button {
    width: 100%;
    margin-bottom: 2rem;
    margin-right: 1rem;
  }
`;
