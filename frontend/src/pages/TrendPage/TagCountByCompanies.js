import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import TrendBarChart from './charts/TrendBarChart';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '@material-ui/core';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const LineChartLoadingWrapper = styled.div`
  height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TagCountByCompanies() {
  const { tagCounts, loading } = useSelector(({ trend, loading }) => ({
    tagCounts: trend.tagCounts,
    loading: loading['trend/GET_TAG_COUTN_BY_COMPANIES'],
    // loading: true,
  }));

  return (
    <Wrapper>
      {loading ? (
        <LineChartLoadingWrapper>
          <LoadingSpinner
            color={colors.orange[500]}
            size={80}
            type={'bubbles'}
          />
        </LineChartLoadingWrapper>
      ) : tagCounts && tagCounts.length > 0 ? (
        <TrendBarChart data={tagCounts} />
      ) : null}
    </Wrapper>
  );
}

export default TagCountByCompanies;
