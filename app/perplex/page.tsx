"use client";

import { useState } from "react";
import { callPerplexityAPI } from "../../server/ai";
import Link from "next/link";
import BottomNavigation from "@/components/Bottomnav";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import { Button } from "@/components/ui/button";

export default function Perplex() {
  const [itineraryData, setItineraryData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testAPI = async () => {
    setIsLoading(true);
    setItineraryData(null);
    setError(null);
      try {
          const results = JSON.parse(localStorage.getItem('questionnaireResults') || '{}');
      const data = await callPerplexityAPI(results);
      let responseContent = data?.choices?.[0]?.message?.content;

      if (!responseContent) {
        throw new Error("No content received from API");
      }

      // Clean the response: extract the JSON array between [ and ]
      const jsonMatch = responseContent.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in response");
      }
      responseContent = jsonMatch[0]; // Extract the matched JSON array

      // Additional cleaning: remove markdown, backticks, and trim
      responseContent = responseContent
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .replace(/`/g, '')
        .trim();

      // Parse the cleaned response
      const parsedData = JSON.parse(responseContent);
      if (!Array.isArray(parsedData)) {
        throw new Error("Parsed response is not an array of itinerary items");
      }
          
          //@ts-expect-error type error
      setItineraryData(parsedData);
    } catch (error) {   
          //@ts-expect-error type error
      console.error("API or parsing error:", error.message, "Response content:", responseContent);      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto px-5 pb-20">
   <h1 className="text-2xl font-bold text-foreground text-center mb-5">Perplexity API Test</h1>
        <Button
        onClick={testAPI}
        disabled={isLoading}
        className={`px-5 py-2.5 text-base font-medium text-white rounded-md ${
          isLoading ? 'bg-muted cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
        } transition-colors`}
      >
        {isLoading ? "Loading..." : "Get Answer"}
      </Button>
     <div
        className="mt-5 p-4 border border-border rounded-lg bg-muted/50 text-foreground text-lg w-full box-border break-words"
      >
  {error ? (
          <span className="text-muted-foreground">{error}</span>
        ) : itineraryData ? (
          <ItineraryDisplay itineraryData={itineraryData} />
        ) : (
    <span className="text-muted-foreground">Click the button to get an answer.</span>
        )}
      </div>
      <Link href="/activity" className="mt-5">
        <Button className="w-full px-4 py-2 text-white font-bold bg-primary hover:bg-primary/90 rounded-md transition-colors">
          Book Above
        </Button>
      </Link>
      <BottomNavigation />
    </div>
  );
}