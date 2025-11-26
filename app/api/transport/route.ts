// import { NextRequest, NextResponse } from 'next/server';

// // Get API Key from environment variables
// const API_KEY = process.env.GOOGLE_MAPS_ROUTES_API_KEY;
// const GOOGLE_ROUTES_API_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';

// // Define the shape of the request body
// interface TravelTimeRequest {
//   origin: string; // e.g., "38.9072 N, 77.0369 W" or "1600 Amphitheatre Parkway, Mountain View, CA"
//   destination: string;
// }








// // Route Handler for POST requests
// export async function POST(req: NextRequest) {
//   if (!API_KEY) {
//     return NextResponse.json({ error: 'API Key not configured.' }, { status: 500 });
//   }

//   try {
//     const { origin, destination } = (await req.json()) as TravelTimeRequest;

//     if (!origin || !destination) {
//       return NextResponse.json({ error: 'Origin and destination are required.' }, { status: 400 });
//     }

// // 1. Get the current time.
// const now = new Date(); 

// // 2. Add a 10-second buffer to ensure the timestamp is in the future.
// // The getTime() method returns the milliseconds since epoch.
// const departureTimeWithBuffer = new Date(now.getTime() + 10 * 1000); 

// // Google Routes API Request Body
// const requestBody = {
//     origin: { address: origin },
//     destination: { address: destination },
//     travelMode: 'DRIVE', 
    
//     // ✅ FIX: Use the buffered future timestamp.
//     departureTime: departureTimeWithBuffer.toISOString(),
    
//     routingPreference: 'TRAFFIC_AWARE',
//     units: 'METRIC',
// };


//     // // Google Routes API Request Body

//     const googleResponse = await fetch(GOOGLE_ROUTES_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // Specify the fields you want to return (estimatedDuration is crucial)
//         'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters', 
//         // Use the API key directly in the header for Routes API
//         'X-Goog-Api-Key': API_KEY,
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!googleResponse.ok) {
//       const errorData = await googleResponse.json();
//       console.error('Google Routes API Error:', errorData);
//       return NextResponse.json({ error: 'Failed to fetch travel time from Google.' }, { status: googleResponse.status });
//     }

//     const data = await googleResponse.json();
    
//     // Extract the duration from the first route segment
//     const duration = data.routes?.[0]?.duration;
//     const distanceMeters = data.routes?.[0]?.distanceMeters;

//     if (duration) {
//       // The duration is a string like "2000s" (seconds)
//       const travelTimeInSeconds = parseInt(duration.replace('s', ''));

//       return NextResponse.json({ 
//         travelTime: travelTimeInSeconds, // In seconds
//         distance: distanceMeters // In meters
//       });
//     } else {
//       return NextResponse.json({ error: 'Could not calculate travel time.' }, { status: 500 });
//     }
//   } catch (error) {
//     console.error('Server error:', error);
//     return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
//   }
// }

// services/transport/google-routes.service.ts
const API_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'https://your-domain.com'  // ← change to your domain
  : 'http://localhost:3000';

export async function getRealHKTransport(
  origin: string,
  destination: string
): Promise<{ mode: string; duration_min: number; distance_km: number }> {
  try {
    const res = await fetch(`${API_URL}/api/transport`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination }),
      // Critical: Disable Next.js fetch cache for testing
      cache: 'no-store'
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return {
      mode: 'drive',
      duration_min: Math.ceil(data.travelTime / 60),
      distance_km: Number((data.distance / 1000).toFixed(1))
    };
  } catch (err) {
    console.warn('Real transport failed, using fallback:', err);
    return { mode: 'walk', duration_min: 20, distance_km: 2 };
  }
}