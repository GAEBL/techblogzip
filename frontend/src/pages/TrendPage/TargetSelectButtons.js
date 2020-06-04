import React from 'react';
import targetDatas from '../../lib/targetDatas';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, getRankTags } from '../../reducers/trend';
import styled from 'styled-components';
import cn from 'classnames';

function TargetSelectButtons(props) {
  const { trendForm } = useSelector(({ trend }) => ({
    trendForm: trend.trendForm,
  }));

  const dispatch = useDispatch();
  const handleClick = (value) => {
    dispatch(changeInput({ name: 'targetData', value }));
    dispatch(getRankTags(trendForm));
  };

  const ButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 0.5rem;
    margin-bottom: 1rem;
  `;

  const TargetButton = styled.button`
    background-color: ${({ theme }) => theme.nonselectedMainColor[300]};
    border: none;
    border-radius: 3px;
    padding: 0.4rem 0.4rem;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transform: scale(0.98);
    transition: all 0.3s;
    box-shadow: 0 0px 1.1px rgba(0, 0, 0, 0.019),
      0 0px 6.3px rgba(0, 0, 0, 0.027), 0 0px 16.4px rgba(0, 0, 0, 0.033),
      0 0px 34.7px rgba(0, 0, 0, 0.041), 0 0px 80px rgba(0, 0, 0, 0.06);
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

  return (
    <ButtonsWrapper>
      {targetDatas.map((target, i) => (
        <TargetButton
          key={i}
          onClick={() => handleClick(target.targetData)}
          className={cn({ active: target.targetData === trendForm.targetData })}
        >
          {target.displayName}
        </TargetButton>
      ))}
    </ButtonsWrapper>
  );
}

export default TargetSelectButtons;
