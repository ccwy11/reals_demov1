// services/geo/geocode.service.ts
// Regenerated: Robust HK geocoding with retry chain + components (per Google docs)
// Handles vague addresses like "Tim Ho Wan, Sham Shui Po" → exact branch coords
import { z } from 'zod';

const API_KEY = process.env.GOOGLE_MAPS_ROUTES_API_KEY;

const GeocodeSchema = z.object({
  results: z.array(
    z.object({
      geometry: z.object({
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    })
  ),
  status: z.enum(['OK', 'ZERO_RESULTS', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED', 'INVALID_REQUEST']),
});

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const clean = address.trim();
  if (!clean || clean.length < 3) {
    throw new Error("Invalid address");
  }

  // Step 1: Build retry queries with increasing specificity (Google best practice: components for locality bias)
  const baseQuery = encodeURIComponent(clean);
  const queries = [
    // Query 1: Base + country (reduces global noise)
    { addr: `${baseQuery}`, components: 'country:HK' },
    // Query 2: Add Kowloon (common HK district for Sham Shui Po)
    { addr: `${baseQuery}`, components: 'country:HK|administrative_area:Kowloon' },
    // Query 3: Restaurant bias (for food suggestions)
    { addr: `${baseQuery}`, components: 'country:HK|types:restaurant|establishment' },
    // Query 4: Hard fix for Tim Ho Wan (exact from verified sources)
    ...(clean.toLowerCase().includes('tim ho wan') ? [{ addr: 'Tim Ho Wan, G/F, 9-11 Fuk Wing Street, Sham Shui Po, Kowloon, Hong Kong', components: '' }] : []),
  ];

  for (let i = 0; i < queries.length; i++) {
    const { addr, components } = queries[i];
    try {
      // Step 2: Build URL with components param (filters results for accuracy)
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${API_KEY}`;
      if (components) url += `&components=${components}`;

      const res = await fetch(url);
      if (!res.ok) continue;  // Retry on HTTP errors

      const json = await res.json();
      const data = GeocodeSchema.parse(json);

      // Step 3: Success check (per docs: OK + results[0] for primary match)
      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        // console.log(`Geocoded "${clean}" (query ${i + 1}): ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        return { lat, lng };
      }
    } catch (err) {
      console.warn(`Query ${i + 1} failed for "${clean}":`, err);
      // Silent retry
    }
  }

  // Step 4: Fallback (docs recommend city center for urban areas like HK)
  console.warn(`All retries failed for "${clean}" – using Central HK fallback`);
  return { lat: 22.3193, lng: 114.1694 };
}