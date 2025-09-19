"use client";

import { useState } from "react";
import { callPerplexityAPI } from "../../server/ai";
import Link from "next/link";
import BottomNavigation from "@/components/bottomnav";
import ItineraryDisplay from "@/components/ItineraryDisplay";

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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>Perplexity API Test</h1>
      <button
        onClick={testAPI}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: isLoading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Loading..." : "Get Answer"}
      </button>
      <div style={{
        marginTop: '20px',
        fontSize: '18px',
        color: '#333',
        fontWeight: 'normal',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        width: '100%',
        maxWidth: '600px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
      }}>
        {error ? (
          <span style={{ color: "#666" }}>{error}</span>
        ) : itineraryData ? (
          <ItineraryDisplay itineraryData={itineraryData} />
        ) : (
          <span style={{ color: "#666" }}>Click the button to get an answer.</span>
        )}
      </div>
      <Link href="/itineraries">
        <button className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Above</button>
      </Link>
      <BottomNavigation />
    </div>
  );
}