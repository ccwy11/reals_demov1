// "use client";

import { getEvents } from "@/server/events";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/Bottomnav";
import EventsMediaCard from "@/components/EventsMediaCard";
import Chip from "@/components/Chip";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function EventsPage() {
  const list = await getEvents();

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <AppHeader />

      <div className="px-4 pb-28 pt-4 space-y-4">
        {/* ── Tabs ── */}
        <div className="flex gap-3">
          <button className="flex-1 rounded-full py-3 bg-card shadow-sm border border-border font-medium">
            ❤️ Featured
          </button>
          <button className="flex-1 rounded-full py-3 bg-card shadow-sm border border-border font-medium">
            ⏱️ Limited
          </button>
        </div>

        {/* ── Filters ── */}
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

        {/* ── Events List ── */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Events</h2>
          <div className="space-y-3">
            {list.map((ev) => {
              // Only pass the props that MediaCard still expects
              const {
                id,
                title,
                location,
                price,
                image,
                // `date` and `match` are now hard-coded inside the card
                // `href` defaults to "/activity" inside the card
                ...rest
              } = ev;

              return (
                <EventsMediaCard
                  key={id}
                  id={id}
                  title={title}
                  location={location}
                  price={price ?? undefined}
                  image={image}
                  // optional custom link per event (if you ever need it)
                  // href={ev.href}
                />
              );
            })}
          </div>
        </div>

        {/* ── Create CTA ── */}
        <div className="text-center mt-6">
          <Link href="/create" className="text-sm text-muted-foreground">
            Create new event
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}