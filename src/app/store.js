import { configureStore } from '@reduxjs/toolkit';
import { pagesAPI } from '../features/pages/pagesAPI';

export const store = configureStore({
  reducer: {
    [pagesAPI.reducerPath]: pagesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(pagesAPI.middleware)
});
