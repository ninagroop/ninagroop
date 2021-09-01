import styled from 'styled-components';

export const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 2vw;
  grid-row-gap: 0px;
  text-align: center;
  align-items: center;
  width: 80%;
  margin: 5vw auto 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 600px) {
      grid-column-gap: 30px !important;
    }

    @media screen and (max-width: 500px) {
      &:first-child {
        transform: scale(0.7);
      }
      &:last-child {
        transform: scale(0.7);
      }
    }
  }
`;
