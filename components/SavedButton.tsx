// components/SavedButton.tsx
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@/components/features/wishlistSlice';
import { selectIsInWishlist } from '@/components/features/wishlistSelectors';
import { toast } from 'sonner'; // ← Sonner
import { Heart } from 'lucide-react';
import { useGetSavedQuery, useToggleWishlistMutation } from '@/services/api';



export default function SavedButton({ event }: { event: { id: number; name: string } }) {
  const [toggle] = useToggleWishlistMutation();
  const { data } = useGetSavedQuery();
  const isSaved = data?.wishlist.some((i: any) => i.id === event.id);

  const handleClick = () => {
    toggle(event.id);
    toast.success(isSaved ? 'Removed' : 'Saved!', {
      description: event.name,
      action: isSaved ? { label: 'Undo', onClick: () => toggle(event.id) } : undefined,
    });
  };

  return (
    <button onClick={handleClick} className="p-3 bg-white rounded-full shadow-md hover:shadow-lg">
      <Heart size={24} fill={isSaved ? 'red' : 'none'} color={isSaved ? 'red' : 'gray'} />
    </button>
  );
}

// const mockItem = {
//   id: 1,
//   name: 'Sunset Yoga on Beach',
//   price: '25',
//   photo: '/api/placeholder/300/200',
//   isEvent: true,
// };

// export default function SavedButton() {
//   const dispatch = useDispatch();
//   const isSaved = useSelector(selectIsInWishlist(mockItem.id));

//   const handleClick = () => {
//     if (isSaved) {
//       dispatch(removeFromWishlist(mockItem.id));
//       toast.success('Removed from wishlist', {
//         description: 'You can add it back anytime.',
//         action: {
//           label: 'Undo',
//           onClick: () => dispatch(addToWishlist(mockItem)),
//         },
//       });
//     } else {
//       dispatch(addToWishlist(mockItem));
//       toast.success('Added to wishlist!', {
//         description: `${mockItem.name} is saved.`,
//         action: {
//           label: 'View',
//           onClick: () => window.location.href = '/wishlist',
//         },
//       });
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
//     >
//       <Heart
//         size={24}
//         fill={isSaved ? 'red' : 'none'}
//         color={isSaved ? 'red' : 'gray'}
//         className="transition-all"
//       />
//     </button>
//   );
// }