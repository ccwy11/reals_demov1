import { ItinerarySlot } from '@/types/itinerary';

export function mergeEnhancements(
  skeleton: ItinerarySlot[],
  aiSuggestions: any[]
): ItinerarySlot[] {
  const enhanced = [...skeleton];

  aiSuggestions.forEach(suggest => {
    const slotIndex = enhanced.findIndex(
      s => s.day === suggest.day && s.start === suggest.start
    );

    if (slotIndex !== -1 && !enhanced[slotIndex].event) {
      enhanced[slotIndex].event = {
        id: `ai_${Date.now()}`,
        name: suggest.suggestion.name,
        location: { lat: 0, lng: 0 }, // geocoded later
        address: suggest.suggestion.address,
        durationMin: suggest.suggestion.duration,
        priceTier: 'low',
        tags: [suggest.suggestion.type],
        imageUrl: undefined
      };
      (enhanced[slotIndex] as any).transport = suggest.transport_from_previous;
    }
  });

  return enhanced;
}