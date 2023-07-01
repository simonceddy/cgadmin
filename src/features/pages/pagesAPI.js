import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../consts';
import { axiosBaseQuery } from '../../util/axiosClient';

export const pagesAPI = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_URL}/page`,
  }),
  reducerPath: 'pagesAPI',
  tagTypes: ['Page'],
  endpoints: (builder) => ({
    fetchPages: builder.query({
      query: () => ({ url: '/' }),
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
      query: ({ ...data }) => ({
        method: 'POST',
        data,
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
          data: { ...data }
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
