import React from 'react';
import Image from 'next/image';
const ItineraryCard = ({ item }) => {
  const typeStyles = {
    meal: 'bg-blue-100 text-blue-800',
    exhibition: 'bg-green-100 text-green-800',
    tour: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          <Image
              src={item.image}
              alt={item.title}
              className="w-full md:w-1/3 h-48 object-cover" />
      <div className="p-4 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          {item.hasChange && (
            <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Changed</span>
          )}
        </div>
        <p className="text-gray-600">{item.time}</p>
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${typeStyles[item.type]}`}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
      </div>
    </div>
  );
};

const ItineraryDisplay = ({ itineraryData }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Itinerary</h1>
      {Array.isArray(itineraryData) && itineraryData.length > 0 ? (
        <div className="grid gap-4">
          {itineraryData.map((item) => (
            <ItineraryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No itinerary data available.</p>
      )}
    </div>
  );
};

export default ItineraryDisplay;