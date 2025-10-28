"use client";

import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/Bottomnav";
import MediaCard from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSelector } from 'react-redux';
import { selectWishlistItems } from '@/components/features/wishlistSelectors';
import WishlistCounter from '@/components/WishlistCounter';
import { removeFromWishlist } from '@/components/features/wishlistSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';


export default function WishlistPage() {
  const items = useSelector(selectWishlistItems);
  const dispatch = useDispatch();

 const handleRemove = (id: number, name: string) => {
    dispatch(removeFromWishlist(id));
    toast.success('Removed', {
      description: `${name} removed from wishlist.`,
      action: {
        label: 'Undo',
        onClick: () => {
          // Re-add logic (fetch item or store in memory)
          toast.loading('Restoring...');
          setTimeout(() => toast.dismiss(), 1000);
        },
      },
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
       <AppHeader title="Wishlist" showSearch={false} />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <WishlistCounter />
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          <p className="text-sm mt-2">Start adding items you love!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all"
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.isEvent ? 'Event' : 'Product'} • {item.price ? `$${item.price}` : 'Free'}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
      <BottomNavigation />
    </div>
  );
}

// const sample = [
//   {
//     id: 1,
//     title: "Tung Hing Glass & Pottery - Evening Workshop",
//     date: "2025/11/12",
//     location: "Wan Chai",
//     price: "$250",
//     image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&h=700&fit=crop"
//   },
//   {
//     id: 2,
//     title: "Cocktail Masterclass at Penicillin",
//     date: "2025/09/20",
//     location: "Central",
//     price: "$180",
//     image: "https://images.unsplash.com/photo-1542444459-db6d3d4f9b2b?w=800&h=500&fit=crop"
//   }
// ];

// export default function WishlistPage() {
//   const hasItems = sample.length > 0;

//   return (
//     <div className="min-h-screen bg-background max-w-md mx-auto relative">
//       <AppHeader title="Wishlist" showSearch={false} />

//       <div className="px-4 pb-28 pt-4">
//         {hasItems ? (
//           <div className="space-y-4">
//             {sample.map((it) => (
//                   <MediaCard key={it.id} title={it.title} date={it.date} location={it.location} price={it.price} image={it.image} href="/activity" />
//             ))}
//           </div>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center py-20">
//             <div className="w-14 h-14 mb-4 rounded-full bg-muted flex items-center justify-center">❤</div>
//             <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
//             <p className="text-muted-foreground mb-6">Explore experiences and save them here for later.</p>
//             <Button asChild>
//               <Link href="/">Explore</Link>
//             </Button>
//           </div>
//         )}
//       </div>

//       <BottomNavigation />
//     </div>
//   );
// }
