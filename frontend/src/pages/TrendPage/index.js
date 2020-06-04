import React, { useEffect } from 'react';
import styled from 'styled-components';
import TrendForm from './TrendForm';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Fade, colors } from '@material-ui/core';
import InformationTemplate from './InformationTemplate';
import PostingDate from './PostingDate';
import TargetSelectButtons from './TargetSelectButtons';
import { clearTrendData } from '../../reducers/trend';

const TrendPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxPageWidth};
  margin: 0 auto;
  padding: 1rem;
`;

const Card = styled.article`
  min-height: ${({ loading }) => loading && '800px'};
  height: 100%;
  background: white;
  padding: 2rem;
  border: 1px solid ${colors.grey[200]};
  border-radius: 10px;
  box-shadow: 0 0px 1.1px rgba(0, 0, 0, 0.019), 0 0px 6.3px rgba(0, 0, 0, 0.027),
    0 0px 16.4px rgba(0, 0, 0, 0.033), 0 0px 34.7px rgba(0, 0, 0, 0.041),
    0 0px 80px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  .article__title {
    font-size: 2rem;
  }
`;

const NoData = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CylonSpinner() {
  return <LoadingSpinner color={colors.orange[500]} size={80} type={'cylon'} />;
}

function TrendPage(props) {
  const { loading, rankTags, companyPostingDates } = useSelector(
    ({ loading, trend }) => ({
      loading: {
        getPostingDates: loading['trend/GET_COMPANY_POSTING_DATES'],
        getRankTags: loading['trend/GET_RANK_TAGS'],
      },
      rankTags: trend.rankTags,
      companyPostingDates: trend.companyPostingDates,
    }),
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearTrendData());
    };
  }, [dispatch]);

  return (
    <TrendPageWrapper>
      <TrendForm loading={loading.getPostingDates && loading.getRankTags} />

      {(!loading.getPostingDates || !loading.getRankTags) && (
        <>
          {loading.getPostingDates ? (
            <Fade in={true} {...{ timeout: 1000 }}>
              <Card loading={true}>
                <CylonSpinner />
              </Card>
            </Fade>
          ) : companyPostingDates ? (
            <>
              <Fade in={true} {...{ timeout: 1000 }}>
                <Card>
                  <PostingDate data={companyPostingDates} />
                </Card>
              </Fade>
            </>
          ) : null}

          {loading.getRankTags ? (
            <Fade in={true} {...{ timeout: 1000 }}>
              <Card loading={true}>
                <TargetSelectButtons />
                <CylonSpinner />
              </Card>
            </Fade>
          ) : rankTags ? (
            rankTags.length > 0 ? (
              <Fade in={true} {...{ timeout: 1000 }}>
                <Card>
                  <TargetSelectButtons />
                  <InformationTemplate rankTags={rankTags} />
                </Card>
              </Fade>
            ) : (
              <Fade in={true} {...{ timeout: 1000 }}>
                <Card loading={true}>
                  <TargetSelectButtons />
                  <NoData>데이터를 불러오는데 실패했어요!</NoData>
                </Card>
              </Fade>
            )
          ) : null}
        </>
      )}
    </TrendPageWrapper>
  );
}

export default TrendPage;
