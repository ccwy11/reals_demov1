"use client";

import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/Bottomnav";
import MediaCard from "@/components/MediaCard";
import Chip from "@/components/Chip";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Tung Hing Glass & Pottery - Evening Workshop",
    date: "2025/11/12",
    location: "Wan Chai",
    price: "$250",
    match: "89%",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&h=700&fit=crop"
  },
  {
    id: 2,
    title: "Archery Tag at Lai Chi Kok",
    date: "2025/10/03",
    location: "Lai Chi Kok",
    price: "$120",
    match: "70%",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=500&fit=crop"
  },
  {
    id: 3,
    title: "Cocktail Masterclass at Penicillin",
    date: "2025/09/20",
    location: "Central",
    price: "$180",
    match: "82%",
    image: "https://images.unsplash.com/photo-1542444459-db6d3d4f9b2b?w=800&h=500&fit=crop"
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <AppHeader />

      <div className="px-4 pb-28 pt-4 space-y-4">
        <div className="flex gap-3">
          <button className="flex-1 rounded-full py-3 bg-card shadow-sm border border-border font-medium">❤️ Featured</button>
          <button className="flex-1 rounded-full py-3 bg-card shadow-sm border border-border font-medium">⏱️ Limited</button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Filters</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Chip label="Fine dining" icon="🍽️" />
            <Chip label="Workshops" icon="🛠️" />
            <Chip label="Outdoor" icon="☀️" />
            <Chip label="Cocktail" icon="🍸" />
            <Chip label="Live music" icon="🎵" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Events</h2>
          <div className="space-y-3">
            {events.map((e) => (
              <MediaCard key={e.id} {...e} />
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/create" className="text-sm text-muted-foreground">Create new event</Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}