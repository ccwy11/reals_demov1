import { events } from "@/db/schema";
import { DBEvent, ItineraryInput, ItinerarySlot, TimeSlot } from "@/types/itinerary";

export function buildSkeleton(
  dbEvents: DBEvent[],
  input: ItineraryInput
): ItinerarySlot[] {
  const slots: ItinerarySlot[] = [];
  const days = getDateRange(input.startDate, input.endDate);

  days.forEach(day => {
    ['morning', 'afternoon', 'evening'].forEach(slot => {
      const timeRange = getTimeRange(slot);
      const bestEvent = findBestFitEvent(dbEvents, day, timeRange, input.preferences);
      
      slots.push({
        day,
        slot: slot as TimeSlot,
        event: bestEvent,
        start: timeRange.start,
        end: timeRange.end
      });
    });
  });

  return slots;
}


export function findBestFitEvent(
    events: DBEvent[],
    day: string,
    range: { start: string; end: string },
prefs: string[]
): DBEvent | undefined{
    return events
        .filter(e =>
            e.tags.some(tag => prefs.includes(tag)) &&
            e.durationMin <= timeToMin(range.end) - timeToMin(range.start)
        )
        .sort((a, b) => {
            const scoreA = a.tags.filter(tag => prefs.includes(tag)).length;
            const scoreB = b.tags.filter(tag => prefs.includes(tag)).length;
            return scoreB - scoreA;
        })[0];
}

function timeToMin(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

// Helper stubs (implement next sprint)
function getDateRange(start: string, end: string): string[] {
    const dates = [];
    const  current = new Date(start);
    while (current <= new Date(end)) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
    }
    return dates;
}
 
function getTimeRange(slot: string): { start: string; end: string } { 
    const ranges = {
        morning: { start: "09:00", end: "12:00" },
        afternoon: { start: "13:00", end: "17:00" },
        evening: { start: "18:00", end: "22:00" },
    };
    return ranges[slot as keyof typeof ranges];
    }
 