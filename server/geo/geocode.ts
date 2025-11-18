// services/geo/geocode.service.ts
// Key: Use Google Directions API as a smarter geocoder (bypasses ZERO_RESULTS on vague addresses)
import { z } from 'zod';

const DirectionsGeocodeSchema = z.object({
  geocoded_waypoints: z.array(
    z.object({
      geocoder_status: z.string(),
      place_id: z.string(),
      types: z.array(z.string()),
    })
  ),
  routes: z.array(z.any()),
  status: z.enum(['OK', 'ZERO_RESULTS', 'NOT_FOUND', 'OVER_QUERY_LIMIT']),
});

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const clean = address.trim();
  if (!clean || clean.length < 3) throw new Error("Empty address");

  // Use a fixed origin in Hong Kong – Directions API is more forgiving than pure Geocoding
  const origin = "Hong Kong International Airport"; // Reliable anchor point
  const destination = clean;

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=
${process.env.GOOGLE_API_KEY}

  `;
    
    //   

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Directions API error: ${res.status}`);
  }

  const json = await res.json();
  const data = DirectionsGeocodeSchema.parse(json);

  if (data.status !== 'OK' || data.geocoded_waypoints.length < 2) {
    console.warn(`Directions fallback failed for "${clean}", status: ${data.status}`);
    return { lat: 22.3193, lng: 114.1694 }; // Central HK fallback
  }

  // Extract destination coordinates from the route
  const destinationLeg = data.routes[0]?.legs[0]?.end_location;
  if (!destinationLeg) {
    console.warn(`No end_location for "${clean}"`);
    return { lat: 22.3193, lng: 114.1694 };
  }

  console.log(`Geocoded via Directions API: "${clean}" → ${destinationLeg.lat}, ${destinationLeg.lng}`);
  return { lat: destinationLeg.lat, lng: destinationLeg.lng };
}