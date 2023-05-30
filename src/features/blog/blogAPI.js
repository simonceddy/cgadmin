import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../consts';

export const blogAPI = createApi({
  baseQuery: fetchBaseQuery(`${API_URL}/blog`),
  reducerPath: 'blogAPI',
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    fetchBlog: builder.query({
      query: () => '/',
      providesTags: (result, error) => {
        if (error) console.error(error);
        return (result
          ? [...result.map(({ key }) => ({ type: 'Blog', key })), 'Blog']
          : ['Blog']);
      }
    }),
    fetchBlogPost: builder.query({
      query: ({ slug }) => ({
        url: `/${slug}`
      }),
      providesTags: ['Blog']
    }),
    addBlogPost: builder.mutation({
      query: ({ ...body }) => ({
        method: 'POST',
        body,
        url: '/create'
      }),
      invalidatesTags: ['Blog']
    }),
    updateBlogPost: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Blog']
    }),
    deleteBlogPost: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog']
    }),
  })
});

export const {
  useFetchBlogPostQuery,
  useFetchBlogQuery,
  useAddBlogPostMutation,
  useDeleteBlogPostMutation,
  useUpdateBlogPostMutation,
} = blogAPI;
