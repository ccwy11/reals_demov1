// 1. User Input
export type ItineraryInput = {
  destination: string;
  startDate: string; // ISO
  endDate: string;
  preferences: string[];
  travelers: number;
};

// 2. DB Event (from Drizzle)
export type DBEvent = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  address: string;
  durationMin: number;
  priceTier: 'free' | 'low' | 'medium' | 'high';
  tags: string[];
  imageUrl?: string;
};

// 3. Skeleton Slot
export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'free';

export type ItinerarySlot = {
  day: string;
  slot: TimeSlot;
  event?: DBEvent;
  start: string; // "09:00"
  end: string;   // "11:30"
};