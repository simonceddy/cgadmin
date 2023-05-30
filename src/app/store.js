import { configureStore } from '@reduxjs/toolkit';
import { blogAPI } from '../features/blog/blogAPI';
import { pagesAPI } from '../features/pages/pagesAPI';

export const store = configureStore({
  reducer: {
    [blogAPI.reducerPath]: blogAPI.reducer,
    [pagesAPI.reducerPath]: pagesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(blogAPI.middleware, pagesAPI.middleware)
});
