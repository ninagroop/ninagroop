import React from 'react';
import { openPopupWidget } from 'react-calendly';
import styled from 'styled-components';

export const CalendlyButtonWrapper = styled.span`
  display: inline-block;
  margin: 40px auto;
  width: ${props => {
    if (props.align === 'left' || props.align === 'right') {
      return 'auto';
    } else {
      return '100%';
    }
  }};
  ${props => {
    if (props.align === 'left' || props.align === 'right') {
      return `float: ${props.align}'`;
    }
  }}
`;

const CalendlyButton = ({
  url,
  prefill,
  pageSettings,
  utm,
  align,
  children,
}) => {
  const onClick = () =>
    openPopupWidget({
      url: 'https://calendly.com/ninagroop',
      prefill,
      pageSettings,
      utm,
    });

  return (
    <CalendlyButtonWrapper align={align}>
      <button className="primary fit" onClick={onClick}>
        {children}
      </button>
    </CalendlyButtonWrapper>
  );
};

export default CalendlyButton;
