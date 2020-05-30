import React from 'react';
import styled from 'styled-components';
import { colors } from '@material-ui/core';

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: ${colors.deepOrange[100]};
  font-size: 0.8rem;
  padding: 0.1rem 0.3rem;
  color: ${colors.deepOrange[900]};
  margin: 0.2rem 0.3rem 0 0;
`;

function TagList({ tags }) {
  return (
    <TagWrapper>
      {tags.map((tag, i) => (
        <Tag key={i}>#{tag.name}</Tag>
      ))}
    </TagWrapper>
  );
}

export default TagList;
