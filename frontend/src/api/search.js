import client from '../client';

export const Search = {
  getSearchResults: ({ query }) =>
    client.post('/techblog/search/', {
      params: {
        query,
      },
    }),
};
