import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTagDates } from '../../reducers/trend';

const TagTrendButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagButton = styled.button`
  background-color: ${({ theme }) => theme.nonselectedMainColor[300]};
  margin: 0.3rem 0.4rem 0 0;
  border: none;
  border-radius: 3px;
  padding: 0.4rem 0.4rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transform: scale(0.98);
  transition: all 0.3s;
  box-shadow: 0 0px 1.1px rgba(0, 0, 0, 0.019), 0 0px 6.3px rgba(0, 0, 0, 0.027),
    0 0px 16.4px rgba(0, 0, 0, 0.033), 0 0px 34.7px rgba(0, 0, 0, 0.041),
    0 0px 80px rgba(0, 0, 0, 0.06);
  :hover {
    transform: scale(1);
    background-color: ${({ theme }) => theme.nonselectedMainColor[500]};
  }

  :focus {
    outline: none;
  }

  &.active {
    background-color: ${({ theme }) => theme.nonselectedMainColor[500]};
  }
`;

function TagButtons({ tags }) {
  const dispatch = useDispatch();
  const { selectedCompany } = useSelector(({ trend }) => ({
    selectedCompany: trend.trendForm.company,
  }));

  const [selectedTag, setSelectedTag] = useState(tags[0].name);

  useEffect(() => {
    dispatch(getTagDates({ tag: selectedTag, company: selectedCompany }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedTag]);

  const onTagClick = (tagName) => {
    setSelectedTag(tagName);
  };
  return (
    <TagTrendButtonWrapper>
      {tags.map((tag) => (
        <TagButton
          key={tag.name}
          className={cn({ active: tag.name === selectedTag })}
          onClick={() => onTagClick(tag.name)}
        >
          #{tag.name}
        </TagButton>
      ))}
    </TagTrendButtonWrapper>
  );
}

export default TagButtons;
