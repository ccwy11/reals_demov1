import { ItineraryInput } from "@/types/itinerary";
import { buildSkeleton } from "./skeleton.builder";
import { buildEnhancerPrompt } from "./enhancerpromt";
import { callAIEnhancer } from "./callenhancer";
import { mergeEnhancements } from "./merger";
import { geocodeAddress } from "../geo/geocode";
import { injectRealTransport } from "../transport/injector";

export async function generateHybridItinerary(input: any, dbEvents: any[]) {
  // 1. Build skeleton from DB events
  const skeleton = buildSkeleton(dbEvents, input);

  // 2. Enhance with AI
  const prompt = buildEnhancerPrompt(skeleton, input);
  const aiResponse = await callAIEnhancer(prompt);

  // 3. Merge AI suggestions
  const enhanced = mergeEnhancements(skeleton, aiResponse);

  // 4. Inject real transport
  const finalItinerary = await injectRealTransport(enhanced);

  // RETURN FINAL RESULT
  return { skeleton: finalItinerary, rawAI: aiResponse };
}

