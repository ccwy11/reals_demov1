// services/transport/directions.service.ts
// Key: Calls Google Directions API for HK transit/walk routes – prefers MTR/subway
import { z } from 'zod';

const DirectionsSchema = z.object({
  routes: z.array(
    z.object({
      legs: z.array(
        z.object({
          duration: z.object({
            text: z.string(),  // e.g., "20 mins"
            value: z.number(), // seconds
          }),
          distance: z.object({
            text: z.string(),  // e.g., "2.5 km"
            value: z.number(), // meters
          }),
          steps: z.array(
            z.object({
              html_instructions: z.string(), // "Walk to MTR station"
              travel_mode: z.enum(['WALKING', 'TRANSIT', 'DRIVING']), // Primary mode
            })
          ),
          start_location: z.object({ lat: z.number(), lng: z.number() }),
          end_location: z.object({ lat: z.number(), lng: z.number() }),
        })
      ),
    })
  ),
  status: z.enum(['OK', 'ZERO_RESULTS', 'NOT_FOUND', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED']),
});

export async function getRoute(
  from: { lat: number; lng: number }, 
  to: { lat: number; lng: number }, 
  mode: 'walking' | 'transit' = 'transit'  // HK default: transit (MTR/bus)
): Promise<{
  mode: string;          // e.g., "subway", "walk"
  duration_min: number;  // Rounded minutes
  distance_km: number;   // Rounded km
  summary: string;       // "Walk to Admiralty MTR → Take Tsuen Wan Line"
}> {
  // Step 1: Build origin/destination strings
  const origin = `${from.lat},${from.lng}`;
  const destination = `${to.lat},${to.lng}`;

  // Step 2: API call with HK-optimized params (transit_mode=rail for MTR)
  const url = `https://maps.googleapis.com/maps/api/directions/json?` +
    `origin=${origin}&` +
    `destination=${destination}&` +
    `mode=${mode}&` +
    `transit_mode=rail&` +  // Prioritize MTR/ferry for HK
    `language=en&` +        // English instructions
    `key=${process.env.GOOGLE_MAP_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Directions HTTP ${res.status}: ${await res.text().slice(0, 100)}`);
  }

  const json = await res.json();
  const data = DirectionsSchema.parse(json);

  if (data.status !== 'OK' || !data.routes[0] || !data.routes[0].legs[0]) {
    throw new Error(`No route: ${data.status} for ${origin} → ${destination}`);
  }

  const leg = data.routes[0].legs[0];
  const firstStep = leg.steps[0];
  
  // Step 3: Determine primary mode (HK-specific: TRANSIT → subway if rail)
  let routeMode: string;
  if (firstStep.travel_mode === 'TRANSIT') {
    routeMode = firstStep.html_instructions.toLowerCase().includes('mtr') || 
                firstStep.html_instructions.toLowerCase().includes('rail') 
      ? 'subway' : 'bus';
  } else {
    routeMode = firstStep.travel_mode.toLowerCase();
  }

  // Step 4: Build summary (first 2 steps for brevity)
  const stepSummary = leg.steps.slice(0, 2).map(s => s.html_instructions.replace(/<[^>]*>/g, '')).join(' → ');

  console.log(`Route: ${origin} → ${destination} | ${routeMode} ${leg.duration.text} (${leg.distance.text})`);

  return {
    mode: routeMode,
    duration_min: Math.round(leg.duration.value / 60),
    distance_km: Math.round(leg.distance.value / 1000),
    summary: stepSummary,
  };
}