// services/transport/injector.ts
import { ItinerarySlot } from '@/types/itinerary';



export async function injectTransport(slots: ItinerarySlot[]): Promise<ItinerarySlot[]> {
  const final: ItinerarySlot[] = [];

  for (let i = 0; i < slots.length; i++) {
    const current = { ...slots[i] };

    // Always push the event itself
    final.push(current);

    // If there's a next event with coords, add transport
    if (i < slots.length - 1 && current.event && slots[i + 1].event) {
      const from = current.event.location;
      const to = slots[i + 1].event.location;

      try {
        const route = await getRoute(from, to, 'transit');

        // Add transport slot right after current event
        final.push({
          day: current.day,
          slot: 'transport' as const,
          start: current.end,
          end: addMinutes(current.end, route.duration_min),
          event: undefined,
          transport: {
            mode: route.mode,
            duration_min: route.duration_min,
            distance_km: route.distance_km,
            summary: route.summary,
          },
        });
      } catch (err) {
        console.warn("Transport failed, inserting walk fallback", err);
        final.push({
          day: current.day,
          slot: 'transport' as const,
          start: current.end,
          end: addMinutes(current.end, 15),
          event: undefined,
          transport: { mode: 'walk', duration_min: 15, summary: "Walk / short taxi" },
        });
      }
    }
  }

  return final;
}

// Helper: "12:00" + 25 mins → "12:25"
function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}