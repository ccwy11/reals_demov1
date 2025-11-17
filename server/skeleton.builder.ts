import { events } from "@/db/schema";
import { DBEvent, ItineraryInput, ItinerarySlot, TimeSlot } from "@/types/itinerary";




// ──────────────────────────────────────────────────────────────
// 1. Helper: date range
// ──────────────────────────────────────────────────────────────
function getDateRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const current = new Date(start);
  const endDate = new Date(end);
  while (current <= endDate) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
 // ──────────────────────────────────────────────────────────────
// 2. Helper: time range per slot
// ──────────────────────────────────────────────────────────────
function getTimeRange(slot: string): { start: string; end: string } {
  const ranges: Record<string, { start: string; end: string }> = {
    morning: { start: '09:00', end: '12:00' },
    afternoon: { start: '13:00', end: '17:00' },
    evening: { start: '18:00', end: '21:00' }
  };
  return ranges[slot];
}


// ──────────────────────────────────────────────────────────────
// 3. Helper: convert "HH:MM" → minutes
// ──────────────────────────────────────────────────────────────
function timeToMin(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}




export function findBestFitEvent(
    events: DBEvent[],
    day: string,
    range: { start: string; end: string },
prefs: string[]
): DBEvent | undefined{
    // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
  // FIX 1: Filter + Score + SORT → then take [0]
  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
  const slotDuration = timeToMin(range.end) - timeToMin(range.start);

  const candidates = events
    .filter(e => 
      e.tags.some(tag => prefs.includes(tag)) &&           // tag match
      e.durationMin <= slotDuration                         // fits time
    )
    .map(e => ({
      event: e,
      score: e.tags.filter(t => prefs.includes(t)).length   // higher = better
    }))
    .sort((a, b) => b.score - a.score);                    // ← SORT DESC

  // Optional debug (remove later)
  console.log(`Slot ${range.start}-${range.end} | Duration: ${slotDuration} min`);
  console.log("Candidates:", candidates.map(c => ({ name: c.event.name, score: c.score })));

  return candidates[0]?.event;
  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
}
// ──────────────────────────────────────────────────────────────
// 5. Build full skeleton – NOW WITH "used events" tracker
// ──────────────────────────────────────────────────────────────
export function buildSkeleton(
  dbEvents: DBEvent[],
  input: ItineraryInput
): ItinerarySlot[] {
  const slots: ItinerarySlot[] = [];
  const days = getDateRange(input.startDate, input.endDate);
  const availableEvents = [...dbEvents];   // ← copy so we can remove used ones

  days.forEach(day => {
    ['morning', 'afternoon', 'evening'].forEach(slot => {
      const timeRange = getTimeRange(slot);
      const bestEvent = findBestFitEvent(availableEvents, day, timeRange, input.preferences);

      slots.push({
        day,
        slot: slot as TimeSlot,
        event: bestEvent,
        start: timeRange.start,
        end: timeRange.end
      });

      // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
      // CRITICAL FIX: Remove the event so it can't be reused
      // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
      if (bestEvent) {
        const index = availableEvents.findIndex(e => e.id === bestEvent.id);
        if (index !== -1) availableEvents.splice(index, 1);
      }
    });
  });

  return slots;
}


//     // ==== TEST 1 – START ====
// const testInput = {
//   destination: "Hong Kong",
//   startDate: "2025-12-01",
//   endDate: "2025-12-01",
//   preferences: ["views", "culture"],
//   travelers: 2
// };

// const fakeDBEvents = [
//   {
//     id: "evt-1",
//     name: "Victoria Peak Tram",
//     location: { lat: 22.278, lng: 114.159 },
//     address: "The Peak, Hong Kong",
//     durationMin: 120,
//     priceTier: "medium" as const,
//     tags: ["views", "family"],
//     imageUrl: undefined
//   },
//   {
//     id: "evt-2",
//     name: "Temple Street Night Market",
//     location: { lat: 22.306, lng: 114.170 },
//     address: "Yau Ma Tei",
//     durationMin: 180,
//     priceTier: "free" as const,
//     tags: ["culture", "food"],
//     imageUrl: undefined
//   }
// ];

// // ADD THIS: Log before and after

// console.log("\n=== TEST 1: SKELETON BUILD ===\n");
// const result = buildSkeleton(fakeDBEvents, testInput);
// result.forEach(slot => {
//   console.log(
//     `${slot.day} ${slot.slot} (${slot.start}-${slot.end}): ` +
//     (slot.event ? slot.event.name : "EMPTY"))
    
// });
// // ==== END ====