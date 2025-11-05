// app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '@/components/features/wishlistSlice'

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    // [api.reducerPath]: api.reducer,
  },
//   middleware: (getDefault) => getDefault().concat(api.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getDispatch;