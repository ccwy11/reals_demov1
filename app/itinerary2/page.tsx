"use client";

import { useState, useEffect } from "react";
import { callPerplexityAPI } from "../../server/ai";
import Link from "next/link";
import BottomNav from "@/components/bottomnav";

export default function ItineraryPage() {
  const [itineraryData, setItineraryData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
        console.error("API or parsing error:", error.message, "Response content:", responseContent); setError(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const sampleData = [
    {
      id: 1,
      type: "exhibition",
      title: "Naked Flowers",
      subtitle: "interactive exhibition",
      time: "10:00 AM - 12:00 PM",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop&crop=face",
      travel: "MTR from Tsim Sha Tsui - Sham Shui Po Station (around 20 minutes)",
      hasBook: true,
    },
    {
      id: 2,
      type: "meal",
      title: "Lunch",
      subtitle: "Dim Sum at Tim Ho Wan",
      time: "12:30 PM - 2:00 PM",
      image: "https://images.unsplash.com/photo-1541544189363-9799bcd5cb70?w=200&h=200&fit=crop&crop=face",
      travel: "MTR from Sham Shui Po to Sheung Wan Station (about 20 minutes)",
      hasBook: true,
    },
    {
      id: 3,
      type: "exhibition",
      title: "Another Day in Hong Kong",
      subtitle: "Exhibition",
      time: "2:30 PM - 4:00 PM",
      image: "https://images.unsplash.com/photo-1541544189363-9799bcd5cb70?w=200&h=200&fit=crop&crop=face",
      travel: "A short walk from Sheung Wan to Sai Ying Pun",
      hasBook: true,
    },
    {
      id: 4,
      type: "meal",
      title: "Dinner",
      subtitle: "Modern Asian Cuisine at Ho Lee Fook",
      time: "6:30 PM - 8:30 PM",
      image: "https://images.unsplash.com/photo-1541544189363-9799bcd5cb70?w=200&h=200&fit=crop&crop=face",
      travel: "",
      hasBook: true,
    },
  ];

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Itinerary</h1>
      <div className="space-y-8"> {/* Increased space-y for separation */}
        {itineraryData ? (
              //@ts-expect-error type error
          itineraryData.map((item, index) => (
            <div key={item.id}>
              <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}: {item.subtitle}</h3>
                      <p className="text-gray-600">{item.time}</p>
                    </div>
                           
                               
                          </div>
                          <button className="bg-red-700 text-white px-4 py-2 rounded-full mt-2">Book</button>
                             <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm">Change</button>
                       
                  {/* {item.hasBook && (
                    <button className="bg-red-700 text-white px-4 py-2 rounded-full mt-2">Book</button>
                  )} */}
                      </div>
                      
                {/* {index === itineraryData.length - 1 && (
                  <button className="bg-gray-200 p-2 rounded-full">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                  </button>
                )} */}
                  </div>
                   <div className="mt-4">
                  <hr className="border-gray-300 mb-2" />
                  <p className="text-sm text-gray-500"></p>
                      </div>

                  
              {/* {index < itineraryData.length - 1 && item.travel && (
                <div className="mt-4">
                  <hr className="border-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">
                    {item.travel.includes("MTR") ? "by MTR" : "by"} {item.travel.match(/\d+/)}
                    {item.travel.match(/\d+/) ? " mins travel" : item.travel}
                  </p>
                </div>
              )} */}
                  

                      <BottomNav />
            </div>
          ))
        ) : (
          sampleData.map((item, index) => (
            <div key={item.id}>
              <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}: {item.subtitle}</h3>
                      <p className="text-gray-600">{item.time}</p>
                    </div>
                    
                  </div>
                  {/* {item.hasBook && (
                    <button className="bg-red-700 text-white px-4 py-2 rounded-full mt-2">Book</button>
                  )} */}
                         
                    <button className="bg-red-700 text-white px-4 py-2 rounded-full mt-2">Book</button>
                 <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm">Change</button>
                </div>
                {index === sampleData.length - 1 && (
                  <button className="bg-gray-200 p-2 rounded-full">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                  </button>
                )}
              </div>
              {index < sampleData.length - 1 && item.travel && (
                <div className="mt-4">
                  <hr className="border-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">
                    {item.travel.includes("MTR") ? "by MTR" : "by"} {item.travel.match(/\d+/)}
                    {item.travel.match(/\d+/) ? " mins travel" : item.travel}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
          </div>
          
                      <BottomNav />
    </div>
  );
}