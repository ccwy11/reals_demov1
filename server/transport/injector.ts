// services/transport/injector.ts
import { ItinerarySlot } from '@/types/itinerary';
import { getRealHKTransport } from './google-routes';


export async function injectRealTransport(slots: ItinerarySlot[]): Promise<ItinerarySlot[]> {
 const cleanAddress = (addr: string) => 
  addr.replace(/District.*|Island.*|Level \d+.*/gi, '').replace(/,\s*,/g, ',').trim() + ', Hong Kong';
 
  const result: ItinerarySlot[] = [];

  for (let i = 0; i < slots.length; i++) {
    const current = slots[i];
    result.push(current); // Add the event/activity

    const next = slots[i + 1];
    if (current.event?.address && next?.event?.address) {
      try {
        const transport = await getRealHKTransport(
 cleanAddress(current.event.address),
  cleanAddress(next.event.address),
          // 'TRAFFIC_UNAWARE'
        );

        // CHANGE 1: Correct start/end time
        const transportStart = current.end;
        const transportEnd = addMinutes(transportStart, transport.duration_min);

        // CHANGE 2: Save real from/to names + real distance
        result.push({
          day: current.day,
          slot: 'transport' as any,
          start: transportStart,
          end: transportEnd,
          event: undefined,
          transport: {
            mode: transport.mode,
            duration_min: transport.duration_min,
            distance_km: transport.distance_km,        // Real distance from Google
            from: current.event.name,                  // CHANGE: Save name
            to: next.event.name                        // CHANGE: Save name
          }
        } as any);
      } catch (err) {
        console.warn("Transport failed, skipping:", err);
        // No fallback transport slot on error
      }
    }
  }

  return result;
}

// Helper – unchanged
function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}