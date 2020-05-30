import React from 'react';
import styled from 'styled-components';

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.mainColor};
  padding: 0.1rem 0.3rem;
  color: white;
  border-radius: 5px;
  margin-bottom: 0.2rem;
  & + & {
    margin-left: 0.3rem;
  }
`;

function TagList({ tags }) {
  return (
    <TagWrapper>
      {tags.map((tag, i) => (
        <Tag key={i}>{tag.name}</Tag>
      ))}
    </TagWrapper>
  );
}

export default TagList;
