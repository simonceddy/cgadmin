import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../consts';

export const pagesAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/page` }),
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
    }),
    fetchPage: builder.query({
      query: ({ slug }) => ({
        url: `/${slug}`
      }),
      providesTags: ['Page']
    }),
    addPage: builder.mutation({
      query: ({ ...body }) => ({
        method: 'POST',
        body,
        url: '/'
      }),
      invalidatesTags: ['Page']
    }),
    updatePage: builder.mutation({
      query: (data) => {
        console.log(`${API_URL}/page/${data.slug}`);
        return ({
          url: `/${data.slug}`,
          method: 'PUT',
          body: data
        });
      },
      invalidatesTags: ['Page']
    }),
    deletePage: builder.mutation({
      query: ({ slug }) => ({
        url: `/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Page']
    }),
  })
});

// console.log(pagesAPI);

export const {
  useFetchPageQuery,
  useFetchPagesQuery,
  useAddPageMutation,
  useDeletePageMutation,
  useUpdatePageMutation,
} = pagesAPI;
