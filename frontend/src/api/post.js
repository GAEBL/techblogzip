import client from '../client';

export const Post = {
  getAllPosts: ({ company, sort, page }) =>
    client.get('/posts/', {
      params: {
        company,
        sort: sort === 'default' ? '' : sort,
        page,
      },
    }),
  getMainPageData: () => client.get('/home/'),
  //   searchPosts:() => client
  getSearchResults: ({ query, page }) =>
    client.get('/search/posts/', {
      params: {
        query,
        page,
      },
    }),
  // FIXME: API
  getPostsByRelatedTag: ({ tag, page }) =>
    client.get(`search/tag/`, {
      params: {
        tag,
        page,
      },
    }),
  toggleLike: (id) => client.post(`/like/posts/${id}/`),
  getPostsByLiked: (page) =>
    client.get(`/like/user/posts/`, {
      params: {
        page,
      },
    }),
};
