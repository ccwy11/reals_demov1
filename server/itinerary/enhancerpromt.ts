// services/ai/enhancer.prompt.ts
import { ItinerarySlot, ItineraryInput } from '@/types/itinerary';

export function buildEnhancerPrompt(
  skeleton: ItinerarySlot[],
  input: ItineraryInput
): string {
  const booked = skeleton
    .filter(s => s.event)
    .map(s => `${s.start}-${s.end}: ${s.event!.name} at ${s.event!.address}`)
    .join('\n');

  const freeSlots = skeleton
    .filter(s => !s.event)
    .map(s => `${s.day} ${s.start}-${s.end}: FREE`)
    .join('\n');

  return `
You are a senior Hong Kong travel planner. Enhance this draft itinerary.
KEEP ALL BOOKED EVENTS EXACTLY. Only fill or upgrade FREE slots.

City: ${input.destination}
Dates: ${input.startDate} to ${input.endDate}
Preferences: ${input.preferences.join(', ')}

BOOKED (DO NOT REMOVE OR CHANGE):
${booked || 'None'}

FREE SLOTS TO FILL:
${freeSlots}

For each FREE slot:
- Suggest 1 activity: name, short description, duration (minutes), address
- Add transport from previous event: mode (walk/subway/etc), duration_min
- Return only JSON array, no markdown

Example:
[
  {
    "day": "2025-12-01",
    "start": "13:00",
    "end": "15:00",
    "suggestion": { "name": "Dim Sum", "duration": 90, "address": "Causeway Bay", "type": "meal" },
    "transport_from_previous": { "mode": "subway", "duration_min": 15 }
  }
]
`.trim();
}