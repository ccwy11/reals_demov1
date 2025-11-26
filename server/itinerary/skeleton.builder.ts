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
    lunch:{ start: '12:00', end: '13:00' },
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

