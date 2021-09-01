import styled from 'styled-components';

export const ItemContain = styled.section`
  width: 100%;
  display: grid;
  justify-content: space-around;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5vw;

  select {
    color: #d96528;
    padding: 10px;
    margin: 10px 0;
    font-weight: bold;
  }

  @media screen and (max-width: 650px) {
    margin-left: 0 !important;
    width: 95% !important;
  }
`;

export const QuantityInput = styled.input`
  width: 60px;
  font-size: 25px;
  margin: 0 10px;
  padding: 5px 10px;
`;

export const UpdateNumButton = styled.button`
  background: black;
  border-color: black;
  color: white !important;
  font-size: 1rem;
  font-weight: normal;
`;
