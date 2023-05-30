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
        url: '/create'
      }),
      invalidatesTags: ['Page']
    }),
    updatePage: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Page']
    }),
    deletePage: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Page']
    }),
  })
});

export const {
  useFetchPageQuery,
  useFetchPagesQuery,
  useAddPageMutation,
  useDeletePageMutation,
  useUpdatePageMutation,
} = pagesAPI;
