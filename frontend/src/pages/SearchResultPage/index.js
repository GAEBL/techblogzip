import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, clearPosts, tagClick } from '../../reducers/post';
import RecentPostItem from '../RecentPostsPage/RecentPostItem';
import Pagination from '@material-ui/lab/Pagination';

const SearchResultPageWraaper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ResultsWrapper = styled.div``;

const ResultText = styled.p`
  font-size: 40px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

function SearchResultPage({ history }) {
  const dispatch = useDispatch();
  const { query, results, loading, lastpage, resultNum, tagBool } = useSelector(
    (state) => ({
      query: state.post.query,
      results: state.post.posts,
      loading: state.loading['search/GET_SEARCHRESULTS'],
      lastpage: state.post.lastPage,
      resultNum: state.post.resultNum,
      tagBool: state.post.tagClick,
    }),
  );
  const [queryresult, setQueryResult] = useState('');
  const [page, setPage] = useState(1);
  const handleSearch = (v) => {
    setQueryResult(query);
    dispatch(getSearchResults({ query, page: v }));
  };

  useEffect(() => {
    if (tagBool) {
      handleSearch();
      dispatch(tagClick());
    }
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch, page]);

  const handleChangePage = (e, v) => {
    setPage(v);
    handleSearch(v);
    window.scrollTo(0, 0);
  };

  return (
    <SearchResultPageWraaper>
      <ResultText>
        "{queryresult}"검색 결과({resultNum ? resultNum : 0}건)
      </ResultText>
      <SearchInput handleSearch={handleSearch} />
      <ResultsWrapper>
        {loading ? <div>로딩</div> : null}
        {!loading &&
          results &&
          results.map((result, index) => (
            <RecentPostItem key={index} post={result} history={history} />
          ))}
      </ResultsWrapper>
      <PaginationWrapper>
        <Pagination
          count={lastpage}
          size="large"
          onChange={handleChangePage}
          value={page}
          page={page}
        />
      </PaginationWrapper>
    </SearchResultPageWraaper>
  );
}

export default SearchResultPage;
