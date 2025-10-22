import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Define ItineraryItem type
interface ItineraryItem {
  id: string;
  image: string;
  title: string;
  time: string;
  type: 'meal' | 'exhibition' | 'tour';
}

const ItineraryCard: React.FC<{ item: ItineraryItem }> = ({ item }) => {
  const router = useRouter();
  const typeVariants: Record<ItineraryItem['type'], string> = {
    meal: 'meal', // Uses custom meal variant (blue)
    exhibition: 'exhibition', // Uses custom exhibition variant (green)
    tour: 'tour', // Uses custom tour variant (purple)
  };

  const handleChange = () => {
    console.log(`Change itinerary item: ${item.id}`);
    // Add logic to modify the itinerary item (e.g., call AI planner API)
  };

  const handleBook = () => {
   router.push(`/activity`);
    console.log(`Book itinerary item: ${item.id}`);
    // Add logic to book the itinerary item (e.g., call booking API)
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={item.id === '1'} // Prioritize first image for LCP
          aria-describedby={`itinerary-title-${item.id}`}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <CardTitle id={`itinerary-title-${item.id}`} className="text-lg">
            {item.title}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleChange}
              aria-label={`Change itinerary item ${item.title}`}
            >
              Change
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleBook}
              aria-label={`Book itinerary item ${item.title}`}
            >
              Book
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mt-1">{item.time}</p>
        <Badge
          //@ts-expect-error type error
          variant={typeVariants[item.type]}
          className="mt-2"
          aria-label={`Type: ${item.type}`}
        >
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Badge>
      </CardContent>
    </Card>
  );
};

const ItineraryDisplay: React.FC<{ itineraryData: ItineraryItem[] }> = ({ itineraryData }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Itinerary</h1>
      {Array.isArray(itineraryData) && itineraryData.length > 0 ? (
        <ul className="grid gap-4" role="list">
          {itineraryData.map((item) => (
            <li key={item.id}>
              <ItineraryCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No itinerary data available.</p>
      )}
    </div>
  );
};

export default ItineraryDisplay;