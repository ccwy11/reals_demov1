import { ItinerarySlot } from '@/types/itinerary';
import { geocodeAddress } from '../geo/geocode';


export function mergeEnhancements(skeleton: any[], aiResponse: any[]) {
  const enhanced = skeleton.map(slot => ({ ...slot }));

  for (const suggest of aiResponse) {
    let inserted = false;

    for (let i = 0; i < enhanced.length; i++) {
      const slot = enhanced[i];

      // Match if AI time is within or overlaps the skeleton slot
      if (
        suggest.start >= slot.start && 
        suggest.end <= slot.end && 
        !slot.event // only fill empty slots
      ) {
        // Insert AI event
        enhanced[i] = {
          ...slot,
          event: {
            id: `ai_${Date.now()}_${i}`,
            name: suggest.suggestion.name,
            location: { lat: 0, lng: 0 }, // will be geocoded
            address: suggest.suggestion.address,
            durationMin: suggest.suggestion.duration,
            priceTier: 'low',
            tags: [suggest.suggestion.type],
            imageUrl: null,
          },
          // transport: suggest.transport_from_previous || null,
        };

        // Geocode async (fire and forget for test speed)
        geocodeAddress(suggest.suggestion.address).then(loc => {
          if (enhanced[i]?.event) enhanced[i].event.location = loc;
        }).catch(() => {
          enhanced[i].event.location = { lat: 22.3193, lng: 114.1694 };
        });

        inserted = true;
        break;
      }
    }

    // If no slot matched, insert as new slot (fallback)
    if (!inserted) {
      enhanced.push({
        day: suggest.day,
        start: suggest.start,
        end: suggest.end,
        event: {
          id: `ai_fallback_${Date.now()}`,
          name: suggest.suggestion.name,
          location: { lat: 22.3193, lng: 114.1694 },
          address: suggest.suggestion.address,
          durationMin: suggest.suggestion.duration,
          priceTier: 'low',
          tags: [suggest.suggestion.type],
          imageUrl: null,
        },
        transport: suggest.transport_from_previous || null,
      });
    }
  }

  return enhanced;
}
// export async function mergeEnhancements(
//   skeleton: ItinerarySlot[],
//   aiSuggestions: any[]
// ): Promise<ItinerarySlot[]> {
//   const enhanced = [...skeleton];

//   aiSuggestions.forEach(async suggest => {
//     const slotIndex = enhanced.findIndex(
//       s => s.day === suggest.day && s.start === suggest.start
//     );

// // Inside mergeEnhancements function → replace the whole if block
// if (slotIndex !== -1 && !enhanced[slotIndex].event) {
//   const newEvent = {
//     id: `ai_${Date.now()}_${Math.random()}`,
//     name: suggest.suggestion.name,
//     location: { lat: 0, lng: 0 }, // ← will be fixed
//     address: suggest.suggestion.address,
//     durationMin: suggest.suggestion.duration,
//     priceTier: 'low' as const,
//     tags: [suggest.suggestion.type],
//     imageUrl: null,
//   };

//   // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
//   // FIX: Geocode AI address before inserting
//   // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
//   try {
//     newEvent.location = await geocodeAddress(suggest.suggestion.address);
//   } catch (err) {
//     console.warn("Geocode failed, using fallback", err);
//     newEvent.location = { lat: 22.3193, lng: 114.1694 }; // Central HK fallback
//   }

//    (enhanced[slotIndex] as any).event = newEvent;
//   (enhanced[slotIndex] as any).transport = suggest.transport_from_previous;
// }
//   });

//   return enhanced;
// }