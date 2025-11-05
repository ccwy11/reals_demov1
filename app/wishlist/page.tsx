"use client";

import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/Bottomnav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
import useWishlistStore from "@/lib/store/useWishlistStore";
import { get } from "http";
import { getUserWishlist } from "@/server/wishlist";
import { set } from "zod";
import EventsMediaCard from "@/components/EventsMediaCard";
import { Loader2 } from "lucide-react";


interface WishlistEvent{
  id: string;
  title: string;
  description?: string;
}

export default function WishlistPage() {
  const [events, setEvents] = useState<WishlistEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleEvent, isSaved } = useWishlistStore();
  
  useEffect(() => {
    async function loadWishlist() {
      setLoading(true);
      try {
        const result = await getUserWishlist();
        if (result.success && result.data) {
          setEvents(result.data);
        } else {
          toast.error(result.message || 'Failed to load wishlist.');
        }
      } catch (error) {
        toast.error('An error occurred while loading the wishlist.');
      } finally {
        setLoading(false);
      }
    }

    loadWishlist();
  }, []);


  const handleRemove = async (eventId: string, title: string) => {
    await toggleEvent(eventId);
    setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    toast.success(`Removed "${title}" from your wishlist.`,
      { duration: 3000 }
    );
  }
  return (
    <div className="container mx-auto p-6 max-w-4xl pb-24">
      <AppHeader title="Wishlist" showSearch={false} />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          {events.length} {events.length === 1 ? "item" : "items"}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-12 gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading your wishlist...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          <p className="text-sm mt-2">Start adding events you love!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative bg-card rounded-xl shadow-sm overflow-hidden border"
            >
              {/* Reuse MediaCard */}
              <div className="p-4 pb-16">
                <EventsMediaCard
                  id={event.id}
                  title={event.title}
                  location={event.description?.split("•")[1] || "Location TBD"}
                  price="View Details"
                  href={`/events/${event.id}`}
                />
              </div>

              {/* Remove Button */}
              <div className="absolute bottom-3 right-3">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(event.id, event.title)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNavigation />
    </div>
  )
   
  
}
