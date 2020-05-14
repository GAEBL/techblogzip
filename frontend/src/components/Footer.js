import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  height: 100%;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

function Footer(props) {
  return (
    <FooterWrapper>
      <h3>MATCHER</h3>
    </FooterWrapper>
  );
}

export default Footer;
