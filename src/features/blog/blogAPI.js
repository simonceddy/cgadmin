import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../consts';

export const blogAPI = createApi({
  baseQuery: fetchBaseQuery(`${API_URL}/blog`),
  reducerPath: 'blogAPI',
  tagTypes: ['Blog'],
  endpoints: {}
});
