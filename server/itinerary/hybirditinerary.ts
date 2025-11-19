import { ItineraryInput } from "@/types/itinerary";
import { buildSkeleton } from "./skeleton.builder";
import { buildEnhancerPrompt } from "./enhancerpromt";
import { callAIEnhancer } from "./callenhancer";
import { mergeEnhancements } from "./merger";
import { geocodeAddress } from "../geo/geocode";
import { injectTransport } from "../transport/injector";


export async function generateHybridItinerary(
  input: ItineraryInput,
  dbEvents: any[] // from Drizzle
) {
  // 1. Build skeleton
  const skeleton = buildSkeleton(dbEvents, input);

  // 2. AI enhance
  const prompt = buildEnhancerPrompt(skeleton, input);
  const aiResponse = await callAIEnhancer(prompt);

  // // 3. Merge
  // const enhanced = mergeEnhancements(skeleton, aiResponse);

  // // 4. (Next phase: transport + geocode)
  // return { skeleton: enhanced, rawAI: aiResponse };
const enhanced = mergeEnhancements(skeleton, aiResponse);
const finalItinerary = await injectTransport(enhanced);   // ← NEW LINE

return { skeleton: finalItinerary, rawAI: aiResponse };

}

// TEMP TEST – DELETE LATER
// (async () => {
//   const mockInput = { destination: "Hong Kong", startDate: "2025-12-01", endDate: "2025-12-01", preferences: ["art", "food"], travelers: 2 };
//   const mockDB: any[] = []; // empty → all free

//   console.log("Calling real AI...");
//   const result = await generateHybridItinerary(mockInput, mockDB);
//   console.log("AI filled:", result.skeleton.filter(s => s.event));
// })();

// ==== QUICK TEST SPRINT 9 ====

  // Adjust path if needed

// ==== QUICK TEST – DIRECTIONS GEOCODE ====

// (async () => {
//   console.log("\n=== GEOCODE VIA DIRECTIONS API TEST ===");
//   const tests = [
//     "Tim Ho Wan, Sham Shui Po",
//     "Victoria Peak",
//     "Lan Kwai Fong",
//     "Temple Street Night Market"
//   ];

//   for (const place of tests) {
//     try {
//       const loc = await geocodeAddress(place);
//       console.log(`${place} → ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`);
//     } catch (err) {
//       console.error(`Failed: ${place}`, err);
//     }
//   }
//   console.log("=== TEST COMPLETE ===\n");
// })();

// ==== QUICK TEST SPRINT 11 ====


// (async () => {
//   console.log("\n=== SPRINT 11 FULL FLOW TEST ===");
//   const mockDB = [
//     { id: "1", name: "Victoria Peak Tram", location: { lat: 22.278, lng: 114.159 }, address: "The Peak", durationMin: 120, priceTier: "medium", tags: ["views"], imageUrl: null },
//     { id: "2", name: "Temple Street Night Market", location: { lat: 22.306, lng: 114.170 }, address: "Yau Ma Tei", durationMin: 180, priceTier: "free", tags: ["culture"], imageUrl: null }
//   ];
//   const mockInput = { destination: "Hong Kong", startDate: "2025-12-01", endDate: "2025-12-01", preferences: ["views", "food"], travelers: 2 };

//   const aiResponse = [
//     { day: "2025-12-01", start: "13:00", end: "15:00", suggestion: { name: "Dim Sum Lunch", duration: 120, address: "Tim Ho Wan, Sham Shui Po", type: "meal" } }
//   ];

//   const skeleton = buildSkeleton(mockDB, mockInput);
//   const merged = mergeEnhancements(skeleton, aiResponse);
//   const final = await injectTransport(merged);

//   console.log("\nFINAL TIMELINE:");
//   final.forEach(s => {
//     if (s.event) {
//       console.log(`${s.start}-${s.end} | ${s.event.name}`);
//     } else {
//       console.log(`${s.start}-${s.end} | → ${s.transport?.mode} ${s.transport?.duration_min} min`);
//     }
//   });
//   console.log("=== SPRINT 11 DONE ===\n");
// })();

// ==== FIX TEST ====

// ==== QUICK TEST – REGENERATED GEOCODE ====

(async () => {
  console.log("\n=== GEOCODE REGEN TEST ===");
  const tests = [
    "Tim Ho Wan, Sham Shui Po",  // Failing case
    "Victoria Peak",             // Generic
    "Temple Street Night Market" // Market example
  ];

  for (const testAddr of tests) {
    try {
      const loc = await geocodeAddress(testAddr);
      console.log(`"${testAddr}" → { lat: ${loc.lat.toFixed(4)}, lng: ${loc.lng.toFixed(4)} }`);
    } catch (err) {
      console.error(`"${testAddr}" FAILED:`, err);
    }
  }
  console.log("=== TEST COMPLETE ===\n");
})();