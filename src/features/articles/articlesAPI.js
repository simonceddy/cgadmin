import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../consts';

export const articlesAPI = createApi({
  baseQuery: fetchBaseQuery(`${API_URL}/articles`),
  reducerPath: 'articlesAPI',
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    fetchArticles: builder.query({
      query: () => '/',
      providesTags: (result, error) => {
        if (error) console.error(error);
        return (result
          ? [...result.map(({ key }) => ({ type: 'Article', key })), 'Article']
          : ['Article']);
      }
    })
  })
});
