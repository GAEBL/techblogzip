import client from '../client';

export const Search = {
  getSearchResults: ({ query }) =>
    client.get('/techblog/search/', {
      params: {
        query,
      },
    }),
};
