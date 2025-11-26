'use client';

import React, { useState } from 'react';

// Define the shape of the data we expect from our Route Handler
interface TravelTimeData {
  travelTime: number; // in seconds
  distance: number; // in meters
}

export function TravelTimeFetcher() {
  const [origin, setOrigin] = useState('New York, NY');
  const [destination, setDestination] = useState('Boston, MA');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TravelTimeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTravelTime = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/travel-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch travel time');
      }

      const data: TravelTimeData = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
  };

  return (
    <div>
      <input
        type="text"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Origin"
        style={{ margin: '10px', padding: '8px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        style={{ margin: '10px', padding: '8px', border: '1px solid #ccc' }}
      />
      <button 
        onClick={fetchTravelTime} 
        disabled={loading}
        style={{ padding: '10px', cursor: 'pointer', backgroundColor: loading ? '#ccc' : 'lightblue' }}
      >
        {loading ? 'Calculating...' : 'Get Travel Time'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {result && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid green' }}>
          <h3>Travel Time Result:</h3>
          <p>🚗 **Estimated Duration:** **{formatDuration(result.travelTime)}**</p>
          <p>📏 **Distance:** **{(result.distance / 1000).toFixed(2)} km**</p>
        </div>
      )}
    </div>
  );
}