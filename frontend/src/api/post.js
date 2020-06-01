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
  getMainPageData: () => client.get('/main/'),
  //   searchPosts:() => client
  getSearchResults: ({ query, company, page }) =>
    client.get('/search/', {
      params: {
        query,
        company,
        page,
      },
    }),
  // FIXME: API
  getPostsByRelatedTag: ({ tag, page }) =>
    client.get(`/tag/`, {
      params: {
        tag,
        page,
      },
    }),
  toggleLike: (id) => client.post(`/posts/like/${id}/`),
};
