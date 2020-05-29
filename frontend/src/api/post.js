import client from '../client';

export const Post = {
  getAllPosts: ({ company, sort, page }) =>
    client.get('/techblog/posts/', {
      params: {
        company,
        sort,
        page,
      },
    }),
  getPostLikeCount: (id) => client.get(`/techblog/posts/like/${id}/`),
  getMainPageData: () => client.get('/techblog/main/'),
  //   searchPosts:() => client
  getSearchResults: ({ query, company, page }) =>
    client.get('/techblog/search/', {
      params: {
        query,
        company,
        page,
      },
    }),
  postLike: ({ id, user }) =>
    client.post(`/techblog/posts/like/${id}/`, {
      params: {
        user,
      },
    }),
};
