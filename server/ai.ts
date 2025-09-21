"use server"
import { z } from "zod"
import { QuestionnaireStateSchema } from "../components/features/planner-form"
import { db } from "@/db/drizzle";


// const JsonOutputSchema = z.object({
//     metadata: z.object({
//         completedAt: z.string().datetime(),
//         totalSteps: z.number(),
//         version: z.string(),
//         validation: z.object({
//             isValid: z.boolean(),
//             schema: z.string()
//         })
//     }),
//     responses: z.object({
//         step1_date: z.string().nullable(),
//         step2_time: z.object({
//             startTime: z.string(),
//             endTime: z.string()
//         }),
//         step3_date_type: z.array(z.string()),
//         step4_food: z.array(z.string()),
//         step5_transportation: z.string(),
//         step6_budget: z.string().regex(/^HKD \$\d{1,4}$/, "Budget must be in the format 'HKD $number' between HKD $0 and HKD $5000"),
//         step7_intensity: z.string().regex(/^\d{1,3}%$/, "Intensity must be a percentage between 0% and 100%"),
//         step8_location: z.array(z.string())
//     })
// });

type QuestionnaireResults = z.infer<typeof QuestionnaireStateSchema>;

export async function callPerplexityAPI(results: QuestionnaireResults) {
    const  prompt = `
    
 Generate a full day itinerary for a single day in HongKong for a traveler interested in art, culture, and food.
     ${JSON.stringify(results, null, 2)}
  Include 4-5 activities covering morning, afternoon, and evening. Each activity should be a JSON object with the following fields:
   'id' (unique integer starting from 1), 'type' (e.g., 'exhibition', 'meal', 'tour', 'event'), 'title' (descriptive name),
   'time' (format: 'HH:MM AM/PM - HH:MM AM/PM'), 
   'image' (placeholder URL from pexels.com) , no 404 response from image, food or activity image,
   'travel' (with 30 text character to describe transportation)
   and 'hasChange' (set to true).
   Ensure activities are logically sequenced, feasible in timing and location, and align with the interests. Return as a JSON array.
    in json formatt
    `
    // if (!process.env.PERPLEXITY_API_KEY) throw new Error("Missing API key");
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          // Replace with your actual API key

            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "sonar",
            messages: [{
                role: "user",
                content: prompt
            }],
            max_tokens: 1000,
        }),
    });
    const data = await res.text();
    console.log("Response:", {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: data.slice(0, 100),
        
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
        throw new Error(res.status === 401 ? "Invalid API key" : `API error: ${res.status}`);
    }
    const json = JSON.parse(data);
    return { choices: [{ message: { content: json.choices[0].message.content } }] };
}



// 1. Date
// - 27/08/2025

// 2. Time
// - whole day

// 3. Type of date 
// - artistic, music, entertainment, nightlife, adventure
 
// 4. Preferred cuisine
// - decided for me 

// 5. Transit method
// - public transport

// 6. Total Budget
// - $350 hkd per person

// 7. Number of activities, excluding meal
// - 3

// 8. Location of date
// - New Territories

// 9. Whether include events from wishlist
// - 

// The output should follow the structure in the below:
// Summary of the weather
// Brief of each activities, inducing introduction, price, place
// Suggested transit method between each activities, including estimated time, price
// Budget overview
// Summary of the date
// Output in traditional Chinese