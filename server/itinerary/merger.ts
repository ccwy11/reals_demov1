import { ItinerarySlot } from '@/types/itinerary';
import { geocodeAddress } from '../geo/geocode';

export async function mergeEnhancements(
  skeleton: ItinerarySlot[],
  aiSuggestions: any[]
): Promise<ItinerarySlot[]> {
  const enhanced = [...skeleton];

  aiSuggestions.forEach(async suggest => {
    const slotIndex = enhanced.findIndex(
      s => s.day === suggest.day && s.start === suggest.start
    );

// Inside mergeEnhancements function → replace the whole if block
if (slotIndex !== -1 && !enhanced[slotIndex].event) {
  const newEvent = {
    id: `ai_${Date.now()}_${Math.random()}`,
    name: suggest.suggestion.name,
    location: { lat: 0, lng: 0 }, // ← will be fixed
    address: suggest.suggestion.address,
    durationMin: suggest.suggestion.duration,
    priceTier: 'low' as const,
    tags: [suggest.suggestion.type],
    imageUrl: null,
  };

  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
  // FIX: Geocode AI address before inserting
  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
  try {
    newEvent.location = await geocodeAddress(suggest.suggestion.address);
  } catch (err) {
    console.warn("Geocode failed, using fallback", err);
    newEvent.location = { lat: 22.3193, lng: 114.1694 }; // Central HK fallback
  }

   (enhanced[slotIndex] as any).event = newEvent;
  (enhanced[slotIndex] as any).transport = suggest.transport_from_previous;
}
  });

  return enhanced;
}