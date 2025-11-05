// components/SavedButton.tsx
"use client";
import useWishlistStore from "@/lib/store/useWishlistStore";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from 'next/compat/router'

interface SavedButtonProps {
  eventId: string;
  eventName?: string;
}

export default function SavedButton({ eventId, eventName }: SavedButtonProps) {
  const router = useRouter();
  const { isSaved, toggleEvent } = useWishlistStore();

  const handleClick = async () => {
    const wasSaved = isSaved(eventId);
    await toggleEvent(eventId);

    if (!wasSaved) {
      toast.success(`Added "${eventName ?? 'event'}" to your wishlist`,
        {
            description: eventName ? `${eventName} is saved.` : 'Event saved.',
          action: {
            label: 'View',
            onClick: () => router?.push('/wishlist'),
          }
          });
    } else {
      toast.success(`Removed "${eventName ?? 'event'}" from your wishlist`);
    }
}


const saved = isSaved(eventId);


  return (
<Button
      variant={saved ? 'default' : 'outline'}
      size="icon"
      onClick={handleClick}
      className="rounded-full transition-all hover:scale-110"
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`h-5 w-5 transition-all ${saved ? 'fill-current' : ''}`}
      />
    </Button>
  );
}