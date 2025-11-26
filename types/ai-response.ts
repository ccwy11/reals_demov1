// types/itinerary/ai-response.zod.ts
import { z } from 'zod';
export const AISuggestionSchema = z.object({
  day: z.string(),
  start: z.string(),
  end: z.string(),
  suggestion: z.object({
    name: z.string(),
    description: z.string().optional(),
    duration: z.number(),
    address: z.string(),
    type: z.string(), // REQUIRED
  }),
  transport_from_previous: z
    .object({
      mode: z.string().transform((v) => v.toLowerCase()),
      duration_min: z.number(),
    })
    .optional(),
});

export const AIEnhancerResponseSchema = z.array(AISuggestionSchema);


// export const AISuggestionSchema = z.object({
//   day: z.string(),
//   start: z.string(),
//   end: z.string(),
//   suggestion: z.object({
//     name: z.string(),
//     description: z.string().optional(),
//     duration: z.number(),
//     address: z.string(),
//     // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
//     // FIX: Allow real AI types + map to your system
//     // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
//     type: z.string() // Accept any string from AI
//       .transform((val) => {
//         // Map AI's free text → your internal types
//         const map: Record<string, string> = {
//           lunch: 'meal',
//           dinner: 'meal',
//           breakfast: 'meal',
//           exhibit: 'exhibition',
//           museum: 'exhibition',
//           walk: 'tour',
//           market: 'tour',
//           default: 'activity'
//         };
//         return map[val.toLowerCase()] || map.default;
//       })
//   }),
//   transport_from_previous: z.object({
// mode: z.string()
//   .toLowerCase()
//   .pipe(z.enum(['walk', 'subway', 'taxi', 'bus', 'tram', 'ferry', 'mtr', 'train'])),
//     duration_min: z.number()
//   }).optional()
// });

// export const AIEnhancerResponseSchema = z.array(AISuggestionSchema);