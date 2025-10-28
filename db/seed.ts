// src/lib/db/seed.ts
import { db } from './drizzle';
import { events } from './schema';

const seedEvents = async () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    name: [
      'Sunset Yoga', 'Surf Lesson', 'Cooking Class', 'City Tour', 'Wine Tasting',
      'Hiking Adventure', 'Beach Party', 'Art Workshop', 'Diving Trip', 'Spa Day'
    ][i % 10] + ` #${i + 1}`,
    price: Math.random() > 0.3 ? (Math.random() * 100).toFixed(2) : null,
    description: `Amazing experience in beautiful location. Limited spots!`,
    photo: `https://picsum.photos/seed/event${i}/400/300`,
    isEvent: Math.random() > 0.4,
  }));

  await db.insert(events).values(data).onConflictDoNothing();
  console.log('Seeded 50 events');
};

seedEvents().catch(console.error);