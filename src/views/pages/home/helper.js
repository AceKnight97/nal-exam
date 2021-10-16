import axios from 'axios';

export const temp = '';

const LIST_OF_ARTICLES = 'https://5f55a98f39221c00167fb11a.mockapi.io/blogs';

export const queryListOfArticles = async (state = {}, page, order, search, isLoadMore) => {
  const pageParam = page ? `?page=${page}&limit=10` : '';
  const orderParam = order ? `?sortBy=createdAt&order=${order}` : '';
  const formatSearch = search?.replace(' ', '%20');
  const searchParam = search ? `?title=${formatSearch}` : '';
  let param = `${LIST_OF_ARTICLES}${pageParam}${orderParam}${searchParam}`;
  if (param === LIST_OF_ARTICLES) {
    param = `${LIST_OF_ARTICLES}?page=1&limit=10`;
  }
  console.log({ param });
  try {
    const { data } = await axios.get(param);
    const isEndOfData = data?.length === 0 || data?.length % 10 !== 0;
    const listArticles = isLoadMore ? [...state.listArticles, ...data] : data;
    return { listArticles, isEndOfData };
  } catch (error) {
    console.log('Failed to get List of Articles: ', error);
    return [];
  }
};

export const queryAnArticle = async (id = '') => {
  const param = `${LIST_OF_ARTICLES}/${id}`;
  try {
    const res = await axios.get(param);
    console.log({ res });
    return res?.data;
  } catch (error) {
    console.log('Failed to get the Article: ', error);
    return [];
  }
};

// export const querySortedArticles = async (type = '', order = 'asc') => {
//   const param = `${LIST_OF_ARTICLES}?sortBy=${type}&order=${order}`;
//   try {
//     const res = await axios.get(param);
//     console.log({ res });
//     return res?.data;
//   } catch (error) {
//     console.log('Failed to get the Article: ', error);
//     return [];
//   }
// };
