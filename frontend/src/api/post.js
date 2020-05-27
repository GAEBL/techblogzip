import client from '../client';

export const Post = {
  getAllPosts: ({ company, sort }) =>
    client.get('/techblog/posts/', {
      params: {
        company,
        sort,
      },
    }),
  getPostLikeCount: (id) => client.get(`/techblog/posts/like/${id}/`),
  getMainPageData: () => client.get('/techblog/main/'),
  //   searchPosts:() => client
  getSearchResults: ({ query }) =>
    client.get('/techblog/search/', {
      params: {
        query,
      },
    }),
};
