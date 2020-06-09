import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const ButtonWrapper = styled.button`
  cursor: pointer;
  z-index: 2;
  position: fixed;
  right: 5%;
  bottom: 5%;
  padding: 1rem;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.nonselectedMainColor[900]};
  transition: all 0.3s;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  :focus {
    outline: none;
  }
`;

const StyledArrow = styled(ArrowUpwardIcon)`
  color: white;
`;

function ScrollTopButton(props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    });
  }, []);

  const onClick = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <ButtonWrapper onClick={onClick} visible={visible}>
      <StyledArrow />
    </ButtonWrapper>
  );
}

export default ScrollTopButton;
