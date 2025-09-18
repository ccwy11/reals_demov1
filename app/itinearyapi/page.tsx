"use client";

import { useState } from "react";
import { callPerplexityAPI } from "../../server/ai";
import Link from "next/link";
import BottomNavigation from "@/components/bottomnav";
import ItineraryDisplay from "@/components/ItineraryDisplay";

export default function ItineraryApi() {
  const [itineraryData, setItineraryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await callPerplexityAPI();
      const parsedData = typeof data.choices[0].message.content === 'string' 
        ? JSON.parse(data.choices[0].message.content) 
        : data.choices[0].message.content;
      // Add hasBook property for consistency with reference design
      const enrichedData = parsedData.map(item => ({ ...item, hasBook: true }));
      setItineraryData(enrichedData);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Perplexity API Test</h1>
        <button
          onClick={testAPI}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? "Loading..." : "Get Itinerary"}
        </button>
      </div>
      <div className="mt-4">
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <ItineraryDisplay itineraryData={itineraryData} />
        )}
      </div>
      <div className="max-w-md mx-auto p-4 text-center">
        <Link href="/itineraries">
          <button className="w-full bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Book Above
          </button>
        </Link>
      </div>
      <BottomNavigation />
    </div>
  );
}