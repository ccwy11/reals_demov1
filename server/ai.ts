"use server"
import { z } from "zod"
import { QuestionnaireStateSchema } from "../components/features/planner-form"
import { db } from "@/db/drizzle";



export async function callPerplexityAPI() {
    let prompt = `
    
 Generate a full day itinerary for a single day in New York City for a traveler interested in art, culture, and food. Include 4-5 activities covering morning, afternoon, and evening. Each activity should be a JSON object with the following fields: 'id' (unique integer starting from 1), 'type' (e.g., 'exhibition', 'meal', 'tour', 'event'), 'title' (descriptive name), 'time' (format: 'HH:MM AM/PM - HH:MM AM/PM'), 'image' (placeholder URL like 'https://images.unsplash.com/photo-[id]?w=400&h=300&fit=crop&crop=center', with unique photo IDs), and 'hasChange' (set to true). Ensure activities are logically sequenced, feasible in timing and location, and align with the interests. Return as a JSON array.
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
            max_tokens: 100,
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



export async function generatePlan() {
    // export async function generatePlan(formData: z.infer<typeof QuestionnaireStateSchema>) {
    //     const { date, dateType, startTime, endTime, budget, intensity, location } = formData


    //     //  to ${endDate.toISOString()} 
    //     let prompt = `
    //     I want to plan a date  
    //     from ${date?.toISOString()} 

    //     with a budget of ${budget} HKD. I want to do ${dateType.join(', ')}.
    //     Please format the result in html


    //     `;
    //     if (location) {
    //         prompt += `I want to visit ${location}.`
    //     }


    //     // Set up the API endpoint and headers
    // const url = 'https://api.perplexity.ai/chat/completions';
    // const headers = {
    //  
    //  'Authorization': `${process.env.PERPLEXITY_API_KEY}`, // Replace with your actual API key
    //     'Content-Type': 'application/json'
    // };

    // // Define the request payload
    // const payload = {
    //     model: 'sonar-pro',
    //     messages: [
    //         { role: 'user', content: 'What were the results of the 2025 French Open Finals?' }
    //     ]
    // };
    // Make the API call
    // const response = await fetch(url, {
    //     method: 'POST',
    //     headers,
    //     body: JSON.stringify(payload)
    // });


    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            messages: [{
                role: "user",
                content: "hello"
                //prompt,
            }],
            model: "gpt-4o-mini"
        }),
    });





    const data = await response.json();

    // Print the AI's response
    console.log(data.choices[0].message.content)
    console.log(data); // replace with console.log(data.choices[0].message.content) for just the content

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