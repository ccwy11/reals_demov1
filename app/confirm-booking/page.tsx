"use client";

import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/Bottomnav";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmBookingPage() {
  // const search = useSearchParams();
  // const ref = search?.get("ref") || "";
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative flex flex-col">
      <AppHeader title="Booking Confirmed" showSearch={false} />

      <div className="px-4 pb-28 pt-8">
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-semibold mb-2">Booking confirmed</h2>
          <p className="text-sm text-muted-foreground mb-4">Reference: <span className="font-medium">
            {/* {ref} */}
          </span></p>
          <p className="text-sm text-muted-foreground mb-6">A confirmation email has been sent. You can view your itinerary or manage bookings in the Schedule tab.</p>

          <div className="space-y-3">
            <Button onClick={() => router.push('/itineraries')} className="w-full bg-primary text-white py-3 rounded-lg">View Itinerary</Button>
            <Button onClick={() => router.push('/')} className="w-full bg-muted text-foreground py-3 rounded-lg">Back to Home</Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
