import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TagLink = styled(Link)`
  text-decoration: none;
  margin: 0.2rem 0.3rem 0 0;
`;

const TagContents = styled.span`
  font-size: ${({ size }) => (size ? size : '0.8rem')};
  padding: 0.1rem 0.3rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.nonselectedMainColor[100]};
  color: ${({ theme }) => theme.nonselectedMainColor[900]};
`;

function Tag({ name, size }) {
  return (
    <TagLink to={`/tag/${name}`}>
      <TagContents size={size}>#{name}</TagContents>
    </TagLink>
  );
}

export default Tag;
