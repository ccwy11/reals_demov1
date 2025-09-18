"use client"

import React from 'react';

const itineraryData = [ { "id": 1, "type": "meal", "title": "Breakfast at Modern Bread & Bagel", "time": "8:00 AM - 9:00 AM", "image": "https://images.unsplash.com/photo-1019625952390?w=400&h=300&fit=crop&crop=center", "hasChange": true }, { "id": 2, "type": "exhibition", "title": "Visit The Metropolitan Museum of Art", "time": "9:30 AM - 11:00 AM", "image": "https://images.unsplash.com/photo-1068395589490-4b7f2de7c69f?w=400&h=300&fit=crop&crop=center", "hasChange": true }, { "id": 3, "type": "meal", "title": "Lunch at Mercado Little Spain", "time": "12:00 PM - 1:30 PM", "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&crop=center", "hasChange": true }, { "id": 4, "type": "tour", "title": "Walk the High Line and visit Chelsea Galleries", "time": "2:00 PM - 4:00 PM", "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop&crop=center", "hasChange": true }, { "id": 5, "type": "meal", "title": "Dinner at BondST Sushi, Hudson Yards", "time": "7:00 PM - 8:30 PM", "image": "https://images.unsplash.com/photo-1541544189363-9799bcd5cb70?w=400&h=300&fit=crop&crop=center", "hasChange": true } ];

const ItineraryCard = ({ item }) => {
  const typeStyles = {
    meal: 'bg-blue-100 text-blue-800',
    exhibition: 'bg-green-100 text-green-800',
    tour: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <img src={item.image} alt={item.title} className="w-full md:w-1/3 h-48 object-cover" />
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

const ItineraryDisplay = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Itinerary</h1>
      <div className="grid gap-4">
        {itineraryData.map((item) => (
          <ItineraryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;