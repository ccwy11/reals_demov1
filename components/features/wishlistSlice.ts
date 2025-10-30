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
      if (!state.items.find(i => i.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;