'use client';
import { useSelector } from 'react-redux';
import { selectWishlistCount } from '@/components/features/wishlistSelectors'
import { Heart } from 'lucide-react';

export default function WishlistCounter() {
  const count = useSelector(selectWishlistCount);

  if (count === 0) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full flex items-center gap-1 shadow-lg z-50">
      <Heart size={16} fill="white" />
      <span className="font-bold">{count}</span>
    </div>
  );
}