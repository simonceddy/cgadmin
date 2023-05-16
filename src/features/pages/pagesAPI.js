import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../consts';

export const pagesAPI = createApi({
  baseQuery: fetchBaseQuery(`${API_URL}/page`),
  reducerPath: 'pagesAPI',
  tagTypes: ['Page'],
  endpoints: (builder) => ({
    fetchPages: builder.query({
      query: () => '/',
      providesTags: (result, error) => {
        if (error) console.error(error);
        return (result
          ? [...result.map(({ key }) => ({ type: 'Page', key })), 'Page']
          : ['Page']);
      }
    })
  })
});
