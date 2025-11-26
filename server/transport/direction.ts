// services/transport/directions.service.ts
// Uses your PROVEN Google Routes API code
const API_KEY = process.env.GOOGLE_MAPS_ROUTES_API_KEY;
const ROUTES_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';

export async function getRoute(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  mode: 'walking' | 'transit' = 'transit'
) {
  const now = new Date();
  const departureTime = new Date(now.getTime() + 10 * 1000).toISOString();

  const body = {
    origin: { location: { latLng: { latitude: from.lat, longitude: from.lng } } },
    destination: { location: { latLng: { latitude: to.lat, longitude: to.lng } } },
    travelMode: mode === 'walking' ? 'WALK' : 'TRANSIT',
    routingPreference: 'TRAFFIC_AWARE_OPTIMAL',
    departureTime,
  };

  const res = await fetch(ROUTES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY!,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error('Routes API failed:', await res.text());
    throw new Error('Transport routing failed');
  }

  const data = await res.json();
  const route = data.routes?.[0];

  if (!route) throw new Error('No route found');

  const durationSec = parseInt(route.duration.replace('s', ''));
  const distanceM = route.distanceMeters;

  return {
    mode: mode,
    duration_min: Math.round(durationSec / 60),
    distance_km: Math.round(distanceM / 100) / 10,
    duration_text: route.duration,
  };
}