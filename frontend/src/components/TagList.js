import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  padding: 0.1rem 0.3rem;
  margin: 0.2rem 0.3rem 0 0;
  background-color: ${({ theme }) => theme.nonselectedMainColor[100]};
  color: ${({ theme }) => theme.nonselectedMainColor[900]};
`;

const TagLink = styled(Link)`
  text-decoration: none;
`;

function TagList({ tags }) {
  return (
    <TagWrapper>
      {tags.map((tag, i) => (
        <TagLink to={`/tag/${tag.name}`}>
          <Tag key={i}>#{tag.name}</Tag>
        </TagLink>
      ))}
    </TagWrapper>
  );
}

export default TagList;
