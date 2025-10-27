
import { RootState } from '@/app/store';

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) => state.wishlist.items.length;
export const selectIsInWishlist = (itemId: number) => (state: RootState) =>
  state.wishlist.items.some(item => item.id === itemId);