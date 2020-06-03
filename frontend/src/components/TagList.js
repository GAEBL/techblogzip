import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function TagList({ tags }) {
  return (
    <TagWrapper>
      {tags.map((tag, i) => (
        <Tag name={tag.name} key={i} />
      ))}
    </TagWrapper>
  );
}

export default TagList;
