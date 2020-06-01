import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

function Footer(props) {
  return (
    <FooterWrapper>
      <h3>GAEBL</h3>
    </FooterWrapper>
  );
}

export default Footer;
