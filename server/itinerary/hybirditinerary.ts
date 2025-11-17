import { ItineraryInput } from "@/types/itinerary";
import { buildSkeleton } from "../skeleton.builder";
import { buildEnhancerPrompt } from "./enhancerpromt";
import { callAIEnhancer } from "./callenhancer";
import { mergeEnhancements } from "./merger";


export async function generateHybridItinerary(
  input: ItineraryInput,
  dbEvents: any[] // from Drizzle
) {
  // 1. Build skeleton
  const skeleton = buildSkeleton(dbEvents, input);

  // 2. AI enhance
  const prompt = buildEnhancerPrompt(skeleton, input);
  const aiResponse = await callAIEnhancer(prompt);

  // 3. Merge
  const enhanced = mergeEnhancements(skeleton, aiResponse);

  // 4. (Next phase: transport + geocode)
  return { skeleton: enhanced, rawAI: aiResponse };
}

// TEMP TEST – DELETE LATER
(async () => {
  const mockInput = { destination: "Hong Kong", startDate: "2025-12-01", endDate: "2025-12-01", preferences: ["art", "food"], travelers: 2 };
  const mockDB: any[] = []; // empty → all free

  console.log("Calling real AI...");
  const result = await generateHybridItinerary(mockInput, mockDB);
  console.log("AI filled:", result.skeleton.filter(s => s.event));
})();