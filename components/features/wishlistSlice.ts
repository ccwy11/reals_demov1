import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Event } from '@/types';

// Mock item shape (later from DB)
export interface WishlistItem {
  id: number;
  name: string;
  price?: string;
  photo: string;
  isEvent: boolean;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [], // Start empty
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;